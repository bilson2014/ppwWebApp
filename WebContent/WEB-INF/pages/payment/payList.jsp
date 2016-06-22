<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/payment/paylist.css" var="paylistCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/payment/paylist.js" var="paylistJs"/>

<!-- import img path -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<title>订单页</title>
	<link rel="stylesheet" href="${paylistCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
</head>
<body>


	<div class="page">
     
     <div class="orderDiv">
       
         <img class="imgTitle leftMargin" src="${imgPath }/icons/logo_red.png"/>
         <div class="titleWord">项目支付</div>
         <div class="topLine leftMargin"></div>
         <div class="orderContent">
	           <div class="topContent leftMargin">
	              <div class="contentLeft">支付单号：<span>20160285100471</span></div>
	              <div class="contentRight">截止时间：<span>2016/06/12 12:22</span></div>
	           </div>
	           
	           <div class="midContent leftMargin">
	                 <div class="midContentDiv">
			              <div class="contentLeft grayColor">项目名称：<span class="grayDarkColor">产品宣传片</span></div>
			              <div class="contentRight grayColor">支付状态：<span class="payStatue">支付进行中</span></div>
		             </div> 
		             
		             <div class="midContentDiv">
			              <div class="contentLeft grayColor">收款方：<span class="contentSpan grayDarkColor">北京拍片乐科技有限公司</span></div>
			              <div class="contentRight grayColor">支付方：<span class="contentSpan grayDarkColor">穷的不行可有无限公司</span></div>
		             </div> 
		             
		             <div class="midContentDiv ">
			              <div class="contentPayLeft imgWord grayColor">付款方式：</div>
			              <div class="contentRight"><img class="imgPad" src="${imgPath }/icons/bankIcon.png"/></div>
		             </div>
		             
		             <div class="solidLine">----------------------------------------------------------------------------------------------------------------------------------------</div>
		             <div class="midContentDiv">
			              <div class="contentLeft"><span class="contentTitleSpan grayColor" style="font-weight:400">付款金额：</span><span class="contentSpan contentSpanBig">20000</span><span class="contentSpanSmall">元</span></div>
			              <div class="contentRight"><button class="btn-red">确认</button></div>
		             </div> 
	           </div>
	           
         </div>
     
     </div>
     
     <div class="cue">请仔细核对项目支付信息</div>
     
       <div>
            <ul class="timeOut">
              <li><img src="${imgPath }/icons/linkTimeOut.png"/></li>
              <li>这个链接失效 </li>
              <li>可以重新向视频管家申请</li>
            </ul>
       </div>
     
     
     
    </div>
    
    
    
    	<!-- toolbar modal begin doing -->
		<div class="modal fade upload-window" id="doingModals">
		<!-- 	<img class="circle-img" src="/resources/img/flow/circle.png" id="circle-img-id"></img> -->
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
							<img class="canclemodal" src="/resources/img/flow/canclemodal.png">
							<div class="titleModal">进行中...</div>
							
							<div class="modalContent">
							    <ul>
							       <li><img src="${imgPath }/icons/success.png"></li>
							       <li>支付成功</li>
							       <li>立即查看账单详情</li>
							    </ul>
							</div>
							
							<div class="modalContent">
							    <ul>
							       <li><img src="${imgPath }/icons/rePay.png"></li>
							       <li>重新支付</li>		
							    </ul>
							</div>
					</div>
				</div>
			</div>
		</div>
		<!-- toolbar modal end -->
		
		<!-- toolbar modal begin success -->
		<div class="modal fade upload-window" id="successModals">
		<!-- 	<img class="circle-img" src="/resources/img/flow/circle.png" id="circle-img-id"></img> -->
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
							<img class="canclemodal" src="/resources/img/flow/canclemodal.png">
							
							<div class="modalSingleContent">
							    <ul>
							       <li><img src="${imgPath }/icons/finishSmile.png"></li>
							       <li>支付成功啦</li>
							       <li>点击返回支付记录</li>
							    </ul>
							</div>
							
					</div>
				</div>
			</div>
		</div>
		<!-- toolbar modal end -->
		
				<!-- toolbar modal begin fail -->
		<div class="modal fade upload-window" id="failModals">
		<!-- 	<img class="circle-img" src="/resources/img/flow/circle.png" id="circle-img-id"></img> -->
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
							<img class="canclemodal" src="/resources/img/flow/canclemodal.png">
							
							<div class="modalSingleContent">
							    <ul>
							       <li><img src="${imgPath }/icons/failSmile.png"></li>
							       <li>支付失败</li>
							       <li>请重新支付</li>
							       <li>返回支付记录</li>
							    </ul>
							</div>
							
					</div>
				</div>
			</div>
		</div>
		<!-- toolbar modal end -->
    
		
	<script src="${jqueryJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${paylistJs}"></script>
</body>
</html>