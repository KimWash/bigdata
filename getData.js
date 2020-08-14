var servicekey = "b03fc9ace2d2464fa59f"
var secretkey = "697d6f6b83fc407e82a3"
var token

var settings = {
    "url": "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": "ipmsperf_uuid=2421812593300066160; JSESSIONID=b7jr7XwrLVaUiKBQc1EBIhiHbTGMcA6WBAIHqcZQCJvoD8hMVmNyDgugLEudUhfp.sgis_was1_servlet_engine2"
    },
    "data": {
      "consumer_key": servicekey,
      "consumer_secret": secretkey
    }
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    token = response
  });