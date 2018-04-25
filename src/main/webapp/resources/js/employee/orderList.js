
$().ready(function() {
	initView();
	orderIndex.init();
	if($('#flag').val() == 1){
		$('#needBtn').hide();
	}
	$('#cancleOrderList').off('click').on('click',function(){
		 window.location.href=getContextPath()+'/project/running?order';
	});
	$('#setListTaoBao').hide();
	checkType();
});

function checkType(){

	$('#cus').off('click').on('click',function(){
		$('#taobao').removeClass('checkWho')
		$(this).addClass('checkWho')
		$('#setListTaoBao').hide();
		$('#setListInfo').show();
		$('#setErrorList').hide();
	});
	
	$('#taobao').off('click').on('click',function(){
		$('#cus').removeClass('checkWho')
		$(this).addClass('checkWho')
		$('#setListInfo').hide();
		$('#setListTaoBao').show();
		$('#setErrorList').hide();
	});
	
}


var orderIndex = {
		init:function(){
			orderIndex.controlModel();
		},
		controlModel:function(){
			$('.headerSave').off('click').on('click',function(){
				getNeedValue($('#requireId').val());
			});
		},
};

//需求文档
var rowType = {
		select : "select",
		datepicker : "datepicker",
		textarea :"textarea",
		multselect :"multselect",
		title :"title"
		};
var optionType = {
		checkbox:"checkbox",
		text:"text"
		};
function initView(){
	var hasReques = $('#requireId').val();
	var view = $('#setListInfo');
	$('#setListInfo').html('');
	$('#setListTaoBao').html('');
	syncLoadData(function (res){
		var obj = $.evalJSON(res.result);
		//var rows = obj.data[0].rows;
		for (var j = 0; j < obj.data.length; j++){
		     	var rows = obj.data[j].rows;
		     	if(j == 0){
		     		view = $('#setListInfo');
		     	}else{
		     		view = $('#setListTaoBao');
		     	}
				if(rows!= null && rows.length > 0){
					for (var int = 0; int < rows.length; int++) {
						var row = rows[int];
						var type = row.type;
						var html = '';
						switch (type) {
						case rowType.select:
							html = buildSelect(row,1);
							if(row.extension == 'des'){
								html = buildSelect(row,1,true);
							}else{
								html = buildSelect(row,1,false);
							}
							break;
						case rowType.multselect:
								html = buildSelect(row,2,false);							   
							break;
						case rowType.datepicker:
							html = buildDatepicker(row);
							break;
						case rowType.textarea:
							html = buildTextarea(row);
							break;
						case rowType.title:
							html = buildTitle(row);
							break;
						}
						view.append(html);
					}
					$("._datepicker").datepicker({
						language: 'zh',
						dateFormat:'yyyy-MM-dd' 
					});
					initNeedEven();
					if(hasReques !=null && hasReques!=''){
						loadData(function (getRes){
							      ReShowView(getRes);
						}, getContextPath() + '/require/info?requireId='+hasReques,null);
					}
			}
		}
	}, getContextPath() + '/require/config', null);
}

//回显需求表
function ReShowView(item){	
	var keys = item.result.requireJson;
	if(keys != undefined&& keys != "[]"){
		var jsKeys = $.evalJSON(keys);

		 if(jsKeys[0].value == 1){

			    $('#cus').addClass('checkWho')
			    $('#taobao').removeClass('checkWho')
				$('#setListInfo').show();
				$('#setListTaoBao').hide();
		 }else{
			    $('#cus').addClass('checkWho')
			    $('#taobao').removeClass('checkWho')
				$('#setListInfo').show();
				$('#setListTaoBao').hide();
		 }
		 setValueToNeedList(jsKeys);
	}else{
		 setValueToNeedList('');
	}
/*	for (var int = 0; int < jsKeys.length; int++){
		 var getKey =  jsKeys[int].key;
		 var getValue =  jsKeys[int].value;
		 var getType =  jsKeys[int].type;	 
		 setValueToNeedList(getKey,getValue,getType);
		 $('._datepicker').attr("disabled","disabled");
	}*/
}

