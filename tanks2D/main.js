var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:   13,
    ESC:      27,
    SPACE:    32,
    PAGEUP:   33,
    PAGEDOWN: 34,
    END:      35,
    HOME:     36,
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
    INSERT:   45,
    DELETE:   46,
    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA:    192
};

var height = 0;
var width = 0;
const aspect = 16.0/9.0;

const mapWidth = 22;
const mapHeight = 17;

var tileSize = 0;
var tileSize = 0;

var tileColor = [1,1,1];
var tileBorder = [0,0,0];

var players = [{input:{left:0,right:0,up:0,down:0, bomb:0, shoot:0, mouseX:0, mouseY:0}, movement:[0,0]}];

var prevDelta = 1;

const bullet_size = [4/8,2/8];

var walls = [];

const wallColors = ["#000000", "#121212", "#D38494"];

//Player, Brown, Ash, Marine, Yellow, Pink, Green, Violet, White, bLack
var tanks = [{type:'1', velocity:[0,0], pos:[0.5,0.5], heading:0, yaw:0, bullets: [],settings:0, shot:0}];
const tankConfigs = {body_size:5/8,tread_width:1/8,tread_length:7/8,turret_size:3/8,barrel_length:2/8,barrel_width:1/8,hitbox:7/8};
const tankSettings = [{speed:0.045, turn_speed:0.09, bullet_speed:0.1,fire_rate:0, ricocchet:0, max_bullets:0,max_mines:0,behavior:'controlled'}];
const tankColors = [{color:[0.9,0.1,0.2],border:[0,0,0]}];

document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

function offsetCoords(loc){
    var offset = [
        (-mapWidth/2 + loc[0]) * tileSize + width/2,
        (-mapHeight/2 + loc[1]) * tileSize + height/2];
    return offset;
}

function modPI(angle){
    while(angle < 0) angle += Math.PI;
    return angle % Math.PI;
}

function deltaPI(current, target){
    // console.log(modPI(target - current),modPI(current - target));
    if(Math.abs(current - target) < 0.1){
        return 0;
    }
    if(modPI(target - current) > modPI(current - target)){
        prevDelta = 1;
        return 1;
    }else if(modPI(target - current) < modPI(current - target)){
        prevDelta = -1;
        return -1;
    }else{
        return prevDelta;
    }
}

function onkey(ev, key, pressed) {
    switch(key) {
        case KEY.W:  players[0].input.up = pressed; ev.preventDefault(); break;
        case KEY.A: players[0].input.left = pressed; ev.preventDefault(); break;
        case KEY.S:  players[0].input.down = pressed; ev.preventDefault(); break;
        case KEY.D: players[0].input.right = pressed; ev.preventDefault(); break;
        case KEY.SPACE: players[0].input.bomb = pressed; ev.preventDefault(); break;
        case KEY.E: players[0].input.shoot = pressed; ev.preventDefault(); break; 
    }
    players[0].movement = [
        players[0].input.right - players[0].input.left,
        players[0].input.down - players[0].input.up];
    // console.log(players[0].movement);
}

function vectorToColorCode(colorVector){
    var vec = absVec(colorVector);
    var r = Math.floor(vec[0] * 255.9).toString(16);
    var g = Math.floor(vec[1] * 255.9).toString(16);
    var b = Math.floor(vec[2] * 255.9).toString(16);
    // console.log(`${vec} #${r.length>1 ? r : `0${r}`}${g.length>1 ? g : `0${g}`}${b.length>1 ? b : `0${b}`}`)
    return `#${r.length>1 ? r : `0${r}`}${g.length>1 ? g : `0${g}`}${b.length>1 ? b : `0${b}`}`;
}

