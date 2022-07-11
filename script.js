const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameaAea = document.querySelector(".gameaAea ");



startScreen.addEventListener('click', start);

let player = { speed : 5, score : 0};
let hits = new Audio();
let bg = new Audio();

hits.src = "sounds/hit.mp3";
bg.src = "sounds/bg.mp3";

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


let keys = { 
	ArrowUp : false,
	ArrowDown : false,
	ArrowRight : false,
	ArrowLeft : false,
}


function keyDown(e){
	e.preventDefault();
	keys[e.key] = true;
}

function keyUp(e){
	e.preventDefault();
	if(e.keyCode === 13){
		startScreen.click();
	}
	keys[e.key] = false;
}

function isCollied(a,b){
	aRect = a.getBoundingClientRect();
	bRect = b.getBoundingClientRect();

	return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom)
			 || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

 

function sppedUp(){
	if(player.score === 500){
		player.speed = 6
	}
	else if(player.score === 1200){
		player.speed = 7
	}
	else if(player.score === 1500){
		player.speed = 8
	}
	else if(player.score === 2000){
		player.speed = 9
	}
	else if(player.score === 2800){
		player.speed = 10
	}
}

function movelines(){
	let lines = document.querySelectorAll('.roadlines');

	lines.forEach(function(item){
		if(item.y >= 700){
			item.y -= 750;
		}
		item.y += player.speed;
		item.style.top = item.y + "px";
	})
}

function endGame(){
	hits.play();
	player.start = false;
	startScreen.classList.remove('hide');
	startScreen.innerHTML = "Game over <br> Your final score is : " 
							+ player.score + "<br>Press enter or Click here to restart the game";
}

function movecars(car){
	let enemycar = document.querySelectorAll('.enemycar');

	enemycar.forEach(function(item){
		if(isCollied(car,item)){
			endGame();
			
		}
		if(item.y >= 750){
			item.y = -300;
		item.style.left = Math.floor(Math.random() *350) + "px";

		}
		item.y += player.speed;
		item.style.top = item.y + "px";
	})
}	

function gamePlay(){
	let car = document.querySelector('.car');
	let road = gameaAea.getBoundingClientRect();
	if(player.start){
		movelines();
		movecars(car);
		sppedUp();
		bg.play();
		if(keys.ArrowUp && player.y > (road.top + 70)){ player.y -= player.speed }
		if(keys.ArrowDown && player.y < (road.bottom - 135)){ player.y += player.speed }
		if(keys.ArrowLeft && player.x >0){ player.x -= player.speed }
		if(keys.ArrowRight && player.x < (road.width - 92)){ player.x += player.speed }

		car.style.top = player.y + "px";	
		car.style.left = player.x + "px";	

		window.requestAnimationFrame(gamePlay);
		player.score++
		let ps = player.score - 1;
		score.innerText = "Your Score : " + ps;
	}
}

function start(){
	startScreen.classList.add('hide');
	gameaAea.innerHTML = "";
	player.start = true;
	player.score = 0;
	window.requestAnimationFrame(gamePlay);

	let car = document.createElement('div');
	car.setAttribute('class','car');
	gameaAea.appendChild(car);

	for(x=0; x<5; x++){
		let roadlines = document.createElement('div');
		roadlines.setAttribute('class','roadlines');
		roadlines.y = (x*150);
		roadlines.style.top = roadlines.y + "px";
		gameaAea.appendChild(roadlines);
	}
	
	player.x = car.offsetLeft;
	player.y = car.offsetTop;

	for(x=0; x<3; x++){
		let enemycar = document.createElement('div');
		enemycar.setAttribute('class','enemycar');
		enemycar.y = ((x+1) * 350) * -1;
		enemycar.style.top = enemycar.y + "px";
		enemycar.style.left = Math.floor(Math.random() *350) + "px";
		gameaAea.appendChild(enemycar);
	}
}