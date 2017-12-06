var setInfoContent = new Array('两到三年创作经验,拥有十部以上成功作品案例',
		'三到五年创作经验,拥有二十部以上知名品牌的成功案例', '五年以上经验,拥有多部世界五百强知名品牌的成功案例',
		'1920*1080 高清分辨率,清晰色彩表现和画面锐度', '2560x1440 超高清分辨率,品牌广告级设备呈现超细腻,生动画质',
		'3840X2160 4K分辨率,科技领先设备缔造电影级视觉冲击力的震撼画质');
var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
var add = true;
$().ready(function() {
	merchantBridge();
	var cost = {
		init : function() {
			// 初始化页面
			this.initPage();
			//获取验证码
			this.getVerificationCode();
			// 提交事件
			this.submit();
			// clear表单
			this.clearForm()
		},
		initPage : function() {
			$('.dropdown-menu li').on('click',function() {
				$(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());
				var info = parseInt($(this).attr('data-info'));
				$(this).parent().parent().find('.dropdown-toggle').find('span').attr("data-content",($(this).attr('data-content')));
				$(this).parent().slideUp();
				if (info > 2) {
					$('#equipmentInfo').text(setInfoContent[info]);
				} else if (info >= 0) {
					$('#teamInfo').text(setInfoContent[info]);
				}
				return false;
			});
			// 滚动监听 start
			$('.calculator').waypoint(function(direction) {
				if (direction == "up") { // 了解 拍片网之前
					$('#header').removeClass('headerMove');
				} else {
					$('#header').addClass('headerMove');
				}
				$('#search').unbind('click');
	
				$('#search').bind('click', function() {
					searchOnclick();
				});
	
			});
			$('#equipmentInfo').text(setInfoContent[3]);
			$('#teamInfo').text(setInfoContent[0]);
		},
		//点击获取手机验证码
		getVerificationCode:function(){
			// 点击获取手机验证码发送按钮
			$('#getPhoneCodes').off('click').on('click',function(){
				curCount = count;
				$('#phone').removeClass('errorPhone');
				$("#errorPhone").attr('data-content','');
				var phone = $('#phone').val();
				if(phone == null || phone == '' || phone == undefined){
					$('#phone').addClass('errorPhone');
					showError($('#errorPhone'), '请输入手机号');
					return false;
				}
				if (!checkMobile(phone)) {
					$('#phone').addClass('errorPhone');
					showError($('#errorPhone'), '请输入正确格式的手机号');
					return false;
				}
				$('#getPhoneCodes').text('已发送('+ curCount +')');
				$('#getPhoneCodes').attr('disabled','disabled');
				InterValObj = window.setInterval(setRemainTime, 1000); // 启动计时器，1秒钟执行一次
				loadData(function(flag){
					if(!flag){
						window.clearInterval(InterValObj);
						$('#getPhoneCodes').text('重新获取');
						$('#getPhoneCodes').removeAttr('disabled');
					}
				}, getContextPath() + '/login/verification/' + $('#phone').val().trim(), null);
			});
		},
		submit : function() {
			$('#start').off("click").on('click', function() {
				var loginTel = $('#rolephone').val();
				if(loginTel!=null && loginTel!= "" ){
					var roletype=$('#roletype').val();
					if(roletype=='provider' || roletype=='employee'){
						
					}
					loginOrder();
				}else{
					noLoginOrder();
				}
			});
		},
		clearForm : function() {
			$('#clear').off("click").on('click', function() {
				$('#equipmentInfo').text(setInfoContent[3]);
				$('#teamInfo').text(setInfoContent[0]);
				$('#videoType').text('企业宣传');
				$('#videoType').attr('data-content', '0');
				$('#team').text('专业级导演团队');
				$('#team').attr('data-content', '0');
				$('#equipment').text('专业级拍摄设备 2K');
				$('#equipment').attr('data-content', '0');
				$('#actor').text("自有演员");
				$('#actor').attr('data-content', '0');
				$('#animation').text("无配音");
				$('#animation').attr('data-content', '0');
				$('#time').text("1 ~ 3 分钟");
				$('#time').attr('data-content', '0');
				$('#phone').val('');
				$('#price').html('- -&nbsp&nbsp&nbsp- -');
				showError($('#errorPhone'), '');
				$('#phone').removeClass('errorPhone');
				});
			}
		}
	cost.init();
	});

