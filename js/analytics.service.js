nowave.factory('AnalyticsService', function ($log, $window, clientConfig) {
    'use strict';

    if ($window.mixpanel) {
      $window.mixpanel.init(clientConfig.mixpanelKey);

      $log.debug('Mixpanel initialized');
    } else {
      $log.debug('Mixpanel not available');
    }

    return {

      track: function(eventName, properties) {
        if ($window.mixpanel) {

          $window.mixpanel.track(eventName, properties);
        } else {
          $log.debug('Analytics.track:',  eventName, properties);
        }
      },
      increment: function(property){
        if ($window.mixpanel) {
          $window.mixpanel.people.increment(property);
        } else {
          $log.debug('Analytics.increment:', property);
        }
      },
      createProfile: function(user) { // BEWARE : call only once on user creation !!
        if ($window.mixpanel) {

          $window.mixpanel.alias(user.email);

          $window.mixpanel.people.set({
            $created: new Date().toISOString(),
            $email: user.email,
            $fistname: user.firstname,
            $lastname: user.lastname,
            $name: user.firstname + " " + user.lastname
          });

        } else {
          $log.debug('Analytics.create_profile:', user);
        }
      },
      updateProfile: function(properties) {
        if ($window.mixpanel) {

          $window.mixpanel.people.set(properties);

        } else {
          $log.debug('Analytics.update_profile:', properties);
        }
      },
      identify: function(id){
        if ($window.mixpanel) {

          $window.mixpanel.identify(id);

        } else {
          console.log('Analytics.identify:', id);
        }
      }

    };

});
