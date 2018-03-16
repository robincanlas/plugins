(function(){
	var mainCanvas = document.createElement('canvas');
	var ctx = mainCanvas.getContext('2d');
	var canvasWidth = mainCanvas.width = 100;
	var canvasHeight = mainCanvas.height = 100;
	mainCanvas.id = 'myCanvas';
	mainCanvas.style.border = '1px solid red';
	document.body.appendChild(mainCanvas); 

	// ctx.fillStyle = "black";
	// ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	var galagaImg = new Image();
	galagaImg.src = "coin.png";

	function sprite (options) {

		var that = {}, frameIndex = 0, tickCount = 0, ticksPerFrame = options.ticksPerFrame || 0,
		numberOfFrames = options.numberOfFrames || 1;

		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		that.loop = options.loop;

		that.update = function(){
			tickCount += 1;

			if(tickCount > ticksPerFrame){
				tickCount = 0;
				        	
	            if (frameIndex < numberOfFrames - 1) {	
	                // Go to the next frame
	                frameIndex += 1;
	            }else if(that.loop){
	            	frameIndex = 0;
	            }
			}
		}

		that.render = function(){
			ctx.clearRect(0, 0, that.width, that.height);
			that.context.drawImage(
				that.image,
				frameIndex * that.width / numberOfFrames,
				0,
				that.width,
				that.height,
				0,
				0,
				that.width,
				that.height);
	    };

		return that;
	}

	var galaga = sprite({
		context: ctx,
		width: 1000,
		height: 100,
		image: galagaImg,
		loop: true,
		numberOfFrames: 10,
		ticksPerFrame: 4
	});

	galagaImg.onload=function(){
    	updater();
	}

    function updater(){
    	window.requestAnimationFrame(updater);
		galaga.update();
		galaga.render();
    }

	mainCanvas = null;
})();