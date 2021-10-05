var ic_block_atas_1 = [
    -0.37, 0.08,
    -0.4, -0.08,
    0.4, -0.08,

    -0.37, 0.08,
    0.4, -0.08,
    0.37, 0.08
];


var ic_block_samping_1 = [
    -0.4, -0.08,
    -0.385, -0.10,
    0.4, -0.10,

    -0.4, -0.08,
    0.385, -0.10,
    0.4, -0.08
];

var kaki_pin = [
    -0.02, -0.10,
    -0.02, -0.14,
    0.0, -0.14,

    -0.015, -0.14,
    -0.0125, -0.18,
    -0.0075, -0.18,

    -0.015, -0.14,
    -0.0075, -0.18,
    -0.005, -0.14,

    -0.02, -0.10,
    0.0, -0.14,
    0.0, -0.10

];

for (var i = 0; i < kaki_pin.length; i+=2){
    kaki_pin[i] += 0.01;
}

var ic_pins_1 = [];
ic_pins_1 = ic_pins_1.concat(kaki_pin);

for (var q = 1; q < 12; q++){
    for (var i = 0; i < kaki_pin.length; i+=2){
        ic_pins_1.push(kaki_pin[i] + 0.033 * q);
        ic_pins_1.push(kaki_pin[i+1]);
    }
}

for (var q = -1; q > -12; q--){
    for (var i = 0; i < kaki_pin.length; i+=2){
        ic_pins_1.push(kaki_pin[i] + 0.033 * q);
        ic_pins_1.push(kaki_pin[i+1]);
    }
}
//

var circle1_1 = []

var r = 0.025;
for (i = 0; i <= 360; i++){
    circle1_1.push(0);
    circle1_1.push(0);
    circle1_1.push(r*Math.cos(i * 2 * Math.PI / 360));
    circle1_1.push(r*Math.sin(i * 2 * Math.PI / 360));

    circle1_1.push(r*Math.cos((i+1) * 2 * Math.PI / 360));
    circle1_1.push(r*Math.sin((i +1) * 2 * Math.PI / 360));
}


for (var i = 0; i < circle1_1.length; i+=2){
    circle1_1[i] += 0.3;
    // circle1_1[i+1] += 0.5;
}
var circle2_1 = [];

for (var i = 0; i < circle1_1.length; i+=2){
    circle2_1.push(circle1_1[i] - 0.6)
    circle2_1.push(circle1_1[i+1])
    // circle1_1[i+1] += 0.5;
}

circle1_1 = circle1_1.concat(circle2_1);

var circle3_1 = []

var r = 0.010;
for (i = 0; i <= 360; i++){
    circle3_1.push(0);
    circle3_1.push(0);
    circle3_1.push(r*Math.cos(i * 2 * Math.PI / 360));
    circle3_1.push(r*Math.sin(i * 2 * Math.PI / 360));

    circle3_1.push(r*Math.cos((i+1) * 2 * Math.PI / 360));
    circle3_1.push(r*Math.sin((i +1) * 2 * Math.PI / 360));
}

for (var i = 0; i < circle3_1.length; i+=2){
    circle3_1[i] += 0.34;
    circle3_1[i+1] += 0.057;
}

// console.log(kaki_pin2)

// ic_block_atas_1 = ic_block_atas_1.concat(ic_block_samping_1);
// ic_block_atas_1 = ic_block_atas_1.concat(ic_pins_1);
// ic_block_atas_1 = ic_block_atas_1.concat(circle1_1);

//Geser
for (var i = 0; i < ic_pins_1.length; i+=2){
    ic_pins_1[i+1] += 0.01;
}


var ic_block_atas_2 = [
    -0.05, 0.28,
    -0.08, -0.28,
    0.08,-0.28,

    -0.05, 0.28,
    0.08,-0.28,
    0.05,0.28
];

var ic_block_samping_2 = [
    -0.08, -0.28,
    -0.073, -0.295,
    0.073,-0.295,

    -0.08, -0.28,
    0.073,-0.295,
    0.08,-0.28
];

