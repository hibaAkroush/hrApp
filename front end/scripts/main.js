var myApp = angular.module('myApp', ['ui.router', 'ngMaterial', "kendo.directives", "ngMessages"])
  .constant("$MD_THEME_CSS", "");

myApp.config(function($stateProvider, $mdThemingProvider) {

  var managment = {
    name: 'man',
    url: '/',
    templateUrl: './managment.html'
  };

  var employees = {
    name: 'emp',
    url: '/emp',
    templateUrl: './employees.html'
  };

  $stateProvider.state(managment);
  $stateProvider.state(employees);

});