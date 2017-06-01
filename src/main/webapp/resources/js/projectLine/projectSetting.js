var configCache;
var num = 1;
var checkNum = 0;
$().ready(function() {
	initConfig();
	getNext();
});
function getNext(){
	$('#confirm').on('click',function(){
		var cId = $('#CConfigId').val();
		var tId = $('#CTimeID').val();
		var subId = $('#CSubjoinID').val();
		var price = $('#setTotalPrice').text();
		if(getCheck()){
			var englishName = $('#englishName').val();
			window.location.href= '/product/'+englishName+'/order?configId='+cId +'&timeId='+tId +'&price='+price+'&subJoin='+subId;
		}
	})
}

/**
 * 主页业务处理部分
 */
var pSet = {
	init : function() {
		this.initOption();
	},
	initOption : function() {
		$('.cardContent').off('click').on('click', function() {
			$(".slides").html('');
			checkNum = 0;
			$('.cardContent').removeClass('active');
			$(this).addClass('active');
			initModel($(this).attr('data-id'));
			$('#CConfigId').val($(this).attr('data-id'));
			showCard();
			$('#setError').hide();
			calculatedValue(2);
			$('.serviceContent').slideUp();
			$('.serviceContent').slideDown(); 
		});
	}
}

function getCheck(){
	var setCard = $(".setCard div.active");
	var timeSet = $(".timeSet div.active");
	var getPack = $(setCard).find('.info').text();
	var getTime = $(timeSet).find('.time').text();
	$('#setError').text('');
	if(getPack!=null&&getPack!=''){
	}else{
		$('#setError').text('*请选择套餐');
		return false;
	}
	if(getTime!=null&&getTime!=''){
	 	return true;
	}else{
		$('#setError').text('*请选择时间');
		return false;
	}
}

function showCard(){
	 $('.timeContent').show();
	 $('.addContent').show();
	 $('.shape').removeClass('hideImg');
	 $('.closeContent').off('click').on('click',function(){
		$('.cardContent').find('.shape').addClass('hideImg');
		$('.serviceContent').slideUp();
	 });
}

function calculatedValue(num){
	var card = $(".setCard div.active");
	var add = $(".addSet div.active");
	var time = $(".timeSet div.active");
	var addSet = "";
	var addprice = 0;
	var priceArray = new Array;
	var cardSet = $(card).find('.pName').text();
	var timeSet = '+' + $(time).find('.time').text();	
	var timePrice =  $(time).find('.price').text();
	if(add.length > 0){
		for (var int = 0; int < add.length; int++) {
			var nowAdd = '+' + $(add[int]).find('.name').text();
			var nowPrice =$(add[int]).find('.price').text();
		    addSet =addSet + nowAdd;
		    priceArray.push(nowPrice);
			priceArray.push("+");
		}
	}
	
	if(num>0){
		$('#checkOrder').text('您选择了: ' + cardSet + timeSet);
		$('#setTotalPrice').text(timePrice);
	}
	else{
	//设置内容
	$('#checkOrder').text('您选择了: ' + cardSet + timeSet + addSet);
	//end
	priceArray.push(timePrice);
	if(timePrice!=''){
		$.ajax({
			url :  getContextPath()+'/product/compute',
			type : 'POST',
			data : {json:$.toJSON(priceArray)},
			success : function(data){
				$('#setTotalPrice').text(data.result);
			}
		});
	}
	}
}

