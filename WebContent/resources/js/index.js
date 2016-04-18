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
		// 填充数据
		$('#video-content').empty();
		var videoLayout = new vLayout.VideoLayout();
		videoLayout.column3(data,'video-content');
	},common.getContextPath() + '/product/loadProduct',null);
	// 数据加载 end
	
});