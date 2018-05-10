
$user = new Object();
$user.name = "";
$user.profession = "文";
$user.hp = 10;
$user.good = 0;

var NowAct = 1;

function next_act() {
  $("#step" + NowAct).fadeOut(1000, function(){
    $("#step" + (NowAct+1)).fadeIn();
  })
}

$("#step1 a.btn").click(function(e){
  e.stopPropagation();
  $user.name = $("input[name='name']").val();
  $user.profession = $("input[name='major']:checked").val();
  next_act();
  NowAct = 2;
  console.log(NowAct);
})

$("#step2 a.choice").click(function(e) {
  e.stopPropagation()
  if ($(this).data("ans")) {
    $("#step2 div.text").fadeOut();
    $("#step2 div.result").slideDown();
  } else {
    next_act();
    NowAct = 3;
      console.log(NowAct);
  }
})