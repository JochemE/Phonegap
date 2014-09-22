'use strict';

angular.module('app.controllers').controller('app.logout', [])
  .controller('LogoutCtrl', function ($scope, AuthenticationService) {
    AuthenticationService.logout();
  })