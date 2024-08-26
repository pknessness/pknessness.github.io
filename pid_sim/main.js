var procs = [
    {key: "week3_assignment2", 
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
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v * (1 + Math.sin(user.randomSeed * time))) / 50;\n" 
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
        range: 180,
        moveType: "pos",
    },
    {key: "pid_lecture_example_1", 
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
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v * (1 + Math.sin(user.randomSeed * time))) / 50;\n" 
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
        range: 180,
        moveType: "pos",
    },
    {key: "pid_lecture_example_2", 
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
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v * (1 + Math.sin(user.randomSeed * time))) / 50;\n" 
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
        range: 180,
        moveType: "pos",
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
    {key: "flywheel_velocity", 
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
        + "user.v = user.v + (user.a - user.frictionCoefficient * user.v * (1 + Math.sin(user.randomSeed * time))) / 5;\n"
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
        range: 150,
        moveType: "vel",
    },
];


var SAMPLES = 200;
var proc = procs[0];
var sampleTime = 50;
var plInput   = new MakeDraw();
var plOutput = new MakeDraw();
var plSetpoint  = new MakeDraw();
var setpoint = 50;
var input = 50;
var output = 0;
var user = new Object();
var run = false;
var control = true;
var autoTuning = false;
var noise = 0;
var Kp = 0.8;
var Ki = 0.8;
var Kd = 0.001;
var pid = new PID(input, setpoint, Kp, Ki, Kd, 'direct');
var pidTuner = new PID_ATune();

//ADDED BY ANSHAL JAIN (pknessness)
var overshot = 0;
var beyondTheBoundary = false;
var originalspot = 0;
var prevActual = 0;
var prevP = undefined;
var prevI = undefined;
var prevD = undefined;

var prevT = 0;

var rad_a = 0;
var rad_d = 0;

var stupidDogshit  = new MakeDraw();


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

    var model = procs[ $("#sliderProcess").slider("value") ];

    var curT = Date.now();
    var dt = curT - prevT;
    prevT = curT;

    console.log(model.moveType);

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

    ctx.beginPath();
    ctx.arc(w/2,h/2,r*0.12, 0, Math.PI * 2, 1);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill(); 
}

function process(){    

    drawMotor();

    $("#plot1").width(window.innerWidth * 0.55);
    $("#overshoot").width(window.innerWidth * 0.2);
    $("#whee").width(window.innerWidth * 0.25);
    // console.log(window.innerWidth);
    
    time = (new Date).getTime();
    $("#time").text( time );
    $("#desired").text( setpoint.toFixed(2) );
    $("#actual").text( input.toFixed(2) );
    $("#output").text( output.toFixed(2) );
    
    
    if (run) {                        
        noise = (Math.random() - 0.5) * $("#sliderNoise").slider("value");
        //input = Math.sin(time/1000)*40 + noise + output;
        prevActual = input;
        input = proc.compute(time, input, noise, output, user);
        
        if((prevActual < setpoint && input > setpoint) || (prevActual > setpoint && input < setpoint)){
            beyondTheBoundary = true;
            // console.log(`activated kyoukaiNoKanata`);
        }

        if(setpoint > originalspot){
            if(prevActual > input){
                // console.log(`kyoukaiNoKanata ${beyondTheBoundary} os${overshot}`);
                if(beyondTheBoundary && Math.abs(prevActual - setpoint) > overshot){
                    console.log(`set overshot`);
                    beyondTheBoundary = false;
                    overshot = Math.abs(prevActual - setpoint);
                    $("#overshot1").text(`kP: ${Kp} kI: ${Ki} kD: ${Kd} max overshot: ${overshot.toFixed(2)}`);
                    prevP = Kp; prevI = Ki; prevD = Kd;
                }
                //console.log(overshot);
            }
        }else if(setpoint < originalspot){
            if(prevActual < input){
                // console.log(`kyoukaiNoKanata ${beyondTheBoundary} os${overshot}`);
                if(beyondTheBoundary && Math.abs(prevActual - setpoint) > overshot){
                    console.log(`set overshot`);
                    beyondTheBoundary = false;
                    overshot = Math.abs(prevActual - setpoint);
                    $("#overshot1").text(`kP: ${Kp} kI: ${Ki} kD: ${Kd} max overshot: ${overshot.toFixed(2)}`);
                    prevP = Kp; prevI = Ki; prevD = Kd;
                }
                //console.log(overshot);
            }
        }
        
        if (autoTuning){
            pidTuner.setInput(input);          
            var res = pidTuner.runtime(output);
            if (res != 0){
                // tuning done
                autoTuning = false;
                console.log("tuning done");
                var kp = pidTuner.getKp();
                var ki = pidTuner.getKi();
                var kd = pidTuner.getKd();
                console.log("tunings "+kp+","+ki+","+kd);
                //pid.setTunings(kp,ki,kd);
                $("#sliderKp").slider("value", kp);
                $("#sliderKi").slider("value", ki);
                $("#sliderKd").slider("value", kd);
                autoTuningChanged();        
            }
            output = pidTuner.getOutput();
            //console.log("PID_Atune.runtime output " + output);
        } else {  
            pid.setInput(input);
            pid.compute();   
            output = pid.getOutput();    
        }              

        addPlotData(stupidDogshit, 0);
        addPlotData(plInput, input);
        addPlotData(plSetpoint, setpoint);
        addPlotData(plOutput, output);
        
    }
    setTimeout(process, sampleTime);      
}


