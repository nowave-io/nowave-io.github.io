nowave.factory('AuthentificationService', function ($cookies) {
    'use strict';
     var AuthentificationService = {};

     AuthentificationService.isUserAuthorized = function() {
         return $cookies.get('jwt') != undefined;
     };

     AuthentificationService.logout = function() {
         console.log('remove cookie');
         $cookies.put('jwt', undefined, { path: '/'});
     };

     return AuthentificationService;
});
