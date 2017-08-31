(function () {

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    }

    $(window).scroll(function () {
        var navfixed = $('.navfixed');
        scroll = $(window).scrollTop();

        if (scroll >= 80) {
            navfixed.addClass('fixed');
            $('.backbtn').addClass('highlights');
            $('.sidebar').css('top', '51px');
        } else {
            navfixed.removeClass('fixed');
            $('.backbtn').removeClass('highlights');
            $('.sidebar').css('top', '108px');
        }
    });

    angular.module('travel.controller', ['travel.controller.login', 'travel.controller.main','travel.controller.ncbspostpage'])

    angular.module('travel.controller.login', [])
        .controller('loginCtrl', ['$scope', '$state', '$rootScope', 'getService', 'LoginService', function ($scope, $state, $rootScope, getService, LoginService) {
            $scope.loginData = {}
            $rootScope.isLoggedIn = false;
            $rootScope.loggedInUserName ="";
            $rootScope.logginName="";
			$rootScope.logginEmail="";
            $rootScope.loggedInUserID =0;
            $scope.login = function () {
			

                var data = {
                    username: $scope.loginData.username,
                    password: $scope.loginData.password
                };

				var dataSet = {
                    USER_ID: '1',
                    USERNAME: 'admin',
					PASSWORD: 'admin@123',
					FIRST_NAME:'admin',
					LAST_NAME:'admin',
					PRIMARY_EMAIL_ID:'pankaj.s@altencalsoftlabs.com'
                };
				
				
				//console.log(dataSet.USERNAME);
				
				if(dataSet.USERNAME==data.username && dataSet.PASSWORD==data.password){
					
					$rootScope.isLoggedIn = true;
					$rootScope.loggedInUserID = dataSet.USER_ID;
					$rootScope.loggedInUserName = dataSet.USERNAME;
					$rootScope.logginName = dataSet.FIRST_NAME + dataSet.LAST_NAME;
					$rootScope.logginEmail = dataSet.PRIMARY_EMAIL_ID;
						
					 LoginService.setLogin(dataSet);
                     $state.go("home");
						
					console.log(dataSet);
					
				}else{
					alert("Invalid User or Wrong Password");
				}
				
       
            }
			
		
		


    }]);

    angular.module('travel.controller.main', [])
        .controller('mainCtrl', ['$http', '$scope', '$rootScope', '$state', 'getService','$window', 'ModalService', function ($http, $scope, $rootScope, $state, getService, $window,ModalService) {
			
			
			
			
			
    }]);

	angular.module('travel.controller.ncbspostpage', [])
        .controller('ncbspostpageCtrl', ['$http', '$scope', '$rootScope', '$state', 'getService','$window', 'ModalService', function ($http, $scope, $rootScope, $state, getService, $window,ModalService) {

    }]);

})();