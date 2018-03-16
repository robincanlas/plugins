var constant = {
	init: function(){
		constant.canvas = document.getElementById('canvas');
		constant.gameStage = new createjs.Stage(constant.canvas);
	},
	baseRectColor: 'rgb(183,183,183)',
	animatedRectColor: 'white',
	kulayNgBilog: 'white',
	containerX: 25,
	minX: 0,
	maxX: 200
}
constant.init();
var buyinInfo = {
	max: 100000,
	min: 1000
}
var buyinvalue = document.getElementById('buyinvalue');
buyinvalue.innerHTML = buyinInfo.min;
createjs.Touch.enable(constant.gameStage); //ENABLE TOUCH

var container = new createjs.Container();
container.name = 'range-container';
container.y = 50
container.x = constant.containerX;

var constantRect = new createjs.Shape(); //CONSTANT ROUNDED RECTANGLE FOR SLIDER
constantRect.graphics
.beginStroke("black")
.beginFill("rgb(76, 76, 76)")
.drawRoundRect(0, 0, 200, 8, 5, 5, 5, 5);

var animatedRect = new createjs.Shape(); //ANIMATED ROUNDED  RECTANGLE FOR SLIDER
animatedRect.graphics
.beginStroke('black')
.beginFill(constant.animatedRectColor)
.drawRoundRect(0, 0, 0, 8, 5, 5, 5, 5);

var bilog = new createjs.Shape(); //ANIMATED CIRCLE
bilog.graphics.setStrokeStyle(1);
bilog.graphics.beginStroke("#000000");
bilog.graphics.beginFill(constant.kulayNgBilog);
bilog.graphics.drawCircle(0,4,12);

var inviRect = new createjs.Shape(); //SIZE AND WIDTH OF WHOLE CANVAS  ADD YOUR LISTENER HERE
inviRect.graphics
.beginStroke("red") //comment out this on production, for development mode only
.beginFill("rgba(0, 0, 0, .01)")
.drawRect(0, 0, 250, 120);

// [S] SET INITIAL BUYIN
var initialBuyin = buyinInfo.min*50; //5000
var initialBuyinPercent = ((initialBuyin - 1000) / (100000 - 1000)) * 1.00
var initialXPos = (constant.maxX - constant.minX) * initialBuyinPercent;
buyinvalue.innerHTML = Math.floor(buyinInfo.min + ((buyinInfo.max - buyinInfo.min) * initialBuyinPercent)); 
bilog.graphics.command.x = initialXPos;
animatedRect.graphics.command.w = initialXPos;
// [E] SET INITIAL BUYIN

function handleMove(e){
	var xPos;
	if(window.innerWidth < window.innerHeight){
		// LANDSCAPE MODE
		var maxSliderHeight = constant.maxX + container.y - container.x;
		xPos = maxSliderHeight-(e.stageX - constant.container);
		if(xPos < constant.minX){
			xPos = constant.minX
		}else if(xPos > constant.maxX){
			xPos = constant.maxX;
		}
	}else{
		// PORTRAIT MODE
		// 2.08 = canvas_width/canvas_height
		var maxSliderHeight = constant.maxX + container.y - container.x;
		xPos = (-(e.stageY * (stage.canvas.width/stage.canvas.height)) + maxSliderHeight) + constant.container;
		if(xPos < constant.minX){
			xPos = constant.minX
		}else if(xPos > constant.maxX){
			xPos = constant.maxX;
		}
	}

	var percent = ((xPos - constant.minX) * 1) / (constant.maxX - constant.minX);
	console.log(percent)
	buyinvalue.innerHTML = Math.floor(buyinInfo.min + ((buyinInfo.max - buyinInfo.min) * percent)); 
	bilog.graphics.command.x = xPos;
	animatedRect.graphics.command.w = xPos;
}

inviRect.addEventListener("mousedown", function(e){
	console.log('%c FLASH ', 'background: #800000; color: yellow; font-size: 12pt; font-family: "Comic Sans MS", cursive, sans-serif', 'kimochi!!');		
	handleMove(e);

	inviRect.addEventListener("pressmove", function(e){	
		handleMove(e);

	});
});
// createjs.Tween.get(animatedRect.graphics.command)
// .to({w: 200, loop: true}, 10000, createjs.Ease.quadOut);

// createjs.Tween.get(bilog.graphics.command)
// .to({x: 200, loop: true}, 10000, createjs.Ease.quadOut);









container.addChild(constantRect, animatedRect, bilog);
constant.gameStage.addChild(container, inviRect);
createjs.Ticker.addEventListener("tick", constant.gameStage);
console.log('RUN ROBIN RUN');