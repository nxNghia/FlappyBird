const cv = document.getElementById("myCanvas");
const ctx = cv.getContext("2d");
const black_width = 4;	//thickness of blackLine
const top_width = 40;
const gravity = 2;
var next_tube = 1;	//number of incoming tube
var start = false;		//game is begin or not
var running = false;	//tube is running or not

//entities's stat
const title = new Image();
const cloud = new Image();	//Cloud object
const _bush = new Image();
const rip = new Image();
const bird = new Array();
var num = new Array();
var Bird_color = Math.floor(Math.random()*3) + 1;
title.src = "image/title.png";
cloud.src = "image/cloud.png";
_bush.src = "image/bush.png";
rip.src = "image/rip.png";

for (var i = 0; i < 10; i++)
{
	num[i] = new Image();
	num[i].src = "image/" + i + ".png";
}

for (var i = 1; i <= 3; i++)
{
	bird[i-1] = new Image();
	bird[i-1].src = "image/bird" + i + ".png";
}


function Bird(height, R)
{
	this.height = height;
	this.velocity_up = 20;
	this.cur_height = 300;
	this.R = R;

	this.update = function(t)
	{
		this.cur_height = this.height - this.velocity_up * t + 0.5 * gravity * t**2;
	}

	this.draw = function(t, x, bird_image)
	{
		ctx.clearRect(0, 0, cv.width, cv.height);
		ctx.save();
		ctx.translate(x, this.cur_height);
		ctx.rotate(Math.atan(2*t - this.velocity_up) * (this.cur_height - (this.height - this.velocity_up**2 / gravity / 2))/(800 - this.height + this.velocity_up**2 / gravity / 2));
		ctx.translate(-x, -(this.cur_height));
		ctx.drawImage(bird_image, x - this.R, this.cur_height - this.R, 2*this.R, 2*this.R);
		ctx.restore();
	}

	this.hit = function(object)
	{
		if(this.cur_height >= object.height_bottom)
		{
			if(this.cur_height > object.height_bottom + 2*black_width + top_width)
			{
				if(this.cur_height >= 700 - R)
					return true;

				if(200 + this.R >= object.x + 5)
					return true;
			}else{
				if(200 + this.R >= object.x)
					return true;

				var dis = (this.cur_height - object.height_bottom)**2 + (object.x - 200)**2;
				if(dis <= R**2)
					return true;

				dis = (this.cur_height - (object.height_bottom + 2*black_width + top_width))**2 + (object.x - 200)**2;
				if(dis <= this.R**2)
					return true;
			}
		}else{
			if(this.cur_height <= object.height_top)
			{
				if(this.cur_height < object.height_top - 2*black_width - top_width)
				{
					if(this.cur_height <= this.R)
						return true;

					if(200 + this.R >= object.x + 5)
						return true;
				}else{
					if(200 + this.R >= object.x)
						return true;

					var dis = (this.cur_height - object.height_top)**2 + (object.x - 200)**2;
					if(dis <= this.R**2)
						return true;

					dis = (this.cur_height - (object.height_top + 2*black_width + top_width))**2 + (object.x - 200)**2;
					if(dis <= this.R**2)
						return true;
				}
			}else{
				if(200 >= object.x && 200 <= object.x + 100)
				{
					if(this.cur_height + this.R >= object.height_bottom || this.cur_height - 10 <= object.height_top)
						return true;

					var dis = (this.cur_height - object.height_top)**2 + (object.x + 100 - 200)**2;
					if(dis <= this.R**2)
						return true;

					dis = (this.cur_height - object.height_bottom)**2 + (object.x + 100 - 200)**2;
					if(dis <= this.R**2)
						return true;
				}

				if(200 - this.R < object.x + 100)
					var dis = (this.cur_height - object.height_bottom)**2 + (object.x + 100 - 200)**2;
					if(dis <= this.R**2)
						return true;
			}
		}

		return false;
	}
}

function tube(height_bottom, x)
{
	this.x = x;
	this.height_bottom = height_bottom;
	this.height_top = height_bottom - 200;

	this.update = function()
	{
		this.x -= 2.5;
		if(this.x == -200)
		{
			this.height_bottom = Math.floor(Math.random() * 200) + 400;
			this.height_top = this.height_bottom - 200;
			this.x = cv.width;
		}
	}

	this.miniDraw = function(x, y, R, w, h)
	{
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.fillRect(x, y, w, h);
		var grd = ctx.createLinearGradient(x + R, y + R, x + w - 2*R, y + R);
		grd.addColorStop(1, "#009900");
		grd.addColorStop(0, "#e6e600");
		ctx.fillStyle = grd;
		ctx.fillRect(x + R, y + R, w - 2*R, h - 2*R);
	}

	this.draw = function()
	{
		this.miniDraw(this.x, this.height_bottom, black_width, 100, 2*black_width + top_width);
		this.miniDraw(this.x, this.height_top - top_width - 2*black_width, black_width, 100, 2*black_width + top_width);
		this.miniDraw(this.x + 5, -black_width, black_width, 100 - 2*black_width, this.height_top - top_width);
		this.miniDraw(this.x + 5, this.height_bottom + black_width + top_width, black_width, 100 - 2*black_width, 700 - this.height_bottom - top_width);
	}
}

