
$user = new Object();
$user.name = "";
$user.major = "文";
$user.gender = "M"; // 0男 1女
$user.hp = 10;    // 生命值
$user.good = 0;   // 
$user.tutor = "";
$user.fri = ""
$user.choice = [];
$user.result = 0;

var NowAct = 1;
var role4 = 0;
var role5 = 0;

$(document).ready(function(){
  // 定义所有下一页标签
  $("a.next").click(function(e){
    e.stopPropagation();
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

function get_choice(a) {
  $user.choice[a.parent().data("choice")] = a.data("ans")
}

$("#step1").click(function() {
  oridinary($(this));
})

$("#step2").click(function() {
  oridinary($(this));
})

$("#step4").click(function() {
  $this = $(this);
  // if (role4 == $this.children("div.text").size() - 2) {
  if (role4 < 1) {
    $this.children("div.text:eq(" + role4 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role4 + ")").fadeIn();
    })
  } else {
    $this.unbind()
    next_act(5)
  }
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

$("#step1 label").click(function(){
  $(this).addClass("checked");
  $(this).siblings("label").removeClass("checked");
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
  get_choice($(this));
  if ($(this).data("ans")) {
    $("#step3 img.bgimg").attr("src", "img/page2_2.jpg");
    next_act(3);
  } else {
    $("#step3 img.bgimg").attr("src", "img/page2_4.jpg");
    $("#step2 div.choice").fadeOut(function(){
      $("#step2 div.result").fadeIn().click(function() {
        next_act(3)
      });
    })
  }
})

$("#step3").click(function() {
  oridinary($(this));
})

$("#step3 a.choice").click(function(e){
  e.stopPropagation();
  get_choice($(this));
  $user.tutor = $(this).data("ans");
  $("#step3 span").text($user.tutor);
  $("#step20 div.choice").children("a.choice:eq(q) span").text($user.tutor);
  $("#step3 div.choice").fadeOut(function(){
    $("#step3 div.result").fadeIn().click(function() {
        next_act(4)
    });
  })
})

$("#step5 a.choice").click(function(e){
  e.stopPropagation();
  get_choice($(this));
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
    DIV.fadeIn().click(function() {
      next_act(6)
    })
  })
})

$("#step6 a.choice").click(function(e){
  get_choice($(this));
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
    DIV.fadeIn().click(function() {
      next_act(7)
    });
  })
})

var role7 = 0;
$("#step7").click(function() {
  $this = $(this);
  if (role7 == 2) {
    $this.unbind();
  }
  if (role7 < 2) {
    $this.children("div.text:eq(" + role7 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role7 + ")").fadeIn();
    });    
  } else {
    var temp = "";
    if ($user.gender == "M") {
      temp = "<p>你们主动把客车车厢让给了女同学和教授，挤进了敞篷铁车皮里。"
      temp += "风从一个个弹孔中钻进脖子，你们冷的直打哆嗦，又怕染上风寒，不敢睡觉，只能一路高唱《松花江上》给自己鼓劲儿。</p>";
    } else if ($user.gender == "F") {
      temp = "<p>男生们展现绅士风度，主动把客车车厢让给了教授和女孩子们，你得以睡了安稳的一觉。</p>";
      temp += "<p>第二天，看到许多男生的棉衣都被敞篷的铁车皮刮得破破烂烂，你心里极不是滋味，好在离家前跟母亲学过点女红，可以帮他们补补衣裳。</p>"
    }
    $this.find("div.text:eq(" + role7++ + ")").fadeOut(function() {
      $("#step7 div.result").prepend(temp).fadeIn().click(function() {
        next_act(8)
      });
    })
  }
})

var role8 = 0;
$("#step8").click(function() {
  $this = $(this);
  if (role8 == 1) {
    $this.unbind();
  }
  if (role8 < 1) {
    $this.children("div.text:eq(" + role8 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role8 + ")").fadeIn();
    });    
  } else {
    $this.find("div.text:eq(" + role8++ + ")").fadeOut(function() {
      $("#step8 div.choice").fadeIn();
    })
  }
})

