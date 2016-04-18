$().ready(function() {

	$('#job-list').find('li').on('click', function() {
		$('#job-list').find('li').removeClass('active');
		$(this).addClass('active');
		$('#job-name').text($(this).text());
		// 加载数据
		var jobId = $(this).data('id');
		if(jobId != null && jobId != '' && jobId != undefined){
			
			loadData(function(job){
				// 清空div
				$('#job-duty').empty();
				$('#job-desc').empty();
				
				$('#job-demand').text(job.demand);
				$('#job-desc').text(job.jobDescription);
			}, getContextPath() + '/job/info/' + jobId, null);
		}
	});

});