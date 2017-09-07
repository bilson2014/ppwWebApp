var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
var uploader;
var sendCodeFlag = true;
var nowphone;
var iphone;//保存新的手机号 避免重复
$().ready(function(){
	document.domain = getUrl();	
	$(window.parent.document).find('.frame').css('height',$('.infos').height() + 300);
	starpic();
	userpicInfo();	
	//提前保存原来手机号之后便于处理比较
	var nowphone=$('#nowphone').text();
	//处理手机号(先处理 )
	startphone($('#nowphone').text());
	//给2号添加(不处理)
	$('#conceal').text(nowphone);
	//弹框的事件
	init();	
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

//头像的显示
function starpic(){
	 var url = $('#user-img').attr('data-value');
	 if(url!=null && url !='' && url.indexOf("../resources/") == -1){
		$('#user-img').attr('src',getDfsHostName()+url);
		$('#user_img_url').val(url);
	} 
}
//手机号加星星(参数是要修改的手机号)1号和2号
function startphone (phone){
	var mynum=phone.substr(3,4);
	var newnum=phone.replace(mynum,'****');
	$('#nowphone').text(newnum);
}
function endphone (phone){
	var mynum=phone.substr(3,4);
	var newnum=phone.replace(mynum,'****');
	$('#conceal').text(newnum);
}
//设置手机绑定
function phonebind() {
	//提前摘取出来
	var phones=$('#conceal').text();
	var allphone;
	//处理2号
	endphone($('#conceal').text());
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
        $("#inputnewpho").removeAttr("style");  
    })
    $('#inputnewpho').click(function(){
    	 $('#inputvernewpho').removeAttr("style");  
         $('#pho .verifynewphone p').text('');
    })
        //输入手机号焦点的改变
        $('#inputnewpho').blur(function() {
            var inputnewpho = this.value;  
            var pho = $('#inputnewpho').val();
            var rge = /^1[34578]\d{9}$/;
            if (inputnewpho.length<=0){
            	$("#inputnewpho").attr("style","border-color:#FE5453");	
   			 	$('#pho .newphone p').text("*手机号码不能为空");
                $('#pho .verifynewphone p').text('');
                return false;
            }else if (inputnewpho==phones||inputnewpho==allphone){
            	$("#inputnewpho").attr("style","border-color:#FE5453");
            	$('#pho .newphone p').text("*请输入新的手机号码");
            	return false;
            }else {
            	if(!rge.test(pho)){
            		$("#inputnewpho").attr("style","border-color:#FE5453");
            		$('#pho .newphone p').text("*请输入正确的手机码");
            		return false;
            	}else 
            		$("#inputnewpho").removeAttr("style");  
            		$('#pho .newphone p').text('');
            }
        })
        $('#inputvernewpho').click(function(){
        	 $('#inputvernewpho').removeAttr("style");  
             $('#pho .verifynewphone p').text('');
        })
        $('#inputvernewpho').blur(function() {
            var inputvernewpho = this.value;
            if (inputvernewpho.length <= 0) {
            	 $('#inputvernewpho').attr("style","border-color:#FE5453");
                $('#pho .verifynewphone p').text("*验证码不能为空");
                $("#inputnewpho").removeAttr("style");  
        		$('#pho .newphone p').text('');
                return false;
            } else {
            	$('#inputvernewpho').removeAttr("style");  
                $('#pho .verifynewphone p').text('');
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
           var rge = /^1[34578]\d{9}$/; 
           if (inputnewpho.length <= 0) {
        	   $("#inputnewpho").attr("style","border-color:#FE5453");
               $('#pho .newphone p').text("*手机号码不能为空");
               $('#pho .verifynewphone p').text('');
               return false;
           } else if (!rge.test(pho)) {
        	   $("#inputnewpho").attr("style","border-color:#FE5453");
               $('#pho .newphone p').text("*请输入正确的手机码");
               return false;
           }else if (inputnewpho==phones||inputnewpho==allphone){
        	   $("#inputnewpho").attr("style","border-color:#FE5453");
           	  $('#pho .newphone p').text("*请输入新的手机号码");
           	  return false;
           }else {
        	   $("#inputnewpho").removeAttr("style");
               $('#pho .newphone p').text('');
               //输入成功 发送验证码的方法
               verification(inputnewpho);           
           }
       }) 
       $('#savepho').click(function() {
		   var inputnewpho = $('#inputnewpho').val();
	       var pho = $('#inputnewpho').val();
	       var rge = /^1[34578]\d{9}$/; 
	       var oldCode = $("#inputvernewpho").val();
	       $("#inputnewpho").removeAttr("style");
	       $('#inputvernewpho').removeAttr("style");  
	       if (inputnewpho.length <= 0) {
	    	   $("#inputnewpho").attr("style","border-color:#FE5453");
	           $('#pho .newphone p').text("*手机号码不能为空");
	           $('#pho .verifynewphone p').text('');
	           return false;
	       } else if (!rge.test(pho)) {
	    	   $("#inputnewpho").attr("style","border-color:#FE5453");
	           $('#pho .newphone p').text("*请输入正确的手机码");
	           return false;
	       }else if (inputnewpho==phones||inputnewpho==allphone){
	    	   $("#inputnewpho").attr("style","border-color:#FE5453");
	       	$('#pho .newphone p').text("*请输入新的手机号码");
	       	 return false;
	       }else if (oldCode.length<=0){
	    	   $('#pho .newphone p').text('');
				$('#pho .verifynewphone p').show();
				$('#inputvernewpho').attr("style","border-color:#FE5453");
				$('#pho .verifynewphone p').text("*验证码不能为空");	
				return false;
			}   
	       else {
	    	   $('#inputvernewpho').removeAttr("style");
	    	   $('#pho .verifynewphone p').hide();       
	       }
				loadData(function(result){	
					if(result.key){	
						$("#inputnewpho").removeAttr("style");
						$('#inputvernewpho').removeAttr("style");
						$('#pho .verifynewphone p').text("");
						//清空点击按钮的提示
	                	$('#send').text('发送验证码');
	                	//弹框显示
	                    $('.tooltip-check').show();
	                    //弹框中的内容部
	                    $('#checkInfo').text('手机绑定成功！');
					}else{
						$('#inputvernewpho').attr("style","border-color:#FE5453");
						$('#pho .verifynewphone p').show();
						 $('#pho .verifynewphone p').text("*"+result.value);
					}
				}, getContextPath() + '/mgr/modify/phone', $.toJSON({					
					phoneNumber: $("#inputnewpho").val(),
					verification_code: oldCode						
				}));
       		})
       $('#sureCheck').click(function() {
           if ($('#checkInfo').text().trim() == '手机绑定成功！') {
        	   allphone=$("#inputnewpho").val();
        	   startphone($('#inputnewpho').val());
        	   endphone($('#inputnewpho').val());
               $('#pho').toggleClass('show');
               $('#infos').toggleClass('hide');
               $('#inputvernewpho').val('');
               $('#inputnewpho').val('');
               $('#send').text('发送验证码');
               $("#inputnewpho").removeAttr("style");
               $('#inputvernewpho').removeAttr("style");
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
    //设置邮箱绑定
    function emilbind() {
        $('#emil').click(function() {
            $('#emils').addClass('show');
            $('#infos').addClass('hide');
            $('#oldemails').text($('#nowmail').text());
        })
        $('#emilcancel').click(function() {
            $('#emils').toggleClass('show');
            $('#infos').toggleClass('hide');
            $('#emils .newemil p').hide();
            $('#inputnewemi').val('');
            $('#orderSelect div').text('paipianwang.com');
            $('#orderSelect ul li').text('paipianwang.cn');
        })
    }
    //验证邮箱
    function veremil() {
    	$('#inputnewemi').click(function(){
    		$('#orderSelect ul').hide();
    	})
    	  $('#orderSelect ul li ').mouseout(function(){
    		$('#orderSelect ul').hide();
    	})
        $('#inputnewemi').blur(function() {
            var inputnewemi = $('#inputnewemi').val().trim();
            if (inputnewemi == '' || inputnewemi == null) {
            	$("#inputnewemi").attr("style","border-color:#FE5453");
            	$('#emils .newemil p').show();
                $('#emils .newemil p').text("*邮箱不能为空");
            } else {
            	$("#inputnewemi").removeAttr("style");        	
                $('#emils .newemil p').text('');
            }
        })
        $('#orderSelect').click(function(){
			$('#orderSelect ul').show();
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
            	 $("#inputnewemi").attr("style","border-color:#FE5453");
                $('#emils .newemil p').text("*邮箱不能为空");
                return false;
            }
            loadData(function(result){   
				if(result.key){	  
					$("#inputnewemi").removeAttr("style");  
					  $('#emils .newemil p').text('');
		                //弹框显示
		                $('.tooltip-check').show();
		                //弹框中的内容部分
		                $('#checkInfo').text('新邮箱设置成功！');
		                $('#oldemails').text($('#inputnewemi').val() +'@'+ $('#orderSelect div').text());	                
				}
            }, getContextPath() + '/mgr/modify/email', $.toJSON({
				email: $('#inputnewemi').val()+'@'+ $('#orderSelect div').text()
			}));  
        })
        $('#sureCheck').click(function() {
            if ($('#checkInfo').text().trim() == '新邮箱设置成功！') {
                $('#nowmail').text($('#inputnewemi').val() +'@'+ $('#orderSelect div').text());
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
            $("#inputpas").removeAttr("style"); 
            $('#inputrep').removeAttr("style"); 
        })
        $('#pascancel').click(function() {
            $('#pas').toggleClass('show');
            $('#infos').toggleClass('hide');
            $('#inputpas').val('');
            $('#inputrep').val('');
            $('#correctagn').hide();
            $('#mistakeagn').hide();
            $('#mistakeagn').show();
            $("#inputpas").removeAttr("style");  
            $('#inputrep').removeAttr("style");  
            $('#pas .newpas p').text('');
        })
    }
    //验证密码
    function verpassword() {
    	 $('#inputpas').click(function(){
    		 $('#inputrep').removeAttr("style"); 
         	 $('#mistakeagn').hide();
    	 })
        $('#inputpas').blur(function() {
            var newpas = this.value;
            if (newpas.length <= 0) {
            	$("#inputpas").attr("style","border-color:#FE5453");
                $('#pas .newpas p').text('*新密码不能为空');
                $('#inputrep').removeAttr("style"); 
                $('#mistakeagn').hide();
                $('#correctagn').hide();
                return false;
            } else {
            	$("#inputpas").removeAttr("style");  
                $('#pas .newpas p').text('');
            }
        })
        $('#inputrep').blur(function() {
            var inputrep = this.value;
            if (inputrep.length > 0) {
            	$('#mistakeagn').hide();
                $('#correctagn').show();
            }else {    
            	$('#correctagn').hide();
                $('#mistakeagn').show();
            }
            if ($('#mistakeagn').show()){
            	$('#inputrep').attr("style","border-color:#FE5453");     
            }else {
            	$('#inputrep').removeAttr("style"); 
            	$('#mistakeagn').hide();
            }
        })
        $('#saverep').click(function() {
            if ($('#inputpas').val().trim() == '' || $('#inputpas').val().trim() == null) {
            	$("#inputpas").attr("style","border-color:#FE5453");
                $('#pas .newpas p').text('*新密码不能为空');
                $('#inputrep').removeAttr("style"); 
            	$('#mistakeagn').hide();  
            	return false;
            }else if ($('#inputpas').val() != $('#inputrep').val()) {
            	$("#inputpas").removeAttr("style"); 
                $('#mistakeagn').show();    
                return false;
            }else {
            	$("#inputpas").removeAttr("style"); 
            	 $('#mistakeagn').hide();   
            }
            loadData(function(result){
            	if(result.key){
            		$("#inputpas").removeAttr("style");
            		$('#inputrep').removeAttr("style");
            	     //弹框显示
                    $('.tooltip-check').show();
                    //弹框中的内容部分
                    $('#checkInfo').text('登录密码设置成功！');
            	}
			}, getContextPath() + '/mgr/modify/pwd', $.toJSON({
				employeePassword: Encrypt($('#inputrep').val())			
			}));
        })
        $('#sureCheck').click(function() {
            if ($('#checkInfo').text().trim() == '登录密码设置成功！') {
                $('#pas').toggleClass('show');
                $('#infos').toggleClass('hide');
                $('#inputpas').val('');
                $('#inputrep').val('');
                $('#correctagn').hide();
                $('#mistakeagn').hide();
                $("#inputpas").removeAttr("style"); 
                $('#inputrep').removeAttr("style");
            }
        })
    }
  //图片上传
    function userpicInfo() {
    	uploader && uploader.destroy();
    	uploader = WebUploader.create({
    		auto : true,
    		swf : '/resources/lib/webuploader/Uploader.swf',
    		server : '/mgr/modify/photo',
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
    		var path = response.value;
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
    
    
    
   