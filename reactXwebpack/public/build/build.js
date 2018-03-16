/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_scripts_assets__ = __webpack_require__(5);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var canvasWidth = 650;
var canvasHeight = 350;
var coinPosX = [];
var coinPosY = [];
var ctx = void 0,
    fps = void 0,
    fpsInterval = void 0,
    startTime = void 0,
    now = void 0,
    then = void 0,
    elapsed = void 0,
    rightTimeOut = void 0,
    lefTimeOut = void 0,
    spritePosWidth = void 0,
    spritePosHeight = void 0,
    stopMoving = true;

var sprite = {
	character: {
		spriteWidth: 864,
		spriteHeight: 280,
		row: 2,
		cols: 8,
		trackRight: 0,
		trackLeft: 1,
		curFrame: 0,
		frameCount: 8,
		x: 0,
		y: 220,
		srcX: 0,
		srcY: 0,
		left: false,
		right: true,
		speed: 12,
		scale: 1,
		img: null
	},
	coin: {
		spriteWidth: 1000,
		spriteHeight: 100,
		row: 1,
		cols: 10,
		trackRight: 0,
		trackLeft: 1,
		curFrame: 0,
		frameCount: 10,
		x: 20,
		y: 150,
		srcX: 0,
		srcY: 0,
		left: false,
		right: true,
		speed: 12,
		scale: 0.4,
		img: null
	}
};

var imageLoader = {
	coin: {
		_image: null,
		coinImage: null,
		canvasImg: function canvasImg(imgSrc) {
			var _canvas = document.createElement('canvas');
			_canvas.width = imgSrc.width;
			_canvas.height = imgSrc.height;
			var _ctx = _canvas.getContext('2d');
			_ctx.scale(sprite.coin.scale, sprite.coin.scale);
			_ctx.drawImage(imgSrc, 0, 0);

			return _canvas;
		},
		loadImage: function loadImage(src, callback) {
			this._image = new Image();
			this._image.onload = callback;
			this._image.src = src;
		}
	},
	character: {
		onload: function onload() {
			var _this = this;

			this.img.onload = function () {
				_this.loaded = true;
			};
		},
		onerror: function onerror() {
			this.img.onerror = function () {
				console.log('not sexcess');
			};
		},
		src: function src(a) {
			this.img = new Image(), this.onload();
			this.onerror();
			this.img.src = a;
		},
		get: function get() {
			if (!this.loaded) return null;
			var a = document.createElement('canvas');
			a.width = this.img.width;
			a.height = this.img.height;
			var b = a.getContext('2d');

			b.drawImage(this.img, 0, 0);
			return a;
		}
	}
};

sprite.character.width = sprite.character.spriteWidth / sprite.character.cols;
sprite.character.height = sprite.character.spriteHeight / sprite.character.row;
sprite.coin.width = sprite.coin.spriteWidth / sprite.coin.cols;
sprite.coin.height = sprite.coin.spriteHeight / sprite.coin.row;
spritePosWidth = canvasWidth - sprite.coin.width;
spritePosHeight = canvasHeight - sprite.coin.height;

var animateImage = {
	updateCoins: function updateCoins() {
		sprite.coin.curFrame = ++sprite.coin.curFrame % sprite.coin.frameCount;
		sprite.coin.srcX = sprite.coin.curFrame * sprite.coin.width * sprite.coin.scale;
	},
	animateCoins: function animateCoins() {
		this.updateCoins();
		for (var i = 0; i < 5; i++) {
			ctx.drawImage(imageLoader.coin.coinImage, sprite.coin.srcX, sprite.coin.srcY, sprite.coin.width * sprite.coin.scale, sprite.coin.height * sprite.coin.scale, coinPosX[i], coinPosY[i], sprite.coin.width * sprite.coin.scale, sprite.coin.height * sprite.coin.scale);
		}
	},
	updateCharacter: function updateCharacter() {
		//Updating the frame index 
		sprite.character.curFrame = ++sprite.character.curFrame % sprite.character.frameCount;

		//Clearing the drawn frame 
		// ctx.clearRect(0,0,canvasWidth,canvasHeight); 
		// ctx.clearRect(sprite.character.x,sprite.character.y,sprite.character.width,sprite.character.height); 


		if (stopMoving) return;

		//Calculating the x coordinate for spritesheet 
		sprite.character.srcX = sprite.character.curFrame * sprite.character.width;

		// //if left is true and the character has not reached the left edge 
		if (sprite.character.left && sprite.character.x > 0) {
			//calculate srcY 
			sprite.character.srcY = sprite.character.trackLeft * sprite.character.height;
			//decreasing the x coordinate
			sprite.character.x -= sprite.character.speed;
		}

		//if the right is true and character has not reached right edge 
		if (sprite.character.right && sprite.character.x < canvasWidth - sprite.character.width) {
			//calculating y coordinate for spritesheet
			sprite.character.srcY = sprite.character.trackRight * sprite.character.height;
			//increasing the x coordinate 
			sprite.character.x += sprite.character.speed;
		}
	},
	moveCharacter: function moveCharacter() {
		this.updateCharacter();
		if (sprite.character.img) {
			ctx.drawImage(sprite.character.img, sprite.character.srcX, sprite.character.srcY, sprite.character.width, sprite.character.height, sprite.character.x, sprite.character.y, sprite.character.width, sprite.character.height);
		} else {
			sprite.character.img = imageLoader.character.get();
		}
	}
};

