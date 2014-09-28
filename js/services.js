angular.module('app.services', ['http-auth-interceptor'])
  .factory('AuthenticationService', function ($rootScope, $http, authService) {
    function login (user) {
      $http.post('https://login', { user: user }, { ignoreAuthModule: true })
        .success(function (data) {
          $http.defaults.headers.common.Authorization = data.authorizationToken;
          authService.loginConfirmed(data, function (config) {
            config.headers.Authorization = data.authorizationToken;
            return config;
          });
        })
        .error(function (data, status) {
          $rootScope.$broadcast('event:auth-login-failed', status);
        });
    }

    function logout() {
      $http.post('https://logout', {}, { ignoreAuthModule: true })
        .finally(function () {
          delete $http.defaults.headers.common.Authorization;
          $rootScope.$broadcast('event:auth-logout-complete');
        });
    }

    function loginCancelled() {
      authService.loginCancelled();
    }

    return {
      login: login,
      logout: logout,
      loginCancelled: loginCancelled
    }
  })
  .factory('holidayRepository', function ($rootScope) {
    console.log('init holiday repo');

    function getAll() {
      var holidays = [];

      return $rootScope.db.allDocs({include_docs: true})
        .then(function(response) {
          response.rows.forEach(function (row) {
            holidays.push(row.doc);
          })
        })
        .then(function() {
          return holidays;
        });
    }

    function save(holiday) {
      holiday._id = holiday.id.toString();
      holiday.type = 'holiday';
      $rootScope.db.put(holiday, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('saved: ' + holiday)
        }
      });
    }

    return {
      getAll: getAll,
      save: save
    }
  });