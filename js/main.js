
$user = new Object();
$user.name = "";
$user.profession = "文";
$user.hp = 10;
$user.good = 0;

var NowAct = 1;

$("#step1 a.btn").click(function(e){
  e.stopPropagation();
  $user.name = $("input[name='name']").val();
  $user.profession = $("input[name='major']:checked").val();
  change1();
  next_act(2);
})

$("#step2 a.choice").click(function(e) {
  e.stopPropagation()
  if ($(this).data("ans")) {
    next_act(3);
  } else {
    $("#step2 div.text").fadeOut(function(){
      $("#step2 div.result").fadeIn();

      $("#step2 div.result a.btn").click(function(e){
        e.stopPropagation();
        next_act(3);
      });
    })
  }
})

function next_act(n) {
  NowAct = n;
  $("#main-warpper").animate({top:'-' + (n-1) + '00%'}, "slow");
  // $("#step" + NowAct).slideUp(1000, function(){
  //   $("#step" + (NowAct+1)).fadeIn();
  // })
}

function change1() {
  if ($user.profession == "文") {
    $("#step3-pro").text("文学院的严教授")
  } else {
    $("#step3-pro").text("理学院的陈教授")
  }
}