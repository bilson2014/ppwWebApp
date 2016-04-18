var yk_client_id = '1177d7f227ca86b1'; // 优酷云开放平台ID

function makePlayer(layout,hret){
	
	var vId = '';
	if(hret.indexOf('player.youku.com') > -1){
		// flash 地址
		vId = hret.split('/sid/')[1].split('/v.swf')[0];
	}else if (hret.indexOf('v.youku.com') > -1){
		// 视频地址
		vId = hret.split('http://v.youku.com/v_show/id_')[1].split('.html')[0];
	}
	player = new YKU.Player(layout,{
		styleid: '6',
		client_id: yk_client_id,
		vid: vId,
		show_related: false
	});
}

// 销毁
function destroyPlayer(layout){
	document.getElementById(layout).innerHTML='';
}