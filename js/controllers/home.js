'use strict';

angular.module('app.controllers').controller('app.home', [])
  .config(function ($stateProvider) {
    console.log('init home');

    $stateProvider
      .state('app.home', {
        url: "/home",
        views: {
          'menuContent': {
            templateUrl: "templates/home.html",
            controller: 'HomeCtrl'
          }
        }
      })
  })
  .controller('HomeCtrl', function ($scope, $stateParams, $log, $state, $rootScope) {
    $log.info('Browse home');
  })