(function() {
  'use strict';

  angular
    .module('gulpBuildApp')
    .config(['$stateProvider', '$urlRouterProvider', routeConfig]);

  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('page1', {
        url: '/page1',
        templateUrl: 'app/partials/page1.html',
        controller: 'Page1Controller as vm'
      })

    .state('page2', {
      url: '/page2',
      templateUrl: 'app/partials/page2.html',
      controller: 'Page2Controller as vm'
    });

    $urlRouterProvider.otherwise('/page1');

  };

  angular
    .module('gulpBuildApp')
    .run(function($state, $rootScope) {
      $rootScope.$on("$stateChangeError", console.log.bind(console));
    });

})();