function initModel(id){
	$('#ttttttttt').html(ttttttt());
	var v1 = $(".slides");
	var v2 = $(".addSet");
	var v3 = $(".timeSet");
	v1.html("");
	v2.html("");
	v3.html("");
	for (var int = 0; int < configCache.length; int++) {
		var cc = configCache[int];
		if(cc.chanpinconfigurationId == id){
			var productModule = cc.pmsProductModule;
			var dimensions = cc.pmsDimensions;
			if(productModule != null && productModule.length > 0){
				for (var int2 = 0; int2 < productModule.length; int2++) {
					var mod = productModule[int2];
					var type = mod.pinConfiguration_ProductModule.cpmModuleType;
					if(type == 0){
						v1.append(createMustMod(mod,int2));
					}else{
						v2.append(createSubjoinMod(mod));
					}
				}
			}
			if(dimensions != null && dimensions.length > 0){
				for (var int3 = 0; int3 < dimensions.length; int3++) {
					var dd = dimensions[int3];
					var html = createTime(dd,int3);
					v3.append(html);
				}
			}
			$('.timeCard').off('click').on('click', function() {
				$('.timeCard').removeClass('active');
				$(this).addClass('active');
				calculatedValue();
				$('#CTimeID').val($(this).attr('data-id'));
			});

			$('.setItem').off('click').on('click', function() {
				var clas = $(this).hasClass('active');
				if(clas){
					$(this).removeClass('active');
				}else{
					$(this).addClass('active');
				}
				calculatedValue();
				var v3 = $(".setItem");
				if(v3.length > 0){
					var dId = '';
					for (var int4 = 0; int4 < v3.length; int4++) {
						if($(v3[int4]).hasClass('active')){
							dId += $(v3[int4]).attr('data-id');
							if((int4 + 1) != v3.length){
								dId +=',';
							}
						}
					}
					if(dId.lastIndexOf(',') == dId.length -1){
						dId = dId.substring(0,dId.length -1);
					}
					$('#CSubjoinID').val(dId);
				}
			});
		}
	}
	//初始化服务
	initTab();
}

function createMustMod(obj,num){
	var hasDes="";
	if(num<2){
		hasDes="(赠送)";
	   }  
		var html = ['<li class="s_item packItem">',
					'    <img src="'+getDfsHostName() +obj.pic +'">',
					'    <div class="pTitle">'+obj.moduleName+'</div>',
					'    <div class="itemContent">',
					'          <div class="iLine"></div>',
					'          <div class="iContent">',
					 obj.description,
					'          </div>',
					'         <div class="iDes">'+hasDes+'</div>',
					'    </div>',
					'    <div class="layer" style="cursor: pointer;"></div>', 
					'</li>'].join('');
		return html;
}
function createSubjoinMod(obj){

	var html = [
				'<div class="setItem" data-id="'+obj.productModuleId+'">',
				'<div class="addCard">',
				'       <img src="'+getDfsHostName() +obj.pic +'">',
				'       <div class="name">'+obj.moduleName+'</div>',
				'       <div ><span class="price">'+obj.pinConfiguration_ProductModule.cpmModulePrice+'</span>元</div>',
				'       <div>'+obj.description+'</div>',
				'</div>',
				'<div class="howMush">',
				'     <div>数量</div>',
				'     <div>-</div>',
				'     <input value="0"></input>',
				'     <div>+</div>',
				'</div>',
				'</div> '
	            ].join('');
	return html;
}

function createTime(obj,num){
	var card = $(".setCard div.active");
	var cardPrice = $(card).find('.price').text();
	var setArray = new Array;
	setArray.push(cardPrice);
	if(obj.computeType == 0){
		setArray.push("*");
	}
	if(obj.computeType == 1){
		setArray.push("+");
	}
	if(obj.computeType == 2){
		setArray.push("-");
	}
	setArray.push(obj.rowValue);
	var realPrice = 0;
	$.ajax({
		url :  getContextPath()+'/product/compute',
		async : false,
		type : 'POST',
		data : {json:$.toJSON(setArray)},
		success : function(data){
			realPrice = data.result;
		}
	});
	
	if(num <1){
		$('#CTimeID').val(obj.dimensionId);
	    var html = [
					'<div class="timeCard active" data-id="'+obj.dimensionId+'">',
					'<div class="time">'+obj.rowName+'</div>',
					'<div ><span class="price">'+realPrice+'</span>元</div>',
					'<div class="computeType hide">'+obj.computeType+'</div>',
					'</div>',
		            ].join('');
	}else{
	    var html = [
					'<div class="timeCard" data-id="'+obj.dimensionId+'">',
					'<div class="time">'+obj.rowName+'</div>',
					'<div ><span class="price">'+realPrice+'</span>元</div>',
					'<div class="computeType hide">'+obj.computeType+'</div>',
					'</div>',
		            ].join('');
	}
	

	return html;
}