function loginOrder(){
        
		var videoType = $('#videoType').text();
		var team = $('#team').text();
		var equipment = $('#equipment').text();
		var actor = $('#actor').text();
		var animation = $('#animation').text();
		var time = $('#time').text();
		var indentId = $('#rolephone').attr('data-content');
		var description = [ "视频类别:" + videoType, ",时长:" + time, ",导演团队:" + team,
				",拍摄设备:" + equipment, ",演员:" + actor, ",配音:" + animation ].join("");
		var phone = $('#rolephone').val();
		$('#netError').hide();
			loadData(function(result) {
				add = true;
				if(result.code == 1){
					$('#price').text(thousandCount(result.cost));
					$('#rolephone').attr('data-content', result.indentId);
					$("#code-container").remove();
				}else if(result.code == 0 && result.msg == '手机号不匹配'){
					$('#netError').show();
					$('#netError').attr('data-content', '手机号不匹配');
				}else{
					$('#netError').show();
					$('#netError').attr('data-content', result.msg);
				}
			}, getContextPath() + '/calculate/cost', $.toJSON({
				videoType : $('#videoType').attr('data-content'),
				team : $('#team').attr('data-content'),
				equipment : $('#equipment').attr('data-content'),
				actor : $('#actor').attr('data-content'),
				animation : $('#animation').attr('data-content'),
				time : $('#time').attr('data-content'),
				phone : '',
				indentId : indentId,
				description : description,
				verification_code:"",
				indentSource:13
			}));
	
}

function noLoginOrder(){
	if(checkData()){
		var videoType = $('#videoType').text();
		var team = $('#team').text();
		var equipment = $('#equipment').text();
		var actor = $('#actor').text();
		var animation = $('#animation').text();
		var time = $('#time').text();
		var indentId = $('#phone').attr('data-content');
		var description = [ "视频类别:" + videoType, ",时长:" + time, ",导演团队:" + team,",拍摄设备:" + equipment, ",演员:" + actor, ",配音:" + animation ].join("");
		var phone = $('#phone').val();
		var verification_code = $('#phoneCodes').val();
		
		if(add){
			add = false;
			loadData(function(result) {
				add = true;
				if(result.code == 1){
					$('#price').text(thousandCount(result.cost));
					$('#phone').attr('data-content', result.indentId);
					$("#code-container").remove();
				}else if(result.code == 0 && result.msg == '手机号不匹配'){
					$('#errorPhone').attr('data-content', '手机号不匹配');
				}else{
					$('#errorCode').attr('data-content', result.msg);
				}
			}, getContextPath() + '/calculate/cost', $.toJSON({
				videoType : $('#videoType').attr('data-content'),
				team : $('#team').attr('data-content'),
				equipment : $('#equipment').attr('data-content'),
				actor : $('#actor').attr('data-content'),
				animation : $('#animation').attr('data-content'),
				time : $('#time').attr('data-content'),
				phone : phone,
				indentId : indentId,
				description : description,
				verification_code:verification_code,
				indentSource:13
			}));
		}
	}
}

function checkData(){
	$('#phone').removeClass('errorPhone');
	$("#errorPhone").attr('data-content','');
	$('#phoneCodes').removeClass('errorPhone');
	$("#errorCode").attr('data-content','');
	var indentId = $('#phone').attr("data-content");
	var phone = $('#phone').val();
	var code = $('#phoneCodes').val()
	if(phone == null || phone == '' || phone == undefined){
		$('#phone').addClass('errorPhone');
		showError($('#errorPhone'), '请输入手机号');
		return false;
	}
	if (!checkMobile(phone)) {
		$('#phone').addClass('errorPhone');
		showError($('#errorPhone'), '请输入正确格式的手机号');
		return false;
	}
	if( indentId == 0 ){//只有第一次计算需要验证码
		if(code == null || code == '' || code == undefined){
			$('#phoneCodes').addClass('errorPhone');
			showError($('#errorCode'), '请填写验证码');
			return false;
		}
	}
	return true;
}
//timer 处理函数 - 注册
function setRemainTime(){
	if(curCount == 0){
		window.clearInterval(InterValObj); // 停止计时器
		$('#getPhoneCodes').text('重新获取');
		$('#getPhoneCodes').removeAttr('disabled')
		// 清除session code
		getData(function(data){
			// 清除session code
		}, getContextPath() + '/login/clear/code');
	}else{
		curCount--;  
		$("#getPhoneCodes").text('已发送('+ curCount +')');
	}
}
