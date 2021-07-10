let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let mouseAngle = [];
let enemySpawn = true; 
//let enemySpawn = false;

const boardHeight = 1000;
const boardWidth = 1000;
const tileSize = 50;

let healthPoints = 100;
let enemiesKilled = 0;
let gameScreen = 0;
let numOfTypesOfEnemies = 4;
let boss1Killed = false;
let boss1Spawned = false;
let delayer = true;


let offsetX = 500; //500;
let offsetY = 300 //300;
let xModifier = 0;
let yModifier = 0;
let canvasRect = canvas.getBoundingClientRect();
let mouseY = 0;
let mouseX = 0;

if (localStorage.key(0) == null){
	
	localStorage.setItem("High Score", 0);
}
let highscore = localStorage.getItem("High Score");



let upgradeImageDimension = 200;
let upgradeImageStartingY = 150;
let upgradeImagePaddingX = 50;
let enemyBaseHealth = 10;


mapImg = new Image();
mapImg.src = 'Images Folder/map.jpg';


mapArray = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //6
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //8
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //11
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], //13
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], //14
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], //15
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], //16
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //17
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //18
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //19
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];//20


isPositionWall = function(x, y){	
		let gridX = Math.floor(x / tileSize);
		let gridY = Math.floor(y / tileSize);
		
		if (gridX < 0 || gridX >= mapArray[0].length)
			return true;
		if (gridY < 0 || gridY >= mapArray.length)
			return true;
		return mapArray[gridY][gridX];
}


blocker1Img = new Image();
blocker1Img.src = 'Images Folder/abra.png';

blocker2Img = new Image();
blocker2Img.src = 'Images Folder/aerodactyl.png';


let drawWithOffset = function(img, x, y){
	
	ctx.drawImage(img, x-offsetX, y-offsetY);
}