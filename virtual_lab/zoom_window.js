var zoomDisplaceX;
var zoomDisplaceY;

const scaleFac = 4;

document.getElementById('video_canvas').onmousemove = function(e) {
    // e = Mouse click event.
    this.zoomCanvas = document.getElementById("zoom_canvas");
    this.videoCanvas = document.getElementById("video_canvas");
    scale = this.videoCanvas.clientWidth/this.zoomCanvas.clientWidth;

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.

    zoomDisplaceX = scaleFac*(x - (this.zoomCanvas.clientWidth)/4);
    zoomDisplaceY = scaleFac*(y/2 - (this.zoomCanvas.clientHeight)/8);

    console.log("L: " + x + "; T: " + y + ";" + "X: " + zoomDisplaceX + "; Y: " + zoomDisplaceY + ";");
    
}

let processor = {
    timerCallback: function() {
        this.computeFrame();
        let self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 0);
    },
  
    doLoad: function() {
        this.video = document.getElementById("video_canvas");
        this.c1 = document.getElementById("zoom_canvas");
        this.ctx1 = this.c1.getContext("2d");
        let self = this;
        this.video.addEventListener("play", function() {
            // self.width = self.video.videoWidth / 2;
            // self.height = self.video.videoHeight / 2;
            self.timerCallback();
        }, false);
    },
  
    computeFrame: function() {
        zoomCanvas = document.getElementById("zoom_canvas");
        videoCanvas = document.getElementById("video_canvas");
        //alert(this.video.clientWidth);
        this.ctx1.drawImage(this.video, -zoomDisplaceX,-zoomDisplaceY, (scaleFac * this.video.clientWidth * videoCanvas.clientWidth/zoomCanvas.clientWidth)/4, (scaleFac * this.video.clientHeight * videoCanvas.clientHeight/zoomCanvas.clientHeight)/4);
        //   let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        //       let l = frame.data.length / 4;
    
        //   for (let i = 0; i < l; i++) {
        //     let r = frame.data[i * 4 + 0];
        //     let g = frame.data[i * 4 + 1];
        //     let b = frame.data[i * 4 + 2];
        //     if (g > 100 && r > 100 && b < 43)
        //       frame.data[i * 4 + 3] = 0;
        //   }
        //   this.ctx1.putImageData(frame, 0, 0);
        return;
    }
};

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});