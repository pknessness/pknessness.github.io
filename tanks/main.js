var height = 0;
var width = 0;
var aspect = 16.0/9.0;
var fov = 2000;

var projectionPanelHeight = 14;
var projectionPanelPos = [0,-10,10];
var cameraDir = scaleVec(projectionPanelPos,-1);//[0,5,2];
var cameraSideways = [0,0,1]; //can be undefined and will autogen

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var mapWidth = 22;
var mapHeight = 17;

var vertices = [];
var squares = [];
var quads = [];

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
    var theta = Math.atan2(cameraDir[1],cameraDir[2]);
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
    ctx.lineTo(quad.d[0] * scale + pixelOffset[0], quad.d[1] * scale + pixelOffset[1]);
    ctx.lineTo(quad.a[0] * scale + pixelOffset[0], quad.a[1] * scale + pixelOffset[1]);
    // ctx.fillStyle = "#FFFFFF";
    ctx.stroke();
}

function createRect(center,x,y,z){
    addSquare(
        [center[0] + x/2,center[1] + y/2,center[2] + z/2],
        [center[0] + x/2,center[1] + y/2,center[2] - z/2],
        [center[0] + x/2,center[1] - y/2,center[2] - z/2],
        [center[0] + x/2,center[1] - y/2,center[2] + z/2]);
    
    addSquare(
        [center[0] - x/2,center[1] + y/2,center[2] + z/2],
        [center[0] - x/2,center[1] + y/2,center[2] - z/2],
        [center[0] - x/2,center[1] - y/2,center[2] - z/2],
        [center[0] - x/2,center[1] - y/2,center[2] + z/2]);

    addSquare(
        [center[0] + x/2,center[1] - y/2,center[2] + z/2],
        [center[0] + x/2,center[1] - y/2,center[2] - z/2],
        [center[0] - x/2,center[1] - y/2,center[2] - z/2],
        [center[0] - x/2,center[1] - y/2,center[2] + z/2]);
    
    addSquare(
        [center[0] + x/2,center[1] + y/2,center[2] + z/2],
        [center[0] + x/2,center[1] + y/2,center[2] - z/2],
        [center[0] - x/2,center[1] + y/2,center[2] - z/2],
        [center[0] - x/2,center[1] + y/2,center[2] + z/2]);

    addSquare(
        [center[0] + x/2,center[1] + y/2,center[2] + z/2],
        [center[0] + x/2,center[1] - y/2,center[2] + z/2],
        [center[0] - x/2,center[1] - y/2,center[2] + z/2],
        [center[0] - x/2,center[1] + y/2,center[2] + z/2]);
    
    addSquare(
        [center[0] + x/2,center[1] + y/2,center[2] - z/2],
        [center[0] + x/2,center[1] - y/2,center[2] - z/2],
        [center[0] - x/2,center[1] - y/2,center[2] - z/2],
        [center[0] - x/2,center[1] + y/2,center[2] - z/2]);
}

function createCube(center,s){
    createRect(center,s,s,s);
}

function pointToProjected(vertex){
    if(vertex.length != 3) throw new Error(`pTP Error: Vertex ${vertex} is not the right size`);
    var vert = rotateTranslate(vertex);
    var px = (fov * vert[0])/(fov + vert[2]);
    var py = (fov * vert[1])/(fov + vert[2]);
    return [px, py];
}

function squareToQuad(square){
    // console.log(vertices[square[0]]);
    var q = {a:pointToProjected(vertices[square[0]]),b:pointToProjected(vertices[square[1]]),c:pointToProjected(vertices[square[2]]),d:pointToProjected(vertices[square[3]])};
    quads.push(q);
    return q;
}

function addSquare(e, f, g, h){
    // var vert = vertices.length;
    var square = [-1,-1,-1,-1];
    // squares.push([-1,-1,-1,-1]);

    var vrt = search(vertices,e);
    // console.log(vrt);
    if(vrt == -1){
        square[0] = vertices.length;
        vertices.push(e);
    }else{
        square[0] = vrt;
    }

    vrt = search(vertices,f);
    if(vrt == -1){
        square[1] = vertices.length;
        vertices.push(f);
        
    }else{
        square[1] = vrt;
    }

    vrt = search(vertices,g);
    if(vrt == -1){
        square[2] = vertices.length;
        vertices.push(g);
        
    }else{
        square[2] = vrt;
    }

    vrt = search(vertices,h);
    if(vrt == -1){
        square[3] = vertices.length;
        vertices.push(h);
        
    }else{
        square[3] = vrt;
    }

    squares.push(square);
}

function drawing(){
    for(var i = 0; i < squares.length; i ++){
        var q = squareToQuad(squares[i]);
        // console.log(squares[i]);
        // console.log(q)
        // fillQuad(q,height/projectionPanelHeight,[width/2,height/2]);
        strokeQuad(q,height/projectionPanelHeight,[width/2,height/2], "#000000", 1);
        console.log(q,height/projectionPanelHeight,[width/2,height/2])
    }
}

document.addEventListener('DOMContentLoaded', function(){
    // addSquare([0,0,0])
    addSquare([-mapWidth/2,0,-mapHeight/2],[mapWidth/2,0,-mapHeight/2],[mapWidth/2,0,mapHeight/2],[-mapWidth/2,0,mapHeight/2]);
    for(var i = 0; i < mapWidth; i ++){
        for(var j = 0; j < mapHeight; j ++){
            // createCube([i+0.5,0.5,j+0.5],1);
            if(Math.random()>0.9){
                createCube([i+0.5 - mapWidth/2,0.5,j+0.5 - mapHeight/2],1);
            }
        }
    }
    resize();
    drawing();
    console.log(vertices);
    console.log(squares);
    console.log(quads);
}); 