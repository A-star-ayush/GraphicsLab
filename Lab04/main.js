window.onload = function(){
	var canvas = document.getElementById("canvas"),
		ct = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var ind;  // index for the array "vertices"

	function drawWindow() {
		ct.clearRect(0,0,width,height);
		ct.beginPath();
		ct.moveTo(500,500);
		ct.lineTo(750,250);
		ct.lineTo(1000,500);
		ct.lineTo(500,500);
		ct.lineWidth = 3;
		ct.stroke();
		ct.lineWidth = 1;
		ind = 0;  // resetting the index to 0
	}

	drawWindow();

	canvas.onmousedown = storeVertex;
	document.onkeypress = clipPolygon;

	vertices = [];
	
	function storeVertex(e){
		vertices[ind] = { x: e.offsetX, y: e.offsetY }; 
		if(ind == 0) { drawWindow(); ct.beginPath(); ct.moveTo(vertices[0].x, vertices[0].y); }
		else { ct.lineTo(vertices[ind].x, vertices[ind].y); ct.stroke(); }
		++ind;
	}

	function clipPolygon(){
		drawWindow();

		for(var i=0; i<(vertices.length - 1); ++i)
			clipLine([vertices[i].x, vertices[i].y], [vertices[i+1].x, vertices[i+1].y]);
	
		vertices = []; // clearing array so that we don't remember anything from the previous run
	}

	function clipLine(p, q){
		var worker1 = new Worker("intersection.js");
		var worker2 = new Worker("intersection.js");
		var worker3 = new Worker("intersection.js");

		var worker4 = new Worker("inside.js");  // works to find if both points lie inside the traingle

		worker1.postMessage([p[0],p[1],q[0],q[1],500,500,750,250,0]);  // last arg - unique identifier
		worker2.postMessage([p[0],p[1],q[0],q[1],750,250,1000,500,1]);
		worker3.postMessage([p[0],p[1],q[0],q[1],1000,500,500,500,2]);

		worker4.postMessage([p[0],p[1],q[0],q[1]]);

		var poi_1 = null;  // poi - point of Intersection
		var poi_2 = null;
		var flag = false;

		worker1.onmessage = worker2.onmessage = worker3.onmessage = function(e) {
			if((e.data[0]<=1 && e.data[0]>=0) && (e.data[1]<=1 && e.data[1]>=0)){
				if(poi_1==null){
					poi_1 = new Array();
					poi_1[0] = Math.round(p[0] + e.data[0]*(q[0]-p[0]));
					poi_1[1] = Math.round(p[1] + e.data[0]*(q[1]-p[1]));
					poi_1[2] = e.data[2];

				}
				else{
					poi_2 = new Array();
					poi_2[0] = Math.round(p[0] + e.data[0]*(q[0]-p[0]));
					poi_2[1] = Math.round(p[1] + e.data[0]*(q[1]-p[1]));
				}
			}
		};

		worker4.onmessage = function(e) {
			flag = e.data[0];
		}

		setTimeout(performClipping, 400);  // giving some time for the workers to finish their work
											// more than what was needed in Lab03

		function performClipping(){ 
			if(poi_1 == null && poi_2 == null) { if(!flag) return; poi_1=[p[0],p[1]]; poi_2=[q[0],q[1]]; }
			else if(poi_2 == null) { 
				poi_2 = new Array();  // assiging poi_2 either p or q based on whether the line segment
				var mask = 0;			// ran from inside to outside or the other way around
				switch(poi_1[2]){
					case 0: mask = -(p[0]>q[0]); break;
					case 1: mask = -(p[0]<q[0]); break;
					case 2: mask = -(p[1]<q[1]); break;
				}
				poi_2[0] = q[0]^((p[0]^q[0]) & mask);
				poi_2[1] = q[1]^((p[1]^q[1]) & mask);
			} 

			ct.beginPath(); ct.moveTo(poi_1[0], poi_1[1]); ct.lineTo(poi_2[0],poi_2[1]); ct.stroke();
		}	
	}
}
