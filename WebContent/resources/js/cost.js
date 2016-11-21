var setInfoContent = new Array(
        '1920*1080 高清分辨率,清晰色彩表现和画面锐度',
        '2560x1440 超高清分辨率,品牌广告级设备呈现超细腻,生动画质',
        '3840X2160 4K分辨率,科技领先设备缔造电影级视觉冲击力的震撼画质',
        '两到三年创作经验,拥有十部以上成功作品案例',
        '三到五年创作经验,拥有二十部以上知名品牌的成功案例',
        '五年以上经验,拥有多部世界五百强知名品牌的成功案例'
    );


$().ready(function() {
    init();
    InitGetPrice();
    $('#equipmentInfo').text(setInfoContent[3]);
	$('#teamInfo').text(setInfoContent[0]);
});
function init() {

//     $(".dropdown").hover(function() {
//        $(this).find('ul').slideDown();
//    }, function() {
//        $(this).find('ul').slideUp();
//    });
	$(".dropdown").on('click',function(){
		$(this).find('ul').slideDown();
	});

     $('li').on('click',function(){
          $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());
          var info=parseInt($(this).attr('data-info'));
          $(this).parent().parent().find('.dropdown-toggle').find('span').attr("data-content",($(this).attr('data-content')));
          $(this).parent().slideUp();
          if(info>2){
        	$('#equipmentInfo').text(setInfoContent[info]);
          }
          else if(info>=0){
        	  $('#teamInfo').text(setInfoContent[info]);
          }
          return false;
     });

     // 滚动监听 start
    $('.calculator').waypoint(function(direction) {
        if (direction == "up") { // 了解 拍片网之前
            $('#header').removeClass('headerMove');
        } else {
            $('#header').addClass('headerMove');
        }

        $('#search').unbind('click');
        
        $('#search').bind('click', function() {
            searchOnclick();
        });

    });
    
    
  
}

function InitGetPrice(){
	  $('#start').on('click',function(){
	    	var phone = $('#phone').val();
	    	if(checkMobile(phone)){
	    	getPrice(phone);
	    	showError($('#errorPhone'),'');
	    	}else{
	    		showError($('#errorPhone'),'手机号填写错误');
	    	}
	    });
	  
	  $('#clear').on('click',function(){
			  $('#equipmentInfo').text(setInfoContent[3]);
			  $('#teamInfo').text(setInfoContent[0]);
			$('#videoType').text('活动视频');
			$('#videoType').attr('data-content','0');
			$('#team').text('专业级导演团队');
			$('#team').attr('data-content','0');
			$('#equipment').text('专业级拍摄设备 2K');
			$('#equipment').attr('data-content','0');
			$('#actor').text("无演员");
			$('#actor').attr('data-content','0');
			$('#animation').text("无动画");
			$('#animation').attr('data-content','0');
			$('#time').text("1 ~ 3 分钟");
			$('#time').attr('data-content','0');
			$('#phone').val('');
			$('#price').html('- -&nbsp&nbsp&nbsp- -');
			showError($('#errorPhone'),'');
	  });
}



function getPrice(relP){
	
	var videoType = $('#videoType').text();
	var team = $('#team').text();
	var equipment    = $('#equipment').text();
	var actor  = $('#actor').text();
	var animation = $('#animation').text();
	var time = $('#time').text();
	var phone   = relP;
	var indentId = $('#phone').attr('data-content');
	var description = videoType+","+team+","+equipment+","+actor+","+animation+","+time+","+indentId+","+phone;
	var text = $('#time').attr('data-content');
	loadData(function(job){
	  $('#price').text(thousandCount(job.cost));
	  $('#phone').attr('data-content',job.indentId);
	}, getContextPath() + '/calculate/cost', $.toJSON({
		videoType : $('#videoType').attr('data-content'),
		team : $('#team').attr('data-content'),
		equipment : $('#equipment').attr('data-content'),
		actor : $('#actor').attr('data-content'),
		animation : $('#animation').attr('data-content'),
		time : $('#time').attr('data-content'),
		phone : phone,
		indentId : indentId,
		description : description
	}));
}


