$user = new Object();
$user.name = "";
$user.major = "文";
$user.gender = "M"; // 0男 1女
$user.hp = 10; // 生命值
$user.good = 0; // 
$user.tutor = "";
$user.fri = ""
$user.choice = [];
$user.result = 0;
$user.doge = 0;

var NowAct = 0;
var role4 = 0;
var role5 = 0;
var total = 30;

function whoRU() {
  if ($user.result == 5 || (($user.result == 2 || $user.result == 3) && $user.choice[9] == 0)) {
    return "丰子恺"
  } else if ($user.major == "文") {
    if (($user.result == 2 || $user.result == 3) && $user.choice[9] == 1) {
      return "马一浮"
    } else if ($user.result == 4 && $user.choice[9] == 0) {
      return "邵飘萍"
    } else if ($user.result == 4 && $user.choice[9] == 1) {
      return "竺可桢"
    }
  } else if ($user.major == "理") {
    if ($user.choice[9] == 0) {
      if (($user.gender == "M" && $user.result == 1) || ($user.gender == "F" && $user.result == 2)) {
        return "李政道"
      } else {
        return "王淦昌"
      }
    } else {
      if (($user.gender == "M" && $user.result == 1) || ($user.gender == "F" && $user.choice[3] == 2)) {
        return "束星北"
      } else {
        return "苏步青"
      }
    }
  }

  return "竺可桢"
}

$(document).ready(function() {
  // 定义所有下一页标签
  $("a.next").click(function(e) {
    e.stopPropagation();
    next_act($(this).data("next"));
  })

  $("#step0").click(function() {
    next_act(1);
  })

  $("#step1").click(function() {
    oridinary($(this));
  })

  zz($("div.zz"))

})

function oridinary(page) {
  $this = page;
  $this.unbind();
  $this.find("div.text").fadeOut(function() {
    $this.find("div.choice").fadeIn();
  })
}

function get_choice(a) {
  $user.choice[a.parent().data("choice")] = a.data("ans")
}

var zcount = 0

function z(obj, nextpage) {
  obj.click(function(e) {
    e.stopPropagation();
    if (zcount < obj.children("div.text").length - 1) {
      obj.children("div.text:eq(" + zcount + ")").fadeOut(function() {
        obj.children("div.text:eq(" + (++zcount) + ")").fadeIn();
      });
    } else {
      obj.unbind();
      zcount = 0;
      next_act(nextpage)
    }
  })
}

var zhujuchuxiancount = 0

function zz(obj) {
  obj.click(function(e) {
    e.stopPropagation();
    $this = $(this);
    if (zhujuchuxiancount < $this.children("p").length - 1) {
      $this.children("p:eq(" + ++zhujuchuxiancount + ")").fadeIn();
    }
    if (zhujuchuxiancount == $this.children("p").length - 1) {
      $this.unbind();
      zhujuchuxiancount = 0;
    }
  })
}

$("#step2").click(function() {
  next_act(3);
})

$("#step3").click(function() {
  oridinary($(this));
})

$("#step3 a.choice").click(function(e) {
  $(this).unbind();
  e.stopPropagation();
  get_choice($(this));
  $user.tutor = $(this).data("ans");
  $("#step3 span").text($user.tutor);
  $("#step20 div.choice").children("a.choice:eq(q) span").text($user.tutor);
  $("#step3 div.choice").fadeOut(function() {
    $("#step3 div.result").fadeIn().click(function() {
      next_act(4)
    });
  })
})

z($("#step4"), 5)

z($("#step5"), 6)


$("#step6").click(function() {
  oridinary($(this));
})

$("#step1 label").click(function() {
  $(this).addClass("checked");
  $(this).siblings("label").removeClass("checked");
})

$("#step1 a.btn").click(function(e) {
  $(this).unbind();
  e.stopPropagation();
  $user.name = $("input[name='name']").val();
  $user.major = $("input[name='major']:checked").val();
  $user.gender = $("input[name='gender']:checked").val();
  change1();
  console.log($user);
  next_act(2);
})

// $("a.choice").click(function(){
//   $(this).siblings("a.choice").unbind();
//   $(this).unbind().addClass("active");
// })

$("#step6 a.choice").click(function(e) {
  $(this).unbind();
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
  $("#step6 div.choice").fadeOut(function() {
    DIV.fadeIn().click(function() {
      next_act(7)
    });
  })
})

