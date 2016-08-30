var num = 0;
var nowInt = 0;
$().ready(function(){
	
	ProductTree.loadDatas(num);
	init.share();
	
});

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

var init = {
   
		share:function(){ // 分享
			// 初始化 分享空间
			$('.share').click(function(){
				if(typeof WeixinJSBridge != "undefined"){
					/*$('#qq').click(function(){
						$('#weixin').click();
					});*/
				}
				//var title = $('#videoName').val();
				var shareUrl = getHostName() + getContextPath() + '/phone/play/';
				share.init(shareUrl,title,imgUrl);
			});
		}
}

function createCard(){
	
	var $body = ''
		+'<div class="timeTitle">'+year+'-'+month+'-'+day+'</div>'
		+'<div class="timeLineImg">'
			+'<div class="dianImg"></div>'
			+'<div class="rightJiaoImg"></div>'
		+'</div>'
		+'<div class="videoCrad">'
			+'<div class="videoContent">'
				+'<a href ="/play/'+product.teamId+'_'+product.productId+'.html"><img src="/product/img/'+getFileName(product.picLDUrl)+'"></a>'
				+'<div class="title">'+product.productName+'</div>'
				+'<div class="videoContentInfo">'+product.pDescription+'</div>'
				+'<div class="videoTag">'
				+'<div><img src="/resources/images/provder/videoTag.png"></div>'
					   +'<div>'+drawTags(product.tags)+'</div>'
			    +'</div>'
			    +'<a href ="/play/'+product.teamId+'_'+product.productId+'.html">'
			    +'<div class="videoBtn btn-red-common">了解详情</div>'
			    +'</a>'
		    +'</div>'
		+'</div>';
	return $body;		
	
	
}
function checkYearIsExist(year) {
	var yearView = $('#'+year);
	return yearView.length > 0;
}

function createYear(year){
var moYear = year%5;	
var body=''
	+'<div class="videoCardArea">'
		+'<div class="year">'
			+'<div>';
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
				 +'</div>'
			+'</div> '	
		+'</div>  '
    +'</div>'	;
return $body;
}
//创建轴节点 --》年
function drawYearView(year) {
	var moYear = year%5;
	var $body = '<div class="videoArea"><div class="yearTimeLine"></div><div class="year" id ="'+year+'"><div>';
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
			+ '</div></div></div> <div class="yearTimeLine"></div></div>';
	return $body;
}

function createMore(){
var body=''
	+'<div class="videoCardMore" id="redadMore">'
	 	+'<div class="readMore">Read More</div>'
	+'</div>'
return $body;	
 }


function getFileName(fileName){
    var pos=fileName.lastIndexOf("/");
    return fileName.substring(pos+1,fileName.length); 
}

function drawTags(tags){
	var tagsArray = tags.split(" ");
	var $body = '';
	if(tagsArray !=null ){
		for (var int = 0; int < tagsArray.length; int++) {
			var item = tagsArray[int];
			$body+=''+item+''
		}
	}
	return $body;
}

function readMore(){
	$('#redadMore').on('click',function(){
		
		   
		
	});
	
}




