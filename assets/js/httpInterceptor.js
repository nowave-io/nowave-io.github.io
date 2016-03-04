nowave.config(function ($provide, $httpProvider) {
  'use strict';

  // Intercept http calls.
  $provide.factory('httpInterceptor', function ($q, AuthentificationService) {
    return {

      // On response failture
      responseError: function (rejection) {
           if (rejection.status === 401) {
              AuthentificationService.logout();
               console.log("HttpInterceptor reload page to change movie status");
               window.location = '/';
           }

        // Return the promise rejection.
        return $q.reject(rejection);
      }
    };
  });

  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('httpInterceptor');
});