function initConfig() {
	var productId = $('#productId').val();
	var view = $('.setCard');
	loadData(function(res){
		configCache = res;
		if(res != null && res.length > 0){
			for (var int = 0; int < res.length; int++) {
				var jj = res[int];
				if(int == 0){
					var html = buildCar1(jj);
					view.append(html);
				}else if(int == 1){
					var html = buildCar2(jj);
					view.append(html);
				}else if(int == 2){
					var html = buildCar3(jj);
					view.append(html);
				}
			}
			pSet.init();
		}
		resumeConfig();
	}, getContextPath()+'/product/config/list?chanpinId='+productId, null);
}

function buildCar1(obj){
	var tags = obj.tags;
	var tag = '';
	if(tags != null){
		var tagArray = tags.split(" ");
		if(tagArray!=null && tagArray.length >0){
			for (var int = 0; int < tagArray.length; int++) {
				tag+= '<div class="noraml">'+tagArray[int]+'</div>';
			}
		}
	}
	var html1 = [
				'<div class="cardContent" data-id="'+obj.chanpinconfigurationId+'">',
				'    <div class="card">',
				'         <div class="cardTop">',
				'             <div class="pName">标准版产品</div>',
				'             <div>(基础价)</div>',
				'             <div><span  class="price">'+obj.basePrice+'</span>元</div>',
				'         </div>',
				'         <div class="cardBottom">',
				'              <img src="'+getDfsHostName() +obj.chanpinconfigurationPicLDUrl +'">',
				'              <img src="/resources/images/projectLine/projectSet/hd.png">',
				'              <div class="info">'+obj.chanpinconfigurationDescription+'</div>',
				'               <div class="tagsContent">',
				                       tag,
				'               </div>',
				'         </div>',
				'    </div>',
				'    <img class="shape" src="/resources/images/projectLine/projectSet/shape.png">',
				'</div>'
				].join('');
	return html1;
}
function buildCar2(obj){
	var tags = obj.tags;
	var tag = '';

	if(tags != null){
		var tagArray = tags.split(" ");
		if(tagArray!=null && tagArray.length >0){
			for (var int = 0; int < tagArray.length; int++) {
				tag+= '<div class="k2">'+tagArray[int]+'</div>';
			}
		}
	}
	var html1 = [
	             '<div class="cardContent" data-id="'+obj.chanpinconfigurationId+'">',
	             '    <div class="card">',
	             '         <div class="cardTop">',
	             '             <div class="pName">增强版产品</div>',
	             '             <div>(基础价)</div>',
	             '             <div><span class="price">'+obj.basePrice+'</span>元</div>',
	             '         </div>',
	             '         <div class="cardBottom">',
	             '              <img src="'+getDfsHostName() +obj.chanpinconfigurationPicLDUrl +'">',
	             '              <img src="/resources/images/projectLine/projectSet/2k.png">',
	             '              <div class="info">'+obj.chanpinconfigurationDescription+'</div>',
	             '               <div class="tagsContent">',
	             tag,
	             '               </div>',
	             '         </div>',
	             '    </div>',
	             '    <img class="shape" src="/resources/images/projectLine/projectSet/shape.png">',
	             '</div>'
	             ].join('');
	return html1;
}
function buildCar3(obj){
	var tags = obj.tags;
	var tag = '';

	if(tags != null){
		var tagArray = tags.split(" ");
		if(tagArray!=null && tagArray.length >0){
			for (var int = 0; int < tagArray.length; int++) {
				tag+= '<div class="k4">'+tagArray[int]+'</div>';
			}
		}
	}
	var html1 = [
	             '<div class="cardContent" data-id="'+obj.chanpinconfigurationId+'">',
	             '    <div class="card">',
	             '         <div class="cardTop">',
	             '             <div class="pName">尊享版产品</div>',
	             '             <div>(基础价)</div>',
	             '             <div><span class="price">'+obj.basePrice+'</span>元</div>',
	             '         </div>',
	             '         <div class="cardBottom">',
	             '              <img src="'+getDfsHostName() +obj.chanpinconfigurationPicLDUrl +'">',
	             '              <img src="/resources/images/projectLine/projectSet/4k.png">',
	             '              <div class="info">'+obj.chanpinconfigurationDescription+'</div>',
	             '               <div class="tagsContent">',
	             tag,
	             '               </div>',
	             '         </div>',
	             '    </div>',
	             '    <img class="shape" src="/resources/images/projectLine/projectSet/shape.png">',
	             '</div>'
	             ].join('');
	return html1;
}

