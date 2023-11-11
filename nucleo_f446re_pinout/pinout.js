// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0,0,12,12);
// // ctx.drawImage(img, 20, 20);

// const img = new Image();
//   img.onload = () => {
//     ctx.drawImage(img, (canvas.clientWidth-img.width)/2, (canvas.clientHeight-img.height)/2);
//   };
// img.src = "nucleo_real.jpg";

// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;

// button = createButton('submit');
// button.position(50, 65);

var pinsDisplaceXL = 211.5;
var pinsDisplaceYL = 69;
var pinsDisplaceXR = 212.5;
var pinsDisplaceYR = 68.5;
var pinSpacingX = 18.5;
var pinSpacingY = 18.5;

var pinColumnLength = 19;
var pinRowLength = 2;

var pinSizeX = 18;
var pinSizeY = 18;

var labelsDisplaceX = 0;
var labelsDisplaceY = 0;
var labelsSpacingX = 200;
var labelsSpacingY = 50;

var labelSizeX = 200;
var labelSizeY = 50;

var leftPins = [];
var rightPins = [];
var leftLabels = [];
var rightLabels = [];

var searchMode = false;

var leftLabelsVisible = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
var rightLabelsVisible = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];

var leftLabelsHover = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
var rightLabelsHover = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];

var leftLabelsSearch = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
var rightLabelsSearch = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];


var leftButtonData = [[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null]];
var rightButtonData = [[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null]];

var leftButtonTags = [[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null]];
var rightButtonTags = [[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null]];

//leftButtonData[0][0] = {pinType:"digital",pinName:"P",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};


