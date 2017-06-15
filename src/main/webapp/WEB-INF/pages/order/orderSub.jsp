<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />
<spring:url value="/resources/css/order/orderSub.css" var="orderCss"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/Clamp/clamp.js" var="clampJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/order/orderSub.js" var="orderSubJs"/>
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
 	
 	 <div class="modelPage" id="userInfo">
              <div class="findInfo">
                    <div class="closeBtn"></div>
                    <div class="infoTitle">客户信息</div>
              <div class="itemContent">
                  <div class="infoItem">
                          <div class="itemTitile">昵称</div>
                          <div>内容</div>
                    </div>  
                    <div class="infoItem">
                          <div class="itemTitile">公司名称</div>
                          <div>内容</div>
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">真实姓名</div>
                         <div>内容</div>
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">联系电话</div>
                          <div>内容</div>
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">职位</div>
	                      <div>内容</div>
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">性别</div>
	                      <div>内容</div>
                    </div>
                     <div class="infoItem" style="display:block">
                          <div class="itemTitile">客户类型</div>
	                      <div>内容</div>
                    </div>
                    
                    <div class="itemLine"></div>

                    <div class="infoItem">
                          <div class="itemTitile">微信</div>
                          <div>内容</div>
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">邮件</div>
                          <div>内容</div>
                    </div>
                      <div class="infoItem">
                          <div class="itemTitile">网址</div>
                          <div>内容</div>
                    </div>
                    
                    <div class="itemLine"></div>
                    
                     <div class="infoItem" >
                          <div class="itemTitile">购买频次</div>
	                      <div>内容</div>
                    </div>
                    
                     <div class="infoItem" >
                          <div class="itemTitile">购买价格</div>
	                       <div>内容</div>
                    </div>
                    
                     <div class="infoItem" >
                          <div class="itemTitile">客户规模</div>
	                      <div>内容</div>
                    </div>
                    
                     <div class="infoItem" >
                          <div class="itemTitile">高层背书</div>
                          <div>内容</div>
                    </div>
                    <div class="itemLine"></div>
                    <div class="infoItem">
                          <div class="itemTitile textareaTitle">备注</div>
                          <div>内容</div>
                    </div>
                  </div>  
            </div>
      </div>
 
    <div class="page">   
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
                   <th>公司名称</th>
                   <th>联系人</th>
                   <th>职位</th>
                   <th>联系电话</th>
                   <th>订单来源</th>
                   <th>下单时间</th>
                   <th>客户信息</th>
                   <th>需求文档</th>
               </tr>
               <tr>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>
                     Savings
                  </td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td>Savings</td>
                  <td class="findInfo"><div>查看</div></td>
                  <td><div>查看</div></td>
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
    <script type="text/javascript" src="${orderSubJs}"></script>
</body>

</html>