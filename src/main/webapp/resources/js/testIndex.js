 var isClose = "1"; 
 var isChange = 0;
 var sw;
 var lastPos = 0;
 
$().ready(function() {
	initScroll();
	initIndexProp();
	initProduct();
	initBanner();
	setFriens();
    setMap();
    logoEven();
    window.onresize = function() {
        initScroll();
	};
	merchantBridge();
});

function initBanner(){
	var banner = new Swiper('.swiper-banner', {
		pagination: {
		         el: '.swiper-pagination-banner',
		         clickable :true,
		       },
		paginationClickable : true,
		loop : true,
		grabCursor : true,
		 autoplay: {
		        delay: 3000,
		        disableOnInteraction: false,
		  },
		onSlideChangeEnd : function(swiper) {
			var number = swiper.activeIndex; // 每次切换时，提示现在是第几个slide
		},
	});
	
	$('#showVideo').hide();
	
	  $('.btn-left').off('click').on('click',function(){
		   window.location.href = '/cost/cal'; 
	  });
	  
	  $('.btn-right').off('click').on('click',function(){
		  createVideo();
	  });
}



function initScroll(){
	// $(window).scrollTop(0);
	  var setVideoHeight = $('body').height();
	  var setVideoWidth = $('body').width();
	  if(setVideoHeight < 400){
		  setVideoHeight = 400;
	  }
	  $('#header').removeClass('headerMove');
	  
      var product = $('#product').offset().top;
      var productH = $('.videoProduct').height();
      var ourFriends = $('.ourFriends').offset().top;
      var data = $('.data').offset().top;
	  
	  var needPos = (setVideoHeight*1.6 - setVideoWidth);
	 
	  if(setVideoWidth/setVideoHeight >= 2.5){
		  $('.setVideoContent').css('height',setVideoWidth/2.5);
		  $('#setTopVideo').css('height',setVideoWidth/2.5);
	  }else{
		  $('.setVideoContent').css('height',setVideoHeight);
		  $('#setTopVideo').css('height',setVideoHeight);
		  $('#setTopVideo').css('margin-left',needPos/4);
	  }

	  window.onscroll = function(){ 
		  
		  
		  var aniHeight = setVideoHeight/2;

		  if(setVideoWidth>=1800){
			  aniHeight = setVideoHeight/3;
		  }
	     	  
		  var nowPos = $(window).scrollTop();
		  if(nowPos >= aniHeight){
			  $('.pItem').addClass('setItem');
			  $('#header').addClass('headerMove');			 
		  }
		  if(nowPos <= 100){
			  $('.pItem').removeClass('setItem');
			  $('#header').removeClass('headerMove');
		//	  $('#product').find('div').find('.swiper-slide-active').find('.productItem').removeClass('productItemAnimo');
		  }
		/*  if(nowPos >= product - aniHeight && nowPos <= product + productH + aniHeight ){
			  $('#product').find('div').find('.swiper-slide-active').find('.productItem').addClass('productItemAnimo');
		  }
		  if(nowPos >= product+productH+aniHeight+100){
			  $('#product').find('div').find('.swiper-slide-active').find('.productItem').removeClass('productItemAnimo');
		  }*/
		  
		  if(nowPos >= ourFriends - (aniHeight + 100)){
			  $('.oneLi').addClass('setClients');
			  $('.twoLi').addClass('setClients');
			  $('.threeLi').addClass('setClients');
		  }
		  
		  if(nowPos < ourFriends - aniHeight - aniHeight/2){
			  $('.oneLi').removeClass('setClients');
			  $('.twoLi').removeClass('setClients');
			  $('.threeLi').removeClass('setClients');
		  }
		  
		  if(nowPos < data - aniHeight){
			  $('.setContentImg').removeClass('setAniData');
			  $('.setContent').removeClass('setAniContent');
		  }
		  
		  if(nowPos >= (data - aniHeight)){
			 $('.setContentImg').addClass('setAniData');
			 $('.setContent').addClass('setAniContent');
		  }
		  
		} 
}

function checkTopWay(nowPos){
	
	if(lastPos > nowPos){
		return true;
	}else{
		return false;//往下滑
	}
	
}

