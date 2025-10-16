document.addEventListener("DOMContentLoaded", function(event) {
    // subproj = document.getElementsByClassName("subproj");
    // for (proj of subproj) {
    //     //proj.style.padding = `${proj.clientHeight/(1.5 * 2)}px 5px`;
    //     //proj.style.width = `${proj.clientWidth/(1.5 * 2)}px`
    //     //proj.style.padding = "0px 1px"
    //     // proj.style.client = `${proj.children[0].clientHeight}px`;
    //     proj.clientHeight = proj.children[0].clientHeight;
    //     //proj.style.padding = `10px 10px`;
    //     console.log(proj.children[0].clientHeight)
    // }
    document.getElementById("wrap").style.width = document.getElementById("bod").clientWidth / 1.5;
    console.log(document.getElementById("wrap").clientWidth, document.getElementById("bod").clientWidth);
});