var role7 = 0;
$("#step7").click(function() {
  $this = $(this);
  if (role7 < 1) {
    $this.children("div.text:eq(" + role7 + ")").stop().fadeOut(function() {
      $this.children("div.text:eq(" + ++role7 + ")").fadeIn();
    });
  } else {
    $this.unbind();
    var temp = "";
    if ($user.gender == "M") {
      temp = "<p>你们主动把客车车厢让给了女同学和教授，挤进了敞篷铁车皮里。</p>"
      temp += "<p>风从一个个弹孔中钻进脖子，你们冷的直打哆嗦，又怕染上风寒，不敢睡觉，只能一路高唱《松花江上》给自己鼓劲儿。</p>";
    } else if ($user.gender == "F") {
      temp = "<p>男生们展现绅士风度，主动把客车车厢让给了教授和女孩子们，你得以睡了安稳的一觉。</p>";
    }
    $this.find("div.text:eq(1)").stop().fadeOut(function() {
      $("#step7 div.result").prepend(temp).fadeIn().click(function() {
        next_act(8)
      });
    })
  }
})

$("#step8").click(function() {
  oridinary($(this));
})

$("#step8 a.choice").click(function(e) {
  $(this).unbind();
  get_choice($(this));
  e.stopPropagation();
  var DIV = $("#step8 div.result");
  var text = "";
  var img = "";
  if ($(this).data("ans") == "0") {
    img += '<img src="img/page7_5.jpg" class="bgimg">'
    img += '<img src="img/page7_1.png" class="bgimg">'
    text = "在自修室里，你遇到了";
    if ($user.gender == "M") {
      text += "紫云";
    } else if ($user.gender == "F") {
      text += "丹阳";
    }
    text += "。半点豆样大小的黄灯光，照亮了你们沉思的脸庞。";
  } else {
    text = "这次考试你完美避开了所有得分点，被" + $user.tutor + "教授狠狠骂了一顿。"
  }
  DIV.prepend(img + "<p>" + text + "</p>");
  $("#step8 div.choice").fadeOut(function() {
    DIV.fadeIn().click(function() {
      next_act(9)
    });
  })
})

var role9 = 0;
$("#step9").click(function() {
  $this = $(this);
  if (role9 < 2) {
    $this.children("div.text:eq(" + role9 + ")").fadeOut(function() {
      $this.children("div.text:eq(" + ++role9 + ")").fadeIn();
    });
  } else {
    // next_act(10);
    next_act(11)
    $this.unbind();
  }
})

// $("#step10").click(function() {
//   $this = $(this);
//   $this.unbind();
//   $this.children("div.text:eq(0)").fadeOut(function() {
//     $this.children("div.text:eq(1)").fadeIn().click(function() {
//       next_act(11)
//     });
//   })
// })

$("#step11").click(function() {
  $this = $(this);
  $this.unbind();
  $this.find("div.text").fadeOut(function() {
    $this.find("div.choice").fadeIn();
  })
})

$("#step11 div.text").click(function(e) {
  e.stopPropagation();
  $this = $(this);
  $this.unbind();
  $this.children("img.hide").fadeIn()
})

$("#step11 a.choice").click(function(e) {
  $(this).unbind();
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
  $("#step11 div.choice").fadeOut(function() {
    DIV.fadeIn().click(function() {
      next_act(12)
    });
  })
})

$("#step12").click(function() {
  oridinary($("#step12"))
})

$("#step12 a.choice").click(function(e) {
  $(this).unbind();
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
    temp += "<p>看完碧峰回来，几个月后，沙村示范垦殖场建成了，难民得有所依。</p>"
    temp += "<p>回到学校里的碧峰，皮肤黝黑发亮，你们时常打趣他，哪还有当年入学时富家少爷的样子。</p>"
  }
  DIV.prepend(img + text);
  $("#step12 div.choice").fadeOut(function() {
    DIV.fadeIn(function() {
      $("#step12 > img").after(img);
    });
  })
  DIV.click(function() {
    DIV.unbind().fadeOut(function() {
      DIV.html(temp).fadeIn().click(function() {
        next_act(13)
      });
    })
  })
})

z($("#step13"), 14);

var role14 = 0;
$("#step14").click(function() {
  $this.unbind();
  next_act(15)
})

