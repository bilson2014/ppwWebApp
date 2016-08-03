var nowInt = 0;
$().ready(function() {
	

	providerInfo.init();
	var ProductTree = {
		loadDatas : function(num) {
			var teamId = $("#teamId").val();
			getData(function(msg) {
				var timeLine = $('#timeLine');
				var $body = '';
				var int = 0;
				var index = 0;
				var oidYear = 0;
				var nextNum = 0;
				int = nowInt;
				
				for (int; int < msg.length; int++) {
				    
					var numInt = int;
					var date = convert(msg[int].creationTime);
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
				}
				
			}, getContextPath() + '/product/order/loadWithTeam/' + teamId);
		},
		initInfoHead:function(){
			var infoHead = $('#infoHead');
			var photoUrl =infoHead.attr('src');
			var fileName;
			if(photoUrl == null || photoUrl == '' || photoUrl == undefined){
				fileName ="default.png";
			}else {
				fileName = getFileName(photoUrl);
			}
			
			infoHead.attr('src','/team/img/'+fileName);
		},
		getMore:function(){
			$('#showMore').on('click',function(){
				$('#getMore').addClass('hide');
				ProductTree.loadDatas(1);
			});
		}
	}
	
	ProductTree.initInfoHead();
	ProductTree.loadDatas(0);
	
});

// 比较之前进行数据转换
function convert(value) {
	return new Date(Date.parse(value.replace(/-/g, "/")));
}
// 创建轴节点 --》年
function drawYearView(year) {
	var moYear = year%5;
	var $body = '<div class="videoArea"><div class="yearTimeLine"></div><div class="year" id ="'+year+'"><div>';
	        if(moYear==1){
	        	$body+='<div class="color2">'
	        }
	        else if(moYear==2){
	        	$body+='<div class="color3">'
            }
	        else if(moYear==3){
	        	$body+='<div class="color3">'
            }
	        else if(moYear==4){
	        	$body+='<div class="color3">'
            }
	        else if(moYear==0){
	        	$body+='<div class="color3">'
            }
	      
	        $body+= year
			+ '</div></div></div> <div class="yearTimeLine"></div></div>';
	return $body;
}
// 创建叶子节点 --》 左
function drawLeftCard(product,year,month,day) {
	var $body = ''
			+ '<div class="leftCard">'
				+ '<div class="leftDian">'
					+ '<div class="leftJiaoImg"></div>'
					+ '<div class="day">'+year+'/'+month+'/'+day+'</div>'
					+ '<div class="dianImg"></div>'
				+ '</div>'
				+ '<div class="videoCrad">'
					+ '<div class="title">'+product.productName+'</div>'
					+ '<a><img src="/product/img/'+getFileName(product.picLDUrl)+'"></a>'
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
function drawRightCard(product,year,month,day) {
	var $body = ''
		+ '<div class="rightCard">'
			+ '<div class="rightDian">'
				+ '<div class="dianImg"></div>'
				+ '<div class="day">'+year+'/'+month+'/'+day+'</div>'
				+ '<div class="rightJiaoImg"></div>'
			+ '</div>'
			+ '<div class="videoCrad">'
				+ '<div class="title">'+product.productName+'</div>'
				+ '<a><img src="/product/img/'+getFileName(product.picLDUrl)+'"></a>'
				+ '<div class="videoContentInfo">'+product.pDescription+'</div>'
				+ '<div class="videoTag"><div><img src="/resources/images/provder/videoTag.png"></div>'+drawTags(product.tags)+'</div>'
				+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html">'
					+ '<div class="videoBtn btn-red-common">了解详情</div>' 
				+ '</a>'
			+ '</div>'
		+ '</div>';
return $body;
}

//创建叶子节点 --》 加载更多
function drawMore() {
	var $body = '<div class="videoArea topMore" id="getMore">'
						+'<ul class=yearTimeUlLine>'
							+'<li></li> <li></li> <li></li>'
						+'</ul>'
					+'<div class="more" id="showMore">'
						+'<div><div>Read More</div></div>'
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
			for(i=0;i<tagLength;i++){
				var formBody ='<div class="card">';
				formBody +='<div class="controlCard">';
				formBody +='<div class="pencil"></div>';
				formBody +='<div class="cardWord">'+tagList[i]+'</div>';
				formBody += '</div>';
				formBody += '</div>';
				$("#provderTagId").append(formBody);
			}
//			if(tagLength==1){
//				provderTagWidth = 150;
//			}
//			else 
			if(tagLength>5){
                var multiple = tagLength/5;
                var intMultiple = parseInt((Number(multiple)+1));
                var provderTagHeight = intMultiple*30;
                var topLine = provderTagHeight/2-20;
				 
				
				$("#provderTagId").css("height",provderTagHeight);
				$("#tagId").css("height",provderTagHeight);
				$("#leftLineId").css("top",topLine);
				$("#rightLineId").css("top",topLine);
				
			}
			
//			else if(tagLength>1){
//				provderTagWidth=(125*tagList.length)+17*(tagLength-1);
//			}
//			$("#provderTagId").css("width",provderTagWidth);
			},
          controlSpecialVideo : function(){
        	  var yk =  $('#ykVideoUrl').val();
        	  var local = $('#localVideoUrl').val();
        	  var localImg = $('#localVideoImgUrl').val();
        	 
        	  if(yk!=undefined&&yk!=null&&yk!=""){
        		  makePlayer('showVideo', yk);
        	  }
        	  else{
        		  var formBody =' <video class="showVideo" controls src="'+local+'" preload="auto" poster="'+localImg+'"></video>';
        		  $("#showVideo").append(formBody);
        		//  <video class="showVideo" controls src="'+local+'" preload="auto" poster=''></video>
        	  }
          }
};