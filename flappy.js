var cv = document.getElementById("myCanvas");
var ctx = cv.getContext("2d");
var cont = document.getElementById("score");
var obstacle = [];
var collumn = 1;
var score = 0;
var black_width = 4;
var top_width = 40;
var begin = false;
var t = 1;
var R = 20;
var width = cv.width;
var height = cv.height;
var bird = new Image();
var cloud = new Image();
var bush = new Image();
var rip = new Image();
var running = false;
bird.src = "bird.png";
cloud.src = "cloud.png";
bush.src = "bush.png";
rip.src = "rip.png";


function Ball(height, vel_up, gravity)
{
	this.height = height;
	this.velocity_up = vel_up;
	this.cur_height = height;
	this.cur_velocity = vel_up;
	this.gravity = gravity;
}
var Bird = new Ball(400, 20, 2);

function box(height_bottom, x)
{
	this.x = x;
	this.height_bottom = height_bottom;
	this.height_top = height_bottom - 200;
}

var box1 = new box(Math.floor(Math.random() * 200 + 400), 400);
var box2 = new box(Math.floor(Math.random() * 200 + 400), 600);
var box3 = new box(Math.floor(Math.random() * 200 + 400), 800);
var box4 = new box(Math.floor(Math.random() * 200 + 400), 1000);
var box5 = new box(Math.floor(Math.random() * 200 + 400), 1200);

obstacle.push(box1);
obstacle.push(box2);
obstacle.push(box3);
obstacle.push(box4);
obstacle.push(box5);

window.onload = function init()
{
	drawBird(Bird);
	drawThings(obstacle);
}

function drawBird(Bird)
{
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(bird, 200 - R, Bird.cur_height - R, 2*R, 2*R);
}

function drawThings(object)
{
	ctx.beginPath();
	ctx.drawImage(cloud, 10, 100, 150, 150);
	ctx.drawImage(cloud, 250, 300, 150, 150);
	ctx.drawImage(cloud, 360, 100, 150, 150);
	ctx.drawImage(cloud, 600, 150, 150, 150);
	ctx.drawImage(bush, 0, 650, 150, 50);
	ctx.drawImage(bush, 450, 600, 200, 100);
	
	ctx.beginPath();
	for (var i = object.length - 1; i >= 0; i--)
	{
		ctx.fillStyle = "#000000";	//black color
		//top of tube
		ctx.fillRect(object[i].x, object[i].height_bottom, 100, 2*black_width + top_width);
		ctx.fillRect(object[i].x, obstacle[i].height_top - 2*black_width - top_width, 100, top_width + 2*black_width);
		//below of tube
		ctx.fillRect(object[i].x + 5, object[i].height_bottom + top_width + 2*black_width, 90, height - object[i].height_bottom - 2*black_width - top_width);
		ctx.fillRect(object[i].x + 5, 0, 90, object[i].height_top - top_width - 2*black_width);
		
		ctx.fillStyle = "#009900";	//green3 color
		ctx.fillRect(object[i].x + black_width, object[i].height_bottom + black_width, 100 - 2*black_width, top_width);
		ctx.fillRect(object[i].x + black_width, object[i].height_top - top_width - black_width , 100 - 2*black_width, top_width);

		ctx.fillRect(object[i].x + black_width + 5, object[i].height_bottom + 2*black_width + top_width, 100 - 10 - 2*black_width, height - object[i].height_bottom - black_width - top_width);
		ctx.fillRect(object[i].x + black_width + 5, 0, 100 - 10 - 2*black_width, object[i].height_top - 2*black_width - top_width);

		ctx.fillStyle = "#00ff00";	//green2 color
		ctx.fillRect(object[i].x + black_width, object[i].height_bottom + black_width, 10, top_width);
		ctx.fillRect(object[i].x + black_width, object[i].height_top - top_width - black_width, 10, top_width);

		ctx.fillRect(object[i].x + black_width + 5, object[i].height_bottom + top_width + 2*black_width, 10, height - object[i].height_bottom - top_width - black_width);
		ctx.fillRect(object[i].x + black_width + 5, 0, 10, object[i].height_top - top_width - 2*black_width);

		ctx.fillStyle = "#00cc00";	//green1 color
		ctx.fillRect(object[i].x + black_width + 10, object[i].height_bottom + black_width, 10, top_width);
		ctx.fillRect(object[i].x + black_width + 10, object[i].height_top - top_width - black_width, 10, top_width);

		ctx.fillRect(object[i].x + black_width + 5 + 10, object[i].height_bottom + top_width + 2*black_width, 10, height - object[i].height_bottom - top_width - black_width);
		ctx.fillRect(object[i].x + black_width + 5 + 10, 0, 10, object[i].height_top - top_width - 2*black_width);
	}
	ctx.stroke();

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

}

