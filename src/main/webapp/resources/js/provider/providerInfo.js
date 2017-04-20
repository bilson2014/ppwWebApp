var nowInt = 0;
$().ready(function() {
	providerInfo.init();
	openOrder();
	var ProductTree = {
		loadDatas : function(num) {
			var teamId = $("#teamId").val();
			loadData(function(msg) {
				var timeLine = $('#timeLine');
				var numMax = msg.length;
				var $body = '';
				var int = 0;
				var index = 0;
				var oidYear = 0;
				var nextNum = 0;
				int = nowInt;
				
				if(numMax <=0){
					$('.videoSpace').hide();
					$('.noWorkDemo').show();
				}
				
				for (int; int < numMax; int++) {
				    
					var numInt = int;
					var creationTime = msg[int].creationTime;
					var date = convert(creationTime);
					if(date == undefined || date == "" || date ==null ){
						continue;
					}
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					if(int == 0)
						oidYear = year;
					//创建叶子节点
					if(index % 2 == 0){
						// left
						// 添加年节点
						if(!checkYearIsExist(year)){
							$body+=drawYearView(year);
						}
						$body+=drawVideoAreaBegin();
						$body+=drawLeftCard(msg[int],year,month,day);
						//TODO看这
						if(num==0&&int>5){
							nowInt = int;
							index ++;
                            $body = '';
							break;
						   }
					}else{
						// right
						if(!checkYearIsExist(year) && oidYear != year){
							// 跨年了！！
							// 首先结束是一片树叉
							$body+=drawMidTimeLine();
							$body+=drawVideoAreaEnd();
							timeLine.append($body);
							$body = '';
							// 添加新的树叉  --》年
							$body+=drawYearView(year);
							$body+=drawVideoAreaBegin();
							$body+=drawLeftCard(msg[int],year,month,day);
							index = 1;
							oidYear = year;
							// 最后一年只有一块
							if((int+1) >= msg.length){
								$body+=drawMidTimeLine();
								$body+=drawVideoAreaEnd();
								timeLine.append($body);
								$body = '';
							}
							//TODO看这
							if(num==0&&int>5){
								nowInt = int;
								index ++;
                                $body = '';
								break;
							   }
							continue;
						}
						$body+=drawRightCard(msg[int],year,month,day);
						$body+=drawMidTimeLine();
						$body+=drawVideoAreaEnd();
						timeLine.append($body);
						//TODO看这
						if(num==0&&int>5){
							nowInt = int+1;
							index ++;
                            $body = '';
							break;
						   }
						$body = '';
					}
					index ++;
					oidYear = year;
				}
				if(num==0&&msg.length>6){
				var $body = drawMore();
				timeLine.append($body);
				ProductTree.getMore();
                $body = '';
				}
				if(msg.length == 1 || $body != ''){
					$body+=drawMidTimeLine();
					$body+=drawVideoAreaEnd();
					timeLine.append($body);
					$body = '';
				}
				if(num == 1){
					$('#end').removeClass('hide');
				}
			}, getContextPath() + '/product/order/loadWithTeamName' ,$.toJSON({
				condition:"teamName:"+ '"' + $("#teamName").val() + '"'
			}));
		},
		initInfoHead:function(){
			var infoHead = $('#infoHead');
			var photoUrl =infoHead.attr('src');
			if(photoUrl == null || photoUrl == '' || photoUrl == undefined){
				var fileName ="default.png";
				infoHead.attr('src','/team/img/'+fileName);
			}else {
				infoHead.attr('src',getDfsHostName()+photoUrl);
			}
		},
		getMore:function(){
			$('#showMore').on('click',function(){
				$('#getMore').addClass('hide');
				$('#end').removeClass('hide');
				ProductTree.loadDatas(1);
			});
		}
	}
	ProductTree.initInfoHead();
	ProductTree.loadDatas(0);
});

