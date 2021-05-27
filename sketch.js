
var canvas, ctx, self;

function playGame() {
	console.log("playGame");
	document.getElementById("mainPage").style.display = "none";
	document.getElementById("gameDivBackground").style.display = "block";
	document.getElementById("mainPage").style.height = "100%";

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	document.addEventListener("keydown", keyDownEvent);

	var snake = new Snake();
}

function openInfo() {
	console.log("showing info");
	document.getElementById("infoPanel").style.display = "block";

	var list = document.getElementsByClassName("menuElement");
	console.log(list);
	for (let i = 0; i < list.length; i++) {
		var el = list[i];
		console.log(el);
		el.style.display="none";
	}
}

function closeInfo() {
	console.log("closing info");
	document.getElementById("infoPanel").style.display = "none";

	var list = document.getElementsByClassName("menuElement");
	console.log(list);
	for (let i = 0; i < list.length; i++) {
		var el = list[i];
		console.log(el);
		el.style.display="block";
	}
}

function openPausePanel() {
	document.getElementById("darkBackground").style.display = "block";
	console.log("open pause panel");
	self.pause = true;
	let imgSrc = "play.png";
	document.getElementById("pausePanel").style.display = "block";
	document.getElementById("pauseButton").style.background = "url(" + imgSrc + ")" + " no-repeat";
	document.getElementById("pauseButton").style.backgroundOrigin = "border-box";
	document.getElementById("pauseButton").style.backgroundSize = "contain";
	document.getElementById("pauseButton").style.backgroundPosition = "50% 50%";
}

function closePausePanel() {
	closeGameSettings();
	document.getElementById("darkBackground").style.display = "none";

	console.log("close pause panel");
	self.pause = false;
	document.getElementById("pausePanel").style.display = "none";
	let imgSrc = "pause.png";
	document.getElementById("pauseButton").style.background = "url(" + imgSrc + ")" + " no-repeat";
	document.getElementById("pauseButton").style.backgroundOrigin = "border-box";
	document.getElementById("pauseButton").style.backgroundSize = "contain";
	document.getElementById("pauseButton").style.backgroundPosition = "50% 50%";

	if (self.lose) self.restart();
}

function openSettings(gameMode=true) {
	console.log("showing settings");
	document.getElementById("settingsPanel").style.display = "block";
	if (gameMode) {
		document.getElementById("settingsPanel").style.left = "50%";
		document.getElementById("settingsPanel").style.top = "50%";
		document.getElementById("settingsPanel").style.transform = "translate(-50%, -50%)";
		document.getElementById("settingsPanel").style.zIndex = "1000";
	}
}

function closeSettings() {
	console.log("closing settings");
	document.getElementById("settingsPanel").style.display = "none";
}

function openGameSettings() {
	document.getElementById("gameSettingsPanel").style.display = "block";
}

function closeGameSettings() {
	document.getElementById("gameSettingsPanel").style.display = "none";
}

var isEnglish = true;
function changeLanguage() {
	let src = document.getElementById("languageButton").src;
	console.log("changeLanguage", src);
	if (!isEnglish) {
		let imgSrc = '"english.png"';
		document.getElementById("languageButton").style.background = "url(" + imgSrc + ")" + " no-repeat";
		document.getElementById("languageButton").style.backgroundOrigin = "border-box";
		document.getElementById("languageButton").style.backgroundSize = "contain";
		document.getElementById("languageButton").style.backgroundPosition = "50% 50%";
		console.log(document.getElementById("languageButton").background);

		document.getElementById("siteInfo").innerHTML = "This site was created as an experiment to gain experience in the field of site layout. In the process, a semblance of the game menu and other user interface elements was created, as well as the well-known game 'Snake' was written. All written by one person, a student of the 8th grade - Rodion Zainurovich."
		document.getElementById("youWinSpan").innerHTML = "you win this game";
		document.getElementById("playButton").innerHTML = "play";
		document.getElementById("continueGame").innerHTML = "play";
	} else {
		console.log("english -> russian");
		let imgSrc = '"russian.png"';
		document.getElementById("languageButton").style.background = "url(" + imgSrc + ")" + " no-repeat";
		document.getElementById("languageButton").style.backgroundOrigin = "border-box";
		document.getElementById("languageButton").style.backgroundSize = "contain";
		document.getElementById("languageButton").style.backgroundPosition = "50% 50%";
		console.log(document.getElementById("languageButton").background);

		document.getElementById("siteInfo").innerHTML = "Данный сайт создан как некий эксперимент для получения опыта в сфере вёрстки сайтов. В процессе было создано подобие игрового меню и других элементов пользовательского интерфейса, а также написана всем известная игра 'Змейка'. Всё написанно одним человеком, учеником 8 класса - Родионом Айнуровичем.";
		document.getElementById("youWinSpan").innerHTML = "Вы выиграли";
		document.getElementById("playButton").innerHTML = "играть";
		document.getElementById("continueGame").innerHTML = "продолжить";
	}
	isEnglish = !isEnglish;

	if (self) {
		let text = self.gameModes[self.gameModeIndex];
		document.getElementById("gameModeSpan").style.fontSize = "60px";
		if (!isEnglish) {
			text = self.gameModesRus[self.gameModeIndex];
			document.getElementById("gameModeSpan").style.fontSize = "30px";
			console.log("change to RUS");
		}

		document.getElementById("gameModeSpan").innerHTML = text;
		document.getElementById("gameModeSpan").textContent = text;
	}
}