function processChanged(){
    proc = procs[ $("#sliderProcess").slider("value") ];
    console.log("-------");
    console.log("process "+proc.key);
    //alert(procs[0].key);
    //alert($("#sliderProcess").slider("value"));        
    $("#sliderSampletime").slider("value", proc.sampletime);
    $("#sliderSetpoint").slider("value", proc.setpoint);
    $("#sliderNoise").slider("value", proc.noise);
    $("#sliderKp").slider("value", proc.Kp);
    $("#sliderKi").slider("value", proc.Ki);
    $("#sliderKd").slider("value", proc.Kd);
    $("#sliderKd").slider("value", proc.Kd);
    $( "#sliderSetpoint" ).slider({
        min: -proc.range,
        max: proc.range,                  
    });
    //$("#processFunc").text(proc.func);
    var func = document.getElementById("processFunc");
    func.value = proc.func; 
    processFuncChanged();    
}


function setpointChanged(){
    originalspot = setpoint;
    setpoint = $("#sliderSetpoint").slider("value");
    // console.log("setpoint "+setpoint);        
    pid.setPoint(setpoint);
    if(Kp != prevP || Ki != prevI || Kd != prevD){
        // console.log(`${Kp},${prevP} ${Ki},${prevI} ${Kd},${prevD}`);
        prevP = Kp;
        prevI = Ki;
        prevD = Kd;
        overshot = 0;
        $("#overshot9").text($("#overshot8").text());
        $("#overshot8").text($("#overshot7").text());
        $("#overshot7").text($("#overshot6").text());
        $("#overshot6").text($("#overshot5").text());
        $("#overshot5").text($("#overshot4").text());
        $("#overshot4").text($("#overshot3").text());
        $("#overshot3").text($("#overshot2").text());
        $("#overshot2").text($("#overshot1").text());
        $("#overshot1").text(`kP: ${Kp} kI: ${Ki} kD: ${Kd} max overshot: not yet reached`);
                                
    }
    updateSliderText();    
}

function tuningsChanged(){  
    Kp  = $("#sliderKp").slider("value");    
    Ki  = $("#sliderKi").slider("value");
    Kd  = $("#sliderKd").slider("value");
    console.log("tunings "+Kp+","+Ki+","+Kd);   
    pid.setTunings(Kp, Ki, Kd);
    updateSliderText();   
}

function sampleTimeChanged(){
    sampleTime = $("#sliderSampletime").slider("value");
    console.log("sampletime "+sampleTime);
    pid.setSampleTime(sampleTime);
    updateSliderText();  
}

function processFuncChanged(){  
    var func = $("#processFunc").val();
    console.log("func: "+func);
    if (func == "") func ="return 0"; 
    proc.compute = new Function("time", "input", "noise", "output", "user", func);   
}

function updateSliderText(){
    $("#process").text( procs[$("#sliderProcess").slider("value")].key );   
    $("#setpoint").text( $("#sliderSetpoint").slider("value") );
    $("#noise").text( $("#sliderNoise").slider("value") );  
    $("#sampletime").text( $("#sliderSampletime").slider("value") );  
    $("#kp").text( $("#sliderKp").slider("value") );
    $("#ki").text( $("#sliderKi").slider("value") );
    $("#kd").text( $("#sliderKd").slider("value") );  
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
    
    $( "#sliderNoise" ).slider({
        min: 0,
        max: 50,
        step: 1,
        value: 10,
        slide: function( event, ui ) { updateSliderText(); },
        change:  function( event, ui ) { updateSliderText(); },                  
    });
    
    $( "#sliderSampletime" ).slider({
        min: 50,
        max: 1000,
        step: 10,
        value: 50,
        slide: function( event, ui ) { sampleTimeChanged(); },
        change:  function( event, ui ) { sampleTimeChanged(); },                  
    });                                                  
    
    $( "#sliderSetpoint" ).slider({
        min: -180,
        max: 180,
        step: 1,
        value: 50,
        slide: function( event, ui ) { setpointChanged(); },
        change:  function( event, ui ) { setpointChanged(); },                  
    });                  
    
    
    $( "#sliderKp" ).slider({
        min: 0,
        max: 5,
        step: 0.01,
        value: 0.5,
        slide: function( event, ui ) { tuningsChanged();  },
        change:  function( event, ui ) { tuningsChanged(); },                  
    });                      
    
    $( "#sliderKi" ).slider({
        min: 0,
        max: 20,
        step: 0.01,
        value: 0.5,
        slide: function( event, ui ) { tuningsChanged(); },
        change:  function( event, ui ) { tuningsChanged(); },                  
    });                  
    
    $( "#sliderKd" ).slider({
        min: 0,
        max: 5,
        step: 0.01,
        value: 0,
        slide: function( event, ui ) { tuningsChanged(); }, 
        change:  function( event, ui ) { tuningsChanged(); },                  
    });
    
    $("#apply").click(function(){      
        processFuncChanged();                                                           
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
            t = a[0];
        }
    }
    setTimeout(enableButton(),parseInt(t));
}

function setSetpoint(x){
    console.log(`setting setpoint ${x}`);
    $( "#sliderSetpoint" ).slider({
        value: x,                 
    });
}

function disableButton(){
    $("testSequenceButton").prop('disabled', true);
}

function enableButton(){
    $("testSequenceButton").prop('disabled', false);
}