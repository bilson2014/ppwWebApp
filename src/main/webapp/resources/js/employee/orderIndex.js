var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var InterValObj;
var initM = 3;
var TimeFn = null;
var pageSize = 20;
var now_order = 0;
var nowPage = 1;
var LookList = 0;
/**
 * 新订单
 */
var  ORDER_NEW = 0;
/**
 * 处理中
 */
var  ORDER_HANDLING = 1;
/**
 * 完成
 */
var  ORDER_DONE = 2;
/**
 * 停滞
 */
var  ORDER_STOP = 3;
/**
 * 再次沟通
 */
var  ORDER_AGAIN = 4;
/**
 * 真实
 */
var  ORDER_REAL = 5;
/**
 * 虚假
 */
var  ORDER_SHAM = 6;
/**
 * 提交
 */
var  ORDER_SUBMIT = 7;
/**
 * 当前页
 */
var nowNum = 1;
var sUserCompany = '',sRealName = '',sIndent_tele = '',sIndentSource = -1,timeOld = '',timeNew = '';
$().ready(function() {
	$("input[name$='time']").datepicker({
		language: 'zh',
		dateFormat:'yyyy-MM-dd',
		onSelect:function(){
			search();
		}
     });
	$('.orderIndex').addClass('active');
	orderIndex.init();
	searchInit();
});

