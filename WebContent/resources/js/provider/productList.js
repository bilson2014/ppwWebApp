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
			
		},
		modifyProduct:function(){
			$('.btn-update').off("click").on('click',function(){
				$('#content-frame', parent.document).prop('src',getContextPath() + '/provider/product/modify/' + $('#company-key').val() + '/' + $(this).data('id'));
			});
		},
		delProduct:function(){
			$('.btn-danger').on('click',function(){
				if(confirm('确定要删除此条记录吗？')){
					var pKey = $(this).data('id');
					loadData(function(){
						$('.nav-stacked li:nth-child(2)', parent.document).click();
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
			$('.media-object').off("click").on('click',function(){
				var videoUrl = $(this).next('input').val();
				var picUrl = $(this).attr('scr');
				$('#videoModal').modal();
				var videoPath = getDfsHostName() + videoUrl;
				// 装配视频
				$('#videoModal').find('video').attr('src',videoPath);
				$('#videoModal').find('video').attr('poster',picUrl);
			});
			$('#video-close').off("click").on('click',function(){
				// 关闭视频
				$('#videoModal').find('video').attr('src','');
				$('#videoModal').find('video').attr('poster','');
			});
		}
	}	
	productList.init();
});
