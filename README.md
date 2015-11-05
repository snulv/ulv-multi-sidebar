## Angular Multi Sidebar

This is a minimalistic reusable responsive sidebar. Using a simple service that allows multiple transclusions in AngularJS, this sidebar brings some of the power of web components and Angular2 to AngularJS. Simply add the module to your project and use the directive in the container where you want the sidebar and put the content of the sidebar in a div with the attribute transclude-to="menu" and the conent of the main body in a div with the attribute transclude-to="body". The directive can be used recursively within itself or multiple times in the same view. The directive hides the sidebar when the parent div becomes smaller than the min-width. 

####Demo
[Demo!](https://snulvin.github.io/ulv-multi-sidebar)

####Requirements

* JQuery
* Bootstrap 3
* AngularJS

##Installation

####Inside of your app:
* Clone repository
* Add the following to your index.html
```html
  <link rel="stylesheet" href="[locationofmodule]/ulv-multi-sidebar/ulv-multi-sidebar.css">
  <script src="[locationofmodule]/ulv-multi-sidebar/ulv-multi-sidebar.js""></script>
```
* Add the `snulvin.ulv-multi-sidebar` module to your Angular module list (e.g. in a main app.js file: `angular.module('yourMainModule', ['snulvin.ulv-multi-sidebar'])`)
* And add:
```html
<ulv-multi-sidebar id="[string]" active="[boolean]" collapsed="[boolean]" min-width="[integer]">
	<div transclude-[id]="menu">
		<!-- Content to be in sidebar here -->
	</div>
	<div transclude-[id]="body">
		<!-- Content to be in body here -->
	</div>
</ulv-multi-sidebar>
```
* To the view where you want the sidebar to be.
* Make sure that the text following "transclude-" is the same as the id of the element. This is to avoid problems with recursivity.
* It is not possible to run the directive within the sidebar of another, only within the body.
* The attributes are as following
```
 id - The sidebars id, must be the same as the text following the "transclude-" inside the directive
 active - A boolean that is true if the sidebar should currently be shown, used to controll the sidebar
 collapsed - A boolean that is true if the sidebar is currently below it's min width
 min-width - An integer that decides at which pixel length the sidebar should go from normal view to a minimized view
```

##Running demo
To run the demo in index.html, simply run a node http-server in the folder. If you don't have it installed simply run
* npm install -g http-server
