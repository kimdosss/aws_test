var appDirtive = angular.module('appDirtive', []);

appDirtive.directive('sliderContainer', ['$document', function($document) {
	return {
	    restrict: 'A',  
	    link: function(scope, element, attributes) {
            $document.on('DOMMouseScroll mousewheel onmousewheel', function (event) {
			// cross-browser wheel delta
			    var event = window.event || event; // old IE support
			    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
			    var startY = 0;

            	if(delta < 0) {
            		moveDownSilder(true)
				}
                if(delta > 0) {
                	moveDownSilder(false)
				}

            });



			$document.on('touchstart', slideStart);

            function slideStart(event) {
                event.preventDefault();
                if (event.type == 'touchstart') {
                	startY = event.touches[0].pageY;
                }           
                $document.on('touchmove', slideMove);
                $document.on('touchend touchcancel', slideEnd);


            }

            function slideMove(event) {
                event.preventDefault();
                if (event.type == 'touchmove') {
                	coordsY = event.changedTouches[0].pageY;
                }

            }


            function slideEnd(event) {
            	if (coordsY - startY < -30) {
            		moveDownSilder(true)
            	} 
            	if (coordsY - startY > 30) {
            		moveDownSilder(false)
            	}
                $document.off('touchmove', slideMove);
                $document.off('touchend', slideEnd);
            }


            function moveDownSilder(down){

            	if(down) {
					scope.sliderCount ++;
					scope.sliderDown = true;
					scope.$digest();
				} else {
					scope.sliderCount --;
					scope.sliderDown = false;
					scope.$digest();
				}



            }







		}

	}
}])


