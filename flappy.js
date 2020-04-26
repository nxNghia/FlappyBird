var cv = document.getElementById("myCanvas");
var ctx = cv.getContext("2d");
var obstacle = [];
var collumn = 1;
var score = 0;
var black_width = 4;
var top_width = 40;
var begin = false;
var t = 10;
var R = 20;
var running = false;
var width = cv.width;
var height = cv.height;
var bird = new Image();
var cloud = new Image();
var bushh = new Image();
var rip = new Image();
var img0 = new Image();
var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
var img5 = new Image();
var img6 = new Image();
var img7 = new Image();
var img8 = new Image();
var img9 = new Image();
var num = [];
bird.src = "image/bird.png";
cloud.src = "image/cloud.png";
bushh.src = "image/bush.png";
rip.src = "image/rip.png";
img0.src = "image/0.png";
img1.src = "image/1.png";
img2.src = "image/2.png";
img3.src = "image/3.png";
img4.src = "image/4.png";
img5.src = "image/5.png";
img6.src = "image/6.png";
img7.src = "image/7.png";
img8.src = "image/8.png";
img9.src = "image/9.png";
num.push(img0);
num.push(img1);
num.push(img2);
num.push(img3);
num.push(img4);
num.push(img5);
num.push(img6);
num.push(img7);
num.push(img8);
num.push(img9);

function Bird(height, vel_up, gravity)
{
	this.height = height;
	this.velocity_up = vel_up;
	this.cur_height = height;
	this.cur_velocity = vel_up;
	this.gravity = gravity;
}
var fBird = new Bird(400, 20, 2);

Bird.cur_height = 300;

function tube(height_bottom, x)
{
	this.x = x;
	this.height_bottom = height_bottom;
	this.height_top = height_bottom - 200;
}

var tube1 = new tube(Math.floor(Math.random() * 200 + 400), 400);
var tube2 = new tube(Math.floor(Math.random() * 200 + 400), 600);
var tube3 = new tube(Math.floor(Math.random() * 200 + 400), 800);
var tube4 = new tube(Math.floor(Math.random() * 200 + 400), 1000);
var tube5 = new tube(Math.floor(Math.random() * 200 + 400), 1200);

obstacle.push(tube1);
obstacle.push(tube2);
obstacle.push(tube3);
obstacle.push(tube4);
obstacle.push(tube5);

function tree(x, bush_width)
{
	this.x = x;
	this.bush_width = bush_width;
	this.bush_height = bush_width / 2;
}

var bush1 = new tree(100, Math.floor(Math.random() * 50 + 100));
var bush2 = new tree(400, Math.floor(Math.random() * 50 + 100));
var bush3 = new tree(700, Math.floor(Math.random() * 50 + 100));

var bush = [];

bush.push(bush1);
bush.push(bush2);
bush.push(bush3);

window.onload = function init()
{
	drawBird(fBird);
	drawThings(obstacle, bush);
}

function drawBird(fBird)
{
	ctx.clearRect(0, 0, width, height);
	ctx.save();
	ctx.translate(200, fBird.cur_height);
	ctx.rotate(Math.atan(2*t - fBird.velocity_up) * (fBird.cur_height - (fBird.height - 100))/(800 - fBird.height + 100));
	ctx.translate(-200, -fBird.cur_height);
	ctx.drawImage(bird, 200 - R, fBird.cur_height - R, 2*R, 2*R);
	ctx.restore();
}

