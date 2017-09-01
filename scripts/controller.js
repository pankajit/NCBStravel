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
		
		 $scope.uploadme = {};
         $scope.uploadme.src = '';
			
		$scope.addUserData = {};	
			
		  $scope.OnSubmitUser = function () {
                var data = {
                    missiontype: $scope.addUserData.missiontype,
                    traveltype: $scope.addUserData.traveltype,
                    traveldestination: $scope.addUserData.traveldestination,
                    tickettrip: $scope.addUserData.tickettrip,
                    road: $scope.addUserData.road,
                    total_kilometter_travel: $scope.addUserData.total_kilometter_travel,
                    travel_start_date: $scope.addUserData.travel_start_date,
                    depature_time:$scope.addUserData.depature_time,
                    travel_return_date: $scope.addUserData.travel_return_date,
                    arrival_time: $scope.addUserData.arrival_time,
                    number_of_days_travelled: $scope.addUserData.number_of_days_travelled,
                    accomodation_arranged_by: $scope.addUserData.accomodation_arranged_by,
					travel_category: $scope.addUserData.travel_category,
					employee_category: $scope.addUserData.employee_category,
					air_ticket_arranged_by: $scope.addUserData.air_ticket_arranged_by,
					road_arranged_by: $scope.addUserData.road_arranged_by,
					other_expenses: $scope.addUserData.other_expenses,
					perdiem: $scope.addUserData.perdiem,
					total_perdiem: $scope.addUserData.total_perdiem,
					hotel_name: $scope.addUserData.hotel_name,
					pnr_number: $scope.addUserData.pnr_number,
					description: $scope.addUserData.description,
					//i_IMAGE: $scope.uploadme.src || ''
                };




                if ($scope.addUserForm.$valid) {
                    /*getService.addUser(data).then(function (response) {

                        $state.go('users');
                    });*/
					//alert('hello');
					console.log(data);

                }
                var form = $scope.addUserForm;
                //Force the field validation
                angular.forEach(form, function (obj) {
                    if (angular.isObject(obj) && angular.isDefined(obj.$setDirty)) {
                        obj.$setDirty();
                    }
                })
            }
			
			
    }]);

	angular.module('travel.controller.ncbspostpage', [])
        .controller('ncbspostpageCtrl', ['$http', '$scope', '$rootScope', '$state', 'getService','$window', 'ModalService',function ($http, $scope, $rootScope, $state, getService, $window,ModalService) {

		$scope.addPostData = {};	
			
		  $scope.OnSubmitPostTravel = function () {
                var data = {
                    missiontype: $scope.addPostData.missiontype,
                    traveltype: $scope.addPostData.traveltype,
                    traveltype: $scope.addPostData.traveltype,
                    tickettrip: $scope.addPostData.tickettrip,
                    road: $scope.addPostData.road,
                    total_kilometter_travel: $scope.addPostData.total_kilometter_travel,
                    travel_start_date: $scope.addPostData.travel_start_date,
                    depature_time:$scope.addPostData.depature_time,
                    travel_return_date: $scope.addPostData.travel_return_date,
                    arrival_time: $scope.addPostData.arrival_time,
                    number_of_days_travelled: $scope.addPostData.number_of_days_travelled,
                    accomodation_arranged_by: $scope.addPostData.accomodation_arranged_by,
					travel_category: $scope.addPostData.travel_category,
					employee_category: $scope.addPostData.employee_category,
					air_ticket_arranged_by: $scope.addPostData.air_ticket_arranged_by,
					road_arranged_by: $scope.addPostData.road_arranged_by,
					other_expenses: $scope.addPostData.other_expenses,
					perdiem: $scope.addPostData.perdiem,
					total_perdiem: $scope.addPostData.total_perdiem,
					hotel_name: $scope.addPostData.hotel_name,
					pnr_number: $scope.addPostData.pnr_number,
					description: $scope.addPostData.description,
					//i_IMAGE: $scope.uploadme.src || ''
                };

                if ($scope.addPostForm.$valid) {
                    
					//alert('hello');
					console.log(data);
                    
                }
                var form = $scope.addPostForm;
                //Force the field validation
                angular.forEach(form, function (obj) {
                    if (angular.isObject(obj) && angular.isDefined(obj.$setDirty)) {
                        obj.$setDirty();
                    }
                })
            }
			

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