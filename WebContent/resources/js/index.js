require.config({
	baseUrl : 'resources/',
	paths : {
		jquery : 'lib/jquery/jquery-2.0.3.min',
		waypoints : 'lib/jquery/waypoints.min',
		common : 'js/module/common',
		bdmta : 'js/module/bdmta',
		videoLayout: 'js/module/video-layout',
		toolbar : 'js/module/toolbar',
		model : 'js/model',
		'jquery.json' : 'lib/jquery.json/jquery.json-2.4.min',
		'search-suggest' : 'js/module/search-suggest',
		'jquery.flexslider' : 'lib/jquery/jquery.flexslider-min'
	},
	shim : {
		'jquery.json' : ['jquery'],
		'search-suggest' : {
			deps: [''],
			exports: 'suggest'
		},
		'jquery.flexslider' : {
			deps: ['jquery']
		},
		'model' : {
			deps: ['jquery']
		}
	}
});

require(['jquery','bdmta','waypoints','common','videoLayout','toolbar','search-suggest','jquery.json','jquery.flexslider','model'],function($,bdmta,wayPoints,c,vLayout,toolbar,suggest){

	this.config = {
		scrollDiv : '#know-bg-btn'
	}
	
	var critical = [1,2,3,4]; // 推荐值数组

	var bar = new toolbar.Toolbar();
	bar.registerClick();

	var common = new c.Common();
	
	suggest = new suggest.Suggest();
	suggest.smartSuggest();
	suggest.prototypeChange();
	
	var mta = new bdmta.Bdmta();
	mta.init();
	
	$('.flexslider').flexslider({
		directionNav: true,
		pauseOnAction: false
	});
	
	// 滚动监听 start
	$('#know-bg-btn').waypoint(function(direction){
		var $from = '<form method="get" action="/search" id="s-form">';
		$from += '<input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />';
		$from += '<a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>';
		$from += '<ul id="shelper" class="shelper-lucency"></ul>';
		$from += '</form>';
		
		if (direction == "up") { // 了解 拍片网之前
			
			$('#header-search').hide();
			$('#header-search').empty();
			$('#banner-search').empty().append($from);
			// 隐藏工具栏
			$('#toolbar-section').css({visibility: 'hidden'});
		}else {
			
			$('#header-search').show();
			$('#banner-search').empty();
			$('#header-search').empty().append($from);
			
			// 显示工具栏
			$('#toolbar-section').css({visibility: 'visible'});
		}
		suggest.smartSuggest();
		suggest.prototypeChange();
	});
	// 滚动监听 end
	
	// 数据加载 start
	common.loadData(function(data){
		
		var first_section = new Array(); // 第一区域
		var second_section = new Array(); // 第二区域
		var third_section = new Array(); // 第三区域
		var forth_section = new Array(); // 第四区域
		
		$.each(data,function(i,product){
			
			if(product.recommend == critical[0]){
				first_section.push(product);
			}
			
			if(product.recommend == critical[1]){
				second_section.push(product);
			}
			
			if(product.recommend == critical[2]){
				third_section.push(product);
			}
			
			if(product.recommend == critical[3]){
				forth_section.push(product);
			}
		});
		
		// 填充数据
		
		var videoLayout = new vLayout.VideoLayout();
		
		$('#video-content').empty();
		videoLayout.column3(first_section,'video-content');
		console.info(first_section);
		$('#video-content-2').empty();
		videoLayout.column3(second_section,'video-content-2');
		console.info(second_section);
		$('#video-content-3').empty();
		videoLayout.column3(third_section,'video-content-3');
		console.info(third_section);
		$('#video-content-4').empty();
		videoLayout.column3(forth_section,'video-content-4');
		console.info(forth_section);
	},common.getContextPath() + '/product/loadProduct',null);
	// 数据加载 end
	
});