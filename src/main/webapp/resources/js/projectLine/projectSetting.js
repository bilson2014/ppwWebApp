var configCache;
$().ready(function() {
	initConfig();
	$('#confirm').on('click',function(){
		var cId = $('#CConfigId').val();
		var tId = $('#CTimeID').val();
		var subId = $('#CSubjoinID').val();
		var englishName = $('#englishName').val();
		window.location.href= '/product/'+englishName+'/order?configId='+cId +'&timeId='+tId +'&subJoin='+subId;
	})
});

/**
 * 主页业务处理部分
 */
var pSet = {
	init : function() {
		this.initOption();
	},
	initOption : function() {
		$('.cardContent').off('click').on('click', function() {
			$('.cardContent').removeClass('active');
			$(this).addClass('active');
			initModel($(this).attr('data-id'));
			$('#CConfigId').val($(this).attr('data-id'));
			showCard();
		});
	}
}

function showCard(){
	 $('.serviceContent').show();
	 $('.timeContent').show();
	 $('.addContent').show();
	 $('.shape').removeClass('hideImg');
	 $('.closeContent').off('click').on('click',function(){
		$('.serviceContent').hide(); 
		$('.cardContent').find('.shape').addClass('hideImg');
	 });
}

function calculatedValue(){
	var v0 = $(".setCard div.active");
	var v2 = $(".addSet div.active");
	var v3 = $(".timeSet div.active");
	var vvv = $(v0).find('.info').text();
	var vvv3 = $(v3).find('.time').text();
	var vvv2 = $(v2).find('.name').text();
	
	$('#checkOrder').text('您选择了：'+vvv + '+' + vvv3 +'+' + vvv2);
	// 价格计算
	
}



function initModel(id){
	var v1 = $(".setPack");
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
						v1.append(createMustMod(mod));
					}else{
						v2.append(createSubjoinMod(mod));
					}
				}
			}
			if(dimensions != null && dimensions.length > 0){
				for (var int3 = 0; int3 < dimensions.length; int3++) {
					var dd = dimensions[int3];
					var html = createTime(dd);
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
}


function createMustMod(obj){
		var html = ['<div class="packItem">',
					'    <img src="'+getDfsHostName() +obj.pic +'">',
					'    <div class="pTitle">'+obj.moduleName+'</div>',
					'    <div class="itemContent">',
					'          <div class="iLine"></div>',
					'          <div class="iContent">',
					obj.description,
					'          </div>',
					'         <div class="iDes">(赠送)</div>',
					'    </div>',
					'</div>'].join('');
		return html;
}
function createSubjoinMod(obj){
	var html = [
				'<div class="setItem" data-id="'+obj.productModuleId+'">',
				'<div class="addCard">',
				'       <img src="'+getDfsHostName() +obj.pic +'">',
				'       <div class="name">'+obj.moduleName+'</div>',
				'       <div class="price">'+obj.pinConfiguration_ProductModule.cpmModulePrice+'元</div>',
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

function createTime(obj){
    var html = [
				'<div class="timeCard" data-id="'+obj.dimensionId+'">',
				'<div class="time">'+obj.rowName+'</div>',
				'<div class="price">'+obj.rowValue+'元</div>',
				'</div>'
	            ].join('');
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
				'             <div>标准被产品</div>',
				'             <div>(基础价)</div>',
				'             <div>39800元</div>',
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
	             '             <div>增强版产品</div>',
	             '             <div>(基础价)</div>',
	             '             <div>39800元</div>',
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
	             '             <div>尊享版产品</div>',
	             '             <div>(基础价)</div>',
	             '             <div>39800元</div>',
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
