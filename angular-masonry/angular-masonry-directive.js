(function() {
    "use strict";

    angular.module('masonry', ['ng'])

    .directive('masonry', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, elem, attrs) {
                /** inject Factory so you can update the brick when you change the data of the array **/
                var container = elem[0];
                var options = angular.extend({
                    itemSelector: '.item'
                }, angular.fromJson(attrs.masonry));

                var masonry = scope.masonry = new Masonry(container, options);

                var debounceTimeout = 0;
                /**** INCREASE TIMEOUT TO WAIT FOR THE SERVER DATA *****/
                scope.update = function() {
                    if (debounceTimeout) {
                        $timeout.cancel(debounceTimeout);
                    }
                    debounceTimeout = $timeout(function() {
                        debounceTimeout = 0;

                        masonry.reloadItems();
                        masonry.layout();

                        elem.children(options.itemSelector).css('visibility', 'visible');

                    }, 200);
                };
                
                scope.removeBrick = function() {
                    $timeout(function() {
                        masonry.reloadItems();
                        masonry.layout();
                   }, 500);
                };                
                
                scope.appendBricks = function(ele) {
                    masonry.appended(ele);
                };
                
                scope.$on('masonry.layout', function() {
                    masonry.layout();                 
                });

                /** wait until images have finished loading for the elements and then update **/
                var imgLoad = imagesLoaded(document.querySelectorAll(options.itemSelector));
                imgLoad.on('always', function (instance) {
                    scope.update();
                });
                
                scope.update();
            }
        };
    })

    .directive('masonryTile', function() {
        return {
            restrict: 'AC',
            link: function(scope, elem) {
                elem.css('visibility', 'hidden');
                var master = elem.parent('*[masonry]:first').scope(),
                    update = master.update,
                    removeBrick = master.removeBrick,
                    appendBricks = master.appendBricks;

                if (update) {
                    imagesLoaded( elem.get(0), update);
                    elem.ready(update);
                }
                if (appendBricks) {
                    imagesLoaded( elem.get(0), appendBricks(elem));
                }                
                scope.$on('$destroy', function() {
                    if (removeBrick) {
                        removeBrick();
                    }
                });      
            }
        };
    })
})();