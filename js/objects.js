let Entity = function(){
	placeHolderImg = new Image();
	placeHolderImg.src = 'Images Folder/bULF.png';
	let self = {
		x:500,
		y:300,
		spdX:0,
		spdY:0,
		size:32,
		speedMultiplier:1,
		colour:"#FF106030",
		id:"",
		img:placeHolderImg,	
	}
	self.update = function(){
		self.updatePosition();
	}
	self.updatePosition = function(){
		
		
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
		
	}
	
	self.getDistance = function(pt){
		return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
	}
	
	self.draw = function(){
		width = self.img.width;
		height = self.img.height
		//self.x-width/2-offsetX
		//self.y-height/2-offsetY
		//ctx.drawImage(self.img, 0, 0, width, height, self.x-width/2-offsetX, self.y-height/2-offsetY, width, height);
		drawWithOffset(self.img, self.x-width/2, self.y-height/2);
	}
	
	return self;
}


let Player = function(){
	let self = Entity();
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.pressingAttack = false;
	self.specialMovePressing = false;
	self.defense = 0;
	self.numOfBullets = 1;
	self.specialMoveDamage = 0;
	self.img.src = 'Images Folder/blastoise.png';
	//self.mouseAngle = 0;
	self.maxSpd = 10;
	self.hp = 10;
	self.hpMax = 10;
	self.score = 0;
	self.colour = "#B0106030";
	self.attackDamage = 2;
	self.attackSpeedModifier = 0;
	let reloadTime = 100;
	let specialReload = 10000;
	let lastShot = new Date();
	let currentDate = new Date();
	let lastSpecialMove = new Date();
	
	var superUpdate = self.update;
	self.update = function(){
		self.updateSpd();
		superUpdate();
		reloadTime = 100 - 0.01*Math.log(enemiesKilled+1) - self.attackSpeedModifier;
		currentDate = new Date();
		if(self.pressingAttack && currentDate - lastShot > reloadTime){
			self.shootBullet(mouseAngle);
			lastShot = new Date();
		}
		
		if(self.specialMovePressing && currentDate - lastSpecialMove > specialReload){
			self.shootSpecialMove();
			lastSpecialMove = new Date();
		}
		var angleX = -self.x - canvasRect.x + mouseX + offsetX;
		//I have to have -20 there so it angles properly for some mysterious reason
		var angleY = -self.y - canvasRect.y + mouseY + offsetY-20;
	
		mouseAngle = Math.atan2(angleY,angleX) / Math.PI * 180; 
	}
	self.shootBullet = function(angle){
		let midPointX = self.x;
		let midPointY = self.y;
		let midBullet = self.numOfBullets/2;
		for (let counter = 0; counter < self.numOfBullets; counter++){
			let b = Bullet(angle, self.attackDamage);
			b.x = midPointX - 5*b.spdY*(counter - midBullet);
			b.y = midPointY - 5*b.spdX*(counter - midBullet);
		}
		
	}
	self.shootSpecialMove = function(){
		for(let counter = 0; counter < 36; counter++){
			self.shootBullet(counter*10);
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
	
	
	self.updateSpd = function(){
		
		if(self.pressingRight){
			
			self.spdX = self.maxSpd;
		}else if(self.pressingLeft){
			self.spdX = -self.maxSpd;
		}
		else{
			self.spdX = 0;
		}
		
		if(self.pressingUp){
			self.spdY = -self.maxSpd;
		}
		else if(self.pressingDown){
			self.spdY = self.maxSpd;
		}
		else{
			self.spdY = 0;		
		}
			
	}
	self.draw = function(){
		width = self.img.width;
		height = self.img.height
		if (self.x < 300){
			xModifier = (self.x - 300);
		}else if (self.x > 900){
			xModifier = (self.x - 900);
		}
		else{
			xModifier = 0;
		}
		if (self.y < 200){
			yModifier = (self.y - 200);
		//}else if (self.y > 900){
		//	yModifier = (self.y - 900);
		}
		else{
			yModifier = 0;
		} 
		ctx.drawImage(self.img, 500-width/2+xModifier, 300-height/2 + yModifier);
	
	}
	/* self.draw = function(){
		ctx.beginPath();
		ctx.rect(self.x-20, self.y-20, 40, 40);
		ctx.fillStyle = self.colour;
		ctx.fill();
		ctx.closePath();
	} */
	
	
	
	return self;
}


let mommaBullet = function(angle, damage){
	let self = Entity();
	self.spdX = Math.cos(angle/180*Math.PI) * 5;
	self.spdY = Math.sin(angle/180*Math.PI) * 5;
	self.damage = damage;
	//console.log(self.spdY);
	//console.log(self.spdX);
	self.img.src = 'Images Folder/dewgong.png';
	
	self.timer = 0;
	self.toRemove = false;
	let superUpdate = self.update;
	self.update = function(){
		superUpdate();
		self.timer++;
		
		if(self.timer++ > 1000)
			self.toRemove = true;
		
		if (self.x <= 0){
			self.toRemove = true;
		}
		if (self.x >= boardWidth){
			self.toRemove = true;
		}
		if (self.y >= boardHeight){
			self.toRemove = true;
		} 
		if (self.y <= 0){
			self.toRemove = true;
		} 
	}
	
	
	return self;
}

let Bullet = function(angle, damage){
	let self = mommaBullet();
	
	self.spdX = Math.cos(angle/180*Math.PI) * 5;
	self.spdY = Math.sin(angle/180*Math.PI) * 5;
	self.damage = damage;
	//console.log(self.spdY);
	//console.log(self.spdX);
	self.img.src = 'Images Folder/dewgong.png';
	
	self.timer = 0;
	self.toRemove = false;
	
	let superUpdate = self.update;
	self.update = function(){
		superUpdate();
		
		for(let i in Enemy.list){
			let enemy = Enemy.list[i];
			if(self.getDistance(enemy) < enemy.size){
				enemy.hp -= damage;
				
				self.toRemove = true;
			}
		}
		
		self.timer++;
		
		if(self.timer++ > 1000)
			self.toRemove = true;
		
		if (self.x <= 0){
			self.toRemove = true;
		}
		if (self.x >= boardWidth){
			self.toRemove = true;
		}
		if (self.y >= boardHeight){
			self.toRemove = true;
		} 
		if (self.y <= 0){
			self.toRemove = true;
		} 
		
	}
	
	Bullet.list.push(self);
	return self;
}




Bullet.list = [];

player1 = new Player();