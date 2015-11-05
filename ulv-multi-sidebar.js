/**
@toc

@param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
TODO

@param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
TODO

@dependencies
TODO

@usage
partial / html:
TODO

controller / js:
TODO

//end: usage
*/

'use strict';

var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;



angular.module('snulvin.ulv-multi-sidebar', []).directive('ulvMultiSidebar', ['MultiTransclude', 'RecursionHelper', '$window', '$log', function (MultiTransclude, RecursionHelper, $window, $log) {

	return {
		restrict: 'E',
		scope: {
			active: '=',
			minWidth: '=',
			collapsed: '=',
			id: '@',
		},
		transclude: true,
		templateUrl: currentScriptPath.replace('ulv-multi-sidebar.js', 'ulv-multi-sidebar.html'),
		controller: function($scope, $element) {
			/*
			* Sets standard values
			*/
			if(!$scope.id) { $scope.id = 'to'; }
			if(!$scope.active) { $scope.active = false; }
			if(!$scope.collapsed) { $scope.collapsed = false; }
			if(!$scope.minWidth) { $scope.minWidth = 768; }
			/*
			* Checks if the current innerwidth is mobile sized
			*/
			$scope.isTooSmall = function(size) {
				var collapsed = false;
				if (size < $scope.minWidth) {
					collapsed = true;
				}
				return collapsed;
			};
			/*
			* Handles user swiping right
			* - Also used on button clicks that does the same view change
			*/
			$scope.rightSwipe = function() {
				$scope.active = true;
			};

			/*
			* Handles user swiping left
			* - Also used on button clicks that does the same view change
			*/
			$scope.leftSwipe = function() {
				$scope.active = false;
			};

			/*
			* Changes the current view
			*/
			$scope.toggleView = function() {
				if($scope.active) {
					$scope.active = false;
				} else {
					$scope.active = true;
				}
			};

			/*
			* Returns the correct class for the sidebar
			*/
			$scope.getSidebarClass = function() {
				var returnClass = 'col-xs-3';
				if ($scope.collapsed) {
					returnClass = 'col-xs-6 offcanvas';
					if ($scope.active) {
						returnClass = 'col-xs-6 easeout offcanvas-show';
					}
					
				}
				return returnClass;
			};
			/*
			* Returns the correct class for the content
			*/
			$scope.getContentClass = function() {
				var returnClass = 'col-xs-9';
				if ($scope.collapsed) {
					returnClass = 'col-xs-12 content-half';
					if ($scope.active) {
						returnClass = 'col-xs-6';
					}
					
				}
				return returnClass;
			};

			
		},
		link: function (scope, element, iAttrs, ctrl, transcludeFn) {
			scope.collapsed = scope.isTooSmall($window.innerWidth);
			/*
			* Checks if the current element size is too small
			*/
			angular.element($window).bind('resize', function() {
				scope.collapsed = scope.isTooSmall(element.parent().width());
				scope.$apply();
			});
			
			
			// Populates the correct elements in the diretive with the correct transcluded content
			MultiTransclude.transclude(element, transcludeFn, scope.id);
		}/*,
		compile: function(element, attrs) {
			if(!attrs.id) { attrs.id = 'standardId'; }
			if(!attrs.active) { attrs.active = false; }
			if(!attrs.minWidth) { attrs.minWidth = 768; }
		}*/
		/*,
		compile: function(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return RecursionHelper.compile(element);
        }*/
  	};
}])
.factory("MultiTransclude", function() {
	return {
		transclude: function(iElem, transcludeFn, id) {
			 transcludeFn( function(clone) {
				
				angular.forEach( clone, function (cloneEl) {
					
					// node type 3 is "text" node
					if (cloneEl.nodeType === 3)  {
						return;
					}
						
					// get target name from clone
					var destinationId = cloneEl.attributes['transclude-' + id].value;
					
					//find target
					var destination = iElem.find("[transclude-id='" + destinationId + "']");
				
					// append target if found
					if (destination.length) {
							
						destination.append(cloneEl);
							
					} else {
					 	// if target isn't found (missing/invalid transclude), clean up and throw error         
						cloneEl.remove();
			 
						throw new Error(
							'Target not found. Please specify the correct transclude-to attribute.'
						);
							
					}
				});      
			});
		}
	};
})
.factory('RecursionHelper', ['$compile', function($compile){
    return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: function(element, link){
            // Normalize the link parameter
            if(angular.isFunction(link)){
                link = { post: link };
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function(scope, element){
                    // Compile the contents
                    if(!compiledContents){
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function(clone){
                        element.append(clone);
                    });

                    // Call the post-linking function, if any
                    if(link && link.post){
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}]);
