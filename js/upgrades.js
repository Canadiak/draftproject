let upgradeScreenNotDrawn = true;
let levelUpCounter = 10;
let levelUpIncrement = 10;
let numOfUpgradeChoices = 7;
let arrayOfUpgradeImages = [];
let arrayOfUpgradeChoices = []; //This stores the random numbers that represent the upgrade choices for that level up
let upgradeFunctionsStored = []; //This holds every upgrade function
let specialMove = false;
let upgradeFunctions = []; //This holds the upgrade functions for that level up

attackDamageUpgradeImg = new Image();
attackDamageUpgradeImg.src = 'Images Folder/bulbasaur.png';
arrayOfUpgradeImages.push(attackDamageUpgradeImg);

let attackDamageUpgradeFunction = function(){
	player1.attackDamage++;
}
upgradeFunctionsStored.push(attackDamageUpgradeFunction);

attackSpeedUpgradeImg = new Image();
attackSpeedUpgradeImg.src = 'Images Folder/butterfree.png';
arrayOfUpgradeImages.push(attackSpeedUpgradeImg);

let attackSpeedUpgradeFunction = function(){
	player1.attackSpeedModifier += 10;
}
upgradeFunctionsStored.push(attackSpeedUpgradeFunction);

healthPointsUpgradeImg = new Image();
healthPointsUpgradeImg.src = 'Images Folder/caterpie.png';
arrayOfUpgradeImages.push(healthPointsUpgradeImg);

let healthPointsUpgradeFunction = function(){
	healthPoints += 30;
}
upgradeFunctionsStored.push(healthPointsUpgradeFunction);

movementSpeedUpgradeImg = new Image();
movementSpeedUpgradeImg.src = 'Images Folder/chansey.png';
arrayOfUpgradeImages.push(movementSpeedUpgradeImg);

let movementSpeedUpgradeFunction = function(){
	player1.maxSpd += 3;
}
upgradeFunctionsStored.push(movementSpeedUpgradeFunction);

numberOfProjectilesImg = new Image();
numberOfProjectilesImg.src = 'Images Folder/charizard.png';
arrayOfUpgradeImages.push(numberOfProjectilesImg);

let numberOfProjectilesFunction = function(){
	player1.numOfBullets++;
}
upgradeFunctionsStored.push(numberOfProjectilesFunction);

defenseImg = new Image();
defenseImg.src = 'Images Folder/charmander.png';
arrayOfUpgradeImages.push(defenseImg);

let defenseUpgradeFunction = function(){
	player1.defense++;
}
upgradeFunctionsStored.push(defenseUpgradeFunction);

specialBurstMoveImg = new Image();
specialBurstMoveImg.src = 'Images Folder/charmeleon.png';
arrayOfUpgradeImages.push(specialBurstMoveImg);

let specialBurstMoveUpgradeFunction = function(){
	
	specialMove = true;
	player1.specialMoveDamage += 2;
}
upgradeFunctionsStored.push(specialBurstMoveUpgradeFunction);