function calculateTankMovement(){
    // console.log(tankSettings[tanks[0].settings].speed);
    for(var i = 0; i < tanks.length; i ++){
        var tank = tanks[i];
        
        //PER TANK CALCULATIONS
        if(tank.type == '1'){
            tank.velocity[0] = players[0].movement[0];
            tank.velocity[1] = players[0].movement[1];
        }

        //ALL TANK CALCULATIONS
        var mag = Math.sqrt(tank.velocity[0]**2 + tank.velocity[1]**2);
        if(mag != 0){
            tank.velocity = [tank.velocity[0]/mag,tank.velocity[1]/mag];
        }
        
        if(tank.velocity[0] != 0 || tank.velocity[1] != 0){
            var targetHeading = Math.atan2(-tank.velocity[1],tank.velocity[0]);
            var targetHeading = modPI(Math.atan2(-tank.velocity[1],tank.velocity[0]));

            var delta = deltaPI(tank.heading,targetHeading);
            if(delta == 0){
                tank.heading = targetHeading;
                
                tank.pos[0] += tank.velocity[0] * tankSettings[tank.settings].speed;
                tank.pos[1] += tank.velocity[1] * tankSettings[tank.settings].speed;
            }else if(delta == 1){
                tank.heading -= tankSettings[tank.settings].turn_speed;
            }else if(delta == -1){
                tank.heading += tankSettings[tank.settings].turn_speed;
            }
            
            tank.heading = modPI(tank.heading);
        }
    }
    // console.log(tanks[0].pos);
}

function calculateTankShooting(){
    // console.log(tankSettings[tanks[0].settings].speed);
    // console.log(players[0].input.shoot);
    for(var i = 0; i < tanks.length; i ++){
        var tank = tanks[i];
        
        //PER TANK CALCULATIONS
        if(tank.type == '1'){
            if(players[0].input.shoot){
                if(tank.shot == 0){
                    tank.shot = 1;
                }else{
                    tank.shot = 2;
                }
            }else{
                tank.shot = 0;
            }
        }

        var cs = Math.cos(tank.yaw);
        var sn = Math.sin(tank.yaw);

        var offset = [
            (-mapWidth/2 + tank.pos[0]) * tileSize + width/2,
            (-mapHeight/2 + tank.pos[1]) * tileSize + height/2];

        var os = (tankConfigs.turret_size/2 + tankConfigs.barrel_length);

        //ALL TANK SHOT CALCULATIONS
        if(tank.shot == 1){
            console.log("shit", tank.shot);
            tank.shot = 2;
            tank.bullets.push({pos:[tank.pos[0] + os*cs,tank.pos[1] - os*sn],angle:tank.yaw,speed:tankSettings[tank.settings].bullet_speed,bounces:1});
        }
    }
    // console.log(tanks[0].pos);
}

function calculateYaw(){
    var offset = [
        (-mapWidth/2 + tanks[0].pos[0]) * tileSize + width/2,
        (-mapHeight/2 + tanks[0].pos[1]) * tileSize + height/2];
    tanks[0].yaw = -Math.atan2(players[0].input.mouseY - offset[1], players[0].input.mouseX - offset[0]);
}

canvas.addEventListener("mousemove", function(e) { 
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    players[0].input.mouseX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    players[0].input.mouseY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
});

function loadLevel(level){
    walls = [];
    walls.push({a:[0,0],b:[0,mapHeight], type:'v', class:0});
    walls.push({a:[0,mapHeight],b:[mapWidth,mapHeight], type:'h', class:0});
    walls.push({a:[mapWidth,mapHeight],b:[mapWidth,0], type:'v', class:0});
    walls.push({a:[mapWidth,0],b:[0,0], type:'h', class:0});
    for(var i = 0; i < mapWidth; i ++){
        for(var j = 0; j < mapHeight; j++){
            // console.log(levelStorage[level][j][i]);
            if(levelStorage[level][j][i] > 0){
                if(i != 0 && levelStorage[level][j][i-1] == 0){
                    walls.push({a:[i,j],b:[i,j+1], type:'v', class: levelStorage[level][j][i]}); //LEFTSIDE
                }
                if(j != mapHeight && levelStorage[level][j+1][i] == 0){
                    walls.push({a:[i,j+1],b:[i+1,j+1], type:'h', class: levelStorage[level][j][i]}); //BOTTOM
                }
                if(i != mapWidth && levelStorage[level][j][i+1] == 0){
                    walls.push({a:[i+1,j+1],b:[i+1,j], type:'v', class: levelStorage[level][j][i]}); //RIGHTSIDE
                }
                if(j != 0 && levelStorage[level][j-1][i] == 0){
                    walls.push({a:[i+1,j],b:[i,j], type:'h', class: levelStorage[level][j][i]}); //TOP
                }
            }
        }
    }
}