var role15 = 0;
function click15() {
  $("#step15").click(function() {
    $this = $(this);
    $this.unbind();
    if (role15 < 1) {
      $this.children("div.text:eq(" + role15 + ")").fadeOut(function() {
        $this.children("div.text:eq(" + ++role15 + ")").fadeIn();
        click15();
      });
    } else {
      $this.children("div.text:eq(" + role15 + ")").fadeOut(function() {
        $this.children("div.choice").fadeIn()
      })
    }
  })
}

click15()

$("#step15 a.choice").click(function(e) {
  $(this).unbind();
  get_choice($(this));
  e.stopPropagation();
  var DIV = $("#step15 div.result");
  var text = "";
  img = "<img class='bgimg' src='img/page13.jpg'>"
  img += "<img class='bgimg' src='img/page13_2.png'>"
  if ($(this).data("ans") == "0") {
    text = "<p>带着竺校长赠予的一张地图、一副指南针，你们用双脚丈量着泰和到宜山一千多里的路途。</p>"
  } else {

    text = "<p>四十多天、一千多里的行程中，你们抓住一切机会登台亮相，用一首首抗日歌曲，一场场抗日剧目，发出你们青年的“呐喊”。</p>"
  }
  DIV.prepend(img + text);
  $("#step15 div.choice").fadeOut(function() {
    DIV.fadeIn().click(function() {
      next_act(16)
    });
  })
})

var role16 = 0;
$("#step16").click(function() {
  next_act(17);
})

z($("#step17"), 18)

