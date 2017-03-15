$().ready(function() {

	loadData(function(job){
		// 清空div
		$('#job-duty').empty();
		$('#job-desc').empty();
		$('#job-demand').html(job.demand);
		$('#job-desc').html(job.jobDescription);
	}, getContextPath() + '/job/info/' + '1', null);
	
	$('#job-list').find('li').on('click', function() {
		$('#job-list').find('li').removeClass('active');
		$(this).addClass('active');
		$('#job-name').text($(this).text());
		// 加载数据
		$('#job-duty').empty();
		$('#job-desc').empty();
		$('#job-demand').html($(this).attr('data-value'));
		$('#job-desc').html($(this).attr('data-content'));
		var jobId = $(this).data('id');
//		if(jobId != null && jobId != '' && jobId != undefined){			
//			loadData(function(job){
//				// 清空div
//				$('#job-duty').empty();
//				$('#job-desc').empty();
//				$('#job-demand').html(job.demand);
//				$('#job-desc').html(job.jobDescription);
//			}, getContextPath() + '/job/info/' + jobId, null);
//		}
	});
	controlVideo();
	setMemberActive();
	window.onresize = function(){
		 setMemberActive();
	};
	
  
	
//	$('.nav-member').waypoint(function(direction) {
//        if (direction == "up") { // 了解 拍片网之前
//               console.info('up'); 
//        }
//        
//        if (direction == "bottom") { // 了解 拍片网之前
//            console.info('bot'); 
//     } 
//    });
	
	
	
});

function setMemberActive(){
	var screenHeight = document.documentElement.clientHeight;
	$('.ul-member').waypoint(function() {  
		    $(this).addClass('cActive');  
		}, { offset: screenHeight });
}

function controlVideo(){
	
	playIcon = $('#playVideos');
	
	playIcon.on('click',function(){
		document.getElementById('video').play();
		playIcon.hide();
	});
	
	var myvideo=document.getElementById('video');
    myvideo.addEventListener('play',function(){
    	playIcon.hide(); 
});
    
	var myvideo=document.getElementById('video');
    myvideo.addEventListener('pause',function(){
    	playIcon.show(); 
});
	
}