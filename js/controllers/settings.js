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
  .controller('SettingsCtrl', function ($scope, $stateParams, $log) {
    $log.info('Browsing settings')

    $scope.hostUrl = 'https://www.website.nl/api'
  })