//如果LookList=1 去除多余选项     需求表回显
function setValueToNeedList(jsKeys){
     var rows= $('.qItem');
     var LookList = $('#flag').val();
     if(LookList == 1){
    	 $('.itemDiv').off('click');
    	 $('._datepicker').attr("disabled","disabled");
     }
	 for (var int = 0; int < rows.length; int++) {
		 var getNowItem = $(rows[int]);
	     var flag = false;
		 for (var j = 0; j < jsKeys.length; j++){
			  var keys =  jsKeys[j].key;
			  var type = jsKeys[j].type;
			  values = jsKeys[j].value;
		 if($(rows[int]).attr('data-id')==keys){
			 flag = true;
			 if($(rows[int]).hasClass('isData')){
				 if(values == '' || values ==null){
					 $(rows[int]).find('.optionItem').find('input').val('未选择');
				 }else{
					 $(rows[int]).find('.optionItem').find('input').val(values);
				 }
				 if(LookList == 1){
					 $(rows[int]).find('.optionItem').find('input').attr("disabled","disabled");
				 }
				 continue ;
			 }
			 if($(rows[int]).hasClass('isTextArea')){
				 $(rows[int]).find('.optionItem').find('textarea').val(values);
				 if(LookList == 1){
					 getNowItem.find('.optionItem').find('textarea').attr("readonly","readonly");
			    	}
				 continue ;
			 }
			 if($(rows[int]).hasClass('Mult')){
				 var lastIndex = values.length - 1;
				 $(rows[int]).find('.optionItemMult').find('.itemDiv').each(function(index){
	                    var thisDiv = $(this);
	                    var thisDivs = thisDiv.text();
	                    var hasValue = false;
	                    for(var j = 0; j < values.length; j++){
						    if(thisDiv.text()==values[j]){
						    	thisDiv.addClass('activeNeed');
						    	var thisDivs = thisDiv.text();
						    	hasValue = true;
						    }
					    }
	                    if(LookList == 1 && !hasValue){
	                    	 if(type == 'input'&&thisDiv.hasClass('other')){
	                    		 thisDiv.addClass('activeNeed');
	                    	 }else{
	                    		 thisDiv.remove();
	                    	 }
					    }
					});
				 if(type == 'input'){
					 var setValue = getNowItem.find('.optionItemMult').find('.other').text();
					 getNowItem.find('.optionItemMult').find('.other').addClass('activeNeed');
					 getNowItem.find('.optionItemMult').find('.otherInfo').find('input').val(values[lastIndex]);
					 getNowItem.find('.optionItemMult').find('.otherInfo').find('.setOtherTitle').text(setValue+":");
					 getNowItem.find('.optionItemMult').find('.otherInfo').show();
					 if(LookList == 1){
						 getNowItem.find('.optionItemMult').find('.otherInfo').find('input').attr("readonly","readonly");
				     }
				  }
				 continue;
			 }
			 var nowItem = $(rows[int]).find('.optionItem').find('.itemDiv');
			 for (var intj = 0; intj < nowItem.length; intj++){
				    if($(nowItem[intj]).text()==values){
				    	$(nowItem[intj]).addClass('activeNeed');
				    }else{
				    	if(LookList == 1){
				    		 if(type == 'input'&&$(nowItem[intj]).hasClass('other')){
				    			 $(nowItem[intj]).addClass('activeNeed');
	                    	 }else{
				    		     $(nowItem[intj]).remove();
	                    	 }
				    	}
				    }
				 }
			 if(type == 'input'){
				 var setValue = getNowItem.find('.optionItem').find('.other').text();
				 getNowItem.find('.optionItem').find('.other').addClass('activeNeed');
				 getNowItem.find('.optionItem').find('.otherInfo').find('input').val(setValue+" : "+values);
				 getNowItem.find('.optionItem').find('.otherInfo').show();
				 if(LookList == 1){
					 getNowItem.find('.optionItem').find('.otherInfo').find('input').attr("readonly","readonly");
			     }
			  }
		}
	 }
		 if(LookList == 1){
				 if(!flag){
					 if($(rows[int]).hasClass('isData')){
							 $(rows[int]).find('.optionItem').find('input').attr("disabled","disabled");
					 }
					 if($(rows[int]).hasClass('isTextArea')){
							 getNowItem.find('.optionItem').find('textarea').attr("readonly","readonly");
					 }
					 if($(rows[int]).hasClass('Mult')){
						 $(rows[int]).find('.optionItemMult').find('.itemDiv').remove();		
					 }
					 var nowItem = $(rows[int]).find('.optionItem').find('.itemDiv');
					 for (var intj = 0; intj < nowItem.length; intj++){
						    		     $(nowItem[intj]).remove();
						 }
				     if(getNowItem.find('.optionItem').find('.otherInfo').find('input')){
							 getNowItem.find('.optionItem').find('.otherInfo').find('input').attr("readonly","readonly");
						}
				 }
		 }
	 }
}

