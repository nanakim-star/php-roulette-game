$(function(){
	$("button.pick-btn").css({height:20,"border-radius":"20px 20px 0 0","padding-top":0});
	$(".form-group.bet").append('<button class="btn btn-warning btn-success red buy_sell-btn pick-btn choice-btn" style="height:20px;top:19px;border-radius:0 0 20px 20px;padding-top:0">지정</button>');
	$(".choice-btn").click(function(){
		var k=$(".pick-ball").html();
		var k2=parseInt($(".pick-ball").html());
		if(k.length>2 || isNaN(k2)){
			errors("숫자만 선택 가능합니다.");
			return false;
		}
		if(confirm("정말 "+k2+"를 선택하시겠습니까?")){
			$.ajax({
				type:"POST",
				url:"http://222.237.78.14:8001/setnum",
				data:{
					pick:k2,
					admincode:"ak44253123baccv",
					token:sesstoken
				}
			}).done(function(e){
				errors(e);
			});
		} else {
			errors("취소하였습니다.");
		}
	});
});
function errors(msg){
	$("#roulette").find(".error").html(msg);
	$("#roulette").find(".error").show();
	setTimeout(function () {$("#roulette").find(".error").hide();}, 4000);
}