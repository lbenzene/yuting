
$user = new Object();
$user.name = "";
$user.major = "文";
$user.gender = "M"; // 0男 1女
$user.hp = 10;    // 生命值
$user.good = 0;   // 
$user.tutor = 0;  // 0陈 1严

var NowAct = 1;

$(document).ready(function(){
  // 定义所有下一页标签
  $("a.next").click(function(){
    next_act($(this).data("next"));
  })

  $(".section").click(function(){
    $(this).find("div.choice").fadeIn();
    $(this).unbind();
  })


  // 设置所有选项动作
  // $("a.choice").click(function(){
  //   $(this).parents("div.choice").data("choice")
  // })
})

$("#step1").click(function() {
  $("form#info").fadeIn();
})

$("#step1 a.btn").click(function(e){
  e.stopPropagation();
  $user.name = $("input[name='name']").val();
  $user.major = $("input[name='major']:checked").val();
  $user.gender = $("input[name='gender']:checked").val();
  change1();
  console.log($user);
  next_act(2);
})

$("a.choice").click(function(){
  $(this).siblings("a.choice").unbind();
  $(this).unbind().addClass("active");
})

$("#step2 a.choice").click(function(e) {
  e.stopPropagation()
  if ($(this).data("ans")) {
    $("#step3 img.bgimg").attr("src", "img/page2_2.jpg");
    next_act(3);
  } else {
    $("#step3 img.bgimg").attr("src", "img/page2_4.jpg");
    $("#step2 div.text").fadeOut(function(){
      $("#step2 div.result").fadeIn();
    })
  }
})

$("#step3 a.choice").click(function(e){
  e.stopPropagation();
  $user.tutor = $(this).data("ans");
  $("#step3 div.text").fadeOut(function(){
    $("#step3 div.result").fadeIn();
  })
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
  $("#step5 div.text").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step6 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step6 div.result");
  var text = "";
  if ($(this).data("ans")) {
    text = "家人送来的温暖让你得以在这个苦寒的夜晚有了片刻安睡。"
  } else {
    text = "你不由分说为紫云同学披上了冬衣。<br>一夜苦寒，第二天清早你便发起了高烧。"
  }
  DIV.prepend("<p>" + text + "</p>");
  $("#step6 div.text").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step7").click(function() {
  var temp = "";
  if ($user.gender == "M") {
    temp = "<p>你们主动把客车车厢让给了女同学和教授，挤进了敞篷铁车皮里。"
    temp += "风从一个个弹孔中钻进脖子，你们冷的直打哆嗦，又怕染上风寒，不敢睡觉，只能一路高唱《松花江上》给自己鼓劲儿。</p>";
  } else if ($user.gender == "F") {
    temp = "<p>男生们展现绅士风度，主动把客车车厢让给了教授和女孩子们，一股脑挤进了敞篷铁皮车里，你得以在客车厢里睡了安稳的一觉。</p>";
    temp += "<p>第二天，看到许多男生的棉衣都破破烂烂地露出棉絮，你好奇地问他们怎么搞的，男孩子们不好意思地告诉你，货车的车皮恐怕都被子弹打过，到处是枪眼，一不小心衣服就被刮破了。"
    temp += "你听了心里极不是滋味，好在离家前跟母亲学过点女红，可以帮他们补补衣裳。</p>";
  }
  $(this).find("div.text").fadeOut(function() {
    $("#step7 div.result").prepend(temp).fadeIn();
  })
})

$("#step8 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step8 div.result");
  var text = "";
  if ($(this).data("ans")) {
    text = "在自修室里，你遇到了";
    if ($user.gender == "M") {
      text += "紫云";
    } else if ($user.gender == "F") {
      text += "丹阳";
    }
    text += "，你们分享着同一盏菜油灯，各自解着X、Y,念着ABCD。半点豆样大小的黄灯光，照亮了你们沉思的脸庞。";
  } else {
    text = "这次考试你完美避开了所有得分点。看着成绩单，你幡然悔悟：<br>既然选择了要在国难当头之时继续做个学生，就要拿出学生的样子来。"
  }
  DIV.prepend("<p>" + text + "</p>");
  $("#step8 div.text").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step9").click(function() {
  var temp = "";
  if ($user.major == "理") {
    temp = "<p>雨终日不止，山花谢了又开，每日卯时即起，晨曦中埋头苦读，做实验，刷试管；"
    temp += "又复三更灯火，月色下冥思静想，写报告，做分析。这样简朴单纯的生活，尽管清苦，却也十分充实。</p>";
  } else if ($user.major == "文") {
    temp = "<p>你每日黎明即起，在朝阳之下，漫山遍野，朗诵默读。</p>";
    temp += "<p>黄昏时分，你时常呆在竺校长新栽的常青柏边，思考先生讲过的抗战与士风。</p>"
    temp += "<p>小树摇摇曳曳，世界静默的好像一个漫长的镜头。</p>";
  }
  $(this).find("div.text").fadeOut(function() {
    $("#step9 div.result").prepend(temp).fadeIn();
  })
})

function next_act(n) {
  n;
  // 滑动效果
  // $("#main-warpper").animate({top:'-' + (n-1) + '00%'}, "slow");
  // 
  // 淡入淡出效果
  $("#step" + (n-1)).fadeOut(500, function(){
    $("#step" + n).fadeIn(900);
  })
}

function change1() {
  if ($user.gender == "F") {  
      // 4-3男生版本
    $("#step5 div.choice").remove();
    var btn = '<a class="btn next" data-next="6">继续</a>';
    $("#step5 div.text").append(btn)
    .children("a.btn").click(function (){
      next_act($(this).data("next"));
    })
      // 6 女生

  }

  if ($user.gender == "M") {

  }
}