var isSound = true; var sound; var befVal;
function changeSound() {
	let docStyle = getComputedStyle(document.getElementById("settingsPanel"));
	console.log(document.getElementById("settingsPanel").clientWidth, docStyle, "Buttonw W", docStyle.getPropertyValue('--ButtonW'));
	let src = document.getElementById("muteButton").src;
	console.log("muteButton", src);
	if (!isSound) {
		sound.play();
		befVal = document.getElementById("muteSlider").value = befVal;
		console.log("mute -> sound");
		let imgSrc = '"soundButton.png"';
		document.getElementById("muteButton").style.background = "url(" + imgSrc + ")" + " no-repeat";
		document.getElementById("muteButton").style.backgroundOrigin = "border-box";
		document.getElementById("muteButton").style.backgroundSize = "contain";
		document.getElementById("muteButton").style.backgroundPosition = "50% 50%";
		console.log(document.getElementById("muteButton").background);
	} else {
		sound.pause();
		befVal = document.getElementById("muteSlider").value;
		document.getElementById("muteSlider").value = 0;
		console.log("sound -> mute");
		let imgSrc = '"muteButton.png"';
		document.getElementById("muteButton").style.background = "url(" + imgSrc + ")" + " no-repeat";
		document.getElementById("muteButton").style.backgroundOrigin = "border-box";
		document.getElementById("muteButton").style.backgroundSize = "contain";
		document.getElementById("muteButton").style.backgroundPosition = "50% 50%";
		console.log(document.getElementById("muteButton").background);
	}
	isSound = !isSound;
}


function backToMenu() {
	document.getElementById("mainPage").style.display = "block";
	document.getElementById("gameDivBackground").style.display = "none";
	document.getElementById("settingsPanel").style.display = "none";

	let w = document.getElementById("playButton").clientWidth / 4;
	console.log("w : ", document.getElementById("menuPanel").style.height, w);
	let word = String(w);
	document.getElementById("playButton").style.fontSize = word + "px";

	w = document.getElementById("infoButtonContent").clientWidth * 0.9;
	console.log("info button width : ", w);
	word = String(w);
	document.getElementById("infoButtonContent").style.fontSize = word + "px";
}

function increaseColor() {
	console.log("increase color");
	self.colorIndex++;
	self.colorIndex = (self.colors.length + self.colorIndex) % self.colors.length;

	document.getElementById("colorMode").style.backgroundColor = self.colors[self.colorIndex];
}

function decreaseColor() {
	console.log("decreaseColor");
	self.colorIndex--;
	self.colorIndex = (self.colors.length + self.colorIndex) % self.colors.length;

	document.getElementById("colorMode").style.backgroundColor = self.colors[self.colorIndex];
}

function increaseFood() {
	console.log("increaseFood");
	self.foodIndex++;
	self.foodIndex = (self.food.length + self.foodIndex) % self.food.length;

	let imgSrc = "'" + self.food[self.foodIndex] + "'";
	document.getElementById("foodMode").style.background = "url(" + imgSrc + ")" + " no-repeat";
	document.getElementById("foodMode").style.backgroundOrigin = "border-box";
	document.getElementById("foodMode").style.backgroundSize = "contain";
	document.getElementById("foodMode").style.backgroundPosition = "50% 50%";

	imgSrc = self.food[self.foodIndex];
	document.getElementById("foodScore").style.background = "url(" + imgSrc + ")" + " no-repeat";
	document.getElementById("foodScore").style.backgroundOrigin = "border-box";
	document.getElementById("foodScore").style.backgroundSize = "contain";
	document.getElementById("foodScore").style.backgroundPosition = "50% 50%";
}

