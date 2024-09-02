var procs = [
    {key: "week3_assignment2_part1-position", 
        func: "user.kineticFriction = 0.5;\n" 
        + "user.frictionCoefficient = 0.05;\n" 
        + "user.inertiaFactor = 0.8;\n" 
        + "user.randomDisturbance = Math.random() * 0.2;\n" 
        + "\n" 
        + "if (typeof user.v === 'undefined') {\n" 
        + "user.v = 0; \n" 
        + "user.a = 0; \n" 
        + "user.p = 0;\n" 
        + "user.previousOutput = output;\n" 
        + "user.randomSeed = Math.random();\n" 
        + "}\n" 
        + "\n" 
        + "if (output > user.kineticFriction) {\n" 
        + "user.a = output - user.kineticFriction;\n" 
        + "} else if (output < -user.kineticFriction) {\n" 
        + "user.a = output + user.kineticFriction;\n" 
        + "} else {\n" 
        + "user.a = 0;\n" 
        + "}\n" 
        + "\n" 
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v) / 50;\n" 
        + "\n" 
        + "user.v += user.inertiaFactor * (output - user.previousOutput) / 50;\n" 
        + "user.v += Math.sin(user.v * time / 100) * user.randomDisturbance;\n" 
        + "user.p = user.p + user.v;\n" 
        + "user.previousOutput = output;\n" 
        + "\n" 
        + "return user.p;",                             
        sampletime: 100,
        noise: 0,
        setpoint: 100, 
        Kp: 1,
        Ki: 0,
        Kd: 0,  
        Icap: 0,
        range: 180,
        moveType: "pos",
        ff: "",
    },
    {key: "week3_assignment2_part2-flywheel", 
        func: "user.kineticFriction = 0.5;\n"
        + "user.frictionCoefficient = 0.05;\n"
        + "user.inertiaFactor = 0.8;\n"
        + "\n"
        + "if (typeof user.v === 'undefined') {\n"
        + "user.v = 0; \n"
        + "user.a = 0; \n"
        + "user.previousOutput = output;\n"
        + "user.randomSeed = Math.random();\n"
        + "}\n"
        + "\n"
        + "if (output > user.kineticFriction) {\n"
        + "user.a = output - user.kineticFriction;\n"
        + "} else if (output < -user.kineticFriction) {\n"
        + "user.a = output + user.kineticFriction;\n"
        + "} else {\n"
        + "user.a = 0;\n"
        + "}\n"
        + "\n"
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v) / 5;\n"
        + "\n"
        + "user.v += user.inertiaFactor * (output - user.previousOutput) / 5;\n"
        + "user.previousOutput = output;\n"
        + "\n"
        + "return user.v;\n",                 
        sampletime: 50,
        setpoint: 100,
        noise: 0, 
        Kp: 1,
        Ki: 0,
        Kd: 0,  
        Icap: 0,
        range: 150,
        moveType: "vel",
        ff: "",
    },
    {key: "week3_assignment2_part3-imbalanced", 
        func: "user.kineticFriction = 7;\n" 
        + "user.frictionCoefficient = 4;\n" 
        + "user.inertiaFactor = 0.8;\n" 
        + "user.randomDisturbance = Math.random() * 0.05;\n" 
        + "\n" 
        + "if (typeof user.v === 'undefined') {\n" 
        + "user.v = 0; \n" 
        + "user.a = 0; \n" 
        + "user.p = 0;\n" 
        + "user.previousOutput = output;\n" 
        + "user.randomSeed = Math.random();\n" 
        + "}\n" 
        + "\n" 
        + "if (output > user.kineticFriction) {\n" 
        + "user.a = output - user.kineticFriction;\n" 
        + "} else if (output < -user.kineticFriction) {\n" 
        + "user.a = output + user.kineticFriction;\n" 
        + "} else {\n" 
        + "user.a = 0;\n" 
        + "}\n" 
        + "user.a += Math.cos(input * Math.PI/180) * 60;\n" 
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v) / 20;\n" 
        + "\n" 
        + "user.v += user.inertiaFactor * (output - user.previousOutput) / 20;\n" 
        + "user.v += Math.sin(user.v * time / 100) * user.randomDisturbance;\n" 
        + "user.p = user.p + user.v;\n" 
        + "if(user.p > 60)user.p = 60;\n" 
        + "if(user.p < -70)user.p = -70;\n"
        + "user.previousOutput = output;\n" 
        + "\n" 
        + "return user.p;",                             
        sampletime: 100,
        noise: 0,
        setpoint: 30, 
        Kp: 1,
        Ki: 0,
        Kd: 0, 
        Icap: 0,
        range: 45,
        upbound: -70,
        lowbound: 60,
        moveType: "pos",
        ff: "return 0; //you'll probably need this. look at pid_lecture_example_3 for an example of this being used.",
    },
    {key: "pid_lecture_example_1-basic", 
        func: "user.kineticFriction = 0.1;\n" 
        + "user.frictionCoefficient = 0.01;\n" 
        + "user.inertiaFactor = 0.8;\n" 
        + "user.randomDisturbance = Math.random() * 0.05;\n" 
        + "\n" 
        + "if (typeof user.v === 'undefined') {\n" 
        + "user.v = 0; \n" 
        + "user.a = 0; \n" 
        + "user.p = 0;\n" 
        + "user.previousOutput = output;\n" 
        + "user.randomSeed = Math.random();\n" 
        + "}\n" 
        + "\n" 
        + "if (output > user.kineticFriction) {\n" 
        + "user.a = output - user.kineticFriction;\n" 
        + "} else if (output < -user.kineticFriction) {\n" 
        + "user.a = output + user.kineticFriction;\n" 
        + "} else {\n" 
        + "user.a = 0;\n" 
        + "}\n" 
        + "\n" 
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v) / 50;\n" 
        + "\n" 
        + "user.v += user.inertiaFactor * (output - user.previousOutput) / 50;\n" 
        + "user.v += Math.sin(user.v * time / 100) * user.randomDisturbance;\n" 
        + "user.p = user.p + user.v;\n" 
        + "user.previousOutput = output;\n" 
        + "\n" 
        + "return user.p;",                             
        sampletime: 100,
        noise: 0,
        setpoint: 100, 
        Kp: 2,
        Ki: 0,
        Kd: 0,  
        Icap: 0,
        range: 180,
        moveType: "pos",
        ff: "",
    },
    {key: "pid_lecture_example_2-friction", 
        func: "user.kineticFriction = 10;\n" 
        + "user.frictionCoefficient = 20;\n" 
        + "user.inertiaFactor = 0.8;\n" 
        + "user.randomDisturbance = Math.random() * 0.05;\n" 
        + "\n" 
        + "if (typeof user.v === 'undefined') {\n" 
        + "user.v = 0; \n" 
        + "user.a = 0; \n" 
        + "user.p = 0;\n" 
        + "user.previousOutput = output;\n" 
        + "user.randomSeed = Math.random();\n" 
        + "}\n" 
        + "\n" 
        + "if (output > user.kineticFriction) {\n" 
        + "user.a = output - user.kineticFriction;\n" 
        + "} else if (output < -user.kineticFriction) {\n" 
        + "user.a = output + user.kineticFriction;\n" 
        + "} else {\n" 
        + "user.a = 0;\n" 
        + "}\n" 
        + "\n" 
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v) / 50;\n" 
        + "\n" 
        + "user.v += user.inertiaFactor * (output - user.previousOutput) / 50;\n" 
        + "user.v += Math.sin(user.v * time / 100) * user.randomDisturbance;\n" 
        + "user.p = user.p + user.v;\n" 
        + "user.previousOutput = output;\n" 
        + "\n" 
        + "return user.p;",                             
        sampletime: 100,
        noise: 0,
        setpoint: 100, 
        Kp: 2,
        Ki: 0,
        Kd: 2, 
        Icap: 0,
        range: 180,
        moveType: "pos",
        ff: "",
    },
    {key: "pid_lecture_example_3-imbalanced", 
        func: "user.kineticFriction = 4;\n" 
        + "user.frictionCoefficient = 1;\n" 
        + "user.inertiaFactor = 0.8;\n" 
        + "user.randomDisturbance = Math.random() * 0.05;\n" 
        + "user.imbalancedGrav = 40;\n" 
        + "\n" 
        + "if (typeof user.v === 'undefined') {\n" 
        + "user.v = 0; \n" 
        + "user.a = 0; \n" 
        + "user.p = 0;\n" 
        + "user.previousOutput = output;\n" 
        + "user.randomSeed = Math.random();\n" 
        + "}\n" 
        + "\n" 
        + "if (output > user.kineticFriction) {\n" 
        + "user.a = output - user.kineticFriction;\n" 
        + "} else if (output < -user.kineticFriction) {\n" 
        + "user.a = output + user.kineticFriction;\n" 
        + "} else {\n" 
        + "user.a = 0;\n" 
        + "}\n" 
        + "user.a += Math.cos(input * Math.PI/180) * user.imbalancedGrav;\n" 
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v) / 10;\n" 
        + "\n" 
        + "user.v += user.inertiaFactor * (output - user.previousOutput) / 10;\n" 
        + "user.v += Math.sin(user.v * time / 100) * user.randomDisturbance;\n" 
        + "user.p = user.p + user.v;\n" 
        + "if(user.p > 60)user.p = 60;\n" 
        + "if(user.p < -90)user.p = -90;\n"
        + "user.previousOutput = output;\n" 
        + "\n" 
        + "return user.p;",                             
        sampletime: 100,
        noise: 0,
        setpoint: 30, 
        Kp: 2,
        Ki: 0,
        Kd: 0.5, 
        Icap: 0,
        range: 55,
        upbound: -90,
        lowbound: 60,
        moveType: "pos",
        ff: "return -45 * Math.cos(actual * Math.PI / 180);",
    },
    // {key: "model", 
    //     func: "if (typeof user.kpmodel === 'undefined'){\n"
    //     +"  user.kpmodel=1.5, user.taup=100, user.theta = []; user.outputStart = 5;\n"
    //     +"  for(var i=0;i<50;i++){ user.theta[i]=user.outputStart }\n"
    //     +"}\n"
    //     +"user.theta[30]=output;\n"
    //     +"for(var i=0;i<49;i++){ user.theta[i] = user.theta[i+1] };\n"             
    //     +"return (user.kpmodel / user.taup) *(user.theta[0]-user.outputStart) + input*(1-1/user.taup) + (Math.random()-0.5)*0.02",                             
    //     sampletime: 50,
    //     noise: 0,
    //     setpoint: 100, 
    //     Kp: 2,
    //     Ki: 0.5,
    //     Kd: 2, 
    // },
    // {key: "sinus", 
    //     func: "return (Math.sin(time/1000)-0.5)*50 + noise + output",                 
    //     sampletime: 50,
    //     setpoint: 50,
    //     noise: 0, 
    //     Kp: 0.7,
    //     Ki: 10,
    //     Kd: 0, 
    // },                                                                   
    // {key: "step", 
    //     func: "if (time % 5000 < 2500) return 50+output+noise; else return 100+output+noise",                 
    //     sampletime: 50,
    //     setpoint: 100,
    //     noise: 0, 
    //     Kp: 0.1,
    //     Ki: 10,
    //     Kd: 0, 
    // },
    // {key: "motorspeed", 
    //     func: "if (Math.abs(output) > 20) return output-20*Math.sign(output)+noise; else return 0",                 
    //     sampletime: 50,
    //     setpoint: 100,
    //     noise: 0, 
    //     Kp: 0.1,
    //     Ki: 10,
    //     Kd: 0, 
    // },
];


