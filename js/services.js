angular.module('app.services', ['http-auth-interceptor'])
.factory('AuthenticationService', function($rootScope, $http, authService, $httpBackend) {
  var service = {
    login: function(user) {
      $http.post('https://login', { user: user }, { ignoreAuthModule: true })
        .success(function (data, status, headers, config) {
        	$http.defaults.headers.common.Authorization = data.authorizationToken;
            authService.loginConfirmed(data, function(config) {
              config.headers.Authorization = data.authorizationToken;
              return config;
            });
          })
        .error(function (data, status, headers, config) {
          $rootScope.$broadcast('event:auth-login-failed', status);
        });
    },
    logout: function(user) {
      $http.post('https://logout', {}, { ignoreAuthModule: true })
        .finally(function(data) {
          delete $http.defaults.headers.common.Authorization;
          $rootScope.$broadcast('event:auth-logout-complete');
      });			
    },	
    loginCancelled: function() {
      authService.loginCancelled();
    }
  };
  return service;
})