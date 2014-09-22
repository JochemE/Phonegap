angular.module('app.controllers', [])
  .controller('AppCtrl', function ($scope, $ionicModal, $log) {
    $scope.menuItems = [
      { title: 'Home', href: '#/app/home' },
      { title: 'Overview', href: '#/app/overview' },
      { title: 'Settings', href: '#/app/settings' },
      { title: 'Logout', href: '#/app/logout' }
    ];

    $ionicModal.fromTemplateUrl('templates/login.html', function (modal) {
        $scope.loginModal = modal;
      },
      {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }
    );
    $scope.$on('$destroy', function () {
      $scope.loginModal.remove();
    });
  });