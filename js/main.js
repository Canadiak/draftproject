let drawBullets = function(){
	for (let i in Bullet.list){
		
		Bullet.list[i].update();
		//console.log(Bullet.list[i].spdY);
		Bullet.list[i].draw();
		if(Bullet.list[i].toRemove){
			Bullet.list.splice(i, 1);
		}
	}
	
	for (let i in enemyBullet.list){
		enemyBullet.list[i].update();
		//console.log(Bullet.list[i].spdY);
		enemyBullet.list[i].draw();
		if(enemyBullet.list[i].toRemove){
			enemyBullet.list.splice(i, 1);
		}
	}
}

let drawEnemies = function(){
	for (let i in Enemy.list){
		
		Enemy.list[i].update();
		//console.log(Bullet.list[i].spdY);
        //console.log(Enemy.list[i].img);
		Enemy.list[i].draw();
		if(Enemy.list[i].toRemove){
			Enemy.list.splice(i, 1);
		}
	}
}

let updateStats = function(){
	
	ctx.font = "20px Arial";
	ctx.fillText("Enemies Defeated: " + enemiesKilled, 10, 30);
	ctx.fillText("healthPoints: " + healthPoints, 10, 60);
	
}

let drawMainGame = function(){
	drawWithOffset(mapImg, 0, 0);
	drawObstacles();
	player1.update();
	if (player1.x >= 300 && player1.x <= 900){
		offsetX = player1.x - 500;
	}
	
	if (player1.y >= 200){
		//We want the Y position to be 300 units down, except when y is greater than 200
		offsetY = player1.y - 300;
	}
	
	player1.draw();
	drawEnemies();
	updateStats();
	drawBullets();
	
}

let drawUpgradeScreen = function(){
	upgradeScreenNotDrawn = false;
	ctx.clearRect(0,0,boardHeight,boardWidth);
	ctx.font = "50px Arial";
	ctx.fillText("Level up! Choose an upgrade!", 50, 70);
	
	arrayOfUpgradeChoices = [];
	while(arrayOfUpgradeChoices.length < 3){
		
		let randomUpgradeChoice = Math.floor(Math.random()*numOfUpgradeChoices);
			if (!arrayOfUpgradeChoices.includes(randomUpgradeChoice)){
				arrayOfUpgradeChoices.push(randomUpgradeChoice);
			} 
		
	}
	
	for(let counter = 0; counter < 3; counter++){
		upgradeFunctions[counter] = upgradeFunctionsStored[arrayOfUpgradeChoices[counter]];
	}
	
	ctx.drawImage(arrayOfUpgradeImages[arrayOfUpgradeChoices[0]], 50, upgradeImageStartingY);
	ctx.drawImage(arrayOfUpgradeImages[arrayOfUpgradeChoices[1]], 300, upgradeImageStartingY);
	ctx.drawImage(arrayOfUpgradeImages[arrayOfUpgradeChoices[2]], 550, upgradeImageStartingY);
	
}

let drawObstacles = function(){
	
	drawWithOffset(blocker1Img, 200, 200);
	drawWithOffset(blocker2Img, 600, 600);
	
}

let spawnBoss1 = function(){
	enemySpawn = false;
	for (i in Enemy.list){
		let enemy = Enemy.list[i];
		enemy.toRemove = true;
		
	}	
	for (i in enemyBullet.list){
		let enemyBulleter = enemyBullet.list[i];
		enemyBulleter.toRemove = true;
		
	}
	for (i in Bullet.list){
		let bulleter = Bullet.list[i];
		bulleter.toRemove = true;
		
	}
	boss1 = new boss1();
	boss1.x = 0;
	boss1.y = 1000;
	document.getElementById("Body").style.backgroundColor = 'red';
	
	drawMainGame();
	boss1Spawned = true;
}

let delayerFunc = function(){
	delayer = false;
}

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, boardWidth*4, boardHeight*4);

setInterval(function(){
	//main game
	if (gameScreen == 0){
		ctx.clearRect(0,0,boardHeight,boardWidth);
		//ctx.fillStyle = "#00FF00";
		//ctx.fillRect(0, 0, boardWidth, boardHeight);
		if(enemySpawn){
			spawnEnemyRandomTime();
			//spawnEnemy(50, 50, 3);
			//enemySpawn = false;
		}
		drawMainGame();
		
		if(levelUpCounter <= 0){
			levelUpCounter = levelUpIncrement;
			levelUpIncrement += 15;
			gameScreen = 3;
			drawUpgradeScreen();
			enemyBaseHealth += 0.5;
		}
		if (healthPoints <= 0){
			gameScreen = 2;
			if (enemiesKilled > highscore){
				
				highscore = enemiesKilled;
				localStorage.setItem("High Score", highscore);
			}
		}
		
		if (enemiesKilled > 30 && !boss1Killed && !boss1Spawned){
			
			spawnBoss1();
			
		}
		
	}
	//Game Over
	else if (gameScreen == 2){
	
		ctx.clearRect(0,0,boardHeight,boardWidth);
		ctx.font = "50px Arial";
		ctx.fillText("Game Over", 50, 150);
		ctx.fillText("Enemies Defeated: " + enemiesKilled, 50, 300);
		ctx.fillText("Highscore: " + highscore, 50, 450);
	}
	//Level up
	else if (gameScreen == 3){
		
	}
}, 10); 