
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
    for(var i = 0; i < this.composition.length; i ++){
      this.selected.push(0);
    }
    globalConnectionIndex ++;
    this.buttons = [];
    //this.traces = [[[],[]]];
    var numComp = this.composition.length;
    if(fromFace == "" || toFace == ""){
      var fromC = componentHT.get(from);
      var toC = componentHT.get(to);
      var disX = toC.x - (fromC.x + fromC.width);
      var disY = toC.y - (fromC.y + fromC.height);
      //console.log(`x${disX}y${disY}`);
      if(abs(disX) > abs(disY)){
        if(fromC.x > toC.x){
          this.fromFace = "left";
          this.toFace = "right";
          this.fromIndex = componentHT.get(from).numL;
          this.toIndex = componentHT.get(to).numR;
          fromC.numL += numComp;
          toC.numR += numComp;
        }else{
          this.fromFace = "right";
          this.toFace = "left";
          this.fromIndex = componentHT.get(from).numR;
          this.toIndex = componentHT.get(to).numL;
          fromC.numR += numComp;
          toC.numL += numComp;
        }
      }else{
        if(fromC.y > toC.y){
          this.fromFace = "up";
          this.toFace = "down";
          this.fromIndex = componentHT.get(from).numU;
          this.toIndex = componentHT.get(to).numD;
          fromC.numU += numComp;
          toC.numD += numComp;
        }else{
          this.fromFace = "down";
          this.toFace = "up";
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
      console.log(`fromF${this.fromFace}toF${this.toFace}`);
      connectionArray.push(this);
    }
    this.generateConn();
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
      console.log(`from_${srcLoc} to_${dstLoc} from2_${srcLoc2} to2_${dstLoc2}`)
      //line((srcLoc[0]+srcLoc2[0])/2,(srcLoc[1]+srcLoc2[1])/2,(dstLoc[0]+dstLoc2[0])/2,(dstLoc[1]+dstLoc2[1])/2);
      //console.log(`index ${i} from${srcLoc} to${dstLoc}`)
      //console.log(`{x:${srce.label.x}, y:${srce.label.y}}`)
      var btn1;
      var btn2;
      var btn3;
      if(this.fromFace == "right" && this.toFace == "left"){
        btn1 = createButton("",`${j}`);
        btn1.position(srcLoc[0],srcLoc[1]);
        btn1.size(abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth/2 + connectionWidth*(this.composition.length/2 - j),connectionWidth);
        
        btn2 = createButton("",`${j}`);
        btn2.position(btn1.x + btn1.width,btn1.y);
        btn2.size(connectionWidth,abs(srcLoc[1]-dstLoc[1]));

        btn3 = createButton("",`${j}`);
        btn3.position(btn1.x + btn1.width,btn2.y + btn2.height );
        btn3.size(abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth*(j - this.composition.length/2) - connectionWidth/2,connectionWidth);

      }else if(this.fromFace == "left" && this.toFace == "right"){
        btn1 = createButton("",`${j}`);
        btn1.position(srcLoc[0]-abs(srcLoc[0]-dstLoc[0])/2 - 3*connectionWidth/2 + connectionWidth*(this.composition.length/2 - j),srcLoc[1]+ connectionWidth/2);
        btn1.size(abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth/2 + connectionWidth*(this.composition.length/2 - j),connectionWidth);

        btn2 = createButton("",`${j}`);
        btn2.position(btn1.x,btn1.y-abs(srcLoc[1]-dstLoc[1]));
        btn2.size(connectionWidth,abs(srcLoc[1]-dstLoc[1]));
        
        btn3 = createButton("",`${j}`);
        btn3.position(btn2.x - abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth*(j - this.composition.length/2) + 3*connectionWidth/2,btn2.y);
        btn3.size(abs(srcLoc[0]-dstLoc[0])/2 + connectionWidth*(j - this.composition.length/2) - connectionWidth/2,connectionWidth);
        
      }else if(this.fromFace == "down" && this.toFace == "up"){
        btn1 = createButton("",`${j}`);
        btn1.position(srcLoc[0],srcLoc[1]);
        btn1.size(connectionWidth,abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth/2 + connectionWidth*(this.composition.length/2 - j));
        
        btn2 = createButton("",`${j}`);
        btn2.position(btn1.x,btn1.y + btn1.height);
        btn2.size(abs(srcLoc[0]-dstLoc[0]),connectionWidth);

        btn3 = createButton("",`${j}`);
        btn3.position(btn2.x + btn2.width,btn1.y + btn1.height);
        btn3.size(connectionWidth,abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth*(j - this.composition.length/2) - connectionWidth/2);

      }else if(this.fromFace == "up" && this.toFace == "down"){
        btn1 = createButton("",`${j}`);
        btn1.position(srcLoc[0]+ connectionWidth/2, srcLoc[1]-abs(srcLoc[1]-dstLoc[1])/2 - 3*connectionWidth/2 + connectionWidth*(this.composition.length/2 - j));
        btn1.size(connectionWidth,abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth/2 + connectionWidth*(this.composition.length/2 - j));

        btn2 = createButton("",`${j}`);
        btn2.position(btn1.x-abs(srcLoc[0]-dstLoc[0]), btn1.y);
        btn2.size(abs(srcLoc[0]-dstLoc[0]),connectionWidth);
        
        btn3 = createButton("",`${j}`);
        btn3.position(btn2.x,btn2.y - abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth*(j - this.composition.length/2) + 3*connectionWidth/2);
        btn3.size(connectionWidth,abs(srcLoc[1]-dstLoc[1])/2 + connectionWidth*(j - this.composition.length/2) - connectionWidth/2);
      }

      if(btn1 != null){
        btn1.style('background: #333333;');
        btn1.mouseOver(this.selected(j));
      }//btn1.style('border: #333333;');

      if(btn2 != null){
        btn2.style('background: #777777;');
        btn1.mouseOver(this.onHoverAbs(j));
        //btn2.style('border: #333333;');
      }
      if(btn3 != null){
        btn3.style('background: #aaaaaa;');
        btn1.mouseOver(this.onHoverAbs(j));
        //btn3.style('border: #333333;');
      }
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

  onHoverAbs(i){
    return function() {this.onHover(i);}
  }
  onHover(i){
    console.log("A");
    selected[i] = true;
    for(var i = 0; i < this.buttons.length; i ++){
      if(this.buttons[i].value() == `${j}`){
        this.buttons[i].style('background: #5ab854');
      }
    }
  }
  offHoverAbs(i){
    return function() {this.offHover(i);}
  }
  offHover(i){
    //selected[i] = false;
  }
}

function getTracePoint(component, fromFace, index){
  //console.log(`L${component.numL}R${component.numR}U${component.numU}D${component.numD}`);
  pnt = [0,0];
  switch(fromFace) {
    case "left":
      pnt[0] = component.x;
      pnt[1] = component.y + component.height/2 - (component.numL * connectionWidth)/2 - connectionWidth/2 + index * connectionWidth;
      break;
    case "right":
      pnt[0] = component.x + component.width;
      pnt[1] = component.y + component.height/2 - (component.numR * connectionWidth)/2 - connectionWidth/2 + index * connectionWidth;
      break;
    case "up":
      pnt[1] = component.y;
      pnt[0] = component.x + component.width/2 - (component.numU * connectionWidth)/2 - connectionWidth/2 + index * connectionWidth;
      break;
    case "down":
      pnt[1] = component.y + component.height;
      pnt[0] = component.x + component.width/2 - (component.numD * connectionWidth)/2 - connectionWidth/2 + index * connectionWidth;
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

  var c1 = new Component("Nucleo", img, 50, 50, 100, 100);
  var c2 = new Component("Jetson", img, 300, 650 ,100, 100);

  var conn1 = new Connection("Nucleo","Jetson","UART_TX, UART_RX,GND");
  var conn2 = new Connection("Jetson","Nucleo","5V");

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