$("#step8 a.choice").click(function(e){
  get_choice($(this));
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
    text += "，你们分享着同一盏菜油灯，各自解着X、Y,念着ABCD。半点豆样大小的黄灯光，照亮了你们沉思的脸庞。";
  } else {
    text = "这次考试你完美避开了所有得分点。看着成绩单，你幡然悔悟：<br>既然选择了要在国难当头之时继续做个学生，就要拿出学生的样子来。"
  }
  DIV.prepend(img + "<p>" + text + "</p>");
  $("#step8 div.choice").fadeOut(function(){
    DIV.fadeIn().click(function() {
      next_act(9)
    });
  })
})

var role9 = 0;
$("#step9").click(function() {
  $this = $(this);
  if (role9 == 0) {
    var temp1 = temp2 = "";
    if ($user.major == "理") {
      temp1 = "<p>雨终日不止，山花谢了又开，每日卯时即起，晨曦中埋头苦读，做实验，刷试管；"
      temp1 += "又复三更灯火，月色下冥思静想，写报告，做分析。";
      temp2 = "<p>这样简朴单纯的生活，尽管清苦，却也十分充实。</p>";
    } else if ($user.major == "文") {
      temp1 = "<p>你每日黎明即起，在朝阳之下，漫山遍野，朗诵默读。</p>";
      temp1 += "<p>黄昏时分，你时常呆在竺校长新栽的常青柏边，思考先生讲过的抗战与士风。</p>"
      temp2 += "<p>小树摇摇曳曳，世界静默的好像一个漫长的镜头。</p>";
      temp2 += "<p>在如此纷乱急迫的国内大环境之中，你却在这里过着有条不紊的单纯的学术生活。</p>"
    }
    $("#step9 div.text:eq(3)").prepend(temp1);
    $("#step9 div.text:eq(4)").prepend(temp2);
  }
  if (role9 < 4) {
    $this.children("div.text:eq(" + role9 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role9 + ")").fadeIn();
    });    
  } else {
    next_act(10);
    $this.unbind();
  }
})

$("#step10").click(function() {
  $this = $(this);
  $this.unbind();
  $this.children("div.text:eq(0)").fadeOut(function() {
    $this.children("div.text:eq(1)").fadeIn().click(function() {
      next_act(11)
    });
  })
})

$("#step11").click(function() {
  oridinary($(this));
})

$("#step11 a.choice").click(function(e){
  get_choice($(this));
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
    DIV.fadeIn().click(function() {
      next_act(12)
    });
  })
})

var role12 = 0;
$("#step12").click(function() {
  $this = $(this);
  if (role12 < 1) {
    $this.children("div.text:eq(" + role12 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role12 + ")").fadeIn();
    });    
  } else {
    $this.unbind();
    $this.children("div.text:eq(" + role12 + ")").fadeOut(function() {
      $this.children("div.choice").fadeIn();
    });    
  }
})