function decreaseFood() {
	console.log("decreaseFood");
	self.foodIndex--;
	self.foodIndex = (self.food.length + self.foodIndex) % self.food.length;

	let imgSrc = "'" + self.food[self.foodIndex] + "'";
	document.getElementById("foodMode").style.background = "url(" + imgSrc + ")" + " no-repeat";
	document.getElementById("foodMode").style.backgroundOrigin = "border-box";
	document.getElementById("foodMode").style.backgroundSize = "contain";
	document.getElementById("foodMode").style.backgroundPosition = "50% 50%";

	imgSrc = self.food[self.foodIndex];
	document.getElementById("foodScore").style.background = "url(" + imgSrc + ")" + " no-repeat";
	document.getElementById("foodScore").style.backgroundOrigin = "border-box";
	document.getElementById("foodScore").style.backgroundSize = "contain";
	document.getElementById("foodScore").style.backgroundPosition = "50% 50%";
}

function increaseMode() {
	self.gameModeIndex++;
	self.gameModeIndex = (self.gameModeIndex + self.gameModes.length) % self.gameModes.length;

	let text = self.gameModes[self.gameModeIndex];
	document.getElementById("gameModeSpan").style.fontSize = "60px";
	if (!isEnglish) {
		text = self.gameModesRus[self.gameModeIndex];
		document.getElementById("gameModeSpan").style.fontSize = "30px";
	}

	document.getElementById("gameModeSpan").innerHTML = text;
	document.getElementById("gameModeSpan").textContent = text;
}

function decreaseMode() {
	self.gameModeIndex--;
	self.gameModeIndex = (self.gameModeIndex + self.gameModes.length) % self.gameModes.length;

	let text = self.gameModes[self.gameModeIndex];
	document.getElementById("gameModeSpan").style.fontSize = "60px";
	if (!isEnglish) {
		text = self.gameModesRus[self.gameModeIndex];
		document.getElementById("gameModeSpan").style.fontSize = "30px";
	}

	document.getElementById("gameModeSpan").innerHTML = text;
	document.getElementById("gameModeSpan").textContent = text;
}

function changeGameSize() {
	console.log("increase game size");
	self.gameSize++;
	self.gameSize = self.gameSize % 3;

	let src;
	let canvasW = parseInt(document.getElementById("canvas").clientWidth);
	if (self.gameSize == 0) {
		self.gridSize = 6;
		src = "mouse.webp";
	}
	if (self.gameSize == 1) {
		self.gridSize = 15;
		src = "hippo.png";
	}
	if (self.gameSize == 2) {
		self.gridSize = 30;
		src = "whale.png";
	}
	self.tileSize = canvasW / self.gridSize;

	document.getElementById("gameSizeButton").style.background = "url(" + src + ")" + " no-repeat";
	document.getElementById("gameSizeButton").style.backgroundOrigin = "border-box";
	document.getElementById("gameSizeButton").style.backgroundSize = "contain";
	document.getElementById("gameSizeButton").style.backgroundPosition = "50% 50%";
}

function showWinPanel() {
	openPausePanel();
	document.getElementById("youWinPanel").style.display = "block";
	setTimeout(function() {
		document.getElementById("youWinPanel").style.display = "none";
	}, 2000);
}




/*				Game part				*/

