var myApp = angular.module('myApp', [ 'ui.router', 'ngMaterial',  "kendo.directives","ngMessages"])
.constant("$MD_THEME_CSS","");
myApp.config(function($stateProvider, $mdThemingProvider){

  //  i used this because angular is blocking my get request 
  // $sceDelegateProvider.resourceUrlWhitelist([
  //   // Allow same origin resource loads.
  //   'self',
  //   // Allow loading from our assets domain.  Notice the difference between * and **.
  //   'http://srv*.assets.example.com/**',
  //   'http://localhost:8050/findAllEmployees'
  // ]);

  var managment = {
    name: 'man',
    url: '/',
    templateUrl: './managment.html'
  }

  var employees = {
    name: 'emp',
    url: '/emp',
    templateUrl: './employees.html'
  }

  $stateProvider.state(managment);
  $stateProvider.state(employees);

})
