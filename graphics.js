class Graphics{
	constructor(width=200,height=200){
		this.width = width;
		this.height = height;
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width',width);
		this.canvas.setAttribute('height',height);
		this.ctx = this.canvas.getContext('2d');
	}

	background(color){
		this.fill(color);
		this.ctx.fillRect(0,0,this.width,this.height);
	}

	fill(color){
		this.ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
	}

	image(canvas,x,y){
		if(image instanceof CanvasRenderingContext2D){
			this.ctx.drawImage(image,x,y);
		}
	}

	line(x1,y1,x2,y2){
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	}

	point(x,y){
		this.ctx.beginPath();
		this.ctx.ellipse(x,y,1,1,0,Math.PI * 2,0);
		this.ctx.stroke();
	}

	pop(){
		this.ctx.restore();
	}

	push(){
		this.ctx.save();
	}

	stroke(color){
		this.ctx.strokeStyle = 'rgb(' + color + ',' + color + ',' + color + ')';;
	}

	strokeWeight(size){
		this.ctx.strokeWeight = size;
	}

	translate(x,y){
		this.ctx.translate(x,y);
	}
}