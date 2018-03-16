// var page = require('webpage').create(),
//   system = require('system'),
//   t, address;


// t = Date.now();
// // address = system.args[1];
// page.open('https://www.olx.ph', function(status) {
//   if (status !== 'success') {
//     console.log('FAIL to load the address');
//   } else {
//     page.evaluate(function(){
//       var el = document.getElementById('headerSearch');
//       el.value = 'kiddie pool';
//       console.log('%c FLASH', 'background: #800000; color: yellow; font-size: 14pt; font-family: "Comic Sans MS", cursive, sans-serif', el);
//     }, function(result){
//       page.evaluate(function(){
//         var el = document.getElementById('submit-searchmain');
//         var event = document.createEvent('MouseEvent');
//         el.dispatchEvent(event);
//       }, function(result){
//         console.log(result);
//         phantom.exit();
//       });
//     });

//   }
//   // phantom.exit();
// });

// var page = require('webpage').create();
// var date = new Date();
// page.open('https://www.olx.ph', function() {
//   page.render('github'+ (new Date() - date) + '.png');
//   phantom.exit();
// });

var page = require('webpage').create(),
	system = require('system');

console.log('Searching. . . . . ');
// console.log(system.args[1])

var now = new Date();
page.open('https://www.google.com.ph/', function(status) {
	var inputVal = system.args[1];
	if (status !== 'success') {
		console.log('Unable to access network');
	} else {
		page.viewportSize = {
		  width: 2560,
		  height: 1600
		};
		page.evaluate(function(inputVal) {
			document.forms[0].q.value = inputVal;
			document.forms[0].submit();
			// document.getElementById('lst-ib').value = 'deadpool';
			// document.getElementById('submit-searchmain').click();
		}, inputVal);
		setTimeout(function() {
			page.render('page' + (new Date - now) + '.png');
			phantom.exit();
		}, 3000);
	}
});