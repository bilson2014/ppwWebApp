var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数  
var isLogin;
var wb_uniqueId;
var qq_uniqueId;
$().ready(function(){

	var user_login = {
			init:function(){
				//手机号码失去焦点
				this.phoneNumberChange();
				//更换图形验证码
				this.changeKaptcha();
				//获取手机验证码
				this.verificationCode();
				//绑定
				this.bind();
			},
			
			phoneNumberChange:function(){
				$('#user_phoneNumber').on('change',function(){
					$('#user_phoneNumberId').addClass('hide');
					var telephone = $('#user_phoneNumber').val().trim();
					if(telephone == '' || telephone == null || telephone == undefined){
						$('#user_phoneNumberId').removeClass('hide');
						$('#user_phoneNumberId').text('请填写手机号');
						$('#user_phoneNumber').focus();
						return false;
					}
					if(checkMobile(telephone)){
						loadData(function(data){
							$("#qq").val(data.qq);
							$("#wechat").val(data.wechat);
							$("#wb").val(data.wb);
							if(data.register==0){
								$('#bindBtn').attr('data-status','noregister'); // 标记手机号未注册过
							}else{
								$('#bindBtn').attr('data-status','register'); // 标记手机号注册过
								var type = $("#type").val(); //qq wechat wb 第三方来源
								var thirdStatus = $("#"+type).val();//当前输入手机号绑定状态  0未绑定第三方 1已绑定
								if(thirdStatus==1){//改手机号绑定过第三方
									$('#user_phoneNumberId').removeClass('hide');
									$('#user_phoneNumberId').text('手机号被占用');
									return false;
								}
							}
						}, getContextPath() + '/login/threeLogin/phone', $.toJSON({
							telephone : telephone
						}));
					}else{
						$('#user_phoneNumberId').removeClass('hide');
						$('#user_phoneNumberId').text('手机号不正确');
						$('#user_phoneNumber').focus();
						return ;
					}
					$('#user_phoneNumberId').addClass('hide');
				});
			},
			//更换图片验证码
			changeKaptcha:function(){
				$('#kaptcha_pic').off("click").on('click',function(){
					$('#kaptcha_pic').val('');// 重置图片验证码
					// 初始化 验证码
					$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
					$('#kaptcha_pic').focus();
				});
			},
			//点击获取手机验证码
			verificationCode:function(){
				// 点击获取手机验证码发送按钮
				$('#verification_code_recover_btn').off('click').on('click',function(){
					curCount = count;
					var kaptchaCode = $('#kaptcha_code').val().trim();
					if(kaptchaCode != null && kaptchaCode != '' && kaptchaCode != undefined){
						// 判断 图片验证码 是否正确
						getData(function(info){
							if(!info.key){
								// 图片验证码 不一致 
								// 重置图片验证码
								$('#kaptcha_code').val(''); // 重置 图片验证码 信息
								// 初始化 验证码
								$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
								$('#kaptcha_code').focus();
								$("#kapt_error_info").text("图形验证码错误").removeClass("hide");
							}else{
								// 验证通过
								// 发送验证码
								$("#kapt_error_info").addClass("hide");
								loadData(function(flag){
									if(flag){
										// 发送成功
										// 设置 button 效果为禁用
										$('#verification_code_recover_btn').text('已发送('+ curCount +')');
										$('#verification_code_recover_btn').attr('disabled','disabled');
										InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒钟执行一次
										// 倒计时
									}else{
										// 发送不成功
										// 显示重新发送
										$('#verification_code_btn').text('重新获取');
										$('#verification_code_btn').removeAttr('disabled');
									}
								}, getContextPath() + '/login/verification/' + $('#user_phoneNumber').val().trim(), null);
							}
						}, getContextPath() + '/login/kaptcha/compare/' + kaptchaCode);
					}else{ // 图片验证码为空
						$('#kaptcha_code').val('');// 重置图片验证码
						// 初始化 验证码
						$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
						$('#kaptcha_code').focus();
						$("#kapt_error_info").text("请填写图片验证码!").removeClass("hide");
					}
				});
			},
			bind:function(){
				var _this = this;
				$("#bindBtn").off("click").on("click",function(){
					$(".errorDiv").addClass("hide");
					var user_phoneNumber = $("#user_phoneNumber").val();
					var veri_code = $('#verification_code').val();
					var kap_code = $('#kaptcha_code').val();
					if(user_phoneNumber == null || user_phoneNumber == '' || user_phoneNumber == undefined){
						$("#user_phoneNumberId").text("请输入手机号").removeClass("hide");
						$('#user_phoneNumber').focus();
						return false;
					}
					if(!checkMobile(user_phoneNumber.trim())){
						$('#user_phoneNumberId').removeClass('hide').text('手机号不正确');
						$('#user_phoneNumber').focus();
						return false;
					}
					if(kap_code == null || kap_code == '' || kap_code == undefined){
						$("#kapt_error_info").text("请输入图形验证码").removeClass("hide");
						$('#kaptcha_code').focus();
						return false;
					}
					if(veri_code == null || veri_code == '' || veri_code == undefined){
						$("#code_error_info").text("请输入验证码").removeClass("hide");
						$('#verification_code').focus();
						return false;
					}
					
					//通过验证后,提交到后台
					_this.bindPerson();
					
				})
			},
			bindPerson:function(){
				var code = $("#code").val();//0||1 第三方账户状态,不存在或者存在却无手机号
				var type = $("#type").val(); //qq wechat wb 第三方来源
				var phoneStatus = $("#bindBtn").attr("data-status");//手机号 register or noregister
				var thirdStatus = $("#"+type).val();//当前输入手机号绑定状态  0未绑定第三方 1已绑定
				var userId = $("#userId").val();
				var userName = $("#userName").val();
				var imgUrl = $("#imgUrl").val();
				var unique = $("#unique").val();
				loadData(function(info){
					if(info.key){
						showFinish();
					}else{
						$('#code_error_info').removeClass('hide');
						$('#code_error_info').text(info.value);
					}
				}, getContextPath() + '/login/third/bind', $.toJSON({
					code:code,
					type:type,
					phoneStatus:phoneStatus,
					thirdStatus:thirdStatus,
					userId:userId,
					userName:userName,
					imgUrl:imgUrl,
					telephone : $('#user_phoneNumber').val().trim(),
					verification_code : $('#verification_code').val().trim(),
					unique:unique
				}))
			}
	} 
	user_login.init();
	
	
	//timer 处理函数 - 注册
	function SetRemainTime(){
		if(curCount == 0){
			window.clearInterval(InterValObj); // 停止计时器
			$('#verification_code_recover_btn').text('重新获取');
			$('#verification_code_recover_btn').removeAttr('disabled')
			// 清除session code
			getData(function(data){
				// 清除session code
			}, getContextPath() + '/login/clear/code');
			
		}else{
			curCount--;  
			$("#verification_code_recover_btn").text('已发送('+ curCount +')');
		}
	}
	
});	

function showFinish(){
	 var $body = '<div class="showSuccessModal ">'
        + '<div class="successModals">'
        + '     <div class="show-zero2 zeromodal-icon zeromodal-success">'
        + '     <span class="line tip"></span>'
        + '     <span class="line long"></span>'
        + '     <div class="placeholder"></div>'
        + ' </div>'
        + '   <div class="successWords">绑定成功!</div>'
        + '   <div class="successInfos">欢迎加入拍片网！自动跳转至<span id="toPortal">首页</span><span id="last3">3</span>秒后关闭</div>'
        + '</div>';
$body += '</div>';
$("body").append($body);
successToolTipShow();


}

function successToolTipShow() {
	   window.clearInterval(successIntervalObj);
	   successIntervalObj = window.setInterval(firstSuccessTooltip, 1000);
	   $('#toPortal').on('click',function(){
		   window.location.href=getContextPath()+ '/mgr/index';
	});

	}
	function firstSuccessTooltip() {
	   if (initM < 0) {
	       $('#last3').text('0');
	       clearInterval(successIntervalObj);
	       $('.showSuccessModal').remove();
	       window.location.href=getContextPath()+ '/mgr/index';
	   } else {
	       $('#last3').text(initM--);
	   }
	}
