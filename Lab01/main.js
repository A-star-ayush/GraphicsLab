var ct;

var color = ["white", "red","#E87F21","#FBD949","black"];

window.onload = function() {

	var canvas = document.getElementById("canvas");
	ct = canvas.getContext("2d");
	var width = canvas.width = window.innerWidth;   
	var height = canvas.height = window.innerHeight;  // have the canvas fill the entire space

	var sub = document.getElementById("input");
	sub.onsubmit = SierpinskiTriangle; 	// registering event handler for form submission
}

function SierpinskiTriangle(e){
	e.preventDefault();
	var input = document.getElementById("input");
	var p1 = input.p1.value.split(",");  // x,y gets split into x and y
	var p2 = input.p2.value.split(",");
	var p3 = input.p3.value.split(",");
	var d = input.depth.value;

	ct.clearRect(0, 0, window.innerWidth, window.innerHeight);
	
	for(var i=0;i<=1;++i){
		p1[i] = parseInt(p1[i], 10);  // to convert user input from string to integer
		p2[i] = parseInt(p2[i], 10);
		p3[i] = parseInt(p3[i], 10);
	}
	
	drawTriangle(ct, p1, p2, p3, 0, d, 0);
}

function drawTriangle(ct, p1, p2, p3, depth, maxDepth, id){
	if(depth == maxDepth) return;
	
	ct.beginPath();  // mark the starting of the path
	ct.moveTo(p1[0], p1[1]);  // index [0] is the x co-ordinate and [1] is the y co-ordinate
	ct.lineTo(p2[0], p2[1]);  // .lineTo(x,y)
	ct.lineTo(p3[0], p3[1]);
	ct.lineTo(p1[0], p1[1]);
	ct.stroke();

	var q1 = [];
	var q2 = [];
	var q3 = [];

	q1[0] = (p1[0] + p2[0])>>1;  // >>1 is equivalent to divide by 2 but is much faster and efficient
	q1[1] = (p1[1] + p2[1])>>1;  // here we are basically computing pair-wise mid points
	q2[0] = (p2[0] + p3[0])>>1;
	q2[1] = (p2[1] + p3[1])>>1;
	q3[0] = (p3[0] + p1[0])>>1;
	q3[1] = (p3[1] + p1[1])>>1;
		
	ct.beginPath();
	ct.moveTo(q1[0], q1[1]);
	ct.lineTo(q2[0], q2[1]);
	ct.lineTo(q3[0], q3[1]);
	ct.lineTo(q1[0], q1[1]);
	ct.fillStyle = color[id];
	ct.fill();  // Note the style is fill and not stroke

	drawTriangle(ct, p1, q1, q3, depth+1, maxDepth, 1);
	drawTriangle(ct, q1, p2, q2, depth+1, maxDepth, 2);
	drawTriangle(ct, q3, q2, p3, depth+1, maxDepth, 3);

}

/*  Sample values
	var p1 = { x:500, y:500 };
	var p2 = { x:900, y:100 };
	var p3 = { x:1300, y:500 };
*/