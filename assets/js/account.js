nowave.controller('AccountCtrl', function($scope, $http) {
    'use strict';

    $scope.handleStripe = function(status, response) {

        $scope.loading = true;

        if (!isStripeValid(response)) {
            $scope.loading = false;
            return false;
        } else {

            var stripeToken = response.id;

            $http({
                method  : 'POST',
                url     : 'http://localhost:8080/api/users',
                data    : {
                    stripeToken: stripeToken,
                    user: $scope.user
                }
            }).then(function(response){
                console.log(response);
                $scope.loading = true;
            }).catch(function(error){
                console.log(error);
                $scope.error = error;
                $scope.loading = true;
            });

        }

    };

    var message = 'Une erreur est survenue pendant la transaction et votre carte n\'a pas été débitée.<br><br>Veuillez réessayer ultérieurement.';
    function isStripeValid(response) {
                if (response.error) {
                    switch (response.error.type) {
                        case 'RateLimitError':
                        case 'StripeInvalidRequestError':
                        case 'StripeAPIError':
                        case 'StripeConnectionError':
                        case 'StripeAuthenticationError':
                            $scope.error =  message;
                            break;
                        case 'StripeCardError':
                            stripeCardError(response);
                            break;
                    }
                    return false;
                } else {
                    return true;
                }
            }

            function stripeCardError(response) {

                if (response.error.param) {
                    $scope.error.card = response.error.param === 'card' ? true : false;
                    $scope.error.expiry = response.error.param === 'card[exp_month]' ? true : false;
                    $scope.error.expiry = response.error.param === 'card[exp_year]' ? true : false;
                    $scope.error.cvc = response.error.param === 'cvc' ? true : false;
                }

                if (response.error.code) {
                    $scope.error.card =
                        response.error.code === 'invalid_number' ||
                        response.error.code === 'incorrect_number' ||
                        response.error.code === 'expired_card' ||
                        response.error.code === 'card_declined' ? true : false;

                    $scope.error.expiry =
                        response.error.code === 'invalid_expiry_month' ||
                        response.error.code === 'invalid_expiry_year' ||
                        response.error.code === 'expired_card' ||
                        response.error.code === 'card_declined' ? true : false;

                    $scope.error.cvc =
                        response.error.code === 'invalid_cvc' ||
                        response.error.code === 'expired_card' ||
                        response.error.code === 'incorrect_cvc' ||
                        response.error.code === 'card_declined' ? true : false;

                    if (response.error.code === 'missing' || response.error.code === 'processing_error') {
                        $scope.error =  message;
                    }
                }
            }

});