var role18 = 0
$("#step18").click(function() {
  $this = $(this);
  if (role18 < 2) {
    $this.children("div.text:eq(" + role18 + ")").stop().fadeOut(function() {
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

$("#step19 a.choice").click(function(e) {
    $(this).unbind();
    get_choice($(this));
    e.stopPropagation();
    var DIV = $("#step19 div.result");
    var text = "";
    if ($(this).data("ans") == "0") {
      if ($user.choice[6] == 0) {
        text = "<p>歌咏队名额已满，你只能次次参观彩排。</p>"
      } else {
        text = "<p>你在“呐喊”步行团的表现为大家所认可，顺利加入了歌咏队。</p>"
      }
    } else {
      if ($user.gender == "M") {
        text = "<p>先生的课总是座无虚席，你常要提前两刻钟去占位置，不然就只能站在窗外听了。</p>"
      } else {
        text = "<p>先生的课总是座无虚席，好在有丹阳替你占位置，不然就只能站在窗外听了。</p>"
      }
    }
    DIV.prepend(text);
    $("#step19 div.choice").fadeOut(function() {
      DIV.fadeIn().click(function() {
        next_act(21)
      });
    })
  })
  /*
  $("#step20").click(function() {
    oridinary($(this));
  })

  $("#step20 a.choice").click(function(e){
    $(this).unbind();
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
  })*/

$("#step21").click(function() {
  oridinary($(this));
})

$("#step21 a.choice").click(function(e) {
  $(this).unbind();
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
  $("#step21 div.choice").fadeOut(function() {
    DIV.fadeIn().click(function() {
      next_act(22)
    });
  })
})

var role22 = 0
$("#step22").click(function() {
  $this = $(this);
  if (role22 < 1) {
    $this.children("div.text:eq(" + role22 + ")").stop().fadeOut(function() {
      $this.children("div.text:eq(" + ++role22 + ")").fadeIn();
    });
  } else {
    $this.unbind();
    result23 = generate_p23();
    next_act(23);
  }
})


function generate_p23() {
  text = choice1 = choice2 = result1 = result2 =  ""
  imgm = '<img src="img/page21m.png" class="bgimg">'
  imgf = '<img src="img/page21f.png" class="bgimg">'
  imgd = '<img src="img/page21_doge.jpg" class="bgimg">'
  love = 0;
  if ($user.choice[3] == 1 && $user.choice[7] == 0) {
    $user.doge = 1;
    $user.choice[9] = 1;
    $("#step23 div.text").html("<p>春节还没过完，学校决定将理、农和师范学院的理科系迁往75公里外的湄潭县。</p>")
    $("#step23 div.choice").html("<p>四月，草长莺飞，这是告别的季节，也是恋爱的季节。不知不觉间你已错过了几次命运的馈赠，终于还是错过了自己的感情线。</p>")
    $("#step23 div.choice").click(function() {
      $(this).unbind();
      generate_p24();
      next_act(24);
    })
    return;
  } else if ($user.gender == "M" && $user.major == "理") {
    text = "<p>只是舍不得要留在遵义的紫云，思索再三，你决定：</p>"
    choice1 = "鼓起勇气向她表白"
    if ($user.choice[2] == 1) {
      result1 = "<p>从你给她披上衣服那一刻起，紫云就喜欢上你了。</p>"
      result1 += "<p>四月初，你乘校车前往湄潭，从此开始了漫长的异地恋。</p>"
    } else {
      love = 1
      result1 = "<p>紫云告诉你，她喜欢的是当年在金华给她披上衣服的蓝田。</p>"
      result1 += "<p>白樱初绽，草长莺飞，你乘校车离开了这片伤心地。</p>"
    }
    choice2 = "自古表白多白表，还是日常从心吧"
    result2 = "<p>四月，草长莺飞，</p><p>你乘校车往湄潭去。</p>"
    result2 += "<p>小小的遵义城里留下了一声叹息。</p>"
  } else if ($user.gender == "F" && $user.major == "理") {
    text = "<p>你很高兴能跟丹阳一起走，去往湄潭的路上，他突然对你说：</p>"
    text += "<p>“我最近手头有点紧，可以向你借点东西吗？”</p>"
    text += "<p>“借什么？”</p>"
    text += "<p>“借你的手牵一辈子”</p>"
    text += "<p>你选择：</p>"
    choice1 = "欢天喜地收下游戏分配的小哥哥"
    result1 = "<p>你心里雀跃，面上还装矜持。</p>"
    result1 += "<p>从今以后的路，是两个人一起走啦。</p>"
    choice2 = "学业要紧，感情的事还是先放放"
    result2 = "<p>丹阳露出了尴尬而不失礼貌的微笑，并表示买卖不成仁义在，今后还是要做好朋友。</p>"
  } else if ($user.gender == "M" && $user.major == "文") {
    text = "<p>好在你心仪的紫云也留在遵义，你选择：</p>"
    choice1 = "趁此机会，鼓起勇气表白"
    if ($user.choice[2] == 1) {
      result1 = "<p>从你给她披上衣服那一刻起，紫云就喜欢上你了。</p>"
      result1 += "<p>从此以后，遵义的苦日子里多了一点甜。</p>"
    } else {
      love = 1
      result1 = "<p>紫云告诉你，她喜欢的是当年在金华给她披上衣服的蓝田。</p>"
      result1 += "<p>没过多久，你就听说他们在一起了。</p>"
      result1 += "<p>你郁郁寡欢，从此埋头学术。</p>"
    }
    choice2 = "学业要紧，感情还是放在心里"
    result2 = "<p>有些人，一旦错过就不在。</p>"
    result2 += "<p>没过多久，你就听说紫云和你的好兄弟蓝田在一起了。</p>"
    result2 += "<p>你郁郁寡欢，从此埋头学术。</p>"
  } else if ($user.gender == "F" && $user.major == "文") {
    text = "<p>四月初，你为丹阳送行，开玩笑叫他要时常买水果回来看你。丹阳支支吾吾，临上车前，突然对你说：</p>"
    text += "<p>“我最近手头有点紧，可以向你借点东西吗？”</p>"
    text += "<p>“借什么？”</p>"
    text += "<p>“借你的手牵一辈子”</p>"
    text += "<p>你选择：</p>"
    choice1 = "欢天喜地收下游戏分配的小哥哥"
    result1 = "<p>你心里雀跃，面上还装矜持。</p>"
    result1 += "<p>从今以后，开始了漫长的异地恋生活。</p>"
    choice2 = "学业要紧，感情的事还是先放放"
    result2 = "<p>丹阳露出了尴尬而不失礼貌的微笑，并表示买卖不成仁义在，今后还是要做好朋友。</p>"
  }

  $("#step23 div.choice").prepend(text)
  $("#step23 div.choice").children("a.choice:eq(0)").text(choice1)
  $("#step23 div.choice").children("a.choice:eq(1)").text(choice2)
  if ($user.gender == "F") {
    $("#step23 div.choice").addClass("zzz");
    zzz($("#step23 div.zzz"), {
      r1: result1,
      r2: result2
    })
    console.log("F")
  } else {
    console.log("M")
    $("#step23 a.choice").click(function(e) {
      $(this).unbind().siblings("a").unbind();
      $user.choice[9] = $(this).data("ans") | love;
      e.stopPropagation();
      var DIV = $("#step23 div.result");
      var text = "";
      if ($(this).data("ans") == 0) {
        if (love == 0) {
          text = imgm + imgf + result1;
        } else {
          text = imgd + result1;
        }
      } else {
        text = imgd + result2;
      }
      DIV.prepend(text);

      $("#step23 div.choice").fadeOut(function() {
        DIV.fadeIn().click(function() {
          generate_p24();
          next_act(24)
        });
      })
    })
  }
  return {
    r1: result1,
    r2: result2
  }
}

$("#step23").click(function() {
  oridinary($(this));
})

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
    $("#step24 a.choice").click(function(e) {
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
      $("#step24 div.choice").fadeOut(function() {
        DIV.fadeIn().click(function() {
          $(this).unbind();
          generate_p25()
          next_act(25)
        });
      })
    })
  }
}

function generate_p25() {
  if ($user.choice[9] == 1) {
    img = "<img class='bgimg' src='img/page23n.jpg'>"
    if ($user.gender == "M") {
      img += "<img class='bgimg' src='img/page23n_1.png'>"
    } else {
      img += "<img class='bgimg' src='img/page23n_2.png'>"
    }
    text1 = "<p>自从"
    if ($user.gender == "F" && $user.choice[8] == 1) {
      text1 += "拒绝丹阳"
    } else if ($user.gender == "M" && $user.choice[8] == 1) {
      text1 += "紫云恋爱"
    } else {
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

    if ($user.gender == "M") {
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
    } else {
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
    $("#step25 a.choice").click(function(e) {
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
      $("#step25 div.choice").fadeOut(function() {
        DIV.fadeIn().click(function() {
          if ($user.gender == "M") {
            next_act(26)
          } else {
            generate_p27()
            next_act(27)
          }
        });
      })
    })
  }
}

$("#step26 a.choice").click(function(e) {
  $(this).unbind();
  get_choice($(this));
  e.stopPropagation();
  var DIV = $("#step26 div.result");
  var text = "";
  if ($(this).data("ans") == "0") {
    if ($user.choice[2] == 0) {
      text = "<p>你很快通过了各项考核，跟随部队开赴前线</p>"
      $user.result = 1;
    } else {
      text = "<p>西迁路上你饱尝困顿，身体一直不好，没有通过征兵的体检。</p>"
      text += "<p>你只好安慰自己，养好身体了再为国效力。</p>"
    }
  } else {
    text = "<p>你的选择得到了" + $user.tutor + "教授的肯定，他一向主张青年学生要用头脑报国，此举更加需要恒心与毅力。</p>"
  }
  DIV.prepend(text);
  $("#step26 div.choice").fadeOut(function() {
    DIV.fadeIn().click(function() {
      if ($user.result == 1) {
        generate_p28()
        next_act(28);
      } else {
        generate_p27()
        next_act(27);
      }
    });
  })
})

function generate_p27() {
  text = "<p>四年的求学时光倏忽而过，1941年的夏天还是来了。</p>"
  text += "<p>曾以为毕业遥遥无期，转眼要各奔东西，你决定：</p>"
  choice = '<a class="choice" data-ans="0">出国攻读硕士学位</a>'
  choice += '<a class="choice" data-ans="1">留在学校继续深造</a>'
  choice += '<a class="choice" data-ans="2">去上海找工作</a>'
  if ($user.choice[4] == 0) {
    choice += '<a class="choice" data-ans="3">回到澄江小学做一名乡村教师</a>'
  }
  $("#step27 div.choice").html(text + choice);
  $("#step27 a.choice").click(function(e) {
    $(this).unbind();
    $user.result = $(this).data("ans") + 2;
    get_choice($(this));
    e.stopPropagation();
    generate_p28()
    next_act(28);
  })
}

role28 = 0;

function generate_p28() {
  if ($user.result == 1) {
    if ($user.major == "理") {
      temp = "湄潭"
    } else {
      temp = "遵义"
    }
    text = "<p>八月十六日，你在战场上收到"+temp+"来信，得知同学们上个月刚举办过毕业典礼，如今已各奔东西：</p>"
    text += "<p>" + $user.fri + "决定赴日本京都大学攻读硕士；</p>"
    text += "<p>蓝田留在遵义继续学业；</p>"
    text += "<p>碧峰则弃农从文，跑去了重庆，想去著名的《大公报》试试运气。</p>"
  } else if ($user.result == 2) {
    text = "<p>七月十三日，紫薇花开。全校师生在县党部行毕业典礼。</p>"
    text += "<P>本届毕业生共约一百七十人，女生十余人而已。</p>"
    text += "<p>你即将远赴重洋求学，</p>"
    text += "<p>" + $user.fri + "也要赴日本京都大学攻读硕士；</p>"
    text += "<p>蓝田留在遵义继续学业；</p>"
    text += "<p>碧峰则弃农从文，跑去了重庆，想去著名的《大公报》试试运气。</p>"
  } else if ($user.result == 3) {
    text = "<p>七月十三日，紫薇花开。全校师生在县党部行毕业典礼。</p>"
    text += "<P>本届毕业生共约一百七十人，女生十余人而已。</p>"
    text += "<p>你即将开始下一阶段的学业，</p>"
    text += "<p>" + $user.fri + "也要赴日本京都大学攻读硕士；</p>"
    text += "<p>蓝田和你一起留在学校继续学业；</p>"
    text += "<p>碧峰则弃农从文，跑去了重庆，想去著名的《大公报》试试运气。</p>"
  } else if ($user.result == 4) {
    text = "<p>七月十三日，紫薇花开。全校师生在县党部行毕业典礼。</p>"
    text += "<P>本届毕业生共约一百七十人，女生十余人而已。</p>"
    text += "<p>你即将打点行囊回到硝烟中的东部，</p>"
    text += "<p>" + $user.fri + "也要赴日本京都大学攻读硕士；</p>"
    text += "<p>蓝田留在遵义继续学业；</p>"
    text += "<p>碧峰则弃农从文，跑去了重庆，想去著名的《大公报》试试运气。</p>"
  } else if ($user.result == 5) {
    text = "<p>七月十三日，紫薇花开。全校师生在县党部行毕业典礼。</p>"
    text += "<P>本届毕业生共约一百七十人，女生十余人而已。</p>"
    text += "<p>你即将回到泰和见到久别的孩子们，</p>"
    text += "<p>" + $user.fri + "也要赴日本京都大学攻读硕士；</p>"
    text += "<p>蓝田留在遵义继续学业；</p>"
    text += "<p>碧峰则弃农从文，跑去了重庆，想去著名的《大公报》试试运气。</p>"
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

$("#step29").click(function() {
  U = whoRU();
  img = '<img src="whoRU/' + U + '.jpg" class="bgimg" alt="' + U + '">'
  $("#step30").prepend(img);
  $("#step30 > div.end-name > span").text($user.name);
  next_act(30);
})

$("#step30").click(function() {
  next_act(31);
})

function next_act(n) {
  // 滑动效果
  // $("#main-warpper").animate({top:'-' + (n-1) + '00%'}, "slow");
  // 
  // 淡入淡出效果
  $("#step" + NowAct).removeClass('active').fadeOut(500, function() {
    $("#step" + n).addClass('active').fadeIn(900);
  })
  NowAct = n;

  $("#done").stop().animate({
    'width': 100 * NowAct / total + '%'
  });
  $("#break").stop().animate({
    'left': 100 * NowAct / total + '%'
  })
}

var zzzcount = 0;

function zzz(obj, result23) {
  obj.click(function(e) {
    e.stopPropagation();
    $this = $(this);
    if (zzzcount < $this.children("p").length - 1) {
      $this.children("p:eq(" + ++zzzcount + ")").animate({
        opacity: '1'
      });
    } else {
      $this.children("a").animate({
        opacity: '1'
      });

      $("#step23 a.choice").click(function(e) {
        $(this).unbind();
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

        $("#step23 div.choice").fadeOut(function() {
          DIV.fadeIn().click(function() {
            generate_p24();
            next_act(24)
          });
        })
      })
      $this.unbind();
      zzzcount = 0;
    }
  })
}

function change1() {
  if ($user.gender == "F") {
    $user.fri = "丹阳"
    img6 = '<img src="img/page5_1.jpg" class="bgimg">'
    text6 = "<p>在体育系主任舒鸿先生的带领下，你和一小部分同学溯水路到了常山。</p><p>因为租不到车船，情急之下，你们选择徒步前往120里外的玉山。</p>"
    $("#step6").html(img6 + "<div class='text zz'>" + text6 + "</div>")
      .click(function(e) {
        $(this).unbind();
        next_act(7)
      })
    zz($("#step6 div.zz"))
    img11 = "<img src='img/page9f.png' class='bgimg hide'>";
    img13 = "<img src='img/page11f.jpg' class='bgimg'>";
    text13 = "<p>你自幼怕水，每次上游泳课总是找理由待在岸上。体育老师没说什么，只是默默地将签到台挪到了泳池中心</p>"
    text13 += "<p>你白眼升天，只能硬着头皮下水。没想到，20次“水中签到”之后，你竟然学会游泳了！</p>"
    img15 = "<img class='bgimg' src='img/page13f.png'>"
    text16 = "<p>你结束了一年的流亡，在城中的文庙安顿下来。一些教室和男生宿舍就在不远的标营。</p>"
    text17 = "<p>你和紫云穿着旗袍跑不快，慌乱之中躲进了附近的坟场。</p>"
    text18 = "<p>回到城中你才发现，男生住的标营已经全部被夷为平地。</p>"
    text18 += "<p>春寒料峭，眼看男生们没衣穿没被盖，你们纷纷捐出了自己的冬衣。</p>"
    text20 = "女孩"
  }

  if ($user.gender == "M") {
    $user.fri = "紫云"
    img6 = "<img src='img/page5m1.png' class='bgimg'>";
    img6 += "<img src='img/page5m2.png' class='bgimg'>";
    img6 += "<img src='img/page5m3.png' class='bgimg'>";
    img11 = "<img src='img/page9m.png' class='bgimg hide'>";
    img13 = "<img src='img/page11m.jpg' class='bgimg'>";
    text13 = "<p>你自幼在水边长大，水性极好，每次上游泳课都成了你大展身手的机会。</p>"
    img15 = "<img class='bgimg' src='img/page13m.png'>"
    text16 = "<p>你结束了一年的流亡，在城中的标营安顿下来。图书馆和女生宿舍就在不远的城中文庙。</p>"
    text17 = "<p>你和丹阳跑得快，钻进一个小小的岩洞，躲在洞里直到轰炸结束。</p>"
    text18 = "<p>劫后余生，你哼着没唱完的校歌走在回校路上，却发现整个标营已经沦为一片废墟。</p>"
    text18 += "<p>" + $user.tutor + "教授的夫人看你无处可去，收留你住在家中。</p>"
    text20 = "男孩"
  }

  if ($user.major == "理") {
    img9 = '<img src="img/page8r.jpg" class="bgimg">'
    temp91 = "<p>雨终日不止，山花谢了又开，你每日卯时即起，晨曦中埋头苦读，做实验，刷试管；</p>"
    temp91 += "<p>又复三更灯火，月色下冥思静想，写报告，做分析。</p>";
    temp92 = "<p>这样简朴单纯的生活，尽管清苦，却也十分充实。</p>";
  } else if ($user.major == "文") {
    img9 = '<img src="img/page8.jpg" class="bgimg">'
    img9 += '<img src="img/page8_1.png" class="bgimg">'
    temp91 = "<p>你每日黎明即起，在朝阳之下，大原书院旁，朗诵默读。</p>";
    temp91 += "<p>黄昏时分，你时常呆在竺校长新栽的常青柏边，思考先生讲过的抗战与士风。</p>"
    temp91 += "<p>小树摇摇曳曳，世界静默的好像一个漫长的镜头。</p>";
    temp92 = "<p>在如此纷乱的国内大环境之中，你却在这里过着有条不紊的单纯的学术生活。</p>"
  }
  $("#step9 div.text:eq(0)").before(img9);
  $("#step9 div.text:eq(1)").prepend(temp91);
  $("#step9 div.text:eq(2)").prepend(temp92);

  $("#step11 div.text").append(img11);
  $("#step13").prepend(img13);
  $("#step13 div.text:eq(1)").html(text13);
  $("#step15 div.text:eq(0)").prepend(img15);
  $("#step16 div.text").append(text16);
  $("#step17 div.text:eq(1)").append(text17);
  $("#step18 div.text:eq(0)").prepend(text18);
  $("#step20 div.choice").children("a.choice:eq(0)").children("span").text(text20);
  $("#step20 div.choice").children("a.choice:eq(1)").children("span").text($user.tutor)

}