function initTab() {
	if(checkNum > 0 ){
	$('.slides').addClass('changeLeft');
	}
	checkNum = 1;
    var product_id = 1;
    // 初始化
    handleScreenSlider();
    $(window).resize(function() {
        // window.location.reload();
        handleScreenSlider();
    });

    var initColor = $('.conTop');
    $.each(initColor, function(i, item) {
    	var index = $(this).attr('data-id') - 1;
        $(this).css('background', color[index]);
    });

}
// 不同屏幕下
function handleScreenSlider() {
    if (devicesSize() == "md") {
        initSlider(5);
    } else if (devicesSize() == "sm") {
        initSlider(4);
    } else if (devicesSize() == "xs") {
        initSlider(3);
    } else {
        initSlider(7);
    }
}
// 初始化轮播图
function initSlider(number) {
    var start_at = 0;
    var $s_item = $(".second_sort .s_item");
    var s_item_length = $s_item.length;
    var fSliders = $('.second_sort .f_slider');
    fSliders.each(function() {
        $(this).flexslider({
            slideshow: false,
            directionNav: true,
            controlNav: false,
            animation: "slide",
            animationSpeed: 1500,
            touch: true,
            itemWidth: 300,
            itemMargin: 0,
            minItems: number,
            maxItems: number,
            move: number,
            prevText: "",
            nextText: "",
            startAt: 0,
            start: function(slider) {
                $(".j_choose_style .s_item").fadeIn();
                slider.flexAnimate(start_at, true);
                $(".flex-viewport").css("overflow", "visible");
                // 当分类少于number时，左右箭头不显示
                if (s_item_length <= number) {
                    $(".flex-prev").hide();
                    $(".flex-next").hide();
                }
                // 第一页时，做箭头不显示
                if (start_at == 0) {
                    $(".flex-prev").hide();
                }
                // 默认蒙层
                handleLayer(start_at * number, $s_item, number);
            },
            before: function(slider) {
                if (slider.direction == "next") {
                    $(".flex-prev").show();
                }
                if (slider.direction == "prev") {
                    $(".flex-next").show();
                }
            },
            after: function(slider) {
                var cur_item_index;
                if (slider.direction == "next") {
                    if (slider.animatingTo == slider.pagingCount - 1) { // 最后一页
                        $(".flex-next").hide();
                        if ((slider.animatingTo + 1) * number - s_item_length >= 0) { // 5*2-9
                            cur_item_index = s_item_length - number;
                        }
                    } else {
                        cur_item_index = slider.animatingTo * number;
                    }
                }
                if (slider.direction == "prev") {
                    if (slider.animatingTo == 0) { // 第一页
                        $(".flex-prev").hide();
                    }
                    cur_item_index = slider.animatingTo * number;
                }
                if (!cur_item_index && cur_item_index != 0) {
                    var d = start_at * number;
                    if (slider.animatingTo == slider.pagingCount - 1) {
                        d = s_item_length - number;
                    }
                    handleLayer(d, $s_item, number);
                    var data_id = $s_item.eq(default_item).parent().data('id');
                   // setPackageData(default_item, data_id);
                } else {
                    handleLayer(cur_item_index, $s_item, number);
                    var data_id = $s_item.eq(cur_item_index).parent().data('id');
                  //  setPackageData(cur_item_index, data_id);
                }
            }
        });
    });
}