var orderIndex = {
		init:function(){
			orderIndex.controlSelect();
			orderIndex.controlModel();
			orderIndex.pagination($('#total').val());
			orderIndex.initOrderTitle();
		},
		initOrderTitle:function(){
			$('.showStatus div').off('click').on('click',function(){
				if(!$(this).hasClass('orderNew')){
					clearSearch();
					$('.showStatus div').removeClass('active');
					$(this).addClass('active');
					now_order = $(this).attr('data-value');
					if(now_order == 0){
						orderIndex.readMore(nowPage);
					}
					if(now_order == 1){
						orderIndex.readSub(nowPage);
					}
					if(now_order == 2){
						orderIndex.readUnAle(nowPage);
					}
				}else{
					newOrderEven(1);
				}
				
			});
		},
		readMore:function(num){
			var page = num;
			$('table').attr('class','toDoing');
			var root = $("#setTable");
			root.html("");
			root.append(orderIndex.createTableTitle());
			loadData(function (res){
				if(res != null && res != undefined){
					var rows =  res.rows;
					// 数据填充！
					orderIndex.pagination(res.total);
					for (var int = 0; int < rows.length; int++) {
						var row = rows[int];
						var html = orderIndex.createTable(row);
						root.append(html);
					};
				}
				orderIndex.controlSelect();
				orderIndex.controlModel();
			}, getContextPath() + '/order/list/page', $.toJSON({
				"page":page,
				"rows" : pageSize,
				"types" : [ORDER_NEW,ORDER_HANDLING],
				"userCompany":sUserCompany,
				"realName":sRealName,
				"indent_tele":sIndent_tele,
				"beginTime":timeOld,
				"endTime":timeNew,
				"indentSource":sIndentSource
			}));
		},
		readSub:function(num){
			var page = num;
			$('table').attr('class','toSubmit');
			var root = $("#setTable");
			root.html("");
			root.append(orderIndex.createTableSubTitle());
			loadData(function (res){
				if(res != null && res != undefined){
					var rows =  res.rows;
					orderIndex.pagination(res.total);
					// 数据填充！
					for (var int = 0; int < rows.length; int++) {
						var row = rows[int];
						var html = orderIndex.createSubTable(row);
						root.append(html);
					};
				}
				orderIndex.controlSelect();
				orderIndex.controlModel();
			}, getContextPath() + '/order/list/page', $.toJSON({
				"page":page,
				"rows" : pageSize,
				"types" : [ORDER_SUBMIT],
				"userCompany":sUserCompany,
				"realName":sRealName,
				"indent_tele":sIndent_tele,
				"beginTime":timeOld,
				"endTime":timeNew,
				"indentSource":sIndentSource
			}));
		},
		readUnAle:function(num,b){
			var page = num;
			var rows = pageSize;
			$('table').attr('class','toUnBle');
			var root = $("#setTable");
			root.html("");
			root.append(orderIndex.createTableUnableTitle());
			loadData(function (res){
				if(res != null && res != undefined){
					var rows =  res.rows;
					// 数据填充！
					orderIndex.pagination(res.total);
					for (var int = 0; int < rows.length; int++) {
						var row = rows[int];
						var html = orderIndex.createUnableTable(row);
						root.append(html);
					};
				}
				orderIndex.controlSelect();
				orderIndex.controlModel();
			}, getContextPath() + '/order/list/page', $.toJSON({
				"page":page,
				"rows" : pageSize,
				"types" : [ORDER_SHAM],
				"userCompany":sUserCompany,
				"realName":sRealName,
				"indent_tele":sIndent_tele,
				"beginTime":timeOld,
				"endTime":timeNew,
				"indentSource":sIndentSource
			}));
		},
		
		pagination:function(total){
			$(".pagination").html('');
			$(".pagination").initPage()
			$(".pagination").createPage({
				pageCount: Math.ceil(total / pageSize),
				current: nowPage,
				backFn:function(p){
					nowPage = p;
					var loadData = $('.active').attr('data-value');
					if(loadData == 0){
						orderIndex.readMore(nowPage);
					}
					if(loadData == 1){
						orderIndex.readSub(nowPage);
					}
					if(loadData == 2){
						orderIndex.readUnAle(nowPage);
					}
				}
			});
		},
		controlSelect:function(){
			$('.orderSelect').off('click').on('click',function(){
				if($(this).hasClass('selectColor')){
					$('.oSelect').slideUp();
					$(this).removeClass('selectColor');
				}
				else
				{
					$(this).find('.oSelect').slideDown();
					$(this).addClass('selectColor');
				}
				event.stopPropagation();
			});
			$('.oSelect li').off('click').on('click',function(){
				 var id = $(this).attr('data-id');
			   	 $(this).parent().parent().find('div').text($(this).text());
			   	 $(this).parent().parent().find('div').attr('data-id',id);
			   	 $(this).parent().slideUp();
			   	 $('.orderSelect').removeClass('selectColor');
			   	 if($(this).parent().hasClass('searchSelect')){
				   	 search();
			   	 }
			   	 event.stopPropagation();
			});
			$('body').off('click').on('click',function(){
				 $('.oSelect').slideUp();
				 $('.orderSelect').removeClass('selectColor');
				 event.stopPropagation();
			});
		},
		controlModel:function(){
			//修改
			infoEven();
		    //新建
			orderNewEven();
			$('.submit').off('click').on('click',checkUser);
			$('.cancle').off('click').on('click',function(){
				var id = $(this).parent().find('.id').text();
				$('#sureModel').show();
				var noReal = $('#sureModel').find('#noReal');
				$(noReal).attr('data-id',id);
			});
			$('.edit').off('click').on('click',function(){
				$('.orderModel').show();
				$('#setErrorList').hide();
				$('#indentId').attr('data-value', $(this).parent().find('.id').text());
				var hasReques = $(this).parent().find('.id').attr('data-value');
				$('#indentId').attr('data-content',hasReques);
				initView(hasReques);
				$('.needBtn').show();
				LookList = 0;
			});
			//查看需求文档
			$('.LookNeedList').off('click').on('click',function(){
				$('.orderModel').show();
				var hasReques = $(this).parent().find('.id').attr('data-value');
				$('#indentId').attr('data-content',hasReques);
				initView(hasReques);
				$('#needBtn').hide();
				LookList = 1;

				
			});
			//查看需求文档
			$('.findInfoNeedList').off('click').on('click',function(){
				var id = $(this).attr('data-id');
				initUserView(id);
				$('#modifyUserInfo').show();
			});
			//需求保存

			$('.listHeader').off('click').on('click',function(){
				$('.orderModel').hide();
			});
			$('.headerSave').off('click').on('click',function(){
				getNeedValue($('#indentId').attr('data-content'));
			});
			$('#noReal').off('click').on('click',function(){
				$('.modelPage').hide();
				var id = $(this).attr('data-id');
				loadData(function(res){
					refresh();
				}, getContextPath() + '/order/shamOrder', $.toJSON({
					id : id
				}));
			});
			$('#real').off('click').on('click',function(){
				$('.modelPage').hide();
				$('#checkSureModel').show();
				$('#setColor').removeClass('redColor');
				$('#setColor').addClass('greenColor');
				$('#setColor').text('真实');
			});			
			$('.closeBtn').off('click').on('click',function(){
				$('.modelPage').hide();
				initM = 3;
			});
			$('#cancleEdit').off('click').on('click',function(){
				$('.modelPage').hide();
			});
			$('.btn-c-g').off('click').on('click',function(){
				$('.modelPage').hide();
				$('.orderModel').hide();
			});
			$('#mptModel').off('click').on('click',function(){
				submitOrder();
			});
			$('.descBot').off('click').on('click',function(){
				$('.modelPage').hide();
				initM = 3;
				refresh();
			});
			
			$('.btnDiv btn-c-g').off('click').on('orderModel',function(){
				$('.modelPage').hide();
			});
		},
		createTableTitle:function(){
			var html = [
			         '   <tr>                   ',
		             '      <th>订单编号</th>   ',
		             '      <th>公司名称</th>   ',
		             '      <th>联系人</th>     ',
		             '      <th>联系电话</th>   ',
		             '      <th>订单来源</th>   ',
		             '      <th>下单时间</th>   ',
		             '      <th>编辑订单</th>   ',
		             '      <th>编辑</th>       ',
		             '      <th>提交</th>       ',
		             '      <th>作废</th>       ',
		             '  </tr>                   ',
			].join('');
			return html;
		},
		createTableSubTitle:function(){
			var html = [
			         '   <tr>                   ',
				      '     <th>订单编号</th>    ' ,
		              '     <th>公司名称</th>    ' ,
		              '     <th>联系人</th>      ' ,
		              '     <th>联系电话</th>    ' ,
		              '     <th>订单来源</th>    ' ,
		              '     <th>下单时间</th>    ' ,
		              '     <th>客户信息</th>    ' ,
		              '     <th>需求文档</th>    ' ,
		             '  </tr>                   ',
			].join('');
			return html;
		},
		createTableUnableTitle:function(){
			var html = [
			         '   <tr>                   ',
				     '      <th>订单编号</th>    ',
		             '      <th>公司名称</th>    ',
		             '      <th>联系人</th>      ',
		             '      <th>联系电话</th>    ',
		             '      <th>订单来源</th>    ',
		             '      <th>下单时间</th>    ',
		             '      <th>真伪</th>        ',
		             '      <th>客户信息</th>    ',
		             '  </tr>                   ',
			].join('');
			return html;
		},
		createTable:function(obj){
			var name = '--';
			var num =obj.indentSource;
			if(num == 1){
				name = '线上-网站';
			}
			if(num == 2){
				name = '线上-活动';
			}
			if(num == 3){
				name = '线上-新媒体 ';
			}
			if(num == 4){
				name = '线下-电销';
			}
			if(num == 5){
				name = '线下-直销';
			}
			if(num == 6){
				name = '线下-活动';
			}
			if(num == 7){
				name = '线下-渠道';
			}
			if(num == 8){
				name = '复购';
			}
			
			var setName ='<td class="indentSource" data-source ="'+num+'">'+name +'</td>' ;
			var html = [
			           ' <tr> ' ,
		               '    <td class="id" data-value="'+obj.requireId+'" data-indentName = "'+obj.indentName+'">'+obj.id+'</td>' ,
		               '    <td class="userCompany">'+(obj.userCompany == null ? "--":obj.userCompany) +'</td>' ,
		               '    <td class="realName">'+(obj.realName == null ? "--":obj.realName) +'</td>' ,
		               '    <td class="indent_tele">'+(obj.indent_tele == null ? "--":obj.indent_tele) +'</td>' ,
		               setName,
		               '    <td class="orderDate">'+(obj.orderDate == null ? "--":obj.orderDate) +'</td>' ,
		               '    <td class="info" data-id="'+obj.id +'"><div></div></td>' ,
		               '    <td class="edit" data-id="'+obj.id +'"><div></div></td>' ,
		               '    <td class="submit" data-requireid="'+obj.requireId+'" data-id="'+obj.id +'"><div></div></td>' ,
		               '    <td class="cancle" data-id="'+obj.id +'"><div></div></td>' ,
		               ' </tr>' ,
			].join('');
			return html;
		},
		createSubTable:function(obj){
			var html = [
			           ' <tr> ' ,
		               '    <td class="id" data-value="'+obj.requireId+'" data-indentName = "'+obj.indentName+'">'+obj.id+'</td>' ,
		               '    <td class="userCompany">'+(obj.userCompany == null ? "":obj.userCompany) +'</td>' ,
		               '    <td class="realName">'+(obj.realName == null ? "":obj.realName) +'</td>' ,
		               '    <td class="indent_tele">'+(obj.indent_tele == null ? "":obj.indent_tele) +'</td>' ,
		               '    <td class="orderDate">'+(obj.orderDate == null ? "":obj.orderDate) +'</td>' ,
		               '    <td class="orderDate">'+(obj.orderDate == null ? "":obj.orderDate) +'</td>' ,
		               '    <td class="findInfoNeedList" data-id="'+obj.userId +'"><div>查看</div></td>' ,
		               '    <td class="LookNeedList" data-id="'+obj.id +'"><div>查看</div></td>' ,
		               ' </tr>' ,
			].join('');
			return html;
		},
		createUnableTable:function(obj){
			var vv = obj.indentType == 6 ?'虚假':'真实';
			var html = [
			           ' <tr> ' ,
		               '    <td class="id"  data-value="'+obj.requireId+'" data-indentName = "'+obj.indentName+'">'+obj.id+'</td>' ,
		               '    <td class="userCompany">'+(obj.userCompany == null ? "":obj.userCompany) +'</td>' ,
		               '    <td class="realName">'+(obj.realName == null ? "":obj.realName) +'</td>' ,
		               '    <td></td>' ,
		               '    <td class="indent_tele">'+(obj.indent_tele == null ? "":obj.indent_tele) +'</td>' ,
		               '    <td class="orderDate" data-id="'+obj.id +'">'+(obj.orderDate == null ? "":obj.orderDate) +'</td>' ,
		               '    <td class="" data-id="'+obj.id +'">',
					     '  <div class="orderSelect">                                         ',
			             '         <div data-value="'+obj.indentType+'" class="true">'+vv+'</div>         ',
			             '         <img src="/resources/images/orderManager/select.png">             ',
			             '         <ul class="oSelect">                        ',
			             '               <li data-value="1">真实</li>                  ',
					     '               <li data-value="2">虚假</li>                    ',
			             '         </ul>                                                      ',
			             '    </div>                                                          ',
		               '     </td>                                                           ',
		               '    <td class="cancle" data-id="'+obj.id +'"><div>查看</div></td>' ,
		               ' </tr>' ,
			].join('');
			return html;
		}
};

