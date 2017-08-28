var InterValObj; // timer变量，控制时间  
var count = 60; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
var uploader;
var sendCodeFlag = true;

$().ready(function(){
	//弹框的事件
	init();
//	userpicInfo();

	
	
	startphone($('#conceal').text());
//	loadData(function(flag){
//		console.log(flag);
//	}, getContextPath() + '/login/verification/' + '18001223951', null);
	//手机验证码的验证
//	loadData(function(flag){
//		console.log(flag);
//	}, getContextPath() + '/login/verification/' + '15011294183', null);
	//手机发送成功之后的验证
//	loadData(function(flag){
//		console.log(flag);
//	}, getContextPath() + '/provider/checkExisting', $.toJSON({
//		phoneNumber :"15011294183"
//	}));
	

//	loadData(function(flag){
//		if(!flag){
//			// 注册过
//			console.log('您输入的手机号码已被注册');	
//		}else{ // 未注册
//			console.log('未注册');
//			//发送手机验证码
//			//手机验证码的验证
////		loadData(function(result){
////			if(result){
////				console.log(result);
////			}else{
////				console.log('验证码错误');
////			}
////		}, getContextPath() + '/phone/validate', $.toJSON({
////			telephone :'15011294183'
////			
////		}));
//		
//		}
//	}, getContextPath() + '/provider/checkExisting', $.toJSON({
//		phoneNumber :'15011294183'
//	}));	
	
	
    //弹框
    $('#orderlist').addClass('hide');
    $('#projectlist').addClass('hide');
    $('#projectlist').toggleClass('hide');
    $('#orderlist').addClass('hide');
   
    $('#order').click(function() {
        $('#orderlist').toggleClass('hide');
        $('#projectlist').addClass('hide');
    })
    loginpassword();
    verpassword();
    phonebind();
    verphone();
    emilbind();
    veremil();
//    picsend();

});

//图片上传
//function picsend(){
//	$('#uploadBt').click(function(){
//		console.log('图片上传了');
//		 userpicInfo();
//	})
//}
//手机号验证成功之后 调用的方法验证
//function ss (){
//	loadData(function(result){
//		if(result){
//			
//		}else{
//			
//		}
//	}, getContextPath() + '/phone/validate', $.toJSON({
//		telephone : $("#phoneNumber").val().trim(),
//		verification_code : oldCode
//	}));
//}