function tree(x, bush_width)
{
	this.x = x;
	this.bush_width = bush_width;
	this.bush_height = bush_width / 2;

	this.update = function()
	{
		this.x -= 2.5;
		if(this.x <= -this.bush_width)
		{
			this.x = Math.floor(Math.random() * 100) + 800;
			this.bush_width = Math.floor(Math.random() * 50) + 100;
			this.bush_height = this.bush_width / 2;
		}
	}

	this.draw = function()
	{
		ctx.drawImage(_bush, this.x, 700 - black_width / 2 - this.bush_height, this.bush_width, this.bush_height);
	}
}

const fBird = new Bird(400, 25);

var obstacle = new Array();
for (var i = 0; i < 5; i++)
{
	obstacle[i] = new tube(Math.floor(Math.random() * 200) + 400, 200 * (i + 2));
}

var bush = new Array();
for (var i = 0; i < 3; i++)
{
	bush[i] = new tree(100 + i * 300, Math.floor(Math.random() * 50) + 100);
}

function gameFunction()
{
	var self = this;
	this.t = 10;
	this.score = 0;

	this.init = function()
	{
		this.t = 10;
		Bird_color = Math.floor(Math.random() * 3) + 1;
		this.score = 0;
		next_tube = 1;
		start = false;
		running = false;
		fBird.height = 400;
		fBird.cur_height = 300;
		fBird.R = 25;

		for (var i = obstacle.length - 1; i >= 0; i--)
		{
			obstacle[i].x = 200 * (i + 2);
			obstacle[i].height_bottom = Math.floor(Math.random() * 200) + 400;
			obstacle[i].height_top = obstacle[i].height_bottom - 200;
		}

		for (var i = bush.length - 1; i >= 0; i--)
		{
			bush[i].x = 1000 - 300 * (i + 1);
			bush[i].bush_width = Math.floor(Math.random() * 50) + 100;
			bush[i].bush_height = bush[i].bush_width / 2;
		}

		fBird.draw(self.t, 200, bird[tmp_color - 1]);
		self.drawHorizontalMotion();
		this.scoreDisplay();
	}


	this.drawHorizontalMotion = function()
	{
		//display cloud
		ctx.drawImage(cloud, 10, 100, 150, 150);
		ctx.drawImage(cloud, 250, 300, 150, 150);
		ctx.drawImage(cloud, 360, 100, 150, 150);
		ctx.drawImage(cloud, 600, 150, 150, 150);

		for (var i = obstacle.length - 1; i >= 0; i--)
			obstacle[i].draw();

		for (var i = bush.length - 1; i >= 0; i--)
			bush[i].draw();

		//display ground
		ctx.beginPath();
		ctx.fillStyle = "#009900";
		ctx.fillRect(0, 700 + black_width / 2, cv.width, cv.height - 700 - black_width / 2);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "#000000";
		ctx.moveTo(0, 700);
		ctx.lineTo(cv.width, 700);
		ctx.lineWidth = black_width;
		ctx.stroke();
	}

	this.scoreDisplay = function scoreDisplay()
	{
		var tmp_score = this.score;
		var reverse = 0;
		var pos = 0;
		var count = 0;
		var score_display = [];
		while(tmp_score != 0)
		{
			reverse *= 10;
			reverse += tmp_score % 10;
			tmp_score /= 10;
			tmp_score = Math.floor(tmp_score);
			++count;
		}

		pos = cv.width / 2 - 0.5 * count * num[0].width;

		for (var i = count; i > 0; i--)
		{
			ctx.drawImage(num[reverse % 10], pos, 40, num[0].width, num[0].height);
			reverse /= 10;
			reverse = Math.floor(reverse);
			pos += num[0].width;
		}

		if(count == 0)
			ctx.drawImage(num[0], pos - num[0].width * 0.5, 40, num[0].width, num[0].height);
	}

	this.frame = function frame()
	{
		fBird.update(self.t);
		self.t += 0.6;
		for (var i = obstacle.length - 1; i >= 0; i--)
			obstacle[i].update();
		for (var i = bush.length - 1; i >= 0; i--)
			bush[i].update();
		
		fBird.draw(self.t, 200, bird[Bird_color - 1]);
		self.drawHorizontalMotion();
		self.scoreDisplay(self.score);

		if(obstacle[next_tube - 1].x + 50 == 200)
			++self.score;

		if(obstacle[next_tube - 1].x + 100 + fBird.R == 200)
			++next_tube;

		if(next_tube > obstacle.length)
			next_tube = 1;

		if(fBird.hit(obstacle[next_tube - 1]) == false)
			requestAnimationFrame(frame);
		else
		{
			start = false;
			self.shockWave();
		}
	}

	let wave_R = 0;
	this.shockWave = function shockWave()
	{
		ctx.clearRect(0, 0, cv.width, cv.height);
		fBird.draw(self.t, 200, bird[Bird_color - 1]);
		self.drawHorizontalMotion();
		self.scoreDisplay(self.score);
		
		ctx.beginPath();
		ctx.arc(200, fBird.cur_height, wave_R, 0, 2 * Math.PI);
		ctx.fillStyle = "#ffffff";
		ctx.fill();
		ctx.stroke();

		wave_R += 200;

		if(wave_R <= 1000)
			requestAnimationFrame(shockWave);
		else
		{
			wave_R = 0;
			self.fallDown();
		}
	}

	this.fallDown = function fallDown()
	{
		fBird.draw(self.t, 200, bird[Bird_color - 1]);
		self.drawHorizontalMotion();
		self.scoreDisplay(self.score);

		fBird.update(self.t);
		self.t += 0.6;

		if(200 >= obstacle[next_tube - 1].x && 200 <= obstacle[next_tube - 1].x + 100)
		{
			if(fBird.cur_height < obstacle[next_tube - 1].height_bottom - fBird.R)
			{
				requestAnimationFrame(fallDown);
			}else{
				ctx.clearRect(0, 0, cv.width, cv.height);
				self.drawHorizontalMotion();
				self.scoreDisplay(self.score);
				ctx.drawImage(rip, 200 - fBird.R, obstacle[next_tube - 1].height_bottom - 50, 2 * fBird.R, 50);
				running = false;
			}
		}
		else
		{
			if(fBird.cur_height <= 700 - fBird.R)
			{
				requestAnimationFrame(fallDown);
			}
			else
			{
				ctx.clearRect(0, 0, cv.width, cv.height);
				self.drawHorizontalMotion();
				self.scoreDisplay(self.score);
				ctx.drawImage(rip, 200 - fBird.R, 700 - 50, 2 * fBird.R, 50 - black_width / 2);
				running = false;
			}
		}
	}
}

