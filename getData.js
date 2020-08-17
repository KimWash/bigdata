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

function checkplma(value){
  if (Math.sign(value) == 1){
    return "<i class='fa fa-arrow-up'> "
  }
  else if (Math.sign(value) == -1){
    return "<i class='fas fa-arrow-down'> "
  }
  else if (Math.sign(value) == 0){
    return ""
  }
}

function get_population(gotToken){
  console.log(gotToken)
  
  var totalpop = 0;
  var avgage = 0;

  $.ajax({
    type: "get",
    url: "https://sgisapi.kostat.go.kr/OpenAPI3/stats/searchpopulation.json",
    async: true,
    data: {
      "accessToken": gotToken,
      "year": "2018"
    },
    success: function (data){
      for (var i in data.result){
        totalpop = totalpop+(data.result[i].population * 1);
        avgage = avgage+(data.result[i].avg_age * 1);
      }
      avgage = (avgage/17).toFixed(0)
      console.log("총인구: " + totalpop);
      console.log("평균연령: " + avgage)
      var totalpopdoc = document.getElementById("totalpopulation")
      totalpopdoc.innerHTML = totalpop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "명";
      
      var avgagedoc = document.getElementById("avgage");
      avgagedoc.innerHTML = avgage + "세"
      
      var totalpopprev = 0;
      var avgageprev = 0;
      $.ajax({
        type: "get",
        url: "https://sgisapi.kostat.go.kr/OpenAPI3/stats/searchpopulation.json",
        async: true,
        data: {
          "accessToken": gotToken,
          "year": "2017"
        },
        success: function (data){
          for (var i in data.result){
            totalpopprev = totalpopprev+(data.result[i].population * 1);
            avgageprev = avgageprev+(data.result[i].avg_age * 1);
          }
          avgageprev = (avgageprev/17).toFixed(0)
          console.log("평균연령: " + avgageprev)
          var poprate = (((totalpopprev - totalpop)/totalpop * 100)).toFixed(2)
          var agerate = (((avgageprev - avgage)/avgage * 100)).toFixed(2) * 1
    
          console.log("총인구 증감율: " + poprate);
          console.log("평균연령 증감율: " + agerate);

          if (agerate.toFixed(0) == 0){
            document.getElementById("avgagerate").innerHTML= checkplma(agerate)
          }
          else{
            document.getElementById("avgagerate").innerHTML= checkplma(agerate) + Math.abs(agerate) + "%"
          }
  
          document.getElementById("totalpoprate").innerHTML = checkplma(poprate) + Math.abs(poprate) + "%"

        }
      });
    }
  });



  $.ajax({
    type: "get",
    url: "https://sgisapi.kostat.go.kr/OpenAPI3/startupbiz/pplsummary.json",
    async: true,
    data: {
      "accessToken": gotToken,
      "adm_cd":"11040"
    },
    success: function (data){
      var oversixty = data.result[1].sixty_per*1 + data.result[1].seventy_more_than_per*1;
      console.log(oversixty);
      document.getElementById("oversixty").innerHTML = oversixty + "%"

    }
  })

  $.ajax({
    type: "get",
    url: "https://sgisapi.kostat.go.kr/OpenAPI3/stats/population.json",
    async: true,
    data: {
      "accessToken": gotToken,
      "year": "2018",
      "adm_cd": "11",
      "low_search": "0"
    },
    success: function (data){
      var unemployed = ((data.result[0].employee_cnt*1) / (data.result[0].tot_ppltn*1)) * 100
      console.log("실업자율: " + unemployed)
    }
  })
  

}


get_population(auth())