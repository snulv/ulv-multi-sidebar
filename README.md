## Angular Multi Sidebar

This is a minimalistic reusable responsive sidebar. Using a simple service that allows multiple transclusions in AngularJS, this sidebar brings some of the power of web components and Angular2 to AngularJS. Simply add the module to your project and use the directive in the view where you want the sidebar and put the content of the sidebare in a div with the attribute transclude-to="menu" and the conent of the main body in a div with the attribute transclude-to="body". When in mobile view the attribute focus="[bool]" decides to show sidebar or content. If you are using angular-swipe in your project you will also be able to swipe between the different views.

####Requirements

* JQuery
* Bootstrap 3
* AngularJS

##Installation

####Inside of your app:
* Clone repository
* Add the following to your index.html
```html
  <script src="[locationofmodule]/angular-multi-sidebar/multi-sidebar.js""></script>
```
* Add`<link rel="stylesheet" href="[locationofmodule]/angular-multi-sidebar/multi-sidebar.css">` to the `<head>` of your index.html
* Add the `snulvin.angular-multi-sidebar` module to your Angular module list (e.g. in a main app.js file: `angular.module('yourMainModule', ['snulvin.angular-multi-sidebar'])`)
* And add:
```html
<ulv-multi-sidebar focus="true">
	<div transclude-to="menu">
		<!-- Content to be in sidebar here -->
	</div>
	<div transclude-to="body">
		<!-- Content to be in body here -->
	</div>
</ulv-multi-sidebar>
```
*to the view where you want the sidebar to be

##Running demo
To run the demo in index.html, simply run a node http-server in the folder. If you don't have it installed simply run
* npm install -g http-server
