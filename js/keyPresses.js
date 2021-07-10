

document.onmousedown = function(event){
	if (gameScreen == 0){
		player1.pressingAttack = true;
	}else if(gameScreen == 3){
		if(event.clientY > upgradeImageStartingY+canvasRect.y && event.clientY < upgradeImageStartingY + +canvasRect.y+ upgradeImageDimension){
			
			//Click on first upgrade
			if(event.clientX > upgradeImagePaddingX + canvasRect.x && event.clientX < upgradeImagePaddingX + upgradeImageDimension + canvasRect.x){
				//console.log("Check 3");
				upgradeFunctions[0]();
				gameScreen = 0;
			}
			//Click on second upgrade
			else if (event.clientX > 2*upgradeImagePaddingX + upgradeImageDimension + canvasRect.x && event.clientX < 2*upgradeImagePaddingX + 2*upgradeImageDimension + canvasRect.x){
				
				upgradeFunctions[1]();
				gameScreen = 0;
			}
			//Click on third upgrade
			else if (event.clientX > 3*upgradeImagePaddingX + 2*upgradeImageDimension + canvasRect.x && event.clientX < 3*upgradeImagePaddingX + 3*upgradeImageDimension + canvasRect.x){
				
				upgradeFunctions[2]();
				gameScreen = 0;
			}
			
		}
		
	}
		
}
document.onmouseup = function(event){
	player1.pressingAttack = false;
}
document.onmousemove = function(event){
	
	
	//Get the angle of the mouse relative to the player character. The character's position has to have the corner of the box added to it.
	//gets the mouse position to pass to the player object so it can know
	//in the player moves without mouse moving and aiming needs to update
	mouseX = event.clientX;
	mouseY = event.clientY;
	x = -player1.x - canvasRect.x + event.clientX + offsetX;
	
	y = -player1.y - canvasRect.y + event.clientY + offsetY-20;
	
	mouseAngle = Math.atan2(y,x) / Math.PI * 180; 
}

document.onkeydown = function(event){
	
	if(event.keyCode === 68){	//d
		player1.pressingRight = true;
	}
	if(event.keyCode === 83){	//s
		player1.pressingDown = true;
	}
	if(event.keyCode === 65){ //a
		player1.pressingLeft = true;
	}
	if(event.keyCode === 87) { // w
		player1.pressingUp = true;
	}
	if(event.keyCode === 81) { // q
		if (enemySpawn){
			enemySpawn = false;
		}else{
			enemySpawn = true;
		}
	}
	
	if(event.keyCode === 32) { // Space
		if (specialMove){
			player1.specialMovePressing = true;
		}
				
	}
	
	if(event.keyCode === 69){	//e
		console.log("Y position of mouse: " + event.clientY);
		console.log("X position of mouse: " + event.clientX);
	}
}
document.onkeyup = function(event){
	if(event.keyCode === 68){	//d
		player1.pressingRight = false;
	}
	if(event.keyCode === 83){	//s
		player1.pressingDown = false;
	}
	if(event.keyCode === 65){ //a
		player1.pressingLeft = false;
	}
	if(event.keyCode === 87) { // w
		player1.pressingUp = false;
	}
	
	if(event.keyCode === 32) { // Space
		if (specialMove){
			player1.specialMovePressing = false;
		}
				
	}
}