$("#step12 a.choice").click(function(e){
  get_choice($(this));
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
    temp += "<p>看完蓝田回来不久，赣江边上多了一道十五里长堤。上田村人民感念你们，将其命名为“浙大防洪堤”。</p>"
  } else {
    img += "<img src='img/page10p.jpg' class='bgimg'>"
    img += "<img src='img/page10p_1.png' class='bgimg'>"
    text += "<p>跋涉大半天，你才到了碧峰所在的沙村镇。正好看到碧峰在田里带着难民们干活。</p>"
    text += "<p>犹记得去年新生报道时，同学们大都灰头土脸，唯有碧峰衬衣雪白挺括。看他这会儿面如闰土，你噗嗤一声笑了出来。</p>"
    temp += "<p>看完碧峰回来，几个月后，沙村示范垦殖场建成了，难民得有所依。回到学校里的碧峰，皮肤黝黑发亮，你们时常打趣他，哪还有当年富家少爷样子。</p>"
  }
  DIV.prepend(text);
  $("#step12 div.choice").fadeOut(function(){
    DIV.fadeIn();
  })
  DIV.click(function() {
    DIV.unbind().fadeOut(function() {
      DIV.html(img + temp).fadeIn().click(function() {
        next_act(13)
      });
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
    text += "<p>你自幼在水边长大，水性极好，每次上游泳课都成了你“大展身手”的机会。</p><p>江边搭了两个台子供同学们跳水，你选择登上：</p>"
    text += '<a class="choice" data-ans="0">1米台</a>'
    text += '<a class="choice" data-ans="1">2米台</a>'
  } else if ($user.gender == "F") {
    text += "<p>你自幼怕水，每次上游泳课总是找理由待在岸上。体育老师没说什么，只是默默地将签到台挪到了泳池中心。</p>"
    text += "<p>你白眼升天，只能硬着头皮下水。没想到，20次“水中签到”之后，你竟然学会游泳了！</p>"
    $("#step13 div.choice").click(function(){
      next_act(14);
    })
  }
  $(this).children("div.choice").html(text);
  $("#step13 a.choice").click(function(e){
    get_choice($(this));
    var DIV = $("#step13 div.result");
    var text = "";
    if ($(this).data("ans") == "0") {
      text += "<p>“扑通”一声，一个漂亮的入水，同学们纷纷为你喝起彩来。</p>"
    } else {
      text += "<p>一个“漂亮”的入水，水花四溅，周围的同学纷纷嘲笑你的身法。</p>"
    }
    DIV.prepend(text);
    $("#step13 div.choice").fadeOut(function(){
      DIV.fadeIn().click(function() {
        next_act(14)
      });
    })
  })
  $("#step13 a.next").click(function(){next_act($(this).data("next"));})
})

var role14 = 0;
$("#step14").click(function() {
  $this = $(this);
  if (role14 < 3) {
    $this.children("div.text:eq(" + role14 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role14 + ")").fadeIn();
    });    
  } else {
    $this.unbind();
    next_act(15);    
  }
})

var role15 = 0;
$("#step15").click(function() {
  $this = $(this);
  if (role15 < 2) {
    $this.children("div.text:eq(" + role15 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role15 + ")").fadeIn();
    });    
  } else {
    $this.unbind();
    $this.children("div.text:eq(" + role15 + ")").fadeOut(function() {
      $this.children("div.choice").fadeIn()
    })
  }
})
$("#step15 a.choice").click(function(e){
  get_choice($(this));
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
    DIV.fadeIn().click(function() {
      next_act(16)
    });
  })
})

var role16 = 0;
$("#step16").click(function() {
  $this = $(this);
  if (role16 < 2) {
    $this.children("div.text:eq(" + role16 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role16 + ")").fadeIn();
    });    
  } else {
    $this.unbind();
    $this.children("div.text:eq(" + role16 + ")").fadeOut(function() {
      $this.children("div.choice").fadeIn()
    })
  }
})

$("#step16 a.choice").click(function(e){
  get_choice($(this));
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
    DIV.fadeIn().click(function() {
      next_act(17)
    });
  })
})

$("#step17").click(function() {
  if ($user.gender == "M") {
    oridinary($(this));
  } else {
    $("#step17").unbind();
    $("#step17 div.text").fadeOut(function() {
      $("#step17 div.result").prepend("<p>你和紫云穿着旗袍跑不快，慌乱之中躲进了附近的坟场。轰炸反复了三轮，终于没了动静。</p>")
      .fadeIn().click(function() {
        next_act(18)
      })
    })
  }
})

$("#step17 a.choice").click(function(e){
  get_choice($(this));
  e.stopPropagation();
  var DIV = $("#step17 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text += "<p>一直等到轰炸结束，大蛇也没有攻击你们。</p>"
  } else {
    text += "<p>你们慌忙逃出，好在这附近有许多天然的岩洞，跑了没多远，你们便又钻进一个，躲在洞里直到轰炸结束。</p>"
  }
  DIV.prepend(text);
  $("#step17 div.choice").fadeOut(function(){
    DIV.fadeIn().click(function() {
      next_act(18)
    });
  })
})

