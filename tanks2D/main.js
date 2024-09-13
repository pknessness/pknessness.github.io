var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var height = 0;
var width = 0;
const aspect = 16.0/9.0;

const mapWidth = 22;
const mapHeight = 17;

var tileHeight = 0;
var tileWidth = 0;

var tileColor = [1,1,1];
var tileBorder = [0,0,0];

var tanks = [];
const tankConfigs = {body_size:5/8,tread_width:1/8,tread_length:7/8,turret_size:3/8,turret_length:3/8,hitbox:7/8};
const tankColors = [{color:[0.9,0.1,0.2],border:[0,0,0]}];

function vectorToColorCode(colorVector){
    var vec = absVec(colorVector);
    var r = Math.floor(vec[0] * 255.9).toString(16);
    var g = Math.floor(vec[1] * 255.9).toString(16);
    var b = Math.floor(vec[2] * 255.9).toString(16);
    // console.log(`${vec} #${r.length>1 ? r : `0${r}`}${g.length>1 ? g : `0${g}`}${b.length>1 ? b : `0${b}`}`)
    return `#${r.length>1 ? r : `0${r}`}${g.length>1 ? g : `0${g}`}${b.length>1 ? b : `0${b}`}`;
}

function calculatePlayerMovement(){
    
}

function loadLevel(){

}

function calculateAI(){

}

function calculateBullets(){

}

function draw(){
    ctx.rect(0, 0, width, height);
    ctx.fill();
    drawTiles();
    console.log("D")
    drawTank([0.5,0.5],0,0,0);
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
    tileHeight = Math.floor(height/(mapHeight+1));
    tileWidth = tileHeight;// * Math.sqrt(2);
}

function drawTiles(){
    var centerW = width/2;
    var centerH = height/2;
    for(var i = 0; i < mapWidth; i ++){
        var topLeftX = (-mapWidth/2 + i) * tileWidth + centerW;
        for(var j = 0; j < mapHeight; j++){
            var topLeftY = (-mapHeight/2 + j) * tileHeight + centerH;
            ctx.strokeStyle = vectorToColorCode(tileBorder);
            ctx.fillStyle = vectorToColorCode(tileColor);
            ctx.beginPath();
            ctx.rect(topLeftX, topLeftY, tileWidth, tileHeight);
            ctx.fill();
            ctx.stroke();
        }
    }
}

function drawTank(loc, baseYaw, topYaw, tankColorId){
    var offset = [
        (-mapWidth/2 + loc[0]) * tileWidth + width/2,
        (-mapHeight/2 + loc[1]) * tileHeight + height/2];
    ctx.strokeStyle = vectorToColorCode(tankColors[tankColorId].border);
    ctx.fillStyle = vectorToColorCode(tankColors[tankColorId].color);

    var cs = Math.cos(baseYaw);
    var sn = Math.sin(baseYaw);

    // v2 = [v2[0], v2[1] * cs - v2[2] * sn, v2[1] * sn + v2[2] * cs];

    var body_a = tankConfigs.body_size*tileWidth*cs - tankConfigs.body_size*tileHeight*sn;
    var body_b = - tankConfigs.body_size*tileWidth*sn - tankConfigs.body_size*tileHeight*cs; 

    // console.log(tileWidth, tileHeight, a, b);

    
    // ctx.rect(loc, topLeftY, tileWidth, tileHeight);
    // var p1 = [loc[0] + a, loc[1] + b];
    // var p2 = [loc[0] - b, loc[1] + a];
    // var p3 = [loc[0] - a, loc[1] - b];
    // var p4 = [loc[0] + b, loc[1] - a];

    // console.log(`p1:${p1} p2:${p2} p3:${p3} p4:${p4}`);

    ctx.beginPath();
    ctx.moveTo(offset[0] + body_a/2, offset[1] + body_b/2);
    ctx.lineTo(offset[0] - body_b/2, offset[1] + body_a/2);
    ctx.lineTo(offset[0] - body_a/2, offset[1] - body_b/2);
    ctx.lineTo(offset[0] + body_b/2, offset[1] - body_a/2);
    ctx.lineTo(offset[0] + body_a/2, offset[1] + body_b/2);
    ctx.endPath();
    ctx.fill();
    ctx.stroke();
}

document.addEventListener('DOMContentLoaded', function(){
    resize();
    draw();
}); 