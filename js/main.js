
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
var role18 = 0;

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
  $("#step20 div.choice").children("a.choice:eq(q) span").text($user.tutor);
  $("#step3 div.choice").fadeOut(function(){
    $("#step3 div.result").fadeIn();
  })
})

$("#step5 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step5 div.result");
  var text = "";
  var img = "";
  img = "<img src='img/page4学生.png' class='bgimg'>"
  if ($(this).data("ans")) {
    text = "次日，金华遭到三架重型轰炸机狂炸，你虽身经其险，好在躲避及时，幸未遭害。"
  } else {
    img = "<img src='img/page4家人1.png' class='bgimg'>"
    img += "<img src='img/page4家人2.png' class='bgimg'>"
    text = "次日，金华遭到三架重型轰炸机狂炸，你在街上避难之时受了轻伤。"
  }
 $("#step5").children("img").after(img);
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
  var img = "";
  if ($(this).data("ans") == "0") {
    img += '<img src="img/page7_3.png" class="bgimg">'
    img += '<img src="img/page7_4.png" class="bgimg">'
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
  DIV.prepend(img + "<p>" + text + "</p>");
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
  var img = ""
  if ($(this).data("ans") == "0") {
    img += "<img src='img/page10b.jpg' class='bgimg'>"
    img += "<img src='img/page10b_1.png' class='bgimg'>"
    text += "<p>赣江边上，蓝田正在唐凤图教授的指导下勘测水位。</p>"
    text += "<p>你怕打扰他工作，在一旁默默地吃完了老乡送给他的杨梅。</p>";
    temp += "<p>看完蓝田回来不久，赣江边上多了一道十五里长堤。上田村人民十分感激，将其命名为“浙大防洪堤”。</p>"
  } else {
    img += "<img src='img/page10p.jpg' class='bgimg'>"
    img += "<img src='img/page10p_1.png' class='bgimg'>"
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
    DIV.unbind().fadeOut(function() {
      DIV.html(img + temp).fadeIn();
      $("#step12 a.next").click(function(){next_act($(this).data("next"));})
    })
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
      text += "<p>一个“漂亮”的入水，水花四溅，周围的同学纷纷嘲笑你的身法。</p>"
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
  var img = ""
  if ($(this).data("ans") == "0") {
    img += "<img class='bgimg' src='img/page13_1.png'>"
    text = "<p>带着竺校长赠予的一张地图、一副指南针，你们用双脚丈量着泰和到宜山一千多里的路途。</p>"
  } else {
    if ($user.gender == "M") {
      img += "<img class='bgimg' src='img/page13m.png'>"
    } else if ($user.gender == "F") {
      img += "<img class='bgimg' src='img/page13f.png'>"
    }
    text = "<p>四十多天、一千多里的行程中，你们抓住一切机会登台亮相，用一首首抗日歌曲，一场场抗日剧目，发出你们青年的“呐喊”。</p>"
  }
  DIV.prepend(img + text);
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

$("#step17").click(function() {
  if ($user.gender == "M") {
    oridinary($(this));
  } else {
    $("#step17").unbind();
    $("#step17 div.text").fadeOut(function() {
      $("#step17 div.result").prepend("<p>你和紫云穿着旗袍跑不快，慌乱之中躲进了附近的坟场。轰炸反复了三轮，终于没了动静。</p>")
      .fadeIn()
    })
  }
})

$("#step17 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step17 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text += "<p>一直等到轰炸结束，大蛇也没有攻击你们</p>"
  } else {
    text += "<p>你们慌忙逃出，好在这附近有许多天然的岩洞，跑了没多远，你们便又钻进一个，躲在洞里直到轰炸结束。</p>"
  }
  DIV.prepend(text);
  $("#step17 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step18").click(function() {
  $this = $(this);
  // if (role18 == $this.children("div.text").size() - 2) {
  if (role18 == 1) {
    $this.unbind();
  }
  $this.children("div.text:eq(" + role18 + ")").fadeOut(function() {
    $this.children("div.text:eq(" + ++role18 + ")").fadeIn();
  });
})

$("#step19").click(function() {
  oridinary($(this));
})

$("#step19 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step19 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text = "<p>歌咏队名额已满，你不甘心，次次参观他们彩排。</p>"
    text += "<p>有天被先生看到，听你唱了几句，你竟就这样加入了。</p>"
  } else {
    text = "<p>先生的课总是座无虚席，你常要提前两刻钟去占位置，不然就只能站在窗外听了。</p>"
  }
  DIV.prepend(text);
  $("#step19 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step20").click(function() {
  oridinary($(this));
})

$("#step20 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step20 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text = "<p>你们就这样罢起课来，竺校长又好气又好笑，直骂你们不懂事。</p>"
    text += "<p>背地里其实早就开始为下一次迁校作准备了。</p>"
  } else {
    text = "<p>没过两天你就听说，罢课的同学们被校长骂了。但同学们要求的迁校一事，却已经有了眉目。</p>"
  }
  DIV.prepend(text);
  $("#step20 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
})

$("#step21").click(function() {
  oridinary($(this));
})

$("#step21 a.choice").click(function(e){
  e.stopPropagation();
  var DIV = $("#step21 div.result");
  var text = "";
  var img = "";
  if ($(this).data("ans") == "0") {
    img += "<img class='bgimg' src='img/page19_1.png'>"
    if ($user.major == "文") {
      text = "<p>你负责运送书籍，随书一起上了汽车开往遵义。</p>"
    } else {
      text = "<p>你负责运送实验仪器，随仪器走水路入赣。</p>"
    }
  } else {
    img += "<img class='bgimg' src='img/page19_2.png'>"
    text = "<p>在前线上，你为全身烧伤的战士换过绷带，也为不满16岁的小兵写过家书。</p>"
    text += "<p>战争激烈，77人的浙大“战地服务团”逐渐被打散，好在大家提前说好，之后各自去遵义再见。</p>"
  }
  DIV.prepend(img + text);
  $("#step21 div.choice").fadeOut(function(){
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
    img11 = "<img src='img/page9f.png' class='bgimg'>";
    img13 = "<img src='img/page11f.jpg' class='bgimg'>";
    img16 = "<img src='img/page14f.jpg' class='bgimg'>";
    text16 = "<p>你结束了一年的流亡，在城中的文庙安顿下来。一些教室和男生宿舍就在离你们不远的标营。</p>"
    text18 = "<p>回到城中你才发现，男生住的标营已经全部被夷为平地。</p>"
    text18 += "<p>春寒料峭，眼看男生们没衣穿没被盖，你们纷纷捐出了自己的冬衣。</p>"
    text20 = "女孩"
  }

  if ($user.gender == "M") {
    $user.fri = "紫云"
    text3 = "<p>只是军训时剃的光头还没长出头发来，让你颇有些苦恼。</p>"
    img11 = "<img src='img/page9m.png' class='bgimg'>";
    img13 = "<img src='img/page11m.jpg' class='bgimg'>";
    img16 = "<img src='img/page14m.jpg' class='bgimg'>";
    text16 = "<p>你结束了一年的流亡，在城中的标营安顿下来。图书馆和女生宿舍就在离标营不远的城中文庙。</p>"
    text18 = "<p>劫后余生，你哼着没唱完的校歌走在回校路上，却发现整个标营已经沦为一片废墟。</p>"
    text18 += "<p>" + $user.tutor +"教授的夫人看你无处可去，收留你住在家中。</p>"
    text20 = "男孩"
  }
  $("#step3 div.text").append(text3);
  text16 += "<p>此地深处内陆，居民多吃岩盐而患甲状腺肿大。有些一年级的新生看到满街的“大脖子”，竟吓得跑回了老家。</p>"
  $("#step16 div.text").append(text16);
  $("#step16 div.choice").prepend(img16);
  $("#step16 span").text($user.fri);
  $("#step11 div.text").append(img11);
  $("#step13").prepend(img13);
  $("#step18 div.text:eq(0)").prepend(text18);
  $("#step20 div.choice").children("a.choice:eq(0) span").text(text20);
}
