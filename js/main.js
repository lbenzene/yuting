
$user = new Object();
$user.name = "";
$user.major = "文";
$user.gender = "M"; // 0男 1女
$user.hp = 10;    // 生命值
$user.good = 0;   // 
$user.tutor = "";
$user.fri = ""

var NowAct = 1;
var role4 = 0;
var role5 = 0;
var role7 = 0;

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

function oridinary(page) {
    $this = page;
    $this.unbind();
    $this.find("div.text").fadeOut(function(){
      $this.find("div.choice").fadeIn();
    })
}

$("#step1").click(function() {
  oridinary($(this));
})

$("#step2").click(function() {
  oridinary($(this));
})

$("#step3").click(function() {
  oridinary($(this));
})

$("#step4").click(function() {
  $this = $(this);
  // if (role4 == $this.children("div.text").size() - 2) {
  if (role4 == 0) {
    $this.unbind();
  }
  $this.children("div.text:eq(" + role4 + ")").fadeOut(function() {
    $this.children("div.text:eq(" + ++role4 + ")").fadeIn();
  });
})

$("#step5").click(function() {
  $this = $(this);
  if (role5 == 1) {
    $this.unbind();
  }
  if (role5 < 1) {
    $this.children("div.text:eq(" + role5 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role5 + ")").fadeIn();
    });    
  } else {
    if ($user.gender == "M") {
      $this.children("div.text:eq(" + role5++ + ")").fadeOut(function() {
        $this.children("div.choice").fadeIn();
      });    
    } else if ($user.gender == "F") {
      next_act(6);
    }
  }
})

$("#step6").click(function() {
    oridinary($(this));    
})

$("#step8").click(function() {
  oridinary($(this)); 
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
    $("#step2 div.choice").fadeOut(function(){
      $("#step2 div.result").fadeIn();
    })
  }
})

