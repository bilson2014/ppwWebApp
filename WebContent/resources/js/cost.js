var setInfoContent = new Array(
        '0000000000000000000000',
        '1111111111111111111111',
        '2222222222222222222222',
        '33333333333333333333333',
        '44444444444444444444444',
        '5555555555555555555555'
    );


$().ready(function() {
    init();
    InitGetPrice();
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

function showError(id,error){
	if(error == "" || error == null){
		id.attr('data-content',"");
	}else{
		id.attr('data-content','*'+error);
	}
}
