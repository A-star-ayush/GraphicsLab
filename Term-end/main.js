window.onload = function() {
	var canvas = document.getElementById("canvas"),
		ct = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,   
		height = canvas.height = window.innerHeight;

		var rr = 100.0;
		var r = 0.0;

		function draw(a, b, rot) {
			ct.setTransform(1, 0, 0, 1, 0, 0);
			ct.translate(a, b);
			ct.rotate(180.0*Math.PI/rot);
			ct.scale(1,-1);
		
			r = rr;
			var ymax, x, y, xp, yp, d;
			ymax = r/Math.sqrt(2);
			x = r;
			d = r*r - ((r - 0.5)*(r- 0.5));
			xp = r;
			yp = -1;

			for(y=0;y<=ymax;++y){
				fill8(x, y);
				if(d > 0){
					--x;
					d += (2*yp - 2*xp + 3);
				}
				else {
					d += (2*yp + 1);
				}
				yp = y;
				xp = x;
			}
		}

		function fill8(x, y){
			ct.fillRect(x, y, 1, 1);
			ct.fillRect(y, x, 1, 1);
			ct.fillRect(-x, y, 1, 1);
			ct.fillRect(-y, x, 1, 1);
			ct.fillRect(x, -y, 1, 1);
			ct.fillRect(y, -x, 1, 1);
			ct.translate(-r, -r);
			ct.fillRect(x, y, 1, 1);
			ct.fillRect(y, x, 1, 1);
			ct.translate(r, r);
		}

		var dtheta = 360.0/5.0;
		var theta = 0.0;
		var x; var y;
		
		var _r = Math.sqrt(2)*rr;

		draw(width/2.0 + _r, height/4.0, theta);
		theta += dtheta;
	
		ct.fillStyle='red';		
		draw(width/2.0 + _r*Math.cos(180.0*Math.PI/theta) + 140, height/4.0 + _r*Math.sin(180.0*Math.PI/theta) + 58, theta);
		theta += dtheta;
		

		ct.fillStyle='blue';		

		draw(width/2.0 + _r*Math.cos(180.0*Math.PI/theta) + 44, height/4.0 + _r*Math.sin(180.0*Math.PI/theta) + 96, theta - 24.2);
		theta += dtheta;

		ct.fillStyle='green';		

		draw(width/2.0 + _r*Math.cos(180.0*Math.PI/theta) + 63, height/4.0 + _r*Math.sin(180.0*Math.PI/theta) + 121, theta - 40);
		theta += dtheta;

}