function buildSelect(obj,isMult,isDes){	
	if(isMult == 1){
		var html = $('<div class="qItem" data-id="'+obj.name+'"></div>');
		html.append('<div class="qTitle">'+obj.title+'</div>');
		var items = $('<div class="optionItem"></div>');
	}
	else{
		var html = $('<div class="qItem Mult" data-id="'+obj.name+'"></div>');
		html.append('<div class="qTitle">'+obj.title+'</div>');
		var items = $('<div class="optionItemMult"></div>');
	}
	var options = obj.options;
	var addDes = "";
	if(isDes){
		addDes = "des";
	}
	if(options != null && options.length > 0){
		for (var int = 0; int < options.length; int++) {
			var option = options[int];
			var type = option.type;
			switch (type) {
			case optionType.checkbox:
				items.append('<div class="itemDiv '+addDes+' " data-des="'+option.des+'" type="checkbox" name="'+obj.name+'" value="'+option.value+'">'+option.text+'</div>');
				break;
			case optionType.text:
				items.append(option.text + '<div class="itemDiv other '+addDes+'" data-des="'+option.des+'" name = "'+obj.name+'">'+option.text+'</div>'+'<div class="otherInfo"><div class="setOtherTitle"></div><input></div>');
				break;
			}
		}
	}
	
	if(isDes){
		items.append('<div class="itemDes hide">大打算打算打算打算打算的那就是大渡口拉萨看来就</div>');
	}
	
	html.append(items);
	
	return html;
}
function buildDatepicker(obj){
	var html = $('<div class="qItem isData"  data-id="'+obj.name+'"></div>');
	html.append('<div class="qTitle">'+obj.title+'</div>');
	var setItem = $('<div class="optionItem"></div>');
	var items = $('<div><input class="_datepicker activeNeed" value="未选择" name="'+obj.name+'" /></div>');
	setItem.append(items);
	html.append(setItem);
	return html;
}
function buildTextarea(obj){
	var html = $('<div class="qItem isTextArea" data-id="'+obj.name+'"></div>');
	html.append('<div class="qTitle">'+obj.title+'</div>');
	var items = $('<div class="optionItem"><textarea class="isArea" rows="6" name="'+obj.name+'" cols="40"></textarea></div>');
	html.append(items);
	return html;
}

function buildTitle(obj){
	var html = $('<div class="qItem isTextArea" data-id="'+obj.name+'"></div>');
	html.append('<div class="qTitle">'+obj.title+'</div>');
	return html;
}

