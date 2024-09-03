var w = 100;
var h = 100;
var projScale = 1;
// var fov = 90;
var camlength = 10;
var projectionPanelWidth = 20;
var camerapos = [-15,0,0]
var cameraDir = [1,0,0]
var cameraSideways = [0,0,1]; //can be undefined and will autogen
var aspect = 0;

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var randseed = 6;

var objects = [];
var materials = [];

var maxBounces = 7;
var raysPerPixel = 1;

var hardColors = false;

var frame = [];
var numFrames = 0;

for(var i = 0; i < w; i ++){
    frame.push(new Array(h));
}
console.log(frame)
for(var i = 0; i < w; i ++){
    for(var j = 0; j < h; j ++){
        frame[i][j] = [0,0,0];
    }
}

// var Color = class {
//     constructor(r, g, b){
//         this.red = r;
//         this.green = g;
//         this.blue = b;
//     }
//     // You should not define such a method on your own object,
//     // but you may not be able to prevent it from happening if
//     // you are receiving the object from external input
//     getText() {
//       return `rgb(${this.red} ${this.green} ${this.blue})`;;
//     }
// };

function color(r, g, b) {
    return `rgb(${r} ${g} ${b})`;;
}

function colorArr(arr) {
    return `rgb(${arr[0]} ${arr[1]} ${arr[2]})`;
}

function colorMat(colorIndex) {
    return `rgb(${materials[colorIndex].r} ${materials[colorIndex].g} ${materials[colorIndex].b})`;;
}

function addSphere(x, y, z, radius, colorIndex){
    objects.push({type: "sphere", x: x, y: y, z: z, radius: radius, colorIndex: colorIndex});
}

function addMaterial(name, r, g, b, gloss, emissivity = 0){
    materials.push({name: name, r: r, g: g, b: b, gloss: gloss, emissivity: emissivity});
}

function printHit(hitData){
    console.log(`hit?:${hitData.hit ? "Y" : "N"} dst:${hitData.distance} norm:${hitData.normal} hitPos:${hitData.hitPoint}`);
}

function randomValue(){
    randseed = (randseed * 16625 + 1013223) & 0xFFFFFF;
    // console.log(`rand:${randseed}`);
    return randseed/(0xFFFFFF);
    // return Math.random() * (max+1);
}

function randomNormal(){
    var theta = 2 * Math.PI * randomValue();
    var rho = Math.sqrt(-2 * Math.log(randomValue()));
    return rho * Math.cos(theta);
}

function randomDirection(){
    return norm([randomNormal(),randomNormal(),randomNormal()]);
}

function randomHemisphere(normal){
    var dir = randomDirection();
    if(dotVec(normal, dir) < 0){
        return invertVec(dir);
    }
    return dir;
}

function checkCollision(line_pos, line_dir, obj){
    if(obj.type == "sphere"){
        var displaceLinePos = subVec(line_pos, [obj.x,obj.y,obj.z]);
        var a = dotVec(line_dir,line_dir);
        var b = 2 * dotVec(line_dir, displaceLinePos);
        var c = dotVec(displaceLinePos, displaceLinePos) - obj.radius**2;

        var discrim = (b**2 - 4 * a * c);
        var hitOrMiss = discrim >= 0;
        if(hitOrMiss){
            var distA = (-b + Math.sqrt(discrim))/(2*a);
            var distB = (-b - Math.sqrt(discrim))/(2*a);
            var dist = Math.min(distA, distB);
            var hitPoint = addVec(line_pos,scaleVec(line_dir, dist));
            return {hit: true, distance: dist, normal: invertVec(norm(subVec(hitPoint,[obj.x,obj.y,obj.z]))), hitPoint: hitPoint, obj: undefined};
        }
        return {hit: false, distance: undefined, normal: undefined, hitPoint: undefined, obj: undefined};
        // console.log(a);
    }else{
        throw new Error(`Object is of unknown type: ${obj.type}`);
    }
}

function checkAllCollisions(line_pos, line_dir){
    var closestCollision = {hit: false, distance: undefined, normal: undefined, hitPoint: undefined, obj: undefined};
    for(var i = 0; i < objects.length; i ++){
        //console.log(`obj[${i}]:${objects[i]}`);
        var collision = checkCollision(line_pos, line_dir, objects[i]);
        // printHit(collision);
        if(collision.hit && (closestCollision.distance == undefined || collision.distance < closestCollision.distance)){
            closestCollision = collision;
            closestCollision.obj = objects[i];
        }
    }
    return closestCollision;
    
}

function resize(){
    var tot_width = document.getElementById("sunk").offsetWidth;
    var tot_height = document.getElementById("sunk").offsetHeight;
    console.log(`t_w: ${tot_width} t_h: ${tot_height}`);
    mult = Math.min(Math.floor(tot_width/w),Math.floor(tot_height/h));
    canvas.width = w * mult;
    canvas.height = h * mult;
    canvas.style.width = w * mult;
    canvas.style.height = h * mult;
    ctx.rect(0, 0, 1000000, 1000000);
    ctx.fill();
    aspect = h/w;
}