var SAMPLES = 200;
var proc = procs[0];
var sampleTime = 50;
var plInput   = new MakeDraw();
var plOutput = new MakeDraw();
var plSetpoint  = new MakeDraw();
var setpoint = 100;
var input = 0;
var output = 0;
var user = new Object();
var run = false;
var control = true;
var autoTuning = false;
var noise = 0;
var Kp = 1;
var Ki = 0;
var Kd = 0;
var pid = new PID(input, setpoint, Kp, Ki, Kd, 'direct');
var pidTuner = new PID_ATune();

//ADDED BY ANSHAL JAIN (pknessness)
var mostOver = 0;
var overshot = 0;

var beyondTheBoundary = false;
var originalspot = 0;
var prevActual = 0;
var prevP = undefined;
var prevI = undefined;
var prevD = undefined;
var prevIcap = undefined;

var hasStabbed = false;

var begunStab = undefined;
var mostStab = undefined;
var lastChange = undefined;

var isStab = false;

var dAdt = 0;
var prevdAdt = 0;

var prevT = 0;

var Icap = 0;

var rad_a = 0;
var rad_d = 0;

var stupidDogshit  = new MakeDraw();

var sProcess = document.getElementById("sliderProcess");
var sSetpoint = document.getElementById("sliderSetpoint");
var sKp = document.getElementById("sliderKp");
var sKi = document.getElementById("sliderKi");
var sKd = document.getElementById("sliderKd");
var sIcap = document.getElementById("sliderIcap");

