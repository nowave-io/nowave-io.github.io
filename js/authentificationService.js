nowave.factory('AuthentificationService', function ($cookies) {
    'use strict';
     var AuthentificationService = {};

     AuthentificationService.isUserAuthorized = function() {
         return $cookies.get('jwt') != undefined;
     };

     AuthentificationService.logout = function() {
         $cookies.remove('jwt');
     };

     return AuthentificationService;
});