function drawThings(obstacle, bush)
{
	ctx.beginPath();
	ctx.drawImage(cloud, 10, 100, 150, 150);
	ctx.drawImage(cloud, 250, 300, 150, 150);
	ctx.drawImage(cloud, 360, 100, 150, 150);
	ctx.drawImage(cloud, 600, 150, 150, 150);
	
	ctx.beginPath();
	for (var i = obstacle.length - 1; i >= 0; i--)
	{
		ctx.fillStyle = "#000000";	//black color
		//top of tube
		ctx.fillRect(obstacle[i].x, obstacle[i].height_bottom, 100, 2*black_width + top_width);
		ctx.fillRect(obstacle[i].x, obstacle[i].height_top - 2*black_width - top_width, 100, top_width + 2*black_width);
		//below of tube
		ctx.fillRect(obstacle[i].x + 5, obstacle[i].height_bottom + top_width + 2*black_width, 90, height - obstacle[i].height_bottom - 2*black_width - top_width);
		ctx.fillRect(obstacle[i].x + 5, 0, 90, obstacle[i].height_top - top_width - 2*black_width);
		
		ctx.fillStyle = "#009900";	//green3 color
		ctx.fillRect(obstacle[i].x + black_width, obstacle[i].height_bottom + black_width, 100 - 2*black_width, top_width);
		ctx.fillRect(obstacle[i].x + black_width, obstacle[i].height_top - top_width - black_width , 100 - 2*black_width, top_width);

		ctx.fillRect(obstacle[i].x + black_width + 5, obstacle[i].height_bottom + 2*black_width + top_width, 100 - 10 - 2*black_width, height - obstacle[i].height_bottom - black_width - top_width);
		ctx.fillRect(obstacle[i].x + black_width + 5, 0, 100 - 10 - 2*black_width, obstacle[i].height_top - 2*black_width - top_width);

		ctx.fillStyle = "#00ff00";	//green2 color
		ctx.fillRect(obstacle[i].x + black_width, obstacle[i].height_bottom + black_width, 10, top_width);
		ctx.fillRect(obstacle[i].x + black_width, obstacle[i].height_top - top_width - black_width, 10, top_width);

		ctx.fillRect(obstacle[i].x + black_width + 5, obstacle[i].height_bottom + top_width + 2*black_width, 10, height - obstacle[i].height_bottom - top_width - black_width);
		ctx.fillRect(obstacle[i].x + black_width + 5, 0, 10, obstacle[i].height_top - top_width - 2*black_width);

		ctx.fillStyle = "#00cc00";	//green1 color
		ctx.fillRect(obstacle[i].x + black_width + 10, obstacle[i].height_bottom + black_width, 10, top_width);
		ctx.fillRect(obstacle[i].x + black_width + 10, obstacle[i].height_top - top_width - black_width, 10, top_width);

		ctx.fillRect(obstacle[i].x + black_width + 5 + 10, obstacle[i].height_bottom + top_width + 2*black_width, 10, height - obstacle[i].height_bottom - top_width - black_width);
		ctx.fillRect(obstacle[i].x + black_width + 5 + 10, 0, 10, obstacle[i].height_top - top_width - 2*black_width);
	}
	ctx.stroke();

	for (var i = bush.length - 1; i >= 0; i--) {
		ctx.drawImage(bushh, bush[i].x, 700 - black_width / 2 - bush[i].bush_height, bush[i].bush_width, bush[i].bush_height);
	}

	ctx.beginPath();
	ctx.strokeStyle = "#000000";
	ctx.moveTo(0, 700);
	ctx.lineTo(width, 700);
	ctx.lineWidth = black_width;
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = "#009900";
	ctx.fillRect(0, 700 + black_width / 2, width, height - 700 - black_width / 2);
	ctx.stroke();

	var tmp_score = score;
	var pos = 0;
	var score_display = [];
	while(tmp_score >= 1)
	{
		score_display.push(num[tmp_score % 10]);
		tmp_score /= 10;
		tmp_score = Math.floor(tmp_score);
		++pos;
	}

	pos = width / 2 - 0.5 * pos * img0.width;

	for (var i = score_display.length - 1; i >= 0; i--)
	{
		ctx.drawImage(score_display[i], pos, 40, img0.width, img0.height);
		pos += img0.width;
	}

	if(score_display.length == 0)
		ctx.drawImage(img0, width / 2 - img0.width * 0.5, 40, img0.width, img0.height);
}

document.onkeydown = function(envent)
{
	if(envent.keyCode == 32 && running)
	{
		t = 1;
		fBird.cur_velocity = fBird.velocity_up;
		fBird.height = fBird.cur_height;
	}
}

function reset()
{
	ctx.clearRect(0, 0, width, height);
	begin = false;
	running = false;
	fBird.height = 400;
	fBird.cur_height = 300;
	fBird.velocity_up = 20;
	fBird.cur_velocity = 20;
	fBird.gravity = 2;
	score = 0;
	collumn = 1;
	t = 10;

	for (var i = obstacle.length - 1; i >= 0; i--)
	{
		obstacle[i].x = 200 * (i + 2);
		obstacle[i].height_bottom = Math.floor(Math.random() * 200 + 400);
		obstacle[i].height_top = obstacle[i].height_bottom - 200;
	}

	for (var i = bush.length - 1; i >= 0; i--)
	{
		bush[i].x = 1000 - 300 * (i + 1);
		bush[i].bush_width = Math.floor(Math.random() * 50 + 100);
		bush[i].bush_height = bush[i].bush_width / 2;
	}

	drawBird(fBird);
	drawThings(obstacle, bush);
}

