
var components = [];

var zoomDiv = document.getElementById("zoom-div");

var componentHT = new Map();
var connectionArray = [];

// function Component(string, img, x, y, width, height) {
//   this.string = string;
//   this.img = img;
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.connectionArray = [];
//   componentHT.set(string,this);
//   console.log(componentHT);
//   this.label = createButton(string);
//   this.label.position(x, y);
//   this.label.size(width, height);
// }
var globalConnectionIndex = 0;
var connectionWidth = 16;

class Component {
  constructor(string, img, x, y, width, height) {
    this.string = string;
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.connectionArray = [];
    componentHT.set(string,this);
    //console.log(componentHT);
    this.label = createButton(string);
    this.label.position(x, y);
    this.label.size(width, height);
    this.numL = 0;
    this.numR = 0;
    this.numU = 0;
    this.numD = 0;
  }
}

class Connection {
  constructor(from, to, composition, fromFace = "", toFace = "", leftHanded = true, sBend = false) {
    this.from = from;
    this.to = to;
    this.composition = composition.split(',');
    this.leftHanded = leftHanded;
    this.sBend = sBend;
    this.fromFace = fromFace;
    this.toFace = toFace;
    this.index = globalConnectionIndex;
    this.selected = [];
    this.colors = [];
    var numComp = this.composition.length;
    for(var i = 0; i < numComp; i ++){
      this.selected.push(0);
      var color = "#777777";
      if(this.composition[i].includes("UART")){
        color = "#ffcc11";
      }else if(this.composition[i].includes("CAN")){
        color = "#bb33dd";
      }else if(this.composition[i].includes("PWM")){
        color = "#8844ff";
      }else if(this.composition[i].includes("I2C")){
        color = "#ff9911";
      }else if(this.composition[i].includes("SPI")){
        color = "#77ff44";
      }else if(this.composition[i].includes("V")){
        color = "#ee4455";
      }else if(this.composition[i].includes("GND")){
        color = "#222222";
      }
      this.colors.push(color);

      console.log(this.composition[i]);
    }

    globalConnectionIndex ++;
    this.buttons = [];
    //this.traces = [[[],[]]];
    
    if(fromFace == "" || toFace == ""){
      var fromC = componentHT.get(from);
      var toC = componentHT.get(to);
      var disX = toC.x - (fromC.x + fromC.width);
      var disY = toC.y - (fromC.y + fromC.height);
      //console.log(`x${disX}y${disY}`);
      console.log(`from ${from} at ${fromC.x},${fromC.y} to ${to} at ${toC.x},${toC.y}`);
      if(abs(disX) > abs(disY)){
        console.log(`pre:f ${this.fromIndex}/R${fromC.numR}L${fromC.numL} t ${this.toIndex}/R${toC.numR}L${toC.numL}`);
        if(fromC.x > toC.x){
          this.fromFace = "left";
          this.toFace = "right";
          fromC.numL += fromC.numL == 0 ? 0 : 1;
          toC.numR += toC.numR == 0 ? 0 : 1;
          this.fromIndex = componentHT.get(from).numL;// + (fromC.numL == 0 ? 0 : 1);
          this.toIndex = componentHT.get(to).numR;// + (toC.numR == 0 ? 0 : 1);
          fromC.numL += numComp;// + (fromC.numL == 0 ? 0 : 1);
          toC.numR += numComp;// + (toC.numR == 0 ? 0 : 1);
        }else{
          this.fromFace = "right";
          this.toFace = "left";
          fromC.numR += fromC.numR == 0 ? 0 : 1;
          toC.numL += toC.numL == 0 ? 0 : 1;
          this.fromIndex = componentHT.get(from).numR;// + (fromC.numR != 0 ? 0 : 1);
          this.toIndex = componentHT.get(to).numL;// + (toC.numL != 0 ? 0 : 1);
          fromC.numR += numComp;// + (fromC.numR == 0 ? 0 : 1);
          toC.numL += numComp;// + (toC.numL == 0 ? 0 : 1);
        }
        console.log(`post:f ${this.fromIndex}/R${fromC.numR}L${fromC.numL} t ${this.toIndex}/R${toC.numR}L${toC.numL}`);
      }else{
        if(fromC.y > toC.y){
          this.fromFace = "up";
          this.toFace = "down";
          fromC.numU += fromC.numU == 0 ? 0 : 1;
          toC.numD += toC.numD == 0 ? 0 : 1;
          this.fromIndex = componentHT.get(from).numU;
          this.toIndex = componentHT.get(to).numD;
          fromC.numU += numComp;
          toC.numD += numComp;
        }else{
          this.fromFace = "down";
          this.toFace = "up";
          fromC.numU += fromC.numU == 0 ? 0 : 1;
          toC.numD += toC.numD == 0 ? 0 : 1;
          this.fromIndex = componentHT.get(from).numD;
          this.toIndex = componentHT.get(to).numU;
          fromC.numD += numComp;
          toC.numU += numComp;
        }
      }
      if(
        fromFace == "left" && toFace == "right" ||
        fromFace == "right" && toFace == "left" ||
        fromFace == "up" && toFace == "down" ||
        fromFace == "down" && toFace == "up"){
        
        sBend = true;
      }
      console.log(`fromF${this.fromFace}toF${this.toFace} `);
      connectionArray.push(this);
    }
  }
  generateConn(){
    var srce = componentHT.get(this.from);
    var dest = componentHT.get(this.to);
    //console.log(`searched ${connectionArray[i].from},${connectionArray[i].to}i${i} ${srce.string} to ${dest.string} with ${connectionArray[i].composition}`);
    //console.log(componentHT);
    for(var j = 0; j < this.composition.length; j ++){
      var srcLoc = getTracePoint(srce,this.fromFace,this.fromIndex + j);
      var dstLoc = getTracePoint(dest,this.toFace,this.toIndex + j);
      // srcLoc[0] -= 10;
      // dstLoc[0] -= 10;
      // srcLoc[1] -= 10;
      // dstLoc[1] -= 10;
      var srcLoc2 = [...srcLoc];
      var dstLoc2 = [...dstLoc];
      
      stroke(0);
      if(this.fromFace == "left" || this.fromFace == "right"){
        srcLoc2[1] += connectionWidth;
      }else{
        srcLoc2[0] += connectionWidth;
      }
      if(this.toFace == "left" || this.toFace == "right"){
        dstLoc2[1] += connectionWidth;
      }else{
        dstLoc2[0] += connectionWidth;
      }
      // line(srcLoc[0],srcLoc[1],dstLoc[0],dstLoc[1]);
      // line(srcLoc2[0],srcLoc2[1],dstLoc2[0],dstLoc2[1]);
      stroke(200,50,120);
      
      console.log(`from_${srcLoc} to_${dstLoc} from2_${srcLoc2} to2_${dstLoc2} at ${this.fromFace}[${this.fromIndex + j}] ${this.toFace}[${this.toIndex + j}]`)
      //line((srcLoc[0]+srcLoc2[0])/2,(srcLoc[1]+srcLoc2[1])/2,(dstLoc[0]+dstLoc2[0])/2,(dstLoc[1]+dstLoc2[1])/2);
      //console.log(`index ${i} from${srcLoc} to${dstLoc}`)
      //console.log(`{x:${srce.label.x}, y:${srce.label.y}}`)
      var btn1;
      var btn2;
      var btn3;
      
      var pos1 = [0,0];
      var size1 = [0,0];
      var pos2 = [0,0]; 
      var size2 = [0,0];
      var pos3 = [0,0];
      var size3 = [0,0];

      //point(srcLoc[0],srcLoc[1]);
      //line(srcLoc[0]- 300,srcLoc[1]-10,srcLoc[0] + 300,srcLoc[1]-10);
      //line(dstLoc[0]- 300,dstLoc[1]-10,dstLoc[0] + 300,dstLoc[1]-10);

      if(this.fromFace == "right" && this.toFace == "left"){
        
        size1[0] = abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth/2 + connectionWidth*(this.composition.length/2 - j); 
        size1[1] = connectionWidth;
        
        pos1[0] = srcLoc[0]; 
        pos1[1] = srcLoc[1];

        size2[0] = connectionWidth;
        size2[1] = abs(srcLoc[1]-dstLoc[1]);

        pos2[0] = pos1[0] + size1[0];
        pos2[1] = pos1[1];

        size3[0] = abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth*(j - this.composition.length/2) - connectionWidth/2;
        size3[1] = connectionWidth;

        pos3[0] = dstLoc[0] - size3[0];
        pos3[1] = dstLoc[1];

      }else if(this.fromFace == "left" && this.toFace == "right"){

        size1[0] = abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth/2 + connectionWidth*(this.composition.length/2 - j);
        size1[1] = connectionWidth;

        pos1[0] = srcLoc[0] - size1[0]; 
        pos1[1] = srcLoc[1];
        
        size2[0] = connectionWidth;
        size2[1] = abs(srcLoc[1]-dstLoc[1]);
        
        pos2[0] = pos1[0] - connectionWidth;
        pos2[1] = pos1[1] - size2[1] + connectionWidth;

        size3[0] = abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth*(j - this.composition.length/2) - connectionWidth/2;
        size3[1] = connectionWidth;

        pos3[0] = dstLoc[0];
        pos3[1] = dstLoc[1];
        
      }else if(this.fromFace == "down" && this.toFace == "up"){
        
        size1[1] = abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth/2 + connectionWidth*(this.composition.length/2 - j); 
        size1[0] = connectionWidth;
        
        pos1[1] = srcLoc[1]; 
        pos1[0] = srcLoc[0];

        size2[1] = connectionWidth;
        size2[0] = abs(srcLoc[0]-dstLoc[0]);

        pos2[1] = pos1[1] + size1[1];
        pos2[0] = pos1[0];

        size3[1] = abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth*(j - this.composition.length/2) - connectionWidth/2;
        size3[0] = connectionWidth;

        pos3[1] = dstLoc[1] - size3[1];
        pos3[0] = dstLoc[0];

      }else if(this.fromFace == "up" && this.toFace == "down"){

        size1[1] = abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth/2 + connectionWidth*(this.composition.length/2 - j);
        size1[0] = connectionWidth;

        pos1[1] = srcLoc[1] - size1[1]; 
        pos1[0] = srcLoc[0];
        
        size2[1] = connectionWidth;
        size2[0] = abs(srcLoc[0]-dstLoc[0]);
        
        pos2[1] = pos1[1] - connectionWidth;
        pos2[0] = pos1[0] - size2[0] + connectionWidth;

        size3[1] = abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth*(j - this.composition.length/2) - connectionWidth/2;
        size3[0] = connectionWidth;

        pos3[1] = dstLoc[1];
        pos3[0] = dstLoc[0];

      }
      console.log(`p1_${pos1} s1 ${size1} p2_${pos2} s2 ${size2} p3_${pos3} s3 ${size3}`);

      btn1 = createButton("",`${j}`);
      btn1.position(pos1[0],pos1[1]);
      btn1.size(size1[0],size1[1]);
      btn1.style(`background: ${this.colors[j]};`);
      btn1.mouseOver(onHoverAbs(this, j));
      btn1.mouseOut(offHoverAbs(this, j));
      btn1.style('font-size', '0px');

      btn2 = createButton("",`${j}`);
      btn2.position(pos2[0],pos2[1]);
      btn2.size(size2[0],size2[1]);
      btn2.style(`background: ${this.colors[j]};`);
      btn2.mouseOver(onHoverAbs(this, j));
      btn2.mouseOut(offHoverAbs(this, j));
      btn1.style('font-size', '0px');

      btn3 = createButton("",`${j}`);
      btn3.position(pos3[0],pos3[1]);
      btn3.size(size3[0],size3[1]);
      btn3.style(`background: ${this.colors[j]};`);
      btn3.mouseOver(onHoverAbs(this, j));
      btn3.mouseOut(offHoverAbs(this, j));
      btn3.style('font-size: 0px;');

      this.buttons.push(btn1);
      this.buttons.push(btn2);
      this.buttons.push(btn3);
    }
  }
  // selected(j){
    