function initPlot(seriesidx, id, seriesname, myplot, plotcolor, rangemin, rangemax, enumV){
    var series = [];
    for (i=0; i < SAMPLES; i++) series.push(0);      
    myplot.seriesIdx = seriesidx;
    myplot.seriesName = seriesname; 
    myplot.id=id;  
    myplot.rangeMin = rangemin;
    myplot.rangeMax = rangemax;
    myplot.data = series;  
    //myplot.plotColor = 'rgba(200,230,50,1)';
    myplot.plotColor = plotcolor;
    myplot.enumerateP = 0;
    myplot.gridColor =  'rgba(0,0,0,0)';   
    myplot.enumerateH = 0;
    myplot.enumerateV = enumV;
    myplot.adjustTrimmer=0;    
    myplot.plot();
}

function addPlotData(myplot, data){
    myplot.data.push(data);
    //myplot.data.push(Math.random()*10);
    if (myplot.data.length > SAMPLES) myplot.data.shift();
    myplot.plot();
}

function drawMotor(){
    var canvas = document.getElementById("whee");
    var ctx = canvas.getContext("2d");
    
    var w = $("#whee").width();
    canvas.width = w;
    var h = $("#whee").height();
    canvas.height = h;

    var r = Math.min(w,h);

    var model = procs[ sProcess.value ];

    var curT = Date.now();
    var dt = curT - prevT;
    prevT = curT;

    // console.log(model.moveType);

    if(model.moveType != "vel" ){
        rad_a = input * Math.PI/180;
        rad_d = setpoint * Math.PI/180;
    }else{
        rad_a += ((input/60.0)/1000 * dt) * Math.PI * 2;
        rad_d = undefined;
    }
    // console.log(`mod:${model}`);

    ctx.beginPath();
    ctx.arc(w/2,h/2,r*0.4, 0, Math.PI * 2, 1);
    ctx.closePath();
    // console.log(`a${w/2} ${h/2} ${Math.min(w,h)*0.4} ${0} ${Math.PI * 2} ${1}`)
    ctx.fillStyle = "#404040";
    ctx.fill(); 
    
    if(rad_d != undefined){
        ctx.beginPath();
        ctx.moveTo(w/2,h/2);
        ctx.lineTo(w/2 + Math.cos(rad_d) * r * 0.4,h/2 + Math.sin(rad_d) * r * 0.4);
        ctx.closePath();
        ctx.strokeStyle = "#2030d0";
        ctx.lineWidth = 20;
        ctx.stroke(); 
    }
    ctx.beginPath();
    ctx.moveTo(w/2,h/2);
    ctx.lineTo(w/2 + Math.cos(rad_a) * r * 0.4,h/2 + Math.sin(rad_a) * r * 0.4);
    ctx.closePath();
    ctx.strokeStyle = "#d02030";
    ctx.lineWidth = 20;
    ctx.stroke(); 

    if(model.upbound != undefined){
        var up_rad = model.upbound * Math.PI/180;
        ctx.beginPath();
        ctx.moveTo(w/2,h/2);
        ctx.lineTo(w/2 + Math.cos(up_rad) * r * 0.4,h/2 + Math.sin(up_rad) * r * 0.4);
        ctx.closePath();
        ctx.strokeStyle = "#30d020";
        ctx.lineWidth = 3;
        ctx.stroke(); 
    }
    if(model.lowbound != undefined){
        var low_rad = model.lowbound * Math.PI/180;
        ctx.beginPath();
        ctx.moveTo(w/2,h/2);
        ctx.lineTo(w/2 + Math.cos(low_rad) * r * 0.4,h/2 + Math.sin(low_rad) * r * 0.4);
        ctx.closePath();
        ctx.strokeStyle = "#30d020";
        ctx.lineWidth = 3;
        ctx.stroke(); 
    }

    

    ctx.beginPath();
    ctx.arc(w/2,h/2,r*0.12, 0, Math.PI * 2, 1);
    ctx.closePath();
    ctx.fillStyle = "#C0C0C0";
    ctx.fill(); 
}

