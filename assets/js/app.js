'use strict';

var nowave = angular
  .module('nowave', [
    'ngCookies',
    'ngSanitize',
    'angularPayments'
  ]);

nowave.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
});

function fetchConfig() {
  var initInjector = angular.injector(['ng']);
  var $http = initInjector.get('$http');
  var $log = initInjector.get('$log');
  var $window = initInjector.get('$window');



  var api = 'https://nowave-backend.herokuapp.com/api';


  return $http.get(api + '/config').then(function(response) {
      var config = response.data;
      config.api = api;
      nowave.constant('clientConfig', config);
      console.log(config);

    $window.Stripe.setPublishableKey(response.data.stripeKey);

  }, function(errorResponse) {
    $log.error(errorResponse);
  });
}

function bootstrapApplication() {
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['nowave']);
  });
}

fetchConfig().then(bootstrapApplication);
