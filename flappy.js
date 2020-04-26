var cv = document.getElementById("myCanvas");
var ctx = cv.getContext("2d");
var black_width = 4;	//thickness of blackLine
var top_width = 40;
var t = 10;				//time_variable
var R = 20;				//Radius of hit box
var next_tube = 1;	//number of incoming tube
var start = false;		//game is begin or not
var running = false;	//tube is running or not
var score = 0;
var gravity = 2;

//entities's stat
var cloud = new Image();	//Cloud object
var _bush = new Image();
var rip = new Image();
var bird = new Array();
var num = new Array();
var Bird_color = Math.floor(Math.random()*3) + 1;
cloud.src = "image/cloud.png";
_bush.src = "image/bush.png";
rip.src = "image/rip.png";

for (var i = 0; i < 10; i++)
{
	num[i] = new Image();
	num[i].src = "image/" + i + ".png";
}

for (var i = 1; i <=3; i++)
{
	bird[i-1] = new Image();
	bird[i-1].src = "image/bird" + i + ".png";
}

function Bird(height)
{
	this.height = height;
	this.velocity_up = 20;
	this.cur_height = 300;

	this.update = function()
	{
		this.cur_height = this.height - this.velocity_up * t + 0.5 * gravity * t**2;
	}

	this.draw = function()
	{
		ctx.clearRect(0, 0, cv.width, cv.height);
		ctx.save();
		ctx.translate(200, this.cur_height);
		ctx.rotate(Math.atan(2*t - this.velocity_up) * (this.cur_height - (this.height - 100))/(800 - this.height + 100));
		ctx.translate(-200, -(this.cur_height));
		ctx.drawImage(bird[Bird_color - 1], 200 - R, this.cur_height - R, 2*R, 2*R);
		ctx.restore();
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

	this.draw = function()
	{
		ctx.beginPath();
		ctx.fillStyle = "#000000";	//black color
		//top of tube
		ctx.fillRect(this.x, this.height_bottom, 100, 2*black_width + top_width);
		ctx.fillRect(this.x, this.height_top - 2*black_width - top_width, 100, top_width + 2*black_width);
		//below of tube
		ctx.fillRect(this.x + 5, this.height_bottom + top_width + 2*black_width, 90, cv.height - this.height_bottom - 2*black_width - top_width);
		ctx.fillRect(this.x + 5, 0, 90, this.height_top - top_width - 2*black_width);
		
		ctx.fillStyle = "#009900";	//green3 color
		ctx.fillRect(this.x + black_width, this.height_bottom + black_width, 100 - 2*black_width, top_width);
		ctx.fillRect(this.x + black_width, this.height_top - top_width - black_width , 100 - 2*black_width, top_width);

		ctx.fillRect(this.x + black_width + 5, this.height_bottom + 2*black_width + top_width, 100 - 10 - 2*black_width, cv.height - this.height_bottom - black_width - top_width);
		ctx.fillRect(this.x + black_width + 5, 0, 100 - 10 - 2*black_width, this.height_top - 2*black_width - top_width);

		ctx.fillStyle = "#00ff00";	//green2 color
		ctx.fillRect(this.x + black_width, this.height_bottom + black_width, 10, top_width);
		ctx.fillRect(this.x + black_width, this.height_top - top_width - black_width, 10, top_width);

		ctx.fillRect(this.x + black_width + 5, this.height_bottom + top_width + 2*black_width, 10, cv.height - this.height_bottom - top_width - black_width);
		ctx.fillRect(this.x + black_width + 5, 0, 10, this.height_top - top_width - 2*black_width);

		ctx.fillStyle = "#00cc00";	//green1 color
		ctx.fillRect(this.x + black_width + 10, this.height_bottom + black_width, 10, top_width);
		ctx.fillRect(this.x + black_width + 10, this.height_top - top_width - black_width, 10, top_width);

		ctx.fillRect(this.x + black_width + 5 + 10, this.height_bottom + top_width + 2*black_width, 10, cv.height - this.height_bottom - top_width - black_width);
		ctx.fillRect(this.x + black_width + 5 + 10, 0, 10, this.height_top - top_width - 2*black_width);
		ctx.stroke();
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

var fBird = new Bird(400);

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

window.onload = function init()
{
	fBird.draw();
	drawHorizontalMotion();
	scoreDisplay();
}

function drawHorizontalMotion()
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

function scoreDisplay()
{
	//display score
	var tmp_score = score;
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

document.onkeydown = function(envent)
{
	if(envent.keyCode == 32 && running)
	{
		t = 1;
		fBird.height = fBird.cur_height;
	}
}

function reset()
{
	ctx.clearRect(0, 0, cv.width, cv.height);
	start = false;
	running = false;
	fBird.height = 400;
	fBird.cur_height = 300;
	fBird.velocity_up = 20;
	score = 0;
	next_tube = 1;
	Bird_color = Math.floor(Math.random() * 3) + 1;
	t = 10;

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

	fBird.draw();
	drawHorizontalMotion();
	scoreDisplay();
}

function jump()
{
	if(start == false)
	{
		start = true;
		running = true;

		frame();

		function frame()
		{
			fBird.update();
			for (var i = obstacle.length - 1; i >= 0; i--)
				obstacle[i].update();
			for (var i = bush.length - 1; i >= 0; i--)
				bush[i].update();
			
			fBird.draw();
			drawHorizontalMotion();
			scoreDisplay();

			if(obstacle[next_tube - 1].x + 50 == 200)
				++score;

			if(obstacle[next_tube - 1].x + 100 + R == 200)
				++next_tube;

			if(next_tube > obstacle.length)
				next_tube = 1;
			t += 0.6;

			if(GameOver() == false)
				requestAnimationFrame(frame);
			else
			{
				running = false;
				EndGame();
			}
		}

		var wave_R = 0;

		function EndGame()
		{
			ctx.clearRect(0, 0, cv.width, cv.height);
			fBird.draw();
			drawHorizontalMotion();
			scoreDisplay();
			ctx.beginPath();
			ctx.arc(200, fBird.cur_height, wave_R, 0, 2 * Math.PI);
			ctx.fillStyle = "#ffffff";
			ctx.fill();
			ctx.stroke();
			wave_R += 200;

			if(wave_R <= 1000)
				requestAnimationFrame(EndGame);
			else
				fallDown();
		}

		function fallDown()
		{
			fBird.draw();
			drawHorizontalMotion();
			scoreDisplay();
			t += 0.6;

			fBird.update();

			if(200 >= obstacle[next_tube - 1].x && 200 <= obstacle[next_tube - 1].x + 100)
			{
				if(fBird.cur_height < obstacle[next_tube - 1].height_bottom - R)
				{
					requestAnimationFrame(fallDown);
				}else{
					ctx.clearRect(0, 0, cv.width, cv.height);
					drawHorizontalMotion();
					scoreDisplay();
					ctx.drawImage(rip, 200 - R, obstacle[next_tube - 1].height_bottom - 50, 2 * R, 50);
				}
			}
			else
			{
				if(fBird.cur_height <= 700 - R)
				{
					requestAnimationFrame(fallDown);
				}
				else
				{
					ctx.clearRect(0, 0, cv.width, cv.height);
					drawHorizontalMotion();
					scoreDisplay();
					ctx.drawImage(rip, 200 - R, 700 - 50, 2 * R, 50 - black_width / 2);
					t = 0;
				}
			}
		}

		function GameOver()
		{
			if(fBird.cur_height >= obstacle[next_tube - 1].height_bottom)
			{
				if(fBird.cur_height > obstacle[next_tube - 1].height_bottom + 2*black_width + top_width)
				{
					if(fBird.cur_height >= 700 - R)
						return true;

					if(200 + R >= obstacle[next_tube - 1].x + 5)
						return true;
				}else{
					if(200 + R >= obstacle[next_tube - 1].x)
						return true;

					var dis = (fBird.cur_height - obstacle[next_tube - 1].height_bottom)**2 + (obstacle[next_tube - 1].x - 200)**2;
					if(dis <= R**2)
						return true;

					dis = (fBird.cur_height - (obstacle[next_tube - 1].height_bottom + 2*black_width + top_width))**2 + (obstacle[next_tube - 1].x - 200)**2;
					if(dis <= R**2)
						return true;
				}
			}else{
				if(fBird.cur_height <= obstacle[next_tube - 1].height_top)
				{
					if(fBird.cur_height < obstacle[next_tube - 1].height_top - 2*black_width - top_width)
					{
						if(fBird.cur_height <= R)
							return true;

						if(200 + R >= obstacle[next_tube - 1].x + 5)
							return true;
					}else{
						if(200 + R >= obstacle[next_tube - 1].x)
							return true;

						var dis = (fBird.cur_height - obstacle[next_tube - 1].height_top)**2 + (obstacle[next_tube - 1].x - 200)**2;
						if(dis <= R**2)
							return true;

						dis = (fBird.cur_height - (obstacle[next_tube - 1].height_top + 2*black_width + top_width))**2 + (obstacle[next_tube - 1].x - 200)**2;
						if(dis <= R**2)
							return true;
					}
				}else{
					if(200 >= obstacle[next_tube - 1].x && 200 <= obstacle[next_tube - 1].x + 100)
					{
						if(fBird.cur_height + R >= obstacle[next_tube - 1].height_bottom || fBird.cur_height - 10 <= obstacle[next_tube - 1].height_top)
							return true;

						var dis = (fBird.cur_height - obstacle[next_tube - 1].height_top)**2 + (obstacle[next_tube - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;

						dis = (fBird.cur_height - obstacle[next_tube - 1].height_bottom)**2 + (obstacle[next_tube - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;
					}

					if(200 - R < obstacle[next_tube - 1].x + 100)
						var dis = (fBird.cur_height - obstacle[next_tube - 1].height_bottom)**2 + (obstacle[next_tube - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;
				}
			}

			return false;
		}
	}
}