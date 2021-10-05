function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.devareShader(shader);
}

var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('experimental-webgl');

var vertices = [
    ...ic_block_atas_1, ...ic_block_samping_1, ...ic_pins_1, ...circle1_1, ...circle3_1,
    ...ic_block_atas_2, ...ic_block_samping_2, ...ic_pins_kanan_2, ...ic_pins_kiri_2, ...circle1_2, ...circle3_2
];

var vertexShaderCode = `
	attribute vec2 a_position;
	attribute vec4 a_color;
	varying vec4 v_color;
	uniform mat4 u_matrix;
	void main() {
		gl_Position = u_matrix * vec4(a_position, 0, 1.65);
		v_color = a_color;
	}
`;
var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);


var fragmentShaderCode = `
	precision mediump float;
	varying vec4 v_color;
	void main() {
		gl_FragColor = v_color;
	}
`;
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

var coords = gl.getAttribLocation(shaderProgram, "a_position");
var colorLocation = gl.getAttribLocation(shaderProgram, "a_color");

var color = [];

for (var i = 0; i < ic_block_atas_1.length/2; i++) {
    var r = 0.15;
    var g = 0.15;
    var b = 0.15;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}
for (var i = 0; i < ic_block_samping_1.length/2; i++) {
    var r = 0.25;
    var g = 0.25;
    var b = 0.25;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}
for (var i = 0; i < ic_pins_1.length/2; i++) {
    var r = 0.6;
    var g = 0.6;
    var b = 0.6;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}

for (var i = 0; i < circle1_1.length/2; i++) {
    var r = 0.25;
    var g = 0.25;
    var b = 0.25;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}

for (var i = 0; i < circle3_1.length/2; i++) {
    var r = 0.33;
    var g = 0.33;
    var b = 0.33;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}

for (var i = 0; i < ic_block_atas_2.length/2; i++) {
    var r = 0.15;
    var g = 0.15;
    var b = 0.15;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}
for (var i = 0; i < ic_block_samping_2.length/2; i++) {
    var r = 0.25;
    var g = 0.25;
    var b = 0.25;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}
for (var i = 0; i < ic_pins_kanan_2.length/2; i++) {
    var r = 0.7;
    var g = 0.7;
    var b = 0.7;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}
for (var i = 0; i < ic_pins_kiri_2.length/2; i++) {
    var r = 0.7;
    var g = 0.7;
    var b = 0.7;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}

for (var i = 0; i < circle1_2.length/2; i++) {
    var r = 0.33;
    var g = 0.33;
    var b = 0.33;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}

for (var i = 0; i < circle3_2.length/2; i++) {
    var r = 0.43;
    var g = 0.43;
    var b = 0.43;
    color.push(r);
    color.push(g);
    color.push(b);
    color.push(1);
}



var colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(colorLocation);

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coords);

var positionY = 0;
var speed = 0.0005;
function drawScene() {
    positionY >= 0.8 ? speed = -speed : speed = speed;
    positionY <= -0.8 ? speed = -speed : speed = speed;
    positionY += speed;
    gl.useProgram(shaderProgram);
    const leftObject = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -0.4, 0.0, 0.0, 1.0,
    ]

    const rightObject = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.4, positionY, 0.0, 1.0,
    ]

    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const u_matrix = gl.getUniformLocation(shaderProgram, 'u_matrix');
    gl.uniformMatrix4fv(u_matrix, false, rightObject);

    gl.drawArrays(
        gl.TRIANGLES,
        (ic_block_atas_1.length + ic_block_samping_1.length + ic_pins_1.length + circle1_1.length + circle3_1.length)/2,
        (ic_block_atas_2.length + ic_block_samping_2.length + ic_pins_kanan_2.length + ic_pins_kiri_2.length + + circle1_2.length + circle3_2.length)/2
    );

    gl.uniformMatrix4fv(u_matrix, false, leftObject);
    gl.drawArrays(
        gl.TRIANGLES,
        0,
        (ic_block_atas_1.length + ic_block_samping_1.length + ic_pins_1.length + circle1_1.length + circle3_1.length)/2
    );
    requestAnimationFrame(drawScene);
}

drawScene();