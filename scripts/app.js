(function () { 


var travelApp = angular.module('travelApp', ['ui.router', 'ngTagsInput', 'ngSanitize', 'widget.scrollbar', 'wxy.pushmenu', 'localytics.directives', 'nya.bootstrap.select', 'froala', 'uiSwitch','uniqueField', 'ngToast', 'travel.controller', 'travel.services', 'angularModalService', 'ui.bootstrap.datetimepicker', 'simditor','validation.match', '720kb.datepicker', 'ngAnimate', 'angularjs-datetime-picker']);


travelApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/main.html',
            controller: 'mainCtrl'
        })
       .state('ncbspostpage', {
            url: '/ncbspostpage',
            templateUrl: 'views/postpage.html',
            controller: 'ncbspostpageCtrl'
        })
		.state('approval', {
            url: '/approval',
            templateUrl: 'views/approval.html',
            controller: 'approvalCtrl'
        });
    $urlRouterProvider.otherwise('/login');
});

travelApp.config(function($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
});
    
    travelApp.run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      
      var shouldLogin = $rootScope.isLoggedIn;
	  
        // NOT authenticated - wants any private stuff

        if(!shouldLogin || fromState.name === "") {

           
           if(toState.name === 'login')
                    return;
                $state.go('login');
                event.preventDefault();
            } else {
                if(toState.name === toState.name)
                    return;
                $state.go(toState.name);

                event.preventDefault();

            }
      
     if (toState.isLoginRequired) {
            if (!$rootScope.isLoggedIn()) {
                $state.go('login');
                e.preventDefault();
            }
        }
    })
  $rootScope.$on('$stateChangeError',
                function (event, toState, toParams, fromState, fromParams, error) {
                    
                });

    });

})();