function initProduct(){
	
	    $('.orderPlay').off('click').on('click',function(){
	    	showOrder('宣传片');
	    });
	    
	  /*  $('.orderMore').off('click').on('click',function(){
	    	window.location.href = "/list.html";
	    });*/
	    
/*	    $('.maotai').off('click').on('click',function(){
	    	createVideo('','https://v.youku.com/v_show/id_XMzAxMTA5NjcyMA==.html?spm=a2h3j.8428770.3416059.1')
	    });
	    $('.kaola').off('click').on('click',function(){
	    	createVideo('','https://v.youku.com/v_show/id_XMzAxODk1ODQyOA==.html?spm=a2h3j.8428770.3416059.1')
	    });
	    $('.wanda').off('click').on('click',function(){
	    	createVideo('','https://v.youku.com/v_show/id_XMzAxODkwMzU4OA==.html?spm=a2h3j.8428770.3416059.1')
	    });*/
          		
	     var productVb = new Swiper('.swiperProductSet', {
	    	 pagination: {
	    	        el: '.swiperProduct',
	    	        clickable: true,
	    	        renderBullet: function (index, className) {
	    	          return '<div class="' + className + '">' + (index + 1) + '</div>';
	    	       },
	    	    },
	    	    on:{
	   	    	 slideChangeTransitionEnd: function(){
	   	    	         $('.productItem').removeClass('productItemAnimo');
	   	    	         $('#product').find('div').find('.swiper-slide-active').find('.productItem').addClass('productItemAnimo');
	   	    	    },
	   	        },
	   	     loop : true,
	 		 autoplay: {
	 		        delay: 5000,
	 		        disableOnInteraction: false,
      	 		  },
	    	 });
}


function initIndexProp(){
	 	
/*	     sw = new Swiper('#index', {
	     direction: 'vertical',
	     mousewheel:true,
	     on:{
	    	 slideChangeTransitionEnd: function(){
	    	         var num = this.activeIndex;
	    	         if(num == 1){
	    	        	 isClose = "1";
	    	        	 $('.pItem').addClass('setItem'); 
	    	         }else{
	    	        	 $('.pItem').removeClass('setItem'); 
	    	         }
	    	    },
	        },
	 });*/
   

   
}
//合作
function setFriens(){
	
 var swiperFriends = new Swiper('.swiper-friends', {
   	  loop : true,
       navigation: {
   	    nextEl: '.nextFriend',
   	    prevEl: '.prevFriend',
   	  },
  });
	
	
}