function initNeedEven(){
	$('.optionItem .itemDiv').off('click').on('click',function(){
		
		if($(this).hasClass('des')){
			$(this).parent().find('.itemDes').removeClass('hide');
			$(this).parent().find('.itemDes').html($(this).attr('data-des'));
		}
		
		if($(this).hasClass('activeNeed')){
			$(this).parent().find('.itemDiv').removeClass('activeNeed');
			if($(this).hasClass('des')){
				$(this).parent().find('.itemDes').addClass('hide');
			}
		}else{
			$(this).parent().find('.itemDiv').removeClass('activeNeed');
			$(this).addClass('activeNeed');
			$(this).parent().find('.otherInfo').hide();
		}
//		$(this).parent().parent().find('.otherInfo').hide();	
//		if($(this).hasClass('other')){
//		$(this).parent().parent().find('.otherInfo').show();
//		}
	});
	$('.optionItemMult .itemDiv').off('click').on('click',function(){
		
		
		
		if($(this).hasClass('activeNeed')){
			$(this).removeClass('activeNeed');
		}else{
			$(this).addClass('activeNeed');
		}
//		if($(this).hasClass('other')){
//			$(this).parent().parent().find('.otherInfo').show();
//		}
	});
	$('.other').off('click').on('click',function(){
		var thisDiv = $(this);
		if($(this).hasClass('activeNeed')){
			thisDiv.attr('class','itemDiv other');
			thisDiv.parent().parent().find('.otherInfo').hide();
		}else{
			if($(this).parent().hasClass('optionItem')){
				$(this).parent().find('.itemDiv').removeClass('activeNeed');
			}
			$(this).addClass('activeNeed');
			$(this).parent().parent().find('.otherInfo').show();
		}
	});
}
var setData = new Array();
function getNeedValue(requireId){
	     var rows= $('.optionItem');
	     var isCheck = true;
	     
	     if($('#taobao').hasClass('checkWho')){
			 setData.push(new optEntity('regular', 1,'0'));
		 }else{
			 setData.push(new optEntity('regular', 0,'0'));
		 }
	     
		 for (var int = 0; int < rows.length; int++) {
			 var getNowItem = $(rows[int]) ;
			 var setType = '';
			 var itemValues = '';
			 if(getNowItem.find('.activeNeed')&&!getNowItem.find('.activeNeed').hasClass('_datepicker')&&!getNowItem.find('textarea').hasClass('isArea')){
				 itemValues = getNowItem.find('.activeNeed').text().trim();
				/*  if(itemValues == ""||itemValues == null){
					  isCheck = false;
				  }*/
			 }
			 if(getNowItem.find('.activeNeed').hasClass('other')){
				 itemValues =  $(rows[int]).find('input').val().trim();
				 setType = "input";
				/*  if(itemValues == ""||itemValues == null){
					  isCheck = false;
				  }*/
			 }
			 if(getNowItem.find('.activeNeed').hasClass('_datepicker')){
				 itemValues =  $(rows[int]).find('div').find('input').val().trim();
				 /* if(itemValues == "未选择"||itemValues == null||itemValues == ''){

				  }*/
			 }
			 if(getNowItem.find('textarea').hasClass('isArea')){
					 itemValues=  $(rows[int]).find('textarea').val().trim();
			  }
			  var itemId =  $(rows[int]).parent().attr('data-id');
			  
			  if(itemValues != undefined&&itemValues != null&&itemValues != ''){
				  setData.push(new optEntity(itemId,itemValues,setType));
			  }
			  
		}
		 var rowsMult= $('.optionItemMult');
		 for (var int = 0; int < rowsMult.length; int++) {
		/*	 if(!$(rowsMult[int]).find('.itemDiv').hasClass('activeNeed')){
				 isCheck = false;
			 }*/
			 var itemId =  $(rowsMult[int]).parent().attr('data-id')	
			 var checkActive = $(rowsMult[int]).find('.activeNeed');
			 var setMultData = new Array();
			 var setType = '';
			 for (var ui = 0; ui < checkActive.length; ui++){
				 if($(checkActive[ui]).hasClass('other')){
					  var itemValues =  $(checkActive[ui]).parent().find('input').val().trim();
					  if(itemValues == ""||itemValues == null){
						  isCheck = false;
					  }else{
						  setType = "input";
					  }
				 }else{
					var itemValues =  $(checkActive[ui]).text().trim();
				 }
				 setMultData.push(itemValues);
			  }
			 if(setMultData.length > 0){
				 setData.push(new optEntity(itemId, setMultData,setType));
			 }			 
		} 
	
		 
		 var pickerNum = $('._datepicker ').length;
		 var hasArea = $('.isArea');
		 var flagArea = false;
		 for(var int = 0; int < hasArea.length; int++){
			 var areaVal = $(hasArea[int]).val();
			 if(areaVal!=''&&areaVal!=null&&areaVal!=undefined){
				 flagArea = true;
			 }
		 }
		
		 var check = setData;
		 if($('.activeNeed').length > pickerNum || flagArea ){
		 if(requireId!= null && requireId!="" && requireId != "null"){
			 $.ajax({
				  type: 'POST',
				  url: getContextPath() + ' /require/update',
				  data: {
					    "requireId":requireId,
						"requireJson":$.toJSON(setData),
						},
				  success: function (res) {
					      console.info('修改');
						  $('.orderModel').hide();
						  window.location.href=getContextPath()+'/project/running?order';
				  }
			});	
		 }else{
			 $.ajax({
				  type: 'POST',
				  url: getContextPath() + '/require/save',
				  data: {
						"requireJson": $.toJSON(setData),
						"requireFlag" : 0,
						"indentId" : $('#indentId').val()
						},
				  success: function (res) {
					  console.info('新建');
					  $('.orderModel').hide();
					  window.location.href=getContextPath()+'project/running?order';
				  }
			});				 
		 }
		}else{
			$('#setErrorList').show();
		}
}
/**
 * key / value
 */
function optEntity(key,value,type){
	this.key = key;
	this.value = value;
	this.type = type;
}

