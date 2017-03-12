onmessage = function(e) {
	var x1 = e.data[0];
	var y1 = e.data[1];
	var x2 = e.data[2];
	var y2 = e.data[3];
	var x3 = e.data[4];
	var y3 = e.data[5];
	var x4 = e.data[6];
	var y4 = e.data[7];

	var deter  = ((x4-x3)*(y2-y1)) - ((x2-x1)*(y4-y3));
	if(deter == 0) {
		postMessage([-1,-1]);
		close();
	}

	var s = (((x4-x3)*(y3-y1)) - ((x3-x1)*(y4-y3)))/deter;
	var t = (((x2-x1)*(y3-y1)) - ((x3-x1)*(y2-y1)))/deter;
	
	postMessage([s,t,e.data[8]]);  // sending the unique identifier alongside

	close();
}