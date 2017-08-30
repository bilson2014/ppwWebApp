var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
//var Url = "http://www.apaipian.com:8087/";
var Url = "http://localhost:8080/";
$().ready(function() {
	initMenuEven();
	$('#productList').hide();
	$('#myPro').addClass('open');
	$('#nowDoing').addClass('checkLi');
	$('#setRealName').text($('#realName').val());
	var url = $('#photo').val();
	if(url != null && url !=""  && url !=undefined)
	$('#newMenuLogo').attr('src',getDfsHostName()+url );

	$('#myPro').removeClass('open');
	//autoTime();
	toSave();

});

function checkState(){
	
	 var href = window.location.href;
	 var state = href.substr(href.lastIndexOf("?")+1,href.length);
	    if(state.trim() == "save"){
	    	toSave();
	    }
}




function initMenuEven(){
	
	$('#myPro').off('click').on('click',function(){
		var nThis = $(this);
		 if($(this).hasClass('open')){
			 nThis.removeClass('open');
			 $('#productList').slideUp();
		 }
		 else
		 {
			 nThis.addClass('open');
			 $('#productList').slideDown();
		 }
	});
	
	//特换到小菜单
	$('#toMin').off('click').on('click',function(){
		$('.flowMenu').addClass('changeMenu');
		$('.page').addClass('toMinLeft');
		if($('#myPro').hasClass('open')){
			$('#minMyPro').addClass('open');
		}else{
			$('#minMyPro').removeClass('open');
		}
		$('.cardItem').addClass('rightsize');
	});
	
	//切换回大菜单
	$('#menuHead').off('click').on('click',function(){
		$('.flowMenu').removeClass('changeMenu');
		$('.page').removeClass('toMinLeft');
	});
	
}

function doing(){
	$('#nowDoing').off('click').on('click',function(){
		$('#upName').text("待办项目");
		$('#downName').text("其它项目");
		$('.productList li').removeClass('checkLi');
        $(this).addClass('checkLi');
        $('#hideDiv').show();
      //  $('.frame').attr('src',Url + "project/running-doing");
        
	});
}

function loadDoingInfo(){

	loadData(function (res){
	
		var body = $('#setCard');
		body.html('');
		var rows = res.result.config;
		if(res != null && res != undefined){
			for (var int = 0; int < rows.length; int++) {
					var html =createWaitCard(res);
				body.append(html);
			};
		}
		
		var body = $('#otherCard');
		body.html('');
		var rows = res.result.config;
		if(res != null && res != undefined){
			for (var int = 0; int < rows.length; int++) {
					var html =createotherCard(res);
				body.append(html);
			};
		}
		
	}, getContextPath() + '/project/gTasks',null);
	
}

function doPasue(){
	$('#pause').off('click').on('click',function(){
		$('#upName').text("暂停项目");
		$('#downName').text("暂停项目"); 
		$('.productList li').removeClass('checkLi');
        $(this).addClass('checkLi');
        $('#hideDiv').hide();
      //  $('.frame').attr('src',Url + "project/suspend-task");
	});
}

function loadPause(){
	
loadData(function (res){
	
	var body = $('#setpProductConfigLength');
	body.html('');
	var rows = res.result.config;
	if(res != null && res != undefined){
		for (var int = 0; int < rows.length; int++) {
				var html =createOption(rows[int].id,rows[int].text,rows[int].price);
			body.append(html);
		};
		
	}
		
	}, getContextPath() + '/project/running-task',null);
	
}

function doFinish(){
	$('#finish').off('click').on('click',function(){
		$('#upName').text("完成项目");
		$('#downName').text("取消项目");
		$('.productList li').removeClass('checkLi');
        $(this).addClass('checkLi');
        $('#hideDiv').show();
    //    $('.frame').attr('src', Url + "project/finished/list");
	});
}

function loadFinifsh(){
  
	loadData(function (res){
		
	}, getContextPath() + '/finished/list',null);
	
}


function toSave(){
	$('.treeitem').removeClass('treeitemRed');
	$('#toSave').addClass('treeitemRed');
	$('.frame').attr('src',"/mgr/safeInfo");
	$('#toSave').off('click').on('click',function(){
		$('.treeitem').removeClass('treeitemRed');
		$(this).addClass('treeitemRed');
        $('.frame').attr('src',"/mgr/favourites");
	});
	
}


function createWaitCard(res){
	
	if(num == 0){
		var user = '<div class="user">负责人<span>她她她</span></div>';
	}else{
		var user = '<div class="your">负责人<span>负责项目</span></div>';
	}

	var imgPath = '/resources/images/flow/demoG.png';
	var imgPath = '/resources/images/flow/demoR.png';
	var imgPath = '/resources/images/flow/demoY.png';
	var html = [
	           ' <div class="waitCard"> ' ,
	           '  <a>',
               '    <div class="cardH">' ,
               '    <div class="title">'+res.projectName+'</div>' ,
               '    <div class="point">' ,
               '        <div class="showPoint">'+res.projectGrade+'</div>' ,
               '        <div class="showDeil">' ,
               '            <div class="proPoint">项目评级<span>'+res.projectGrade+'</span></div>' ,
               '            <div class="cusPoint hide">客户评级<span>A</span></div>' ,
               '        </div>' ,
               '    </div>' ,
               '    '+user+'  ',
               '  </div>' ,
               '    <div class="cardContent">' ,
               '      <img src="/resources/images/flow/demoG.png">' ,
               '       <div class="setContent">' ,
               '           <div class="listName">'+res.Task.name+'</div>' ,
               '           <div class="lastTime">已超时 24h 5min 45s</div>' ,
               '       </div>' ,
               '     </div>' ,
               '  </a>',
               '   </div>' ,
	].join('');
	return html;
}

function createotherCard(){
	
	var level = "/resources/images/flow/isFang.png";
	var level = "/resources/images/flow/isFinish.png";
	var level = "/resources/images/flow/isMake.png";
	var level = "/resources/images/flow/isPause.png";
	var level = "/resources/images/flow/isPay.png";
	var level = "/resources/images/flow/isPrice.png";
	var level = "/resources/images/flow/isTalk.png";
	
	
	var html = [
	           ' <div class="otherCard"> ' ,
	           '  <a>',
               '    <div class="cardH">' ,
               '    <div class="title">这里是卡片的标题啊啊啊啊</div>' ,
               '    <div class="point">' ,
               '        <div class="showPoint">'+res.projectGrade+'</div>' ,
               '        <div class="showDeil">' ,
               '            <div class="proPoint">项目评级<span>'+res.projectGrade+'</span></div>' ,
               '            <div class="cusPoint hide">客户评级<span>A</span></div>' ,
               '        </div>' ,
               '    </div>' ,
               '    <div class="user">负责人<span>她她她</span></div>' ,
               '  </div>' ,
               '    <div class="cardContent">' ,
               '       <div class="setContent">' ,
               '           <div class="lastTime">已超时 24h 5min 45s</div>' ,
               '       </div>' ,
               '          <img src="/resources/images/flow/newFinish.png">' ,
               '     </div>' ,
               '  </a>',
               '   </div>' ,
	].join('');
	return html;
}
