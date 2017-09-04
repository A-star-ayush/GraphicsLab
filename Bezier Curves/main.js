window.onload = function(){

	var canvas = document.getElementById("canvas");
	var ct = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	var cp = [];  // 'cp' = control points

	canvas.onmousedown = updatePoints;
	document.onkeypress = drawCurve;
	
	var index;
	var coeff = [[1,0,0,0],[-3,3,0,0],[3,-6,3,0],[-1,3,-3,1]];


	function updatePoints(e){
		updatePoints.count = ++updatePoints.count || 0;
		
		if(updatePoints.count>=4){   // user tried to supply more than 4 points - possibly a drag operation
			index = identityDrag(e.offsetX, e.offsetY);
			canvas.onmouseup = releaseDrag;
			canvas.onmousemove = performDrag;
		}
		
		else {   	// yet to obtain the 4 points necessary to draw the curve
			cp[updatePoints.count] = [ e.offsetX, e.offsetY ];
			ct.beginPath();
			ct.arc(e.offsetX, e.offsetY, 7, 0, 2*Math.PI);
			ct.fill();
		}
	}

	function identityDrag(x, y){
		var min = (x-cp[0][0])*(x-cp[0][0]) + (y-cp[0][1])*(y-cp[0][1]);
		var minIndex = 0;
		for(var i=1;i<4;++i){
			var dist = (x-cp[i][0])*(x-cp[i][0]) + (y-cp[i][1])*(y-cp[i][1]);
			if(dist < min){
				min = dist;
				minIndex = i;
			}
		}
		return minIndex;
	}

	function performDrag(e){
		canvas.onmousemove = null;
		ct.clearRect(0,0,canvas.width, canvas.height);
		cp[index][0] = e.offsetX;
		cp[index][1] = e.offsetY;
		
		for(var i=0;i<4;++i){
			ct.beginPath();
			ct.arc(cp[i][0], cp[i][1], 7, 0, 2*Math.PI);
			ct.fill();
		}

		drawCurve();
		canvas.onmousemove = performDrag;
	}

	function releaseDrag(){
		canvas.onmousemove = null;
	}

	function drawCurve(){
		var vec_x = [0,0,0,0];
		var vec_y = [0,0,0,0];
		for(var i=0;i<4;++i){
			for(var j=0;j<4;++j){
				vec_x[i] += (coeff[i][j]*cp[j][0]);
				vec_y[i] += (coeff[i][j]*cp[j][1]); 
			}
		}
		for(var t=0;t<=1;t=t+0.005){
			var x = 1*vec_x[0] + t*vec_x[1] + t*t*vec_x[2] + t*t*t*vec_x[3];
			var y = 1*vec_y[0] + t*vec_y[1] + t*t*vec_y[2] + t*t*t*vec_y[3];

			ct.fillRect(x,y,3,3);
		}
	}
};