document.onkeydown = function(envent)
{
	if(envent.keyCode == 32 && running)
	{
		t = 1;
		Bird.cur_velocity = Bird.velocity_up;
		Bird.height = Bird.cur_height;
	}
}


function reset()
{
	ctx.clearRect(0, 0, width, height);
	begin = false;
	running = false;
	Bird.height = 400;
	Bird.cur_height = 400;
	Bird.velocity_up = 20;
	Bird.cur_velocity = 20;
	Bird.gravity = 2;
	score = 0;
	collumn = 1;
	t = 0;


	for (var i = obstacle.length - 1; i >= 0; i--)
	{
		obstacle[i].x = 200 * (i + 2);
		obstacle[i].height_bottom = Math.floor(Math.random() * 200 + 400);
		obstacle[i].height_top = obstacle[i].height_bottom - 200;
	}

	drawBird(Bird);
	drawThings(obstacle);
	cont.innerHTML = score;
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
			cont.innerHTML = score;
			update(Bird, t);
			update2(obstacle);
			drawBird(Bird);
			drawThings(obstacle);

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
			drawBird(Bird);
			drawThings(obstacle);
			ctx.beginPath();
			ctx.arc(200, Bird.cur_height, wave_R, 0, 2 * Math.PI);
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
			drawBird(Bird);
			drawThings(obstacle);
			t += 0.6;

			update(Bird, t);

			if(200 >= obstacle[collumn - 1].x && 200 <= obstacle[collumn - 1].x + 100)
			{
				if(Bird.cur_height < obstacle[collumn - 1].height_bottom - R)
				{
					requestAnimationFrame(fallDown);
				}else{
					drawThings(obstacle);
					ctx.drawImage(rip, 200 - R, obstacle[collumn - 1].height_bottom - 50, 2 * R, 50);
				}
			}
			else
			{
				if(Bird.cur_height <= 700 - R)
				{
					requestAnimationFrame(fallDown);
				}
				else
				{
					ctx.clearRect(0, 0, width, height);
					drawThings(obstacle);
					ctx.drawImage(rip, 200 - R, 700 - 50, 2 * R, 50 - black_width / 2);
					t = 0;
				}
			}
		}

		function GameOver()
		{
			if(Bird.cur_height >= obstacle[collumn - 1].height_bottom)
			{
				if(Bird.cur_height > obstacle[collumn - 1].height_bottom + 2*black_width + top_width)
				{
					if(Bird.cur_height >= 700 - R)
						return true;

					if(200 + R >= obstacle[collumn - 1].x + 5)
						return true;
				}else{
					if(200 + R >= obstacle[collumn - 1].x)
						return true;

					var dis = (Bird.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x - 200)**2;
					if(dis <= R**2)
						return true;

					dis = (Bird.cur_height - (obstacle[collumn - 1].height_bottom + 2*black_width + top_width))**2 + (obstacle[collumn - 1].x - 200)**2;
					if(dis <= R**2)
						return true;
				}
			}else{
				if(Bird.cur_height <= obstacle[collumn - 1].height_top)
				{
					if(Bird.cur_height < obstacle[collumn - 1].height_top - 2*black_width - top_width)
					{
						if(Bird.cur_height <= R)
							return true;

						if(200 + R >= obstacle[collumn - 1].x + 5)
							return true;
					}else{
						if(200 + R >= obstacle[collumn - 1].x)
							return true;

						var dis = (Bird.cur_height - obstacle[collumn - 1].height_top)**2 + (obstacle[collumn - 1].x - 200)**2;
						if(dis <= R**2)
							return true;

						dis = (Bird.cur_height - (obstacle[collumn - 1].height_top + 2*black_width + top_width))**2 + (obstacle[collumn - 1].x - 200)**2;
						if(dis <= R**2)
							return true;
					}
				}else{
					if(200 >= obstacle[collumn - 1].x && 200 <= obstacle[collumn - 1].x + 100)
					{
						if(Bird.cur_height + R >= obstacle[collumn - 1].height_bottom || Bird.cur_height - 10 <= obstacle[collumn - 1].height_top)
							return true;

						var dis = (Bird.cur_height - obstacle[collumn - 1].height_top)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;

						dis = (Bird.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;
					}

					if(200 - R < obstacle[collumn - 1].x + 100)
						var dis = (Bird.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= R**2)
							return true;
				}
			}

			return false;
		}

		function update(object)
		{
			object.cur_height = object.height - object.velocity_up * t + 0.5 * object.gravity * t**2;
			object.cur_velocity = object.velocity_up - object.gravity * t;
		}

		function update2(object)
		{
			for (var i = object.length - 1; i >= 0; i--)
			{
				object[i].x -= 2.5;

				if(object[i].x == -200)
				{
					object[i].height = Math.floor(Math.random() * 200 + 400);
					object[i].x = width;
				}
			}
		}
	}
}