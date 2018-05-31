<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/css/provider/portal.css" var="providerPortalCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css"
	var="webuploaderCss" />
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>

<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/provider/portal.js" var="porviderPortalJs"/>
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs" />
<spring:url value="/resources/lib/jquery/ajaxfileupload.js" var="ajaxfileuploadJs"/>
<spring:url value="/resources/js/juicer.js" var="juicerJs" />
<spring:url value="/resources/images/user" var="imgPath"/>
<spring:url value="/resources/lib/jquery.scroll/jquery.scrollbar.js" var="jsBarJs"/>
<spring:url value="/resources/lib/jquery.scroll/jquery.scrollbar.css" var="jsBarCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.js"
	var="webuploaderJs" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>供应商页面-拍片网</title>
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${providerPortalCss }">
	<link rel="stylesheet" type="text/css" href="${webuploaderCss}">
	<link rel="shortcut icon" href="${imgPath }/../favicon.ico" >

	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${ajaxfileuploadJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${porviderPortalJs }"></script>
	<script src="${webuploaderJs }"></script>
	<script src="${juicerJs }"></script>
	<script src="${webuploaderJs }"></script>
	
</head>

<div class="modTop"></div>

<body style="overflow:hidden">
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" value="${flag}" id="portal-flag"/>
	<div class="header-content">
      <jsp:include flush="true" page="../header.jsp"></jsp:include> 
	</div>
	
	<div class="infomation" id="infomation" style="display: none;">
	        <label id="infomation_title">*您的资质提交已经成功提交,审核中...</label>
	        <label id="infomation_body">官方将在3个工作日内完成您的资质审核,敬请等候...</label>
	        <div class="closeInfo" id="closeInfo"></div>
	</div>
	<div class="tooltip-success-show" style="display: none;">
		<label class="tooltip-success-message" id="tooltip-success-messageSSSS">信息更新成功</label>
	</div>
	<div class="tooltip-error-show" style="display: none;">
		<label class="tooltip-success-message" id="tooltip-success-messageEEEE">信息更新失败</label>
	</div>
	<div class="tooltip-check" id="tooltip-check" >
	     <div class="checkCard">
	          <div class="closeCheck" id='closeCheck'></div>
	          <div class="checkInfo" id="checkInfo">error</div>
	          <div class="checkBottom">
	                 <div class="sureCheck" id="sureCheck">确认</div>
	                 <div class="falseCheck" id="falseCheck">取消</div>
	          </div>
	     </div>
	</div>

	 <div class="tooltip-warn-up" >
		 <div class="infoCard showwarn">
			   <div class="closeX closewarn"></div>
			   <div class="title">拍片网郑重提醒您：</div>
			   <div class="redWord">上传作品必须为贵公司或贵工作室及个人的原创作品;</div>
			   <div class="redWord">不得上传有贵公司或贵工作室及个人二维码/电话/手机/微信等联系方式的作品;</div>
			   <div class="redWord">作品必须填写创作完成日期。</div>
			   <div class="midWord">为响应国家九部委联合开展深入整治互联网和手机媒体淫秽色情及低俗信息专项行动的号召，营造一个
	健康文明的网络环境，给大家一个和谐积极的家园。</div>
	           <div class="grayWord">不得上传任何有违国家法律法规的视频。</div>
	           <div class="grayWord">不得上传具有色情内容的视频</div>
	           <div class="grayWord">不得上传内容低俗，格调不高的视频。</div>
	           <div class="grayWord">  不得上传具有色情诱导性内容的视频。</div>
	           <div class="grayWord">不得在标题、简介和标签中出现任何具有低俗色情含义的字眼。</div>
	           <div class="grayWord">不含有涉及版权问题的影视片段。</div>
	           <div class="botWord">如果有违上述内容，我们将一律予以删除，我们希望我们最珍贵的客户及供应商，理解并监督我们。</div>
	           <div class="bottom">
	             	   <div class='showmultipUpload'>确定</div>
	                   <div class='closewarn'>取消</div>
	           </div>
		 </div>
		 		 
		 <div class="selectVideo">
		     <div class="top">
		       <div class="closeX closewarn"></div>
		       <div class="title">批量上传作品</div>
		       <div class="titleInfo">视频上传格式要求<span id="changWord">收起</span><span id='maxLength'></span></div>
		       <div class="titleWarn">
			       <div class="redWord">视频格式 : MP4格式</div>
				   <div class="redWord">视频编码 : H264编码</div>
				   <div class="redWord">音频编码 : MP3编码</div>
				   <div class="redWord">文件大小 : 200Mb以下</div>
				   <div class="redWord">分辨率 : 1920x1080、1280x720、960x540</div>
				   <div class="redWord">比特率 : 3000kb/s(1920x1080)、1400kb/s(1280x720)、900kb/s(960x540)</div>
				   <div class="redWord">帧速率 : 24fps</div>
				   <div class="redWord">色彩空间 : yuv420p</div>
				   <div class="Word">我们建议您使用以下转码软件</div>
				   <div class="grayWord">Windows系统 : 格式工厂</div>
	               <div class="grayWord">Mac系统：Any Video Converter</div>
	               <div class="WordBot">如果您对此有疑问,您可以拨打(010-59005319)与我们联系。</div>
		       </div>
		     </div>
		     <div class="mid" id='video-container'></div>
		     
		     <div class="bottom">
		        <div class="picker" id='picker'>选择文件</div>
		        <div class="btn-c-r begin" id='submit-multip'>开始上传</div>
		        <div class='closewarn-refresh'>关闭</div>
		     </div>
		 </div>
	</div>
	
	<div class="tooltip-wati" >
		     <div class="watiCard">
		         <img src="/resources/images/icons/wait.gif">
		         <div>进度处理中...</div>
		     </div>
		 </div>

	 <div class="page" style="height:100%">

       <div class="user-wrap">
                <div class="left-wrap">
                    <div class="left-header">
                    	<a <c:if test="${provider.flag == 1 || provider.flag == 4}">href="/provider/info_${provider.teamId }.html"</c:if>>
                          <img class="proLogo" id="proLogo" data-value="${provider.teamPhotoUrl }" src="/resources/images/provider/initLogo.png"/>
                         </a>
                          <div class="isPass">
			                     <c:if test="${provider.flag == 2}">
										<img src="/resources/images/provder/noPass.png"><div class="noPass">未通过</div>
								 </c:if>
								 <c:if test="${provider.flag == 0}">
										<img src="/resources/images/provder/wPass.png"><div class="wPass">审核中</div>
								 </c:if> 
								 <c:if test="${provider.flag == 1 || provider.flag == 4}">
										<img src="/resources/images/provder/pass.png"><div class="pass">已认证</div>
								 </c:if>
			                 </div>
                    </div>
                    <div class="userName">${provider.teamName }</div>
                                 <c:if test="${provider.flag == 2}">
										 <div class="userProduct showInfo" data-content="您的资质未通过审核，暂时无法查看，请完善相关资质重新提交审核！" >创作团队主页
										 </div>
								 </c:if>
								 <c:if test="${provider.flag == 0}">
										 <div class="userProduct showInfo" data-content="您的资质正在审核中，暂时无法查看！">创作团队主页
										 </div>
								 </c:if> 
								 <c:if test="${provider.flag == 1 || provider.flag == 4}">
										                     <a href="/provider/info_${provider.teamId }.html">
                    	                                           <div class="userProduct">创作团队主页</div>
                                                             </a>
								 </c:if>

                    <div class="left-content">
                         <div class="infoItem activeThis">
                                <div class="product" data-action="video-list">作品列表</div>
                         </div>  
                          <div class="infoItem" id="clickCompany">
                                <div class="info" data-action="company-info">团队信息</div>
                         </div>
                          <div class="infoItem" id="clickSafe">
                                 <div class="safeInfo" data-action="safe-info">安全设置</div>
                         </div> 
                    </div>
                </div>
                <div class="right-wrap">
                       <div class="titleTop" id="titleTop">作品列表</div>
                       
				       <div class="control" id="control">
							<div class="newProduct">
								<div></div>
								<span>单个作品上传</span>
							</div>
							<div class="moreUp">
								<div></div>
								<span>批量上传作品</span>
							</div>
						</div> 
                       
                       <iframe class="frame" id="content-frame" class="iframe" src="<spring:url value='/provider/video-list'/>"></iframe>
                </div>
       </div>
    </div>
</body>
</html>