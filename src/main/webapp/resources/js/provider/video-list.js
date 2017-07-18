var pageSize = 5;
var upload_Video;
var video_max_size = 200*1024*1024; // 200MB
var video_err_msg = '视频大小超出200M上限,请重新上传!';
var parent = window.parent.document;
var win = window;
$().ready(function() {
	$(parent).find('.tooltip-wati').hide();
	loadProduction(1);
	var videoList = {
		init : function() {
			//新建作品
			//this.addProduct();
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
			//this.multipUploadFile();
			$(parent).find('#content-frame').css('height',$('#ProductContent').height() + 300);
		},
		/*addProduct:function(){
			$('.newProduct').off("click").on('click',function(){
			    top.location=''+getContextPath()+'/provider/product/upload';
			});
		},*/
		modifyProduct:function(){
			$('.product-edit').off("click").on('click',function(){
				var productId = $(this).attr("data-id");
				var html = "<form id='edit' action='/provider/product/upload' method='post' name='edit' style='display:none'><input type='hidden' name='productId' value='"+productId+"' /></form>";
				$(parent).find('body').append(html);
				$(parent).find('body #edit').submit().remove();
			});
		},
		delProduct:function(){
			$('.del').off("click").on('click',function(){
				var pKey = $(this).data('id');
				$(parent).find('#tooltip-check').show();
				$(parent).find('#checkInfo').text('确定要删除此条记录吗？');
				$(parent).find('#sureCheck').off('click').on('click',function(){
					loadData(function(){
						window.location.reload();
					}, '/provider/delete/product/' + pKey, null);
					$(parent).find('#tooltip-check').hide();
				});
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
			$('.playCBtn').off("click").on('click',function() {
				var videoUrl = $(this).parent().find('input').val();
				var picUrl = $(this).attr('src');
				var videoPath = getDfsHostName() + videoUrl;
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
		},
		visibleProduct:function(){
			var _this = this;
			$(".visibleProduct").off("click").on("click",function(){
				var ul = $(this);
				var visible = $(ul).data('visible');
				var id = $(this).data('id');
				if(visible==0){//可见状态下关闭
					$(parent).find('#tooltip-check').show();
					$(parent).find('#checkInfo').text('"关闭"会导致您的影片不能在官网显示，确定"关闭"吗？');
					$(parent).find('#sureCheck').off('click').on('click',function(){
						_this.visibleAction(1,id,ul);
						$(parent).find('#tooltip-check').hide();
					});
				}else{
					_this.visibleAction(0,id,ul);
				}
			})
		},
		visibleAction:function(visible,productId,doc){
			loadData(function(data){
				if(data.code==1){
					if(visible==1){
						$(doc).addClass("noneUse");
					}else{
						$(doc).removeClass("noneUse");
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

		/*multipUploadFile:function(){
			$(".moreUp").off("click").on("click",function(){
				 $(parent).find("#maxLength").text("");
				$(parent).find('.tooltip-warn-up').show(); 
				$(parent).find('.selectVideo').hide(); 
				$(parent).find('.showwarn').show(); 
			})

			$(parent).find('.closewarn').off("click").on("click",function(){
				$(parent).find('.tooltip-warn-up').hide();
			})
			$(parent).find('.showmultipUpload').off("click").on("click",function(){
				$(parent).find('.showwarn').hide(); 
				$(parent).find('#video-container').empty(); 
				$(parent).find('.selectVideo').show(); 
			})
			$(parent).find('.closewarn-refresh').off("click").on("click",function(){
				$(parent).find('.tooltip-warn-up').hide();
				win.location.reload();
			})
			upload_Video && upload_Video.destroy();
			var picker =$(parent).find('#picker'); 
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
					 $(parent).find("#maxLength").text("最多一次上传10个视频");
				 }
			});
			upload_Video.on('fileQueued', function(file) {
				$(parent).find("#video-container").append(juicer(videoList_tpl.upload_Tpl,{file:file}));
			});
			// 文件上传过程中创建进度条实时显示。
			upload_Video.on('uploadProgress',function(file, percentage) {
				var $li = $(parent).find('#' + file.id), $percent = $li
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
					$(parent).find( '#'+file.id ).find('.videoState').text('已上传');
					$(parent).find( '#'+file.id ).find('.videoState').addClass("showUpSuccess");
					$(parent).find('#' + file.id).find('.progress').fadeOut();
				}else{
					$(parent).find( '#'+file.id ).find('.videoState').text('上传失败');
					$(parent).find('#' + file.id).find('.progress').fadeOut();
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
			$(parent).find("#submit-multip").on('click', function() {
				upload_Video.upload();
			});
		}*/
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

function pagination(){
	$(".pagination").createPage({
		pageCount: Math.ceil($('#total').val() / pageSize),
		current: 1,
		backFn:function(p){
			// 点击 翻页，查询符合条件的视频
			loadProduction((p - 1) * pageSize);
			currentSize = (p - 1) * pageSize;
		}
	});
}

//加载视频
function loadProduction(start){
	// 清空 videowrap
	$('#video-content').empty();
	loadData(function(list){
		$body = '';
		if(list != null && list.length > 0){
			 // 此布局是一行4个
			$('#video-content').empty(); // 清空区域
			if(list != null && list.length > 0){
				var $body = '';
				$.each(list,function(i,solr){
					var num = parseInt(solr.indentProjectId);
					var imgPath = '/resources/images/index/noImg.jpg';
					var imageUrl = solr.picLDUrl;
					var itemflag = parseInt(solr.teamFlag);
					if(imageUrl != undefined && imageUrl != null && imageUrl != ""){
						imgPath = getDfsHostName() + imageUrl;
					}
					$body += '<div class="productCard">';
					if(imageUrl != undefined && imageUrl != null && imageUrl != ""){
						imgPath = getDfsHostName() + imageUrl;
					}
					$body += '<img class="media-object playCBtn" src="'+imgPath+'" />';
					$body += '<img class="playIcon playCBtn" src="/resources/images/index/play-icon.png"/>';
					$body += '<input type="hidden" id="media-video" value="product.videoUrl" />';
					$body += '<div class="mid nC">';
					$body += '<div class="title">';
					$body += '<span>标题：</span> ';
				
					/*<span><c:out value="${product.productName }" /></span>
					<c:if test="${product.flag==0}">
						<div class="state yellow"><img src="/resources/images/provider/toWait.png">审核中</div>
					</c:if>
					<c:if test="${product.flag==1}">
						<div class="state green"><img src="/resources/images/provider/toPass.png">审核通过</div>
					</c:if>
					<c:if test="${product.flag==2}">
						<div class="state red"><img src="/resources/images/provider/toError.png">未通过</div>
					</c:if>
					<c:if test="${product.flag==3}">
						<div class="state blue"><img src="/resources/images/provider/toEdit.png">编辑中</div>
					</c:if>
				</div>
					*/
						
				});

				$('#video-content').append($body); // 填充数据
			}else {
				// 如果没有数据，则显示 "对不起，没有查询到您想要的数据"
				$('#video-content').append('<div class="prompt-word">您找的影片遗落在外星球了！快 登录 拍片网飞船吧！</div>');
			}
		}
	}, getContextPath() + '/provider/video-pagination', $.toJSON({
		begin : start,
		limit : pageSize
	}));
}

/*


<div class="mid nC">
	<div class="title">
		<span>标题：</span> 
		<span><c:out value="${product.productName }" /></span>
		<c:if test="${product.flag==0}">
			<div class="state yellow"><img src="/resources/images/provider/toWait.png">审核中</div>
		</c:if>
		<c:if test="${product.flag==1}">
			<div class="state green"><img src="/resources/images/provider/toPass.png">审核通过</div>
		</c:if>
		<c:if test="${product.flag==2}">
			<div class="state red"><img src="/resources/images/provider/toError.png">未通过</div>
		</c:if>
		<c:if test="${product.flag==3}">
			<div class="state blue"><img src="/resources/images/provider/toEdit.png">编辑中</div>
		</c:if>
	</div>

	
	<c:if test="${cType == 4 }">
		<div class="shareVideo">
		    <div>分享：</div>
		    <div class="wechat -mob-share-weixin share" data-name='<c:out value="${product.productName }" />' data-no='<c:out value="${product.productId }" />'></div>
		    <div class="qq -mob-share-qq share" data-name='<c:out value="${product.productName }" />' data-no='<c:out value="${product.productId }" />'></div>
		    <div class="wb -mob-share-weibo share" data-name='<c:out value="${product.productName }" />' data-no='<c:out value="${product.productId }" />'></div>
		    <div class="zone -mob-share-qzone share" data-name='<c:out value="${product.productName }" />' data-no='<c:out value="${product.productId }" />'></div>
		</div>
	</c:if>
</div>

	<div class="content <c:if test="${empty product.checkDetails || product.flag != 2}">hide</c:if>">
		<div class="cTitle">建议：</div>
		<div class="cContent">
		<c:if test="${not empty product.checkDetails and product.flag == 2}">
			${product.checkDetails }
		</c:if>
		</div>
	</div>

<div class="lastContent">

   <c:if test="${product.flag==1}">
       <div data-id="<c:out value="${product.productId }"/>" data-visible="<c:out value="${product.visible }"/>" class="visible visibleProduct <c:if test="${product.visible==1}">noneUse</c:if>">
          <div>作品可见</div>
       </div>
   </c:if>

	<c:if test="${product.flag==1}">
		<c:if test="${product.masterWork==1}">
			<div class="master-flag setMaster <c:if test="${cType==4}">gStar</c:if>">
				<div class="master-title">取消代表作</div>
				<div class="star"
				 data-id='<c:out value="${product.productId }"/>'
				 data-master='<c:out value="${product.masterWork }" />'></div>
			</div>
		</c:if>
	<c:if test="${product.masterWork==0}">
			<div class="master-flag noMaster <c:if test="${cType==4}">gStar</c:if>">
				<div class="master-title">设为代表作</div>
				<div class="star" 
				data-id='<c:out value="${product.productId }" />'
				data-master='<c:out value="${product.masterWork }" />'></div>
			</div>
		</c:if>
	</c:if>
	<c:if test="${product.flag==3 || cType == 4}">
		<div class="edit product-edit"  data-id='<c:out value="${product.productId }" />'>
		     <div>编辑作品</div>
		</div>
	</c:if>
	    <div class="del" data-id='<c:out value="${product.productId }"/>'>
	        <div>删除作品</div>
	    </div>
</div>
</div>
*/