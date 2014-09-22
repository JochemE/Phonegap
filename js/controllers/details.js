'use strict';

angular.module('app.controllers').controller('app.details', [])
  .controller('DetailsCtrl', function ($scope, $stateParams, $http) {
    $scope.holiday = [];

    var url = 'https://holiday/' + $stateParams.holidayRequestId;
    $http.get(url)
      .success(function (data, status, headers, config) {
        $scope.holiday = data;
      })
      .error(function (data, status, headers, config) {
        console.log("Error occurred.  Status:" + status);
      });
  });