  // }

  // unselected(){
  //   this.selected = false;
  // }

  
}

function onHoverAbs(conn, j){
  return function() {onHover(conn, j);}
}
function onHover(conn, j){
  conn.selected[j] = true;
  for(var i = 0; i < conn.buttons.length; i ++){
    if(conn.buttons[i].value() == `${j}`){
      conn.buttons[i].style('background: #5ab854');
    }
  }
}
function offHoverAbs(conn, j){
  return function() {offHover(conn, j);}
}
function offHover(conn, j){
  console.log("HOVERED")
  conn.selected[j] = true;
  for(var i = 0; i < conn.buttons.length; i ++){
    if(conn.buttons[i].value() == `${j}`){
      conn.buttons[i].style(`background: ${conn.colors[j]}`);
    }
  }
}

function getTracePoint(component, face, index){
  console.log(`index${index}/L${component.numL}R${component.numR}U${component.numU}D${component.numD}`);
  pnt = [0,0];
  switch(face) {
    case "left":
      pnt[0] = component.x;
      pnt[1] = component.y + component.height/2 - ((component.numL-1) * connectionWidth)/2 - connectionWidth/2 + index * connectionWidth;
      break;
    case "right":
      pnt[0] = component.x + component.width;
      pnt[1] = component.y + component.height/2 - ((component.numR-1) * connectionWidth)/2 - connectionWidth/2 + index * connectionWidth;
      break;
    case "up":
      pnt[1] = component.y;
      pnt[0] = component.x + component.width/2 - ((component.numU-1) * connectionWidth)/2 - connectionWidth/2 + index * connectionWidth;
      break;
    case "down":
      pnt[1] = component.y + component.height;
      pnt[0] = component.x + component.width/2 - ((component.numD-1) * connectionWidth)/2 - connectionWidth/2 + index * connectionWidth;
      break;
    default:
      // code block
      //console.log("WTF NOT LEGAL");
  }
  return pnt;
}

