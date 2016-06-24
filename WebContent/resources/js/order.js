<<<<<<< HEAD
$().ready(function(){
	
	order.init();
	
});

var order = {
	init : function(){
		// 装载 联系人电话
		var telephone = $('#telephone').val();
		if(telephone != null && telephone != '' && telephone != undefined){
			$('#indent_tele').val(telephone);
		}
		
		// 注册下单按钮
		$('#order-btn').click(function(){
			if(checkData()){ // 检查数据完整性
				if(checkMobile($('#indent_tele').val())){ // 检查 是否 是手机号码
					$('#label-message').hide('normal');
					// 提交表单
					var token = $('#token').val();
					$('#token').val(htmlSpecialCharsEntityEncode(decodeURIComponent(token)));
					$('#order-form').attr('action',getContextPath() + '/order/submit').submit().remove();
				}else{
					$('#label-message').show('normal');
					$('#label-message').text('请输入正确的手机格式');
					return false;
				}
			}
		});
	}
}


//检查数据完整性
function checkData(){
	// 检查数据
	var contact = $('#indentName').val().trim();
	var contactTele = $('#indent_tele').val().trim();
	var flag = true;
	
	if(contact == '' || contact == null || contact == undefined){
		$('#label-message').show('normal');
		$('#label-message').text('请输入姓名');
		flag = false;
	}
	
	if(contactTele == '' || contactTele == null || contactTele == undefined){
		$('#label-message').show('normal');
		$('#label-message').text('请输入手机号码');
		flag = false;
	}
	
	return flag;
}

// 验证 手机号
function checkMobile(str) {
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if(str.match(reg)){
		return true;
	} else{
		return false;
	}
}
=======
eval(function(a,b,c,d,e,f){if(e=function(a){return(b>a?"":e(parseInt(a/b)))+((a%=b)>35?String.fromCharCode(a+29):a.toString(36))},!"".replace(/^/,String)){for(;c--;)f[e(c)]=d[c]||e(c);d=[function(a){return f[a]}],e=function(){return"\\w+"},c=1}for(;c--;)d[c]&&(a=a.replace(new RegExp("\\b"+e(c)+"\\b","g"),d[c]));return a}('5 l(){d a=$("#G").4().m(),b=$("#j").4().m(),c=!0;f(""==a||i==a||g 0==a)&&($("#3-2").e("7"),$("#3-2").h("请输入姓名"),c=!1),(""==b||i==b||g 0==b)&&($("#3-2").e("7"),$("#3-2").h("请输入手机号码"),c=!1),c}5 n(a){d b=/^(0|A|z)?(H[0-9]|t[r]|q[w]|y[0-9]|x[u])[0-9]{8}$/;f a.s(b)?!0:!1}$().v(5(){6.p()});d 6={p:5(){d a=$("#I").4();i!=a&&""!=a&&g 0!=a&&$("#j").4(a),$("#6-B").L(5(){k(l()){k(!n($("#j").4()))f $("#3-2").e("7"),$("#3-2").h("请输入正确的手机格式"),!1;$("#3-2").D("7"),$("#6-E").F("K",C()+"/6/o").o().J()}})}};',48,48,"||message|label|val|function|order|normal||||||var|show|return|void|text|null|indent_tele|if|checkData|trim|checkMobile|submit|init|17|012356789|match|15|57|ready|678|14|18|17951|86|btn|getContextPath|hide|form|attr|indentName|13|telephone|remove|action|click".split("|"),0,{}));
>>>>>>> e6a3f47f33278698348f3aa6f00bb2f57375ae3c
