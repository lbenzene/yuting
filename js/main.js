
$user = new Object();
$user.name = "";
$user.profession = "文";
$user.gender = 0; // 0男 1女
$user.hp = 10;    // 生命值
$user.good = 0;   // 
$user.tutor = 0;  // 0陈 1严

var NowAct = 1;

var text = new Array();
text[1] = [
  "1937年8月，淞沪大战失利，中国前途危亡。家国飘摇之中，你迎来了18岁生日和一张来自<em>浙江大学</em>的录取通知书。",
  "选择你的性别、名字、文/理。"
]
text[2] = [
  "9月18号，天阴，时或有雨。",
  "今天是入学第二日，全校师生在细雨中召开了勿忘国耻六周年纪念大会。",
  "竺可桢校长在会上宣布，一年级新生要在一周后集体迁往天目山上的禅源寺，你决定："
]
var choice = new Array();
choice[1] = '<div class="choice" data-choice="1"><a class="choice" data-ans="0">禅源寺地处深山，<del>无线局域网信号不好</del>，没法和家人联络，我不想去</a><a class="choice" data-ans="1">既然校长决定要迁走，听说山里有猫，去撸撸看。</a></div>'
var n = new Array();
n[1] = 0;
n[2] = 0;

$("div.section").click(function(){
  var N = getNum($(this).attr("id"))[0];
  console.log(N);
  if (n[N] < text[N].length) {
    $(this).children("div.text").empty().append(text[N][n[N]]);
    n[N] += 1;
  }
})

$("#step1").click(function(){
  if (n[1] >= text[1].length) {
    $("form#info").fadeIn();
  }
})

$("#step2").click(function(){

  if (n[2] >= text[2].length) {
    $(this).children("div.text").append(choice[1]);
  }
})


$("#step1 a.btn").click(function(e){
  e.stopPropagation();
  $user.name = $("input[name='name']").val();
  $user.profession = $("input[name='major']:checked").val();
  change1();
  next_act(2);
})

$("#step2").click(function(){
  if (num2 < text2.length) {
    $(this).children("div.text").empty().append(text1[num1]);
    num1 += 1;
  } else {
    $("form#info").fadeIn();
  }
})


$(document).ready(function(){
  // 定义所有下一页标签
  $("a.next").click(function(){
    next_act($(this).data("next"));
  })

  add_listener();

  // 设置所有选项动作
  // $("a.choice").click(function(){
  //   $(this).parents("div.choice").data("choice")
  // })
})

function add_listener() {

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
      text = "你不由分说为紫云同学披上了冬衣。一夜苦寒，第二天清早你便发起了高烧。"
    } else {
      text = "家人送来的温暖让你得以在这个苦寒的夜晚有了片刻安睡。"
    }
    DIV.children("p").text(text);
    DIV.fadeIn();
  })
}



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

var getNum = function (Str) {
  if (typeof Str === "string") {

    var arr = Str.match(/\d/g);
    return arr.map(function (item) {
      return item;
    });
  } else {
    return [];
  }
}