function process(){    

    drawMotor();

    $("#plot1").width(window.innerWidth * 0.55);
    $("#overshoot").width(window.innerWidth * 0.2);
    $("#whee").width(window.innerWidth * 0.25);
    // console.log(window.innerWidth);
    
    time = (new Date).getTime();
    if(lastChange == undefined){
        lastChange = time;
    }
    $("#time").text( time );
    $("#desired").text( setpoint.toFixed(2) );
    $("#actual").text( input.toFixed(2) );
    $("#output").text( output.toFixed(2) );
    
    
    if (run) {                        
        // noise = (Math.random() - 0.5) * $("#sliderNoise").slider("value");
        //input = Math.sin(time/1000)*40 + noise + output;
        prevActual = input;
        input = proc.compute(time, input, noise, output, user);
        prevdAdt = dAdt;
        dAdt = input - prevActual;
        
        if((prevActual < setpoint && input > setpoint) || (prevActual > setpoint && input < setpoint)){
            beyondTheBoundary = true;
            overshot = 0;
            // console.log(`activated kyoukaiNoKanata`);
            document.getElementById("set_reach").style = "background-color:#009F00;";
        }

        if((Math.abs(input - setpoint) < 2)){
            if(begunStab == undefined){
                begunStab = time;
                document.getElementById("set_stab").style = "background-color:#F2BB07;";
            }else{
                document.getElementById("set_stab").style = "background-color:#F2BB07;";
                if((time - begunStab) > 1000){
                    console.log(`most:${begunStab-lastChange} bl:${mostStab} nod:`,document.getElementById("overshot1").childNodes);
                    var stab = begunStab - lastChange;
                    hasStabbed = true;
                    updateBlockStab((stab));
                    document.getElementById("set_stab").style = "background-color:#009F00;";
                    isStab = true;
                }
            }
        }else{
            begunStab = undefined;
            document.getElementById("set_stab").style = "background-color:#FF0000;";
            isStab = false;
        }

        // if(setpoint > originalspot){
        //     if(prevActual > input){
        //         // console.log(`kyoukaiNoKanata ${beyondTheBoundary} os${overshot}`);
        //         var over = Math.abs(prevActual - setpoint);
        //         if(beyondTheBoundary && over > overshot){
        //             // console.log(`set overshot`);
        //             overshot = over;
        //             beyondTheBoundary = false;
        //         }
        //         if(overshot >mostOver){
        //             mostOver = overshot;
        //         }
        //         updateBlockTunings();
        //         updateBlockOvershoot(overshot.toFixed(2),mostOver.toFixed(2));
        //         // document.getElementById("overshot1").innerText.replace("")
        //         prevP = Kp; prevI = Ki; prevD = Kd; prevIcap = Icap;
        //         //console.log(overshot);
        //     }
        // }else if(setpoint < originalspot){
        //     if(prevActual < input){
        //         // console.log(`kyoukaiNoKanata ${beyondTheBoundary} os${overshot}`);
        //         var over = Math.abs(prevActual - setpoint);
        //         if(beyondTheBoundary && over > overshot){
        //             // console.log(`set overshot`);
        //             overshot = over;
        //             beyondTheBoundary = false;
        //         }
        //         if(overshot > mostOver){
        //             mostOver = overshot;
        //         }
        //         updateBlockTunings();
        //         updateBlockOvershoot(overshot.toFixed(2),mostOver.toFixed(2));
        //         // $("#overshot1").text(`kP: ${Kp} kI: ${Ki} kD: ${Kd} max overshot: ${overshot.toFixed(2)}`);
        //         prevP = Kp; prevI = Ki; prevD = Kd; prevIcap = Icap;
        //         //console.log(overshot);
        //     }
        // }

        if((prevdAdt > 0 && dAdt < 0) || (prevdAdt < 0 && dAdt > 0)){
            // console.log(`kyoukaiNoKanata ${beyondTheBoundary} os${overshot}`);
            var over = Math.abs(prevActual - setpoint);
            if(beyondTheBoundary && over > overshot){
                // console.log(`set overshot`);
                overshot = over;
                beyondTheBoundary = false;
            }
            if(overshot > mostOver){
                mostOver = overshot;
            }
            // updateBlockTunings();
            updateBlockOvershoot(overshot.toFixed(2),mostOver.toFixed(2));
            // $("#overshot1").text(`kP: ${Kp} kI: ${Ki} kD: ${Kd} max overshot: ${overshot.toFixed(2)}`);
            prevP = Kp; prevI = Ki; prevD = Kd; prevIcap = Icap;
            //console.log(overshot);
        }
        
        pid.setInput(input);
        pid.compute();   
        output = pid.getOutput();  
        document.getElementById("pcomp").innerText = pid.pcomp.toFixed(2);
        document.getElementById("icomp").innerText = (pid.icomp * 1.0).toFixed(2);
        document.getElementById("dcomp").innerText = pid.dcomp.toFixed(2);
        document.getElementById("fcomp").innerText = pid.fcomp.toFixed(2);
        console.log(`in: ${input} set:${setpoint} out:${output}`);           

        addPlotData(stupidDogshit, 0);
        addPlotData(plInput, input);
        addPlotData(plSetpoint, setpoint);
        addPlotData(plOutput, output);
        
    }
    setTimeout(process, sampleTime);      
}


