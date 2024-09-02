var w = 10;
var h = 10;
var fov = 0;
var camlength = 0;
var mult = 0;

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

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
}

function perPixel(x, y){
    return color(Math.floor(255 - 42.5 * x), Math.floor(255 - 42.5 * y), 0);
}

function drawPixel(x, y, c){
    console.log(typeof c);
    ctx.fillStyle = c;
    console.log(`x:${x} y:${y} color:${c}`);
    ctx.fillRect(x*mult, y*mult, mult, mult);
}

function draw(){
    for(var i = 0; i < w; i ++){
        for(var j = 0; j < h; j ++){
            drawPixel(i, j, perPixel(i, j));
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){
    resize();
    draw();
}); 