var game = new gameFunction();
document.onkeydown = function(event)
{
	if(event.keyCode == 32)
	{
		if(start == false)
		{
			if(running == false)
			{
				game.init();
				start = true;
			}
		}else{
			if(running == false)
			{
				running = true;
				game.frame();
			}else{
				game.t = 0;
				fBird.height = fBird.cur_height;
			}
		}
	}
}

var introBird = new Bird(500, 40);
introBird.velocity_up = 28;
var t = 14;
var tmp_color = Math.floor(Math.random() * 4) + 1;
var x = 80;
var left = true;
var flipBird = new Array();

for (var i = 1; i <= 3; i++)
{
	flipBird[i-1] = new Image();
	flipBird[i-1].src = "image/flip" + i + ".png";
}

function intro()
{
	ctx.clearRect(0, 0, cv.width, cv.height);

	if(left == false && introBird.cur_height == 304)
		left = true;
	else
		if(left == true && introBird.cur_height == 304)
			left = false;
	if(left == false)
	{
		introBird.draw(t, x, bird[tmp_color - 1]);
		x += 10;
	}else{
		introBird.draw(t, x, flipBird[tmp_color - 1]);
		x -= 10;
	}
	introBird.update(t);
	ctx.drawImage(title, 20, 70, 700, 100);
	t += 0.5;

	if(introBird.cur_height >= introBird.height && introBird.velocity_up - gravity * t < 0)
	{
		introBird.cur_height = introBird.height;
		t = 0;
		tmp_color = Math.floor(Math.random() * 3) + 1;
	}

	if(start == false)
		requestAnimationFrame(intro);
	else
	{
		ctx.clearRect(0, 0, cv.width, cv.height);
		fBird.draw(10, 200, bird[Bird_color - 1]);
		game.drawHorizontalMotion();
		game.scoreDisplay();
	}
}

intro();