var role18 = 0
$("#step18").click(function() {
  $this = $(this);
  if (role18 < 3) {
    $this.children("div.text:eq(" + role18 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role18 + ")").fadeIn();
    });    
  } else {
    $this.unbind();
    next_act(19);
  }
})

$("#step19").click(function() {
  oridinary($(this));
})

$("#step19 a.choice").click(function(e){
  get_choice($(this));
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
    DIV.fadeIn().click(function() {
      next_act(20)
    });
  })
})

$("#step20").click(function() {
  oridinary($(this));
})

$("#step20 a.choice").click(function(e){
  get_choice($(this));
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
    DIV.fadeIn().click(function() {
      next_act(21)
    });
  })
})

$("#step21").click(function() {
  oridinary($(this));
})

$("#step21 a.choice").click(function(e){
  get_choice($(this));
  e.stopPropagation();
  var DIV = $("#step21 div.result");
  var text = "";
  var img = "";
  if ($(this).data("ans") == "0") {
    img += "<img class='bgimg' src='img/page19_1.jpg'>"
    if ($user.major == "文") {
      text = "<p>你负责运送书籍，随书一起上了汽车开往遵义。</p>"
    } else {
      text = "<p>你负责运送实验仪器，随仪器走水路入赣。</p>"
    }
  } else {
    img += "<img class='bgimg' src='img/page19_2.jpg'>"
    text = "<p>在前线上，你为全身烧伤的战士换过绷带，也为不满16岁的小兵写过家书。</p>"
    text += "<p>战争激烈，77人的浙大“战地服务团”逐渐被打散，好在大家提前说好，之后各自去遵义再见。</p>"
  }
  DIV.prepend(img + text);
  $("#step21 div.choice").fadeOut(function(){
    DIV.fadeIn().click(function() {
      next_act(22)
    });
  })
})

var role22 = 0
$("#step22").click(function() {
  $this = $(this);
  if (role22 < 1) {
    $this.children("div.text:eq(" + role22 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role22 + ")").fadeIn();
    });    
  } else {
    $this.unbind();
    next_act(23);
  }
})

$("#step23").click(function() {
  oridinary($(this));
})

$("#step23 a.choice").click(function(e){
  get_choice($(this));
  e.stopPropagation();
  var DIV = $("#step23 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    text = result23.r1;
  } else {
    text = result23.r2;
  }
  DIV.prepend(text);
  
  $("#step23 div.choice").fadeOut(function(){
    DIV.fadeIn().click(function() {
      generate_p24();
      next_act(24)
    });
  })
})

