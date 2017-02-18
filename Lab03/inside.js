onmessage = function(e){

	function area(x1, y1, x2, y2, x3, y3){
   		return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
   	}
	
	function isInside(x1, y1, x2, y2, x3, y3, x, y){
		var A = area (x1, y1, x2, y2, x3, y3);
   		var A1 = area (x, y, x2, y2, x3, y3);
	   	var A2 = area (x1, y1, x, y, x3, y3);
   		var A3 = area (x1, y1, x2, y2, x, y);
	   	return A == (A1 + A2 + A3); 
	}

	postMessage([isInside(500,500,750,250,1000,500,e.data[0],e.data[1]) && 
				 isInside(500,500,750,250,1000,500,e.data[2],e.data[3])]);
	close();
}