function jump()
{
	if(begin == false)
	{
		begin = true;
		running = true;

		frame();

		function frame()
		{
			//console.log(fBird.cur_height);
			update(fBird, t);
			update2(obstacle, bush);
			drawBird(fBird);
			drawThings(obstacle, bush);

			if(obstacle[collumn - 1].x + 50 == 200)
				++score;

			if(obstacle[collumn - 1].x + 100 + R == 200)
				++collumn;

			if(collumn > obstacle.length)
				collumn = 1;
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
			ctx.clearRect(0, 0, width, height);
			drawBird(fBird);
			drawThings(obstacle, bush);
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
			drawBird(fBird);
			drawThings(obstacle, bush);
			t += 0.6;

			update(fBird, t);

			if(200 >= obstacle[collumn - 1].x && 200 <= obstacle[collumn - 1].x + 100)
			{
				if(fBird.cur_height < obstacle[collumn - 1].height_bottom - R)
				{
					requestAnimationFrame(fallDown);
				}else{
					ctx.clearRect(0, 0, width, height);
					drawThings(obstacle, bush);
					ctx.drawImage(rip, 200 - R, obstacle[collumn - 1].height_bottom - 50, 2 * R, 50);
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
					ctx.clearRect(0, 0, width, height);
					drawThings(obstacle, bush);
					ctx.drawImage(rip, 200 - R, 700 - 50, 2 * R, 50 - black_width / 2);
					t = 0;
				}
			}
		}

		function GameOver()
		{
			if(fBird.cur_height >= obstacle[collumn - 1].height_bottom)
			{
				if(fBird.cur_height > obstacle[collumn - 1].height_bottom + 2*black_width + top_width)
				{
					if(fBird.cur_height >= 700 - R)
						return true;

					if(200 + R >= obstacle[collumn - 1].x + 5)
						return true;
				}else{
					if(200 + R >= obstacle[collumn - 1].x)
						return true;

					var dis = (fBird.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x - 200)**2;
					if(dis <= R**2)
						return true;

					dis = (fBird.cur_height - (obstacle[collumn - 1].height_bottom + 2*black_width + top_width))**2 + (obstacle[collumn - 1].x - 200)**2;
					if(dis <= R**2)
						return true;
				}
			}else{
				if(fBird.cur_height <= obstacle[collumn - 1].height_top)
				{
					if(fBird.cur_height < obstacle[collumn - 1].height_top - 2*black_width - top_width)
					{
						if(fBird.cur_height <= R)
							return true;

						if(200 + R >= obstacle[collumn - 1].x + 5)
							return true;
					}else{
						if(200 + R >= obstacle[collumn - 1].x)
							return true;

						var dis = (fBird.cur_height - obstacle[collumn - 1].height_top)**2 + (obstacle[collumn - 1].x - 200)**2;
						if(dis <= R**2)
							return true;

						dis = (fBird.cur_height - (obstacle[collumn - 1].height_top + 2*black_width + top_width))**2 + (obstacle[collumn - 1].x - 200)**2;
						if(dis <= R**2)
							return true;
					}
				}else{
					if(200 >= obstacle[collumn - 1].x && 200 <= obstacle[collumn - 1].x + 100)
					{
						if(fBird.cur_height + R >= obstacle[collumn - 1].height_bottom || fBird.cur_height - 10 <= obstacle[collumn - 1].height_top)
							return true;

						var dis = (fBird.cur_height - obstacle[collumn - 1].height_top)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;

						dis = (fBird.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;
					}

					if(200 - R < obstacle[collumn - 1].x + 100)
						var dis = (fBird.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;
				}
			}

			return false;
		}

		function update(fBird)
		{
			fBird.cur_height = fBird.height - fBird.velocity_up * t + 0.5 * fBird.gravity * t**2;
			fBird.cur_velocity = fBird.velocity_up - fBird.gravity * t;
		}

		function update2(obstacle, bush)
		{
			for (var i = obstacle.length - 1; i >= 0; i--)
			{
				obstacle[i].x -= 2.5;

				if(obstacle[i].x == -200)
				{
					obstacle[i].height = Math.floor(Math.random() * 200 + 400);
					obstacle[i].x = width;
				}
			}

			for (var i = bush.length - 1; i >= 0; i--) {
				bush[i].x -= 2.5;

				if(bush[i].x <= -bush[i].bush_width)
				{
					bush[i].x = Math.floor(Math.random() * 100 + 800);
					bush[i].bush_width = Math.floor(Math.random() * 50 + 100);
					bush[i].bush_height = bush[i].bush_width / 2;
				}

			}
		}
	}
}