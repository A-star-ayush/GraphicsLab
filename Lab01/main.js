var ct;

window.onload = function() {

	var canvas = document.getElementById("canvas");
	ct = canvas.getContext("2d");
	var width = canvas.width = window.innerWidth;   
	var height = canvas.height = window.innerHeight;

	var sub = document.getElementById("input");
	sub.onsubmit = SierpinskiTriangle;
}

function SierpinskiTriangle(e){
	e.preventDefault();
	var input = document.getElementById("input");
	var p1 = input.p1.value.split(",");
	var p2 = input.p2.value.split(",");
	var p3 = input.p3.value.split(",");
	var d = input.depth.value;

	ct.clearRect(0, 0, window.innerWidth, window.innerHeight);
	
	for(var i=0;i<=1;++i){
		p1[i] = parseInt(p1[i], 10);
		p2[i] = parseInt(p2[i], 10);
		p3[i] = parseInt(p3[i], 10);
	}
	
	drawTriangle(ct, p1, p2, p3, 0, d);
}

function drawTriangle(ct, p1, p2, p3, depth, maxDepth){
	if(depth == maxDepth) return;
	
	ct.beginPath();
	ct.moveTo(p1[0], p1[1]);
	ct.lineTo(p2[0], p2[1]);
	ct.lineTo(p3[0], p3[1]);
	ct.lineTo(p1[0], p1[1]);
	ct.stroke();

	var q1 = [];
	var q2 = [];
	var q3 = [];

	q1[0] = (p1[0] + p2[0])>>1;
	q1[1] = (p1[1] + p2[1])>>1;
	q2[0] = (p2[0] + p3[0])>>1;
	q2[1] = (p2[1] + p3[1])>>1;
	q3[0] = (p3[0] + p1[0])>>1;
	q3[1] = (p3[1] + p1[1])>>1;
		
	ct.beginPath();
	ct.moveTo(q1[0], q1[1]);
	ct.lineTo(q2[0], q2[1]);
	ct.lineTo(q3[0], q3[1]);
	ct.lineTo(q1[0], q1[1]);
	ct.fill();

	drawTriangle(ct, p1, q1, q3, depth+1, maxDepth);
	drawTriangle(ct, q1, p2, q2, depth+1, maxDepth);
	drawTriangle(ct, q3, q2, p3, depth+1, maxDepth);

}


	/*
	var p1 = { x:500, y:500 };
	var p2 = { x:900, y:100 };
	var p3 = { x:1300, y:500 };
*/