$("#step3 a.choice").click(function(e){
  e.stopPropagation();
  $user.tutor = $(this).data("ans");
  $("#step3 span").text($user.tutor);
  $("#step3 div.choice").fadeOut(function(){
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
  $("#step5 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step6 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step6 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text = "家人送来的温暖让你得以在这个苦寒的夜晚有了片刻安睡。"
  } else {
    text = "你不由分说为紫云同学披上了冬衣。<br>一夜苦寒，第二天清早你便发起了高烧。"
  }
  DIV.prepend("<p>" + text + "</p>");
  $("#step6 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step7").click(function() {
  $this = $(this);
  if (role7 == 1) {
    $this.unbind();
  }
  if (role7 < 1) {
    $this.children("div.text:eq(" + role7 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role7 + ")").fadeIn();
    });    
  } else {
    var temp = "";
    if ($user.gender == "M") {
      temp = "<p>你们主动把客车车厢让给了女同学和教授，挤进了敞篷铁车皮里。"
      temp += "风从一个个弹孔中钻进脖子，你们冷的直打哆嗦，又怕染上风寒，不敢睡觉，只能一路高唱《松花江上》给自己鼓劲儿。</p>";
    } else if ($user.gender == "F") {
      temp = "<p>男生们展现绅士风度，主动把客车车厢让给了教授和女孩子们，一股脑挤进了敞篷铁皮车里，你得以在客车厢里睡了安稳的一觉。</p>";
      temp += "<p>第二天，看到许多男生的棉衣都破破烂烂地露出棉絮，你好奇地问他们怎么搞的，男孩子们不好意思地告诉你，货车的车皮恐怕都被子弹打过，到处是枪眼，一不小心衣服就被刮破了。</p>"
      temp += "<p>你听了心里极不是滋味，好在离家前跟母亲学过点女红，可以帮他们补补衣裳。</p>";
    }
    $this.find("div.text:eq(" + role7++ + ")").fadeOut(function() {
      $("#step7 div.result").prepend(temp).fadeIn();
    })
  }
})

$("#step8 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step8 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text = "在自修室里，你遇到了";
    if ($user.gender == "M") {
      text += "紫云";
    } else if ($user.gender == "F") {
      text += "丹阳";
    }
    text += "你们分享着同一盏菜油灯，各自解着X、Y,念着ABCD。半点豆样大小的黄灯光，照亮了你们沉思的脸庞。";
  } else {
    text = "这次考试你完美避开了所有得分点。看着成绩单，你幡然悔悟：<br>既然选择了要在国难当头之时继续做个学生，就要拿出学生的样子来。"
  }
  DIV.prepend("<p>" + text + "</p>");
  $("#step8 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step9").click(function() {
  $(this).unbind();
  var temp = "";
  if ($user.major == "理") {
    temp = "<p>雨终日不止，山花谢了又开，每日卯时即起，晨曦中埋头苦读，做实验，刷试管；"
    temp += "又复三更灯火，月色下冥思静想，写报告，做分析。这样简朴单纯的生活，尽管清苦，却也十分充实。</p>";
  } else if ($user.major == "文") {
    temp = "<p>你每日黎明即起，在朝阳之下，漫山遍野，朗诵默读。</p>";
    temp += "<p>黄昏时分，你时常呆在竺校长新栽的常青柏边，思考先生讲过的抗战与士风。</p>"
    temp += "<p>小树摇摇曳曳，世界静默的好像一个漫长的镜头。</p>";
  }
  $("#step9 div.result").prepend(temp);
  $(this).find("div.text").fadeOut(function() {
    $("#step9 div.result").fadeIn();
  })
})

$("#step11").click(function() {
  oridinary($(this));
})

$("#step11 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step11 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text = "你接受了这份工作，每日“上课下班”，往返于乡间小道。"
  } else {
    text = "你的生活越发拮据。为了节省开销，你时常不吃早饭便去上晨课。"
  }
  DIV.prepend("<p>" + text + "</p>");
  $("#step11 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step12").click(function() {
  oridinary($(this));
})

$("#step12 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step12 div.result");
  var text = "";
  var temp = ""
  if ($(this).data("ans") == "0") {
    text += "<p>赣江边上，蓝田正在唐凤图教授的指导下勘测水位。</p>"
    text += "<p>你怕打扰他工作，在一旁默默地吃完了老乡送给他的杨梅。</p>";
    temp += "<p>看完蓝田回来不久，赣江边上多了一道十五里长堤。上田村人民十分感激，将其命名为“浙大防洪堤”。</p>"
  } else {
    text += "<p>跋涉大半天，你才到了碧峰所在的沙村镇。正好看到碧峰在田里带着难民们干活。</p>"
    text += "<p>犹记得去年新生报道时，同学们大都灰头土脸，唯有碧峰衬衣雪白挺括。看他这会儿面如闰土，你噗嗤一声笑了出来。</p>"
    temp += "<p>看完碧峰回来，几个月后，沙村示范垦殖场建成了，难民得有所依。回到学校里的碧峰，皮肤已经晒得黝黑发亮，你们时常打趣他，哪还有当年富家少爷样子。</p>"
  }
  DIV.prepend(text);
  $("#step12 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
  temp += '<a class="btn next" data-next="13">继续</a>';
  DIV.click(function() {
    DIV.unbind()
    DIV.html(temp);
    $("#step12 a.next").click(function(){next_act($(this).data("next"));})
  })
})

$("#step13").click(function() {
  $this = $(this);
  $this.unbind();
  $this.find("div.text").fadeOut(function(){
    $this.find("div.choice").fadeIn();
  })
  text = ""
  if ($user.gender == "M") {
    text += "<p>你自幼在水边长大，水性极好，每次上游泳课都成了你“大展身手”的机会。江边搭了两个台子供同学们跳水，你选择登上：</p>"
    text += '<a class="choice" data-ans="0">1米台</a>'
    text += '<a class="choice" data-ans="1">2米台</a>'
  } else if ($user.gender == "F") {
    text += "<p>你自幼怕水，每次上游泳课总是找理由待在岸上。体育老师没说什么，只是默默地将签到台挪到了泳池中心。</p>"
    text += "<p>你白眼升天，只能硬着头皮下水。没想到，20次“水中签到”之后，你竟然学会游泳了！</p>"
    text += '<a class="btn next" data-next="14">继续</a>'
  }
  $(this).children("div.choice").html(text);
  $("#step13 a.choice").click(function(e){
    var DIV = $("#step13 div.result");
    var text = "";
    if ($(this).data("ans") == "0") {
      text += "<p>“扑通”一声，一个漂亮的入水，同学们纷纷为你喝起彩来。</p>"
    } else {
      text += "<p>“扑通”一声，一个漂亮的入水，同学们纷纷为你喝起彩来。</p>"
    }
    DIV.prepend(text);
    $("#step13 div.choice").fadeOut(function(){
      DIV.fadeIn();
    })
  })
  $("#step13 a.next").click(function(){next_act($(this).data("next"));})
})

$("#step15").click(function() {
  oridinary($(this));
})

$("#step15 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step15 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text = "<p>带着竺校长赠予的一张地图、一副指南针，你们用双脚丈量着泰和到宜山一千多里的路途。</p>"
  } else {
    text = "<p>四十多天、一千多里的行程中，你们抓住一切机会登台亮相，用一首首抗日歌曲，一场场抗日剧目，发出你们青年的“呐喊”。</p>"
  }
  DIV.prepend(text);
  $("#step15 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step16").click(function() {
  oridinary($(this));
})

$("#step16 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step16 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text += "<p>“真是天妒英才，我怕命不久矣，还是把它给" + $user.fri + "吧”</p>"
    text += "<p>" + $user.fri + "不肯收下你的钢笔，让你不要乱想，说着说着声音却哽咽了起来。</p>"
    text += "<p>接下来的几天，你的意识开始模糊。绝望之时，终于传来了好消息：竺校长的人从广东带药回来了！</p>"
  } else {
    text += "<p>四十多接下来的几天，你的意识开始模糊。绝望之时，终于传来了好消息：竺校长的人从广东带药回来了！</p>"
  }
  DIV.prepend(text);
  $("#step16 div.choice").fadeOut(function(){
    DIV.fadeIn();
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
    $user.fri = "丹阳"
    text3 = "<p>一起入学的男生军训时统统剃了光头，你常笑他们是寺里的“小和尚”。</p>"

    $("#step6 div.text p").text("在体育系主任舒鸿先生的带领下，你和一小部分同学溯水路到了常山。因为租不到车船，情急之下，你们选择徒步前往120里外的玉山。")
    var choice = "";
    choice += '<p>山路崎岖，眼看大家越走越丧，你忽然想起自己早晨在常山买的橘子。</p>'
    choice += '<p>你摸摸自己的肚子，又看了一眼身边一路帮你背了不少行李的生物系男生丹阳：</p>'
    choice += '<p><b>（慎重，你的选择将影响人生轨迹）</b></p>'
    choice += '<a class="choice" data-ans="0">“丹阳，你在此地不要走动，我拿几个橘子给你吃。”</a>'
    choice += '<a class="choice" data-ans="1">丹阳看着不是很饿，橘子还是我帮他吃吧</a>'
    $("#step6 div.choice").html(choice);
    $("#step6 a.choice").click(function(e){
      e.stopPropagation();
      var DIV = $("#step6 div.result");
      var text = "";
      if ($(this).data("ans")) {
        text = "没有后果？"
      } else {
        text = "没有后果？"
      }
      DIV.prepend("<p>" + text + "</p>");
      $("#step6 div.choice").fadeOut(function(){
        DIV.fadeIn();
      })
    })
    text16 = "<p>你结束了一年的流亡，在城中的文庙安顿下来。一些教室和男生宿舍就在离你们不远的标营。</p>"

  }

  if ($user.gender == "M") {
    $user.fri = "紫云"
    text3 = "<p>只是军训时剃的光头还没长出头发来，让你颇有些苦恼。</p>"
    text16 = "<p>你结束了一年的流亡，在城中的标营安顿下来。图书馆和女生宿舍就在离标营不远的城中文庙。</p>"
  }
  $("#step3 div.text").append(text3);
  text16 += "<p>此地深处内陆，居民多吃岩盐而患甲状腺肿大。有些一年级的新生看到满街的“大脖子”，竟吓得跑回了老家。</p>"
  $("#step16 div.text").append(text16);
}
