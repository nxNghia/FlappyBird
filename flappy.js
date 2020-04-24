var cv = document.getElementById("myCanvas");
var ctx = cv.getContext("2d");
var obs = cv.getContext("2d");
var cont = document.getElementById("score");
var obstacle = [];
var collumn = 1;
var score = 0;
var black_width = 4;
var top_width = 40;
var finished = false;
var t = 1;

function Ball(height, vel_up, gravity)
{
	this.height = height;
	this.velocity_up = vel_up;
	this.cur_height = height;
	this.cur_velocity = vel_up;
	this.gravity = gravity;
}
var aBall = new Ball(400, 20, 2);

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

ctx.beginPath();
ctx.clearRect(0, 0, 800, 800);
ctx.arc(200, aBall.cur_height, 10, 0, 2 * Math.PI);
ctx.fillStyle = "#ffffff";
ctx.lineWidth = 2;
ctx.strokeStyle = "#ffffff";
ctx.fill();
ctx.stroke();

if(finished == false)
	draw(aBall, obstacle);

function draw(object1, object2)
{
	ctx.beginPath();
	ctx.clearRect(0, 0, 800, 800);
	ctx.arc(200, object1.cur_height, 10, 0, 2 * Math.PI);
	ctx.fillStyle = "#ffffff";
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#ffffff";
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	for (var i = object2.length - 1; i >= 0; i--)
	{
		ctx.fillStyle = "#000000";	//black color
		//top of tube
		ctx.fillRect(object2[i].x, object2[i].height_bottom, 100, 2*black_width + top_width);
		ctx.fillRect(object2[i].x, obstacle[i].height_top - 2*black_width - top_width, 100, top_width + 2*black_width);
		//below of tube
		ctx.fillRect(object2[i].x + 5, object2[i].height_bottom + top_width + 2*black_width, 90, 800 - object2[i].height_bottom - 2*black_width - top_width);
		ctx.fillRect(object2[i].x + 5, 0, 90, object2[i].height_top - top_width - 2*black_width);
		
		ctx.fillStyle = "#009900";	//green3 color
		ctx.fillRect(object2[i].x + black_width, object2[i].height_bottom + black_width, 100 - 2*black_width, top_width);
		ctx.fillRect(object2[i].x + black_width, object2[i].height_top - top_width - black_width , 100 - 2*black_width, top_width);

		ctx.fillRect(object2[i].x + black_width + 5, object2[i].height_bottom + 2*black_width + top_width, 100 - 10 - 2*black_width, 800 - object2[i].height_bottom - black_width - top_width);
		ctx.fillRect(object2[i].x + black_width + 5, 0, 100 - 10 - 2*black_width, object2[i].height_top - 2*black_width - top_width);

		ctx.fillStyle = "#00ff00";	//green2 color
		ctx.fillRect(object2[i].x + black_width, object2[i].height_bottom + black_width, 10, top_width);
		ctx.fillRect(object2[i].x + black_width, object2[i].height_top - top_width - black_width, 10, top_width);

		ctx.fillRect(object2[i].x + black_width + 5, object2[i].height_bottom + top_width + 2*black_width, 10, 800 - object2[i].height_bottom - top_width - black_width);
		ctx.fillRect(object2[i].x + black_width + 5, 0, 10, object2[i].height_top - top_width - 2*black_width);

		ctx.fillStyle = "#00cc00";	//green1 color
		ctx.fillRect(object2[i].x + black_width + 10, object2[i].height_bottom + black_width, 10, top_width);
		ctx.fillRect(object2[i].x + black_width + 10, object2[i].height_top - top_width - black_width, 10, top_width);

		ctx.fillRect(object2[i].x + black_width + 5 + 10, object2[i].height_bottom + top_width + 2*black_width, 10, 800 - object2[i].height_bottom - top_width - black_width);
		ctx.fillRect(object2[i].x + black_width + 5 + 10, 0, 10, object2[i].height_top - top_width - 2*black_width);
	}
	ctx.stroke();
}

document.onkeydown = function(envent)
{
	if(envent.keyCode == 32)
	{
		t = 1;
		aBall.cur_velocity = aBall.velocity_up;
		aBall.height = aBall.cur_height;
	}
}


function reset()
{
	ctx.clearRect(0, 0, 800, 800);
	finished = false;
	aBall.height = 400;
	aBall.cur_height = 400;
	aBall.velocity_up = 20;
	aBall.cur_velocity = 20;
	aBall.gravity = 2;
	score = 0;
	collumn = 1;
	t = 0;

	for (var i = obstacle.length - 1; i >= 0; i--)
	{
		obstacle[i].x = 200 * (i + 2);
		obstacle[i].height_bottom = Math.floor(Math.random() * 200 + 400);
		obstacle[i].height_top = obstacle[i].height_bottom - 200;
	}

	draw(aBall, obstacle);
}

