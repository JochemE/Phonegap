'use strict';

angular.module('app.controllers').controller('app.login', [])
  .controller('LoginCtrl', function ($scope, $http, $state, AuthenticationService, $ionicViewService) {
    $scope.message = "";
    $scope.user = {
      username: null,
      password: null
    };

    $scope.login = function () {
      AuthenticationService.login($scope.user);
    };

    console.log('init login controller');
    $scope.$on('event:auth-loginRequired', function (e, rejection) {
      $scope.loginModal.show();
    });

    $scope.$on('event:auth-loginConfirmed', function () {
      $scope.username = null;
      $scope.password = null;
      $scope.loginModal.hide();
    });

    $scope.$on('event:auth-login-failed', function (e, status) {
      var error = "Login failed.";
      if (status == 401) {
        error = "Invalid Username or Password.";
      }
      $scope.message = error;
    });

    $scope.$on('event:auth-logout-complete', function () {
      $ionicViewService.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('app.home', {}, { location: "replace", reload: true, inherit: false});
    });
  })