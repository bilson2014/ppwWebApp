
$().ready(function() {
	var href = $("#submit").attr("href");
	var host = getHostName();
	var newhref=host +'/pay/income'+href;
	$("#submit").attr("href",newhref);
});
	
function getHostName(){
	return window.location.protocol + '//' + window.location.host;
}