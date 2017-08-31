(function () {	
    window.environment = document.location.origin+"/admin/restPhp/api";
    var SERVICE_ROOT_URL = window.environment;
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }
    angular.module('travel.services', [])
        .constant('SERVICE', {
            loginData:SERVICE_ROOT_URL+'/users/login',
        })
    
     .service('LoginService',  function ($rootScope, $state) {
            var _user ={};
            this.setLogin = function (userObj) {
                console.log(JSON.stringify(userObj));
                _user = userObj;
            };
            this.isLoggedIn = function () {
                console.log(JSON.stringify(_user));
                return _user.USERNAME ? true : false;
            };
            this.getUser = function () {
                return _user;
            };
            
        })

    .factory('getService', function ($http, SERVICE) {
        return {
            login: function (dataSet) {
              //  return $http.post(SERVICE.loginData, dataSet, config).then(function (result) {
                //  return $scope.dataSet;
               // });
            },
        }
    })

    .filter("reverse", function () {
        return function (items) {
             if (!items) {
                   return;
               }
            return items.slice().reverse();
        };
    })
    
    .filter("dateOnly", function () {
        return function (date) {
            return date.substring(0,4)+'-'+date.substring(5,7)+'-'+date.substring(8,10); 
        };
    })

    
    .filter("timeOnly", function () {
        return function (date) {
            return date.substring(11,13)+':'+date.substring(14,16);
        };
    })
    
    .filter('dateRange', function() {
    return function(records, from, to) {
        return records.filter(function(record) {
            if(from && to)
                return record.PUNCH_DATE >= from && record.PUNCH_DATE <= to;
            else
                return record.PUNCH_DATE;
        });
    }
})
    .filter("ZoneConversion", function () {
        return function (item) {
            var unixTimeStamp = moment(item).unix()*1000;
            var convertedDate = moment(unixTimeStamp).format('MMMM Do YYYY, h:mm:ss a')
            return convertedDate;
        };
    })
    
     .directive('myTarget', function () {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                  var href = element.href;
                  if(true) {  // replace with your condition
                    element.attr("target", "_blank");
                  }
                }
            };
        })

        .directive('myTarget', function () {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                  var href = element.href;
                  if(true) {  // replace with your condition
                    element.attr("target", "_blank");
                  }
                }
            };
        })
    
        .directive('fileDropzone', function () {
    return {
        restrict: 'A',
        scope: {
            file: '=',
            fileName: '='
        },
        link: function (scope, element, attrs) {
            var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
            processDragOverOrEnter = function (event) {
                if (event != null) {
                    event.preventDefault();
                }
                event.dataTransfer.effectAllowed = 'copy';
                return false;
            };
            validMimeTypes = attrs.fileDropzone;
            checkSize = function (size) {
                var _ref;
                if ((_ref = attrs.maxFileSize) === void 0 || _ref === '' || size / 4000 / 4000 < attrs.maxFileSize) {
                    return true;
                } else {
                    alert('File must be smaller than ' + attrs.maxFileSize + ' MB');
                    return false;
                }
            };
            isTypeValid = function (type) {
                if (validMimeTypes === void 0 || validMimeTypes === '' || validMimeTypes.indexOf(type) > -1) {
                    return true;
                } else {
                    alert('Invalid file type.  File must be one of following types ' + validMimeTypes);
                    return false;
                }
            };
            element.bind('dragover', processDragOverOrEnter);
            element.bind('dragenter', processDragOverOrEnter);
            return element.bind('drop', function (event) {
                var file, name, reader, size, type;
                if (event != null) {
                    event.preventDefault();
                }
                reader = new FileReader();
                reader.onload = function (evt) {
                    if (checkSize(size) && isTypeValid(type)) {
                        return scope.$apply(function () {
                            scope.file = evt.target.result;
                            if (angular.isString(scope.fileName)) {
                                return scope.fileName = name;
                            }
                        });
                    }
                };
                file = event.dataTransfer.files[0];
                name = file.name;
                type = file.type;
                size = file.size;
                reader.readAsDataURL(file);
                return false;
            });
        }
    };
}).directive('fileread', [function () {
        return {
            scope: { fileread: '=' },
            link: function (scope, element, attributes) {
                element.bind('change', function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                            
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }])
    
    .directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })
 
    .directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
})
    
    .directive("directiveWhenScrolled", function() {
  return function(scope, elm, attr) {
    var raw = elm[0];

    elm.bind('scroll', function() {
      if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
        scope.$apply(attr.directiveWhenScrolled);
      }
    });
  };
})
    
    .directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }])
    
   .directive('myIframe', function(){
    var linkFn = function(scope, element, attrs) {
        element.find('iframe').bind('load', function (event) {
          event.target.contentWindow.scrollTo(0,400);
        });
    };
    return {
      restrict: 'EA',
      scope: {
        src:'&src',
        height: '@height',
        width: '@width',
        scrolling: '@scrolling'
      },
      template: '<iframe class="frame" height="{{height}}" width="{{width}}" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="{{scrolling}}" src="{{src()}}"></iframe>',
      link : linkFn
    };
  }).directive('dragable', function(){   
  return {
    restrict: 'A',
    link : function(scope,elem,attr){
      $(elem).draggable();
    }
  }  
});

})();