//新建修改验证

function checkUpdateEven(){	    
	var hasName = $('#telName').val();
	var hasCompany = $('#companyName').val();
	var hasOrder = $('#orderComeInfo').attr('data-value');
	var hasTel = $('#teles').val();
	var hasPeople = $('#orderP').attr('data-value');
	$('.setError').attr('data-content','');
	if(hasName == undefined || hasName == "" || hasName ==null ){
		$('#telNameError').attr('data-content','请填写联系人');
		$('#telName').focus();
		return false;
	}
	if(hasCompany == undefined || hasCompany == "" || hasCompany ==null ){
		$('#companyNameError').attr('data-content','请填写公司名');
		$('#companyName').focus();
		return false;
	}
	if(hasOrder == undefined || hasOrder == "" || hasOrder ==null ){
		$('#orderComeInfoError').attr('data-content','请填写订单来源');
		return false;
		
	}
	if(!checkMobile(hasTel)){
		$('#telesError').attr('data-content','手机号不正确');
		$('#telName').focus();
		return false;
	}
	if(hasOrder == 5){
		if(hasPeople == undefined || hasPeople == "" || hasPeople ==null ){
			$('#orderPError').attr('data-content','请填写推荐人');
			return false;
		}
	}
	return true;
}

//触发修改事件
function infoEven(){
		$('.info').off('click').on('click',function(){
			var id = $(this).parent().find('.id').text();
			$('#NewOrder').show();
			loadData(function (res){
				newOrderEven(2,res);
			}, getContextPath() + '/order/info?indentId='+id, null);
		});
}
//触发新建事件
function orderNewEven(){
		$('.orderNew').off('click').on('click',function(){
			var id = $(this).parent().find('.id').text();
			$('#NewOrder').show();
		    newOrderEven(1);
		});
}
//新建 修改事件
function newOrderEven(check,item){
	$('#NewOrder').show();
	$('#showHelper').hide();
	$('#orderCome li').off('click').on('click',function(e){
		$(this).parent().parent().find('div').attr('data-value',($(this).attr('data-value')));
		$(this).parent().parent().find('div').text(($(this).text()));
	  	if($(this).hasClass('showHelper')){
	   		$('#showHelper').show();
	   	 }else{
	   		$('#showHelper').hide();
	   }
	});
	$('#cancleEdit').off('click').on('click',function(){	
		$('#NewOrder').hide();
	});	
	initUpdateInfo();
	//填充联系人
	loadData(function (res){
		var body = $('#orderComePeople');
		if(res != null && res != undefined){
			for (var int = 0; int < res.length; int++) {
					var html = [
						           '<li data-value="'+res[int].employeeId+'">'+res[int].employeeRealName+'</li>',
						].join('');
				body.append(html);
			};
		}
		bangSelect();
		if(check == 1){
			$('#orderName').text('新建订单');
			$('#submitEdit').text('确定');
		}else{
			editEvenFunction(item);
			$('#submitEdit').text('保存');
		}
		submitSaveOrCreate(check,item);
	}, getContextPath() + '/employee/getEmployeeList',null);
	
}

