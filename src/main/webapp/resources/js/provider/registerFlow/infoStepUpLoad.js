var pageSize = 8;
var currentSize = 1;
var upload_Video;
var video_max_size = 200*1024*1024; // 200MB
var video_err_msg = '视频大小超出200M上限,请重新上传!';
$().ready(function(){
	initEven();
	//loadProduction();
	delProduct();
	playProduct();
	pagination();
});

function initEven(){
	//上传
	$('#checkStep3').off('click').on('click',function(){
	   	 if(checkState()){
	   		 $('#checkStep3').prop("type","submit");
	   	 }
	});
	
	$('#moreUp').off('click').on('click',function(){
		 $('#uploadChoose').hide();
		 $('#multUpload').show();
		 $('#video-container').html();
	});
	$('#newProduct').off('click').on('click',function(){
		 $('#uploadChoose').hide();
		 $('#upVideoCard').show();
	});
	$('#cancleMult').off('click').on('click',function(){
		window.location.reload();
	});
	$('#upBtn').off('click').on('click',function(){
		 $('.hideUp1').hide();
		 $('.hideUp2').show();
	});
	
	$('#cancleUpload').off('click').on('click',function(){
		 $('#uploadChoose').show();
		 $('.hideUp2').hide();
	});
	
	multipUploadFile();
	delProduct();
	playProduct();
}