leftButtonData[0][0] = {pinType:"digital",pinName:"PC_10",spiID:3,spiPin:"CLK",canID:-1,canPin:"",uartID:3,uartPin:"TX",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][0] = {pinType:"digital",pinName:"PC_11",spiID:3,spiPin:"MISO",canID:-1,canPin:"",uartID:3,uartPin:"RX",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][1] = {pinType:"digital",pinName:"PC_12",spiID:3,spiPin:"MOSI",canID:-1,canPin:"",uartID:5,uartPin:"TX",i2cID:2,i2cPin:"SDA",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][1] = {pinType:"digital",pinName:"PD_2",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:5,uartPin:"RX",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][2] = {pinType:"power",pinName:"VDD",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][2] = {pinType:"power",pinName:"E5V",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][3] = {pinType:"control",pinName:"BOOT0",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][3] = {pinType:"power",pinName:"GND",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][4] = {pinType:"nc",pinName:"NC",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][4] = {pinType:"nc",pinName:"NC",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][5] = {pinType:"nc",pinName:"NC",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][5] = {pinType:"power",pinName:"IOREF",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][6] = {pinType:"digital",pinName:"PA_13",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][6] = {pinType:"control",pinName:"RESET",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][7] = {pinType:"digital",pinName:"PA_14",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][7] = {pinType:"power",pinName:"3.3V",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][8] = {pinType:"digital",pinName:"PA_15",spiID:1,spiPin:"CS",canID:-1,canPin:"",uartID:4,uartPin:"RTS",i2cID:-1,i2cPin:"",pwmTimer:2,pwmChannel:1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][8] = {pinType:"power",pinName:"5V",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][9] = {pinType:"power",pinName:"GND",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][9] = {pinType:"power",pinName:"GND",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][10] = {pinType:"digital",pinName:"PB_7",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:1,uartPin:"RX",i2cID:1,i2cPin:"SDA",pwmTimer:4,pwmChannel:2,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][10] = {pinType:"power",pinName:"GND",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][11] = {pinType:"digital",pinName:"PC_13",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][11] = {pinType:"power",pinName:"VIN",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][12] = {pinType:"digital",pinName:"PC_14",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][12] = {pinType:"nc",pinName:"NC",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

leftButtonData[0][13] = {pinType:"digital",pinName:"PC_15",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][13] = {pinType:"digital",pinName:"PA_0",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:4,uartPin:"TX",i2cID:-1,i2cPin:"",pwmTimer:2,pwmChannel:1,pwmInverted:false, adcID:0, dacID:-1};

leftButtonData[0][14] = {pinType:"digital",pinName:"PH_0",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][14] = {pinType:"digital",pinName:"PA_1",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:4,uartPin:"RX",i2cID:-1,i2cPin:"",pwmTimer:2,pwmChannel:2,pwmInverted:false, adcID:1, dacID:-1};

leftButtonData[0][15] = {pinType:"digital",pinName:"PH_1",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][15] = {pinType:"digital",pinName:"PA_4",spiID:1,spiPin:"CS",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:4, dacID:1};

leftButtonData[0][16] = {pinType:"power",pinName:"VBAT",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
leftButtonData[1][16] = {pinType:"digital",pinName:"PB_0",spiID:3,spiPin:"MOSI",canID:-1,canPin:"",uartID:4,uartPin:"CTS",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:2,pwmInverted:true, adcID:8, dacID:-1};

leftButtonData[0][17] = {pinType:"digital",pinName:"PC_2",spiID:2,spiPin:"MISO",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:12, dacID:-1};
leftButtonData[1][17] = {pinType:"digital",pinName:"PC_1",spiID:2,spiPin:"MOSI",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:11, dacID:-1};

leftButtonData[0][18] = {pinType:"digital",pinName:"PC_3",spiID:2,spiPin:"MOSI",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:13, dacID:-1};
leftButtonData[1][18] = {pinType:"digital",pinName:"PC_0",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:10, dacID:-1};


rightButtonData[0][0] = {pinType:"digital",pinName:"PC_9",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:5,uartPin:"CTS",i2cID:3,i2cPin:"SDA",pwmTimer:3,pwmChannel:4,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][0] = {pinType:"digital",pinName:"PC_8",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:5,uartPin:"RTS",i2cID:-1,i2cPin:"",pwmTimer:3,pwmChannel:3,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][1] = {pinType:"digital",pinName:"PB_8",spiID:-1,spiPin:"",canID:1,canPin:"RD",uartID:-1,uartPin:"",i2cID:1,i2cPin:"SCL",pwmTimer:2,pwmChannel:1,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][1] = {pinType:"digital",pinName:"PC_6",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:6,uartPin:"TX",i2cID:1,i2cPin:"SCL",pwmTimer:3,pwmChannel:1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][2] = {pinType:"digital",pinName:"PB_9",spiID:2,spiPin:"CS",canID:1,canPin:"TD",uartID:-1,uartPin:"",i2cID:1,i2cPin:"CS",pwmTimer:2,pwmChannel:2,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][2] = {pinType:"digital",pinName:"PC_5",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:3,uartPin:"RX",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:15, dacID:-1};

rightButtonData[0][3] = {pinType:"power",pinName:"AVDD",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][3] = {pinType:"power",pinName:"U5V",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][4] = {pinType:"power",pinName:"GND",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][4] = {pinType:"nc",pinName:"NC",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][5] = {pinType:"digital",pinName:"PA_5",spiID:1,spiPin:"CLK",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:2,pwmChannel:1,pwmInverted:false, adcID:5, dacID:2};
rightButtonData[1][5] = {pinType:"digital",pinName:"PA_12",spiID:-1,spiPin:"",canID:1,canPin:"TD",uartID:1,uartPin:"RTS",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][6] = {pinType:"digital",pinName:"PA_6",spiID:1,spiPin:"MISO",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:3,pwmChannel:1,pwmInverted:false, adcID:6, dacID:-1};
rightButtonData[1][6] = {pinType:"digital",pinName:"PA_11",spiID:-1,spiPin:"",canID:1,canPin:"RD",uartID:1,uartPin:"CTS",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:4,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][7] = {pinType:"digital",pinName:"PA_7",spiID:1,spiPin:"MOSI",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:1,pwmInverted:true, adcID:7, dacID:-1};
rightButtonData[1][7] = {pinType:"digital",pinName:"PB_12",spiID:2,spiPin:"CS",canID:2,canPin:"RD",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][8] = {pinType:"digital",pinName:"PB_6",spiID:-1,spiPin:"",canID:2,canPin:"TD",uartID:1,uartPin:"TX",i2cID:1,i2cPin:"SCL",pwmTimer:4,pwmChannel:1,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][8] = {pinType:"digital",pinName:"NC",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][9] = {pinType:"digital",pinName:"PC_7",spiID:2,spiPin:"CLK",canID:-1,canPin:"",uartID:6,uartPin:"RX",i2cID:1,i2cPin:"SDA",pwmTimer:3,pwmChannel:2,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][9] = {pinType:"power",pinName:"GND",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][10] = {pinType:"digital",pinName:"PA_9",spiID:2,spiPin:"CLK",canID:-1,canPin:"",uartID:1,uartPin:"TX",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:2,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][10] = {pinType:"digital",pinName:"PB_2",spiID:3,spiPin:"MOSI",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:2,pwmChannel:4,pwmInverted:true, adcID:-1, dacID:-1};

rightButtonData[0][11] = {pinType:"digital",pinName:"PA_8",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:3,i2cPin:"SCL",pwmTimer:1,pwmChannel:1,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][11] = {pinType:"digital",pinName:"PB_1",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:3,pwmInverted:true, adcID:9, dacID:-1};

rightButtonData[0][12] = {pinType:"digital",pinName:"PB_10",spiID:2,spiPin:"CLK",canID:-1,canPin:"",uartID:3,uartPin:"TX",i2cID:2,i2cPin:"SCL",pwmTimer:2,pwmChannel:3,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][12] = {pinType:"digital",pinName:"PB_15",spiID:2,spiPin:"MOSI",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:3,pwmInverted:true, adcID:-1, dacID:-1};

rightButtonData[0][13] = {pinType:"digital",pinName:"PB_4",spiID:1,spiPin:"MISO",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:3,i2cPin:"SDA",pwmTimer:3,pwmChannel:1,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][13] = {pinType:"digital",pinName:"PB_14",spiID:2,spiPin:"MISO",canID:-1,canPin:"",uartID:3,uartPin:"RTS",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:2,pwmInverted:true, adcID:-1, dacID:-1};

rightButtonData[0][14] = {pinType:"digital",pinName:"PB_5",spiID:1,spiPin:"MOSI",canID:2,canPin:"RD",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:3,pwmChannel:2,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][14] = {pinType:"digital",pinName:"PB_13",spiID:2,spiPin:"CLK",canID:2,canPin:"TD",uartID:3,uartPin:"CTS",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:1,pwmInverted:true, adcID:-1, dacID:-1};

rightButtonData[0][15] = {pinType:"digital",pinName:"PB_3",spiID:1,spiPin:"CLK",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:2,pwmChannel:2,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][15] = {pinType:"power",pinName:"AGND",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][16] = {pinType:"digital",pinName:"PA_10",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:1,uartPin:"RX",i2cID:-1,i2cPin:"",pwmTimer:1,pwmChannel:3,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][16] = {pinType:"digital",pinName:"PC_4",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:14, dacID:-1};

rightButtonData[0][17] = {pinType:"digital",pinName:"PA_2",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:2,uartPin:"TX",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][17] = {pinType:"nc",pinName:"NC",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

rightButtonData[0][18] = {pinType:"digital",pinName:"PA_3",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:2,uartPin:"RX",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};
rightButtonData[1][18] = {pinType:"nc",pinName:"NC",spiID:-1,spiPin:"",canID:-1,canPin:"",uartID:-1,uartPin:"",i2cID:-1,i2cPin:"",pwmTimer:-1,pwmChannel:-1,pwmInverted:false, adcID:-1, dacID:-1};

var zoomDiv = document.getElementById("zoom-div");

function createSubButtons(buttonCreationLocationX,buttonCreationLocationY, i, j, side){
  var bd = (side == "left") ? leftButtonData : rightButtonData;

  miniButtonCreateX = buttonCreationLocationX;
  miniButtonCreateY = buttonCreationLocationY;
  var rowCount = 0;

  if(side == "left")
    leftButtonTags[i][j] = [];
  else
    rightButtonTags[i][j] = [];

  if(bd[i][j].pinType == "digital"){
    var label = createButton(`${bd[i][j].pinName}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX/3,labelSizeY/2);
    label.style('background: #99aaff;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
    //console.log(leftButtonTags);
    miniButtonCreateX += labelSizeX/3;
    rowCount ++;
    if(rowCount == 3){
      miniButtonCreateX = buttonCreationLocationX;
      miniButtonCreateY += labelSizeY/2;
    }
  }
  if(bd[i][j].uartID != -1){
    var label = createButton(`UART${bd[i][j].uartID}_${bd[i][j].uartPin}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX/3,labelSizeY/2);
    label.style('background: #ffcc11;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
    miniButtonCreateX += labelSizeX/3;
    rowCount ++;
    if(rowCount == 3){
      miniButtonCreateX = buttonCreationLocationX;
      miniButtonCreateY += labelSizeY/2;
    }
  }
  if(bd[i][j].spiID != -1){
    var label = createButton(`SPI${bd[i][j].spiID}_${bd[i][j].spiPin}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX/3,labelSizeY/2);
    label.style('background: #77ff44;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
    miniButtonCreateX += labelSizeX/3;
    rowCount ++;
    if(rowCount == 3){
      miniButtonCreateX = buttonCreationLocationX;
      miniButtonCreateY += labelSizeY/2;
    }
  }
  if(bd[i][j].i2cID != -1){
    var label = createButton(`I2C${bd[i][j].i2cID}_${bd[i][j].i2cPin}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX/3,labelSizeY/2);
    label.style('background: #ff9911;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
    miniButtonCreateX += labelSizeX/3;
    rowCount ++;
    if(rowCount == 3){
      miniButtonCreateX = buttonCreationLocationX;
      miniButtonCreateY += labelSizeY/2;
    }
  }
  if(bd[i][j].pwmTimer != -1){
    var label = createButton(`PWM${bd[i][j].pwmTimer}/${bd[i][j].pwmChannel}${bd[i][j].pwmInverted ? "N" : ""}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX/3,labelSizeY/2);
    label.style('background: #8844ff;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
    miniButtonCreateX += labelSizeX/3;
    rowCount ++;
    if(rowCount == 3){
      miniButtonCreateX = buttonCreationLocationX;
      miniButtonCreateY += labelSizeY/2;
    }
  }
  if(bd[i][j].adcID != -1){
    var label = createButton(`ADC${bd[i][j].adcID}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX/3,labelSizeY/2);
    label.style('background: #DDBB88;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
    miniButtonCreateX += labelSizeX/3;
    rowCount ++;
    if(rowCount == 3){
      miniButtonCreateX = buttonCreationLocationX;
      miniButtonCreateY += labelSizeY/2;
    }
  }
  if(bd[i][j].dacID != -1){
    var label = createButton(`DAC${bd[i][j].dacID}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX/3,labelSizeY/2);
    label.style('background: #DDBB88;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
    miniButtonCreateX += labelSizeX/3;
    rowCount ++;
    if(rowCount == 3){
      miniButtonCreateX = buttonCreationLocationX;
      miniButtonCreateY += labelSizeY/2;
    }
  }
  if(bd[i][j].canID != -1){
    var label = createButton(`CAN${bd[i][j].canID}_${bd[i][j].canPin}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX/3,labelSizeY/2);
    label.style('background: #bb33dd;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
    miniButtonCreateX += labelSizeX/3;
    rowCount ++;
    if(rowCount == 3){
      miniButtonCreateX = buttonCreationLocationX;
      miniButtonCreateY += labelSizeY/2;
    }
  }

  if(bd[i][j].pinType == "power"){
    var label = createButton(`${bd[i][j].pinName}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX,labelSizeY);
    label.style('background: #ee4455;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
  }

  if(bd[i][j].pinType == "control"){
    var label = createButton(`${bd[i][j].pinName}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX,labelSizeY);
    label.style('background: #dd5555;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
  }

  if(bd[i][j].pinType == "nc"){
    var label = createButton(`${bd[i][j].pinName}`);
    label.position(miniButtonCreateX,miniButtonCreateY);
    label.size(labelSizeX,labelSizeY);
    label.style('background: #ddeedd;');
    label.style('font-size', zoomDiv.clientWidth/150 + 'px');
    if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
  }
}

const img = new Image();
  img.onload = () => {
    const cv = document.getElementById("defaultCanvas0");
    var ctx = cv.getContext("2d");
    ctx.drawImage(img, (canvas.clientWidth-img.width)/2, (canvas.clientHeight-img.height)/2);
};

let input, buton, greeting;

function setup() {
  img.src = "nucleo_real.jpg";
  // create canvas
  console.log("x",zoomDiv.clientWidth,"y",zoomDiv.clientHeight);
  var p5canvas = createCanvas(zoomDiv.clientWidth, zoomDiv.clientHeight);

  p5canvas.parent('zoom-div');
  const canvas = document.getElementById("defaultCanvas0");

  var buttonsWidth = 100;
  var buttonsHeight = 40;

  labelsSpacingX = (zoomDiv.clientWidth - img.width)/4;
  labelSizeX = labelsSpacingX - 3;
  labelsDisplaceX = zoomDiv.clientWidth/2;
  labelsDisplaceY = zoomDiv.clientHeight/2 - 10;
  labelsSpacingY = zoomDiv.clientHeight/19;
  labelSizeY = labelsSpacingY - 3;

  // buton = createButton('submit');
  // buton.position(50, 65);

  var showAll = createButton(`Show All`);
  showAll.position(zoomDiv.clientWidth/2 - buttonsWidth, 40);
  showAll.size(buttonsWidth,buttonsHeight);
  showAll.style('background: #babded;');
  console.log(`w${zoomDiv.clientWidth}h${zoomDiv.clientHeight} t${textSize()}`)
  showAll.style('font-size', zoomDiv.clientWidth/110 + 'px');
  showAll.mousePressed(showAllButton);

  var hideAll = createButton(`Hide All`);
  hideAll.position(zoomDiv.clientWidth/2, 40);
  hideAll.size(buttonsWidth,buttonsHeight);
  hideAll.style('background: #abddbe;');
  hideAll.style('font-size', zoomDiv.clientWidth/110 + 'px');
  hideAll.mousePressed(hideAllButton);

  // var showAll = createButton(`Show All`);
  // showAll.position(zoomDiv.clientWidth/2 - buttonsWidth, 80);
  // showAll.size(buttonsWidth,buttonsHeight);
  // showAll.style('background: #59asbd;');
  // showAll.mousePressed(showAllButton);

  // var hideAll = createButton(`Hide All`);
  // hideAll.position(zoomDiv.clientWidth/2, 80);
  // hideAll.size(buttonsWidth,buttonsHeight);
  // hideAll.style('background: #eddf12a;');
  // hideAll.mousePressed(hideAllButton);

  var searchBar = createInput();
  searchBar.position(zoomDiv.clientWidth/2 - buttonsWidth, 80);
  searchBar.size(buttonsWidth,buttonsHeight);
  searchBar.input(searchInput);

  // var resetSearch = createButton("Reset Search")
  // resetSearch.position(zoomDiv.clientWidth/2, 80);
  // resetSearch.size(buttonsWidth,buttonsHeight);
  // searchBar.mousePressed(resetSearchButton);

  buttonCreationLocationX = canvas.clientWidth/2 - pinsDisplaceXL - pinSpacingX;
  buttonCreationLocationY = canvas.clientHeight/2 - pinsDisplaceYL;
  for(var i = 0; i < pinRowLength; i++){
    buttonCreationLocationY = canvas.clientHeight/2 - pinsDisplaceYL;
    const pinSet = [];
    for(var j = 0; j < pinColumnLength; j++){
      //fill(100,200,0);
      var btn = createButton('',`${i},${j}`);
      //btn.color(10,100,200);
      btn.position(buttonCreationLocationX,buttonCreationLocationY);
      btn.size(pinSizeX,pinSizeY);
      //console.log(`x${buttonCreationLocationX} y${buttonCreationLocationY}`);
      pinSet[j] = btn;

      btn.mouseOver(onHoverAbstraction(i,j,"left"));
      btn.mouseOut(offHoverAbstraction(i,j,"left"));
      btn.mousePressed(onClickAbstraction(i,j,"left"));

      buttonCreationLocationY += pinSpacingY;
    }
    leftPins[i] = pinSet;
    buttonCreationLocationX += pinSpacingX;
  }

  buttonCreationLocationX = canvas.clientWidth/2 + pinsDisplaceXR;
  buttonCreationLocationY = canvas.clientHeight/2 - pinsDisplaceYR;
  for(var i = 0; i < pinRowLength; i++){
    buttonCreationLocationY = canvas.clientHeight/2 - pinsDisplaceYR;
    const pinSet = [];
    for(var j = 0; j < pinColumnLength; j++){
      var btn = createButton('',`${i},${j}`);
      btn.position(buttonCreationLocationX,buttonCreationLocationY);
      btn.size(pinSizeX,pinSizeY);
      //console.log(`x${buttonCreationLocationX} y${buttonCreationLocationY}`);
      pinSet[j] = btn;

      btn.mouseOver(onHoverAbstraction(i,j,"right"));
      btn.mouseOut(offHoverAbstraction(i,j,"right"));
      btn.mousePressed(onClickAbstraction(i,j,"right"));

      buttonCreationLocationY += pinSpacingY;
    }
    rightPins[i] = pinSet;
    buttonCreationLocationX += pinSpacingX;
  }

  buttonCreationLocationX = canvas.clientWidth/2 - labelsDisplaceX + 18;
  buttonCreationLocationY = canvas.clientHeight/2 - labelsDisplaceY;
  for(var i = 0; i < pinRowLength; i++){
    buttonCreationLocationY = canvas.clientHeight/2 - labelsDisplaceY;
    const pinSet = [];
    for(var j = 0; j < pinColumnLength; j++){
      //fill(100,200,0);
      var btn = createButton('',`${i},${j}`);
      // var btn = button(labelButton);
      btn.style('background: silver');
      //btn.style('box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf');
      btn.style('border: 2px solid #111111')
      btn.position(buttonCreationLocationX,buttonCreationLocationY);
      btn.size(labelSizeX,labelSizeY);
      // btn.style = labelButton;
      // console.log(`x${buttonCreationLocationX} y${buttonCreationLocationY}`);
      pinSet[j] = btn;
      // leftPins[i][j].position(buttonCreationLocationX,buttonCreationLocationY);

      createSubButtons(buttonCreationLocationX,buttonCreationLocationY, i, j,"left");
      

      buttonCreationLocationY += labelsSpacingY;
    }
    leftLabels[i] = pinSet;
    buttonCreationLocationX += labelsSpacingX;
  }

  buttonCreationLocationX = canvas.clientWidth/2 + labelsDisplaceX - 2*labelsSpacingX + 10;
  buttonCreationLocationY = canvas.clientHeight/2 - labelsDisplaceY;
  for(var i = 0; i < pinRowLength; i++){
    buttonCreationLocationY = canvas.clientHeight/2 - labelsDisplaceY;
    const pinSet = [];
    for(var j = 0; j < pinColumnLength; j++){
      //fill(100,200,0);
      var btn = createButton('',`${i},${j}`);
      // var btn = button(labelButton);
      btn.style('background: silver');
      //btn.style('box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf');
      btn.style('border: 2px solid #111111')
      btn.position(buttonCreationLocationX,buttonCreationLocationY);
      btn.size(labelSizeX,labelSizeY);
      // btn.style = labelButton;
      // console.log(`x${buttonCreationLocationX} y${buttonCreationLocationY}`);
      pinSet[j] = btn;
      // leftPins[i][j].position(buttonCreationLocationX,buttonCreationLocationY);

      createSubButtons(buttonCreationLocationX,buttonCreationLocationY, i, j,"right");


      buttonCreationLocationY += labelsSpacingY;
    }
    rightLabels[i] = pinSet;
    buttonCreationLocationX += labelsSpacingX;
  }

  textAlign(CENTER);
  textSize(50);
}

function labelUpdate(i, j, show, side){
  if(show){
    ((side == "left") ? leftLabels : rightLabels)[i][j].show();
    for(var x = 0; x < ((side == "left") ? leftButtonTags : rightButtonTags)[i][j].length; x ++){
      ((side == "left") ? leftButtonTags : rightButtonTags)[i][j][x].show();
    }
  }else{
    ((side == "left") ? leftLabels : rightLabels)[i][j].hide();
    for(var x = 0; x < ((side == "left") ? leftButtonTags : rightButtonTags)[i][j].length; x ++){
      ((side == "left") ? leftButtonTags : rightButtonTags)[i][j][x].hide();
    }
  }
}

function draw() {
  // image(bg, (canvas.clientWidth-bg.width)/2, (canvas.clientHeight-bg.height)/2, bg.width, bg.height);

  // const cv = document.getElementById("defaultCanvas0");
  // var ctx = cv.getContext("2d");
  // alert("aSdas")

  for(var i = 0; i < 2; i ++){
    for(var j = 0; j < 19; j ++){
      // console.log(`xy${i},${j}`)
      if(searchMode && leftLabelsSearch[i][j]){
        leftPins[i][j].style("border: 2px solid #9933dd77;");
        labelUpdate(i, j, true, "left");
      }else if(leftLabelsVisible[i][j]){
        leftPins[i][j].style("border: 2px solid #33ff7777;");
        labelUpdate(i, j, true, "left");
      }else if(leftLabelsHover[i][j]){
        leftPins[i][j].style("border: 2px solid #d81c1c77;")
        labelUpdate(i, j, true, "left");
      }else{
        leftPins[i][j].style("border: 2px solid #ffffff77;")
        labelUpdate(i, j, false, "left");
      }
      if(searchMode && rightLabelsSearch[i][j]){
        rightPins[i][j].style("border: 2px solid #9933dd77;");
        labelUpdate(i, j, true, "right");
      }else if(rightLabelsVisible[i][j]){
        rightPins[i][j].style("border: 2px solid #33ff7777;")
        labelUpdate(i, j, true, "right");
      }else if(rightLabelsHover[i][j]){
        rightPins[i][j].style("border: 2px solid #d81c1c77;")
        labelUpdate(i, j, true, "right");
      }else{
        rightPins[i][j].style("border: 2px solid #ffffff77;")
        labelUpdate(i, j, false, "right");
      }
    }
  }
}

function onHoverAbstraction(i, j, side){
  return function() {onHover(i,j, side);}
  }

  function offHoverAbstraction(i, j, side){
    return function() {offHover(i,j, side);}
    }

function onHover(i,j, side){
  // leftLabelsHover = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
  // rightLabelsHover = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
  if(side == "left"){
    leftLabelsHover[i][j] = true;
    //leftPins[i][j].style("border: 2px solid #d81c1c77;")
  }else if(side == "right"){
    rightLabelsHover[i][j] = true;
    //rightPins[i][j].style("border: 2px solid #d81c1c77;")
  }
}

function offHover(i,j, side){
  // leftLabelsHover = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
  // rightLabelsHover = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
  if(side == "left"){
    leftLabelsHover[i][j] = false;
    //leftPins[i][j].style("border: 2px solid #d81c1c77;")
  }else if(side == "right"){
    rightLabelsHover[i][j] = false;
    //rightPins[i][j].style("border: 2px solid #d81c1c77;")
  }
}

function onClickAbstraction(i, j,side){
  return function() {onClick(i,j,side);}
  }

function onClick(i,j,side){
  console.log(`[${i}][${j}] on ${side}`);
  if(side == "left"){
    leftLabelsVisible[i][j] = !leftLabelsVisible[i][j];
  }else if(side == "right"){
    rightLabelsVisible[i][j] = !rightLabelsVisible[i][j];
  }
  
}

function showAllButton(){
  for(var i = 0; i < 2; i ++){
    for(var j = 0; j < 19; j ++){
      leftLabelsVisible[i][j] = true;
      rightLabelsVisible[i][j] = true;
    }
  }
}

function hideAllButton(){
  for(var i = 0; i < 2; i ++){
    for(var j = 0; j < 19; j ++){
      leftLabelsVisible[i][j] = false;
      rightLabelsVisible[i][j] = false;
    }
  }
}

function searchInput(){
  var text = this.value();
  console.log(","+text);
  if(text == ""){
    searchMode = false;
  }else{
    // leftLabelsHover = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
    // rightLabelsHover = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];

    searchMode = true;
    for(var i = 0; i < 2; i++){
      for(var j = 0; j < 19; j++){
        //console.log(`L: i${i}j${j}`);
        //console.log(`L: i${i}j${j} ${leftButtonTags[i][j][x].html()} ? ${text.toUpperCase()}`);
        leftLabelsSearch[i][j] = false;
        for(var x = 0; x < leftButtonTags[i][j].length; x++){
          // console.log(leftButtonTags[i][j][x].html());
          if(leftButtonTags[i][j][x].html().includes(text.toUpperCase())){
            console.log(`i${i}j${j} ${leftButtonTags[i][j][x].html()} contains ${text.toUpperCase()}`);
            leftLabelsSearch[i][j] = true;
          }
        }
        rightLabelsSearch[i][j] = false;
        for(var x = 0; x < rightButtonTags[i][j].length; x++){
          if(rightButtonTags[i][j][x].html().includes(text.toUpperCase())){
            console.log(`${rightButtonTags[i][j][x].html()} contains ${text.toUpperCase()}`);
            rightLabelsSearch[i][j] = true;
          }
        }
      }
    }
  }
}


// setInterval(draw, 50);