function processChanged(){
    proc = procs[ sProcess.value ];
    console.log("-------");
    console.log("process "+proc.key);
    //alert(procs[0].key);
    //alert($("#sliderProcess").slider("value"));        
    // $("#sliderSampletime").slider("value", proc.sampletime);
    sampleTime = proc.sampletime;
    sSetpoint.value = proc.setpoint;
    setpointChanged();
    // $("#sliderNoise").slider("value", proc.noise);
    sKp.value = proc.Kp;
    sKi.value = proc.Ki;
    sKd.value = proc.Kd;
    sIcap.value = proc.Icap;
    tuningsChanged();

    sSetpoint.min = -proc.range;
    sSetpoint.max = proc.range;

    var ff = document.getElementById("ffFunc");
    ff.value = proc.ff;
    ffFuncChanged();

    //$("#processFunc").text(proc.func);

    var func = document.getElementById("processFunc");
    func.value = proc.func; 
    processFuncChanged();    
}


function setpointChanged(){
    originalspot = setpoint;
    beyondTheBoundary = false;
    setpoint = sSetpoint.value * 1.0;

    if(hasStabbed == false){
        updateBlockStab(-1);
    }

    overshot = 0;
    hasStabbed = false; 

    // console.log("setpoint "+setpoint);        
    pid.setPoint(setpoint);
    lastChange = (new Date).getTime();;

    document.getElementById("set_reach").style = "background-color:#FF0000;";

    updateSliderText();    
}