function bangSelect(){
	$('#orderComePeople').off('click').on('click',function(){
		$('.oSelect').slideUp();
		$(this).find('.oSelect').slideDown();
		$(this).addClass('selectColor');
		event.stopPropagation();
	});
	$('#orderComePeople li').off('click').on('click',function(){
	   	 $(this).parent().parent().find('div').text($(this).text());
	   	 $(this).parent().parent().find('div').attr('data-value',$(this).attr('data-value'));
	   	 $(this).parent().slideUp();
	   	 $('.orderSelect').removeClass('selectColor');
	   	 event.stopPropagation();
	});
}
//修改事件方法
function editEvenFunction(item){
	//初始化值
	var telName = item.result.realName;
	var companyName = item.result.userCompany;
	var teles = item.result.indent_tele;
	var orderInfo = $('#orderComeInfo').attr('data-value');
	$('#orderName').text('订单信息修改');
	$('#telName').val(telName);
	$('#companyName').val(companyName);
	$('#teles').val(teles);
	var orderC = $('#orderCome li');
	for (var int = 0; int < orderC.length; int++) {
		var num = $(orderC[int]).attr('data-value');
		var name = $(orderC[int]).text();
		if(item.result.indentSource != null){
		if(num == item.result.indentSource){
			$('#orderComeInfo').text(name);
			$('#orderComeInfo').attr('data-value',num);
			if(num == 5){
				$('#showHelper').show();
			}
		}
		}
   };
	var orderCPeople = $('#orderComePeople li');
	for (var int = 0; int < orderCPeople.length; int++) {
		var num = $(orderCPeople[int]).attr('data-value');
		var name = $(orderCPeople[int]).text();
		if(num == item.result.referrerId){
			$('#orderP').text(name);
			$('#orderP').attr('data-value',num);
		}
   };
}

