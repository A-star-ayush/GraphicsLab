"use strict";

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

function Program(gl, vid, fid, shaderFunc, programFunc){
	var vsource = document.getElementById(vid).text;
	var fsource = document.getElementById(fid).text;

	var vshader = shaderFunc(gl, gl.VERTEX_SHADER, vsource);
	var fshader = shaderFunc(gl, gl.FRAGMENT_SHADER, fsource);

	var program = programFunc(gl, vshader, fshader);
	return program;
}


function start(){
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	if(!gl){
		alert("WebGL not supported!");
		return ;
	}

	var program = Program(gl, "vertexSource", "fragmentSource", createShader, createProgram);
	
	var pbuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, pbuf);
	setTraingle3D(gl);
	
	var cbuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cbuf);
	setColor(gl);
	
	gl.useProgram(program);

	gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
	gl.clearColor(0,0,0,0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST); 

	var a_position_loc = gl.getAttribLocation(program, "a_position");
	var a_color_loc = gl.getAttribLocation(program, "a_color");
	var u_matrix_loc = gl.getUniformLocation(program, "u_matrix");

	gl.enableVertexAttribArray(a_position_loc);
	gl.bindBuffer(gl.ARRAY_BUFFER, pbuf);
	gl.vertexAttribPointer(a_position_loc, 3, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(a_color_loc);
	gl.bindBuffer(gl.ARRAY_BUFFER, cbuf);
	gl.vertexAttribPointer(a_color_loc, 3, gl.UNSIGNED_BYTE, true, 0, 0);

	// Orthographic 'F'
	var matrix1 = m4.ortho_top();
	matrix1 = m4.multiply(matrix1, m4.projection(gl.canvas.width, gl.canvas.height, 400));
	matrix1 = m4.multiply(matrix1, m4.translation(100, 200,0));
	gl.uniformMatrix4fv(u_matrix_loc, false, m4.transpose(matrix1));
	gl.drawArrays(gl.TRIANGLES, 0, 96);

	// 1-point perspective projection
	var matrix2 = m4.perspective(0, 0, 0.2);
	matrix2 = m4.multiply(matrix2, m4.projection(gl.canvas.width, gl.canvas.height, 400));
	matrix2 = m4.multiply(matrix2, m4.translation(300, 300,0));
	gl.uniformMatrix4fv(u_matrix_loc, false, m4.transpose(matrix2));
	gl.drawArrays(gl.TRIANGLES, 0, 96);

	// 2-point perspective projection
	var matrix3 = m4.perspective(0, 0.2, 0.2);
	matrix3 = m4.multiply(matrix3, m4.projection(gl.canvas.width, gl.canvas.height, 400));
	matrix3 = m4.multiply(matrix3, m4.translation(500, 400,0));
	gl.uniformMatrix4fv(u_matrix_loc, false, m4.transpose(matrix3));
	gl.drawArrays(gl.TRIANGLES, 0, 96);

	// 3-point perspective projection
	var matrix4 = m4.perspective(0.2, 0.2, 0.2);
	matrix4 = m4.multiply(matrix4, m4.projection(gl.canvas.width, gl.canvas.height, 400));
	matrix4 = m4.multiply(matrix4, m4.translation(700, 500,0));
	gl.uniformMatrix4fv(u_matrix_loc, false, m4.transpose(matrix4));
	gl.drawArrays(gl.TRIANGLES, 0, 96);

	// isometic projection
	var matrix5 = m4.isometric();
	matrix5 = m4.multiply(matrix5, m4.projection(gl.canvas.width, gl.canvas.height, 400));
	matrix5 = m4.multiply(matrix5, m4.translation(900, 400,0));
	gl.uniformMatrix4fv(u_matrix_loc, false, m4.transpose(matrix5));
	gl.drawArrays(gl.TRIANGLES, 0, 96);

	// cavalier projection
	var matrix6 = m4.cavalier(0.5, 45.0*Math.PI/180.0);
	matrix6 = m4.multiply(matrix6, m4.projection(gl.canvas.width, gl.canvas.height, 400));
	matrix6 = m4.multiply(matrix6, m4.translation(1100, 300,0));
	gl.uniformMatrix4fv(u_matrix_loc, false, m4.transpose(matrix6));
	gl.drawArrays(gl.TRIANGLES, 0, 96);

	// cabinet projection
	var matrix7 = m4.cabinet(0.5, 45.0*Math.PI/180.0);
	matrix7 = m4.multiply(matrix7, m4.projection(gl.canvas.width, gl.canvas.height, 400));
	matrix7 = m4.multiply(matrix7, m4.translation(1400, 200,0));
	gl.uniformMatrix4fv(u_matrix_loc, false, m4.transpose(matrix7));
	gl.drawArrays(gl.TRIANGLES, 0, 96);
}

