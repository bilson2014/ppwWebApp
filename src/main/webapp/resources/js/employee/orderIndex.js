var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var InterValObj;
var initM = 3;
var TimeFn = null;
var pageSize = 20;
var now_order = 0;
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

$().ready(function() {
	$("input[name$='time']").datepicker({
		language: 'zh',
		dateFormat:'yyyy-MM-dd',
		minDate: new Date() 
     });
	$('.orderIndex').addClass('active');
	orderIndex.init();
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
					$('.showStatus div').removeClass('active');
					$(this).addClass('active');
					now_order = $(this).attr('data-value');
					if(now_order == 0){
						orderIndex.readMore(1);
					}
					if(now_order == 1){
						orderIndex.readSub(1);
					}
					if(now_order == 2){
						orderIndex.readUnAle(1);
					}
				}else{
					newOrderEven(1);
				}
				
			});
		},
		readMore:function(num){
			var page = num;
			var rows = pageSize;
			$('table').attr('class','toDoing');
			var root = $("#setTable");
			root.html("");
			root.append(orderIndex.createTableTitle());
			loadData(function (res){
				if(res != null && res != undefined){
					var rows =  res.rows;
					// 数据填充！

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
				"rows" : rows,
				"types" : [ORDER_NEW,ORDER_HANDLING]
			}));
		},
		readSub:function(num){
			var page = num;
			var rows = pageSize;
			$('table').attr('class','toSubmit');
			var root = $("#setTable");
			root.html("");
			root.append(orderIndex.createTableSubTitle());
			loadData(function (res){
				if(res != null && res != undefined){
					var rows =  res.rows;
					orderIndex.pagination(rows.total);
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
				"rows" : rows,
				"types" : [ORDER_SUBMIT]
			}));
		},
		readUnAle:function(num){
			var page = num;
			var rows = pageSize;
			var root = $("#setTable");
			root.html("");
			root.append(orderIndex.createTableUnableTitle());
			loadData(function (res){
				if(res != null && res != undefined){
					var rows =  res.rows;
					// 数据填充！

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
				"rows" : rows,
				"types" : [ORDER_SHAM]
			}));
		},
		
		pagination:function(total){
			$(".pagination").createPage({
				pageCount: Math.ceil(total / pageSize),
				current: 1,
				backFn:function(p){
					orderIndex.readMore(p,ORDER_HANDLING);
					// 点击 翻页，查询符合条件的视频
//					loadProduction((p - 1) * pageSize);
//					currentSize = (p - 1) * pageSize;
				}
			});
		},
		controlSelect:function(){
			$('.orderSelect').on('click',function(){
				$('.oSelect').slideUp();
				$(this).find('.oSelect').slideDown();
				$(this).addClass('selectColor');
				event.stopPropagation();
			});
			$('.oSelect li').on('click',function(){
			   	 $(this).parent().parent().find('div').text($(this).text());
			   	 $(this).parent().slideUp();
			   	 $('.orderSelect').removeClass('selectColor');
			   	 event.stopPropagation();
			});
			$('body').on('click',function(){
				 $('.oSelect').slideUp();
				 $('.orderSelect').removeClass('selectColor');
			});
		},
		controlModel:function(){	
			infoEven();
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
			var html = [
			           ' <tr> ' ,
		               '    <td class="id" data-indentName = "'+obj.indentName+'">'+obj.id+'</td>' ,
		               '    <td class="userCompany">'+(obj.userCompany == null ? "--":obj.userCompany) +'</td>' ,
		               '    <td class="realName">'+(obj.realName == null ? "--":obj.realName) +'</td>' ,
		               '    <td class="indent_tele">'+(obj.indent_tele == null ? "--":obj.indent_tele) +'</td>' ,
		               '    <td></td>' ,
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
		               '    <td></td>' ,
		               '    <td class="indent_tele">'+(obj.indent_tele == null ? "":obj.indent_tele) +'</td>' ,
		               '    <td></td>' ,
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
		               '    <td></td>' ,
		               '    <td class="orderDate" data-id="'+obj.id +'">'+(obj.orderDate == null ? "":obj.orderDate) +'</td>' ,
		               '    <td class="findInfo" data-id="'+obj.id +'"><div class="true">真实</div></td>' ,
		               '    <td class="cancle" data-id="'+obj.id +'"><div>查看</div></td>' ,
		               ' </tr>' ,
			].join('');
			return html;
		}
};
//新建 修改事件
function newOrderEven(check,item){
	if(check == 1){
		$('#orderName').text('新建订单');
	}else{
		var orderNo = item.rows[0].id;
		var orderDate = item.rows[0].orderDate;
		var telName = item.rows[0].realName;
		var companyName = item.rows[0].userCompany;
		var teles = item.rows[0].indent_tele;
		var orderInfo = $('#orderComeInfo').attr('data-value');
		$('#orderName').text('订单信息修改');
		$('#orderNo').text(orderNo);
		$('#orderDate').text(orderDate);
		$('#telName').val(telName);
		$('#companyName').val(companyName);
		$('#teles').val(teles);
		$('.sureBtn btn-c-r').off('click').on('click',function(){	
			var data = {id:orderNo,orderDate:orderDate,realName:telName,userCompany:companyName,indent_tele:teles};
			$.ajax({
				  type: 'POST',
				  url: getContextPath()+'/order/submit',
				  data: data,
				  success: success,
				  dataType: dataType
				});
		});
	}
	$('#NewOrder').show();
	$('#showHelper').hide();
	$('#orderCome li').on('click',function(){
		$(this).parent().parent().find('div').attr('data-value',($(this).attr('data-value')));
	  	if($(this).hasClass('showHelper')){
	   		$('#showHelper').show();
	   	 }else{
	   		$('#showHelper').hide();
	   }
	});
	$('.sureBtn btn-c-g').off('click').on('click',function(){	
		$('#NewOrder').hide();
	});
}

function infoEven(){

		$('.info').off('click').on('click',function(){
			var id = $(this).parent().find('.id').text();
			$('#NewOrder').show();
			loadData(function (res){
				newOrderEven(2,res);
			}, getContextPath() + '/order/list/page', $.toJSON({
				"id":id 
			}));
			
			
//			var tr = $(this).parent();
//			var id = $(tr).find('.id');
//			var realName = $(tr).find('.realName');
//			var indent_tele = $(tr).find('.indent_tele');
//			var userCompany = $(tr).find('.userCompany');
//			var wechat = $(tr).find('.wechat');
//			var orderDate = $(tr).find('.orderDate');
//			var cSRecomment = $(tr).find('.cSRecomment');
//			var indentType = $(tr).find('.indentType');
//			var position = $(tr).find('.position');
//			var data_indentName = $(id).attr('data-indentName');
//			
//			$('#formId').val($(id).text().trim());
//			$('#formrealName').val($(realName).text().trim());
//			$('#formindent_tele').val($(indent_tele).text().trim());
//			$('#formuserCompany').val($(userCompany).text().trim());
//			$('#formwechat').val($(wechat).text().trim());
//			$('#formorderDate').val($(orderDate).text().trim());
//			$('#formcSRecomment').val($(cSRecomment).text().trim());
//			$('#formindentType').val($(indentType).text().trim());
//			$('#formposition').val($(position).text().trim());
//			$('#indentName').val(data_indentName);
		});
	
}

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



