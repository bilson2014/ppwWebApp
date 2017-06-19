var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var InterValObj;
var initM = 3;
var TimeFn = null;
var pageSize = 20;
var now_order = 0;
var nowPage = 1;
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
			$('.showStatus div').on('click',function(){
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
				}else{
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
			   	 search();
			   	 event.stopPropagation();
			});
			$('body').on('click',function(){
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
			$('.submit').on('click',function(){
				$('#successModel').show();
				InterValObj = window.setInterval(showSuccess, 1000);
			});
			$('.cancle').on('click',function(){
				$('#sureModel').show();
			});
			$('.edit').on('click',function(){
				$('.orderModel').show();
			});
			$('#noReal').on('click',function(){
				$('.modelPage').hide();
				$('#checkSureModel').show();
				$('#setColor').removeClass('greenColor');
				$('#setColor').addClass('redColor');
				$('#setColor').text('虚假');
			});
			$('#real').on('click',function(){
				$('.modelPage').hide();
				$('#checkSureModel').show();
				$('#setColor').removeClass('redColor');
				$('#setColor').addClass('greenColor');
				$('#setColor').text('真实');
			});			
			$('.closeBtn').on('click',function(){
				$('.modelPage').hide();
				initM = 3;
			});
			$('.descBot').on('click',function(){
				$('.modelPage').hide();
				initM = 3;
			});
			
			$('.btnDiv btn-c-g').on('orderModel',function(){
				$('.modelPage').hide();
			});
			
			
			
		//双击
		/*	$('tr').dblclick(function () {
			     // 取消上次延时未执行的方法
			    clearTimeout(TimeFn);
			    $(this).css('background','red');
			    //双击事件的执行代码
			})*/
//			$('.findInfo').on('click',function(){
//			//	$('#userInfo').show();
//			});
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
		             '      <th>客户信息</th>   ',
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
			
			var setName ='<td>'+name +'</td>' ;
			var html = [
			           ' <tr> ' ,
		               '    <td class="id" data-indentName = "'+obj.indentName+'">'+obj.id+'</td>' ,
		               '    <td class="userCompany">'+(obj.userCompany == null ? "--":obj.userCompany) +'</td>' ,
		               '    <td class="realName">'+(obj.realName == null ? "--":obj.realName) +'</td>' ,
		               '    <td class="indent_tele">'+(obj.indent_tele == null ? "--":obj.indent_tele) +'</td>' ,
		               setName,
		               '    <td class="orderDate">'+(obj.orderDate == null ? "--":obj.orderDate) +'</td>' ,
		               '    <td class="info" data-id="'+obj.id +'"><div></div></td>' ,
		               '    <td class="edit" data-id="'+obj.id +'"><div></div></td>' ,
		               '    <td class="submit" data-id="'+obj.id +'"><div></div></td>' ,
		               '    <td class="cancle" data-id="'+obj.id +'"><div></div></td>' ,
		               ' </tr>' ,
			].join('');
			return html;
		},
		createSubTable:function(obj){
			var html = [
			           ' <tr> ' ,
		               '    <td class="id" data-indentName = "'+obj.indentName+'">'+obj.id+'</td>' ,
		               '    <td class="userCompany">'+(obj.userCompany == null ? "":obj.userCompany) +'</td>' ,
		               '    <td class="realName">'+(obj.realName == null ? "":obj.realName) +'</td>' ,
		               '    <td class="indent_tele">'+(obj.indent_tele == null ? "":obj.indent_tele) +'</td>' ,
		               '    <td class="orderDate">'+(obj.orderDate == null ? "":obj.orderDate) +'</td>' ,
		               '    <td class="orderDate">'+(obj.orderDate == null ? "":obj.orderDate) +'</td>' ,
		               '    <td class="findInfo" data-id="'+obj.id +'"><div>查看</div></td>' ,
		               '    <td class="cancle" data-id="'+obj.id +'"><div>查看</div></td>' ,
		               ' </tr>' ,
			].join('');
			return html;
		},
		createUnableTable:function(obj){
			var html = [
			           ' <tr> ' ,
		               '    <td class="id" data-indentName = "'+obj.indentName+'">'+obj.id+'</td>' ,
		               '    <td class="userCompany">'+(obj.userCompany == null ? "":obj.userCompany) +'</td>' ,
		               '    <td class="realName">'+(obj.realName == null ? "":obj.realName) +'</td>' ,
		               '    <td></td>' ,
		               '    <td class="indent_tele">'+(obj.indent_tele == null ? "":obj.indent_tele) +'</td>' ,
		               '    <td class="orderDate" data-id="'+obj.id +'">'+(obj.orderDate == null ? "":obj.orderDate) +'</td>' ,
		               '    <td class="findInfo" data-id="'+obj.id +'"><div class="true">真实</div></td>' ,
		               '    <td class="cancle" data-id="'+obj.id +'"><div>查看</div></td>' ,
		               ' </tr>' ,
			].join('');
			return html;
		}
};

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
	$('#orderCome li').on('click',function(e){
		$(this).parent().parent().find('div').attr('data-value',($(this).attr('data-value')));
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
				    if(int == 0){
				    	$('#orderP').text(res[int].employeeRealName);
				    	$('#orderP').attr('data-value',res[int].employeeId);
				    }
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
		if(num == item.result.indentSource){
			$('#orderComeInfo').text(name);
			$('#orderComeInfo').attr('data-value',num);
			if(num == 5){
				$('#showHelper').show();
			}
		}
   };
	var orderCPeople = $('#orderComePeople li');
	for (var int = 0; int < orderCPeople.length; int++) {
		var num = $(orderCPeople[int]).attr('data-value');
		var name = $(orderCPeople[int]).text();
		var nn =  item.result.referrerId;
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
	});
}


//成功后倒计时
function showSuccess(){
	if (initM < 0) {
		$('#last3').text('0');
		clearInterval(successIntervalObj);
		$('#successModel').hide();
		initM = 3;
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
	$(sUserCompany).on('keypress',function(event){ 
        if(event.keyCode == 13)      
        {  
        	search();  
        }  
    });
	$(sRealName).on('keypress',function(event){ 
		if(event.keyCode == 13)      
		{
			search();
		}  
	});
	$(sIndent_tele).on('keypress',function(event){ 
		if(event.keyCode == 13)      
		{  
			search();  
		}  
	});
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
