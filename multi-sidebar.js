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

angular.module('snulvin.angular-multi-sidebar', []).directive('ulvMultiSidebar', ['MultiTransclude', function (MultiTransclude) {

	return {
		restrict: 'E',
		scope: {
			focus: '=',
		},

		transclude: true,
		templateUrl: currentScriptPath.replace('multi-sidebar.js', 'multi-sidebar.html'),
		controller: function($scope) {
			/*
			* Handles user swiping right
			* - Also used on button clicks that does the same view change
			*/
			$scope.rightSwipe = function() {
				$scope.focus = true;
			};

			/*
			* Handles user swiping left
			* - Also used on button clicks that does the same view change
			*/
			$scope.leftSwipe = function() {
				$scope.focus = false;
			};
		},
		link: function (scope, iElem, iAttrs, ctrl, transcludeFn) {
			// Populates the correct elements in the diretive with the correct transcluded content
			MultiTransclude.transclude(iElem, transcludeFn);
		}        
  	};
}])
.factory("MultiTransclude", function() {
	return {
		transclude: function(iElem, transcludeFn) {
			 transcludeFn( function(clone) {
				
				angular.forEach( clone, function (cloneEl) {
					
					// node type 3 is "text" node
					if (cloneEl.nodeType === 3)  {
						return;
					}
						
					// get target name from clone
					var destinationId = cloneEl.attributes["transclude-to"].value;
					
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
});
