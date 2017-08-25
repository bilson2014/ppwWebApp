<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%-- import CSS --%>
<spring:url value="/resources/css/newFlow/createFlow.css" var="textCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/newFlow/createFlow.js" var="createFlowJs"/>
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="">
<meta name="description" content="">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title></title>
<link rel="stylesheet" href="${textCss}">
<script type="text/javascript" src="resources/lib/Clamp/clamp.js"></script>
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${commonJs}"></script>
<script type="text/javascript" src="${createFlowJs}"></script>

<!--[if lt IE 9]>
        <script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
    <![endif]-->


</head>

<body>

	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<div class="page">
	    <jsp:include flush="true" page="../header.jsp"></jsp:include>
	    <div class="title">新建项目</div> 
	    <div class="infoTitle">项目信息</div> 
	    <div class="outSide">
	           <div class="projectInfo">
	                 <div class="smallItem">
	                       <div class="itemTitle">项目编号</div>
	                       <input />
	                 </div>
	                 <div class="midItem">
	                       <div class="itemTitle">项目名称</div>
	                       <input />
	                 </div>
	                  <div class="smallItem">
	                       <div class="itemTitle">项目评级</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                  <div class="sMidItem noMargin">
	                       <div class="itemTitle">项目来源</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome">
				                     <li data-id="2">222</li>
				                     <li data-id="3">333</li>
				                     <li data-id="4">444</li>
				                </ul>    
					      </div>
	                 </div>
	                 
	                  <div class="smallItem">
	                       <div class="itemTitle">产品线</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome">
				                     <li data-id="2">222</li>
				                     <li data-id="3">333</li>
				                     <li data-id="4">444</li>
				                </ul>    
					      </div>
	                 </div>
	                 <div class="midItem">
	                       <div class="itemTitle">等级</div>
	                        <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome">
				                     <li data-id="2">222</li>
				                     <li data-id="3">333</li>
				                     <li data-id="4">444</li>
				                </ul>    
					      </div>
	                 </div>
	                  <div class="smallItem">
	                       <div class="itemTitle">时长</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                  <div class="sMidItem noMargin">
	                       <div class="itemTitle">附加包</div>
	                       <div class="orderSelect orderMultSelect"> <div id="multInfo"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="multSelect" id="orderCome">
				                     <li><input type="checkbox" data-id="1"><div>测试</div></li>
				                     <li><input type="checkbox" data-id="2"><div>vv</div></li>
				                     <li><input type="checkbox" data-id="3"><div>ss</div></li>
				                     <li><input type="checkbox" data-id="4"><div>aa</div></li>
				                </ul> 
				           </div>
	                 </div>
	                 
	                  <div class="smallItem">
	                       <div class="itemTitle">立项时间</div>
	                       <input />
	                 </div>
	                 <div class="midItem">
	                       <div class="itemTitle">项目周期</div>
	                       <input/> 
	                 </div>
	                  <div class="bigItem noMargin">
	                       <div class="itemTitle">对标影片</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome">
					                 <li data-id="2">222</li>
					                 <li data-id="3">333</li>
					                 <li data-id="4">444</li>
				                </ul>    
					      </div>
	                 </div>
	           </div>
	    </div>
	    
	    <div class="infoTitle">协同人信息</div> 
		    <div class="outSide">
		           <div class="projectInfo">
		                <div class="smallItem">
	                       <div class="itemTitle">客服总监</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                    </div>
	                    <div class="smallItem">
	                       <div class="itemTitle">销售总监</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                 <div class="smallItem">
	                       <div class="itemTitle">创意总监</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                 <div class="smallItem">
	                       <div class="itemTitle">监制总监</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                  <div class="smallItem">
	                       <div class="itemTitle">供应商总监</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                  <div class="smallItem">
	                       <div class="itemTitle">供应商管家</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                  <div class="smallItem">
	                       <div class="itemTitle">供应商采购</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                  <div class="smallItem">
	                       <div class="itemTitle">财务主管</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                  <div class="smallItem">
	                       <div class="itemTitle">财务出纳</div>
	                       <div class="orderSelect" >
				                <div id="sIndentSource"></div>
				                <img src="${imgPath}/flow/selectOrder.png">
				                <ul class="oSelect" id="orderCome"></ul>    
					      </div>
	                 </div>
	                    
		           </div>
		    </div> 
		     <div class="infoTitle">客户信息</div> 
		    <div class="outSide">
		           <div class="projectInfo">
			             <div class="midItem">
		                       <div class="itemTitle">客户名称</div>
		                       <input />
		                 </div> 
			             <div class="smallItem">
		                       <div class="itemTitle">客户联系人</div>
		                       <input />
		                 </div>
		                 <div class="smallItem">
		                       <div class="itemTitle">客户电话</div>
		                       <input />
		                 </div>
		                 <div class="smallItem">
		                       <div class="itemTitle">客户评级</div>
		                       <div class="orderSelect" >
					                <div id="sIndentSource"></div>
					                <img src="${imgPath}/flow/selectOrder.png">
					                <ul class="oSelect" id="orderCome"></ul>    
						      </div>
		                 </div>
	                
		           </div>
		     </div> 
		     
		      <div class="infoTitle">价格信息</div>
		      <div class="singleItem">
		                       <div class="itemTitle">客户联系人</div>
		                       <input />
		                       <div class="yuan">元</div>
		      </div>
		      <div class="infoTitle">项目描述</div>
		      <div class="outSide">
		           <textarea></textarea>         
		      </div>
		      
		      <div class="btnMid">
		          <div class="btn-c-g">取消</div>
		          <div class="btn-c-r">确认</div>
		      </div>
	</div>
	  
	<!-- video-->
</body>

</html>
