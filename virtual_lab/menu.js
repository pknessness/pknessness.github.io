function dynamicdropdown(testtype)
{
    switch (testtype)
    {
        case "tensile" :
            document.getElementById("material").options[0]=new Option("Aluminum 6061","aluminum_6061");
            document.getElementById("material").options[1]=new Option("Brass 360","brass_360");
            document.getElementById("material").options[2]=new Option("Low Carbon Steel","low_carbon_steel");
            document.getElementById("material").options[3]=new Option("PLA","pla");
            document.getElementById("material").options[4]=new Option("Stainless Steel 316L","stainless_steel_316l");
            document.getElementById("material").options[5]=new Option("Steel 1084","steel_1084");
            break;
        case "fatigue" :
            document.getElementById("material").options[0]=new Option("Steel 316L","steel_316l");
            break;
        case "rockwell-hardness" :
            document.getElementById("material").options[0]=new Option("Brass 360","brass_360");
            break;
        case "vickers-hardness" :
            document.getElementById("material").options[0]=new Option("Steel 1018","steel_1018");
            break;
        case "knoop-hardness" :
            document.getElementById("material").options[0]=new Option("N/A","");
            break;
        case "charpy" :
            document.getElementById("material").options[0]=new Option("Steel 4140","steel_4140");
            break;
        }

    return true;
}