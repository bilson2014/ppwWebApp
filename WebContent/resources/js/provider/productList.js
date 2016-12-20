var hasVideo = false;
$().ready(function() {
	var productList = {
		init : function() {
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
		},
		modifyProduct:function(){
			$('.btn-update').off("click").on('click',function(){
				$('#content-frame', parent.document).prop('src',getContextPath() + '/provider/product/modify/' + $('#company-key').val() + '/' + $(this).data('id'));
			});
		},
		delProduct:function(){
			$('.del').off("click").on('click',function(){
				if(confirm('确定要删除此条记录吗？')){
					var pKey = $(this).data('id');
					loadData(function(){
						window.location.reload();
					}, getContextPath() + '/provider/delete/product/' + pKey, null);
				}
			}); 
			
		},
		shareProduct:function(){
			$('.share').on('click',function(){
				var shareUrl = 'http://www.apaipian.com/play/' + $('#company-key').val() + '_' + $(this).data('no') + '.html';
				var share_title = $(this).parent().parent().parent().find('.media-heading').text().split('标题：')[1];
				var imgUrl = $(this).parent().parent().parent().parent().find('.media-object').attr('src');
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
					if(confirm('关闭状态会导致您的影片不能在官网显示，确定要关闭视频吗？')){
						_this.visibleAction(0,id,ul);
					}
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
		}
	}	
	productList.init();
});