var tick = {
	startAnimating: function startAnimating(fps) {
		fpsInterval = 1000 / fps;
		then = window.performance.now();
		startTime = then;
		this.animate();
	},
	animate: function animate() {
		var _this2 = this;

		// request another frame
		window.requestAnimationFrame(function () {
			_this2.animate();
		});

		// calc elapsed time since last loop
		now = window.performance.now();
		elapsed = now - then;
		// if enough time has elapsed, draw the next frame
		if (elapsed > fpsInterval) {
			// Get ready for next frame by setting then=now, but also adjust for your
			// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
			then = now - elapsed % fpsInterval;
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			animateImage.animateCoins();
			animateImage.moveCharacter();
		}
	}
};

var CanvasApp = function (_React$Component) {
	_inherits(CanvasApp, _React$Component);

	function CanvasApp(props) {
		_classCallCheck(this, CanvasApp);

		return _possibleConstructorReturn(this, (CanvasApp.__proto__ || Object.getPrototypeOf(CanvasApp)).call(this, props));
	}

	_createClass(CanvasApp, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var mainCanvas = this.refs.canvas;
			ctx = mainCanvas.getContext('2d');
			mainCanvas.width = canvasWidth;
			mainCanvas.height = canvasHeight;

			for (var i = 0; i < 5; i++) {
				var sampx = Math.floor(Math.random() * (spritePosWidth - sprite.coin.width + 1) + sprite.coin.width);
				var sampy = Math.floor(Math.random() * (spritePosHeight - sprite.coin.height + 1) + sprite.coin.height);
				coinPosX.push(sampx);
				coinPosY.push(sampy);
			}

			imageLoader.character.src(__WEBPACK_IMPORTED_MODULE_1_scripts_assets__["a" /* CharacterImg */]);

			imageLoader.coin.loadImage(__WEBPACK_IMPORTED_MODULE_1_scripts_assets__["b" /* CoinImg */], function () {
				imageLoader.coin.coinImage = imageLoader.coin.canvasImg(imageLoader.coin._image);
			});

			tick.startAnimating(12);
		}
	}, {
		key: 'render',
		value: function render() {
			var styles = {
				border: '1px solid red',
				background: 'url(' + __WEBPACK_IMPORTED_MODULE_1_scripts_assets__["c" /* BackgroundImg */] + ') 100%'
			};

			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'span',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('canvas', { ref: 'canvas', style: styles })
			);
		}
	}]);

	return CanvasApp;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

window.onkeydown = function (e) {
	if (e.keyCode === 37) {
		clearTimeout(lefTimeOut);
		sprite.character.left = true;
		sprite.character.right = false;
		stopMoving = false;
		lefTimeOut = setTimeout(function () {
			stopMoving = true;
		}, 300);
	}

	if (e.keyCode === 39) {
		clearTimeout(rightTimeOut);
		sprite.character.left = false;
		sprite.character.right = true;
		stopMoving = false;
		rightTimeOut = setTimeout(function () {
			stopMoving = true;
		}, 300);
	}

	if (e.keyCode === 32) {
		jumpAnimation();
	}
};

/* harmony default export */ __webpack_exports__["a"] = (CanvasApp);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/build/default.png";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_images_bg_jpg__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_images_bg_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_images_bg_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_images_coin_png__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_images_coin_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_images_coin_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_images_character_png__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_images_character_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_images_character_png__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0_images_bg_jpg___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1_images_coin_png___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2_images_character_png___default.a; });






/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_images_default_png__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_images_default_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_images_default_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_css_style_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_css_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_scripts_canvas__ = __webpack_require__(1);






// import {MainApp, MetaInfoBody, MetaInfoData} from 'scripts/mainapp';


var payRent = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(
// <MainApp />,
__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_scripts_canvas__["a" /* default */], null), document.getElementById('root'));

// setTimeout(function() {
// 	let newMetaHumanFiles = [{
// 		img: 'https://s-media-cache-ak0.pinimg.com/564x/4d/1f/9a/4d1f9a9e63abe83c9a0c73ffa6a44df7.jpg',
// 		name: 'Princess Diana of Themyscira',
// 		ability: 'Superhuman strength, speed, durability, and longevity',
// 		origin: 'Themyscira'
// 	}, {
// 		img: 'https://s-media-cache-ak0.pinimg.com/236x/62/03/e3/6203e3be81ed36802b6c24b35c1a49e9.jpg',
// 		name: 'Zatanna Zatara',
// 		ability: 'Skilled and powerful user of magic',
// 		origin: 'Gotham City'
// 	}];

// 	let newData = [...payRent.state.metahumanData, ...newMetaHumanFiles];

// 	payRent.updateValue(newData);	
// 	payRent.onChangeImage(newData[1].img);
// }, 2000);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/build/bg.jpg";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/build/character.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/build/coin.png";

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map