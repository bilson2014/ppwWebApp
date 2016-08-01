$().ready(function() {
	var ProductTree = {
		loadDatas : function() {
			var teamId = $("#teamId").val();
			getData(function(msg) {
				var timeLine = $('#timeLine');
				var $body = '';
				for (var int = 0; int < msg.length; int++) {
					var date = convert(msg[int].creationTime);
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					// 添加年节点
					if(checkYearIsExist(year)){
						$body+=drawYearView(year);
					}
					//创建叶子节点
					if(int % 2 == 0){
						// left
						$body+=drawVideoAreaBegin();
						$body+=drawLeftCard(msg[int]);
					}else{
						// right
						$body+=drawRightCard(msg[int]);
						$body+=drawMidTimeLine();
						$body+=drawVideoAreaEnd();
						
						timeLine.append($body);
						$body = '';
					}
				}
			}, getContextPath() + '/product/order/loadWithTeam/' + teamId);
			checkYearIsExist('2015');
		}
	}
	ProductTree.loadDatas();
});

// 比较之前进行数据转换
function convert(value) {
	return new Date(Date.parse(value.replace(/-/g, "/")));
}
// 创建轴节点 --》年
function drawYearView(year) {
	var $body = '<div class="videoArea"><div class="yearTimeLine"></div><div class="year" id ="'+year+'"><div><div>'
			+ year
			+ '</div></div></div> <div class="yearTimeLine"></div></div>';
	return $body;
}
// 创建叶子节点 --》 左
function drawLeftCard(product) {
	var $body = ''
			+ '<div class="leftCard">'
				+ '<div class="leftDian">'
					+ '<div class="leftJiaoImg"></div>'
					+ '<div class="day">06/20</div>'
					+ '<div class="dianImg"></div>'
				+ '</div>'
				+ '<div class="videoCrad">'
					+ '<div class="title">'+product.productName+'</div>'
					+ '<a><img src="'+product.picLDUrl+'"></a>'
					+ '<div class="videoContentInfo">'+product.pDescription+'</div>'
					+ '<div class="videoTag"><div><img src="/resources/images/provder/videoTag.png"></div><div>战争/</div><div>爱情</div></div>'
					+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html">'
						+ '<div class="videoBtn btn-red-common">了解详情</div>' 
					+ '</a>'
				+ '</div>'
			+ '</div>';
	return $body;
}

// 创建叶子节点 --》 右
function drawRightCard(product) {
	var $body = ''
		+ '<div class="rightCard">'
			+ '<div class="rightDian">'
				+ '<div class="dianJiaoImg"></div>'
				+ '<div class="day">06/20</div>'
				+ '<div class="rightJiaoImg"></div>'
			+ '</div>'
			+ '<div class="videoCrad">'
				+ '<div class="title">'+product.productName+'</div>'
				+ '<a><img src="'+product.picLDUrl+'"></a>'
				+ '<div class="videoContentInfo">'+product.pDescription+'</div>'
				+ '<div class="videoTag"><div><img src="/resources/images/provder/videoTag.png"></div><div>战争/</div><div>爱情</div></div>'
				+ '<a href ="/play/'+product.teamId+'_'+product.productId+'.html">'
					+ '<div class="videoBtn btn-red-common">了解详情</div>' 
				+ '</a>'
			+ '</div>'
		+ '</div>';
return $body;
}

function checkYearIsExist(year) {
	var yearView = $('#'+year);
	return yearView.length > 0;
}

function drawMidTimeLine(){
	return '<div class="midTimeLine"></div>';
}
function drawVideoAreaBegin(){
	return '<div class="videoArea">';
}
function drawVideoAreaEnd(){
	return '</div>';
}