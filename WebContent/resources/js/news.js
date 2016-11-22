
$().ready(function() {
	initContent();
});

function initContent() {
	var html = $('#newsValue').text().trim();
	if (html != '') {
		$.base64.utf8encode = true;
		var decodeContent = $.trim($.base64.atob(html, true));
		var re2 = 'src="@.@([^"]*)"';
		var p = new RegExp(re2, [ "gm" ]);
		decodeContent = decodeContent.replace(p, "src='" + getDfsHostName()
				+ "$1" + "'");
		$('#newsValue').html(decodeContent);
	} else {
		$('#newsValue').text('');
	}
}