$("#step26 a.choice").click(function(e){
  get_choice($(this));
  e.stopPropagation();
  var DIV = $("#step26 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    if ($user.choice[3] == 0) {
      text = "<p>你很快通过了各项考核，跟随部队开赴前线</p>"
      $user.result = 1;
    } else {
      text = "<p>西迁路上你饱尝困顿，身体一直不好，没有通过征兵的体检。</p>"
      text += "<p>你只好安慰自己，养好身体了再为国效力。</p>"
    }
  } else {
    text = "<p>你的选择得到了"+$user.tutor+"教授的肯定，他一向主张青年学生要用头脑报国，此举更加需要恒心与毅力。</p>"
  }
  DIV.prepend(text);
  $("#step26 div.choice").fadeOut(function(){
    DIV.fadeIn().click(function() {
      if ($user.result == 1) {
        $("#step26").fadeOut()
        generate_p28()
        next_act(28);
      } else {
        generate_p27()
        next_act(27);
      }
    });
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

role28 = 0;
function generate_p28() {
  if ($user.result == 1) {
    text = "<p>8月16号，你在战场上收到湄潭（遵义）来信，得知同学们上个月刚举办过毕业典礼，如今已各奔东西：</p>"
    text += "<p>紫云决定赴日本京都大学攻读史学科；</p>"
    if ($user.choice[8] == 0) {
      text += "<p>蓝田留在湄潭继续学业；</p>"
    } else {
      text += "<p>碧峰留在遵义继续学业；</p>"
    }
    text += "<p>小喇叭则跑去了重庆，要去著名的《大公报》试试运气。</p>"
  } else if ($user.result == 2) {
    text = "<p>七月十六日，晴朗无风。全校师生在文庙图书馆行毕业典礼。</p>"
    text += "<P>本届毕业生六十一人，四年前入学时有三倍于此之数。</p>"
    text += "<p>你即将远赴重洋求学，</p>"
    text += "<p>紫云也要赴日本京都大学攻读史学科；</p>"
    if ($user.choice[8] == 0) {
      text += "<p>蓝田留在湄潭继续学业；</p>"
    } else {
      text += "<p>碧峰留在遵义继续学业；</p>"
    }
    text += "<p>小喇叭则跑去了重庆，要去著名的《大公报》试试运气。</p>"
  } else if ($user.result == 3) {
    text = "<p>七月十六日，晴朗无风。全校师生在文庙图书馆行毕业典礼。</p>"
    text += "<P>本届毕业生六十一人，四年前入学时有三倍于此之数。</p>"
    text += "<p>你即将开始下一阶段的学业，</p>"
    text += "<p>紫云则要赴日本京都大学攻读史学科；</p>"
    if ($user.choice[8] == 0) {
      text += "<p>蓝田和你一起留在湄潭；</p>"
    } else {
      text += "<p>碧峰和你一起留在遵义；</p>"
    }
    text += "<p>小喇叭则跑去了重庆，要去著名的《大公报》试试运气。</p>"
  } else if ($user.result == 4) {
    text = "<p>七月十六日，晴朗无风。全校师生在文庙图书馆行毕业典礼。</p>"
    text += "<P>本届毕业生六十一人，四年前入学时有三倍于此之数。</p>"
    text += "<p>你即将打点行囊回到硝烟中的东部，</p>"
    text += "<p>紫云则要赴日本京都大学攻读史学科；</p>"
    if ($user.choice[8] == 0) {
      text += "<p>蓝田留在湄潭继续学业；</p>"
    } else {
      text += "<p>碧峰留在遵义继续学业；</p>"
    }
    text += "<p>小喇叭则跑去了重庆，要去著名的《大公报》试试运气。</p>"
  } else if ($user.result == 5) {
    text = "<p>七月十六日，晴朗无风。全校师生在文庙图书馆行毕业典礼。</p>"
    text += "<P>本届毕业生六十一人，四年前入学时有三倍于此之数。</p>"
    text += "<p>你即将回到泰和见到久别的孩子们，</p>"
    text += "<p>紫云则要赴日本京都大学攻读史学科；</p>"
    if ($user.choice[8] == 0) {
      text += "<p>蓝田留在湄潭继续学业；</p>"
    } else {
      text += "<p>碧峰留在遵义继续学业；</p>"
    }
    text += "<p>小喇叭则跑去了重庆，要去著名的《大公报》试试运气。</p>"
  }
  $("#step28 div.text").html(text);
  $("#step28").click(function() {
    $this = $(this);
    if (role28 < $("#step28 div.text p").length - 1) {
      $this.children("div.text").children("p:eq(" + ++role28 + ")").fadeIn();    
    } else {
      $this.unbind();
      next_act(29)
    }
  })
}

function generate_p27() {
  text = "<p>四年的求学时光倏忽而过，1941年的夏天还是来了。</p>"
  text += "<p>曾以为毕业遥遥无期，转眼要各奔东西，你决定：</p>"
  choice  = '<a class="choice" data-ans="0">出国攻读硕士学位</a>'
  choice += '<a class="choice" data-ans="1">留在学校继续深造</a>'
  choice += '<a class="choice" data-ans="2">去上海找工作</a>'
  if ($user.choice[7] == 0) {
    choice += '<a class="choice" data-ans="3">回到澄江小学做一名乡村教师</a>'
  }
  $("#step27 div.choice").html(text + choice);
  $("#step27 a.choice").click(function(e){
    $(this).unbind();
    $user.result = $(this).data("ans") + 2;
    get_choice($(this));
    e.stopPropagation();
    generate_p28()
    next_act(28);
  })
}

function generate_p25() {
  if ($user.choice[16] == 1) {
    img = "<img class='bgimg' src='img/page23n.jpg'>"
    img += "<img class='bgimg' src='img/page23n_1.png'>"
    img += "<img class='bgimg' src='img/page23n_2.png'>"
    text1 = "<p>自从"
    if ($user.gender == "F" && $user.choice[15] == 1) {
      text1 += "拒绝丹阳"
    } else if ($user.gender == "M" && $user.choice[15] == 1) {
      text1 += "紫云恋爱"
    } else if ($user.choice[15] == 0) {
      text1 += "离开遵义"
    }
    text1 += "之后，你的生活越发平淡无聊，每日两点一线的穿梭在教室与宿舍之间。</p>"
    text2 = "<p>不知不觉间，比你好看的人恋爱了，比你丑的人也恋爱了，只有你，一直形单影只。</p>"
    $("#step25").prepend(img);
    $("#step25 div.choice").html(text1)
    $("#step25 div.result").prepend(text2).click(function() {
      if ($user.gender == "M") {
        next_act(26)
      } else {
        generate_p27()
        $("#step25").fadeOut()
        next_act(27)
      }
    })
    $("#step25").click(function() {
      $(this).unbind()
      $("#step25 div.choice").fadeOut(function() {
        $("#step25 div.result").fadeIn();
      })
    })

  } else {

    if ($user.choice[16] == 0 && $user.gender == "M") {
      img = "<img class='bgimg' src='img/page23m.jpg'>"
      img += "<img class='bgimg' src='img/page23m_4.png'>"
      img_next = "<img class='bgimg' src='img/page23m_3.png'>"
      text = "<p>时光飞逝，转眼就是你和紫云的一周年纪念日了。你想给她一个小惊喜：</p>"
      choice1 = "半斤灯油"
      img1 = "<img class='bgimg' src='img/page23m_1.png'>"
      result1 = "<p>学校每月只发一斤灯油，紫云正愁每晚看书刷夜灯油不够，你的温柔体贴让她十分感动。</p>"
      choice2 = "一块肥皂"
      img2 = "<img class='bgimg' src='img/page23m_2.png'>"
      result2 = "<p>化工系有个男孩喜欢紫云好久了，送了她一箱子肥皂。看着你的这块小肥皂，紫云露出了尴尬而不失礼貌的微笑。</p>"
    } else if ($user.choice[16] == 0 && $user.gender == "F") {
      img = "<img class='bgimg' src='img/page23f.jpg'>"
      img += "<img class='bgimg' src='img/page23f_1.png'>"
      img_next = "<img class='bgimg' src='img/page23f_2.png'>"
      img1 = img2 = "<img class='bgimg' src='img/page23f_3.png'>"
      text = "<p>时光飞逝，转眼就是你和丹阳的一周年纪念日了。你一直盘算着想送他一双鞋子。你选择送他：</p>"
      choice1 = "街上卖的土皮鞋"
      result1 = "<p>你一个月没去茶馆喝茶，终于省出钱买下一双土皮鞋。可是丹阳才穿着上了一次体育课，皮鞋就裂口了。你气他不爱惜，更气卖鞋的小贩骗你。在宿舍大哭了一场。</p>"
      choice2 = "自己动手缝一双布鞋"
      result2 = "<p>白天还要学习，你只好每天晚上悄悄赶活儿。丹阳很宝贝你送他的新鞋，每周的集会上才舍得拿出来穿一次。</p>"
    }
    $("#step25").prepend(img);
    $("#step25 div.choice").prepend(text).show()
    $("#step25 div.choice").children("a.choice:eq(0)").text(choice1)
    $("#step25 div.choice").children("a.choice:eq(1)").text(choice2)
    $("#step25 a.choice").click(function(e){
      $(this).unbind();
      get_choice($(this));
      e.stopPropagation();
      var DIV = $("#step25 div.result");
      var text = "";
      if ($(this).data("ans") == "0") {
        text = result1;
        img_next += img1;
      } else {
        text = result2;
        img_next += img2;
      }
      DIV.prepend(img_next + text);
      $("#step25 div.choice").fadeOut(function(){
        DIV.fadeIn().click(function() {
          if ($user.gender == "M") {
            next_act(26)
          } else {
            generate_p27()
            $("#step25").fadeOut()
            next_act(27)
          }
        });
      })
    })
  }
}

function generate_p24() {
  $("#step24").click(function() {
    oridinary($(this));
  })
  if ($user.major == "理") {
    img1 = "<img class='bgimg' src='img/page22_12.jpg'>"
    text1 = "<p>湄潭县城依山傍水，盛产茶叶，让你想起自己的江南老家。</p>"
    img2 = "<img class='bgimg' src='img/page22_11.jpg'>"
    img2 += "<img class='bgimg' src='img/page22_13.png'>"
    img2 += "<img class='bgimg' src='img/page22_14.png'>"
    text2 = "<p>这里居民不多，课余时间，你总爱夹着书本到茶馆里蹭免费桐油灯，一坐便是大半天。</p>"
    if ($user.gender == "F" && $user.choice[16] == 0) {
      text2 += "<p>桐油灯冒黑烟，灯下坐得久了，擤出的鼻涕都成了黑的。好在有丹阳送你的肥皂，小小一块，每天晚上就能把脸洗得干干净净了。</p>"
    }
    $("#step24").prepend(img1)
    $("#step24 div.text").append(text1);
    $("#step24 div.choice").html(img2 + text2)
    $("#step24 div.choice").click(function() {
      generate_p25()
      next_act(25);
    })

  } else {
    img = "<img class='bgimg' src='img/page22_2.jpg'>"
    img += "<img class='bgimg' src='img/page22_21.png'>"
    img += "<img class='bgimg' src='img/page22_22.png'>"
    img += "<img class='bgimg' src='img/page22_23.png'>"
    text1 = "<p>这几个月来，遵义物价飞涨，十几个人只有一小盘油炸黄豆下饭。</p>"
    text2 = "<p>这天早晨，你抬起筷子夹黄豆，却一个不小心掉在了地上，这时你想：</p>"
    choice1 = "不到五秒！还能吃！"
    result1 = "<p>你以迅雷不及掩耳之势夹起地上的黄豆，旁边的同学看到了，也拍拍你的肩表示可以理解。</p>"
    choice2 = "好气！就这么浪费了一颗黄豆！"
    result2 = "<p>坐你身边的男生以迅雷不及掩耳之势夹起地上的黄豆：“还不到五秒，别浪费嘛。”</p>"

    $("#step24").prepend(img)
    $("#step24 div.text").append(text1)
    $("#step24 div.choice").prepend(text2)
    $("#step24 div.choice").children("a.choice:eq(0)").text(choice1)
    $("#step24 div.choice").children("a.choice:eq(1)").text(choice2)
    $("#step24 a.choice").click(function(e){
      get_choice($(this));
      e.stopPropagation();
      var DIV = $("#step24 div.result");
      var text = "";
      if ($(this).data("ans") == "0") {
        text = result1;
      } else {
        text = result2;
      }
      DIV.prepend(text);
      $("#step24 div.choice").fadeOut(function(){
        DIV.fadeIn().click(function() {
          generate_p25()
          next_act(25)
        });
      })
    })
  }
}


function generate_p23() {

  if ($user.gender == "M" && $user.major == "理") {
    text = "<p>只是舍不得要留在遵义的紫云，思索再三，你决定：</p>"
    choice1 = "鼓起勇气向她表白"
    result1 = "<p>你的主角光环太强大，其实紫云早已暗恋你多时。</p>"
    result1 += "<p>四月初，你乘校车前往湄潭，从此开始了漫长的异地恋。</p>"
    choice2 = "自古表白多白表，还是日常从心吧"
    result2 = "<p>四月，东风来，柳絮飞，</p><p>你乘校车往湄潭去。</p>"
    result2 += "<p>小小的遵义城里留下了一声叹息。</p>"
  } else if ($user.gender == "F") {
    text = "<p>你很高兴能跟丹阳一起走，去往湄潭的路上，他突然对你说：</p>"
    text += "<p>“我最近手头有点紧，可以借你的手牵一下吗？”</p>"
    text += "<p>“借什么？”</p>"
    text += "<p>“借你的手牵一辈子”</p>"
    text += "<p>你选择：</p>"
    choice1 = "欢天喜地收下游戏分配的小哥哥"
    result1 = "<p>你心里雀跃，面上还装矜持。</p>"
    result1 += "<p>从今以后的路，是两个人一起走啦。</p>"
    choice2 = "学业要紧，感情的事还是先放放"
    result2 = "<p>丹阳露出了尴尬而不失礼貌的微笑，并表示买卖不成仁义在，今后还是要做好朋友。</p>"
  } else   if ($user.gender == "M" && $user.major == "文") {
    text = "<p>好在你心仪的紫云也留在遵义，你选择：</p>"
    choice1 = "趁此机会，鼓起勇气表白"
    result1 = "<p>紫云接受了你的表白。</p>"
    result1 += "<p>从此以后，遵义的苦日子里多了一点甜。</p>"
    choice2 = "学业要紧，感情还是放在心里"
    result2 = "<p>有些人，一旦错过就不在。</p>"
    result2 += "<p>没过多久，你就听说紫云和你的好兄弟蓝田在一起了。</p>"
    result2 += "<p>你郁郁寡欢，从此埋头学术。</p>"
  }

  $("#step23 div.choice").prepend(text)
  $("#step23 div.choice").children("a.choice:eq(0)").text(choice1)
  $("#step23 div.choice").children("a.choice:eq(1)").text(choice2)

  return {r1: result1, r2: result2}
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
      get_choice($(this));
      e.stopPropagation();
      var DIV = $("#step6 div.result");
      var text = "";
      if ($(this).data("ans") == 0) {
        text = "丹阳接过橘子，美滋滋地笑了。"
      } else {
        text = "看到你偷吃橘子的蠢样，丹阳无奈地笑了。"
      }
      DIV.prepend("<p>" + text + "</p>");
      $("#step6 div.choice").fadeOut(function(){
        DIV.fadeIn().click(function(){
          next_act(7)
        });
      })
    })
    img11 = "<img src='img/page9f.png' class='bgimg'>";
    img13 = "<img src='img/page11f.jpg' class='bgimg'>";
    img16 = "<img src='img/page14f.jpg' class='bgimg'>";
    text16 = "<p>你结束了一年的流亡，在城中的文庙安顿下来。一些教室和男生宿舍就在不远的标营。</p>"
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
    text16 = "<p>你结束了一年的流亡，在城中的标营安顿下来。图书馆和女生宿舍就在不远的城中文庙。</p>"
    text18 = "<p>劫后余生，你哼着没唱完的校歌走在回校路上，却发现整个标营已经沦为一片废墟。</p>"
    text18 += "<p>" + $user.tutor +"教授的夫人看你无处可去，收留你住在家中。</p>"
    text20 = "男孩"
  }
  $("#step3 div.text").append(text3);
  text16 += "<p>此地深处内陆，居民多吃岩盐而患甲状腺肿大。有些一年级的新生看到满街的“大脖子”，竟吓得跑回了老家。</p>"
  $("#step16 div.text:eq(0)").append(text16);
  $("#step16 div.choice").prepend(img16);
  $("#step16 span").text($user.fri);
  $("#step11 div.text").append(img11);
  $("#step13").prepend(img13);
  $("#step18 div.text:eq(0)").prepend(text18);
  $("#step20 div.choice").children("a.choice:eq(0) span").text(text20);
  result23 = generate_p23()
  console.log(result23);
}
