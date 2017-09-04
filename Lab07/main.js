window.onload = function() {
	var canvas = document.getElementById("canvas"),
		ct = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,   
		height = canvas.height = window.innerHeight;

	function drawInstance(){
		this.divisor = this.divisor + 1 || 45;
		this.depth = this.depth - 1 || 15;
		ct.clearRect(0, 0, width, height);
		for(var i=0;i<20;++i){
			
			drawGear(ct, width/2, height/2, 400-i*20, this.depth, Math.PI/this.divisor);
			
			// for space filling curve
			// drawGear(ct, width/2, height/2, 400-i*15, 15, Math.PI/this.divisor);

			// for a more relaxed animation
			// drawGear(ct, width/2, height/2, 400-i*20, 15, Math.PI/this.divisor);

		}
	}	
	window.setInterval(drawInstance, 50);
};

function drawGear(ct, x, y, r, dx, dtheta) {
	var r2 = r + dx;
	var mask = -1;
	var limit = 2*Math.PI;
	
	ct.beginPath();

	for(var theta=0;theta<=limit;theta+=dtheta){
		
		var _r = (r & mask) | (r2 & ~mask);
		var __r  = (r & ~mask) | (r2 & mask);

		ct.arc(x, y, _r, theta, theta+dtheta); 
		ct.lineTo(x + __r*Math.cos(theta+dtheta), y + __r*Math.sin(theta+dtheta)); 
		
		mask = ~mask;
	}
	
	ct.stroke();

}