function perPixel(x, y){
    // var seed = ((y * w) + x);
    // var r = Math.floor(randomValue()*256);
    // var g = Math.floor(randomValue()*256);
    // var b = Math.floor(randomValue()*256);
    // console.log(`seed:${seed} r:${r} g:${g} b:${b}`);
    // return color(r,g,b);
    return singleRay(x,y);
    //return color(Math.floor(255 - 42.5 * x), Math.floor(255 - 42.5 * y), 0);
}

function singleRay(x, y){
    
    var camCore = addVec(camerapos, scaleVec(invertVec(cameraDir),camlength));

    var panelPixelSpacing = [projectionPanelWidth/w, aspect * projectionPanelWidth/w];
    // console.log(`camCore:${camCore} ppS:${panelPixelSpacing}`);
    // var camAngle = Math.atan2(camerapos[1], Math.sqrt(camerapos[0] ** 2 + camerapos[2] ** 2));
    var camSidewaysVec = undefined;
    if(cameraSideways == undefined){
        camSidewaysVec = [cameraDir[0]*Math.cos(Math.PI/2) - cameraDir[2]*Math.sin(Math.PI/2), 0, cameraDir[0]*Math.sin(Math.PI/2) + cameraDir[2]*Math.cos(Math.PI/2)];
    }else{
        camSidewaysVec = cameraSideways;
    }
    var camVerticalVec = crossVec(invertVec(cameraDir), camSidewaysVec);
    // console.log(`camAngle:${camAngle}`);
    // console.log(`camSidewaysVec:${norm(camSidewaysVec)}`);
    // console.log(`camVerticalVec:${norm(camVerticalVec)}`);
    var leftEdge = scaleVec(norm(camSidewaysVec), -projectionPanelWidth/2);
    var bottomEdge = scaleVec(norm(camVerticalVec), -aspect * projectionPanelWidth/2);
    // console.log(`leftEdge:${leftEdge}`);
    // console.log(`bottomEdge:${bottomEdge}`);
    var cornerPos = addVec(addVec(leftEdge, bottomEdge),camerapos);
    var vecTarget = addVec(cornerPos, scaleVec(camSidewaysVec, panelPixelSpacing[0]/2 + x * panelPixelSpacing[0])); //horizontal displacement
    vecTarget = addVec(vecTarget, scaleVec(camVerticalVec, panelPixelSpacing[1]/2 + y * panelPixelSpacing[1])); //vertical displacement

    var projVector = subVec(vecTarget, camCore);

    // console.log(`x:${x} y:${y} vecTarget:${vecTarget} projVector: ${projVector}`);

    // console.log(`objlen:${objects.length}`);
    
    if(!hardColors){
        var raySource = camCore;
        var ray = projVector;

        var rayColor = [1.0,1.0,1.0];
        var incomingLight = [0,0,0];
        for(var i = 0; i < maxBounces; i ++){
            var startTime = performance.now();
            var col = checkAllCollisions(raySource, ray);
            var endTime = performance.now();
            console.log(`Call to took ${endTime - startTime} milliseconds`);
            if(col.hit){
                raySource = col.hitPoint;
                ray = randomHemisphere(col.normal);
                
                var mat = materials[col.obj.colorIndex];
                var materialColor = [mat.r/255,mat.g/255,mat.b/255];
                var emittedLight = scaleVec([mat.r/255,mat.g/255,mat.b/255], mat.emissivity);
                incomingLight = addVec(incomingLight, multVec(emittedLight, rayColor));
                rayColor = multVec(rayColor, materialColor);
                // console.log(`color:${rayColor}`);
            }else{
                break;
            }
        }
        
        return scaleVec(incomingLight,255);
    }else{
        var col = checkAllCollisions(camCore, projVector);
        if(col.hit){
            var mat = materials[col.obj.colorIndex];
            var materialColor = [mat.r,mat.g,mat.b];
            return materialColor;
        }else{
            return [120,120,120];
        }
    }

    // if(closestObj != undefined){
    //     return colorMat(closestObj.colorIndex);
    // }
    // return color(120,120,120);
}

function drawPixel(x, y, c){
    // console.log(typeof c);
    ctx.fillStyle = colorArr(c);
    // console.log(`x:${x} y:${y} color:${c}`);
    ctx.fillRect(x*mult, y*mult, mult, mult);
}

function draw(){
    for(var i = 0; i < w; i ++){
        for(var j = 0; j < h; j ++){
            var weight = 1.0 / (numFrames + 1);
            // console.log(frame[i][j]);
            var pixel = addVec(scaleVec(frame[i][j],(1-weight)),scaleVec(perPixel(i, j),(weight)));
            frame[i][j] = pixel;
            drawPixel(i, j, pixel);
        }
    }
    numFrames ++;
    setTimeout(draw, 20);
    randseed *= 1203;
}

document.addEventListener('DOMContentLoaded', function(){
    addMaterial("Red", 200, 10, 20, 0.4, 0);
    addMaterial("Blue", 100, 150, 210, 0.4, 0);
    addMaterial("Floor", 180, 50, 210, 0.4, 0);
    addMaterial("Light", 255, 255, 255, 0, 0.7);
    addSphere(5, 0, 0, 10, 0);
    addSphere(-5, 8, 8, 5, 1);
    addSphere(-5,-30, 0, 10, 3);
    addSphere(0, 50, 0, 25, 2);
    resize();
    draw();
}); 