
$user = new Object();
$user.name = "";
$user.profession = "文";
$user.hp = 10;    // 生命值
$user.good = 0;   // 
$user.tutor = 0;  // 0陈 1严

var NowAct = 1;

$(document).ready(function(){
  // 定义所有下一页标签
  $("a.next").click(function(){
    next_act($(this).data("next"));
  })

  // 设置所有选项动作
  // $("a.choice").click(function(){
  //   $(this).parents("div.choice").data("choice")
  // })
})

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

      // $("#step2 div.result a.btn").click(function(e){
      //   e.stopPropagation();
      //   next_act(3);
      // });
    })
  }
})

$("#step3 a.choice").click(function(e){
  e.stopPropagation();
  $user.tutor = $(this).data("ans");
  $("#step3 div.result").fadeIn();
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