class Snake {
	constructor() {
		self = this;
		console.log(self instanceof Snake, self);
		self.gridSize = 15; self.tileSize = 60;
		self.nextX = self.nextY = 0;
		self.startX = Math.floor(self.gridSize / 2);
		self.startY = self.startX;
		self.tail = [{x : self.startX, y : self.startY}];
		self.appleX = 0;
		self.appleY = 0;
		self.lose = false;
		self.score = 0;
		self.code = null;
		self.keys = [];
		self.pause = false;
		self.bestScore = 0;
		self.lastX = 0; self.lastY = 0;
		self.loop = true;

		self.gameSize = 1; // 0 - small (6), 1 - medium (15), 2- large (30)
		self.win = false;

		self.gameModes = ["classic", 'loopty-loop', 'endless'];
		self.gameModesRus = ["классика", "петли", "тренировка"];
		self.gameModeIndex = 0;

		self.colors = ['green', 'yellow', 'orange', 'white', 'black', 'purple'];
		self.headColor = ['orange', 'red', 'green', 'black', 'white', 'yellow'];
		self.colorIndex = 0;

		self.food = ['apple.png', 'grape.png', 'pineapple.png', 'banana.png', 'watermellon.png'];
		self.foodIndex = 0;
		self.foodImages = [];
		for (let i = 0; i < self.food.length; i++) {
			let src = self.food[i];
			let img = new Image();
			img.src = src;
			self.foodImages.push(img);
		}

		self.placeApple();
		self.frameRate = 60;
		self.deltaTime = 1 / self.frameRate;
		self.baseSpeed = 2;
		self.speed = self.baseSpeed;
		self.maxSpeed = 8;
		self.speedUp = [3, 6, 9, 15, 23, 30];
		setInterval(function() {
			self.draw();
		}, 1000 / self.frameRate);

		let canvasW = parseInt(document.getElementById("canvas").clientHeight);
		self.tileSize = canvasW / self.gridSize;
		console.log("canvasW : ", canvasW, document.getElementById("canvas").clientWidth);
		ctx = canvas.getContext('2d');
		let side = self.tileSize * self.gridSize;
		ctx.canvas.width = ctx.canvas.height = side;
		let w = String(side) + 'px';
		document.getElementById("gameDiv").style.width = w;
		document.getElementById("gameDivUp").style.width = w;
		let borderW = parseInt(getComputedStyle(document.getElementById("gameDivBackground")).getPropertyValue("--borderW"));
		let gameDivUpH = parseInt(getComputedStyle(document.getElementById("gameDivBackground")).getPropertyValue("--gameDivUpH"));
		let betweenCanvasUp = parseInt(getComputedStyle(document.getElementById("gameDivBackground")).getPropertyValue("--betweenCanvasUp"));
		let H = parseInt(document.getElementById("gameDiv").clientHeight);
		let allH = borderW * 4 + gameDivUpH + betweenCanvasUp + side;
		console.log(borderW, gameDivUpH, betweenCanvasUp, H, "allH : ", allH);
		w = String((H - allH) / 2) + 'px';
		document.getElementById("gameDivUp").style.top = w;
		w = String((H - allH) / 2 + gameDivUpH + borderW * 2 + betweenCanvasUp) + 'px';
		document.getElementById("canvas").style.top = w;
		console.log("top : ", w, "allH : ", allH, " H : ", H);

		self = this;

		let text = self.gameModes[self.gameModeIndex];
		document.getElementById("gameModeSpan").style.fontSize = "60px";
		if (!isEnglish) {
			text = self.gameModesRus[self.gameModeIndex];
			document.getElementById("gameModeSpan").style.fontSize = "30px";
			console.log("change to RUS");
		}

		document.getElementById("gameModeSpan").innerHTML = text;
		document.getElementById("gameModeSpan").textContent = text;
	}

	appleHitSnake(x, y) {
		for (let i = 0; i < self.tail.length; i++) {
			if (Math.abs(x - self.tail[i].x) < 0.1 && 
				Math.abs(y - self.tail[i].y) < 0.1) return true;
		}

		return false;
	}

	placeApple() {
		if (self.score >= self.gridSize * self.gridSize) {
			self.win = true;
			return;
		}
		//console.log("placing apple", self);
		let x, y;
		do {
			x = Math.floor(Math.random(ctx.width) * self.gridSize);
			y = Math.floor(Math.random(ctx.height) * self.gridSize);
		} while (self.appleHitSnake(x, y));

		self.appleX = x; self.appleY = y;
	}

	grow() {
		let ind = 0;
		let end = [{x: 0, y: 0}];
		Object.assign(end, self.tail[ind]);
		for (let i = 0; i < self.frameRate / self.speed; i++) 
			self.tail.unshift(end);

		self.score++; self.bestScore = Math.max(self.score, self.bestScore);
		let score = String(self.score);
		let bestScore = String(self.bestScore);
		document.getElementById("score").textContent = "score : " + score;
		document.getElementById("score").innerHTML = "score : " + score;
		document.getElementById("yourScoreSpan").textContent = score;
		document.getElementById("yourScoreSpan").innerHTML = score;
		document.getElementById("bestScoreSpan").textContent = bestScore;
		document.getElementById("bestScoreSpan").innerHTML = bestScore;

		for (let i = 0; i < self.speedUp.length; i++) {
			if (self.score > self.speedUp[i]) self.speed = self.baseSpeed + i + 1;
		}
		self.speed = Math.min(self.speed, self.maxSpeed);
	}