var m4 = {  // Demorgan's Law: (a*b)' = b'*a' where ' is transpose or inverse
      translation: function(tx, ty, tz) {
        return [
           1,  0,  0,  tx,
           0,  1,  0,  ty,
           0,  0,  1,  tz,
           0, 0, 0, 1
        ];
      },
     
      xRotation: function(angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
     	
     	return [
     		1, 0, 0, 0,
     		0, c, -s, 0,
     		0, s, c, 0,
     		0, 0, 0, 1
     	];
      },
     
      yRotation: function(angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
     	
     	return [
     		c, 0, -s, 0,
     		0, 1, 0, 0,
     		s, 0, c, 0,
     		0, 0, 0, 1
     	];
      },
     
      zRotation: function(angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
     	
     	return [ 
     		c, -s, 0, 0,
     		s, c, 0, 0,
     		0, 0, 1, 0,
     		0, 0, 0, 1 
     	];
      },
     
      scaling: function(sx, sy, sz) {
        return [
          sx, 0,  0,  0,
          0, sy,  0,  0,
          0,  0, sz,  0,
          0,  0,  0,  1
        ];
      },

      ortho: function(l, r, b, t, n, f){
      	return [
      	    2/(r-l), 0, 0, (l+r)/(l-r),
      	    0, -2/(t-b), 0, -(b+t)/(b-t),
      	    0, 0, -2/(n-f), -(n+f)/(n-f),
      	    0, 0, 0, 1
      	];
      },

      projection: function(w, h, d){
      	return [
      		2/w, 0, 0, -1,
      		0, -2/h, 0, 1,
      		0, 0, 2/d, 0,
      		0, 0, 0, 1
      	];
	  },

	  perspective: function(a1, a2, a3){
	  	return [
	  	  1, 0, 0, 0,
	  	  0, 1, 0, 0,
	  	  0, 0, 1, 0,
	  	  a1, a2, a3, 1,
	  	];
	  },

	  ortho_top: function(){
	  	return [
	  		1, 0, 0, 0,
	  		0, 1, 0, 0,
	  		0, 0, 0, 0,
	  		0, 0, 0, 1,
	  	];
	  },

	  isometric: function(){
	  	return m4.multiply(
	  		m4.ortho_top(),
	  		m4.multiply(m4.xRotation(35.264*Math.PI/180.0), m4.yRotation(45.0*Math.PI/180.0)));
	  },

	  cavalier: function(lambda, alpha) {
	  	return [
	  		1, 0, lambda*Math.cos(alpha), 0,
	  		0, 1, lambda*Math.sin(alpha), 0,
	  		0, 0, 0,0,
	  		0, 0, 0, 1
	  	];
	  },
      
      cabinet: function(lambda, alpha) {
	  	return [
	  		1, 0, 0.5*lambda*Math.cos(alpha), 0,
	  		0, 1, 0.5*lambda*Math.sin(alpha), 0,
	  		0, 0, 0,0,
	  		0, 0, 0, 1
	  	];
	  },

      multiply: function(a, b) {
    	var a00 = a[0*4 + 0];
    	var a01 = a[0*4 + 1];
    	var a02 = a[0*4 + 2];
    	var a03 = a[0*4 + 3];
    	var a10 = a[1*4 + 0];
    	var a11 = a[1*4 + 1];
    	var a12 = a[1*4 + 2];
    	var a13 = a[1*4 + 3];
    	var a20 = a[2*4 + 0];
    	var a21 = a[2*4 + 1];
    	var a22 = a[2*4 + 2];
    	var a23 = a[2*4 + 3];
    	var a30 = a[3*4 + 0];
    	var a31 = a[3*4 + 1];
    	var a32 = a[3*4 + 2];
    	var a33 = a[3*4 + 3];
    	var b00 = b[0*4 + 0];
    	var b01 = b[0*4 + 1];
    	var b02 = b[0*4 + 2];
    	var b03 = b[0*4 + 3];
    	var b10 = b[1*4 + 0];
    	var b11 = b[1*4 + 1];
    	var b12 = b[1*4 + 2];
    	var b13 = b[1*4 + 3];
    	var b20 = b[2*4 + 0];
    	var b21 = b[2*4 + 1];
    	var b22 = b[2*4 + 2];
    	var b23 = b[2*4 + 3];
    	var b30 = b[3*4 + 0];
    	var b31 = b[3*4 + 1];
    	var b32 = b[3*4 + 2];
    	var b33 = b[3*4 + 3];
    	return [
      		a00*b00 + a01*b10 + a02*b20 + a03*b30,
      		a00*b01 + a01*b11 + a02*b21 + a03*b31,
      		a00*b02 + a01*b12 + a02*b22 + a03*b32,
      		a00*b03 + a01*b13 + a02*b23 + a03*b33,
      		a10*b00 + a11*b10 + a12*b20 + a13*b30,
      		a10*b01 + a11*b11 + a12*b21 + a13*b31,
      		a10*b02 + a11*b12 + a12*b22 + a13*b32,
      		a10*b03 + a11*b13 + a12*b23 + a13*b33,
      		a20*b00 + a21*b10 + a22*b20 + a23*b30,
      		a20*b01 + a21*b11 + a22*b21 + a23*b31,
      		a20*b02 + a21*b12 + a22*b22 + a23*b32,
      		a20*b03 + a21*b13 + a22*b23 + a23*b33,
      		a30*b00 + a31*b10 + a32*b20 + a33*b30,
      		a30*b01 + a31*b11 + a32*b21 + a33*b31,
      		a30*b02 + a31*b12 + a32*b22 + a33*b32,
      		a30*b03 + a31*b13 + a32*b23 + a33*b33,
    	];
  	},

  	transpose: function(a) {
  		var a00 = a[0*4 + 0];
    	var a01 = a[0*4 + 1];
    	var a02 = a[0*4 + 2];
    	var a03 = a[0*4 + 3];
    	var a10 = a[1*4 + 0];
    	var a11 = a[1*4 + 1];
    	var a12 = a[1*4 + 2];
    	var a13 = a[1*4 + 3];
    	var a20 = a[2*4 + 0];
    	var a21 = a[2*4 + 1];
    	var a22 = a[2*4 + 2];
    	var a23 = a[2*4 + 3];
    	var a30 = a[3*4 + 0];
    	var a31 = a[3*4 + 1];
    	var a32 = a[3*4 + 2];
    	var a33 = a[3*4 + 3];

    	return [
    		a00,a10,a20,a30,
    		a01,a11,a21,a31,
    		a02,a12,a22,a32,
    		a03,a13,a23,a33,
    	];
  	},
  };

