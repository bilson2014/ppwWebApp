$().ready(function() {
	loadVideoList();
	// loadVideo();
	

});



// 下载数据
// 获得数据价格种类
// 数据价格种类分组
// 数据价格种类排序
// 数据分组
// 数据分组填充
// 生成div

function loadVideoList() {

	loadData(function(list) {
		var priceList = new Array();
		if (list != null && list.length > 0) {
			// 筛选
			$.each(list, function(i, product) {
				var price = Math.round(product.serviceRealPrice);
				if (priceList.length == 0) {
					priceList.push(price);
				} else {
					//检测到有重复的，退出循环，添加到价格集合中
					var hastrue = false;
					for (var j = 0; j < priceList.length; j++) {
						if (price == priceList[j]) {
							hastrue = true;
							break;
						} else {
							hastrue = false;
						}
					}
					if (!hastrue)
						priceList.push(price);
				}
			});
			// 排序
			priceList.sort(compare);
			//分组
			var allList=new Array();//map 结构
			$.each(priceList, function(i, item) {
				allList[item]=new Array(); 
			});
			
			$.each(list, function(i, product) {
				var currArray=allList[product.serviceRealPrice];
				currArray.push(product);
			});
			//数据分组填充
			var index=0;
			for(var item in allList){  
				var html = composing(allList[item]);
				fill(html,item,index);
				index++;
		    } 
			
		}
	}, getContextPath() + '/phone/salesman/load/product', null);

}
function compare(str1, str2) {
	if (str1 < str2) {
		return -1;
	} else if (str1 > str2) {
		return 1;
	} else {
		return 0;
	}
}
// function loadVideo(){
//
// loadData(function(list){
// var first_section = new Array(); // 第一区域
// var second_section = new Array(); // 第二区域
// var third_section = new Array(); // 第三区域
//
// if (list != null && list.length > 0){
// $.each(list,function(i,product){
// var price = Math.round(product.serviceRealPrice);
// if(price == 123){
// first_section.push(product);
// } else if(price == 28800 ){
// second_section.push(product);
// } else if (price ==59800){
// third_section.push(product);
// }
// });
//
// // 装配第一块视频
// $('#first-video-section').empty();
// $('#first-video-section').append(composing(first_section));
// $('#firstPrice').text('123');
//				
// /*
// * // 装配第二块视频 $('#second-video-section').empty();
// * $('#second-video-section').append(composing(second_section));
// * // 装配第三块视频 $('#third-video-section').empty();
// * $('#third-video-section').append(composing(third_section));
// */
//
// }
// },getContextPath() + '/phone/salesman/load/product', null);
//
//
// }
//
//
//
//
//
 function composing(list) {
	$body = '';
	if (list != null && list.length > 0) {
		var listSize = list.length;
		for (var i = 0; i < listSize; i++) {

			var product = list[i];
			var imgName = getFileName(product.picLDUrl);
			//var imgPath = getHostName() + '/product/img/' + imgName;
			var imgPath =  'http://192.168.1.119:8080/product/img/' + imgName;
			var realPrice = thousandCount(product.serviceRealPrice);
			$body += '<div class="video-area" >';
			$body += '<div class="video-img" data-url="'+product.productName+'" id="playVideo">';
			$body += '<img src="' + imgPath + '" alt="' + product.productName
					+ '_拍片网" />';
			$body += '</div>';
			$body += '<div class="video-content" >' 
		
			$body += '<div class="video-title" >' + product.productName
					+ '</div>';
			$.base64.utf8encode = true;
			var html=$.trim($.base64.atob($.trim(product.videoDescription),true));
			$body += '<div class="video-title-content">' + html+ '</div>';
			$body += '</div>'
			$body += '<button class="btn-red-common video-btn">立即下单</button>';
			$body += '</div>';
		}
	}
	return $body;
}
 function goToOrder(){
	 $(".video-btn").off('click');
	 $(".video-btn").on('click',function(){
		 alert('跳转了');
		// window.location.href="resource"; 
	 });
}

function playVideo(){
	$('.video-img').off('click');
	$('.video-img').on('click',function(){
		$('#toolbar-modal').fadeToggle();
		alert($(this).parent());
	});
}

 function fill(html,price,index){
	var element;
	switch (index) {
		case 0: //价格最低
			element= $('#first-video-section');
			$('#firstPrice').text(price);
			break;
		case 1://价格中等
			element= $('#second-video-section');
			$('#secondPrice').text(price);
			break;
		case 2://价格最高
			element=$('#third-video-section');
			$('#thirdPrice').text(price);
			break;
	}
	if(element!=null){
		element.empty();
		element.append(html);
		goToOrder();
		playVideo();
	}
 }
//
//
//
//