// 两个数组差集
function arrDifference(arr1, arr2) {
    var isNaN = Number.isNaN;
    return arr1.reduce(function(previous, i) {
        var found = arr2.findIndex(function(j) {
            return j === i || (isNaN(i) && isNaN(j));
        });
        return (found < 0 && previous.push(i), previous);
    }, []);
}
// 蒙层显示
function handleLayer(active_index, obj, n) {
    var active_item = [],
        all_item = [],
        other_item = [];
    for (var i = active_index; i < active_index + n; i++) {
        active_item.push(i);
    }
    for (var j = 0; j < obj.length; j++) {
        all_item.push(j);
    }
    other_item = arrDifference(all_item, active_item);
    console.info(all_item);
    other_item.forEach(function(i, index) {
        obj.eq(i).find(".layer").show().css({"cursor": "auto" });
    });
    active_item.forEach(function(i, index) {
        obj.eq(i).find(".layer").hide().css({"cursor": "pointer" });
    });
}
// 判断屏幕尺寸
function devicesSize() {
    var w = $(window).width();
    var flag = null;
    if (w > 0 && w <= 767) {
        flag = "xs";
    } else if (w >= 768 && w <= 991) {
        flag = "sm";
    } else if (w >= 992 && w <= 1199) {
        flag = "md";
    } else {
        flag = "lg";
    }
    return flag;
}

function resumeConfig(){
	var CconfigId = $('#CacheconfigId').val();
	if(CconfigId != null && CconfigId != undefined && CconfigId != ''){
		var cards = $('.cardContent');
		$('.cardContent').removeClass('active');
		for (var int = 0; int < cards.length; int++) {
			var car = cards[int];
			if($(car).attr('data-id') == CconfigId){
				$('#CConfigId').val(CconfigId);
				$(car).addClass('active');
				initModel($(car).attr('data-id'));
				showCard();
				$('#setError').hide();
				$('.serviceContent').slideUp();
				$('.serviceContent').slideDown(); 
				break;
			}
		}
		resumeTime();
		resumeSubjoin();
	}
}

function resumeTime(){
	var CtimeId = $('#CachetimeId').val();
	if(CtimeId != null && CtimeId != undefined && CtimeId != ''){
		var cards = $('.timeCard');
		$('.timeCard').removeClass('active');
		for (var int = 0; int < cards.length; int++) {
			var car = cards[int];
			if($(car).attr('data-id') == CtimeId){
				$('#CTimeID').val(CtimeId);
				$(car).addClass('active');
				break;
			}
		}
	}
	
	
}
function resumeSubjoin(){
	var CsubJoin = $('#CachesubJoin').val();
	var Cprice = $('#Cacheprice').val();
	
	if(CsubJoin != null && CsubJoin != undefined && CsubJoin != ''){
		var idArray = CsubJoin.split(',');
		if(idArray != null && idArray.length > 0){
			var cards = $('.setItem');
			$('.setItem').removeClass('active');
			for (var int = 0; int < cards.length; int++) {
				var car = cards[int];
				for (var int2 = 0; int2 < idArray.length; int2++) {
					if($(car).attr('data-id') == idArray[int2]){
						$(car).addClass('active');
						break;
					}
				}
			}
			$('#CSubjoinID').val(CsubJoin);
			
			calculatedValue();
		}
	}
	
}

function ttttttt(){
	return [
	        '<div class="f_slider">',
	        '    <div class="flex-viewport" style="overflow: visible; position: relative;">',
	        '        <ul class="slides">',
	        '        </ul>',
	        '    </div>',
	        '    <ul class="flex-direction-nav">',
	        '        <li>',
	        '            <a class="flex-prev" href="#" style="display: none;"><div></div></a>',
	        '        </li>',
	        '        <li>',
	        '            <a class="flex-next" href="#"><div></div></a>',
	        '        </li>',
	        '    </ul>',
	        '</div>'
	        ].join('');
}

