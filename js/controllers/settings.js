'use strict';

angular.module('app.controllers').controller('app.settings', [])
  .config(function ($stateProvider) {
    console.log('init settings');

    $stateProvider
      .state('app.settings', {
        url: "/settings",
        views: {
          'menuContent': {
            templateUrl: "templates/settings.html",
            controller: 'SettingsCtrl'
          }
        }
      })
  })
  .controller('SettingsCtrl', function ($scope, $log, $rootScope, holidayRepository) {
    $log.info('Browsing settings');
    $rootScope.settings = {};

    $scope.hostUrl = 'https://www.website.nl/api';

    $scope.resetDatabase = function(){
      console.log('resetting...');
      $rootScope.db.destroy().then(function(info){
        console.log(JSON.stringify(info));

        $rootScope.db = new PouchDB('HolidayApproverVersion2', function(err, info) {
          if (err) { console.log('create db error:' +err) }
          else { console.log('create db success: ' + info) }
        });

        var holidays = [
          { title: 'Daddy day', id: 1, variant: 'Private', status: 'Requested', rev: 1 },
          { title: 'Long weekend', id: 2, variant: 'Private', status: 'Requested', rev: 1 },
          { title: 'Trip to Japan', id: 3, variant: 'Private', status: 'Approved', rev: 1  },
          { title: 'Christmas', id: 4, variant: 'Public', status: 'Requested', rev: 1 }
        ];
        holidays.forEach(function(holiday) {
          holidayRepository.save(holiday);
        });
      }, function(err) { console.log(err) });
    };

    $scope.save = function () {
      $rootScope.show('saving');

      setTimeout(function () {
          var settings = {
            _id: 'userSettings',
            hostUrl: $scope.hostUrl
          };
          $rootScope.db.put(settings, function callback(err){
            if (!err){
              console.log('saved :)');
            }
          });

          $rootScope.settings.hostUrl = $scope.hostUrl;
          $rootScope.hide();
      }, 500);
    }
  });