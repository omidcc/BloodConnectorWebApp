﻿
var app = angular.module('BloodConnectorApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/forgot", {
        controller: "forgotController",
        templateUrl: "/app/views/forgot.html"
    });

    $routeProvider.when("/sentmail", {
        controller: "sentmailController",
        templateUrl: "/app/views/sentmail.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/users", {
        controller: "usersController",
        templateUrl: "/app/views/users.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

});

var serviceBase = '/';
var rootURL = 'http://localhost:14290/';
//var siteURL = 'http://www.bloodconnector.org/';
//var siteURL = 'http://local.bloodconnector.org';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    rootURL: rootURL,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


