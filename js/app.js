// App name 
// App description
angular.module('app.HolidayApprover', ['ionic',
  'app.controllers',
  'app.services',
  'test.httpBackend'
  ])
  .run(function($ionicPlatform, $rootScope, $httpBackend, $http) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.overview', {
      url: "/overview",
      views: {
        'menuContent' :{
          templateUrl: "templates/overview.html",
          controller: 'OverviewCtrl'
        }
      }
    })
    .state('app.details', {
      url: "/details/:holidayRequestId",
      views: {
        'menuContent' :{
          templateUrl: "templates/details.html",
          controller: 'DetailsCtrl'
        }
      }
    })
    .state('app.logout', {
      url: "/logout",
      views: {
        'menuContent' :{
          controller: "LogoutCtrl"
        }
      } 
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

