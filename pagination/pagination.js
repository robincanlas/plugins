	/** include pagination in index.html/jade **/
	.directive('binPagination', function(pagination){
		return{
			restrict: 'E',
			link: function(scope, elem, attr){
				scope.ball = pagination;
			},
			templateUrl: "pagination",
		}
	})

	.factory('pagination', function($q,$timeout,socket){
		return page = {
			advertisements: [],
			showPagination: false,
			paginationType: '',
			showLoading: true,
			gotoTop: false,
			origCollection: [],
			sliceCollection: [],
			pages: [], /* group of pages */
			itemPerPage: 0, /* items to show per page */
			lastPage: 0, /* last page */
			staticLastPage: 0,
			startPage: 0, /* start page */
			currentPage: 0, /* current page */
			showLastPage: false,
			showFirstPage: false,
			paginationReset: function(param){
				if(param === 'ballnews'){
					page.showLoading = true;
					page.paginationType = 'ballnews';
					page.startPage = 1;
					page.currentPage = 1;
					page.itemPerPage = 15; /* items to show per page */
					page.lastPage = 7; /* last page */
					page.staticLastPage = 7; /* static pages, use for comparing */
					page.createCollection(page.collection, 'berita'); /* create collection */
					page.createPages(page.startPage,page.maxPage); /* create collection */
				}else if(param === 'transfer'){
					page.showLoading = true;
					page.paginationType = 'transfer';
					page.startPage = 1;
					page.currentPage = 1;
					page.itemPerPage = 15; /* items to show per page */
					page.lastPage = 4; /* last page */
					page.staticLastPage = 4; /* static pages, use for comparing */
					page.createCollection(page.collection, 'transfer'); /* create collection */
					page.createPages(page.startPage,page.maxPage); /* create collection */
				}else if(param === 'results'){
					page.showLoading = true;
					page.paginationType = 'results';
					page.startPage = 1;
					page.currentPage = 1;
					page.itemPerPage = 15; /* items to show per page */
					page.lastPage = 7; /* last page */
					page.staticLastPage = 7; /* static pages, use for comparing */
					page.createCollection(page.collection, 'hasil'); /* create collection */
					page.createPages(page.startPage,page.maxPage); /* create collection */
				}else{

				}
			},
			createCollection: function(collection, origin){
				var defer = $q.defer(), promises = [], mytimeout, count = 1;
				$timeout.cancel(mytimeout);
				page.origCollection = [];
				page.articleTitles = [];

				angular.forEach(collection, function(val, i){
					var obj = {};
					obj.id = val._id;
					obj.index = count;
					if(origin == 'berita') obj.tick = val.tick;
					obj.title = val.headline;
					obj.author = val.author;
					obj.catchPhrase = val.catchPhrase;
					// var url = val.headline.replace(/\s+/g, '-') + '-' + origin;
					obj.url = val.url;
					if(val.image !== null){
						obj.image = socket.path + '/GelandangBola/' + val.image + '?' + new Date().getTime();
					}else{
						obj.image = val.image;
					}
					obj.content = val.body;
					obj.src = val.src;
					obj.date = val.dateCreated;
					page.articleTitles.push(val.url);
					page.origCollection.push(obj);
					promises.push(val);
					count++;
				});

				page.origCollection.map(function (val,b) {
				});

				/* Listen: The Promise by When in Rome */
				$q.all(promises).then(function(){
					mytimeout = $timeout(function(){
						page.showLoading = false;
					},500);
				});

				if(origin == 'berita' || origin == 'hasil'){
					/* set max page */
					page.maxPage = Math.ceil(page.collectionMaxLength / page.itemPerPage);
					/* duplicate collection */
					page.dupeCollection = page.origCollection;
				}else if(origin == 'transfer'){
					/* duplicate collection */
					page.dupeCollection = page.origCollection.slice(2,page.origCollection.length);
					/* set max page */
					page.maxPage = Math.ceil(page.collectionMaxLength / page.itemPerPage);
				}else{}
				/* create slice collection */
				page.createArrayToSlice();
				/* slice the dupecollection */
				page.dupeCollection = page.sliceCollection.slice(page.currentPage - 1, page.itemPerPage);
				page.dupeCollection = page.collection;
			},
			createPages: function(start, end){
				var count = 0;
				page.pages = [];

				page.showLastPage = true;
				page.showFirstPage = false;

				/* show first page button */
				if(start > 1){
					page.showFirstPage = true;
				}
				
				/* change the end page if you reach the max page 
				* show last page button */
				if(end > page.maxPage){
					end = page.maxPage;
					page.showLastPage = false;
				}

				if(page.maxPage <= page.lastPage) page.showLastPage = false;

				/* create pages, then set the start page to according to the next group of pages */
				for(var i = start; i <= end; i++){
					count++;
					page.pages.push(i);
					/* set here the number of pages to be shown if 5,10,20,30..*/
					if(count == page.staticLastPage) {
						page.startPage = page.lastPage + 1;
						break;
					}
				}

				/* hide pagination if page length is less than 2 */
				if(page.pages.length < 2){
					page.showPagination = false;
				}else{
					page.showPagination = true;
				}

			},
			jumpToLastPage: function(page){
				page.currentPage = page;
				page.hitenMitsurugiRyu(page);
				/* get the last page / divide maxPage to static last page */
				page.lastPage = page.staticLastPage * Math.ceil(page.maxPage / page.staticLastPage);
				/* get the first page / divide maxPage to static last page
				* then subtract 1 and multiply to static last page then add 1 */
				var startPage = page.staticLastPage * (Math.ceil(page.maxPage / page.staticLastPage) - 1) + 1;
				page.createPages(startPage, page.lastPage);
				if(page.lastPage >= page.maxPage){
					page.showLastPage = false;
				}

			},
			jumpToFirstPage: function(page){
				page.currentPage = page;
				page.hitenMitsurugiRyu(page);
				page.lastPage = page.staticLastPage;

				page.createPages(page, page.staticLastPage);
			},
			hitenMitsurugiRyu: function(page){ /* change the current page */
				page.showLoading = true;
				page.currentPage = page;
				var begin = (page - 1) * page.itemPerPage, end = begin + page.itemPerPage;
				page.dupeCollection = page.sliceCollection.slice(begin, end);
				var defer = $q.defer();
				var promises = [];
				var mytimeout;
				$timeout.cancel(mytimeout);

				angular.forEach(page.dupeCollection, function(val, i){
					promises.push(val);
				});

				var doc = document.documentElement;
				var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
				var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

				$q.all(promises).then(function(){
					mytimeout = $timeout(function(){
						page.showLoading = false;

						/* goto Top page when user used the bottom pagination */
						if(page.gotoTop){
							window.scrollTo(0,0);
							page.gotoTop = false;
						}
					},500);
				});
				
				if(page.activeView === 'ballnews'){
					socket.emit('requestMore', { section : 'ballnews', start : page.currentPage });
				}else if(page.activeView === 'transfer'){
					socket.emit('requestMore', { section : 'transfernews', start : page.currentPage });
				}else{
					socket.emit('requestMore', { section : 'results', start : page.currentPage, keyword: location.href.split("/")[4] });
				}
			},
			changePage: function(page){
				page.hitenMitsurugiRyu(page);

				// /* next pages */
				if(page > page.lastPage){
					page.lastPage += page.staticLastPage;
					page.createPages(page, page.lastPage);
				}

				/* previous pages */
				if(page.lastPage - page.staticLastPage == page){
					page.lastPage -= page.staticLastPage;
					page.createPages(page - page.staticLastPage + 1, page);
				}

				if(page.maxPage <= page.lastPage) page.showLastPage = false;

			},
			jumpToPreviousPages: function(){
				if(page.lastPage - page.staticLastPage == 0) return;

				page.lastPage -= page.staticLastPage;
				var start = page.lastPage - page.staticLastPage + 1;
				page.hitenMitsurugiRyu(page.lastPage);
				page.createPages(start, page.lastPage);
			},
			jumpToNextPages: function(){
				var start = page.lastPage + 1;
				page.hitenMitsurugiRyu(start);
				page.lastPage += page.staticLastPage;
				page.createPages(start, page.lastPage);
				if(page.lastPage == page.maxPage){
					page.showLastPage = false;
				}
			},
			createArrayToSlice: function(){ /* create the array that you will used when slicing */
				page.sliceCollection = page.dupeCollection;
			}
		}
	})

	.run(function(pagination){
		var collection = [];

		socket.on('loadData',function(alldatas){
			if(alldatas.data.length > 0){
				pagination.setImagePath(alldatas.data);
				if(pagination.currentPage === 0){
					pagination.collection = alldatas.data;
					pagination.collectionMaxLength = alldatas.max;
					pagination.paginationReset('ballnews');
				}else{
					pagination.dupeCollection = alldatas.data;
				}
			}
		});
	});
