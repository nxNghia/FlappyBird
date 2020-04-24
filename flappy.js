var cv = document.getElementById("myCanvas");
var ctx = cv.getContext("2d");
var obs = cv.getContext("2d");
var cont = document.getElementById("score");
var obstacle = [];
var collumn = 1;
var score = 0;

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

ctx.beginPath();
for (var i = obstacle.length - 1; i >= 0; i--)
{
	ctx.fillStyle = "#000000";
	ctx.fillRect(obstacle[i].x + 5, obstacle[i].height_bottom + 48, 90, 800 - obstacle[i].height_bottom - 48);
	ctx.fillRect(obstacle[i].x, obstacle[i].height_bottom, 100, 48);
	ctx.fillRect(obstacle[i].x + 5, 0, 90, obstacle[i].height_top - 48);
	ctx.fillRect(obstacle[i].x, obstacle[i].height_top - 48, 100, 48);

	ctx.fillStyle = "#009900";
	ctx.fillRect(obstacle[i].x + 4, obstacle[i].height_bottom + 4, 100 - 8, 40);
	ctx.fillRect(obstacle[i].x + 4 + 5, obstacle[i].height_bottom + 4 + 44, 100 - 8 - 10, 800 - obstacle[i].height_bottom - 4 - 40);
	ctx.fillRect(obstacle[i].x + 4 + 5, 0, 82, obstacle[i].height_top - 8 - 40);
	ctx.fillRect(obstacle[i].x + 4, obstacle[i].height_top - 40 - 4 , 92, 40);
}
ctx.stroke();

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
		ctx.fillStyle = "#000000";
		ctx.fillRect(object2[i].x + 5, object2[i].height_bottom + 48, 90, 800 - object2[i].height_bottom - 48);
		ctx.fillRect(object2[i].x, object2[i].height_bottom, 100, 48);
		ctx.fillRect(object2[i].x + 5, 0, 90, object2[i].height_top - 48);
		ctx.fillRect(object2[i].x, obstacle[i].height_top - 48, 100, 48);
		
		ctx.fillStyle = "#009900";
		ctx.fillRect(object2[i].x + 4, object2[i].height_bottom + 4, 100 - 8, 40);
		ctx.fillRect(object2[i].x + 4 + 5, object2[i].height_bottom + 4 + 44, 100 - 8 - 10, 800 - object2[i].height_bottom - 4 - 40);
		ctx.fillRect(object2[i].x + 4 + 5, 0, 82, object2[i].height_top - 8 - 40);
		ctx.fillRect(object2[i].x + 4, object2[i].height_top - 40 - 4 , 92, 40);
	}
	ctx.stroke();
}

var t = 1;
document.onkeydown = function(envent)
{
	if(envent.keyCode == 32)
	{
		t = 1;
		aBall.cur_velocity = aBall.velocity_up;
		aBall.height = aBall.cur_height;
	}
}

var finished = false;

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
		var _frame = 0;
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
				if(obstacle[collumn - 1].x + 100 == 200)
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
				if(aBall.cur_velocity < 0)
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
			if(aBall.cur_height <= 10 || aBall.cur_height >= 780)
				return true;

			if(obstacle[collumn - 1].x >= 100 && obstacle[collumn - 1].x <= 200)
			{
				if(aBall.cur_height <= obstacle[collumn - 1].height_top + 10 || aBall.cur_height >= obstacle[collumn - 1].height_bottom - 10)
				{
					return true;
				}
			}else{
				if(aBall.cur_height >= obstacle[collumn - 1].height_bottom || aBall.cur_height <= obstacle[collumn - 1].height_top)
				{
					if(obstacle[collumn - 1].x - 5 <= 200)
					{
						return true;
					}
				}else{
					if(aBall.cur_height < obstacle[collumn - 1].height_bottom && aBall.cur_height > obstacle[collumn - 1].height_top)
					{
						var distance = (obstacle[collumn - 1].x - 200)**2 + (aBall.cur_height - obstacle[collumn - 1].height_bottom)**2;
						if(distance <= 100)
						{
							return true;
						}
						
						distance = (obstacle[collumn - 1].x - 200)**2 + (aBall.cur_height - obstacle[collumn - 1].height_top)**2;
						if(distance <= 100)
						{
							return true;
						}
					}
				}
			}
			if(collumn > 1)
			{
				var distance = (obstacle[collumn - 2].x + 100 - 200)**2 + (aBall.cur_height - obstacle[collumn - 2].height_bottom)**2;
				if(distance <= 100)
					return true;
				
				distance = (obstacle[collumn - 2].x + 100 - 200)**2 + (aBall.cur_height - obstacle[collumn - 2].height_top)**2;
				if(distance <= 100)
					return true;
			}else{
				var distance = (obstacle[4].x + 100 - 200)**2 + (aBall.cur_height - obstacle[4].height_bottom)**2;
				if(distance <= 100)
					return true;
				
				distance = (obstacle[4].x + 100 - 200)**2 + (aBall.cur_height - obstacle[4].height_top)**2;
				if(distance <= 100)
					return true;
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