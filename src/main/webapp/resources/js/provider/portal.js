var count = 120; // 间隔函数，1秒执行
var curCount; // 当前剩余秒数
var uploader;
var PopInterValObj, successIntervalObj, IntervalObj; // timer变量，控制时间
var upload_Video;
var video_max_size = 200*1024*1024; // 200MB
var video_err_msg = '视频大小超出200M上限,请重新上传!';
$().ready(function(){
	$('.tooltip-wati').show();
	initPage();
	showPassInfo();
	getHeight(2);
	videoListProtal.init();
	changePage();
	var p = $('#proLogo').attr('data-value');
	if(p!=null && p!=''){
		if(p.indexOf("/resources/")== -1){
			$('#proLogo').attr('src',getDfsHostName() + p);
		}
		if(p.indexOf("http")!= -1){
			$('#proLogo').attr('src',p);
		}
	}
	
	$('#falseCheck').on('click',function(){
		$(window.parent.document).find('#tooltip-check').hide();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        							
	});
	$('#closeCheck').on('click',function(){
		$(window.parent.document).find('#tooltip-check').hide();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        							
	});
	
	var msg = $('#recommendation').val();
	var flag = $("#bean-flag").val();
	if(flag != null && flag !='' && flag == '0'){
		//var msg = $('#recommendation').val();
		showInfomation('您提交的资料正在审核中','官方将在1个工作日内联系您');
	}else if(flag != null && flag !='' && flag == '2'){
		showInfomation('您提交的资料审核未通过','审核失败原因：'+msg);
	}else{
		var a = $("#bean-checkStatus").val();//是否存在再次审核
		if(a != null && a !='' && a == '0'){
			//var msg = $('#recommendation').val();
			showInfomation('您提交的资料正在审核中','官方将在1个工作日内联系您');
		}else if(a != null && a !='' && a == '2'){
			var msg = $('#checkDetails').val();
			showInfomation('您提交的资料审核未通过','审核失败原因：'+msg);
		}else{
			hideInfomation();
		}
	}
	
});


function changePage(){
	
	$('.infoItem div').on('click',function(){
		$('#control').hide();
		$("#content-frame").prop("src", getContextPath() + '/provider/' + $(this).data('action'));
		$('.menu-content').find('li').removeClass('active');
		$(this).addClass('active');
		$('.infoItem').removeClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($(this).text());
		if($(this).data('action')=='safe-info'){
			getHeight(1);
		}else{
			getHeight(2);
		}
		if($(this).data('action')=='video-list'){
			$('.tooltip-wati').show();
			$('#control').show();
		}
	});
	
}

function initPage(){
	
	var href = window.location.href;
    var state = href.substr(href.lastIndexOf("?")+1,href.length);
   /* if(state.trim() == "company-info" || state.trim() == "safe-info"){
    	$("#content-frame").prop("src", getContextPath() + '/provider/' + state);
    	$('.tooltip-wati').hide();
    }*/
    if(state.trim() == "company-info"){
    	$("#content-frame").prop("src", getContextPath() + '/provider/' + state);
    	$('.tooltip-wati').hide();
    	$('.menu-content').find('li').removeClass('active');
		$('#clickCompany div').addClass('active');
		$('.infoItem').removeClass('activeThis');
		$('#clickCompany').addClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($('#clickCompany div').text());
		$('#control').hide();
    }
    if(state.trim() == "safe-info"){
    	$("#content-frame").prop("src", getContextPath() + '/provider/' + state);
    	$('.tooltip-wati').hide();
    	$('.menu-content').find('li').removeClass('active');
		$('#clickSafe div').addClass('active');
		$('.infoItem').removeClass('activeThis');
		$('#clickSafe').addClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($('#clickSafe div').text());
		$('#control').hide();
    }
    
   
}

function showInfomation(title,body){
	$(document).find('#infomation').slideDown();
	$(document).find('#infomation_title').text(title);
	$(document).find('#infomation_body').text(body);
	$(document).find('#closeInfo').on('click',function(){
		hideInfomation();
	});
}

function hideInfomation(){
	$(document).find('#infomation').hide();
}

function getHeight(num){
	var screen = document.body.clientHeight - 240;
	var safe = 546;
	if(num == 1){
	$("#content-frame").css('height',safe);
	}else{
		$("#content-frame").css('height',screen);
	}
}