function vertWall(wall, bullet){
    if(wall.a[0] != wall.b[0]){
        // throw new Error("Wall not vertical");
        return;
    }

    var slope = -Math.tan(bullet.angle);
    var ypt = slope * (wall.a[0] - bullet.pos[0]) + bullet.pos[1];

    // console.log(`slope:${slope} ypt:${ypt} wall.a:${wall.a} wall.b:${wall.b} bullet.pos:${bullet.pos} angle:${bullet.angle} d:${(wall.a[0] - bullet.pos[0])/Math.cos(bullet.angle)}`);

    if((ypt < wall.b[1] && ypt > wall.a[1]) || (ypt > wall.b[1] && ypt < wall.a[1])){
        var d = (wall.a[0] - bullet.pos[0])/Math.cos(bullet.angle);

        if(d > 0){
            // console.log('hit',d,ypt);
            return {point:[wall.a[0],ypt],distance:d, type:wall.type};
        }
    }
    return undefined;
}

function horiWall(wall, bullet){
    if(wall.a[1] != wall.b[1]){
        // throw new Error("Wall not vertical");
        return;
    }

    console.log(`slope:${slope} ypt:${ypt} wall.a:${wall.a} wall.b:${wall.b} bullet.pos:${bullet.pos} angle:${bullet.angle} d:${(wall.a[0] - bullet.pos[0])/Math.cos(bullet.angle)}`);


    var slope = -1/Math.tan(bullet.angle);
    var ypt = slope * (wall.a[1] - bullet.pos[1]) + bullet.pos[0];

    if((ypt < wall.b[0] && ypt > wall.a[0]) || (ypt > wall.b[0] && ypt < wall.a[0])){
        var d = (wall.a[1] - bullet.pos[1])*Math.cos(bullet.angle);

        if(d > 0){
            return {point:[ypt,wall.a[1]],distance:d, type:wall.type};
        }
    }
    return undefined;
}

function calculateBullets(){
    for(var i = 0; i < tanks.length; i ++){
        for(var b = 0; b < tanks[i].bullets.length; b++){
            var bullet = tanks[i].bullets[b];
            var cs = Math.cos(bullet.angle);
            var sn = Math.sin(bullet.angle);

            bullet.pos[0] += bullet.speed * cs;
            bullet.pos[1] -= bullet.speed * sn;

            var closest = undefined;
            for(var w = 0; w < walls.length; w++){
                var h = undefined;
                if(walls[w].type == 'v'){
                    h = vertWall(walls[w],bullet);
                }else if(walls[w].type == 'h'){
                    h = horiWall(walls[w],bullet);
                }
                if(h != undefined){
                    // console.log(h);
                    if(closest == undefined || closest.distance > h.distance){
                        closest = h;
                    }
                }
            }
            if(closest != undefined){
                if(closest.distance < bullet.speed){
                    if(bullet.bounces > 0){
                        if(closest.type == 'h'){
                            console.log(bullet.angle, 2*Math.PI - bullet.angle);
                            bullet.angle = 2*Math.PI - bullet.angle;
                            var disp = closest.point[0] - bullet.pos[0];
                            bullet.pos[0] -= disp;
                        }else if(closest.type == 'v'){
                            console.log(bullet.angle, Math.PI - bullet.angle);
                            bullet.angle = Math.PI - bullet.angle;
                            var disp = closest.point[1] - bullet.pos[1];
                            bullet.pos[1] -= disp;
                        }
                        bullet.bounces -= 1;
                    }else{
                        tanks[i].bullets.splice(b, 1);
                    }
                }
            }
        }
    }
}

