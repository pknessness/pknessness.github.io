/**
 * pid-autotune
 */

"use strict";
var PID_ATune = function(Output) {
	this.controlType =0 ; //default to PI
	this.noiseBand = 0.5;
  this.output = Output;
	this.running = false;
	this.oStep = 30;
	this.setLookbackSec(10);
	this.lastTime = this.millis();
	this.lastInputs = [];
  for (var i=0; i < 101; i++) this.lastInputs.push(0);
  this.peaks = [];
  for (var i=0; i < 10; i++) this.peaks.push(0);    	
}

PID_ATune.prototype.setInput = function(current_value) {
    this.input = current_value;
};

PID_ATune.prototype.setOutput = function(current_value) {
    this.output = current_value;
};

PID_ATune.prototype.getOutput = function() {
    return this.output;
};

PID_ATune.prototype.millis = function() {
    var d = new Date();
    return d.getTime();
};

PID_ATune.prototype.cancel = function() 
{
	this.running = false;
} 

PID_ATune.prototype.runtime = function()     
{
	//console.log("PID_ATune sampleTime "+this.sampleTime);
  this.justevaled=false;
	if(this.peakCount>9 && this.running)
	{
		this.running = false;
		this.finishUp();
		return 1;
	}
	var now = this.millis();   
	  
	if((now-this.lastTime)<this.sampleTime) return false;  
	this.lastTime = now;
	var refVal = input;
  //console.log("PID_ATune refVal "+refVal);  
	this.justevaled=true;
	if(!this.running)
	{ //initialize working variables the first time around
		console.log("PID_Atune.runtime start sampleTime "+this.sampleTime + " output "+this.output);
    this.peakType = 0;
		this.peakCount=0;
		this.justchanged=false;
		this.absMax=refVal;
		this.absMin=refVal;
		this.setpoint = refVal;
		this.running = true;
		this.outputStart = this.output;
		this.output = this.outputStart+this.oStep;
	}
	else
	{
		if(refVal>this.absMax)this.absMax=refVal;
		if(refVal<this.absMin)this.absMin=refVal;    
	}
	
	//oscillate the output base on the input's relation to the setpoint
	
	if(refVal>this.setpoint+this.noiseBand) this.output = this.outputStart-this.oStep;
	else if (refVal<this.setpoint-this.noiseBand) this.output = this.outputStart+this.oStep;
  //console.log("PID_ATune refVal "+refVal+" setpoint "+this.setpoint+ " output "+this.output);
	
	
  //bool isMax=true, isMin=true;
  this.isMax=true;this.isMin=true;
  //id peaks
  for(var i=this.nLookBack-1;i>=0;i--)
  {
    var val = this.lastInputs[i];
    if(this.isMax) this.isMax = refVal>val;
    if(this.isMin) this.isMin = refVal<val;
    this.lastInputs[i+1] = this.lastInputs[i];
  }
  this.lastInputs[0] = refVal;  
  if(this.nLookBack<9)
  {  //we don't want to trust the maxes or mins until the inputs array has been filled
	  console.log("dont trust yet");
    return 0;
	}
  
  if(this.isMax)
  {
    console.log('isMax');
    if(this.peakType==0)this.peakType=1;
    if(this.peakType==-1)
    {
      this.peakType = 1;
      this.justchanged=true;
      this.peak2 = this.peak1;
    }
    this.peak1 = now;
    this.peaks[this.peakCount] = refVal;
   
  }
  else if(this.isMin)
  {
    console.log('isMin');
    if(this.peakType==0)this.peakType=-1;
    if(this.peakType==1)
    {
      this.peakType=-1;
      this.peakCount++;
      this.justchanged=true;
      console.log('peakCount '+this.peakCount);
    }
    
    if(this.peakCount<10)this.peaks[this.peakCount] = refVal;
  }
  
  if(this.justchanged && this.peakCount>2)
  { //we've transitioned.  check if we can autotune based on the last peaks
    var avgSeparation = (Math.abs(this.peaks[this.peakCount-1]-this.peaks[this.peakCount-2])+Math.abs(this.peaks[this.peakCount-2]-this.peaks[this.peakCount-3]))/2;
    console.log("avgSeparation "+avgSeparation + " < " +0.05*(this.absMax-this.absMin));
    if( avgSeparation < 0.05*(this.absMax-this.absMin))
    {
		  this.finishUp();
      this.running = false;
	    return 1;
	 
    }
  }
  this.justchanged=false;
	return 0;
}


PID_ATune.prototype.finishUp = function()
{
    console.log("PID_ATune finishUp");
	  this.output = this.outputStart;
    //we can generate tuning parameters!
    this.Ku = 4*(2*this.oStep)/((this.absMax-this.absMin)*3.14159);
    this.Pu = (this.peak1-this.peak2) / 1000;
    console.log("Ku="+this.Ku);
    console.log("Pu="+this.Pu);
}


PID_ATune.prototype.getKp = function()
{
	return this.controlType==1 ? 0.6 * this.Ku : 0.4 * this.Ku;
}

PID_ATune.prototype.getKi = function()
{
	return this.controlType==1? 1.2*this.Ku / this.Pu : 0.48 * this.Ku / this.Pu;  // Ki = Kc/Ti
}

PID_ATune.prototype.getKd = function()
{
	return this.controlType==1? 0.075 * this.Ku * this.Pu : 0;  //Kd = Kc * Td
}

PID_ATune.prototype.setOutputStep = function(Step)
{
	this.oStep = Step;
}

PID_ATune.prototype.getOutputStep = function()
{
	return this.oStep;
}

//0=PI, 1=PID
PID_ATune.prototype.setControlType = function(Type) 
{
	this.controlType = Type;
}

PID_ATune.prototype.getControlType = function()
{
	return this.controlType;
}
	
PID_ATune.prototype.setNoiseBand = function(Band)
{
	this.noiseBand = Band;
}

PID_ATune.prototype.getNoiseBand = function()
{
	return this.noiseBand;
}

PID_ATune.prototype.setLookbackSec = function(value)
{
  if (value<1) value = 1;
	
	if(value<25)
	{
		this.nLookBack = value * 4;
		this.sampleTime = 250;
	}
	else
	{
		this.nLookBack = 100;
		this.sampleTime = value*10;
	}
}

PID_ATune.prototype.getLookbackSec = function()
{
	return this.nLookBack * this.sampleTime / 1000;
}