//手机号加星星(参数是要修改的手机号)
function startphone (phone){
	var mynum=phone.substr(3,4);
	var newnum=phone.replace(mynum,'****');
	$('#conceal').text(newnum);
	$('#nowphone').text(newnum);
}
//设置手机绑定
function phonebind() {
    $('#phone').click(function() {
        $('#pho').toggleClass('show');
        $('#infos').addClass('hide');
    })
    $('#phocancel').click(function() {
    	//清空点击按钮的提示
    	$('#send').text('发送验证码');
        $('#pho').hide();
        $('#infos').show();
        $('#pho').toggleClass('show');
        $('#infos').toggleClass('hide');
        $('#inputvernewpho').val('');
        $('#inputnewpho').val('');
        $('#pho .verifynewphone p').text('');
        $('#pho .newphone p').text('');       
    })
}


    //验证手机
    function verphone() {
    	//输入手机号的提示样式改变
        $('#inputnewpho').click(function() {
            $('#pho .verifynewphone p').hide();
        })
        //输入手机号焦点的改变
        $('#inputnewpho').blur(function() {
            var inputnewpho = this.value;
            console.log(inputnewpho);
            var pho = $('#inputnewpho').val();
            var rge = /^1[34578]\d{9}$/;
            if (inputnewpho.length<=0){
   			 	$('#pho .newphone p').text("*手机号码不能为空");
                $('#pho .verifynewphone p').text('');
                return false;
            }else {
            	if(!rge.test(pho )){
            		$('#pho .newphone p').text("*请输入正确的手机码");
            		return false;
            	}
   			 	$('#pho .newphone p').hide();
            }
          
        })
        $('#inputvernewpho').blur(function() {
            $('#pho .verifynewphone p').show();
            var inputvernewpho = this.value;
            if (inputvernewpho.length <= 0) {
                $('#pho .verifynewphone p').text("*验证码不能为空");
                $('#pho .newphone p').text('');
                return false;
            } else {
                $('#pho .verifynewphone p').hide();
            }
        })
        
        //验证按钮点击事件
        $('#send').click(function() {
            $('#pho .verifynewphone p').hide();
            var inputnewpho = $('#inputnewpho').val();
            var pho = $('#inputnewpho').val();
            var rge = /^1[34578]\d{9}$/; 
            var oldphone=$('#conceal').val();
            if (inputnewpho.length <= 0) {
                $('#pho .newphone p').text("*手机号码不能为空");
                $('#pho .verifynewphone p').text('');
                return false;
            } else if (!rge.test(pho)) {
                $('#pho .newphone p').text("*请输入正确的手机码");
                return false;
            } else if (oldphone==inputnewpho){
            	$('#pho .newphone p').text("*请输入新的手机号码");
            	 return false;
            }else {
                $('#pho .newphone p').hide();
                //输入成功 发送验证码的方法
                verification(inputnewpho);
                //弹框显示
//                $('.tooltip-check').show();
                //弹框中的内容部分
//                $('#checkInfo').text('验证发送成功');
            }
        })
        $('#savepho').click(function() {
          
            
            	var oldCode = $("#inputvernewpho").val();
            	console.log(oldCode);
				if(oldCode.length<=0){
					$('#pho .verifynewphone p').show();
					$('#pho .verifynewphone p').text("*验证码不能为空");
					 $('#pho .newphone p').text('');
					return false;
				}
				console.log( $("#inputnewpho").val());
				console.log("666");
				console.log(oldCode);
				
//					loadData(function(result){
//						console.log(result);
////						if(result){
////							console.log(key);
////							console.log(value);
////							$('#pho .verifynewphone p').text("");
////							//清空点击按钮的提示
////		                	$('#send').text('发送验证码');
//////		                    //弹框显示
////		                    $('.tooltip-check').show();
//////		                    //弹框中的内容部分
////		                    $('#checkInfo').text('手机绑定成功！！！');
////						}else{
////							 $('#pho .verifynewphone p').text("*验证码错误");
////						}
//					}, getContextPath() + '/mgr/modify/phone', $.toJSON({
//						phoneNumber: $("#inputnewpho").val(),
//						verification_code: oldCode
//						
//					}));
				
				loadData(function(result){
					console.log(result);
					
				}, getContextPath() + '/mgr/modify/phone', $.toJSON({
					verification_code : '123',
					phoneNumber : '12522222'
				}));
        })
        $('#sureCheck').click(function() {
            if ($('#checkInfo').text().trim() == '手机绑定成功！！！') {
            	////;
                $('#nowphone').text(startphone($('#inputnewpho').val()));
                $('#pho').toggleClass('show');
                $('#infos').toggleClass('hide');
                $('#inputvernewpho').val('');
                $('#inputnewpho').val('');
                
//                //弹框显示
//                $('.tooltip-check').hide();
              //清空点击按钮的提示
            	$('#send').text('发送验证码');

            }
        })
    }
   
    
    //封装方法验证手机号
    function verification(phone){
    	curCount = count;
    	if (sendCodeFlag){//防止多次点击
    		sendCodeFlag=false;
    		loadData(function(flag){
    			if (flag){//发送成功时
    				$('#send').text('已发送('+curCount+')');
    				//设置此时的send按钮为禁用
    				$('#send').attr('disabled','disabled');
    				//计时器
    				InterValObj && window.clearInterval(InterValObj);
    				InterValObj = window.setInterval(function(){
    					if(curCount == 0){
    						window.clearInterval(InterValObj); // 停止计时器
    						$('#send').text('重新获取');
    						$('#send').removeAttr('disabled')
    						// 清除session code
    						getData(function(data){
    							// 清除session code
    						}, getContextPath() + '/login/clear/code');
    						
    					}else{
    						curCount--;  
    						$('#send').text('已发送('+ curCount +')');
    						
    					}
    				}, 1000); // 启动计时器，1秒钟执行一次	
    			}else {//发送不成功
    				//显示重新发送
    				$('#send').text('重新获取');
    				$('#send').removeAttr('disabled');
    			}
    			sendCodeFlag = true;
    		}, getContextPath() + '/login/verification/' + phone, null);
    		
    	}
    }
    
    
    //弹出框
    function init() {
        $('#closeCheck').off('click').on('click', function() {
            $('.tooltip-check').hide();
        });
        $('#sureCheck').off('click').on('click', function() {
            $('.tooltip-check').hide();
        });

    }

    
    
    
    //设置邮箱绑定
    function emilbind() {
        $('#emil').click(function() {
            $('#emils').addClass('show');
            $('#infos').addClass('hide');
        })
        $('#emilcancel').click(function() {
            $('#emils').toggleClass('show');
            $('#infos').toggleClass('hide');
            $('#emils .newemil p').hide();
            $('#inputnewemi').val('');
        })
    }
    //验证邮箱
    function veremil() {
        $('#inputnewemi').blur(function() {
            $('#emils .newemil p').show();
            var inputnewemi = $('#inputnewemi').val().trim();
            if (inputnewemi == '' || inputnewemi == null) {
                $('#emils .newemil p').text("*邮箱不能为空");
            } else {
                $('#emils .newemil p').hide();
            }
        })
        $('#saveem').click(function() {
            $('#emils .newemil p').show();
            var inputnewemi = $('#inputnewemi').val().trim();
            if (inputnewemi == '' || inputnewemi == null) {
                $('#emils .newemil p').text("*邮箱不能为空");
                return false;
            }   
            loadData(function(result){
            	console.log(result);
//				if(!flag){
//					  $('#emils .newemil p').text("*邮箱已存在");
//					  return false;
//					
//				}else{
//					 $('#emils .newemil p').hide();
//		                //弹框显示
//		                $('.tooltip-check').show();
//		                //弹框中的内容部分
//		                $('#checkInfo').text('新邮箱设置成功！！！');
//				}
			}, getContextPath() + '/mgr/modify/email', $.toJSON({
				email: $('#inputnewemi').val()
			}));
            
          
        })
        $('#sureCheck').click(function() {
            if ($('#checkInfo').text().trim() == '新邮箱设置成功！！！') {
                $('#nowmail').text($('#inputnewemi').val() + $('#emils .newemil select option:selected').text());
                $('#emils').toggleClass('show');
                $('#infos').toggleClass('hide');
                $('#inputnewemi').val('');
            }
        })
    }

    
    
    
    //设置登录密码
    function loginpassword() {
        $('#password').click(function() {
            $('#pas').toggleClass('show');
            $('#mistakeagn').hide();
            $('#infos').addClass('hide');
        })
        $('#pascancel').click(function() {
            $('#pas').toggleClass('show');
            $('#infos').toggleClass('hide');
            $('#inputpas').val('');
            $('#inputrep').val('');
            $('#correctagn').hide();
            $('#mistakeagn').hide();
            $('#mistakeagn').show();
            $('#pas .newpas p').text('');
        })
    }
    //验证密码
    function verpassword() {
        $('#inputpas').blur(function() {
            var newpas = this.value;
            if (newpas.length <= 0) {
                $('#pas .newpas p').text('*新密码不能为空');
                $('#mistakeagn').hide();
                $('#correctagn').hide();
                return false;
            } else {
                $('#pas .newpas p').text('');
            }
        })
        $('#inputrep').blur(function() {
            var inputrep = this.value;
            if (inputrep.length > 0) {
            	$('#mistakeagn').hide();
                $('#correctagn').show();
                return false;
            } else {
                $('#correctagn').toggleClass('.hide');
                $('#mistakeagn').toggleClass('.show');
            }
        })
        $('#saverep').click(function() {
            if ($('#inputpas').val().trim() == '' || $('#inputpas').val().trim() == null) {
                $('#pas .newpas p').text('*新密码不能为空');
                return false;
            }
            if ($('#inputpas').val() != $('#inputrep').val()) {
                $('#mistakeagn').show();
                return false;
            }
            //弹框显示
            $('.tooltip-check').show();
            //弹框中的内容部分
            $('#checkInfo').text('登录密码设置成功！！！');

        })
        $('#sureCheck').click(function() {
            // $('.tips').fadeOut(500);
            if ($('#checkInfo').text().trim() == '登录密码设置成功！！！') {
                $('#pas').toggleClass('show');
                $('#infos').toggleClass('hide');
                $('#inputpas').val('');
                $('#inputrep').val('');
                $('#correctagn').hide();
                $('#mistakeagn').hide();
            }
        })
    }


  //图片上传
