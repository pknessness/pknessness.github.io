function addVec(vectorA, vectorB){
    if(vectorA.length != 3) throw new Error('ADD Error: VectorA is not the right size');
    if(vectorB.length != 3) throw new Error('ADD Error: VectorB is not the right size');
    return [vectorA[0]+vectorB[0],vectorA[1]+vectorB[1],vectorA[2]+vectorB[2]];
}

function subVec(vectorA, vectorB){
    if(vectorA.length != 3) throw new Error('SUB Error: VectorA is not the right size');
    if(vectorB.length != 3) throw new Error(`SUB Error: VectorB ${vectorB} is not the right size`);
    return [vectorA[0]-vectorB[0],vectorA[1]-vectorB[1],vectorA[2]-vectorB[2]];
}

function multVec(vectorA, vectorB){
    if(vectorA.length != 3) throw new Error('MULT Error: VectorA is not the right size');
    if(vectorB.length != 3) throw new Error('MULT Error: VectorB is not the right size');
    return [vectorA[0]*vectorB[0],vectorA[1]*vectorB[1],vectorA[2]*vectorB[2]];
}

function invertVec(vectorA){
    if(vectorA.length != 3) throw new Error('INVERT Error: VectorA is not the right size');
    return [-vectorA[0],-vectorA[1],-vectorA[2]];
}

function absVec(vectorA){
    if(vectorA.length != 3) throw new Error(`ABS Error: VectorA ${vectorA} is not the right size`);
    return [Math.abs(vectorA[0]),Math.abs(vectorA[1]),Math.abs(vectorA[2])];
}

function norm(vectorA){
    if(vectorA.length != 3) throw new Error('NORM Error: VectorA is not the right size');
    var len = Math.sqrt(vectorA[0] ** 2 + vectorA[1] ** 2 + vectorA[2] ** 2);
    if(len == 0) throw new Error('NORM Error: VectorA is of zero length');
    // console.log(`len: ${len} [${vectorA}] (${vectorA[0] ** 2} ${vectorA[1] ** 2} ${vectorA[2] ** 2})`);
    return [vectorA[0]/len,vectorA[1]/len,vectorA[2]/len];
}

function dotVec(vectorA, vectorB){
    if(vectorA.length != 3) throw new Error('DOT Error: VectorA is not the right size');
    if(vectorB.length != 3) throw new Error('DOT Error: VectorB is not the right size');
    return (vectorA[0]*vectorB[0]) + (vectorA[1]*vectorB[1]) + (vectorA[2]*vectorB[2]);
}

function rotateYawVec(vectorA, angle){
    if(vectorA.length != 3) throw new Error('ROT YAW Error: VectorA is not the right size');

    var cs = Math.cos(angle * Math.PI/180);
    var sn = Math.sin(angle * Math.PI/180);

    return [vectorA[0]*cs - vectorA[2]*sn, vectorA[1], vectorA[0]*sn + vectorA[2]*cs];
}

function crossVec(vectorA, vectorB){
    if(vectorA.length != 3) throw new Error('CROSS Error: VectorA is not the right size');
    if(vectorB.length != 3) throw new Error('CROSS Error: VectorB is not the right size');
    return [
        vectorA[1]*vectorB[2] - vectorA[2]*vectorB[1],
        vectorA[2]*vectorB[0] - vectorA[0]*vectorB[2],
        vectorA[0]*vectorB[1] - vectorA[1]*vectorB[0]
    ]
}

function scaleVec(vectorA, scalar){
    if(vectorA.length != 3) throw new Error(`SCALE Error: VectorA ${vectorA} is not the right size`);
    return [vectorA[0]*scalar,vectorA[1]*scalar,vectorA[2]*scalar];
}

function magVec(vectorA){
    if(vectorA.length != 3) throw new Error(`MAG Error: VectorA ${vectorA} is not the right size`);
    var mag = Math.sqrt(vectorA[0]*vectorA[0] + vectorA[1]*vectorA[1] + vectorA[2]*vectorA[2]);
    return mag;
}