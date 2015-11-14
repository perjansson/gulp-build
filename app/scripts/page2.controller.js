(function() {
  'use strict';

  angular
    .module('gulpBuildApp')
    .controller('Page2Controller', ['$http', Page2Controller]);

  function Page2Controller($http) {
    var vm = this;
    vm.gulpFile = undefined;

    activate();

    function activate() {
      $http.get('gulpfile.js')
        .success(function(response) {
          vm.gulpFile = response;
      });
    }
  };

})();