// 比较之前进行数据转换
function convert(value) {
	if(value != null && value != undefined && value != ''){
		return new Date(Date.parse(value.replace(/-/g, "/")));
	}
	return '';
}
// 创建轴节点 --》年
function drawYearView(year) {
	var moYear = year%5;
	var $body = '<div class="videoArea"><div class="yearTimeLine"></div><div class="year" id ="'+year+'">';
	        if(moYear==1){
	        	$body+='<div class="color1">'
	        }
	        else if(moYear==2){
	        	$body+='<div class="color2">'
            }
	        else if(moYear==3){
	        	$body+='<div class="color3">'
            }
	        else if(moYear==4){
	        	$body+='<div class="color4">'
            }
	        else if(moYear==0){
	        	$body+='<div class="color5">'
            }
	        $body+= year
			+ '</div></div><div class="yearTimeLine"></div></div>';
	return $body;
}
// 创建叶子节点 --》 左
function drawLeftCard(product,year,month,day) {
	var imgPath = '/resources/images/index/noImg.jpg';
	if(product.picLDUrl != null && product.picLDUrl != "" && product.picLDUrl != undefined){
		imgPath = getDfsHostName() + product.picLDUrl;
	}
	var $body = ''
			+ '<div class="leftCard">'
				+ '<div class="leftDian">'
					+ '<div class="leftJiaoImg"></div>'
					+ '<div class="day">'+month+'月'+day+'日</div>'
					+ '<div class="dianImg"></div>'
				+ '</div>'
				+ '<div class="videoCrad">'
					+ '<div class="title">'+product.productName+'</div>'
					//modify by wlc 2016-11-1 14:04:29
					//修改为dfs路径 begin
					//+ '<a  href ="/play/'+product.teamId+'_'+product.productId+'.html" ><img src="/product/img/'+getFileName(product.picLDUrl)+'"></a>'
					+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html" ><img src="'+imgPath+'"></a>'
					//修改为dfs路径 end
					//+ '<div class="videoContentInfo"></div>'
					+ '<div class="videoTag">'+drawTags(product.tags)+'</div>'
					+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html">'
						+ '<div class="videoBtn">了解详情</div>' 
					+ '</a>'
				+ '</div>'
			+ '</div>';
	return $body;
}

// 创建叶子节点 --》 右
function drawRightCard(product,year,month,day) {
	var imgPath = '/resources/images/index/noImg.jpg';
	if(product.picLDUrl != null && product.picLDUrl != "" && product.picLDUrl != undefined){
		imgPath = getDfsHostName() + product.picLDUrl;
	}
	var $body = ''
		+ '<div class="rightCard">'
			+ '<div class="rightDian">'
				+ '<div class="dianImg"></div>'
				+ '<div class="day">'+month+'月'+day+'日</div>'
				+ '<div class="rightJiaoImg"></div>'
			+ '</div>'
			+ '<div class="videoCrad">'
				+ '<div class="title">'+product.productName+'</div>'
				+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html"><img src="'+imgPath+'"></a>'
				//+ '<div class="videoContentInfo"></div>'
				+ '<div class="videoTag">'+drawTags(product.tags)+'</div>'
				+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html">'
					+ '<div class="videoBtn">了解详情</div>' 
				+ '</a>'
			+ '</div>'
		+ '</div>';
return $body;
}
//创建叶子节点 --》 加载更多
function drawMore() {
	var $body = '<div class="videoArea topMore" id="getMore">'
						+'<ul class=yearTimeUlLine>'
							+'<li></li>'
						+'</ul>'
					+'<div class="more" id="showMore">'
						+'<div><div>更多作品</div></div>'
						+'<div class="getMore"></div>'
					+'</div>'
					+'</div>';
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
			if(int != 0){
				$body+='&nbsp/&nbsp';
			}
			$body+='<div>'+item+'</div>';
		}
	}
	return $body;
}
function getFileName(fileName){
	if(fileName){
		 var pos=fileName.lastIndexOf("/");
	     return fileName.substring(pos+1,fileName.length); 
	}
}
var providerInfo = {
		init : function(){
			this.controlTag();
			this.controlSpecialVideo();
		},
		controlTag : function(){
			var tags =$('#provderTags').text();
			if(tags == null || tags =="" )
				return;
			var tagList = $.parseJSON(tags);
			var tagLength =tagList.length;
			var provderTagWidth =0; 
			
			for(i=0;i<tagLength;i++){
				var formBody ='<div class="card">';
				formBody += ''+tagList[i]+'';
				formBody += '</div>';
				formBody += '</div>';
				$("#provderTagId").append(formBody);
			}
			
			},
          controlSpecialVideo : function(){
        	  var yk =  $('#ykVideoUrl').val();
        	  var local = $('#localVideoUrl').val();
        	  var localImg = $('#localVideoImgUrl').val();
        	 
        	  if(yk!=undefined&&yk!=null&&yk!=""){
        		  makePlayer('showVideos', yk);
        	  }
        	  else{
        		  var formBody =' <video class="showVideo" controls src="'+local+'" preload="auto" poster="'+localImg+'"></video>';
        		  $("#showVideos").append(formBody);
        	  }
          }
};

function openOrder(){
	$('#withIt').on('click',function(){
		showOrder('宣传片');
	});
}
