var servicekey = "b03fc9ace2d2464fa59f";
var secretkey = "697d6f6b83fc407e82a3";
var token;

function auth(){
  $.ajax({
    type: "get",
    url: "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
    async: false,
    data: {
      "consumer_key": servicekey,
      "consumer_secret": secretkey
    },
    success: function (data){
      token = data.result.accessToken;
    }
  });
  return token
}

function get_population(gotToken){
  console.log(gotToken)

  var settings_population = {
    "url": "https://sgisapi.kostat.go.kr/OpenAPI3/stats/searchpopulation.json",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    "data": {
      "accessToken": gotToken,
      "year": "2018"
    }
  }
  
  $.ajax(settings_population).done(function (response) {
    console.log(response);
  });
}

get_population(auth())