function tuningsChanged(){  
    Kp  = sKp.value; 
    Ki  = sKi.value;
    Kd  = sKd.value;
    Icap  = sIcap.value;
    console.log("tunings "+Kp+","+Ki+","+Kd);   
    pid.setTunings(Kp, Ki, Kd);
    pid.setIcap(Icap);
    updateSliderText();   
}

// function sampleTimeChanged(){
//     sampleTime = $("#sliderSampletime").slider("value");
//     console.log("sampletime "+sampleTime);
//     pid.setSampleTime(sampleTime);
//     updateSliderText();  
// }

function updateBlockTunings(){
    document.getElementById("overshot1").childNodes[2].innerText = Kp;
    document.getElementById("overshot1").childNodes[5].innerText = Ki;
    document.getElementById("overshot1").childNodes[8].innerText = Kd;
    document.getElementById("overshot1").childNodes[11].innerText = Icap;
}

function updateBlockOvershoot(os, mostos){
    if(document.getElementById("testSequenceButton").disabled){
        document.getElementById("overshot1").childNodes[16].innerText = mostos
    }
    document.getElementById("pre_os").innerText = os
}

function updateBlockStab(st){
    if((st > mostStab && st != -1) || st == -1){
        mostStab = st;
    }
    if(document.getElementById("testSequenceButton").disabled){
        document.getElementById("overshot1").childNodes[21].innerText = (mostStab == -1 ? "Not stabilized" : mostStab/1000.0)
    }
    document.getElementById("pre_stab").innerText = (st == -1 ? "Not stabilized" : st/1000.0)
}

function processFuncChanged(){  
    var func = $("#processFunc").val();
    console.log("func: "+func);
    if (func == "") func ="return 0"; 
    proc.compute = new Function("time", "input", "noise", "output", "user", func);   
}

function ffFuncChanged(){  
    var func = $("#ffFunc").val();
    console.log("func: "+func);
    if (func == "") func ="return 0"; 
    pid.setFF(new Function("actual", "desired", "user", func));   
}

function updateSliderText(){
    $("#process").text( procs[sProcess.value].key );   
    $("#setpoint").text( sSetpoint.value );
    // $("#noise").text( $("#sliderNoise").slider("value") );  
    // $("#sampletime").text( $("#sliderSampletime").slider("value") );  
    $("#kp").text( sKp.value );
    $("#ki").text( sKi.value );
    $("#kd").text( sKd.value );  
    $("#icap").text( sIcap.value );  
}

function autoTuningChanged(){
    console.log('autotuning ' + autoTuning);
    if (autoTuning) {  
        $("#autotune").text("Auto tune is ON (please wait...)");
        var tunestart = parseFloat($("#tunestart").val());
        var tunestep = parseFloat($("#tunestep").val());
        var tunenoise = parseFloat($("#tunenoise").val());
        var tuneloopback = parseFloat($("#tuneloopback").val());
        pidTuner.setNoiseBand(tunenoise);
        pidTuner.setOutputStep(tunestep);
        pidTuner.setLookbackSec(tuneloopback);
        pidTuner.setOutput(tunestart);        
    } else {
        $("#autotune").text("Auto tune is OFF");
        pidTuner.cancel();    
    }  
}

function autoModeChanged(){
    console.log('PID auto ' + control);
    if (control) {
        pid.setMode('auto');
        $("#toggle").text("PID is ON");    
    } else {
        $("#toggle").text("PID is OFF");
        pid.setMode('manual');
    }  
}

function start(){
    run = true;      
}

function stop(){
    run = false;
}


