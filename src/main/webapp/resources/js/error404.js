
var InterValObj;
var initM = 3;
$().ready(function() {
	InterValObj = window.setInterval(showSuccess, 1000);
});
//成功后倒计时
function showSuccess(){
	if (initM < 0) {
		$('#last3').text('0');
		clearInterval(InterValObj);
		window.location.href=getContextPath()+'/';
	} else {
		$('#last3').text(initM--);
	}
}