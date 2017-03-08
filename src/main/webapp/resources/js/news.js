var hostpath = '/';
var newspath = '/news-list.html';
var hotpath = '/news-list.html?q=最热资讯';
var flowpath = '/news-list.html?q=案例花絮';
var companypath = '/news-list.html?q=企业动态';
var infopath = '/news-list.html?q=行业资讯';
var goodpath = '/news-list.html?q=佳片赏析';
$().ready(function() {
	initContent();	
	initLike();
    controlRightPos();
    initPath();
     
});


//右侧是否悬浮
function controlRightPos(){
	  $(window).scroll(function() {
		  var divTop = $('.foot3').offset().top;
		  var screenHeight = $(window).height();
		  
		  if(divTop - $(document).scrollTop()<=screenHeight){
			//  $('.rightContent').removeClass('fixed');
			  var bottom = 1400 - (divTop - $(document).scrollTop());
			  $('.rightContent').css('top','');
			  $('.rightContent').css('bottom',bottom + 'px');
		  }else{
//			  $('.rightContent').removeClass('nofixed');
//			  $('.rightContent').addClass('fixed');
			  $('.rightContent').css('top', '145px');
			  $('.rightContent').css('bottom','');
		  }
		  if($(document).scrollTop()<=10){
//			  $('.rightContent').removeClass('nofixed');
//			  $('.rightContent').addClass('fixed');
			  $('.rightContent').css('top', '145px');
			  $('.rightContent').css('bottom','');
		  }
	  });
}


//初始化面包

function initPath(){
	var path = getQueryString('q');
	var next = $('#next').attr('href');
	$('#next').attr('href',next + path);
	var prev = $('#prev').attr('href');
	$('#prev').attr('href',prev + path);
	
    addPath(path);
}

function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = location.search.substr(1).match(reg);  
    if (r != null) return unescape(decodeURI(r[2])); return null;  
}  


//初始化最热资讯
function initContent() {
	var html = $('#newsValue').html().trim();
	if (html != '') {
		var re2 = 'src="@.@([^"]*)"';
		var p = new RegExp(re2, [ "gm" ]);
		html = html.replace(p, "src='" + getDfsHostName()
				+ "$1" + "'");
		$('#newsValue').html(html);
	} else {
		$('#newsValue').text('');
	}
	
	loadData(function(data){
		
		var newsId =$('#newsId').val();
		var k=0;
	    $.each(data.result, function(i,item) {
	    	if(k<6 && item.id != newsId){
	    		addMoreNews(item);//排除自己
	    		k++;
	    	}
	    });
	}, getContextPath() + '/get/news/tag?q=最热资讯',null);
}


//初始化感兴趣
function initLike() {	
	loadData(function(data){	
		var k=0;
	    $.each(data.result, function(i,item) {	 
	    	if(k<6){
	    		addLikeNews(item);//排除自己	   
		    	k++;
	    	}
	    });
	}, getContextPath() + '/get/news/tag?q='+$('#tags').val(),null);
}

function addMoreNews(item){
	  var $body = '<div class="videoModel">' +
	  //'<a href="/home/news/info/'+item.id+'" target="_blank">'+
	  '<a href="/news/article-'+item.id+'.html" target="_blank">'+
	  '<img src='+getDfsHostName()+item.picLDUrl+'>'+
      '<div class="rightDes">'+
         '<div>'+getTitleIndex(item.title)+'</div>'+
         '<div>'+getTime(item.creationTime)+'</div>'+
      '</div>'+
      '</a>'+
      '</div>';
	  $body += '</div>';
      $("#moreNews").append($body);   
}

function addLikeNews(item){
	  var $body = '<div class="videoLikeModel">' +
	  //'<a href="/home/news/info/'+item.id+'" target="_blank">'+
	  '<a href="/news/article-'+item.id+'.html" target="_blank">'+
	  '<img src='+getDfsHostName()+item.picLDUrl+'>'+
      '<div class="rightDes">'+getDesIndex(item.discription)+'</div>'+
      '</a>'+
      '</div>';
	  $body += '</div>';
      $(".atrContent").append($body);
}

function addPath(item){
	 
   if(item == 'index'){
	   $('#pathDiv').hide();
   }
   else{
	var $body = '<a href="/news-list.html">'+
	   '<div>'+"新闻资讯"+'</div>'+
	   '<div class="fg">></div>';
	   $body += '</a>';

	   if(item.length>0){
	   $body += '<a href="/news-list.html?q='+item+'">';
	   $body += '<div>'+item+'</div>';
	   $body +='<div class="fg">></div>';
	   $body += '</a>';
	   }

    $("#pathDiv").append($body);
   }
}


//日期格式化
function getTime(str){
	var date = convert(str);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year+'年'+month+'月'+day+'日';

}

function convert(val) {
	if(val != null && val != undefined && val != ''){
		return new Date(Date.parse(val.replace(/-/g, "/")));
	}
	return '';
}


//标题缩略格式化
function getTitleIndex(str){
	
	 var num = 18;  
	   
	if(str.length<=num){
		var content = str;
	}else{
		var content = str.substr(0,num) +"..."
	}
	return  content;
}


//内容缩略格式化
function getDesIndex(str){
	 var screenWidth = document.documentElement.clientWidth;
	 var num = 32;  
	    if(screenWidth<=1500){
	    	num = 25;
	    }
	    if(screenWidth<=1276){
	    	num = 20;
	    }
	if(str.length<=num){
		var content = str;
	}else{
		var content = str.substr(0,num) +"..."
	}
	
	return  content;
}