function drawCursor(tankPos, cursorX, cursorY){
    var offset = [
        (-mapWidth/2 + tankPos[0]) * tileSize + width/2,
        (-mapHeight/2 + tankPos[1]) * tileSize + height/2];

    var displace = [cursorX-offset[0],cursorY-offset[1]];

    var numPoints = 9;

    ctx.fillStyle = "#A3D2FF";
    for(var i = 1; i < numPoints; i++){
        ctx.beginPath();
        ctx.arc(offset[0] + i*displace[0]/numPoints, offset[1] + i*displace[1]/numPoints, 4, 0, 2 * Math.PI);
        ctx.fill();
        // ctx.stroke();
    }

    ctx.fillStyle = "#DDDDDD";
    ctx.strokeStyle = "#A3D2FF";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    var lineIn = 15;
    var lineOut = 30;

    ctx.fillStyle = "#A3D2FF";

    ctx.beginPath();
    ctx.moveTo(cursorX + lineIn, cursorY);
    ctx.lineTo(cursorX + lineOut, cursorY);

    ctx.moveTo(cursorX - lineIn, cursorY);
    ctx.lineTo(cursorX - lineOut, cursorY);

    ctx.moveTo(cursorX, cursorY + lineIn);
    ctx.lineTo(cursorX, cursorY + lineOut);

    ctx.moveTo(cursorX, cursorY - lineIn);
    ctx.lineTo(cursorX, cursorY - lineOut);
    ctx.stroke();
    ctx.lineWidth = 1;
}

function drawBullet(bullet){

    var offset = [
        (-mapWidth/2 + bullet.pos[0]) * tileSize + width/2,
        (-mapHeight/2 + bullet.pos[1]) * tileSize + height/2];

    var bW = bullet_size[0]*tileSize;
    var bH = bullet_size[1]*tileSize;

    var p1 = rotatePoint([bW/2-bW/4,bH/2],bullet.angle);
    var p2 = rotatePoint([-bW/2,bH/2],bullet.angle);
    var p3 = rotatePoint([-bW/2,-bH/2],bullet.angle);
    var p4 = rotatePoint([bW/2-bW/4,-bH/2],bullet.angle);
    var p5 = rotatePoint([bW/2,0],bullet.angle);

    ctx.fillStyle = "#FFFFCC";
    ctx.strokeStyle = "#444400";
    ctx.beginPath();
    ctx.moveTo(offset[0] + p1[0], offset[1] + p1[1]);
    ctx.lineTo(offset[0] + p2[0], offset[1] + p2[1]);
    ctx.lineTo(offset[0] + p3[0], offset[1] + p3[1]);
    ctx.lineTo(offset[0] + p4[0], offset[1] + p4[1]);
    ctx.lineTo(offset[0] + p5[0], offset[1] + p5[1]);
    ctx.lineTo(offset[0] + p1[0], offset[1] + p1[1]);
    ctx.fill();
    ctx.stroke();

    // console.log(offset[0]+p1[0],offset[1]+p1[1]);
}

function drawWall(wall){
    ctx.lineWidth = 4;
    ctx.strokeStyle = wallColors[wall.class];
    ctx.beginPath();
    ctx.moveTo(offsetCoords(wall.a)[0],offsetCoords(wall.a)[1]);
    ctx.lineTo(offsetCoords(wall.b)[0],offsetCoords(wall.b)[1]);
    ctx.stroke();
    ctx.lineWidth = 1;
}

function draw(){
    // playerInput();

    ctx.fillStyle = "#000000";
    ctx.rect(0, 0, width, height);
    ctx.fill();

    drawTiles();

    calculateYaw();

    drawTank(tanks[0].pos,tanks[0].heading,tanks[0].yaw,0);
    drawCursor(tanks[0].pos,players[0].input.mouseX,players[0].input.mouseY)

    for(var i = 0; i < tanks.length; i ++){
        for(var b = 0; b < tanks[i].bullets.length; b++){
            drawBullet(tanks[i].bullets[b]);
        }
    }

    for(var w = 0; w < walls.length; w++){
        drawWall(walls[w]);
    }
    // ctx.font = "48px serif";
    // ctx.fillText(`tank:${tanks[0].heading} targ:${targetHeading}`, 10, 50);
}

function resize(){
    var tot_width = document.getElementById("sunk").offsetWidth;
    var tot_height = document.getElementById("sunk").offsetHeight;

    height = Math.min(tot_width/aspect, tot_height) - 10;
    width = height * aspect;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width;
    canvas.style.height = height;
    // ctx.rect(0, 0, 1000000, 1000000);
    //ctx.fill();
    tileSize = Math.floor(height/(mapHeight+1));
    // tileSize = tileSize;// * Math.sqrt(2);
}

