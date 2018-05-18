
$user = new Object();
$user.name = "";
$user.profession = "文";
$user.gender = 0; // 0男 1女
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

$("a.choice").click(function(){
  $(this).siblings("a.choice").unbind();
  $(this).unbind().addClass("active");
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

$("#step5 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step5 div.result");
  var text = "";
  if ($(this).data("ans")) {
    text = "次日，金华遭到三架重型轰炸机狂炸，你虽身经其险，好在躲避及时，幸未遭害。"
  } else {
    text = "次日，金华遭到三架重型轰炸机狂炸，你在街上避难之时受了轻伤。"
  }
  DIV.children("p").text(text);
  DIV.fadeIn();
})

$("#step6 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step6 div.result");
  var text = "";
  if ($(this).data("ans")) {
    text = "家人送来的温暖让你得以在这个苦寒的夜晚有了片刻安睡。"
  } else {
    text = "你不由分说为紫云同学披上了冬衣。一夜苦寒，第二天清早你便发起了高烧。"
  }
  DIV.children("p").text(text);
  DIV.fadeIn();
})

function next_act(n) {
  NowAct = n;
  $("#main-warpper").animate({top:'-' + (n-1) + '00%'}, "slow");
  // $("#step" + NowAct).slideUp(1000, function(){
  //   $("#step" + (NowAct+1)).fadeIn();
  // })
}

function change1() {
  if ($user.gender == 1) {  // 女生不触发
    $("#step5 div.choice").remove();
    var btn = '<a class="btn next" data-next="6">继续</a>';
    $("#step5 div.text").append(btn)
    .children("a.btn").click(function (){
      next_act($(this).data("next"));
    })
  }
}
