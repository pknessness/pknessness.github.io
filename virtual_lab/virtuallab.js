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

    changeVideo();
    return true;
}

function changeVideo(){

    var video = document.getElementById('video_canvas');
    var sources = document.getElementById('video_source');

    video.setAttribute('controls', "true");

    var testType = document.querySelector('#test_type');
    var materialType = document.querySelector('#material_type');

    var videoPath;
    var rawDataPath;

    if(testType.value == '' | materialType.value == ''){
        videoPath = 'standby.mp4'
    }else{
        videoPath = `videos/${testType.value}/${materialType.value}.mp4`;
    }

    var rawDataButton = document.getElementById("raw_data");
    if(testType.value == 'tensile'){
        rawDataButton.disabled = false;
        rawDataPath = `raw_data/${testType.value}/${materialType.value}.xlsx`;
    }else{
        rawDataButton.disabled = true;
    }

    video.pause();
    sources.setAttribute('src', videoPath);
    sources.setAttribute('poster', "");
    document.getElementById('download_url').setAttribute('href', rawDataPath);
    video.load();
    //video.play();
}