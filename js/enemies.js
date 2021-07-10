let Enemy = function(){
	
	let self = Entity();
	self.hp = enemyBaseHealth;
	self.img.src = 'Images Folder/alakazam.png';
	self.toRemove = false;
	self.angleToPlayer = 0;
	self.damage = 1;
	let superUpdate = self.update;
	self.update = function(){
		superUpdate();
		let canvasRect = canvas.getBoundingClientRect();
		let xAngleToPlayer = -player1.x  + self.x;
		let yAngleToPlayer = -player1.y + self.y;
		self.angleToPlayer =  Math.atan2(yAngleToPlayer, xAngleToPlayer) / Math.PI * 180; 
		self.spdX = -Math.cos(self.angleToPlayer/180*Math.PI)*((enemiesKilled+100)/200);
		self.spdY = -Math.sin(self.angleToPlayer/180*Math.PI)*((enemiesKilled+100)/200);
		if(self.hp < 1){
			self.toRemove = true;
			enemiesKilled++;
			levelUpCounter -= 1;
		}
		
		if(self.getDistance(player1) < 32){
				let damager = self.damage - player1.defense;
				if (damager < 0){
					damager = 0;
				}
				healthPoints -= damager;
				self.toRemove = true;
		}
		
	}
	
	
	self.updatePosition = function(){
		
		let oldSpdX = self.spdX;
		let oldSpdY = self.spdY;
		
		if(isPositionWall(self.x+self.spdX, self.y)){
			self.spdX = 0;
		}
		if(isPositionWall(self.x, self.y+self.spdY)){
			self.spdY = 0;
		}
		
		self.x += self.spdX*self.speedMultiplier;
		self.y += self.spdY*self.speedMultiplier;
		
		if (self.x < 0){
			self.x = 0;
		}
		if (self.x > boardWidth){
			self.x = boardWidth;
		}
		if (self.y > boardHeight){
			self.y = boardHeight;
		} 
		if (self.y < 0){
			self.y = 0;
		} 
		
		self.spdX = oldSpdX;
		self.spdY = oldSpdY;
		
	}
	
	return self;
}

let midEnemy = function(){
	
	let self = Enemy();
	self.img.src = 'Images Folder/arbok.png';
	self.damage = 20;
	self.size = 60;
	Enemy.list.push(self);
	
	return self;
}


let fastEnemy = function(){
	
	let self = Enemy();
	self.speedMultiplier = 1.5;
	self.hp = enemyBaseHealth*0.2;
	self.damage = 10;
	self.img.src = 'Images Folder/arcanine.png';
	
	Enemy.list.push(self);
	
	return self;
}


let miniBoss1 = function(){
	
	let self = Enemy();
	self.speedMultiplier = 4;
	self.hp = enemyBaseHealth;
	self.damage = 5;
	self.img.src = 'Images Folder/articuno.png';
	
	Enemy.list.push(self);
	
	return self;
}

let slowEnemy = function(){
	
	let self = Enemy();
	self.speedMultiplier = 0.5;
	self.hp = enemyBaseHealth*3;
	self.size = 100;
	self.damage = 30;
	self.img.src = 'Images Folder/beedrill.png';
	
	Enemy.list.push(self);
	
	return self;
	
}

let boss1 = function(){
	
	let self = Enemy();
	self.speedMultiplier = 0.8;
	self.hp = 20;
	self.size = 150;
	self.img.src = 'Images Folder/bellsprout.png';
	
	let superUpdate = self.update;
	self.update = function(){
		superUpdate();
		let canvasRect = canvas.getBoundingClientRect();
		let xAngleToPlayer = -player1.x  + self.x;
		let yAngleToPlayer = -player1.y + self.y;
		self.angleToPlayer =  Math.atan2(yAngleToPlayer, xAngleToPlayer) / Math.PI * 180; 
		self.spdX = -Math.cos(self.angleToPlayer/180*Math.PI)*((enemiesKilled+100)/200);
		self.spdY = -Math.sin(self.angleToPlayer/180*Math.PI)*((enemiesKilled+100)/200);
		if(self.hp < 1){
			self.toRemove = true;
			enemiesKilled++;
			levelUpCounter -= 1;
			boss1Killed = true;
			enemySpawn = true;
			document.getElementById("Body").style.backgroundColor = '#155e96';
		}
		
		if(self.getDistance(player1) < 32){
				healthPoints -= self.damage;
		}
		
		self.spawnRandomizer = Math.random();
		self.spawnX = Math.floor(Math.random()*200);
		self.spawnY = Math.floor(Math.random()*200);
		if (self.spawnRandomizer > 0.99 - 0.01*Math.log(enemiesKilled+1)){
			spawnEnemy(self.x-100+self.spawnX, self.y-100+self.spawnY, 5);
		}
		self.shootBullet(self.angleToPlayer);
		
		
	}
	
	self.shootBullet = function(angle){
		
		let shootRandomizer = Math.random();
		if (shootRandomizer > 0.99){
			let b = enemyBullet(angle, 1);
			b.x = self.x+b.spdX*10;
			b.y = self.y+b.spdY*10;
		}
		
	}
	
	
	
	
	
	Enemy.list.push(self);
	
	return self;
	
}



let rangedEnemy = function(){
	
	let self = Enemy();
	self.speedMultiplier = 0.5;
	self.hp = 1;
	self.damage = 5;
	self.img.src = 'Images Folder/diglett.png';
	let superUpdate = self.update;
	self.update = function(){
		superUpdate();
		
		
		if(self.getDistance(player1) < 400){
				self.spdX = 0;
				self.spdY = 0;
				
			}
			
		if (self.spdX == 0 && self.spdY == 0){
			self.shootBullet(self.angleToPlayer);
		}
	}
	
	
	self.shootBullet = function(angle){
		
		let shootRandomizer = Math.random();
		if (shootRandomizer > 0.99){
			let b = enemyBullet(angle, 1);
			b.x = self.x+b.spdX*10;
			b.y = self.y+b.spdY*10;
			b.damage = self.damage
		}
		
	}
	
	
	Enemy.list.push(self);
	
	return self;
	
}

let enemyBullet = function(angle, damage){
	let self = mommaBullet();
	
	self.spdX = -Math.cos(angle/180*Math.PI) * 2;
	self.spdY = -Math.sin(angle/180*Math.PI) * 2;
	self.damage = damage;
	
	self.img.src = 'Images Folder/ditto.png';
	
	let superUpdate = self.update;
	self.update = function(){
		superUpdate();
		if(self.getDistance(player1) < player1.size){
				healthPoints -= damage;
				
				self.toRemove = true;
		}
	}
	enemyBullet.list.push(self);
	
	return self;
}
enemyBullet.list = [];

Enemy.list = [];