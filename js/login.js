nowave.controller('LoginCtrl', function($scope, $http, clientConfig, AuthentificationService, AnalyticsService) {
    'use strict';

        $scope.isLogged = AuthentificationService.isUserAuthorized();

    $scope.setIsLogged = function (bool){
      $scope.isLogged = bool;
    };

    $scope.logout = function (){
      AuthentificationService.logout();
      $scope.setIsLogged(false);
    };

    $scope.login = function(crendentials){

        $http({
            method: 'POST',
            url: clientConfig.api + '/users/login',
            data: crendentials,
            withCredentials: true
        }).then(function(success) {
            AnalyticsService.track('Logged in');
            $scope.setIsLogged(true);
            window.location = '/';
        }).catch(function(error){
            $scope.errors = true;
            $scope.message = error.data.message;
            $scope.setIsLogged(false);
        });
    };
});
