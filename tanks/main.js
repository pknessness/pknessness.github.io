var height = 0;
var width = 0;
var aspect = 16.0/9.0;
var fov = 2000;

var projectionPanelHeight = 14;
var projectionPanelPos = [0,12,-10];
var cameraDir = scaleVec(projectionPanelPos,-1);//[0,5,2];
var cameraSideways = [0,0,1]; //can be undefined and will autogen

var camCore = addVec(projectionPanelPos, scaleVec(cameraDir,-1 * fov));

var light_direction = [0,-1,0.6];

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var mapWidth = 22;
var mapHeight = 17;

var cubes = [];
var tanks = [];

var vertices = [];
var squares = [];

// var quads = [];
var shapes = [];

function reset(){
    vertices = [];
    squares = [];
    shapes = [];
}

function vectorToColorCode(colorVector){
    var vec = absVec(colorVector);
    var r = Math.floor(vec[0] * 255.9).toString(16);
    var g = Math.floor(vec[1] * 255.9).toString(16);
    var b = Math.floor(vec[2] * 255.9).toString(16);
    // console.log(`${vec} #${r.length>1 ? r : `0${r}`}${g.length>1 ? g : `0${g}`}${b.length>1 ? b : `0${b}`}`)
    return `#${r.length>1 ? r : `0${r}`}${g.length>1 ? g : `0${g}`}${b.length>1 ? b : `0${b}`}`;
}

function resize(){
    var tot_width = document.getElementById("sunk").offsetWidth;
    var tot_height = document.getElementById("sunk").offsetHeight;

    height = Math.min(tot_width/aspect, tot_height) - 8;
    width = height * aspect;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width;
    canvas.style.height = height;
    // ctx.rect(0, 0, 1000000, 1000000);
    ctx.fill();
}

function equalVector(vecA, vecB){
    return (vecA[0] == vecB[0]) && (vecA[1] == vecB[1]) && (vecA[2] == vecB[2]);
}

function search(array, vector){
    for(var i = 0; i < array.length; i ++){
        // console.log(`r:${array[i]} ${vector}`);
        if(equalVector(array[i],vector)){
            return i;
        }
    }
    return -1;
}

function randomValue(){
    if(truerRand) return Math.random();
    randseed = (randseed * 16625 + randseed * 6431 + 1013223)>>8 & 0xFFFFFF;
    // console.log(`rand:${randseed}`);
    return randseed/(0xFFFFFF);
    // return Math.random() * (max+1);
}

function rotateTranslate(vertex){
    var theta = Math.atan2(-cameraDir[1],-cameraDir[2]);
    var v2 = [
        vertex[0] - projectionPanelPos[0],
        vertex[1] - projectionPanelPos[1],
        vertex[2] - projectionPanelPos[2]];

    var cs = Math.cos(theta);
    var sn = Math.sin(theta);

    v2 = [v2[0], v2[1] * cs - v2[2] * sn, v2[1] * sn + v2[2] * cs];

    return v2;
}

function fillQuad(quad, scale, pixelOffset, color = "#FFFFFF"){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(quad.a[0] * scale + pixelOffset[0], quad.a[1] * scale + pixelOffset[1]);
    ctx.lineTo(quad.b[0] * scale + pixelOffset[0], quad.b[1] * scale + pixelOffset[1]);
    ctx.lineTo(quad.c[0] * scale + pixelOffset[0], quad.c[1] * scale + pixelOffset[1]);
    if(quad.d != undefined)
        ctx.lineTo(quad.d[0] * scale + pixelOffset[0], quad.d[1] * scale + pixelOffset[1]);
    ctx.lineTo(quad.a[0] * scale + pixelOffset[0], quad.a[1] * scale + pixelOffset[1]);
    // ctx.fillStyle = "#FFFFFF";
    ctx.fill();
}

