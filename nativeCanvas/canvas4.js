(function(){
	var mainCanvas = document.createElement('canvas');
	var ctx = mainCanvas.getContext('2d');
	var canvasWidth = mainCanvas.width = 650;
	var canvasHeight = mainCanvas.height = 350;
	mainCanvas.id = 'myCanvas';
	mainCanvas.style.border = '1px solid red';
	document.body.appendChild(mainCanvas); 

	ctx.save();
	ctx.fillStyle = "green";
	ctx.fillRect(10, 10, 100, 100);
	ctx.restore();
	ctx.fillRect(150, 75, 100, 100);

	mainCanvas = null;

})();