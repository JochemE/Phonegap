// App name 
// App description
angular.module('app.HolidayApprover', ['ionic',
  'app.controllers',
  'app.services',
  'test.httpBackend'
  ])
  .run(function($ionicPlatform, $rootScope, $httpBackend, $http, $ionicLoading) {
    console.log('app running...');

    $rootScope.db = new PouchDB('HolidayApproverVersion2', function(err, info) {
      if (err) { console.log('create db error:' +err) }
      else { console.log('create db success: ' + info) }
    });

    $ionicPlatform.ready(function() {
      console.log('ionic ready!');
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      $rootScope.show = function (text) {
        $rootScope.loading = $ionicLoading.show({
          content: text ? text : 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
      };

      $rootScope.hide = function () {
        $ionicLoading.hide();
      };

      console.log('app ready!')
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