function drawTiles(){
    var centerW = width/2;
    var centerH = height/2;
    for(var i = 0; i < mapWidth; i ++){
        var topLeftX = (-mapWidth/2 + i) * tileSize + centerW;
        for(var j = 0; j < mapHeight; j++){
            var topLeftY = (-mapHeight/2 + j) * tileSize + centerH;
            ctx.strokeStyle = vectorToColorCode(tileBorder);
            ctx.fillStyle = vectorToColorCode(tileColor);
            ctx.beginPath();
            ctx.rect(topLeftX, topLeftY, tileSize, tileSize);
            ctx.fill();
            ctx.stroke();
        }
    }
}

function rotatePoint(p, angle){
    var cs = Math.cos(angle);
    var sn = Math.sin(angle);

    var a = p[0]*cs - p[1]*sn;
    var b = - p[0]*sn - p[1]*cs; 
    return [a,b];
}

function drawRect(loc, x, y, angle){

    var p1 = rotatePoint([x/2,y/2],angle);
    var p2 = rotatePoint([-x/2,y/2],angle);
    var p3 = rotatePoint([-x/2,-y/2],angle);
    var p4 = rotatePoint([x/2,-y/2],angle);

    ctx.beginPath();
    ctx.moveTo(loc[0] + p1[0], loc[1] + p1[1]);
    ctx.lineTo(loc[0] + p2[0], loc[1] + p2[1]);
    ctx.lineTo(loc[0] + p3[0], loc[1] + p3[1]);
    ctx.lineTo(loc[0] + p4[0], loc[1] + p4[1]);
    ctx.lineTo(loc[0] + p1[0], loc[1] + p1[1]);
    ctx.fill();
    ctx.stroke();
}

function drawTank(loc, baseYaw, topYaw, tankColorId){
    var offset = [
        (-mapWidth/2 + loc[0]) * tileSize + width/2,
        (-mapHeight/2 + loc[1]) * tileSize + height/2];
    

    var cs = Math.cos(baseYaw);
    var sn = Math.sin(baseYaw);

    ctx.strokeStyle = vectorToColorCode(tankColors[tankColorId].border);
    ctx.fillStyle = vectorToColorCode(tankColors[tankColorId].color);

    drawRect(offset, tankConfigs.body_size*tileSize, tankConfigs.body_size*tileSize, baseYaw);

    // ctx.beginPath();
    // ctx.moveTo(offset[0],offset[1]);
    // ctx.lineTo(
    //     tankConfigs.body_size*tileSize*cs/2 + offset[0], 
    //     -tankConfigs.body_size*tileSize*sn/2 + offset[1]
    // )
    // ctx.strokeStyle = "#20FF10";
    // ctx.stroke();

    ctx.strokeStyle = vectorToColorCode(tankColors[tankColorId].border);
    ctx.fillStyle = "#999999";

    var os = (tankConfigs.body_size/2 + tankConfigs.tread_width/2);

    drawRect([offset[0] + sn*os*tileSize,offset[1] + cs*os*tileSize], tankConfigs.tread_length*tileSize, tankConfigs.tread_width*tileSize, baseYaw);
    drawRect([offset[0] - sn*os*tileSize,offset[1] - cs*os*tileSize], tankConfigs.tread_length*tileSize, tankConfigs.tread_width*tileSize, baseYaw);

    //TURRET
    ctx.strokeStyle = vectorToColorCode(tankColors[tankColorId].border);
    ctx.fillStyle = "#999999";

    var os = (tankConfigs.turret_size/2 + tankConfigs.barrel_length/2);

    drawRect([offset[0] + Math.cos(topYaw)*os*tileSize,offset[1] - Math.sin(topYaw)*os*tileSize], tankConfigs.barrel_length*tileSize, tankConfigs.barrel_width*tileSize, topYaw);

    ctx.strokeStyle = vectorToColorCode(tankColors[tankColorId].border);
    ctx.fillStyle = vectorToColorCode(tankColors[tankColorId].color);

    drawRect(offset, tankConfigs.turret_size*tileSize, tankConfigs.turret_size*tileSize, topYaw);
}

function loop(){
    calculateBullets();
    calculateTankMovement();
    calculateTankShooting();

    draw();
    
    setTimeout(loop,20);
}

document.addEventListener('DOMContentLoaded', function(){
    resize();
    loadLevel(1);
    // draw();
    loop();
}); 