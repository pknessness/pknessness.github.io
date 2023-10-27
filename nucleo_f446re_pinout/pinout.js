const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,12,12);
// ctx.drawImage(img, 20, 20);

const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, (canvas.clientWidth-img.width)/2, (canvas.clientHeight-img.height)/2);
  };
img.src = "nucleo_real.jpg";

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