const img = new Image();
  img.onload = () => {
    const cv = document.getElementById("defaultCanvas0");
    var ctx = cv.getContext("2d");
    //ctx.drawImage(img, (canvas.clientWidth-img.width)/2, (canvas.clientHeight-img.height)/2);
};

function setup() {
  img.src = "images/nucleo_real.jpg";
  // create canvas
  console.log("x",zoomDiv.clientWidth,"y",zoomDiv.clientHeight);
  var p5canvas = createCanvas(zoomDiv.clientWidth, zoomDiv.clientHeight);

  p5canvas.parent('zoom-div');
  const canvas = document.getElementById("defaultCanvas0");

  var c1 = new Component("Nucleo", img, 50, 50, 200, 200);
  var c2 = new Component("Jetson", img, 300, 450 ,200, 200);

  var conn1 = new Connection("Nucleo","Jetson","UART_TX,UART_RX,GND");
  var conn2 = new Connection("Jetson","Nucleo","5V");

  for(var i = 0; i < connectionArray.length; i ++){
    conn = connectionArray[i];
    conn.generateConn();
  }

  textAlign(CENTER);
}

function draw() {
  // image(bg, (canvas.clientWidth-bg.width)/2, (canvas.clientHeight-bg.height)/2, bg.width, bg.height);

  // const cv = document.getElementById("defaultCanvas0");
  // var ctx = cv.getContext("2d");
  // alert("aSdas")
  // for(var i = 0; i < componentArray.length; i ++){

  // }

  for(var i = 0; i < connectionArray.length; i ++){
    conn = connectionArray[i];
    //if(connectionArray[i])
    // for(var j = 0; j < componentArray.length; j++){


    // }
    // var srce = componentHT.get(conn.from);
    // var dest = componentHT.get(conn.to);
    // //console.log(`searched ${connectionArray[i].from},${connectionArray[i].to}i${i} ${srce.string} to ${dest.string} with ${connectionArray[i].composition}`);
    // //console.log(componentHT);
    // for(var j = 0; j < conn.composition.length; j ++){
    //   srcLoc = getTracePoint(srce,conn.fromFace,conn.fromIndex + j);
    //   dstLoc = getTracePoint(dest,conn.toFace,conn.toIndex + j);
    //   srcLoc[0] -= 10;
    //   dstLoc[0] -= 10;
    //   srcLoc[1] -= 10;
    //   dstLoc[1] -= 10;
    //   srcLoc2 = [...srcLoc];
    //   dstLoc2 = [...dstLoc];
      
    //   stroke(0);
    //   if(conn.fromFace == "left" || conn.fromFace == "right"){
    //     srcLoc2[1] += connectionWidth;
    //   }else{
    //     srcLoc2[0] += connectionWidth;
    //   }
    //   if(conn.toFace == "left" || conn.toFace == "right"){
    //     dstLoc2[1] += connectionWidth;
    //   }else{
    //     dstLoc2[0] += connectionWidth;
    //   }
    //   line(srcLoc[0],srcLoc[1],dstLoc[0],dstLoc[1]);
    //   line(srcLoc2[0],srcLoc2[1],dstLoc2[0],dstLoc2[1]);
    //   stroke(200,50,120);
    //   //console.log(`index${i} from_${srcLoc} to_${dstLoc} from2_${srcLoc2} to2_${dstLoc2}`)
    //   line((srcLoc[0]+srcLoc2[0])/2,(srcLoc[1]+srcLoc2[1])/2,(dstLoc[0]+dstLoc2[0])/2,(dstLoc[1]+dstLoc2[1])/2);
    //   //console.log(`index ${i} from${srcLoc} to${dstLoc}`)
    //   //console.log(`{x:${srce.label.x}, y:${srce.label.y}}`)
    // }
  }
  
}