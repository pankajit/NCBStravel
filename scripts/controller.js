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

    angular.module('travel.controller', ['travel.controller.login', 'travel.controller.main','travel.controller.ncbspostpage','travel.controller.approval'])

    angular.module('travel.controller.login', [])
        .controller('loginCtrl', ['$scope', '$state', '$rootScope', 'getService', 'LoginService', function ($scope, $state, $rootScope, getService, LoginService) {
            $scope.loginData = {}
            $rootScope.isLoggedIn = false;
            $rootScope.loggedInUserName ="";
            $rootScope.logginName="";
			$rootScope.logginEmail="";
			$rootScope.logginEmpNo="";
			$rootScope.logginBusinessNo="";
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
					PRIMARY_EMAIL_ID:'pankaj.s@altencalsoftlabs.com',
					EMPLOYEE_NO:'1234',
					BUSINESS_NO:'A'
                };
				
				
				//console.log(dataSet.USERNAME);
				
				if(dataSet.USERNAME==data.username && dataSet.PASSWORD==data.password){
					
					$rootScope.isLoggedIn = true;
					$rootScope.loggedInUserID = dataSet.USER_ID;
					$rootScope.loggedInUserName = dataSet.USERNAME;
					$rootScope.logginName = dataSet.FIRST_NAME +" "+ dataSet.LAST_NAME;
					$rootScope.logginEmail = dataSet.PRIMARY_EMAIL_ID;
					$rootScope.logginEmpNo = dataSet.EMPLOYEE_NO;
					$rootScope.logginBusinessNo = dataSet.BUSINESS_NO;
						
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
			
			
		$scope.addUserData = {};	
			
		 /* $scope.OnSubmitUser = function () {

               if ($scope.events.length == 0)
                    $scope.eventsEmptyArr = true;
                else
                    $scope.eventsEmptyArr = false;


                var data = {
                    i_FIRST_NAME: $scope.addUserData.first_name,
                    i_LAST_NAME: $scope.addUserData.last_name,
                    i_DESIGNATION: $scope.addUserData.designation,
                    i_PRIMARY_EMAIL_ID: $scope.addUserData.email_id,
                    i_WORK_PHONE: $scope.addUserData.work_phone,
                    i_CELL_PHONE: $scope.addUserData.cell_phone,
                    i_USER_ROLE: $scope.addUserData.user_role | 'Manager',
                    i_BADGE_ID:$scope.addUserData.badge_id,
                    i_COUNTRY: $scope.events[0] || null,
                    i_CITY: $scope.events[1] || null,
                    i_ADDR1: $scope.events[2] || null,
                    i_ADDR2: $scope.events[3] || null,
                    i_ADDR3: $scope.events[4] || null,
                    i_ADDR4: $scope.events[5] || null,
                    i_IS_ACTIVE: $scope.addUserData.is_active,
                    i_USERNAME: $scope.addUserData.user_name,
                    i_PASSWORD: $scope.addUserData.password,
                    i_CONFIRM_PWD: $scope.addUserData.confirm_password,
                    i_IMAGE: $scope.uploadme.src || '',
                    i_CREATED_BY: "admin",
                    i_LAST_UPDATED_BY: "admin",
                };




                if ($scope.addUserForm.$valid && !$scope.eventsEmptyArr) {
                    getService.addUser(data).then(function (response) {

                        $state.go('users');
                        
                    });
                    
                }
                var form = $scope.addUserForm;
                //Force the field validation
                angular.forEach(form, function (obj) {
                    if (angular.isObject(obj) && angular.isDefined(obj.$setDirty)) {
                        obj.$setDirty();
                    }
                })
            }*/
			
			
    }]);

	angular.module('travel.controller.ncbspostpage', [])
        .controller('ncbspostpageCtrl', ['$http', '$scope', '$rootScope', '$state', 'getService','$window', 'ModalService', function ($http, $scope, $rootScope, $state, getService, $window,ModalService) {

    }]);
	
	angular.module('travel.controller.approval', [])
        .controller('approvalCtrl', ['$http', '$scope', '$rootScope', '$state', 'getService','$window', 'ModalService', function ($http, $scope, $rootScope, $state, getService, $window,ModalService) {
			
			
			 $scope.pre_travel = [
                {
					ID: '1',
					MISSION_TYPE: 'Test',
					TRAVEL_TYPE: 'First Class',
					TRAVEL_DESTINATION: 'New York',
					TICKET_TRIP: 'Flight',
					STATUS: 'Inprocess'
                },
				{
					ID: '2',
					MISSION_TYPE: 'Test 2',
					TRAVEL_TYPE: 'First Class',
					TRAVEL_DESTINATION: 'GOA',
					TICKET_TRIP: 'Flight',
					STATUS: 'Approved'
                }
				];

    }]);

})();