$(document).ready(function(){
    katex.render("u(t) = k_pe(t) + k_i \\int{e(t)dt} + k_d\\frac{de(t)}{dt} + FF()", document.getElementById("equation"), {
        throwOnError: false
    });
    katex.render("u(t)", document.getElementById("ut"), {
        throwOnError: false
    });
    katex.render("u_p(t) =", document.getElementById("up_l"), {
        throwOnError: false
    });
    katex.render("u_i(t) =", document.getElementById("ui_l"), {
        throwOnError: false
    });
    katex.render("u_i(t)", document.getElementById("ui_2"), {
        throwOnError: false
    });
    katex.render("u_d(t) =", document.getElementById("ud_l"), {
        throwOnError: false
    });
    katex.render("u_p(t) = k_pe(t)", document.getElementById("up_full"), {
        throwOnError: false
    });
    katex.render("u_i(t) = k_i \\int{e(t)dt}", document.getElementById("ui_full"), {
        throwOnError: false
    });
    katex.render("u_d(t) = k_d\\frac{de(t)}{dt}", document.getElementById("ud_full"), {
        throwOnError: false
    });
    katex.render("FF()", document.getElementById("ff_t"), {
        throwOnError: false
    });
    katex.render("e(t)", document.getElementById("et"), {
        throwOnError: false
    });
    katex.render("(Desired-Actual)", document.getElementById("stminusat"), {
        throwOnError: false
    });

    // buttons
    $("#start").click(function(){
        start();            
    });
    
    $("#stop").click(function(){
        stop();
    });
    
    $("#toggle").click(function(){
        control = !control;
        autoModeChanged();       
    });
    
    $("#autotune").click(function(){
        autoTuning = !autoTuning;
        autoTuningChanged();             
    });                  
    
    // plots
    initPlot(0, "plot1", "", stupidDogshit, 'rgba(128,128,128,1)', -200,200,1);
    initPlot(1, "plot1", "control input (actual)", plInput, 'rgba(255,0,0,1)', -200,200,0);
    initPlot(2, "plot1", "control setpoint (desired)", plSetpoint, 'rgba(0,0,255,1)', -200,200,0);
    initPlot(3, "plot1", "control output (pid out)", plOutput, 'rgba(0,255,0,1)', -200,200,0);
    
    
    //$("#ip").val(IP);
    
    $( "#sliderProcess" ).slider({
        min: 0,
        max: procs.length-1,
        step: 1,
        value: 0,                
        change:  function( event, ui ) { processChanged(); updateSliderText(); },                  
    });
    sProcess.min = 0;
    sProcess.max = procs.length-1,
    sProcess.step = 1;
    sProcess.value = 0;
    sProcess.onchange = function( event, ui ) { processChanged(); updateSliderText(); };

    
    
    // $( "#sliderNoise" ).slider({
    //     min: 0,
    //     max: 50,
    //     step: 1,
    //     value: 10,
    //     slide: function( event, ui ) { updateSliderText(); },
    //     change:  function( event, ui ) { updateSliderText(); },                  
    // });
    
    // $( "#sliderSampletime" ).slider({
    //     min: 50,
    //     max: 1000,
    //     step: 10,
    //     value: 50,
    //     slide: function( event, ui ) { sampleTimeChanged(); },
    //     change:  function( event, ui ) { sampleTimeChanged(); },                  
    // });                                                  
    
    // $( "#sliderSetpoint" ).slider({
    //     min: -180,
    //     max: 180,
    //     step: 1,
    //     value: 50,
    //     slide: function( event, ui ) { setpointChanged(); },
    //     change:  function( event, ui ) { setpointChanged(); },                  
    // });
    sSetpoint.min = -180;
    sSetpoint.max = 180;
    sSetpoint.step = 1;
    sSetpoint.value = 50;
    // sSetpoint.onslide = setpointChanged();
    sSetpoint.oninput = function() {setpointChanged(); };                 
    
    
    // $( "#sliderKp" ).slider({
    //     min: 0,
    //     max: 5,
    //     step: 0.01,
    //     value: 0.5,
    //     slide: function( event, ui ) { tuningsChanged();  },
    //     change:  function( event, ui ) { tuningsChanged(); },                  
    // });
    sKp.min = 0;
    sKp.max = 5;
    sKp.step = 0.01;
    sKp.value = 1;
    // sKp.onslide = tuningsChanged();
    sKp.oninput = function() {tuningsChanged();};                   
    
    // $( "#sliderKi" ).slider({
    //     min: 0,
    //     max: 20,
    //     step: 0.01,
    //     value: 0.5,
    //     slide: function( event, ui ) { tuningsChanged(); },
    //     change:  function( event, ui ) { tuningsChanged(); },                  
    // });
    sKi.min = 0;
    sKi.max = 20;
    sKi.step = 0.01;
    sKi.value = 0;
    // sKi.onslide = tuningsChanged();
    sKi.oninput = function() {tuningsChanged();};                  
    
    // $( "#sliderKd" ).slider({
    //     min: 0,
    //     max: 5,
    //     step: 0.01,
    //     value: 0,
    //     slide: function( event, ui ) { tuningsChanged(); }, 
    //     change:  function( event, ui ) { tuningsChanged(); },                  
    // });
    sKd.min = 0;
    sKd.max = 5;
    sKd.step = 0.01;
    sKd.value = 0;
    // sKd.onslide = tuningsChanged();
    sKd.oninput = function() {tuningsChanged();};

    // $( "#sliderIcap" ).slider({
    //     min: 0,
    //     max: 300,
    //     step: 1,
    //     value: 0,
    //     slide: function( event, ui ) { tuningsChanged(); }, 
    //     change:  function( event, ui ) { tuningsChanged(); },                  
    // });
    sIcap.min = 0;
    sIcap.max = 300;
    sIcap.step = 1;
    sIcap.value = 0;
    // sIcap.onslide = tuningsChanged();
    sIcap.oninput = function() {tuningsChanged();};
    
    $("#apply").click(function(){      
        processFuncChanged();                                                           
    });

    $("#applyFF").click(function(){      
        ffFuncChanged();                                                           
    });
    
    
    pid.setOutputLimits(-1000, 1000);    
    autoModeChanged();
    autoTuningChanged();                                                  
    
    processChanged();
    updateSliderText();
    process();
    
    
    start();      
    
    
});