function setMap(){
	
	var dom = document.getElementById("container");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	var geoCoordMap = {
	    '上海': [121.4648,31.2891],
	    '东莞': [113.8953,22.901],
	    '东营': [118.7073,37.5513],
	    '中山': [113.4229,22.478],
	    '临汾': [111.4783,36.1615],
	    '临沂': [118.3118,35.2936],
	    '丹东': [124.541,40.4242],
	    '丽水': [119.5642,28.1854],
	    '乌鲁木齐': [87.9236,43.5883],
	    '佛山': [112.8955,23.1097],
	    '保定': [115.0488,39.0948],
	    '兰州': [103.5901,36.3043],
	    '包头': [110.3467,41.4899],
	    '北京': [116.4551,40.2539],
	    '北海': [109.314,21.6211],
	    '南京': [118.8062,31.9208],
	    '南宁': [108.479,23.1152],
	    '南昌': [116.0046,28.6633],
	    '南通': [121.1023,32.1625],
	    '厦门': [118.1689,24.6478],
	    '台州': [121.1353,28.6688],
	    '合肥': [117.29,32.0581],
	    '呼和浩特': [111.4124,40.4901],
	    '咸阳': [108.4131,34.8706],
	    '哈尔滨': [127.9688,45.368],
	    '唐山': [118.4766,39.6826],
	    '嘉兴': [120.9155,30.6354],
	    '大同': [113.7854,39.8035],
	    '大连': [122.2229,39.4409],
	    '天津': [117.4219,39.4189],
	    '太原': [112.3352,37.9413],
	    '威海': [121.9482,37.1393],
	    '宁波': [121.5967,29.6466],
	    '宝鸡': [107.1826,34.3433],
	    '宿迁': [118.5535,33.7775],
	    '常州': [119.4543,31.5582],
	    '广州': [113.5107,23.2196],
	    '廊坊': [116.521,39.0509],
	    '延安': [109.1052,36.4252],
	    '张家口': [115.1477,40.8527],
	    '徐州': [117.5208,34.3268],
	    '德州': [116.6858,37.2107],
	    '惠州': [114.6204,23.1647],
	    '成都': [103.9526,30.7617],
	    '扬州': [119.4653,32.8162],
	    '承德': [117.5757,41.4075],
	    '拉萨': [91.1865,30.1465],
	    '无锡': [120.3442,31.5527],
	    '日照': [119.2786,35.5023],
	    '昆明': [102.9199,25.4663],
	    '杭州': [119.5313,29.8773],
	    '枣庄': [117.323,34.8926],
	    '柳州': [109.3799,24.9774],
	    '株洲': [113.5327,27.0319],
	    '武汉': [114.3896,30.6628],
	    '汕头': [117.1692,23.3405],
	    '江门': [112.6318,22.1484],
	    '沈阳': [123.1238,42.1216],
	    '通辽': [120.1238,43.1216],
	    '铁岭': [124.1238,42.2],
	    '锦州': [121.5,40.8],
	    '抚顺': [123.5,42.2],
	    '沧州': [116.8286,38.2104],
	    '河源': [114.917,23.9722],
	    '泉州': [118.3228,25.1147],
	    '泰安': [117.0264,36.0516],
	    '泰州': [120.0586,32.5525],
	    '济南': [117.1582,36.8701],
	    '济宁': [116.8286,35.3375],
	    '海口': [110.3893,19.8516],
	    '淄博': [118.0371,36.6064],
	    '淮安': [118.927,33.4039],
	    '深圳': [114.5435,22.5439],
	    '清远': [112.9175,24.3292],
	    '温州': [120.498,27.8119],
	    '渭南': [109.7864,35.0299],
	    '湖州': [119.8608,30.7782],
	    '湘潭': [112.5439,27.7075],
	    '滨州': [117.8174,37.4963],
	    '潍坊': [119.0918,36.524],
	    '烟台': [120.7397,37.5128],
	    '玉溪': [101.9312,23.8898],
	    '珠海': [113.7305,22.1155],
	    '盐城': [120.2234,33.5577],
	    '盘锦': [121.9482,41.0449],
	    '石家庄': [114.4995,38.1006],
	    '福州': [119.4543,25.9222],
	    '秦皇岛': [119.2126,40.0232],
	    '绍兴': [120.564,29.7565],
	    '聊城': [115.9167,36.4032],
	    '肇庆': [112.1265,23.5822],
	    '舟山': [122.2559,30.2234],
	    '苏州': [120.6519,31.3989],
	    '莱芜': [117.6526,36.2714],
	    '菏泽': [115.6201,35.2057],
	    '营口': [122.4316,40.4297],
	    '葫芦岛': [120.1575,40.578],
	    '衡水': [115.8838,37.7161],
	    '衢州': [118.6853,28.8666],
	    '西宁': [101.4038,36.8207],
	    '西安': [109.1162,34.2004],
	    '贵阳': [106.6992,26.7682],
	    '连云港': [119.1248,34.552],
	    '邢台': [114.8071,37.2821],
	    '邯郸': [114.4775,36.535],
	    '郑州': [113.4668,34.6234],
	    '鄂尔多斯': [108.9734,39.2487],
	    '重庆': [107.7539,30.1904],
	    '金华': [120.0037,29.1028],
	    '铜川': [109.0393,35.1947],
	    '银川': [106.3586,38.1775],
	    '镇江': [119.4763,31.9702],
	    '长春': [125.8154,44.2584],
	    '长沙': [113.0823,28.2568],
	    '长治': [112.8625,36.4746],
	    '阳泉': [113.4778,38.0951],
	    '青岛': [120.4651,36.3373],
	    '韶关': [113.7964,24.7028],
	    '白城': [123.1238,45.1216],
	    '白山': [126.1238,42.2],
	    '佳木斯': [130.9688,46.368],
	    '牡丹江': [130.1,44.368],
	    '七台河': [131.1,45.368],
	    '南平': [118.4543,26.9222],
	    '赣州': [116.4543,26.9222],
	    '洛阳': [112.4668,34.6234],
	    '南阳': [112.1,33.5234],
	    '安阳': [114.1,35.5234],
	    '濮阳': [115.1,35.5234],
	    '漯河': [114.4668,33.6534],
	    '岳阳': [113.5,28.8],
	    '阳江': [112.5435,22.1],
	    '湛江': [110.5435,21.4],
	    '桂林': [110.2435,24.4],
	    '绵阳': [104.9526,31.7617],
	};

	var Bc = 100;
	var Mc = 60;
	var Sc = 40;

	var BigCity = [
	    [{name:'上海',value:Bc}, {name:'天津'}],
	    [{name:'北京',value:Bc}, {name:'天津'}],
	    [{name:'天津',value:Bc}, {name:'天津'}],
	    [{name:'杭州',value:Bc}, {name:'天津'}],
	    [{name:'深圳',value:Bc}, {name:'天津'}],
	    [{name:'广州',value:Bc}, {name:'天津'}],
	    [{name:'成都',value:Bc}, {name:'天津'}],
	];

	var BJData = [

	    [{name:'南京',value:Mc}, {name:'天津'}],
	    [{name:'济南',value:Mc}, {name:'天津'}],
	    [{name:'郑州',value:Mc}, {name:'天津'}],
	    [{name:'武汉',value:Mc}, {name:'天津'}],
	    [{name:'长沙',value:Mc}, {name:'天津'}],
	    [{name:'西安',value:Mc}, {name:'天津'}],
	    [{name:'石家庄',value:Sc}, {name:'天津'}],
	    [{name:'保定',value:Sc}, {name:'天津'}],
	    [{name:'衡水',value:Sc}, {name:'天津'}],
	    [{name:'廊坊',value:Sc}, {name:'天津'}],
	    [{name:'保定',value:Sc}, {name:'天津'}],
	    [{name:'唐山',value:Sc}, {name:'天津'}],
	    [{name:'太原',value:Sc}, {name:'天津'}],
	    [{name:'重庆',value:Sc}, {name:'天津'}],
	    [{name:'呼和浩特',value:Sc}, {name:'天津'}],
	    [{name:'通辽',value:Sc}, {name:'天津'}],
	    [{name:'沈阳',value:Sc}, {name:'天津'}],
	    [{name:'大连',value:Sc}, {name:'天津'}],
	    [{name:'营口',value:Sc}, {name:'天津'}],
	    [{name:'葫芦岛',value:Sc}, {name:'天津'}],
	    [{name:'抚顺',value:Sc}, {name:'天津'}],
	    [{name:'铁岭',value:Sc}, {name:'天津'}],
	    [{name:'锦州',value:Sc}, {name:'天津'}],
	    [{name:'白城',value:Sc}, {name:'天津'}],
	    [{name:'白山',value:Sc}, {name:'天津'}],
	    [{name:'哈尔滨',value:Sc}, {name:'天津'}],
	    [{name:'佳木斯',value:Sc}, {name:'天津'}],
	    [{name:'牡丹江',value:Sc}, {name:'天津'}],
	    [{name:'七台河',value:Sc}, {name:'天津'}],
	    [{name:'常州',value:Sc}, {name:'天津'}],
	    [{name:'苏州',value:Sc}, {name:'天津'}],
	    [{name:'南通',value:Sc}, {name:'天津'}],
	    [{name:'金华',value:Sc}, {name:'天津'}],
	    [{name:'温州',value:Sc}, {name:'天津'}],
	    [{name:'宁波',value:Sc}, {name:'天津'}],
	    [{name:'合肥',value:Sc}, {name:'天津'}],
	    [{name:'厦门',value:Sc}, {name:'天津'}],
	    [{name:'福州',value:Sc}, {name:'天津'}],
	    [{name:'南平',value:Sc}, {name:'天津'}],
	    [{name:'泉州',value:Sc}, {name:'天津'}],
	    [{name:'南昌',value:Sc}, {name:'天津'}],
	    [{name:'赣州',value:Sc}, {name:'天津'}],
	    [{name:'青岛',value:Sc}, {name:'天津'}],
	    [{name:'烟台',value:Sc}, {name:'天津'}],  
	    [{name:'威海',value:Sc}, {name:'天津'}],
	    [{name:'滨州',value:Sc}, {name:'天津'}],
	    [{name:'聊城',value:Sc}, {name:'天津'}],
	    [{name:'济宁',value:Sc}, {name:'天津'}],
	    [{name:'洛阳',value:Sc}, {name:'天津'}],
	    [{name:'南阳',value:Sc}, {name:'天津'}],
	    [{name:'安阳',value:Sc}, {name:'天津'}],
	    [{name:'濮阳',value:Sc}, {name:'天津'}],
	    [{name:'漯河',value:Sc}, {name:'天津'}],
	    [{name:'岳阳',value:Sc}, {name:'天津'}], 
	    [{name:'阳江',value:Sc}, {name:'天津'}],
	    [{name:'惠州',value:Sc}, {name:'天津'}],
	    [{name:'佛山',value:Sc}, {name:'天津'}],
	    [{name:'江门',value:Sc}, {name:'天津'}],
	    [{name:'湛江',value:Sc}, {name:'天津'}],
	    [{name:'东莞',value:Sc}, {name:'天津'}],
	    [{name:'中山',value:Sc}, {name:'天津'}],
	    [{name:'南宁',value:Sc}, {name:'天津'}],
	    [{name:'桂林',value:Sc}, {name:'天津'}],
	    [{name:'绵阳',value:Sc}, {name:'天津'}],
	    [{name:'贵阳',value:Sc}, {name:'天津'}],
	    [{name:'昆明',value:Sc}, {name:'天津'}],
	    [{name:'银川',value:Sc}, {name:'天津'}],
	    [{name:'乌鲁木齐',value:Sc}, {name:'天津'}],
	];


	var convertData = function (data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[dataItem[0].name];
	        var toCoord = geoCoordMap[dataItem[1].name];
	       	if (fromCoord && toCoord) {
	            res.push([
	            	{
	                	coord:fromCoord,
	                	value: dataItem[0].value
		            },
		            {
		            	coord: toCoord,
		            }
	            ]);
	        }
	    }
	    return res;
	};


	var color = ['green', 'green', 'green'];
	var series = [];
	var nowInt = 5;
	[[BigCity, BJData]].forEach(function (item, i) {
	     
	    series.push(
	    {      
	        type: 'lines',
	        zlevel: 2,
	        effect: {
	            show: false,
	            period: 4, //箭头指向速度，值越小速度越快
	            trailLength: 0.02,//特效尾迹长度[0,1]值越大，尾迹越长重
	            symbol:'arrow',//箭头图标
	            symbolSize: 5,//图标大小
	        },

	        lineStyle: {
	            normal: {
	                width: 0,//尾迹线条宽度
	                opacity: 0,//尾迹线条透明度
	                curveness: 0 //尾迹线条曲直度
	            }
	        },
	        data: convertData(item[1])
	    },
	    {            
	        hoverAnimation: true,
	        type: 'effectScatter',
	        coordinateSystem: 'geo',
	        zlevel: 3,
	        rippleEffect: {//涟漪特效
	        	period:0,//动画时间，值越小速度越快
	            brushType: 'stroke', //波纹绘制方式 stroke, fill
	            scale: 0//波纹圆环最大限制，值越大波纹越大
	        },
	        label: {
	            normal: {
	                show: false,
	                position: 'right',//显示位置
	                offset:[5, 0], //偏移设置
	                formatter: '{b}' //圆环显示文字
	            },
	            emphasis: {
	            	show: true
	            }
	        },
	        symbol: 'pin',
	        symbolSize: function (val) {
	            return 4 + val[2] / 3; //圆环大小
	        },
	        itemStyle: {
	            normal: {
	            	show: false,
	                color: '#f00'
	            }
	        },
	        data: item[1].map(function (dataItem) {
	            return {
	                name: dataItem[0].name,
	                value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
	            };
	        }),
	    },
	    //被攻击点
	    {

	        type: 'scatter',
	        coordinateSystem: 'geo',
	        zlevel: 2,
	        rippleEffect: {
	        	period:4,
	            brushType: 'stroke',
	            scale: 4
	        },
	        label: {
	            normal: {
	                show: true,
	                position: 'right',
//				                offset:[5, 0],
					color:'#de0807',
	                formatter: '{b}',
	                textStyle: {
	                	color:"#fb2a29"
	                }
	            },
	            emphasis: {
	            	show: true
	            }
	        },
	        symbol: 'pin',
	       /*	symbolSize:30,*/
	        symbolSize: function (val) {
	            return 4 + val[2] / 3; //圆环大小
	        },
	        itemStyle: {
	            normal: {
	            	show: true,
	                color: '#fb2a29'
	            }
	        },
	    /*    data:[{
	            name: item[0],
	            value: geoCoordMap[item[0]].concat([100]),
	        }],*/
	          data: item[0].map(function (dataItem) {
	            return {
	                name: dataItem[0].name,
	                value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
	            };
	        }),
	    }
	    );
	});

	option = {
	    backgroundColor: 'linear-gradient(270deg, #14024B 0%, #010724 100%)',
		title: {
	            text: '',//標題名
	            textStyle:{
	            	color:'#fff',
	            	fontSize:14
	            },
	            padding:[20,20,20,20]
	    },
	    tooltip : {
	    	        show: false,
					trigger : 'item',
					backgroundColor:'rgba(000, 000, 000, 0.6)',
					borderColor:'#FFFFCC',
					showDelay : 0,
					hideDelay : 0,
					enterable:true,
					transitionDuration : 0,
					extraCssText:'z-index:100',
					formatter : function(params, ticket, callback) {
					    //根据业务自己拓展要显示的内容
						var res = "";
						var name = params.name;
						var value = params.value;
						res = "<span style='color:white;'>"+name+"</span>"
						return res;
					}
		},
		visualMap: { //图例值控制
	        show: false,
	        min : 0,
	        max : 100,
	        calculable : true,
	        color: ['#fb2a29', '#fe5453','#fe5453', '#fe5453','#fe5453','#fe5453','#f96867','#f96867','#f96867','#f96867','#f96867'],
	        textStyle:{
	            color:'#fff'
	        }
	    },
		geo: {
			map: 'china',
			label: {
				emphasis: {
					show: false
				}
			},
			roam: false, //是否允许缩放
			layoutCenter: ['50%', '53%'], //地图位置
			layoutSize:"108%",
			itemStyle: {
				normal: {
					color: 'rgba(186,186,186,0.15)', //地图背景色
					borderColor: 'linear-gradient(270deg, #14024B 0%, #010724 100%)'  //省市边界线
				},
				emphasis: {
					color: 'rgba(240,242,245,0.21)'//悬浮背景
				}
			}
		},
						
	    series: series
	};

	    var counts = option.series[0].data.length; //获取所有闪动圆环数量
	    var dataIndex = 0;
	    //让圆环的提示框自动触发轮播显示
		function autoHoverTip(){
		   for(var i = 0;i<counts;i++){
			   (function (i) {
	                 ts = setTimeout(function () {
	                   	myChart.dispatchAction({
							type: 'showTip',
							seriesIndex: 1,
							dataIndex: i
						});
	                     }, 5000*i);
	                })(i);
		    }
		}
		
	    setTimeout(function() {
			 autoHoverTip();
	         tv = setInterval(autoHoverTip, counts*5600);
	  }, 500);
	;
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
	
}

function logoEven(){
	
	$('.logo1').off('click').on('click',function(){
		window.open('http://www.preangelfund.cn/');
	});
	$('.logo2').off('click').on('click',function(){
		window.open('http://www.apluscap.com/');
	});
	$('.logo3').off('click').on('click',function(){
		window.open('http://www.eaglesfund.com/');
	});
	$('.logo4').off('click').on('click',function(){
		window.open('http://www.gtja.com/');
	});
	$('.logo5').off('click').on('click',function(){
		window.open('http://www.plusx.cn/');
	});
	$('.logo6').off('click').on('click',function(){
		window.open('http://www.techuangyi.com');
	});
	$('.logo7').off('click').on('click',function(){
		window.open('http://www.cubead.com/');
	});
	$('.logo8').off('click').on('click',function(){
		window.open('http://www.bjjfsd.com/');
	});
	$('.logo9').off('click').on('click',function(){
		window.open('http://www.qiqueqiao.com/');
	});
	$('.logo10').off('click').on('click',function(){
		window.open('http://www.dadetong.com/');
	});
	$('.logo11').off('click').on('click',function(){
		window.open('http://www.ciprun.com/');
	});
	
	
}