function jump()
{
	if(finished == false)
	{
		finished = true;
		var id = setInterval(frame, 30);
		function frame()
		{
			if(GameOver())
			{
				EndGame();
				clearInterval(id);
			}else{
				cont.innerHTML = score;
				update2(obstacle);
				update(aBall, t);
				draw(aBall, obstacle);
				if(obstacle[collumn - 1].x + 50 == 200)
					++score;
				if(obstacle[collumn - 1].x + 100 + 10 == 200)
					++collumn;
				if(collumn > obstacle.length)
					collumn = 1;
				++t;
			}
		}

		function EndGame()
		{
			if(obstacle[collumn - 1].x <= 200 && obstacle[collumn - 1].x >= 100)
			{
				if(aBall.velocity_up - aBall.gravity * t < 0)
					t = aBall.velocity_up + Math.sqrt(aBall.velocity_up**2 - 4 * (aBall.height - obstacle[collumn - 1].height_bottom + 10));
				else
					t = aBall.velocity_up + Math.sqrt(aBall.velocity_up**2 - 4 * (aBall.height - obstacle[collumn - 1].height_top - 10));
				t /= 2;
				aBall.cur_height = aBall.height - aBall.velocity_up * t + 0.5 * aBall.gravity * t**2;
				draw(aBall, obstacle);
			}
		}

		function GameOver()
		{
			//before enter tube
			if(aBall.cur_height >= obstacle[collumn - 1].height_bottom)
			{
				if(aBall.cur_height > obstacle[collumn - 1].height_bottom + 2*black_width + top_width)
				{
					if(aBall.cur_height >= 790)
						return true;

					if(200 + 10 >= obstacle[collumn - 1].x + 5)
						return true;
				}else{
					if(200 + 10 >= obstacle[collumn - 1].x)
						return true;

					var dis = (aBall.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x - 200)**2;
					if(dis <= 100)
						return true;

					dis = (aBall.cur_height - (obstacle[collumn - 1].height_bottom + 2*black_width + top_width))**2 + (obstacle[collumn - 1].x - 200)**2;
					if(dis <= 100)
						return true;
				}
			}else{
				if(aBall.cur_height <= obstacle[collumn - 1].height_top)
				{
					if(aBall.cur_height < obstacle[collumn - 1].height_bottom - 2*black_width - top_width)
					{
						if(aBall.cur_height <= 10)
							return true;

						if(200 + 10 >= obstacle[collumn - 1].x + 5)
							return true;
					}else{
						if(200 + 10 >= obstacle[collumn - 1].x)
							return true;

						var dis = (aBall.cur_height - obstacle[collumn - 1].height_top)**2 + (obstacle[collumn - 1].x - 200)**2;
						if(dis <= 100)
							return true;

						dis = (aBall.cur_height - (obstacle[collumn - 1].height_top + 2*black_width + top_width))**2 + (obstacle[collumn - 1].x - 200)**2;
						if(dis <= 100)
							return true;
					}
				}else{
					if(200 >= obstacle[collumn - 1].x && 200 <= obstacle[collumn - 1].x + 100)
					{
						if(aBall.cur_height + 10 >= obstacle[collumn - 1].height_bottom || aBall.cur_height - 10 <= obstacle[collumn - 1].height_top)
							return true;

						var dis = (aBall.cur_height - obstacle[collumn - 1].height_top)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= 100)
							return true;

						dis = (aBall.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= 100)
							return true;
					}

					if(200 - 10 < obstacle[collumn - 1].x + 100)
						var dis = (aBall.cur_height - obstacle[collumn - 1].height_bottom)**2 + (obstacle[collumn - 1].x + 100 - 200)**2;
						if(dis <= 100)
							return true;
				}
			}

			//after enter tube


			return false;
		}

		function update(object)
		{
			object.cur_height = object.height - object.velocity_up * t + 0.5 * object.gravity * t**2;
			object.cur_velocity = object.velocity_up - object.gravity * t;
		}

		function update2(object)
		{
			for (var i = object.length - 1; i >= 0; i--) {
				object[i].x -= 5;

				if(object[i].x == -200)
				{
					object[i].height = Math.floor(Math.random() * 200 + 400);
					object[i].x = 800;
				}
			}
		}
	}
}