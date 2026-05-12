var viewing = document.getElementById("viewer");
var snap_slider, snap_display;

var slidWidth, slidHeight;

var sizeX, sizeY, topLeft, opponent;

var snaps;

function setup() {
    background('magenta');
    var p5canvas = createCanvas(viewing.clientWidth, viewing.clientHeight);
    p5canvas.parent('viewer');
    const canvas = document.getElementById("defaultCanvas0");

    slidWidth = (viewing.clientWidth - viewing.clientHeight)/4;
    slidHeight = viewing.clientHeight;

    textSize(30);

}

var prev_prevSnap = 0;

function draw() {
    if(topLeft != undefined){
        fill('white')
        noStroke();
        rect(slidWidth, 40, slidWidth, 80);
        stroke('black');
        text(`${snap_slider.value()}`, slidWidth, 40, slidWidth, 80);

        var snap_num = snap_slider.value();

        var prevSnap = 0;
        for(const snapN in snaps){
            if(snapN > snap_num){
                break;
            }
            prevSnap = snapN;
        }

        if(prevSnap != 0 && prevSnap != prev_prevSnap){
            prev_prevSnap = prevSnap;
            fill('white');
            noStroke();
            rect(slidWidth, 120, slidWidth, 80);
            stroke('red');
            text(`${prevSnap}`, slidWidth, 120, slidWidth, 80);

            // var buttonsize = int(viewing.clientHeight / Math.max(sizeX, sizeY));
            var buttonsize = (viewing.clientHeight / Math.max(sizeX, sizeY));

            rect(topLeft[0], topLeft[1], slidHeight, slidHeight);
            if(snaps[prevSnap] == undefined){
                console.log(prevSnap);
                return;
            }
            // console.log(snaps[prevSnap].length);
            noStroke();
            for(var i = 0; i < snaps[prevSnap].length; i += 32){
                var x = int(i/32) % sizeX;
                var y = int(int(i/32) / sizeX);
                // console.log(i, x, y);
                // text(`${snap_slider.value()}`, topLeft[0] + x * buttonsize, topLeft[1] + y * buttonsize, buttonsize, buttonsize);
                cnt = 0;
                for(var j = i; j < i + 32; j++){
                    cnt += snaps[prevSnap][j];
                }
                cnt *= 100;
                cnt = Math.min(cnt, 255);
                // fill(int(Math.random()*256),int(Math.random()*256),int(Math.random()*256));
                fill(cnt, cnt, cnt);
                // console.log(cnt);
                rect(topLeft[0] + x * buttonsize, topLeft[1] + y * buttonsize, buttonsize, buttonsize);
            }
        }
    }
}

window.onload = function() {
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function(){
            var arrayBuffer = reader.result
            var bytes = new Uint8Array(arrayBuffer);
            // console.log(bytes);
            // fileDisplayArea.innerText = bytes;
            document.getElementById('filein').style.display = 'none';
            var dmag = String.fromCharCode(...bytes.slice(0,4));
            if(dmag != "DMAG"){
                alert("INVALID/CORRUPTED FILE");
            }
            sizeX = int(bytes[4])*2;
            sizeY = int(bytes[5])*2; //remove the x2 once i fix on sc2 end
            var map = String.fromCharCode(...bytes.slice(6,26));
            opponent = int(bytes[26]);
            console.log(sizeX, sizeY, map);

            topLeft = [int((viewing.clientWidth - viewing.clientHeight)/2), 0];

            console.log("TL", topLeft);

            // for(var i = 0; i < sizeX; i ++){
            //     for(var j = 0; j < 5; j ++){
            //         var label = createButton(``,"#99aaff");
            //         label.position(topLeft[0] + i * buttonsize, topLeft[1] + j * buttonsize);
            //         label.size(buttonsize, buttonsize);
            //         label.style('background: #99aaff;');
            //         // label.style('font-size', viewing.clientWidth/150 + 'px');
            //         console.log(sizeX, sizeY);
            //     }
            // }

            snaps = {};
            ptr = 27;
            var minSnap, maxSnap;
            for(var p = ptr; p < bytes.length;){
                // var map = Int.fromCharCode(...bytes.slice(6,26));
                var frameNumber = 0;
                for (var o = p; p < o + 4; p++) {
                    // frameNumber = (frameNumber * 256) + bytes[p];
                    frameNumber += (bytes[p] * (Math.pow(256, p - o)));
                    // console.log(frameNumber, bytes[p]);
                }
                snapsize = sizeX * sizeY * 32 //remove the x4 once i fix it on sc2 end
                snaps[frameNumber] = bytes.slice(p, p + snapsize);
                if(minSnap == undefined){
                    minSnap = frameNumber;
                }
                maxSnap = frameNumber;
                // console.log(frameNumber)
                p += snapsize;
                // console.log(snaps)
            }

            var displaceX = slidHeight/2 - slidWidth/2;
            var displaceY = slidWidth/2 - slidHeight/2;

            snap_slider = createSlider(minSnap, maxSnap, 0, 20);
            snap_slider.position(-displaceX, -displaceY);
            snap_slider.style('height', `${slidWidth}px`);
            snap_slider.style('width', `${slidHeight}px`);
            snap_slider.style('transform', 'rotate(270deg)');
            // label.mouseOver(onHoverTagAb(i, j, side, `${bd[i][j].pinName}`));
            // label.mouseOut(offHoverTagAb(i, j, side, `${bd[i][j].pinName}`));
            // if(side == "left")leftButtonTags[i][j].push(label); else rightButtonTags[i][j].push(label);
        }
    });
}
