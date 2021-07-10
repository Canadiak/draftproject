let spawnEnemy = function(xSpawn, ySpawn, typeOfEnemy){
	
	//spawnedEnemy = new Enemy();
	//console.log(xSpawn);
	if (typeOfEnemy == 1){
		spawnedEnemy = new midEnemy();
		spawnedEnemy.x = xSpawn;
		spawnedEnemy.y = ySpawn;
	} else if (typeOfEnemy == 2){
		spawnedEnemy = new fastEnemy();
		spawnedEnemy.x = xSpawn;
		spawnedEnemy.y = ySpawn;
	}else if (typeOfEnemy == 3){
		spawnedEnemy = new slowEnemy();
		spawnedEnemy.x = xSpawn;
		spawnedEnemy.y = ySpawn;
	}else  if (typeOfEnemy == 4){
		spawnedEnemy = new rangedEnemy();
		spawnedEnemy.x = xSpawn;
		spawnedEnemy.y = ySpawn;
	}else if (typeOfEnemy == 5){
		spawnedEnemy = new miniBoss1();
		spawnedEnemy.x = xSpawn;
		spawnedEnemy.y = ySpawn;
	}
}

let spawnEnemyRandomly = function(){
	
	let wall = Math.floor(Math.random()*4+1);
	/* let spawnX = Math.floor(Math.random()*boardWidth);
	let spawnY = Math.floor(Math.random()*boardHeight);
	while (Math.abs(spawnX - player1.x) + Math.abs(spawnY - player1.y) < 300){
		spawnX = Math.floor(Math.random()*boardWidth);
		spawnY = Math.floor(Math.random()*boardHeight);
	} */
	
	let spawnCoordinate = Math.floor(Math.random()*boardWidth);
	let spawnType = Math.floor(Math.random()*numOfTypesOfEnemies+1);
	if (wall == 1){
		spawnEnemy(spawnCoordinate, 0, spawnType);
	}
	else if (wall == 2){
		spawnEnemy(spawnCoordinate, 1000, spawnType);
	}
	else if (wall == 3){
		spawnEnemy( 0, spawnCoordinate, spawnType);
	}else if (wall == 4){
		spawnEnemy(1000, spawnCoordinate, spawnType);
	}
	
	
}

let spawnEnemyRandomTime = function(){
	let spawnRandomizer = Math.random();
	if (spawnRandomizer > 0.985 - 0.0015*Math.log(enemiesKilled+1)){
		spawnEnemyRandomly();
	}
}

let restartGame = function(){
	
	healthPoints = 100;
	enemiesKilled = 0;
	gameScreen = 0;
	player1.x = 500;
	player1.y = 500;
	offsetX = 500; //500;
	offsetY = 300; //300;
	xModifier = 0;
	yModifier = 0;
	boss1Killed = false;
	boss1Spawned = false;
	
	for (i in Enemy.list){
		let enemy = Enemy.list[i];
		enemy.toRemove = true;
		
	}	
	for (i in enemyBullet.list){
		let enemyBullet = enemyBullet.list[i];
		enemyBullet.toRemove = true;
		
	}
	for (i in Bullet.list){
		let bullet = Bullet.list[i];
		bullet.toRemove = true;
		
	}
	
	
}
//upgrade 1 boosts attack damage
let upgrade1 = function(){
	
	player1.attackDamage++;
	
}
//Atack speed upgrade
let upgrade2 = function(){
	
	player1.attackSpeedModifier += 10;
	
}

//healthPoints Upgrade
let upgrade3 = function(){
	
	healthPoints += 3;
	
}