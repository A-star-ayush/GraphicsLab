window.onload = function(){
	var c1 = document.getElementById("canvas1");
	var c2 = document.getElementById("canvas2");
	var c3 = document.getElementById("canvas3");

	c1.style.position = "absolute";
	c1.width = window.innerWidth;
	c1.height = 0.35*window.innerHeight;
	c1.style.top = "0";
	c1.style.left = "0";

	c2.style.position = "absolute";
	c2.width = window.innerWidth;
	c2.height = 0.40*window.innerHeight;
	c2.style.top = 0.35*window.innerHeight + "px";
	c2.style.left = "0";
	
	c3.style.position = "absolute";
	c3.width = window.innerWidth;
	c3.height = 0.25*window.innerHeight;
	c3.style.top = (0.75*window.innerHeight) + "px";
	c3.style.left = "0";

	var ct1 = c1.getContext("2d");
	var ct2 = c2.getContext("2d");
	var ct3 = c3.getContext("2d");
	
	section1(ct1, c1.width, c1.height);
	section2(ct2, c2.width, c2.height);
	section3(ct3, c3.width, c3.height);
};

function section1(ct, width, height) {
	ct.beginPath();
	ct.moveTo(0, height-10);
	for(var i=0;i<=10;){
		ct.lineTo(0.1*width*i, 10); ++i;
		ct.lineTo(0.1*width*i, height-10); ++i;
	}
	ct.stroke();

	ct.lineWidth = 2;
	function sunrise() {
		this.i = ++this.i || 0;
		ct.beginPath();
		ct.arc(0.5*width, height-10, 100+(this.i*15), 238*Math.PI/180.0, 302*Math.PI/180.0);
		ct.stroke();
		
		if(this.i<=5) setTimeout(sunrise, 1000);
	}
	sunrise();
}

function section2(ct, width, height) {
	var birds = [];

	for(var i=0;i<15;++i)
		birds[i] = getRandom();
	
	function getRandom() {
		return [ parseInt(10 + Math.random()*(width-20)), parseInt(10 + Math.random()*(height-20))];
	}

	ct.lineWidth = 2;

	function birdsfly(){
		ct.clearRect(0, 0, width, height);
		for(var j=0;j<15;++j){
			ct.beginPath();
			birds[j][0] += 5;
			birds[j][0] %= width; 
			ct.moveTo(birds[j][0]-10, birds[j][1]-10);
			ct.lineTo(birds[j][0], birds[j][1]);
			ct.lineTo(birds[j][0]+10, birds[j][1]-10);
			ct.stroke();
		}

		requestAnimationFrame(birdsfly);
	}
	birdsfly();
}

function section3(ct, width, height) {
	function boyrun(){
		ct.clearRect(0, 0, width, height);
		this.pos = (this.pos + 3) % width || 0;
		this.angle = (this.angle + 5) % 180 || 0;

		ct.lineWidth = 1;
		ct.beginPath();
		ct.moveTo(0,0.2*height);
		ct.bezierCurveTo(0.25*width,0.1*height,0.5*width,0,width, 0.05*height);
		ct.stroke();

		ct.lineWidth = 2;
		ct.beginPath();
		// head
		ct.arc(this.pos, 0.3*height, 0.07*height, 0, 2*Math.PI);
		// body
		ct.moveTo(this.pos, 0.37*height);
		ct.lineTo(this.pos, 0.7*height);
		// hands
		var r = 0.01*width;
		var angle = -this.angle*(Math.PI/180.0);
		ct.moveTo(this.pos, 0.5*height);
		ct.lineTo(this.pos + r*Math.cos(-angle), 0.5*height + r*Math.sin(-angle));
		ct.moveTo(this.pos, 0.5*height);
		ct.lineTo(this.pos + r*Math.cos(Math.PI + angle), 0.55*height + r*Math.sin(Math.PI + angle));
		// legs
		ct.moveTo(this.pos, 0.7*height);
		ct.lineTo(this.pos - 0.01*width, 0.75*height);
		ct.moveTo(this.pos, 0.7*height);
		ct.lineTo(this.pos + 0.01*width, 0.75*height);
		ct.stroke();
		requestAnimationFrame(boyrun);
	}
	boyrun();
}