function checkState(){
	if($('div').hasClass('blue')){
		$('#tooltip-check').show();
		$('#checkInfo').text('请完善所有作品信息后再提交');
		$('#falseCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		$('#closeCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		$('#sureCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		return false;
	}
	
	if(!$('div').hasClass('productCard')){
		$('#tooltip-check').show();
		$('#checkInfo').text('请上传作品');
		$('#falseCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		$('#closeCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		$('#sureCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		return false;
	}
	return true;
}

function delProduct(){
	$('.del').off("click").on('click',function(){
		var pKey = $(this).data('id');
		$('#tooltip-check').show();
		$('#checkInfo').text('确定要删除此作品吗？');
		$('#falseCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		$('#closeCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		$('#sureCheck').off('click').on('click',function(){
			loadData(function(){
				loadProduction();
			}, '/provider/delete/product/' + pKey, null);
			$('#tooltip-check').hide();
		});
	}); 
}

function playProduct(){
	$('.playCBtn').off("click").on('click',function() {
		var videoUrl = $(this).parent().find('input').val();
		var picUrl = $(this).attr('src');
		var videoPath = videoUrl;
		$('#playVideo').removeClass('hide');
		$(".openVideo") && $(".openVideo").remove();
		var $body = ' <div class="openVideo" title="双击关闭视频" id="playVideo">'
				+   '<div class="openVideoCommon"></div>'
				+ '<div class="setOpi" id="videoRoata"><div class="videoClose setCloseSize" id="commonCloseVideo"></div><video class="setSize" autoplay controls loop poster="'+picUrl+'"  name="media" id="header3Video"> '
				+'<source  src="'+videoPath+'"  id="source" type="video/mp4">'
				+ '</video></div>';
		$body += '</div>';
		$("body").append($body);
		initClose();
		setTimeout(function(){
			 $('#header3Video').addClass('active');
			},100);
	});
}


function multipUploadFile(){
	$(".showErrorUp").hide();
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
			 $(".showErrorUp").show();
			 $(".showErrorUp").text("最多一次上传10个视频");
		 }
	});
	
	upload_Video.on('fileQueued', function(file) {
		$('.setWord').remove();
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
							+ '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" style="width: 0%">'
							+ '</div>' + '</div>')
					.appendTo($li).find('.progress-bar');
		}
		$li.find('.videoState').text('上传中');
		$percent.css('width', percentage * 100 + '%');
	});
	upload_Video.on('uploadSuccess', function(file,response) {
		if(response._raw == 'success'){
			$('body').find('#'+file.id ).find('.videoState').text('已上传');
			$('body').find('#'+file.id ).find('.videoState').addClass("showUpSuccess");
			$('body').find('#' + file.id).find('.progress').fadeOut();
		}else{
			$('body').find('#'+file.id ).find('.videoState').text('上传失败');
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

var videoList_tpl = {
		upload_Tpl:[
		" <div class='videoCard'>                            "+
		"	<div class='videoContent'>                       "+
		"   	<div id='${file.id}' class='item'>			 "+
		"	    <div class='videoName'>${file.name}</div>    "+
		"	    <div class='videoState'>等待上传</div>		 "+
		"	</div>                                           "+
		" </div>                                             "      
		].join("")
}



function pagination(){
	$(".pagination").html('');
	$(".pagination").initPage();
	$(".pagination").createPage({
		pageCount: Math.ceil($('#total').val() / pageSize),
		current: currentSize,
		backFn:function(p){
			// 点击 翻页，查询符合条件的视频
			currentSize = p;
			loadProduction();
		}
	});
}

//加载视频
function loadProduction(){
	// 清空 videowrap
	$('#video-content').empty();
	loadData(function(list){
		    $body = '';
			$('#ProductContent').empty(); // 清空区域
			if(list.rows != null && list.rows.length > 0){
				var $body = '';
				$('#total').val(list.total);
				$.each(list.rows,function(i,solr){
					var num = parseInt(solr.indentProjectId);
					var imgPath = '/resources/images/index/noImg.jpg';
					var imageUrl = solr.picLDUrl;
					var itemflag = parseInt(solr.flag);
					var cType = $('#company-type').val();
					if(imageUrl != undefined && imageUrl != null && imageUrl != ""){
						imgPath = getDfsHostName() + imageUrl;
					}
					$body += '<div class="productCard">';
					if(imageUrl != undefined && imageUrl != null && imageUrl != ""){
						imgPath = getDfsHostName() + imageUrl;
					}
					$body += '<img class="media-object playCBtn" src="'+imgPath+'" />';
					$body += '<img class="playIcon playCBtn" src="/resources/images/index/play-icon.png"/>';
					$body += '<input type="hidden" id="media-video" value="'+solr.videoUrl+'" />';
					$body += '<div class="mid nC">';
					$body += '<div class="title">';
						$body += '<span>标题：</span> ';
						$body += '<span>'+solr.productName +'</span> ';
					    if(itemflag == 0){
					    	$body += '<div class="state yellow"><img src="/resources/images/provider/toWait.png">审核中</div>';
					    }
					    if(itemflag == 1){
					    	$body += '<div class="state green"><img src="/resources/images/provider/toPass.png">审核通过</div>';
					    }
					    if(itemflag == 2){
					    	$body += '<div class="state red"><img src="/resources/images/provider/toError.png">未通过</div>';
					    }
					    if(itemflag == 3){
					    	$body += '<div class="state blue"><img src="/resources/images/provider/toEdit.png">编辑中</div>';
					    }
					    $body += '<div/>';
					    if(cType == 4){
					    	 $body += '<div class="shareVideo">';
					    	 $body += '<div class="wechat -mob-share-weixin share" data-name="'+solr.productName+'" data-no="'+solr.productId +'"></div>';
					    	 $body += '<div class="qq -mob-share-qq share" data-name="'+solr.productName+'" data-no="'+solr.productId +'"></div>';
					    	 $body += '<div class="qq -mob-share-weibo share" data-name="'+solr.productName+'" data-no="'+solr.productId +'"></div>';
					    	 $body += '<div class="qq -mob-share-qzone share" data-name="'+solr.productName+'" data-no="'+solr.productId +'"></div>';
					    	 $body += '</div>';
					    }
					    $body += '</div>';
						$body +='</div>';
					    if(solr.checkDetails!=''&&itemflag==2){
					    	$body += '<div class="content">';
					    	$body += '<div class="cTitle">建议：</div>';
					    	$body += '<div class="cContent">'+solr.checkDetails+'</div>';
					    	$body += '</div>';
					    }
					    $body += '<div class="lastContent">';
					    if(itemflag == 1){
					    	   if(solr.visible == 1){
					    		   $body +='<div data-id="'+solr.productId+'" data-visible="'+solr.checkDetails+'" class="visible visibleProduct noneUs">';
					    	   }else{
					    		   $body +='<div data-id="'+solr.productId+'" data-visible="'+solr.checkDetails+'" class="visible visibleProduct">';
					    	   }
					    	       $body +='<div>作品可见</div></div>';
						    		    if(cType == 4){
						    		    	$body +='<div class="master-flag setMaster gStar">';
						    		    }else{
						    		    	$body +='<div class="master-flag setMaster">';
						    		    }
						    		    if(solr.masterWork == 1){
						    		    	 $body +='<div class="master-title">取消代表作</div>';
						    		    }else{
						    		    	 $body +='<div class="master-title">设为代表作</div>';
						    		    }
						    		    $body +='<div class="star" data-id="'+solr.productId+'" data-master="'+solr.masterWork+'"></div>';
						    		    $body +='</div>';
					    }
					    if(itemflag == 3 ||cType == 4){
					    	 $body +='<a href="'+$('#flowExecutionUrl').val()+'&_eventId=uploadFile&productId='+solr.productId+'&teamId='+$('#teamId').val()+'">';
					    	 $body +='<div class="edit product-edit" data-id="'+solr.productId+'">';
					    	 $body +='<div>编辑作品</div>';
					    	 $body +='</div></a>';
					    }
					    $body +='<div class="del" data-id="'+solr.productId+'">';
				    	$body +='<div>删除作品</div>';
				    	$body +='</div>';
				    	$body +='</div>';
				    	$body +='</div>';
				    
				});
				$('#ProductContent').append($body); // 填充数据
				delProduct();
				playProduct();
				pagination();
			}
	}, getContextPath() + '/provider/video-pagination', $.toJSON({
		begin : currentSize,
		limit : pageSize
	}));
}