	update() {
		if (self.gameModeIndex == 1 || self.gameModeIndex == 2) self.loop = true;
		else self.loop = false;

		let ind = self.tail.length - 1;
		let head = [{x: 0, y: 0}];
		Object.assign(head, self.tail[ind]);
		self.tail.shift(); // delete last part of a snake

		head.x += self.nextX * self.speed * self.deltaTime;
		head.y += self.nextY * self.speed * self.deltaTime;

		if (self.loop) {
			let mi = -0.5;

			if (head.x > self.gridSize) head.x = mi;
			if (head.x < mi) head.x = self.gridSize;
			if (head.y < mi) head.y = self.gridSize;
			if (head.y > self.gridSize) head.y = mi;

			// if (self.nextX == 0 && head.x >= self.gridSize) head.x = self.gridSize - 1;
			// if (self.nextX == 0 && head.x <= mi) head.x = 0;
			// if (self.nextY == 0 && head.y >= self.gridSize) head.y = self.gridSize - 1;
			// if (self.nextY == 0 && head.y <= mi) head.y = 0;
		}

		if (Math.abs(head.x - Math.round(head.x)) < self.speed * self.deltaTime * 1.5 &&
			Math.abs(head.y - Math.round(head.y)) < self.speed * self.deltaTime * 1.5) {
			if (Math.abs(self.lastX - head.x) > 1 || Math.abs(self.lastY - head.y) >= 1) {
				if (self.keys.length > 0) {
					//console.log("rotate");
					if (head.x >= 0 && head.x <= self.gridSize &&
						head.y >= 0 && head.y <= self.gridSize) {
						let newX = Math.round(head.x);
						let newY = Math.round(head.y);
						if (newX < self.gridSize && newY < self.gridSize &&
							newX >= 0 && newY >= 0) {
							head.x = newX;
							head.y = newY;
							self.changeDir();
							self.lastX = head.x; self.lastY = head.y;
						}
					}
				}
			}
		}

		self.tail.push(head);
	}

	endGame() {
		if (self.gameModeIndex == 2) return;
		//return;
		let head = self.tail[self.tail.length - 1];
		//console.log(head.x, head.y);
		if (!self.loop && (head.x < 0 || head.x >= self.gridSize - 0.5 ||
			head.y < 0 || head.y >= self.gridSize - 0.5)) {
			//console.log("you lose!");
			self.lose = true;
			return true;
		}

		if (self.score < 2) return;

		for (let i = 0; i < self.tail.length - 1 - self.frameRate / self.speed; i++) {
			let part = self.tail[i];
			if (Math.abs(part.x - head.x) < 0.1 && Math.abs(part.y - head.y) < 0.1) {
				//console.log("you lose!", self.tail);
				self.lose = true;
				return true;
			}
		}
	}

	changeDir() {
		let nextX = 0; let nextY = 0;
		console.log("changeDir");
		if (self.tail.length > 0) console.log(self.tail[self.tail.length - 1].x, self.tail[self.tail.length - 1].y);
		let code = self.keys[0];
		self.keys.shift();
		// let code = self.code;
		switch (code) {
		  case 37:
		    nextX = -1;
		    nextY = 0;
		    break;
		  case 38:
		    nextX = 0;
		    nextY = -1;
		    break;
		  case 39:
		    nextX = 1;
		    nextY = 0;
		    break;
		  case 40:
		    nextX = 0;
		    nextY = 1;
		    break;
		}
		// self.code = null;

		if (nextX == nextY) return;
		if (self.score >= 1 && ((self.nextX == 1 && nextX == -1) || (self.nextX == -1 && nextX == 1) || 
			(self.nextY == 1 && nextY == -1) || (self.nextY== -1 && nextY == 1))) return;
		self.nextX = nextX;
		self.nextY = nextY;
	}

