angular.module('test.httpBackend', ['http-auth-interceptor','ngMockE2E'])
  .run(function($ionicPlatform, $rootScope, $httpBackend, $http) {
    var authorized = false;
    var holidays = [
      { title: 'Daddy day', id: 1, variant: 'Private', status: 'Requested', rev: 1 },
      { title: 'Long weekend', id: 2, variant: 'Private', status: 'Requested', rev: 1 },
      { title: 'Trip to Japan', id: 3, variant: 'Private', status: 'Approved', rev: 2 },
      { title: 'Christmas', id: 4, variant: 'Public', status: 'Requested', rev: 1 },
      { title: 'Visit to customer A', id: 5, variant: 'Public', status: 'Requested', rev: 1 },
    ];

    $httpBackend.whenGET('https://holidays').respond(function (method, url, data, headers) {
      return authorized ? [200, holidays] : [401];
    });

    $httpBackend.whenGET(/\/holiday\/(\d*)/).respond(function (method, url, data, headers) {
      var requestId = url.substr(url.length-1,1);
      return authorized ? [200, holidays[requestId - 1]] : [401];
    });

    $httpBackend.whenPOST('https://login').respond(function (method, url, data) {
      var user = JSON.parse(data).user;
      if (user.username == user.password) {
        authorized = true;
        return  [200 , { authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy" } ];
      } else {
        authorized = false;
        return  [401];
      }
    });

    $httpBackend.whenPOST('https://logout').respond(function (method, url, data) {
      authorized = false;
      return [200];
    });

    $httpBackend.whenGET(/.*/).passThrough();
  });