var hasVideo = false;
var upload_Video;
var video_max_size = 200*1024*1024; // 200MB
var video_err_msg = '视频大小超出200M上限,请重新上传!';
$().ready(function() {
	var videoList = {
		init : function() {
			//新建作品
			this.addProduct();
			//修改作品
			this.modifyProduct();
			//删除作品
			this.delProduct();
			//分享作品
			this.shareProduct();
			//播放作品
			this.playProduct();
			//设置作品可见性
			this.visibleProduct();
			//设置代表作
			this.setMaster();
			//批量上传
			this.multipUploadFile();
		},
		addProduct:function(){
			$('.newProduct').off("click").on('click',function(){
			    top.location=''+getContextPath()+'/provider/product/upload';
			});
		},
		modifyProduct:function(){
			$('.btn-update').off("click").on('click',function(){
				$('#content-frame', parent.document).prop('src',getContextPath() + '/provider/product/modify/' + $('#company-key').val() + '/' + $(this).data('id'));
			});
		},
		delProduct:function(){
			$('.del').off("click").on('click',function(){
				
				$(window.parent.document).find('#tooltip-check').show();
				$(window.parent.document).find('#checkInfo').text('确定要删除此条记录吗？');
				$(window.parent.document).find('#sureCheck').off('click').on('click',function(){
					var pKey = $(this).data('id');
					loadData(function(){
						window.location.reload();
					}, getContextPath() + '/provider/delete/product/' + pKey, null);
					$(window.parent.document).find('#tooltip-check').hide();
				});
//				if(confirm('确定要删除此条记录吗？')){
//					var pKey = $(this).data('id');
//					loadData(function(){
//						window.location.reload();
//					}, getContextPath() + '/provider/delete/product/' + pKey, null);
//				}
			}); 
			
		},
		shareProduct:function(){
			$('.share').on('click',function(){
				var shareUrl = 'http://www.apaipian.com/play/' + $('#company-key').val() + '_' + $(this).data('no') + '.html';
				var share_title = $(this).data("name");
				var imgUrl = $(this).parent().parent().parent().find('.media-object').attr('src');
				var imgPath = '';
				if(imgUrl != undefined && imgUrl != null){
					var imgPath = imgUrl;
				}
				share.init(shareUrl, share_title, imgPath);
			});
		},
		playProduct:function(){
			$('.media-object').off("click").on('click',function() {
				var videoUrl = $(this).next('input').val();
				var picUrl = $(this).attr('src');
				var videoPath = getDfsHostName() + videoUrl;
				$('#playVideo').removeClass('hide');
				if (!hasVideo) {
					var $body = ' <div class="openVideo" title="双击关闭视频" id="playVideo">'
							+   '<div class="openVideoCommon"></div>'
							+ '<div id="videoRoata"><div class="videoClose" id="commonCloseVideo"></div><video autoplay controls loop poster="'+picUrl+'"  name="media" id="header3Video"> '
							+'<source  src="'+videoPath+'"  id="source" type="video/mp4">'
							+ '</video></div>';
					$body += '</div>';
					$("body").append($body);
					hasVideo = true;
					initClose();
					setTimeout(function(){
						 $('#header3Video').addClass('active');
						},100);
				} else {
					document.getElementById('header3Video').play();
					setTimeout(function(){
						 $('#header3Video').addClass('active');
						},100);
				}
			});
		},
		visibleProduct:function(){
			var _this = this;
			$(".visibleProduct li").off("click").on("click",function(){
				var ul = $(this).parent();
				var visible = $(ul).data('visible');
				var id = $(this).parent().data('id');
				if(visible==1){//可见状态下关闭
//					if(confirm('关闭状态会导致您的影片不能在官网显示，确定要关闭视频吗？')){
//						_this.visibleAction(0,id,ul);
//					}
					$(window.parent.document).find('#tooltip-check').show();
					$(window.parent.document).find('#checkInfo').text('关闭状态会导致您的影片不能在官网显示，确定要关闭视频吗？');
					$(window.parent.document).find('#sureCheck').off('click').on('click',function(){
						_this.visibleAction(0,id,ul);
					});
					
					
				}else{
					_this.visibleAction(1,id,ul);
				}
			})
		},
		visibleAction:function(visible,productId,doc){
			loadData(function(data){
				if(data.code==1){
					if(visible==1){
						$(doc).removeClass("noneUse");
					}else{
						$(doc).addClass("noneUse");
					}
					$(doc).data('visible',visible);
				}
			}, getContextPath() + '/provider/product/visibility',$.toJSON({
				teamId:$("#company-key").val(),
				visible:visible,
				productId:productId
			}));
		},
		setMaster:function(){
			$(".star").off("click").on("click",function(){
				var doc = $(this);
				var id = $(doc).data('id');
				var masterWork = $(doc).data('master');
				masterWork = masterWork==1?0:1;
				loadData(function(data){
					if(data.code==1){
						$(".star").data("master",0);
						$(".master-flag").removeClass("setMaster").addClass("noMaster");
						$(".master-title").text('设为代表作');
						$(doc).data("master",masterWork);
						if(masterWork==1){
							$(doc).parent().removeClass("noMaster").addClass("setMaster");
							$(doc).prev().text("取消代表作");
						}else{
							$(doc).parent().removeClass("setMaster").addClass("noMaster");
							$(doc).prev().text("设为代表作");
						}
					}
				}, getContextPath() + '/provider/set/masterWork',$.toJSON({
					masterWork:masterWork,
					productId:id,
					teamId:$("#company-key").val()
				}));
			})
		},
		multipUploadFile:function(){
			$(".moreUp").off("click").on("click",function(){
				$(window.parent.document).find('.tooltip-warn-up').show(); 
				$(window.parent.document).find('.selectVideo').hide(); 
				$(window.parent.document).find('.showwarn').show(); 
			})
			$(window.parent.document).find('.closewarn').off("click").on("click",function(){
				$(window.parent.document).find('.tooltip-warn-up').hide();
			})
			$(window.parent.document).find('.showmultipUpload').off("click").on("click",function(){
				$(window.parent.document).find('.showwarn').hide(); 
				$(window.parent.document).find('#video-container').empty(); 
				$(window.parent.document).find('.selectVideo').show(); 
			})
			$(window.parent.document).find('.closewarn-refresh').off("click").on("click",function(){
				$(window.parent.document).find('.tooltip-warn-up').hide();
				window.location.reload();
			})
			upload_Video && upload_Video.destroy();
			var picker =$(window.parent.document).find('#picker'); 
			upload_Video = WebUploader.create({
				auto:false,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/provider/multipUploadFile',
				pick : picker,
				fileSingleSizeLimit : video_max_size,
				accept :{
				    title: 'video',
				    extensions: 'mp4',
				    mimeTypes: 'video/mp4'
				}
			});
			upload_Video.on('fileQueued', function(file) {
				$(window.parent.document).find("#video-container").append(juicer(videoList_tpl.upload_Tpl,{file:file}));
			});
			// 文件上传过程中创建进度条实时显示。
			upload_Video.on('uploadProgress',function(file, percentage) {
				var $li = $(window.parent.document).find('#' + file.id), $percent = $li
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
				$(window.parent.document).find( '#'+file.id ).find('.videoState').text('已上传');
				$(window.parent.document).find( '#'+file.id ).find('.videoState').addClass("showUpSuccess");
				$(window.parent.document).find('#' + file.id).find('.progress').fadeOut();
			});
			upload_Video.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 	alert('请上传mp4格式');
			        }else if(type=="F_EXCEED_SIZE"){
						alert(video_err_msg);
			        }
			});
			$(window.parent.document).find("#submit-multip").on('click', function() {
				upload_Video.upload();
			});
		}
	}	
	videoList.init();
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
});