function showPassInfo(){
	var pass = $('.userProduct');
	pass.on('click',function(){
		if(pass.hasClass('showInfo')){
			var info = pass.attr('data-content');
			$('#tooltip-check').show();
			$('#checkInfo').text(info);
			$('#sureCheck').on('click',function(){
				$('#tooltip-check').hide();
			});
		}
	});

}


function hideSuccessTooltip(){
	$('.tooltip-success-show').hide();
}

// 成功信息 提示框弹出方法
function successToolTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-success-show').slideDown();
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}

function hideError(){
	$('.tooltip-error-show').hide();
}

// 成功信息 提示框弹出方法
function successErrorTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-error-show').slideDown();
	successIntervalObj = window.setInterval(hideError(), 3000);
}
var videoListProtal = {
		init : function() {
			//新建作品
			this.addProduct();
			//批量上传
			this.multipUploadFile();
		},
		addProduct:function(){
			$('.newProduct').off("click").on('click',function(){
			    top.location= getContextPath()+'/provider/product/upload';
			});
		},
		multipUploadFile:function(){
			$(".moreUp").off("click").on("click",function(){
				$('.tooltip-warn-up').show(); 
				$('.selectVideo').hide(); 
				$('.showwarn').show(); 
			})

			$('.closewarn').off("click").on("click",function(){
				$('.tooltip-warn-up').hide();
				window.location.reload();
			})
			$('.showmultipUpload').off("click").on("click",function(){
				$('.showwarn').hide(); 
				$('#video-container').empty(); 
				$('.selectVideo').show(); 
			})
			$('.closewarn-refresh').off("click").on("click",function(){
				$('.tooltip-warn-up').hide();
				window.location.reload();
			})
			upload_Video && upload_Video.destroy();
			var picker =$('#picker'); 
			upload_Video = WebUploader.create({
				auto:false,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/provider/multipUploadFile',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : video_max_size,
				fileNumLimit : 10,//最多上传文件
				threads :1,
				accept :{
				    title: 'video',
				    extensions: 'mp4',
				    mimeTypes: 'video/mp4'
				}
			});
			upload_Video.on('beforeFileQueued', function(file) {
				 var array = upload_Video.getFiles();
				 if(array.length == 10){
					 $('body').find("#maxLength").text("最多一次上传10个视频");
				 }
			});
			upload_Video.on('fileQueued', function(file) {
				$("#video-container").append(juicer(videoList_tpl.upload_Tpl,{file:file}));
			});
			// 文件上传过程中创建进度条实时显示。
			upload_Video.on('uploadProgress',function(file, percentage) {
				var $li = $('#' + file.id), $percent = $li
				.find('.progress .progress-bar');
				// 避免重复创建
				if (!$percent.length) {
					$percent = $(
							'<div class="progress progress-striped active">'
									+ '<div class="progress-bar" role="progressbar" style="width: 0%">'
									+ '</div>' + '</div>')
							.appendTo($li).find('.progress-bar');
				}
				$li.find('.videoState').text('上传中');
				$percent.css('width', percentage * 100 + '%');
			});
			upload_Video.on('uploadSuccess', function(file,response) {
				if(response._raw == 'success'){
					$('body').find( '#'+file.id ).find('.videoState').text('已上传');
					$('body').find( '#'+file.id ).find('.videoState').addClass("showUpSuccess");
					$('body').find('#' + file.id).find('.progress').fadeOut();
				}else{
					$('body').find( '#'+file.id ).find('.videoState').text('上传失败');
					$('body').find('#' + file.id).find('.progress').fadeOut();
				}
				
			});
			upload_Video.on('uploadError', function(file,reason) {
				console.info(reason);
			});
			upload_Video.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 	alert('请上传mp4格式');
			        }else if(type=="F_EXCEED_SIZE"){
						alert(video_err_msg);
			        }
			});
			$("#submit-multip").on('click', function() {
				upload_Video.upload();
			});
		}
}

var videoList_tpl = {
		upload_Tpl:[
		" <div class='videoCard'>                            "+
		"	<div class='videoContent'>                       "+
		"   	<div id='${file.id}' class='item'>			 "+
		"	    <div class='videoName'>${file.name}</div>    "+
		"	    <div class='videoState'>等待上传</div>          "+
		"	</div>                                            "+
		" </div>                                              "      
		].join("")
}

