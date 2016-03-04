nowave.controller('LoginCtrl', function($scope, $http, AuthentificationService) {
    'use strict';

    $scope.isLogged = AuthentificationService.isUserAuthorized();
    console.log($scope.isLogged);

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
            url: 'http://localhost:8080/api/users/login',
            data: crendentials,
            withCredentials: true
        }).then(function(success) {
            $scope.setIsLogged(true);
            window.location = '/';
        }).catch(function(error){
            $scope.errors = true;
            $scope.message = error.data.message;
            $scope.setIsLogged(false);
        });
    };
});
