let gateway = [["Zealot",1,0],["Sentry",1,1],["Stalker",1,1],["Adept",1,0],["High Templar",1,1],["Dark Templar",1,0],["Archon",1,1]];
let robotics = [["Warp Prism",0,0],["Immortal",1,0],["Colossus",1,0],["Disruptor",1,0]];
let stargate = [["Pheonix",0,1],["Oracle",1,1],["Void Ray",1,1],["Tempest",1,1],["Carrier",1,1],["Mothership",1,1]]; //observers, probes are always allowed

let barracks = [["Marine",1,1],["Reaper",1,0],["Marauder",1,0],["Ghost",1,1]]; //MULEs and SCVs always allowed
let factory = [["Hellion",1,0],["Widow Mine",1,1],["Cyclone",1,1],["Siege Tank",1,0],["Hellbat",1,0],["Thor",1,1]];
let starport = [["Viking",1,1],["Medivac",0,0],["Liberator",1,1],["Banshee",1,0],["Raven",0,0],["Battlecruiser",1,1]];

let hatchery = [["Zerglings",1,0],["Roaches",1,0],["Banelings",1,0],["Ravagers",1,0]]; //Queens, Drones, Overseers are always allowed
let lair = [["Hydralisks",1,1],["Infestors",0,0],["Swarm Hosts",1,0],["Mutalisks",1,1],["Corruptors",0,1]];
let hive = [["Lurkers",1,0],["Vipers",0,0],["Ultralisks",1,0],["Brood Lords",1,0]];

let r1, r2, r3;
let s1, s2, s3;
let name1, name2, name3;

function gen(){
    while(1){
        r1 = Math.floor(Math.random() * s1.length)
        r2 = Math.floor(Math.random() * s2.length)
        r3 = Math.floor(Math.random() * s3.length)
        // console.log(gateway, r1, gateway[r1])
        groundAtk = s1[r1][1]
         + s2[r2][1]
          + s3[r3][1];
        airAtk = s1[r1][2] + s2[r2][2] + s3[r3][2];
        if(groundAtk != 0 && airAtk != 0){
            break;
        }
    }
    document.getElementById("struct1").innerText = name1 + ": "+ s1[r1][0];
    document.getElementById("struct2").innerText = name2 + ": "+ s2[r2][0];
    document.getElementById("struct3").innerText = name3 + ": "+ s3[r3][0];

    document.getElementById("reroll_1").innerText = "Reroll "+ s1[r1][0];
    document.getElementById("reroll_2").innerText = "Reroll "+ s2[r2][0];
    document.getElementById("reroll_3").innerText = "Reroll "+ s3[r3][0];
}

function genProtoss(){
    s1 = gateway;
    s2 = robotics; 
    s3 = stargate;
    name1 = "Gateway"
    name2 = "Robotics"
    name3 = "Stargate"
    gen();
}

function genTerran(){
    s1 = barracks;
    s2 = factory; 
    s3 = starport;
    name1 = "Barracks"
    name2 = "Factory"
    name3 = "Starport"
    gen();
}

function genZerg(){
    s1 = hatchery;
    s2 = lair; 
    s3 = hive;
    name1 = "Hatchery"
    name2 = "Lair"
    name3 = "Hive"
    gen();
}

function reroll1(){
    while(1){
        r1 = Math.floor(Math.random() * s1.length)
        // console.log(gateway, r1, gateway[r1])
        groundAtk = s1[r1][1]
         + s2[r2][1]
          + s3[r3][1];
        airAtk = s1[r1][2] + s2[r2][2] + s3[r3][2];
        if(groundAtk != 0 && airAtk != 0){
            break;
        }
    }
    document.getElementById("struct1").innerText = name1 + ": "+ s1[r1][0];
    document.getElementById("reroll_1").innerText = "Reroll "+ s1[r1][0];
}

function reroll2(){
    while(1){
        r2 = Math.floor(Math.random() * s2.length)
        // console.log(gateway, r1, gateway[r1])
        groundAtk = s1[r1][1]
         + s2[r2][1]
          + s3[r3][1];
        airAtk = s1[r1][2] + s2[r2][2] + s3[r3][2];
        if(groundAtk != 0 && airAtk != 0){
            break;
        }
    }
    document.getElementById("struct2").innerText = name2 + ": "+ s2[r2][0];
    document.getElementById("reroll_2").innerText = "Reroll "+ s2[r2][0];
}

function reroll3(){
    while(1){
        r3 = Math.floor(Math.random() * s3.length)
        // console.log(gateway, r1, gateway[r1])
        groundAtk = s1[r1][1]
         + s2[r2][1]
          + s3[r3][1];
        airAtk = s1[r1][2] + s2[r2][2] + s3[r3][2];
        if(groundAtk != 0 && airAtk != 0){
            break;
        }
    }
    document.getElementById("struct3").innerText = name3 + ": "+ s3[r3][0];
    document.getElementById("reroll_3").innerText = "Reroll "+ s3[r3][0];
}