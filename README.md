This is to be read

##Installation


####Inside of your app:
* Clone repository
* Add the following to your index.html
```html
  <script src="[locationofmodule]/angular-multi-sidebar/multi-sidebar.js".js"></script>
```
* Add`<link rel="stylesheet" href="bower_components/famous-angular/dist/famous-angular.css">` to the `<head>` of your index.html
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
*To the view where you want the sidebar to be