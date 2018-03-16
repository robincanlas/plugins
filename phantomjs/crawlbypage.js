var page = require('webpage').create(),
	system = require('system'),
	fs = require('fs');

console.log('Searching. . . . . ');

var address = system.args[1];
var inputVal = system.args[2];
var outfile = system.args[3];
var currentPage = 1,totalResults, totalPages, pageUrl;

var exit = function() {
	console.log('All pages Scrape')
	phantom.exit();
};

page.onConsoleMessage = function(msg) {
	console.log(msg);
};

var goToNextPage = function(){
	if(currentPage > totalPages){
		exit();
	}else{
		openPage(pageUrl + '?page=' + currentPage);
	}
};

var openPage = function(address){
	page.open(address, function(status) {
		if (status === 'success') {
			page.viewportSize = {
				width: 2560,
				height: 1600
			};

			if(currentPage === 1){
				page.evaluate(function(inputVal) {
					document.getElementById('headerSearch').value = inputVal;
					document.getElementById('submit-searchmain').click();
				}, inputVal);
			}

			page.onLoadFinished = function(status) {
				if(status === 'success'){
					console.log('page: ' + currentPage, 'Scraping')
					if(currentPage === 1){
						pageUrl = page.url;
						var result = page.evaluate(function() {
							return [].map.call(document.querySelectorAll('div.adcount'), function(div, i) {
								return div.innerText;
							});
						});

						totalResults = result[0].split(' ')[0];
						totalPages = Math.ceil(+totalResults/20);
					}

					var items = page.evaluate(function() {
						return [].map.call(document.querySelectorAll('h4.title'), function(h4, i) {
							var obj = {};
							obj.title = h4.innerText;

							var prices = [].map.call(document.querySelectorAll('p.price'), function(p) { return p.innerText; });
							var locations = [].map.call(document.querySelectorAll('span.location'), function(span) { return span.innerText; });

							obj.price = prices[i];
							obj.location = locations[i];
							return obj;
						});
					});

					for (var i = 0; i < items.length; i++) { fs.write(outfile, JSON.stringify(items[i]) + ','+ '\r\n', 'a'); }

					currentPage+=1;
					goToNextPage();
				}
			};
		} else {
			console.log('Unable to access network');
			exit();
		}
	});

};

openPage(address);