$().ready(function() {
	providerInfo.init();
	//http://192.168.0.101/team/img/team622-20160801213518191.png
	var ProductTree = {
		loadDatas : function() {
			var teamId = $("#teamId").val();
			getData(function(msg) {
				var timeLine = $('#timeLine');
				var $body = '';
				for (var int = 0; int < msg.length; int++) {
					var date = convert(msg[int].creationTime);
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					//创建叶子节点
					if(int % 2 == 0){
						// left
						// 添加年节点
						if(!checkYearIsExist(year)){
							$body+=drawYearView(year);
						}
						$body+=drawVideoAreaBegin();
						$body+=drawLeftCard(msg[int],month,day);
					}else{
						// right
						$body+=drawRightCard(msg[int],month,day);
						$body+=drawMidTimeLine();
						$body+=drawVideoAreaEnd();
						
						timeLine.append($body);
						$body = '';
					}
				}
			}, getContextPath() + '/product/order/loadWithTeam/' + teamId);
			checkYearIsExist('2015');
		},
		initInfoHead:function(){
			var infoHead = $('#infoHead');
			var src =infoHead.attr('src');
			var fileName = getFileName(src);
			if(src==null){
				var fileName ="default.png";
			}
			
			infoHead.attr('src','/team/img/'+fileName);
		}
	}
	
	ProductTree.initInfoHead();
	ProductTree.loadDatas();
});

// 比较之前进行数据转换
function convert(value) {
	return new Date(Date.parse(value.replace(/-/g, "/")));
}
// 创建轴节点 --》年
function drawYearView(year) {
	var $body = '<div class="videoArea"><div class="yearTimeLine"></div><div class="year" id ="'+year+'"><div><div>'
			+ year
			+ '</div></div></div> <div class="yearTimeLine"></div></div>';
	return $body;
}
// 创建叶子节点 --》 左
function drawLeftCard(product,month,day) {
	var $body = ''
			+ '<div class="leftCard">'
				+ '<div class="leftDian">'
					+ '<div class="leftJiaoImg"></div>'
					+ '<div class="day">'+month+'/'+day+'</div>'
					+ '<div class="dianImg"></div>'
				+ '</div>'
				+ '<div class="videoCrad">'
					+ '<div class="title">'+product.productName+'</div>'
					+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html"><img src="/product/img/'+getFileName(product.picLDUrl)+'"></a>'
					+ '<div class="videoContentInfo">'+product.pDescription+'</div>'
					+ '<div class="videoTag"><div><img src="/resources/images/provder/videoTag.png"></div>'+drawTags(product.tags)+'</div>'
					+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html">'
						+ '<div class="videoBtn btn-red-common">了解详情</div>' 
					+ '</a>'
				+ '</div>'
			+ '</div>';
	return $body;
}

// 创建叶子节点 --》 右
function drawRightCard(product,month,day) {
	var $body = ''
		+ '<div class="rightCard">'
			+ '<div class="rightDian">'
				+ '<div class="dianImg"></div>'
				+ '<div class="day">'+month+'/'+day+'</div>'
				+ '<div class="rightJiaoImg"></div>'
			+ '</div>'
			+ '<div class="videoCrad">'
				+ '<div class="title">'+product.productName+'</div>'
				+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html"><img src="/product/img/'+getFileName(product.picLDUrl)+'"></a>'
				+ '<div class="videoContentInfo">'+product.pDescription+'</div>'
				+ '<div class="videoTag"><div><img src="/resources/images/provder/videoTag.png"></div>'+drawTags(product.tags)+'</div>'
				+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html">'
					+ '<div class="videoBtn btn-red-common">了解详情</div>' 
				+ '</a>'
			+ '</div>'
		+ '</div>';
return $body;
}

function checkYearIsExist(year) {
	var yearView = $('#'+year);
	return yearView.length > 0;
}

function drawMidTimeLine(){
	return '<div class="midTimeLine"></div>';
}
function drawVideoAreaBegin(){
	return '<div class="videoArea">';
}
function drawVideoAreaEnd(){
	return '</div>';
}
function drawTags(tags){
	var tagsArray = tags.split(" ");
	var $body = '';
	if(tagsArray !=null ){
		for (var int = 0; int < tagsArray.length; int++) {
			var item = tagsArray[int];
			$body+='<div>'+item+'</div>'
		}
	}
	return $body;
}
function getFileName(fileName){
    var pos=fileName.lastIndexOf("/");
    return fileName.substring(pos+1,fileName.length); 
}
var providerInfo = {
		init : function(){
			this.controlTag();
			this.controlSpecialVideo();
		},
		controlTag : function(){
			var tagList = $.parseJSON($('#provderTags').text());
			var tagLength =tagList.length;
			var provderTagWidth =0; 
			for(i=0;i<tagList.length;i++){
				var formBody ='<div class="card">';
				formBody +='<div class="controlCard">';
				formBody +='<div class="pencil"></div>';
				formBody +='<div class="cardWord">'+tagList[i]+'</div>';
				formBody += '</div>';
				formBody += '</div>';
				$("#provderTagId").append(formBody);
			}
			if(tagLength==1){
				provderTagWidth = 150;
			}
			else if(tagLength>1){
				provderTagWidth=(125*tagList.length)+17*(tagLength-1);
			}
			$("#provderTagId").css("width",provderTagWidth);
			},
          controlSpecialVideo : function(){
        	  var yk =  $('#ykVideoUrl').val();
        	  var local = $('#localVideoUrl').val();
        	  var localImg = $('#localVideoImgUrl').val();
        	  var localUrl = getHostName() + '/product/video/' + getFileName(local); 
        	  var localImgUrl = getHostName() + '/product/img/' + getFileName(localImg);
        	  if(yk!=undefined&&yk!=null&&yk!=""){
        		  makePlayer('showVideo', yk);
        	  }
        	  else{
        		  var formBody =' <video class="showVideo" controls src="'+localUrl+'" preload="auto" poster="'+localImgUrl+'"></video>';
        		  $("#showVideo").append(formBody);
        		//  <video class="showVideo" controls src="'+local+'" preload="auto" poster=''></video>
        	  }
          }
};