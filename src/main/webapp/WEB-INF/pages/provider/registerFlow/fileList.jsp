<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css"
	var="bootstrapCss" />
<spring:url value="/resources/css/flow/infoStepUpLoad.css"
	var="providerLeaderCss" />
<spring:url value="/resources/css/provider/step-dc-style2.css"
	var="providerStepCss2" />
<spring:url value="/resources/lib/webuploader/webuploader.css"
	var="webuploaderCss" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/provider/registerFlow/infoStepUpLoad.js"
	var="infoStepUpLoadJs" />
<spring:url value="/resources/images" var="path" />
<spring:url value="/resources/lib/webuploader/webuploader.js"
	var="webuploaderJs" />
<spring:url value="/resources/js/juicer.js" var="juicerJs" />
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>

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
<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
<meta name="description"
	content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
<title>供应商引导页-拍片网</title>
<link rel="stylesheet" type="text/css" href="${bootstrapCss}">
<link rel="stylesheet" type="text/css" href="${providerLeaderCss}">
<link rel="stylesheet" type="text/css" href="${providerStepCss2}">
<link rel="stylesheet" type="text/css" href="${webuploaderCss}">


</head>
<body>
	<input type="hidden" value="${cType}" id="company-type" />
	<input type="hidden" value="${total}" id="total"/>
	<input type="hidden" value="${total}" id="total"/>
	<input type="hidden" value="${total}" id="total"/>
	<input type="hidden" value="${flowExecutionUrl}" id="flowExecutionUrl"/>
	<input type="hidden" value="${teamId}" id="teamId"/>
	<jsp:include flush="true" page="../../header.jsp"></jsp:include>
	<div class="page">
		<div class="step">
			<div class="step-bar" id="step-bar">
				<div class="first" id="step-1" data-content="填写基本信息">1</div>
				<div class="line"></div>
				<div class="first" id="step-2" data-content="填写详细信息">2</div>
				<div class="line"></div>
				<div class="first step-1" id="step-3" data-content="上传作品">3</div>
				<div class="line"></div>
				<div class="first" id="step-3" data-content="资质审核">4</div>
			</div>

			<div class="step-three-div" id="step3" data-step="3">
				<!--批量 -->
				<div class="multUpload" id="multUpload">
					<div class="setItem" id="video-container">
					          <div class="setWord">请选择作品</div>
					</div>
					<div class="showErrorUp"></div>
					<div class="multDiv">
						<div class="btn-c-g" id="cancleMult">返回</div>
						<div class="btn-c-r" id="submit-multip">开始上传</div>
						<div class="picker" id='picker'>选择文件</div>
					</div>
				</div>
				<!--批量end -->

				<!--作品列表 -->
				<div class="uploadChoose" id="uploadChoose">
					<div class="ucTitle">作品列表</div>
					<a href="${flowExecutionUrl}&_eventId=uploadFile&productId=0&teamId=${teamId}">
					<div class="newProduct" id="newProduct">
						<div></div>
						<span>新建作品</span>
					</div>
					</a>
					<div class="moreUp" id="moreUp">
						<div></div>
						<span>批量上传作品</span>
					</div>
					<div class="uploadLine"></div>
					<div class="setContent" id="ProductContent">
					
						<c:if test="${empty products}">
							<div class="noProduct">暂无作品</div>
						</c:if>
						
						<%-- <c:if test="${!empty products}">
							<c:forEach var="product" items="${products }">
	                             					<div class="productCard">
						<c:if test="${empty product.picLDUrl}">
							<img class='media-object playCBtn' src="/resources/images/index/noImg.jpg" />
						</c:if>
						<c:if test="${not empty product.picLDUrl}">
							<img class='media-object playCBtn' src='${file_locate_storage_path }${product.picLDUrl }' />
						</c:if>
						    <img class="playIcon playCBtn" src="/resources/images/index/play-icon.png"/>
						<input type="hidden" id="media-video" value='${product.videoUrl }' />
						<div
						
							class="mid nC">
							<div class="title">
								<span>标题：</span> 
								<span><c:out value="${product.productName }" /></span>
								<c:if test="${product.flag==0}">
									<div class="state yellow"><img src="/resources/images/provider/toWait.png">审核中</div>
								</c:if>
								<c:if test="${product.flag==1}">
									<div class="state green"><img src="/resources/images/provider/toPass.png">审核通过</div>
								</c:if>
								<c:if test="${product.flag==2}">
									<div class="state red"><img src="/resources/images/provider/toError.png">未通过</div>
								</c:if>
								<c:if test="${product.flag==3}">
									<div class="state blue"><img src="/resources/images/provider/toEdit.png">编辑中</div>
								</c:if>
							</div>
						</div>
						
							<div class="content <c:if test="${empty product.checkDetails || product.flag != 2}">hide</c:if>">
								<div class="cTitle">建议：</div>
								<div class="cContent">
								<c:if test="${not empty product.checkDetails and product.flag == 2}">
									${product.checkDetails }
								</c:if>
								</div>
							</div>
						
						<div class="lastContent">
							<c:if test="${product.flag==3 || cType == 4}">
								<div class="edit product-edit"  data-id='<c:out value="${product.productId }" />'>
								     <div>编辑作品</div>
								</div>
							</c:if>
							    <div class="del" data-id='<c:out value="${product.productId }"/>'>
							        <div>删除作品</div>
							    </div>
						</div>
					</div>	
							</c:forEach>
							
						</c:if> --%>
  						
					</div>
					
       <!-- pagination start -->
		<c:if test="${!empty products }">
			<div class="page-section">
				<div class="page-wrap">
					<div class="pagination"></div>
				</div>
			</div>
		</c:if>
		<!-- pagination end -->
					
					<div class="bottom-div">
						<sf:form>
				   		 	<input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}" />
				   		 	<input type="submit" class="gy-btn btn-c-g" name="_eventId_backspace" value="上一步" />
				   		 	<input type="button" id="checkStep3" class="red-btn btn-c-r" name="_eventId_checkUploadFile" value="下一步" />
				   		 </sf:form>
					</div>
				</div>

				<!--批量 END-->
			</div>
		</div>

	</div>
	<!-- foot -->
	<jsp:include flush="true" page="../../foot.jsp"></jsp:include>
	<!--新版底部-->
	
		<div class="tooltip-check" id="tooltip-check" >
	     <div class="checkCard">
	          <div class="closeCheck" id='closeCheck'></div>
	          <div class="checkInfo" id="checkInfo">error</div>
	          <div class="checkBottom">
	                 <div class="sureCheck" id="sureCheck">确认</div>
	          </div>
	     </div>
	</div>
<script src="${jqueryJs }"></script>
<script src="${jqueryPageJs }"></script>
<script src="${pluginJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs}"></script>
<script src="${juicerJs}"></script>
<script src="${webuploaderJs}"></script>	
<script src="${infoStepUpLoadJs}"></script>


</body>

</html>