function persamaanLinier(y){
    var x = 0.0;
    x = (0.03 * y - 0.0364) / -0.56;
    return x;
}

var ic_pins_kanan_2 =[];

var dist_antar_pin = 0.0293;
var lebar_pin = 0.01;
for (i = 0; i < 19; i++){
    ic_pins_kanan_2.push(persamaanLinier( i * dist_antar_pin - 0.26 ));
    ic_pins_kanan_2.push( i * dist_antar_pin - 0.26 );
    ic_pins_kanan_2.push(persamaanLinier( i * dist_antar_pin - 0.28 ));
    ic_pins_kanan_2.push(( i * dist_antar_pin - 0.28 ));
    ic_pins_kanan_2.push(persamaanLinier( i * dist_antar_pin - 0.28 ) + lebar_pin);
    ic_pins_kanan_2.push(( i * dist_antar_pin - 0.28 ));

    ic_pins_kanan_2.push(persamaanLinier( i * dist_antar_pin - 0.26 ));
    ic_pins_kanan_2.push( i * dist_antar_pin - 0.26 );
    ic_pins_kanan_2.push(persamaanLinier( i * dist_antar_pin - 0.28 ) + lebar_pin);
    ic_pins_kanan_2.push(( i * dist_antar_pin - 0.28 ));
    ic_pins_kanan_2.push(persamaanLinier( i * dist_antar_pin - 0.26 ) + lebar_pin);
    ic_pins_kanan_2.push( i * dist_antar_pin - 0.26 );
}

var ic_pins_kiri_2 = [];

for (var i = 0; i < ic_pins_kanan_2.length; i+=2){
    ic_pins_kiri_2.push(ic_pins_kanan_2[i] * -1);
    ic_pins_kiri_2.push(ic_pins_kanan_2[i+1]);
}

var circle1_2 = []

var r = 0.018;
for (i = 0; i <= 360; i++){
    circle1_2.push(0);
    circle1_2.push(0);
    circle1_2.push(r*Math.cos(i * 2 * Math.PI / 360));
    circle1_2.push(r*Math.sin(i * 2 * Math.PI / 360));

    circle1_2.push(r*Math.cos((i+1) * 2 * Math.PI / 360));
    circle1_2.push(r*Math.sin((i +1) * 2 * Math.PI / 360));
}


for (var i = 0; i < circle1_2.length; i+=2){
    // circle1_2[i] += 0.3;
    circle1_2[i+1] += 0.215;
}

var circle2_2 = [];

for (var i = 0; i < circle1_2.length; i+=2){
    circle2_2.push(circle1_2[i])
    circle2_2.push(circle1_2[i+1] - 0.42)
    // circle1_1[i+1] += 0.5;
}

circle1_2 = circle1_2.concat(circle2_2);

var circle3_2 = []

var r = 0.012;
for (i = 0; i <= 360; i++){
    circle3_2.push(0);
    circle3_2.push(0);
    circle3_2.push(r*Math.cos(i * 2 * Math.PI / 360));
    circle3_2.push(r*Math.sin(i * 2 * Math.PI / 360));

    circle3_2.push(r*Math.cos((i+1) * 2 * Math.PI / 360));
    circle3_2.push(r*Math.sin((i +1) * 2 * Math.PI / 360));
}

for (var i = 0; i < circle3_2.length; i+=2){
    circle3_2[i] += 0.04;
    circle3_2[i+1] -= 0.25;
}


// ic_block_atas_2 = ic_block_atas_2.concat(ic_block_samping_2)
// ic_block_atas_2 = ic_block_atas_2.concat(ic_pins_kanan_2)
// ic_block_atas_2 = ic_block_atas_2.concat(ic_pins_kiri_2)

// //Geser objek kanan
// for (var i = 0; i < ic_block_atas_1.length; i+=2){
//     ic_block_atas_2[i] += 0.5;
// }