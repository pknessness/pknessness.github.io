// const canvas = document.getElementById("zoom_canvas");
// const ctx = canvas.getContext("2d");

// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 50000, 50000);

function dynamicdropdown(listindex)
{
    switch (listindex)
    {
        case "" :
            document.getElementById("material_type").innerHTML = null;
            document.getElementById("material_type").options[0]=new Option("Select Test Type To Show Available Materials","");
            break;
        case "tensile" :
            document.getElementById("material_type").innerHTML = null;
            document.getElementById("material_type").options[0]=new Option("Aluminum 6061","aluminum_6061");
            document.getElementById("material_type").options[1]=new Option("Brass 360","brass_360");
            document.getElementById("material_type").options[2]=new Option("Low Carbon Steel","low_carbon_steel");
            document.getElementById("material_type").options[3]=new Option("PLA","pla");
            document.getElementById("material_type").options[4]=new Option("Stainless Steel 316L","stainless_steel_316l");
            document.getElementById("material_type").options[5]=new Option("Steel 1084","steel_1084");
            break;
        case "fatigue" :
            document.getElementById("material_type").innerHTML = null;
            document.getElementById("material_type").options[0]=new Option("Steel 316L","steel_316l");
            break;
        case "rockwell_hardness" :
            document.getElementById("material_type").innerHTML = null;
            document.getElementById("material_type").options[0]=new Option("Brass 360","brass_360");
            break;
        case "vickers_hardness" :
            document.getElementById("material_type").innerHTML = null;
            document.getElementById("material_type").options[0]=new Option("Steel 1018","steel_1018");
            break;
        case "knoop_hardness" :
            document.getElementById("material_type").innerHTML = null;
            document.getElementById("material_type").options[0]=new Option("N/A","");
            break;
        case "charpy" :
            document.getElementById("material_type").innerHTML = null;
            document.getElementById("material_type").options[0]=new Option("Steel 4140","steel_4140");
            break;
        }

    return true;
}

function changeVideo(){

    var video = document.getElementById('video_canvas');
    var sources = document.getElementById('video_source');

    video.setAttribute('controls', "true");

    var testType = document.querySelector('#test_type');
    var materialType = document.querySelector('#material_type');

    var path = `videos/${testType.value}/${materialType.value}.mp4`;

    video.pause();
    sources.setAttribute('src', path);
    video.load();
    video.play();
}

const processor = {};

processor.doLoad = function doLoad() {
    const video = document.getElementById("video_canvas");
    this.video = video;

    this.c1 = document.getElementById("zoom_canvas");
    this.ctx1 = this.c1.getContext("2d");

    video.addEventListener(
        "play",
        () => {
            this.width = video.videoWidth / 2;
            this.height = video.videoHeight / 2;
            this.timerCallback();
        },
        false,
    );
};

processor.timerCallback = function timerCallback() {
    if (this.video.paused || this.video.ended) {
        return;
    }
    this.computeFrame();
    setTimeout(() => {
        this.timerCallback();
    }, 0);
};

processor.computeFrame = function () {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    const frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    const data = frame.data;

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i + 0];
        const green = data[i + 1];
        const blue = data[i + 2];
        if (green > 100 && red > 100 && blue < 43) {
            data[i + 3] = 0;
        }
    }
    this.ctx1.putImageData(frame, 0, 0);
};