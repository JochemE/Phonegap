'use strict';

angular.module('app.controllers').controller('app.overview', [])
  .controller('OverviewCtrl', function ($scope, $http, holidayRepository) {
    console.log('init overview controller');

    $scope._holidayRequests = {};
    $scope.holidayRequests = function() {
      console.log('getting _requests');
      return $scope._holidayRequests;
    };

    holidayRepository.getAll().then(function(items) {
      console.log('getting requests');
      items.forEach(function(item) {
        $scope._holidayRequests[item.id] = {
          id:item.id,
          title: item.title,
          variant: item.variant,
          status:item.status,
          rev:item.rev
        };
      })
    });

    $scope.reload = function () {
      console.log('loading');
      $http.get('https://holidays')
      .success(function (data) {
        console.log('loaded');
        data.forEach(function(item)
        {
          var current = $scope._holidayRequests[item.id];
          if (!current || current.rev != item.rev) {
            holidayRepository.save(item);
            $scope._holidayRequests[item.id] = {
              id: item.id,
              title: item.title,
              variant: item.variant,
              status: item.status,
              rev: item.rev
            }
          }
        });
      })
      .error(function (data, status) {
        console.log("Error occurred.  Status:" + status);
      });
    };
  });