	restart() {
		console.log("restart");
		self.nextX = self.nextY = 0;
		self.startX = Math.floor(self.gridSize / 2);
		self.startY = self.startX;
		self.tail = [{x : self.startX, y : self.startY}];
		self.nextX = self.nextY = 0;
		self.keys = [];
		self.placeApple();
		self.lose = false;
		self.score = 0;
		let score = String(self.score);
		document.getElementById("score").textContent = "score : " + score;
		document.getElementById("score").innerHTML = "score : " + score;
		document.getElementById("yourScoreSpan").textContent = score;
		document.getElementById("yourScoreSpan").innerHTML = score;
		self.speed = self.baseSpeed;
	}

	draw() {
		if (self.win) {
			openPausePanel();
			return;
		}
		if (self.lose) {
			openPausePanel();
		}
		if (self.pause) return;
		ctx.fillStyle = "black";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	    ctx.fillStyle = "white";
	    for (let i = 0; i < self.gridSize; i++) {
	    	ctx.fillRect(0, i * self.tileSize, self.gridSize * self.tileSize, -1);
	    	ctx.fillRect(i * self.tileSize, 0, -1, self.gridSize * self.tileSize);
	    }

	    for (let i = 0; i < self.gridSize; i++) {
	    	for (let j = 0; j < self.gridSize; j++) {
	    		if ((i + j) % 2) ctx.fillStyle = "#90ee90"; // changed
	    		else ctx.fillStyle = "#77dd77";
	    		ctx.fillRect(j * self.tileSize, i * self.tileSize, self.tileSize, self.tileSize);
	    	}
	    }

	   	self.update();
	   	//console.log("draw");

	    if (Math.abs(self.tail[self.tail.length - 1].x - self.appleX) < 0.1 && 
	    	Math.abs(self.tail[self.tail.length - 1].y - self.appleY) < 0.1) {
			self.grow();
			self.placeApple();
		}

		// paint apple
		let img = self.foodImages[self.foodIndex];
		ctx.drawImage(img, self.appleX * self.tileSize, self.appleY * self.tileSize, self.tileSize, self.tileSize);

	    ctx.fillStyle = self.colors[self.colorIndex];
	    // console.log(self.tail.length);
	    let k = 0.7;
		for (let i = 0; i < self.tail.length; i++) {
			let part = self.tail[i];
			if (i == self.tail.length - 1) {
				ctx.fillStyle = self.headColor[self.colorIndex];
				ctx.beginPath();
				ctx.arc(part.x * self.tileSize + self.tileSize / 2, part.y * self.tileSize + self.tileSize / 2, self.tileSize * k / 2 * 1.2, 0, 2 * Math.PI, false);
				ctx.fill();
			} else {
				ctx.beginPath();
				ctx.arc(part.x * self.tileSize + self.tileSize / 2, part.y * self.tileSize + self.tileSize / 2, self.tileSize * k / 2, 0, 2 * Math.PI, false);
				ctx.fill();
			}
			//ctx.fillStyle = "green";
		}

		self.endGame();
	}
}

function changeVolume() {
	let val = document.getElementById("muteSlider").value;
	console.log("val : ", val);
	sound.volume = val / 100;

	if (!isSound) {
		befVal = val;
		changeSound();
	}
}

window.onload = function() {
	let w = document.getElementById("playButton").clientWidth / 4;
	let word = String(w);
	document.getElementById("playButton").style.fontSize = word + "px";

	w = document.getElementById("infoButtonContent").clientWidth * 0.9;
	console.log("info button width : ", w);
	word = String(w);
	console.log("word", word);
	document.getElementById("infoButtonContent").style.fontSize = word + "px";

	sound = new Audio();
	sound.src = "sandstorm.mp3";
	sound.autoplay = true;
	befVal = document.getElementById("muteSlider").value = 20;
	changeVolume();

	// showWinPanel();
}

window.onresize = function() {
	let w = document.getElementById("playButton").clientWidth / 4;
	console.log("w : ", document.getElementById("menuPanel").style.height, w);
	let word = String(w);
	document.getElementById("playButton").style.fontSize = word + "px";

	w = document.getElementById("infoButtonContent").clientWidth * 0.9;
	console.log("info button width : ", w);
	word = String(w);
	document.getElementById("infoButtonContent").style.fontSize = word + "px";
}

function keyDownEvent(e) {
	if (e) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			if (self.pause) {
				closePausePanel();
			}
			else {
				openPausePanel();
			}
		}

		let code = e.keyCode;
		if (code >= 37 && code <= 40) {
			// if (self.code == null) self.code = code;
			if (self.keys.length < 3) self.keys.push(code);
			//else self.keys[self.keys.length - 1] = code;
		}
	}
}
