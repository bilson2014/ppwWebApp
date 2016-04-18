$(document).ready(function() {

	$('li.work').on('click', function() {
		$("li.work").css("color", "#666");
		$("li.work").css("font-weight", "");
		$(this).css('color', '#fe5453');
		$(this).css("font-weight", "bold");

		var json = {
			"code":0, "data": {
				"ip":"210.75.225.254", "country":"中国", "area":"华北", "region":"北京市", "city":"北京市", "county":"", "isp":"电信", "country_id":"86", "area_id":"100000", "region_id":"110000", "city_id":"110000", "county_id":"-1", "isp_id":"100017", "name":"看我超神"
			}
		}
		var name = json.data.name;
		var title = json.data.city;
		$("p#text").text(name);
		$("h2#title").text(title);
	});

	$('#first-select-work').css("color","#fe5453");
});