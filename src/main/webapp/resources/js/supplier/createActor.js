$().ready(function() {
	
	peoplechengck();
	gathermethod();
});


function init(){
	
	
}

//角色选择
function peoplechengck(){
	$('.check').off('click').on('click',function(){
		$('.morecheck').show();
	});
	$('.more').off('click').on('click',function(){
		$('.morecheck').show();
	});

	$('.morecheck span').off('click').on('click',function(){
		$('.morecheck').hide();
		$('.check').text($(this).text());
	});
	//addpeople的确认 和取消
	$('.addpeople .sure').off('click').on('click',function(){
		if ($('.check').text()=='演员'){
			$('.addpeople').hide();
			$('.staffbox').show();
			//提前加载图片
			imgcheckpeoplefive();
	
		}else if($('.check').text()=='导演'){
			$('.addpeople').hide();
 
		}
	});
	$('.addpeople .cancel,.gatherbut .cancel').off('click').on('click',function(){
		$('.setting').hide();
		$('.addpeople').hide();
		$('.staffbox').hide();
	});
	
}
//创建演员
function gathermethod(){
	//关闭弹框
	$('.stafftitle img').off('click').on('click',function(){
		$('.setting').hide();
		$('.staffbox').hide();	
	});
	//下拉框出现(性别、种族、城市)
	$('.gatherleft .gendergather,.gatherleft .genderimg').off('click').on('click',function(){
		$('.twocheck').show();	
	});
	$('.twocheck p').off('click').on('click',function(){
		$('.gendergather').text($(this).text());
		$('.twocheck').hide();
	});
	$('.gatherleft .racegather,.gatherleft .raceimg').off('click').on('click',function(){
		$('.racecheck').show();
	});
	$('.racecheck p').off('click').on('click',function(){
		$('.racegather').text($(this).text());
		$('.racecheck').hide();
	});
	$('.gatherleft .citygather,.gatherleft .cityimg').off('click').on('click',function(){
		$('.citycheck').show();
	});
	$('.citycheck p').off('click').on('click',function(){
		$('.citygather').text($(this).text());
		$('.citycheck').hide();
	});
	//图片的操作
	$('.imgsboxs').off('mouseover').on('mouseover',function(){
		$(this).find('.imgshade ').show();
	});
	$('.imgsboxs').off('mouseout').on('mouseout',function(){
		$(this).find('.imgshade ').hide();
	});
	//提交
	$('.gatherbut .sure').off('click').on('click',function(){
		var namegather=$('.namegather').val();
		var gendergather=$('.gendergather').text();
		var oldgather=$('.oldgather').val();
		var racegather=$('.racegather').text();
		var citygather=$('.citygather').text();
		var pricegather=$('.pricegather').val();
		$('.namegatherp').text('');
		$('.oldgatherp').text('');
		$('.pricegatherp').text('');
		$('.gendergatherp').text('');
		$('.racegatherp').text('');
		$('.citygatherp').text('');
//		console.log(namegather);
//		console.log(gendergather);
//		console.log(oldgather);
//		console.log(racegather);
//		console.log(citygather);
//		console.log(pricegather);
		if (namegather==undefined||namegather==null||namegather==''){
			$('.namegatherp').text('*姓名不能为空');
			return false;
		}else if(gendergather=='请选择性别'){
			$('.gendergatherp').text('*请选择性别');
			return false;
		}else if (oldgather==undefined||oldgather==null||oldgather==''){
			$('.oldgatherp').text('*出生年份不能为空');
			return false;
		}else if(racegather=='请选择种族'){
			$('.racegatherp').text('*请选择种族');
			return false;
		}else if(citygather=='请选择城市'){
			$('.citygatherp').text('*请选择城市');
			return false;
		}else if (pricegather==undefined||pricegather==null||pricegather==''){
			$('.pricegatherp').text('*价格不能为空');
			return false;
		}else {
			console.log('验证正确');
			
			
		}
		
	});
	
	
}

//
//$('#as').diyUpload({
//    url:'/web/upload',
//    success:function( data ) {
//        console.info( data );
//    },
//    error:function( err ) {
//        console.info( err );  
//    },
//    buttonText : '选择文件',
//    chunked:true,
//    // 分片大小
//    chunkSize:512 * 1024,
//    //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
//    fileNumLimit:50,
//    fileSizeLimit:500000 * 1024,
//    fileSingleSizeLimit:50000 * 1024,
//    accept: {}
//});
function UploadSpecialRecommendPic() {  
    $.ajaxFileUpload({  
        url : '/web/upload',  
        secureuri : false,  
        fileElementId : 'specialrecommendfile',  
        dataType : 'json',  
        success : function(d, status) {  
        	alert(e); 
            var data = eval('(' + d + ')');  
            alert(data.msg);  
            if (data.flag == 1) {  
                $("#SpecialTopicPicShow").attr("src", data.path);  
                $("#specialRecommendPic").val(data.picName);  
            }  
        },  
        error : function(data, status, e) {  
            alert(e);  
        }  
    });  
}  

//初始化fileinput控件（第一次初始化）
//function initFileInput(ctrlName, uploadUrl) {
//    var control = $('#' + ctrlName);
//    control.fileinput({
//        language: 'zh', //设置语言
//        uploadUrl: uploadUrl, //上传的地址
//        allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
//        //uploadAsync: false, //插件支持同步和异步
//        //showUpload: false, //是否显示上传按钮
//    }).on("fileuploaded", function(event, data) {  
//        //上传图片后的回调函数，可以在这做一些处理
//    });
//}

//var uploader = $("#pluploader").pluploadQueue({
//    runtimes: 'html5,flash,silverlight,html4',
//    url: '/Drawings/UploadFile/' + $('#filePath').val() + "?storageID=" + $('#storageID').val(),
//    max_file_size: '1000mb',
//    max_file_count: 20,
//    chunk_size: '100mb',
//    unique_names: false,
//    multiple_queues: true,
//    resize: { width: 320, height: 240, quality: 90 },
//    rename: true,
//    sortable: true,
//    flash_swf_url: '@Url.Content("~/Content/plupload-2.1.8/js/Moxie.swf")',
//    silverlight_xap_url: '@Url.Content("~/Content/plupload-2.1.8/js/Moxie.xap")',
//    preinit: {
//        UploadComplete: function () {
//            history.back();
//        }
//    }
//});










