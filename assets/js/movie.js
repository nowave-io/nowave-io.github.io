nowave.controller('MovieCtrl', function($scope, $http, $sce, clientConfig, AuthentificationService) {
    'use strict';

    $scope.isLogged = AuthentificationService.isUserAuthorized();
    $scope.switchMovieTrailer = function() {
        $scope.isMovie = ! $scope.isMovie;
    }
    $scope.init = function(movieTitle) {
        if (AuthentificationService.isUserAuthorized()) {
            $scope.isMovie = true;
            $http({
                method: 'GET',
                url: clientConfig.api + '/video/' + movieTitle,
                withCredentials: true
            }).then(function (successResponse) {
                console.log("movie");
                $scope.movie = $sce.trustAsHtml(successResponse.data.html);
            }).catch(function (error) {
                console.log(error);
            });
        }
        $http({
            method: 'GET',
            url: clientConfig.api + '/video/' + movieTitle,
            withCredentials: true
        }).then(function (successResponse) {
            $scope.trailer = $sce.trustAsHtml(successResponse.data.html);
        }).catch(function (error) {
            console.log(error);
        });
    };
});