"user strict";

function createShader(gl, type, source){
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if(success) { return shader; }

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

function createProgram(gl, vshader, fshader){
	var program = gl.createProgram();
	gl.attachShader(program, vshader);
	gl.attachShader(program, fshader);
  	gl.linkProgram(program);
	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if(success) { return program; }

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);

}


function start(){

	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	if(!gl){
		alert("webgl not supported");
		return;
	}

	var vsource = document.getElementById("vertexSource").text;
	var fsource = document.getElementById("fragmentSource").text;

	var vshader = createShader(gl, gl.VERTEX_SHADER, vsource);
	var fshader = createShader(gl, gl.FRAGMENT_SHADER, fsource);

	var program = createProgram(gl, vshader, fshader);

	
	gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
	gl.clearColor(0,0,0,1);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.useProgram(program);

	var posBuffer = gl.createBuffer();

	var a_position_loc = gl.getAttribLocation(program, "a_position");
	var u_resolution_loc = gl.getUniformLocation(program, "u_resolution");
	var color_loc = gl.getUniformLocation(program, "color");

	gl.uniform2f(u_resolution_loc, gl.canvas.width, gl.canvas.height);
	gl.enableVertexAttribArray(a_position_loc);
	gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
	gl.vertexAttribPointer(a_position_loc, 2, gl.FLOAT, false, 0, 0);

	function randInt(limit) { return Math.floor(Math.random()*limit); }
	function setRect(gl, x, y, w, h) { gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		x,y, x+w,y, x,y+h, x,y+h, x+w,y, x+w,y+h 
		]), gl.STATIC_DRAW); }

	setInterval(draw, 1000);
	function draw(){
		gl.clear(gl.COLOR_BUFFER_BIT);
		for(var i=0;i<50;++i){
			setRect(gl, 100 + randInt(1500), 100 + randInt(300), randInt(100), randInt(400));
			gl.uniform4f(color_loc, Math.random(), Math.random(), Math.random(), 1);
			gl.drawArrays(gl.TRIANGLES, 0, 6);   // two traingles make a rectangle
		}
	}
}