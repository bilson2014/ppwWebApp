$().ready(function() {
	var register = {
		    //方法都在init中
		    init: function() {
		    	//用户手机号码失去焦点
				this.userPhoneChange();
				//更换图形验证码
				this.changeKaptcha();
				this.changeKaptcha();
				//获取手机验证码
				this.verificationCode();
				
				
		        
		        
		        
		        
				 //初始化页面
		        this.movePage();
		    },
		    userPhoneChange:function(){
				$('#user_phoneNumber').off("change").on('change',function(){
					var telephone = $('#user_phoneNumber').val().trim();
					if(telephone == '' || telephone == null || telephone == undefined){
						$('#user_phoneNumberId_user').removeClass('hide').text('请填写手机号');
						$('#user_phoneNumber').focus();
						return ;
					}
					if(checkMobile(telephone)){
						loadData(function(flag){
							if(flag.errorCode == 200){
								$('#user_phoneNumberId_user').removeClass('hide').text('该手机号已经注册');
							}else if(flag.errorCode == 300){
								$('#user_phoneNumberId_user').addClass('hide')
							}else if(flag.errorCode == 500){
								$('#user_phoneNumberId').removeClass('hide');
								$('#user_phoneNumberId').text(flag.errorMsg);
							}
						}, getContextPath() + '/login/validation/phone', $.toJSON({
							telephone : telephone
						}));
					}else{
						$('#user_phoneNumberId_user').removeClass('hide').text('手机号不正确');
						$('#user_phoneNumber').focus();
						return ;
					}
				});
			},
			//更换图片验证码
			changeKaptcha:function(){
				$('.kaptcha_pic').off("click").on('click',function(){
					$('.kaptcha_pic').val('');// 重置图片验证码
					// 初始化 验证码
					$('.kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
					$('.kaptcha_pic').focus();
				});
			},
			//点击获取手机验证码
			verificationCode:function(){
				// 点击获取手机验证码发送按钮
				$('#verification_code_recover_btn').off('click').on('click',function(){
					curCount = count;
					
					var telephone = $('#user_phoneNumber').val().trim();
					if(telephone == '' || telephone == null || telephone == undefined){
						$('#user_phoneNumberId').removeClass('hide');
						$('#user_phoneNumberId').text('请填写手机号');
						$('#user_phoneNumber').focus();
						return ;
					}
					else{
						user_login.checkVerification();
					}
				});
			},
		    
		    
		    
		    
		    
		    
		    
		    
		    
		    
		    
		    
		    movePage: function() {
		        $('#toCusRe').on('click', function() {
		            $('#controlWidth').css('left', '0px');
		            $('#toCusRe').fadeOut();
		            setTimeout(function() {
		                $('#cusToInit').fadeIn();
		            }, 200);
		        });

		        $('#cusToInit').on('click', function() {
		            $('#controlWidth').css('left', '-429px');
		            $('#cusToInit').fadeOut();
		            setTimeout(function() {
		               $('#toCusRe').fadeIn();
		            }, 200);
		        });
		        
		        $('#toProRe').on('click', function() {
		            $('#controlWidth').css('left', '-858px');
		            $('#toProRe').fadeOut();
		            setTimeout(function() {
		                $('#proToInit').fadeIn();
		            }, 200);
		        }); 

		         $('#proToInit').on('click', function() {
		            $('#controlWidth').css('left', '-429px');
		            $('#proToInit').fadeOut();
		            setTimeout(function() {
		               $('#toProRe').fadeIn();
		            }, 200);
		        });   
		    },
		}
	register.init();
});