function initUpdateInfo(){
	$('#telName').val('');
	$('#companyName').val('');
	$('#teles').val('');
	$('#orderComeInfo').attr('data-value','');
	$('#orderP').attr('data-value','');
}

function submitSaveOrCreate(check,item){
	//提交
	$('#submitEdit').off('click').on('click',function(){
		if(checkUpdateEven()){
			var subName =$('#telName').val();
			var subCompany =$('#companyName').val();
			var subTel =$('#teles').val();
			var subInfo = $('#orderComeInfo').attr('data-value');
			var subInfoPeople = $('#orderP').attr('data-value') == ''?null : $('#orderP').attr('data-value');
			var dataIndentName = '';
			if(item != null && item !='' && item !=undefined){
			  var subId = item.result.id;
			  var subData =item.result.orderDate;
			  dataIndentName = item.result.indentName;
			}
			if(check == 1){
				var data = {realName:subName,userCompany:subCompany,indent_tele:subTel,indentSource:subInfo,referrerId:subInfoPeople,indentName:dataIndentName,serviceId:'-1'};
			}else{
				var data = {id:subId,orderDate:subData,realName:subName,userCompany:subCompany,indent_tele:subTel,indentSource:subInfo,referrerId:subInfoPeople,indentName:dataIndentName};
			}
			$.ajax({
				  type: 'POST',
				  url: getContextPath()+'/order/updateOrSave',
				  data: data,
				  success:function(data){
					  $('#NewOrder').hide();
					  orderIndex.readMore(nowPage);
					},
				  dataType: 'json'
				});  
		}
		
	});
}


//成功后倒计时
function showSuccess(){
	if (initM < 0) {
		$('#last3').text('0');
		clearInterval(InterValObj);
		$('#successModel').hide();
		initM = 3;
		refresh();
	} else {
		$('#last3').text(initM--);
	}
}
/**
 * 初始化搜索
 */
function searchInit(){
	var sUserCompany = document.getElementById('sUserCompany');
	var sRealName = document.getElementById('sRealName');
	var sIndent_tele = document.getElementById('sIndent_tele');
	$(sUserCompany).off('click').on('keypress',function(event){ 
        if(event.keyCode == 13)      
        {  
        	search();  
        }  
    });
	$(sRealName).off('click').on('keypress',function(event){ 
		if(event.keyCode == 13)      
		{
			search();
		}  
	});
	$(sIndent_tele).off('click').on('keypress',function(event){ 
		if(event.keyCode == 13)      
		{  
			search();  
		}  
	});
}
//需求文档
var rowType = {
		select : "select",
		datepicker : "datepicker",
		textarea :"textarea",
		multselect :"multselect"
		};
var optionType = {
		checkbox:"checkbox",
		text:"text"
		};