function setColor(gl){
	gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([
		  // left column front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          // top rung front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          // middle rung front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          // left column back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

          // top rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

          // middle rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

          // top
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,

          // top rung right
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,

          // under top rung
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,

          // between top rung and middle
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,

          // top of middle rung
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,

          // right of middle rung
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,

          // bottom of middle rung.
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,

          // right of bottom
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,

          // bottom
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,

          // left side
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220

		]), gl.STATIC_DRAW);
}
function setTraingle3D(gl){
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		 // left column front
          0,   0,  0,
          0, 150,  0,
          30,   0,  0,
          0, 150,  0,
          30, 150,  0,
          30,   0,  0,

          // top rung front
          30,   0,  0,
          30,  30,  0,
          100,   0,  0,
          30,  30,  0,
          100,  30,  0,
          100,   0,  0,

          // middle rung front
          30,  60,  0,
          30,  90,  0,
          67,  60,  0,
          30,  90,  0,
          67,  90,  0,
          67,  60,  0,

          // left column back
            0,   0,  30,
           30,   0,  30,
            0, 150,  30,
            0, 150,  30,
           30,   0,  30,
           30, 150,  30,

          // top rung back
           30,   0,  30,
          100,   0,  30,
           30,  30,  30,
           30,  30,  30,
          100,   0,  30,
          100,  30,  30,

          // middle rung back
           30,  60,  30,
           67,  60,  30,
           30,  90,  30,
           30,  90,  30,
           67,  60,  30,
           67,  90,  30,

          // top
            0,   0,   0,
          100,   0,   0,
          100,   0,  30,
            0,   0,   0,
          100,   0,  30,
            0,   0,  30,

          // top rung right
          100,   0,   0,
          100,  30,   0,
          100,  30,  30,
          100,   0,   0,
          100,  30,  30,
          100,   0,  30,

          // under top rung
          30,   30,   0,
          30,   30,  30,
          100,  30,  30,
          30,   30,   0,
          100,  30,  30,
          100,  30,   0,

          // between top rung and middle
          30,   30,   0,
          30,   60,  30,
          30,   30,  30,
          30,   30,   0,
          30,   60,   0,
          30,   60,  30,

          // top of middle rung
          30,   60,   0,
          67,   60,  30,
          30,   60,  30,
          30,   60,   0,
          67,   60,   0,
          67,   60,  30,

          // right of middle rung
          67,   60,   0,
          67,   90,  30,
          67,   60,  30,
          67,   60,   0,
          67,   90,   0,
          67,   90,  30,

          // bottom of middle rung.
          30,   90,   0,
          30,   90,  30,
          67,   90,  30,
          30,   90,   0,
          67,   90,  30,
          67,   90,   0,

          // right of bottom
          30,   90,   0,
          30,  150,  30,
          30,   90,  30,
          30,   90,   0,
          30,  150,   0,
          30,  150,  30,

          // bottom
          0,   150,   0,
          0,   150,  30,
          30,  150,  30,
          0,   150,   0,
          30,  150,  30,
          30,  150,   0,

          // left side
          0,   0,   0,
          0,   0,  30,
          0, 150,  30,
          0,   0,   0,
          0, 150,  30,
          0, 150,   0

		]), gl.STATIC_DRAW);
}

