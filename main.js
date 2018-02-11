const canvas = document.querySelector("canvas");
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext('2d');

const countOption = document.querySelector("select#PendulumCount");

const PI = Math.PI;

let r1 = 200;
let r2 = 200;
let m1 = 40;
let m2 = 40;
let a1 = PI / 2;
let a2 = PI / 2;
let a1_v = 0;
let a2_v = 0;

let px2 = null,py2 = null;

let cx = width / 2,cy = 50;

let g = 0.3;

let graphic = new Graphics(width,height);
graphic.background(255);

function update(){
	let option = countOption.selectedOptions[0].value;

	let num1 = -g * (2 * m1 + m2) * sin(a1);
	let num2 = -m2 * g * sin(a1 - 2 * a2);
	let num3 = -2 * sin(a1 - a2) * m2;
	let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
	let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
	let a1_a = (num1 + num2 + num3 * num4) / den;

	num1 = 2 * sin(a1 - a2);
	num2 = a1_v * a1_v  * r1 * (m1 + m2);
	num3 = g * (m1 + m2) * cos(a1);
	num4 = a2_v * a2_v * r2 * m2 * cos(a1-a2);
	den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
	let a2_a = num1 * (num2 + num3 + num4) / den;

	push();

	// background(255);
	image(graphic,0,0);
	stroke(0);
	strokeWeight(2);

	translate(cx,cy);

	let x1 = r1 * sin(a1);
	let y1 = r1 * cos(a1);

	line(0,0,x1,y1);
	fill(0);
	ellipse(x1,y1,m1,m1);

	let x2 = x1 + r2 * sin(a2);
	let y2 = y1 + r2 * cos(a2);

	graphic.push();
	graphic.image(canvas,0,0);
	graphic.translate(cx,cy);
	graphic.strokeWeight(4);
	graphic.stroke(0);
	if(px2 !== null && py2 !== null){
		if(option === '2')
			graphic.line(px2,py2,x2,y2);
		else
			graphic.line(px2,py2,x1,y1);
	}
	graphic.pop();

	if(option == '2'){
		line(x1,y1,x2,y2);
		fill(0);
		ellipse(x2,y2,m2,m2);

		px2 = x2;
		py2 = y2;

		a2_v += a2_a;
		a2 += a2_v;
	}else if(option === '1'){
		px2 = x1;
		py2 = y1;
	}

	a1_v += a1_a;
	a1 += a1_v;

	// a1_v *= 0.99;
	// a2_v *= 0.99;

	// console.log("updating");

	pop();

	requestAnimationFrame(update);
}
update();

function background(color){
	fill(color);
	ctx.fillRect(0,0,width,height);
}

function cos(angle){
	return Math.cos(angle);
}

function ellipse(x,y,rx,ry){
	ctx.beginPath();
	ctx.ellipse(x,y,rx / 2,ry / 2,0,Math.PI * 2,0);
	ctx.fill();
}

function fill(color){
	ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
}

function image(image,x,y){
	if(image instanceof Graphics){
		ctx.drawImage(image.canvas,x,y);
	}
}

function line(x1,y1,x2,y2){
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function pop(){
	ctx.restore();
}

function push(){
	ctx.save();
}

function sin(angle){
	return Math.sin(angle);
}

function stroke(color){
	ctx.strokeStyle = 'rgb(' + color + ',' + color + ',' + color + ')';;
}

function strokeWeight(size){
	ctx.strokeWeight = size;
}

function translate(x,y){
	ctx.translate(x,y);
}