function testSequence(){
    if(isStab){
        var sequence = document.getElementById("testSequence").value.replaceAll(' ','').replaceAll('\n','').replaceAll('_','').replaceAll(',','').replaceAll('.','').replaceAll('\t','');

        console.log(sequence);
        x = sequence.split(";")
        pid.reset();
        disableButton();
        t = 0;
        for(var i = 0; i < x.length; i ++){
            a = x[i].split("MS");
            if(a.length == 2){
                console.log(parseInt(a[0]), parseInt(a[1]));
                setTimeout(setSetpoint,parseInt(a[0]), parseInt(a[1]));
                t = parseInt(a[0]);
            }
        }
        console.log("timing",t);
        setTimeout(enableButton,t);
    
        if(true || (Kp != prevP || Ki != prevI || Kd != prevD || Icap != prevIcap)){
            // console.log(`${Kp},${prevP} ${Ki},${prevI} ${Kd},${prevD}`);
            prevP = Kp;
            prevI = Ki;
            prevD = Kd;
            prevIcap = Icap;
            mostOver = 0;
            mostStab = 0;

            $("#overshot4").html($("#overshot3").html());
            $("#overshot3").html($("#overshot2").html());   
            $("#overshot2").html($("#overshot1").html());
            $("#overshot1").html(`
                <b>kP:</b><span id="os_kp" style="margin:5px;"> ${Kp} </span>
                <b>kI:</b><span id="os_ki" style="margin:5px;"> ${Ki} </span>
                <b>kD:</b><span id="os_kd" style="margin:5px;"> ${Kd} </span>
                <b>Icap:</b><span id="os_icap" style="margin:5px;"> ${Icap} </span>
                <br>
                <b style="color: #830071;">Worst Overshoot:</b><span id="os_os" style="margin:5px;"> Has not overshot </span>
                <br>
                <b style="color: #a18100;">Worst Stabilization:</b><span id="os_stab" style="margin:5px;"> Not stabilized </span>
                <br>
                <b>Model:</b><span id="os_mod" style="margin:5px;">${(proc.key).split("-")[0]}</span>
            `);
        
        }
    }else{
        document.getElementById("errors").innerHTML = "<b>Stabilize Before Testing</b>";
        setTimeout(restoreError, 2000);
    }
}

function restoreError(){
    document.getElementById("errors").innerHTML = "<b>No Errors</b>";
}

function setSetpoint(x){
    console.log(`setting setpoint ${x}`);
    sSetpoint.value = x;
    setpointChanged();
}


function disableButton(){
    // console.log(`dis button ${document.getElementById("testSequenceButton").disabled}`);
    document.getElementById("testSequenceButton").disabled = true;
    document.getElementById("sliderSetpoint").disabled = true;
    document.getElementById("sliderKp").disabled = true;
    document.getElementById("sliderKi").disabled = true;
    document.getElementById("sliderKd").disabled = true;
    document.getElementById("sliderIcap").disabled = true;
    document.getElementById("ffFunc").disabled = true;
    document.getElementById("tuningsBox").disabled = true;
    
    // console.log(`dis button ${document.getElementById("testSequenceButton").disabled}`);
}

function enableButton(){
    // console.log(`das button ${document.getElementById("testSequenceButton").disabled}`);
    document.getElementById("testSequenceButton").disabled = false;
    document.getElementById("sliderSetpoint").disabled = false;
    document.getElementById("sliderKp").disabled = false;
    document.getElementById("sliderKi").disabled = false;
    document.getElementById("sliderKd").disabled = false;
    document.getElementById("sliderIcap").disabled = false;
    document.getElementById("ffFunc").disabled = false;
    document.getElementById("tuningsBox").disabled = false;
    // console.log(`das button ${document.getElementById("testSequenceButton").disabled}`);
}
