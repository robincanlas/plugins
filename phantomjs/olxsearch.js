/** input in command window 
phantomjs olxsearch.js https://www.olx.ph/ "search input" output.textfile.txt **/

var page = require('webpage').create(),
	system = require('system'),
	fs = require('fs');

console.log('Searching. . . . . ');

var now = new Date(),
	interval;
var address = system.args[1];
var inputVal = system.args[2];
var outfile = system.args[3];

var exit = function() {
	console.log('success writing')
	phantom.exit();
};

page.onConsoleMessage = function(msg) {
	console.log(msg);
};

page.open(address, function(status) {
	if (status === 'success') {
		page.includeJs(
			'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',
			function() {
				page.viewportSize = {
					width: 2560,
					height: 1600
				};

				page.evaluate(function(inputVal) {
					document.getElementById('headerSearch').value = inputVal;
					document.getElementById('submit-searchmain').click();
				}, inputVal);

				page.onLoadFinished = function(status) {
					var items = page.evaluate(function() {
						return [].map.call(document.querySelectorAll('h4.title'), function(h4, i) {
							var obj = {};
							obj.title = h4.innerText;

							var prices = [].map.call(document.querySelectorAll('p.price'), function(p) { return p.innerText; });

							obj.price = prices[i];
							return obj;
						});
					});

					for (var i = 0; i < items.length; i++) {
						fs.write(outfile, JSON.stringify(items[i]) + ','+ '\r\n', 'a');
					}

					exit();
					}
				};
			});
	} else {
		console.log('Unable to access network');
	}
});