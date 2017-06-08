<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />
<spring:url value="/resources/css/order/orderIndex.css" var="orderCss"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/Clamp/clamp.js" var="clampJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/order/orderIndex.js" var="orderIndexJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />
<spring:url value="/resources/images" var="imgPath" />


<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<title>拍片网</title>
	
    <link rel="stylesheet" href="${orderCss }">
    <link rel="stylesheet" href="${datepickerCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script type="text/javascript">
		var _vds = _vds || [];
		window._vds = _vds;
		(function(){
		  _vds.push(['setAccountId', '9f2e33a3d43b5d78']);
		  (function() {
		    var vds = document.createElement('script');
		    vds.type='text/javascript';
		    vds.async = true;
		    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(vds, s);
		  })();
		})();
	</script>
</head>

<body>
     
     <r:identity role="provider">
	    <input type="hidden" id="rolephone" value="1314520ppw" />              
	 </r:identity>
	 <r:identity role="customer">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	 </r:identity>
	 <r:identity role="employee">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="rolephoneImg" value="1314520ppw" />
	 </r:identity>
	 
 	<jsp:include flush="true" page="../header.jsp"></jsp:include> 
 
    <div class="page">
      <div class="modelPage" id="successModel">
           <div class="successModel">
               <div class="closeBtn"></div>
               <div class="show-zero2 zeromodal-icon zeromodal-success">'
					<span class="line tip"></span>
					<span class="line long"></span>
		       </div>
		   <div class="oSContent">
		        <div class="title">订单提交成功!</div>
		        <div class="desc">自动返回<span>订单列表页</span><span id="last3">3</span>秒</div>
		        <div class="descBot btn-c-r">确认</div>
		   </div>
           </div>
      </div>
      
      <div class="modelPage" id="sureModel">
           <div class="successModel">
               <div class="closeBtn"></div>
		   <div class="oSContent">
		        <div class="sTitle">订单将作废</div>
		        <div class="sDes">此联系人信息是否真实可靠，是否为我们的</div>
		        <div class="sDes">潜在客户?</div>
		        <div class="sureBtn">
		           <div class="btn-c-r" id="noReal">虚假</div>
		           <div class="btn-c-g" id="real">真实</div>
		        </div>
		   </div>
           </div>
      </div>
      
       <div class="modelPage" id="checkSureModel">
           <div class="successModel">
               <div class="closeBtn"></div>
		   <div class="oSContent">
		        <div class="tDes">是否确认"次联系人为<span class="redColor" id="setColor"></span>客户?"</div>
		        <div class="sureBtn">
		           <div class="btn-c-r" id="tModel">确定</div>
		           <div class="btn-c-g" id="cModel">取消</div>
		        </div>
		   </div>
           </div>
      </div>
    
      <div class="tableList">
         <!-- <div class="userHeader">
              <img src="">
              <div class="name">
                  <div>客服姓名</div>
                  <div>姓名</div>
              </div>
         </div> -->
<!--          <div class="showStatus">
              <a><div>处理中</div></a>
              <a><div>已提交</div></a>
              <a><div>无效订单</div></a>
         </div>
         <div class="searchInfo">
            <div>订单编号</div>
            <input value="1312312312">
            <div>联系电话</div>
            <input type="number" value="182103">
            <div>日期查询</div>
            <input class="time" id="timeOld" name="time" value="">
            <span>~</span>
            <input class="time" id="timeNew" name="time" value="">
         </div> -->
         <jsp:include flush="true" page="orderSearch.jsp"></jsp:include> 
         <table>
               <tr>
                   <th>订单编号</th>
                   <th>联系人</th>
                   <th>职称</th>
                   <th>联系电话</th>
                   <th>公司电话</th>
                   <th>微信号</th>
                   <th>下单时间</th>
                   <th>备注</th>
                   <th>编辑</th>
                   <th>提交</th>
                   <th>作废</th>
               </tr>
               <tr>
                  <td>Savings</td>
                  <td><input value="test"></td>
                  <td>
                      <div class="orderSelect">
                            <div>测试</div>
                            <img src="${imgPath}/orderManager/select.png">
                            <ul class="oSelect">
                                <li>选项1</li>
                                <li>选项2</li>
                                <li>选项3</li>
                                <li>选项4</li>
                            </ul>                
                       </div>
                  </td>
                  <td><input value="test"></td>
                  <td><input value="test"></td>
                  <td><input value="test"></td>
                  <td>Savings</td>
                  <td><input value="test"></td>
                  <td class="edit"><div></div></td>
                  <td class="submit"><div></div></td>
                  <td class="cancle"><div></div></td>
               </tr>
               <tr>
                  <td>Savings</td>
                  <td>Savings</td>
                   <td>
                      <div class="orderSelect">
                              <div>测试</div>
                             <img src="${imgPath}/orderManager/select.png">
                            <ul class="oSelect">
                                <li>选项1</li>
                                <li>选项2</li>
                                <li>选项3</li>
                                <li>选项4</li>
                            </ul>                
                       </div>
                  </td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>的哈四大火炉私搭乱建的克拉手机打开垃圾时打开拉家带口啦就是打开链接阿里斯顿就大声道还哦是地阿斯基调</td>
                  <td class="edit"><div></div></td>
                  <td class="submit"><div></div></td>
                  <td class="cancle"><div></div></td>
               </tr>
               <tr>
                  <td>Savings</td>
                  <td>Savings</td>
                   <td>
                      <div class="orderSelect">
                            <div>测试测试</div>
                             <img src="${imgPath}/orderManager/select.png">
                            <ul class="oSelect">
                                <li>选项1</li>
                                <li>选项2</li>
                                <li>选项3</li>
                                <li>选项4</li>
                            </ul>                
                       </div>
                  </td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td class="edit"><div></div></td>
                  <td class="submit"><div></div></td>
                  <td class="cancle"><div></div></td>
               </tr>

         </table>
         
         <!-- pagination start -->
		<div class="page-section">
			<div class="page-wrap">
				<div class="pagination">
					
				</div>
			</div>
		</div>
		<!-- pagination end -->
      </div>   
    </div>

    <!-- foot -->
	<%-- <jsp:include flush="true" page="../foot.jsp"></jsp:include>  --%>
    <!--新版底部-->
    <script type="text/javascript" src="${jqueryJs}"></script>
    <script type="text/javascript" src="${datepickerJs}"></script>
    <script type="text/javascript" src="${datepickerZhJs}"></script>
    <script type="text/javascript" src="${commonJs}"></script>
    <script type="text/javascript" src="${orderIndexJs}"></script>
</body>

</html>