function initView(hasReques){
	var view = $('#setListInfo');
	view.html('');
	syncLoadData(function (res){
		var obj = $.evalJSON(res.result);
		var rows = obj.rows;
		if(rows != null && rows.length > 0){
			for (var int = 0; int < rows.length; int++) {
				var row = rows[int];
				var type = row.type;
				var html = '';
				switch (type) {
				case rowType.select:
					html = buildSelect(row,1);
					break;
				case rowType.multselect:
					html = buildSelect(row,2);
					break;
				case rowType.datepicker:
					html = buildDatepicker(row);
					break;
				case rowType.textarea:
					html = buildTextarea(row);
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
	}, getContextPath() + '/require/config', null);
}

//回显需求表
function ReShowView(item){	
	var keys = item.result.requireJson;
	var jsKeys = $.evalJSON(keys);
	for (var int = 0; int < jsKeys.length; int++){
		 var getKey =  jsKeys[int].key;
		 var getValue =  jsKeys[int].value;
		 var getType =  jsKeys[int].type;
		 setValueToNeedList(getKey,getValue,getType);
	}
}

//如果LookList=1 去除多余选项     需求表回显
function setValueToNeedList(keys,values,type){
     var rows= $('.qItem');
     console.info(keys+values);
	 for (var int = 0; int < rows.length; int++) {
		 var getNowItem = $(rows[int]);
		 if($(rows[int]).attr('data-id')==keys){
			 if($(rows[int]).hasClass('isData')){
				 $(rows[int]).find('.optionItem').find('input').val(values);
				 if(LookList == 1){
					 $(rows[int]).find('.optionItem').find('input').attr("disabled","disabled");
				 }
				 break;
			 }
			 if($(rows[int]).hasClass('isTextArea')){
				 $(rows[int]).find('.optionItem').find('textarea').val(values);
				 if(LookList == 1){
					 getNowItem.find('.optionItem').find('textarea').attr("readonly","readonly");
			    	}
				 break;
			 }
			 if($(rows[int]).hasClass('Mult')){
				 var lastIndex = values.length - 1;
				 $(rows[int]).find('.optionItemMult').find('.itemDiv').each(function(index){
	                    var thisDiv = $(this);
	                    var thisDivs = thisDiv.text();
	                    var thiss = values[index];
	                    for(var j = 0; j < values.length; j++){
					    if(thisDiv.text()==values[j]){
					    	thisDiv.addClass('activeNeed');
					    }
					    else{
					    	if(LookList == 1){
					    		thisDiv.remove();
					    	}
					    }
					    }
					});
				 if(type == 'input'){
					 getNowItem.find('.optionItemMult').find('.other').addClass('activeNeed');
					 getNowItem.find('.optionItemMult').find('.otherInfo').find('input').val(values[lastIndex]);
					 getNowItem.find('.optionItemMult').find('.otherInfo').show();
					 if(LookList == 1){
						 getNowItem.find('.optionItemMult').find('.otherInfo').find('input').attr("readonly","readonly");
				     }
				  }
				 break;
			 }
			 var nowItem = $(rows[int]).find('.optionItem').find('.itemDiv');
			 for (var int = 0; int < nowItem.length; int++){
				    if($(nowItem[int]).text()==values){
				    	$(nowItem[int]).addClass('activeNeed');
				    }else{
				    	if(LookList == 1){
				    		$(nowItem[int]).remove();
				    	}
				    }
				 }
			 if(type == 'input'){
				 getNowItem.find('.optionItem').find('.other').addClass('activeNeed');
				 getNowItem.find('.optionItem').find('.otherInfo').find('input').val(values);
				 getNowItem.find('.optionItem').find('.otherInfo').show();
				 if(LookList == 1){
					 getNowItem.find('.optionItem').find('.otherInfo').find('input').attr("readonly","readonly");
			     }
			  }
		}
	 }
}

function buildSelect(obj,isMult){	
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
	if(options != null && options.length > 0){
		for (var int = 0; int < options.length; int++) {
			var option = options[int];
			var type = option.type;
			switch (type) {
			case optionType.checkbox:
				items.append('<div class="itemDiv" type="checkbox" name="'+obj.name+'" value="'+option.value+'">'+option.text+'</div>');
				break;
			case optionType.text:
				items.append(option.text + '<div class="itemDiv other" name = "'+obj.name+'">'+option.text+'</div>'+'<div class="otherInfo"><input></div>');
				break;
			}
		}
	}
	html.append(items);
	return html;
}
function buildDatepicker(obj){
	var html = $('<div class="qItem isData"  data-id="'+obj.name+'"></div>');
	html.append('<div class="qTitle">'+obj.title+'</div>');
	var setItem = $('<div class="optionItem"></div>');
	var items = $('<div><input class="_datepicker activeNeed" value="日期" name="'+obj.name+'" /></div>');
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
function initNeedEven(){
	$('.optionItem .itemDiv').off('click').on('click',function(){
		$(this).parent().find('.itemDiv').removeClass('activeNeed');
		$(this).parent().parent().find('.otherInfo').hide();
		$(this).addClass('activeNeed');
		if($(this).hasClass('other')){
		$(this).parent().parent().find('.otherInfo').show();
		}
		
	});
	$('.optionItemMult .itemDiv').off('click').on('click',function(){
		if($(this).hasClass('activeNeed')){
			$(this).removeClass('activeNeed');
		}else{
			$(this).addClass('activeNeed');
		}
		if($(this).hasClass('other')){
			$(this).parent().parent().find('.otherInfo').show();
		}
	});
}
var setData = new Array();
function getNeedValue(requireId){
	     var rows= $('.optionItem');
	     var isCheck = true;
		 for (var int = 0; int < rows.length; int++) {
			 var getNowItem = $(rows[int]) ;
			 var setType = '';
			 var itemValues = '';
			 if(getNowItem.find('.activeNeed')){
				 itemValues = getNowItem.find('.activeNeed').text();
			 }
			 if(getNowItem.find('.activeNeed').hasClass('other')){
				 itemValues =  $(rows[int]).find('input').val();
				 setType = "input";
			 }
			 if(getNowItem.find('.activeNeed').hasClass('_datepicker')){
				 itemValues =  $(rows[int]).find('div').find('input').val();
			 }
			 if(getNowItem.find('textarea').hasClass('isArea')){
				 itemValues=  $(rows[int]).find('textarea').val();
			 }
			  var itemId =  $(rows[int]).parent().attr('data-id')
			  if(itemValues == ""||itemValues == null){
				  isCheck = false;
			  }
			  setData.push(new optEntity(itemId,itemValues,setType));
			}
		 var rowsMult= $('.optionItemMult');
		 for (var int = 0; int < rowsMult.length; int++) {
			 var itemId =  $(rowsMult[int]).parent().attr('data-id')	
			 var checkActive = $(rowsMult[int]).find('.activeNeed');
			 var setMultData = new Array();
			 var setType = '';
			 for (var int = 0; int < checkActive.length; int++){
				 if($(checkActive[int]).hasClass('other')){
					var itemValues =  $(checkActive[int]).parent().find('input').val();
					setType = "input";
				 }else{
					var itemValues =  $(checkActive[int]).text();
				 }
				  if(itemValues == ""||itemValues == null){
					  isCheck = false;
				  }
				  setMultData.push(itemValues);
			     }
			 setData.push(new optEntity(itemId, setMultData,setType));
		} 
		 
		 if(isCheck){
		 if(requireId!= null && requireId!="" && requireId != '"null"'){
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
						  refresh();
				  }
			});	
		 }else{
			 $.ajax({
				  type: 'POST',
				  url: getContextPath() + '/require/save',
				  data: {
						"requireJson": $.toJSON(setData),
						"requireFlag" : 0,
						"indentId" : $('#indentId').attr('data-value')
						},
				  success: function (res) {
					  console.info('新建');
					  $('.orderModel').hide();
					  refresh();
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
function search(){
	nowPage = 1; 
	// 信息收集 ---> 发起查询   --->加载结果
	sUserCompany = $('#sUserCompany').val();
	sRealName = $('#sRealName').val();
	sIndent_tele = $('#sIndent_tele').val();
	var ss = $('#sIndentSource').attr('data-id');
	if(ss == null || ss == '' || ss == undefined)
		sIndentSource = null;
	else
		sIndentSource = parseInt(ss);
	timeOld = $('#timeOld').val();
	timeNew = $('#timeNew').val();
	
	if(now_order == 0){
		orderIndex.readMore(nowPage);
	}
	if(now_order == 1){
		orderIndex.readSub(nowPage);
	}
	if(now_order == 2){
		orderIndex.readUnAle(nowPage);
	}
	
}
function clearSearch(){
	
	sUserCompany = '';
	sRealName = '';
	sIndent_tele = '';
	sIndentSource = -1;
	timeOld = '';
	timeNew = '';
	
	$('#sUserCompany').val('');
	$('#sRealName').val('');
	$('#sIndent_tele').val('');
	$('#sIndentSource').text('');
	$('#sIndentSource').attr('data-id',-1);
	$('#timeOld').val('');
	$('#timeNew').val('');
}

function submitOrder(){
	var id = $('#mptModel').attr('data-id');
	loadData(function(msg){
		$('#smodelPage').hide();
		if(msg.code == 200){
			$('#successModel').show();
			InterValObj = window.setInterval(showSuccess, 1000);
		}else{
			alert('提交失败');
		}
	}, getContextPath()+'/order/submit', $.toJSON({
		id : id
	}));
}
function checkUser(){
	// 验证完整性
	var ok = checkOrder(this);
	var tr = $(this).parent();
	var id = $(tr).find('.id').text().trim();
	$('#mptModel').attr('data-id',id);
	if(ok){
		var indent_tele = $(tr).find('.indent_tele').text();
		// 验证用户是否重复
		loadData(function(ssr){
			if(ssr.errorCode == 200){
				submitOrder();
			}else{
				// alert('用户冲突');
				$('#smodelPage').show();
				var root = $('#smodelPage');
				var mprealName = $(root).find('#mprealName');
				var mpindent_tele = $(root).find('#mpindent_tele');
				var mpuserCompany = $(root).find('#mpuserCompany');
				var ss = ssr.result;
				$(mprealName).text(ss.realName);
				$(mpindent_tele).text(ss.telephone);
				$(mpuserCompany).text(ss.userCompany);
			}
		}, getContextPath() + '/order/checkuser?indent_tele='+indent_tele, null);
	}else{
		alert('请补全信息！');
	}
}

function checkOrder(obj){
	var tr = $(obj).parent();	
	var userCompany = $(tr).find('.userCompany').text();
	var realName = $(tr).find('.realName').text();
	var indent_tele = $(tr).find('.indent_tele').text();
	var indentSource = $(tr).find('.indentSource').attr('data-source');
	var requireId = $(tr).find('.submit').attr('data-requireid');
	if(userCompany != '' && userCompany != null){
		if(realName != '' && realName !=  null){
			if(indent_tele != '' && indent_tele != null){
				if(indentSource != null && indentSource > 0){
					if(requireId != null && requireId > 0){
						return true;
					}
				}
			}
		}
	}
	return false;
}

function refresh(){
	if(now_order == 0){
		orderIndex.readMore(nowPage);
	}
	if(now_order == 1){
		orderIndex.readSub(nowPage);
	}
	if(now_order == 2){
		orderIndex.readUnAle(nowPage);
	}
}

function updateUser(){
	
	var realName = $('#muRealName').val();
	var userCompany = $('#muUserCompany').val();
	var customerType = $('#uCustomerType').attr('data-id');
	var telephone = $('#muTelephone').val();
	var position = $('#muPosition').attr('data-id');
	var weChat = $('#muWeChat').val();
	var email = $('#muEmail').val();
	var officialSite = $('#muOfficialSite').val();
	var purchaseFrequency = $('#muPurchaseFrequency').attr('data-id');
	var purchasePrice = $('#muPurchasePrice').attr('data-id');
	var customerSize = $('#muCustomerSize').attr('data-id');
	var endorse = $('#muEndorse').attr('data-id');
	var note = $('#muNote').val();
	loadData(function(res){
		var aa = res;
		alert($.evalJSON(aa));
	}, getContextPath() +'/user/update', $.toJSON({
		"userCompany":userCompany,
		"realName":realName,
		"telephone":telephone,
		"customerType":customerType,
		"position":position,
		"weChat":weChat,
		"email":email,
		"officialSite":officialSite,
		"purchaseFrequency":purchaseFrequency,
		"purchasePrice":purchasePrice,
		"customerSize":customerSize,
		"endorse":endorse,
		"note":note
	}));
}

function initUserView(id){
	// 加载下拉框信息
	loadData(function(res){
		var rr = res.result;
		
		fillUl(rr.customerType,$('#uCustomerType'));
		fillUl(rr.position,$('#uPosition'));
		fillUl(rr.purchaseFrequency,$('#uPurchaseFrequency'));
		fillUl(rr.purchasePrice,$('#uPurchasePrice'));
		fillUl(rr.customerSize,$('#uCustomerSize'));
		fillUl(rr.endorse,$('#uEndorse'));
		orderIndex.controlSelect();
		
		// 加载用户信息
		loadData(function(res){
			var rr = res.result;
			$('#muRealName').val(rr.realName);
			$('#muUserCompany').val(rr.userCompany);
			$('#muTelephone').val(rr.telephone);
			
			$('#muWeChat').val(rr.weChat);
			$('#muEmail').val(rr.email);
			$('#muOfficialSite').val(rr.officialSite);
			
			$('#muNote').val(rr.note);
			
		}, getContextPath()+'/user/get/info?userId='+id, null);
	}, getContextPath() +'/user/option', null);
}

function fillUl(obj,view){
	for (var int = 0; int < obj.length; int++) {
		var oo = obj[int];
		var li = createLi(oo.id, oo.text);
		$(view).append(li);
	}
}

function createLi(value,text){
	var html = '<li data-id="'+ value +'">'+text+'</li>';
	return html;
}