function strokeQuad(quad, scale, pixelOffset, color = "#FFFFFF", lineWidth = 2){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(quad.a[0] * scale + pixelOffset[0], quad.a[1] * scale + pixelOffset[1]);
    ctx.lineTo(quad.b[0] * scale + pixelOffset[0], quad.b[1] * scale + pixelOffset[1]);
    ctx.lineTo(quad.c[0] * scale + pixelOffset[0], quad.c[1] * scale + pixelOffset[1]);
    if(quad.d != undefined)
        ctx.lineTo(quad.d[0] * scale + pixelOffset[0], quad.d[1] * scale + pixelOffset[1]);
    ctx.lineTo(quad.a[0] * scale + pixelOffset[0], quad.a[1] * scale + pixelOffset[1]);
    // ctx.fillStyle = "#FFFFFF";
    ctx.stroke();
}

function createRect(center,x,y,z, color, xplus=1,xminus=1,yplus=1,yminus=1,zplus=1,zminus=1, cp = undefined, yaw=0){
    if(cp == true){
        cp = center
    }

    // var cs = Math.cos(yaw * Math.PI/180);
    // var sn = Math.sin(yaw * Math.PI/180);

    // var rotX = (x * cs - z * sn)/2;
    // var rotZ = (x * sn + z * cs)/2;

    // if(yaw != 0){
    //     console.log(`cs${cs} sn${sn} ${x/2} rotX${rotX} z${z/2} rotZ${rotZ}`);
    // }
    if(xplus){
        addSquare(
            addVec(center,rotateYawVec([+x/2,+y/2,+z/2],yaw)),
            addVec(center,rotateYawVec([+x/2,+y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([+x/2,-y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([+x/2,-y/2,+z/2],yaw)), [1,0,0], color, cp);
    }
    if(xminus){
        addSquare(
            addVec(center,rotateYawVec([-x/2,+y/2,+z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,+y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,-y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,-y/2,+z/2],yaw)), [-1,0,0], color, cp);
    }
    if(yminus){
        addSquare(
            addVec(center,rotateYawVec([+x/2,-y/2,+z/2],yaw)),
            addVec(center,rotateYawVec([+x/2,-y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,-y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,-y/2,+z/2],yaw)), [0,-1,0], color, cp);
    }
    if(yplus){
        addSquare(
            addVec(center,rotateYawVec([x/2,y/2,z/2],yaw)),
            addVec(center,rotateYawVec([x/2,y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,y/2,z/2],yaw)), [0,1,0], color, cp);
    }
    if(zplus){
        addSquare(
            addVec(center,rotateYawVec([+x/2,+y/2,+z/2],yaw)),
            addVec(center,rotateYawVec([+x/2,-y/2,+z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,-y/2,+z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,+y/2,+z/2],yaw)), [0,0,1], color, cp);
    }
    if(zminus){
        addSquare(
            addVec(center,rotateYawVec([+x/2,+y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([+x/2,-y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,-y/2,-z/2],yaw)),
            addVec(center,rotateYawVec([-x/2,+y/2,-z/2],yaw)), [0,0,-1], color, cp);
        // console.log("zminus")
        }
    
}

function createCube(center,s, color, xplus=1,xminus=1,yplus=1,yminus=1,zplus=1,zminus=1, cp=undefined){
    createRect(center,s,s,s, color, xplus,xminus,yplus,yminus,zplus,zminus, cp);
}

function pointToProjected(vertex){
    if(vertex.length != 3) throw new Error(`pTP Error: Vertex ${vertex} is not the right size`);
    var vert = rotateTranslate(vertex);
    // var px = (fov * vert[0])/(fov + vert[2]);
    // var py = (fov * vert[1])/(fov + vert[2]);
    var px = vert[0];
    var py = vert[1];
    return [px, py];
}

function squareToQuad(square){
    // console.log(vertices[square[0]]);
    var q = {
        a:pointToProjected(vertices[square.vertix[0]]),
        b:pointToProjected(vertices[square.vertix[1]]),
        c:pointToProjected(vertices[square.vertix[2]]),
        d:undefined};
    if(square.vertix.length > 3){
        q.d = pointToProjected(vertices[square.vertix[3]]);
    }
    // quads.push(q);
    return q;
}

function addSquare(e, f, g, h, normal, color, cp = undefined){
    // var vert = vertices.length;
    var square = {vertix:[-1,-1,-1,-1], normal: normal, color: color, cntr: cp};
    // squares.push([-1,-1,-1,-1]);

    var vrt = search(vertices,e);
    // console.log(vrt);
    if(vrt == -1){
        square.vertix[0] = vertices.length;
        vertices.push(e);
    }else{
        square.vertix[0] = vrt;
    }

    vrt = search(vertices,f);
    if(vrt == -1){
        square.vertix[1] = vertices.length;
        vertices.push(f);
        
    }else{
        square.vertix[1] = vrt;
    }

    vrt = search(vertices,g);
    if(vrt == -1){
        square.vertix[2] = vertices.length;
        vertices.push(g);
        
    }else{
        square.vertix[2] = vrt;
    }

    if(h != undefined){
        vrt = search(vertices,h);
        if(vrt == -1){
            square.vertix[3] = vertices.length;
            vertices.push(h);
            
        }else{
            square.vertix[3] = vrt;
        }
    }else{
        square.vertix.pop();
    }

    if(square.cntr == undefined){
        midpt = [0,0,0];
        // console.log(squares[i].vertix.length);
        for(var j = 0; j < square.vertix.length; j ++){
            for(var p = 0; p < 3; p ++){
                // console.log(`mid:${midpt}`);
                midpt = addVec(midpt,scaleVec(vertices[square.vertix[j]],1/square.vertix.length));
            }    
        }
        square.cntr = midpt;
    }

    squares.push(square);
}

function drawing(){
    reset();
    createBackground();
    createTank();
    for(var i = 0; i < squares.length; i ++){

        if(dotVec(squares[i].normal, cameraDir) < 0){
            var q = squareToQuad(squares[i]);
            // console.log(squares[i],squares[i].color);
            // console.log(q)
            shadow = dotVec(squares[i].normal, norm(light_direction));
            // fillQuad(q,height/projectionPanelHeight,[width/2,height/2],vectorToColorCode(scaleVec(squares[i].normal,shadow)));
            // strokeQuad(q,height/projectionPanelHeight,[width/2,height/2], "#000000", 1);
            // midpt = [0,0,0];
            // // console.log(squares[i].vertix.length);
            // for(var j = 0; j < squares[i].vertix.length; j ++){
            //     for(var p = 0; p < 3; p ++){
            //         // console.log(`mid:${midpt}`);
            //         midpt = addVec(midpt,scaleVec(vertices[squares[i].vertix[j]],1/squares[i].vertix.length));
            //     }    
            // }
            var midpt = squares[i].cntr;
            // console.log(`1:${subVec(camCore,midpt)} 2:${absVec(subVec(camCore,midpt))} 3:${magVec(absVec(subVec(camCore,midpt)))}`);
            var dist = magVec(absVec(subVec(camCore,midpt)));
            var shape = {quad: q, color: scaleVec(squares[i].color,shadow), midpt: midpt, dst: dist};
            var added = false;
            // console.log(camCore);
            for(var sh = 0; sh < shapes.length; sh ++){
                var distSH = magVec(absVec(subVec(camCore,shapes[sh].midpt)));
                // console.log(`sh:${distSH} <? d:${dist}`);
                if(distSH < dist){
                    added = true;
                    // console.log(`shapezPRE:${shapes}`);
                    shapes.splice(sh,0,shape);
                    // console.log(`shapezPOST:${shapes}`);
                    break;
                }
            }
            if(!added){
                shapes.push(shape);
            }
            // console.log(q,height/projectionPanelHeight,[width/2,height/2]);
        }
    }

    for(var s = 0; s < shapes.length; s++){
        fillQuad(shapes[s].quad, height/projectionPanelHeight, [width/2,height/2], vectorToColorCode(shapes[s].color));
        strokeQuad(shapes[s].quad, height/projectionPanelHeight, [width/2,height/2], "#000000", 1);
    }
    setTimeout(drawing,50);
}

function createBackground(){
    for(var i = 0; i < mapWidth; i ++){
        for(var j = 0; j < mapHeight; j ++){
            // createCube([i+0.5,0.5,j+0.5],1);
            if(Math.random()>0.9){
                createCube([i+0.5 - mapWidth/2,0.5,j+0.5 - mapHeight/2],1,[0.9,0.9,0.9], 0,0,1,0,0,1, true);
            }
        }
    }
    for(var i = 0; i < mapWidth; i ++){
        for(var j = 0; j < mapHeight; j ++){
            // createCube([i+0.5,0.5,j+0.5],1);
            createRect([i+0.5 - mapWidth/2,-0.5,j+0.5 - mapHeight/2], 1,1,1, [1,1,1], 0, 0, 1, 0, 0, 0, true);
            // addSquare([-mapWidth/2,0,-mapHeight/2],[mapWidth/2,0,-mapHeight/2],[mapWidth/2,0,mapHeight/2],[-mapWidth/2,0,mapHeight/2],[0,1,0]);
        }
    }
    for(var i = 0; i < mapWidth+2; i ++){
        createRect([i-0.5 - mapWidth/2,0.5, - 0.5 - mapHeight/2], 1,1,1, [0.7,1,1], 0, 0, 1, 0, 0, 1, true);
    }
    for(var i = 0; i < mapWidth; i ++){
        createRect([i+0.5 - mapWidth/2,0.5, + 0.5 + mapHeight/2], 1,1,1, [0.7,1,1], 0, 0, 0, 0, 0, 1, true);
    }
    for(var i = 0; i < mapHeight; i ++){
        createRect([-0.5 - mapWidth/2,0.5, i+ 0.5 - mapHeight/2], 1,1,1, [0.7,1,1], 0, 0, 1, 0, 0, 0, true);
    }
    for(var i = 0; i < mapHeight; i ++){
        createRect([+0.5 + mapWidth/2,0.5, i+ 0.5 - mapHeight/2], 1,1,1, [0.7,1,1], 0, 0, 1, 0, 0, 0, true);
    }

}

function createTank(){
    loc = [0,0,0];
    createRect(addVec(loc,[0.5,0.125,0]), 5/8, 2/8, 5/8, [0.8, 0.1, 0.2],1,1,1,0,1,1, addVec(loc,[0.5,0.5,0]));
    createRect(addVec(loc,[0.5,5/16,0]), 3/8, 1/8, 3/8, [0.8, 0.1, 0.2],1,1,1,0,1,1, addVec(loc,[0.5,0.7,0]),0);
    createRect(addVec(loc,[27/32,9/32,0]), 5/16, 1/16, 1/8, [0.6, 0.6, 0.6],1,1,1,0,1,1, addVec(loc,[0.1,0.6,0]));
    createRect(addVec(loc,[0.5,3/16,-3/8]), 7/8, 2/8, 1/8, [0.6, 0.6, 0.6],1,1,1,0,1,1, addVec(loc,[0.5,0.5,-0.1]));
    createRect(addVec(loc,[0.5,3/16, 3/8]), 7/8, 2/8, 1/8, [0.6, 0.6, 0.6],1,1,1,0,1,1, addVec(loc,[0.5,0.5,0.1]));
}

document.addEventListener('DOMContentLoaded', function(){
    // addSquare([0,0,0])
    
    // addSquare([-mapWidth/2,0,-mapHeight/2],[mapWidth/2,0,-mapHeight/2],[mapWidth/2,0,mapHeight/2],[-mapWidth/2,0,mapHeight/2],[0,1,0],[1,1,1],[0,-100,0]);


    

    // createRect([0.5,0,0], 5/8, 2/8, 5/8, [0.8, 0.1, 0.2],0,0,1,0,0,1, [0.5,0.5,0.5]);

    // createRect([2.5,0.125,0.125], 5/8, 2/8, 5/8, [0.8, 0.1, 0.2],0,0,1,0,0,1, [2.5,0.5,0.5]);
    // addSquare([1,1,1],[1,2,1],[2,1,1],undefined,[0,0,-1]);
    // addSquare([1,2,1],[2,1,1],[1,1,0],undefined,[1,1,-1]);
    // createCube([0.5,0.5,1],1,[0.9,0.9,0.9],0,0,1,0,0,1);
    // createCube([1.5,0.5,1],1,[0.9,0.9,0.9],0,0,1,0,0,1, true);
    // createCube([2.5,0.5,1],1,[0.9,0.9,0.9],0,0,1,0,0,1,[2.5,0.5,1]);
    // createCube([0,0.5,4],1,[0.9,0.9,0.9]);
    // createCube([0,0.5,5],1,[0.9,0.9,0.9]);
    resize();
    // console.log(squares);
    // console.log(vertices);
    drawing();
    // console.log(shapes);
    
    // console.log(quads);
}); 