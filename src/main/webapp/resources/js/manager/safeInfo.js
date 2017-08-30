var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
var uploader;
var sendCodeFlag = true;
var oldphones;
var iphone;//保存新的手机号 避免重复

$().ready(function(){
//	loadData(function(result){
//		console.log(result);
//	}, getContextPath() + '/mgr/safeInfo', $.toJSON({					
//
//		: $('#nowphone').val(),
//		: $('#nowmail').val(),
//		:$('#loginName').val(),
//		:$('#trueName').val()
//		
//	}));
	
	
	userpicInfo();
	//弹框的事件
	init();	
	oldphones=$('#conceal').text();
	startphone($('#conceal').text());
    //弹框
    $('#orderlist').addClass('hide');
    $('#projectlist').addClass('hide');
    $('#projectlist').toggleClass('hide');
    $('#orderlist').addClass('hide');
  //切换弹出框
    $('#order').click(function() {
        $('#orderlist').toggleClass('hide');
        $('#projectlist').addClass('hide');
    })
    loginpassword();
    verpassword(); 
    phonebind();
    emilbind();
    veremil();
});
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
    	$('#send').text('发送验证码');
    	window.clearInterval(InterValObj); // 停止计时器
        $('#pho').hide();
        $('#infos').show();
        $('#pho').toggleClass('show');
        $('#infos').toggleClass('hide');
        $('#inputvernewpho').val('');
        $('#inputnewpho').val('');
        $('#pho .verifynewphone p').text('');
        $('#pho .newphone p').text(''); 
    })
    	//输入手机号的提示样式改变
        $('#inputnewpho').click(function() {
            $('#pho .verifynewphone p').hide();
        })
        //输入手机号焦点的改变
        $('#inputnewpho').blur(function() {
            var inputnewpho = this.value;  
            var pho = $('#inputnewpho').val();
            var rge = /^1[34578]\d{9}$/;
            if (inputnewpho.length<=0){
   			 	$('#pho .newphone p').text("*手机号码不能为空");
                $('#pho .verifynewphone p').text('');
                return false;
            }else if (inputnewpho==oldphones){
            	$('#pho .newphone p').text("*请输入新的手机号");
            	return false;
            }else {
            	if(!rge.test(pho )){
            		$('#pho .newphone p').text("*请输入正确的手机码");
            		return false;
            	}else 
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
    	   $('#send').text('发送验证码');
          	window.clearInterval(InterValObj); // 停止计时器
           $('#pho .verifynewphone p').hide();
           var inputnewpho = $('#inputnewpho').val();
           var pho = $('#inputnewpho').val();
           //再次验证的手机号 确保与之前的不一样（此处的获取到的手机号是加密）
           
           console.log(inputnewpho);        
           console.log(iphone);
           
           var rge = /^1[34578]\d{9}$/; 
           var oldphone=$('#conceal').val();
           if (inputnewpho.length <= 0) {
        	   $('#pho .newphone p').show();
               $('#pho .newphone p').text("*手机号码不能为空");
               $('#pho .verifynewphone p').text('');
               return false;
           } else if (!rge.test(pho)) {
        	   $('#pho .newphone p').show();
               $('#pho .newphone p').text("*请输入正确的手机码");
               return false;
           }else if (inputnewpho==iphone){
        	   $('#pho .newphone p').show();
           	$('#pho .newphone p').text("*请输入新的手机号码");
           	 return false;
           }else {
               $('#pho .newphone p').hide();
               //输入成功 发送验证码的方法
               verification(inputnewpho);           
           }
       }) 
       $('#savepho').click(function() {
		   var inputnewpho = $('#inputnewpho').val();
	       var pho = $('#inputnewpho').val();
	       var rge = /^1[34578]\d{9}$/; 
	       var oldCode = $("#inputvernewpho").val();
	       if (inputnewpho.length <= 0) {
	    	   $('#pho .newphone p').show();
	           $('#pho .newphone p').text("*手机号码不能为空");
	           $('#pho .verifynewphone p').text('');
	           return false;
	       } else if (!rge.test(pho)) {
	    	   $('#pho .newphone p').show();
	           $('#pho .newphone p').text("*请输入正确的手机码");
	           return false;
	       }else if (inputnewpho==iphone){
	    	   $('#pho .newphone p').show();
	       	$('#pho .newphone p').text("*请输入新的手机号码");
	       	 return false;
	       }else if (oldCode.length<=0){
	    	   $('#pho .newphone p').hide();
				$('#pho .verifynewphone p').show();
				$('#pho .verifynewphone p').text("*验证码不能为空");	
				return false;
			}   
	       else {
	    	   $('#pho .verifynewphone p').text("");       
	       }
				loadData(function(result){
					if(result.key){	
						$('#pho .verifynewphone p').text("");
						//清空点击按钮的提示
	                	$('#send').text('发送验证码');
//	                    //弹框显示
	                    $('.tooltip-check').show();
//	                    //弹框中的内容部
	                    $('#checkInfo').text('手机绑定成功！！！');
					}else{
						$('#pho .verifynewphone p').show();
						 $('#pho .verifynewphone p').text("*"+result.value);
					}
				}, getContextPath() + '/mgr/modify/phone', $.toJSON({					
					phoneNumber: $("#inputnewpho").val(),
					verification_code: oldCode						
				}));
       		})
       $('#sureCheck').click(function() {
           if ($('#checkInfo').text().trim() == '手机绑定成功！！！') {
        	   iphone=$('#inputnewpho').val();
               $('#nowphone').text(startphone($('#inputnewpho').val()));
               $('#pho').toggleClass('show');
               $('#infos').toggleClass('hide');
               $('#inputvernewpho').val('');
               $('#inputnewpho').val('');
               $('#send').text('发送验证码');
           	window.clearInterval(InterValObj); // 停止计时器
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
// -----------------------------------------------------------------------------   
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
            $('#orderSelect div').text('@paipianwang.com');
            $('#orderSelect ul li').text('@paipianwang.cn');
        })
    }
    //验证邮箱
    function veremil() {
    	$('#inputnewemi').click(function(){
    		$('#orderSelect ul').hide();
    	})
        $('#inputnewemi').blur(function() {
            var inputnewemi = $('#inputnewemi').val().trim();
            if (inputnewemi == '' || inputnewemi == null) {
//            	$('.main .right .emil .newemil input').addClass('bordercolor');
            	$('#emils .newemil p').show();
                $('#emils .newemil p').text("*邮箱不能为空");
            } else {
//            	$('#inputnewemi').removeClass('bordercolor');
                $('#emils .newemil p').hide();
            }
        })
//        $('#orderSelect').blur(function(){
//			$('#orderSelect ul').hide();
//		})
        $('#orderSelect div').click(function(){
			$('#orderSelect ul').show();
//。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
		})
		
		$('#orderSelect ul li').click(function(){
			$('#orderSelect ul').hide();
			var change=$('#orderSelect div').text();
			$('#orderSelect div').text($('#orderSelect ul li').text());
			$('#orderSelect ul li').text(change);
		})
        $('#saveem').click(function() {
            $('#emils .newemil p').show();
            var inputnewemi = $('#inputnewemi').val().trim();
            if (inputnewemi == '' || inputnewemi == null) {
//            	$('.main .right .emil .newemil input').addClass('bordercolor');
                $('#emils .newemil p').text("*邮箱不能为空");
                return false;
            }
            loadData(function(result){   
				if(result.key){	  
//					$('#inputnewemi').removeClass('bordercolor');
					  $('#emils .newemil p').hide();
		                //弹框显示
		                $('.tooltip-check').show();
		                //弹框中的内容部分
		                $('#checkInfo').text('新邮箱设置成功！！！');
		                $('#oldemails').text($('#inputnewemi').val() + $('#orderSelect div').text());
		                
				}
            }, getContextPath() + '/mgr/modify/email', $.toJSON({
				email: $('#inputnewemi').val() + $('#orderSelect div').text()
			}));  
        })
        $('#sureCheck').click(function() {
            if ($('#checkInfo').text().trim() == '新邮箱设置成功！！！') {
                $('#nowmail').text($('#inputnewemi').val() + $('#orderSelect div').text());
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
            loadData(function(result){
            	console.log(result);
            	if(result.key){
            	     //弹框显示
            		console.log(result.key);
                    $('.tooltip-check').show();
                    //弹框中的内容部分
                    $('#checkInfo').text('登录密码设置成功！！！');
            	}
			}, getContextPath() + '/mgr/modify/pwd', $.toJSON({
				employeePassword: Encrypt($('#inputrep').val())			
			}));
        })
        $('#sureCheck').click(function() {
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
    function userpicInfo() {
    	uploader && uploader.destroy();
    	uploader = WebUploader.create({
    		auto : true,
    		swf : '/resources/lib/webuploader/Uploader.swf',
    		server : '/provider/upload/teamPhoto',
    		pick : '.upload-btn',
    		accept : {
    			title : 'Images',
    			extensions : 'jpg,png',
    			mimeTypes : 'image/jpeg,image/png'
    		},
    		resize : true,
    		chunked : false,
    		fileSingleSizeLimit : 1024 * 2048,
    		duplicate : true
    	// 允许重复上传同一个
    	});
    	uploader.on('uploadSuccess', function(file, response) {
    		var path = response._raw;
    		if (path != '' && path != null) {
    			if (path.indexOf('false@error') > -1) {
    				if (path.indexOf("error=1") > -1) {
    					$('#safeError').text("文件超过最大限制");
    				} else if (path.indexOf("error=2") > -1) {
    					$('#safeError').text("格式不正确");
    				}
    			} else {
    				$('#user_img_url').val(path);
    				var img = getDfsHostName() + path;
    				$('#user-img').attr('src', img);
    				$('#safeError').text("");
    			}
    		} else {
    		    $('#safeError').text("上传失败!");
    		}
    	});
    	uploader.on('error', function(type) {
    		if (type == "Q_TYPE_DENIED") {
    			$('#safeError').text("格式不正确");
    		} else if (type == "F_EXCEED_SIZE") {
    			$('#safeError').text("文件超过最大限制");
    			
    		}
    	});
    }