(function(){
	// RESIZE and LANDSCAPE STARTS HERE
	var rowStyle = null, scaleToFit = null, row = document.getElementById('row'), 
	canvas = document.getElementById('canvas'), chairs = document.getElementById('chairs');


	function scaleCanvas(){
		var w, h, scaleResult, ddom = document.getElementById("layers");
		console.log('scaleCanvas');
		var canvasWidth = canvas.width, canvasHeight = canvas.height;

		// 1 and .9 is the default scale version in landscape and portrait
		w = (ddom.offsetWidth == canvasWidth) ? 1 : (ddom.offsetWidth * .9)/canvasWidth;
		h = (ddom.offsetHeight == canvasHeight) ? 1 : (ddom.offsetHeight * .9)/canvasHeight;
		scaleResult = Math.min(w, h);

		// USE THIS ARRAY, BECAUSE YOU WILL NEED THE PREFIX
		// var scaleToFit = ["-webkit-transform: scale("+scaleResult+") translate(-50%,-50%);",
		// 					"-moz-transform: scale("+scaleResult+") translate(-50%,-50%);",
		// 					"-o-transform: scale("+scaleResult+") translate(-50%,-50%);",
		// 					"transform: scale("+scaleResult+") translate(-50%,-50%);"];
		// scaleToFit = scaleToFit.join('');

		canvas.style.okitTransform = chairs.style.okitTransform = "scale("+scaleResult+")" + "translate(-50%,-50%)";
		canvas.style.webkitTransform = chairs.style.webkitTransform = "scale("+scaleResult+")" + "translate(-50%,-50%)";
		canvas.style.mozTransform = chairs.style.mozTransform = "scale("+scaleResult+")" + "translate(-50%,-50%)";
		canvas.style.transform = chairs.style.transform = "scale("+scaleResult+")" + "translate(-50%,-50%)";

		ddom = null;
	}

	function forceLandscape(){
		console.log('forceLandscape');

		if(window.innerWidth > window.innerHeight){
			rowStyle = {
				"height" : window.innerHeight +"px",
				"width"  : window.innerWidth  +"px"
			};

		}else{
			rowStyle = {
				"height" : window.innerWidth  +"px",
				"width"  : window.innerHeight +"px"
			};
		}

		row.style.height = rowStyle.height;
		row.style.width = rowStyle.width;
		scaleCanvas();
	}

	forceLandscape();

	window.addEventListener("resize", forceLandscape);
	// RESIZE and LANDSCAPE ENDS HERE

	// CHAIRS [S]
	for(var i = 0; i < 6;i++){
		var inviChair = document.createElement('span');
		inviChair.setAttribute('inviChairs', '');
		inviChair.id = 'inviChair' + i;
		/* X and Y POSITIONS OF YOUR CHAIR */ 
		// inviChair.style.left = chairX + 'px';
		// inviChair.style.top = chairY + 'px';
		chairs.appendChild(inviChair);
	}
	// CHAIRS [E]











	var gameStage = gameStage = new createjs.Stage(document.getElementById('canvas'))	
	var loadQueue = new createjs.LoadQueue(false, null, true);
	createjs.Ticker.addEventListener("tick", gameStage);

	loadQueue.loadFile({src:window.location.origin+'/images/flash.png', id:"flash"})
	
	loadQueue.addEventListener('complete', function(){
		var bmp = new createjs.Bitmap(loadQueue.getResult("flash").src);
		bmp.x = 300;
		bmp.y = 150;
		gameStage.addChild(bmp);

	});

	var vertical = new createjs.Shape();
	vertical.name = "vertical";
	vertical.graphics.beginFill('blue').drawRect(500,0,2,700);

	var horizontal = new createjs.Shape();
	horizontal.name = "horizontal";
	horizontal.graphics.beginFill('blue').drawRect(0,350,1000,2);

	gameStage.addChild(vertical, horizontal);


}());