//    function userpicInfo() {
//    	uploader && uploader.destroy();
//    	uploader = WebUploader.create({
//    		auto : true,
//    		swf : '/resources/lib/webuploader/Uploader.swf',
//    		server : '/provider/upload/teamPhoto',
//    		pick : '#uploadBt',
//    		accept : {
//    			title : 'Images',
//    			extensions : 'jpg,png',
//    			mimeTypes : 'image/jpeg,image/png'
//    		},
//    		resize : true,
//    		chunked : false,
//    		fileSingleSizeLimit : 1024 * 2048,
//    		duplicate : true
//    	// 允许重复上传同一个
//    	});
//    	uploader.on('uploadSuccess', function(file, response) {
//    		var path = response._raw;
//    		if (path != '' && path != null) {
//    			if (path.indexOf('false@error') > -1) {
//    				if (path.indexOf("error=1") > -1) {
//    					$('.errorImg').text("文件超过最大限制");
//    				} else if (path.indexOf("error=2") > -1) {
//    					$('.errorImg').text("格式不正确");
//    				}
//    			} else {
//    				$('#user_img_url').val(path);
//    				var img = getDfsHostName() + path;
//    				$('#user-img').attr('src', img);
//    				$('.errorImg').text("");
//    			}
//    		} else {
//    		    $('.errorImg').text("上传失败!");
//    		}
//    	});
//    	uploader.on('error', function(type) {
//    		if (type == "Q_TYPE_DENIED") {
//    			$('.errorImg').text("格式不正确");
//    		} else if (type == "F_EXCEED_SIZE") {
//    			$('.errorImg').text("文件超过最大限制");
//    			
//    		}
//    	});
//    }