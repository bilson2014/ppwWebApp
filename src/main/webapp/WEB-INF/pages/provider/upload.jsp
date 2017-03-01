<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/css/commons.css" var="commonCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css"
	var="bootstrapCss" />
<spring:url value="/resources/css/provider/upload.css"
	var="providerUploadCss" />
<spring:url value="/resources/lib/webuploader/webuploader.css"
	var="webuploaderCss" />
<spring:url value="/resources/lib/kindeditor/themes/default/default.css"
	var="defaultCss" />
<spring:url value="/resources/lib/kindeditor/plugins/code/prettify.css"
	var="prettifyCss" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css"
	var="datepickerCss" />
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js"
	var="blockUIJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js"
	var="bootstrapJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js"
	var="webuploaderJs" />
<spring:url value="/resources/js/provider/upload.js"
	var="providerUploadJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js"
	var="datepickerJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js"
	var="datepickerZHJs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap-switch.min.js"
	var="bootstrapSwitchJs" />
<!-- imgPath -->
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
<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
<meta name="description"
	content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
<title>拍片网 | 上传页面</title>
<link rel="shortcut icon" href="${imgPath }/favicon.ico">
<link rel="stylesheet" href="${normalizeCss }">
<link rel="stylesheet" href="${commonCss }">
<link rel="stylesheet" href="${bootstrapCss }">
<link rel="stylesheet" href="${defaultCss }">
<link rel="stylesheet" href="${prettifyCss }">
<link rel="stylesheet" href="${providerUploadCss }">
<link rel="stylesheet" href="${datepickerCss }">
<link rel="stylesheet" href="${webuploaderCss }">
<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script type="text/javascript">
	var _vds = _vds || [];
	window._vds = _vds;
	(function() {
		_vds.push([ 'setAccountId', '9f2e33a3d43b5d78' ]);
		(function() {
			var vds = document.createElement('script');
			vds.type = 'text/javascript';
			vds.async = true;
			vds.src = ('https:' == document.location.protocol ? 'https://'
					: 'http://')
					+ 'dn-growing.qbox.me/vds.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(vds, s);
		})();
	})();
</script>
</head>
<body>
	<div class="header headerMove" id="header">
		<input type="hidden" id="csrftoken" name="csrftoken"
			value="${csrftoken}" />
		<div class="menu-bar nav">
			<div class="left-part">
				<a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item">我的项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>"
						class="header-item">信息管理<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item">所有项目<span></span></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value='/mgr/index'/>" class="header-item">所有项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>

				<r:noLogin>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:noLogin>
				<a href="<spring:url value='/list.html'/>" class="header-item"
					target="_parent">精品案例<span></span></a> <a href="/order-flow.html"
					class="header-item" target="_parent">服务流程<span></span></a> <a
					class="header-item header-item-last" id="showVideo"
					target="_parent">
					<div class="showVideo"></div> 拍片网介绍 <span></span>
				</a>
				 <a href="/newsInfo" class="header-item" target="_parent">新闻资讯<span></span></a>
			</div>
			<input type="hidden" id="commonToken" name="token" value="${token}" />
			<div class="middle-part">
				<div class="search-box">
					<form method="get" action="/search" id="s-form">
						<div class="bannerSearchFind"></div>
						<input type="text" size="16" autocomplete="off" id="search-q"
							name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" /> <a
							href="javascript:void(0);" class="go bk_white"
							onclick="return false;" id="s-btn"></a>
						<ul id="shelper" class="shelper-lucency"></ul>
					</form>
				</div>
			</div>
			<div class="right-part">
				<r:noLogin>
					<a href="<spring:url value="/login" />"
						class="header-item login-item" target="_self">登录</a>
					<a href="<spring:url value="/register" />"
						class="header-item login-item" target="_self">注册</a>
				</r:noLogin>
				<r:identity role="customer">
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><img id="getImgUrl" data-value="<r:outImg />" src="/resources/images/provider/default-user.jpg"></a>
					<a class="header-item login-item widthHear" target="_self"><r:outName /></a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/user/info" />"><li class="toSet">个人信息</li></a>
					         <a href="<spring:url value="/user/info?safeInfo" />"><li class="toSafe">安全设置</li></a>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self"><img id="getImgUrl" data-value="<r:outImg />" src="/resources/images/provider/initLogo.png"></a>
					<a class="header-item login-item widthHear" target="_self"><r:outName /></a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/provider/portal?company-info" />"><li class="toSet">公司信息</li></a>
					         <a href="<spring:url value="/provider/portal?safe-info" />"><li class="toSafe">安全设置</li></a>
					         <a href="<spring:url value="/provider/portal" />"><li class="toList">作品列表</li></a>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value="/mgr/index" />"
						class="header-item login-item" target="_self"
						title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />"
						class="header-item login-item" target="_self">登出</a>
				</r:identity>
			</div>
		</div>
	</div>

	<input type="hidden" value="${cKey}" id="teamId">
	<input type="hidden" value="${product.productId}" id="productId">
	<input type="hidden" value="${flag}" id="flag">
	<div class="tooltip-warn-banner" id="tooltip-warn-banner">
		<div class="card">
		<div class="top">
			<div class="topBanner" id="closeBanner"></div>
		</div>
			<div class="imgContent">
				<img src="/resources/images/provider/default-cover.jpg"
					id="previewImg" class="previewImg"
					style="width: 650px; height: 358px;">
			</div>
		</div>
	</div>
	<div class="page">
		<div class="upVideoCard">
			<div class="titleInfo">作品上传</div>
			<c:if test="${product.productId == 0}">
				<div class="step1">
					<div class="upImg">
						<img src="/resources/images/provider/upLoad.png" />
					</div>
					<div class="upBtn btn-c-r" id="upBtn">上传视频</div>
					<div class="error_upload"></div>
					<div class="infoCard">
						<div class="title">拍片网郑重提醒您：</div>
						<div class="redWord">上传作品必须为贵公司或贵工作室及个人的原创作品;</div>
						<div class="redWord">不得上传有贵公司或贵工作室及个人二维码/电话/手机/微信等联系方式的作品;</div>
						<div class="redWord">作品必须填写创作完成日期。</div>
						<div class="midWord">为响应国家九部委联合开展深入整治互联网和手机媒体淫秽色情及低俗信息专项行动的号召，营造一个
							健康文明的网络环境，给大家一个和谐积极的家园。</div>
						<div class="grayWord">不得上传任何有违国家法律法规的视频。</div>
						<div class="grayWord">不得上传具有色情内容的视频</div>
						<div class="grayWord">不得上传内容低俗，格调不高的视频。</div>
						<div class="grayWord">不得上传具有色情诱导性内容的视频。</div>
						<div class="grayWord">不得在标题、简介和标签中出现任何具有低俗色情含义的字眼。</div>
						<div class="grayWord">不含有涉及版权问题的影视片段。</div>
						<div class="botWord">如果有违上述内容，我们将一律予以删除，我们希望我们最珍贵的客户及供应商，理解并监督我们。</div>
					</div>
				</div>
			</c:if>
			<div class="step2 <c:if test='${product.productId == 0}'>hide</c:if>">
				<c:if test="${product.productId == 0}">
					<div class="upProgress">
						<div class="proTitle">上传进度</div>
						<div class="progress progress-striped active">
							<div class="progress-bar progress-bar-success" role="progressbar"
								aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
								style="width: 0;"></div>
						</div>
						<div class="upIng">上传中...</div>
						<div class="upSuccess hide">
							<img src="/resources/images/provider/sure.png">上传成功
						</div>
						<div class="upError hide">
							<img src="/resources/images/provider/error.png">上传失败请重新上传
						</div>
					</div>
				</c:if>
				<div class="proItem" id="video-name-error">
					<div class="itemTitle">作品名称</div>
					<input type="text" class="" id="video-name"
						maxlength="30" placeholder="视频标题为必填字段"
						value="${product.productName }">
				</div>
				<c:if test="${flag == 4}">
					<div class="proItem">
						<div for="video-tag" class="control-label itemTitle">标签</div>
						<div class="tagArea">
							<div class="upload_filed_area">
								
								<div class="mod_keyword">
									<%-- <c:if test="${not empty product.tags }">
										<c:forEach items="${fn:split(product.tags,' ') }" var="tag">
											<span class="keyword_item">
											 	<b class="keyword_item_inner">${tag }</b>
											 	<a href="javascript:void(0);" class="btn_keyword_del"> <span>x</span></a>
											</span>
										</c:forEach>
									</c:if> --%>
									<span class="keyword_input"> <input type="text" value='${product.tags }'
										class="input_inner" id="text_tags" />
									</span>
								</div>
								<div class="alert alert-danger" id="tagLabel"
									style="display: none;">每个标签最多8个汉字或16个字母！</div>
							     </div>
							     <span class="keyword_placeholder"
									style="color: rgb(153, 153, 153); height: 12px; vertical-align: middle; font-size: 12px; display: none;">准确的标签将有利于您的视频被推荐和曝光哦~<span style="color:#fe5453!important">标签之间以空格分割</span></span>
							<span style="color: red;">*</span>
						</div>
					</div>
				</c:if>
				<div class="proItem" id="creationTime-error">
					<div class="itemTitle">创作时间</div>
					<input type="text" class="" id="creationTime"
						placeholder="请选择作品创作时间" readonly="readonly"
						value="${product.creationTime }">
				</div>
				<div class="proItem noItem">
					<div class="itemTitle">视频封面</div>

					<ul>
						<li>
							<div class="upBanner" id='upBtn-pic'>上传封面</div>
							<div class="findEx" id="findEx">查看示例</div>
						</li>
						<li>
							<c:if test="${not empty product.picLDUrl}">
								<img id="LDimg" src="${file_locate_storage_path }${product.picLDUrl}">
								<input type="hidden" value="${product.picLDUrl}" id='pic-LD-url' data-change="0">
							</c:if>
							<c:if test="${empty product.picLDUrl}">
								<img id="LDimg" src="/resources/images/index/noImg.jpg">
								<input type="hidden" id='pic-LD-url' data-change="0">
							</c:if>
							
						</li>
						<li>
							<span>仅支持小于250KB的png/jpg格式,推荐1280*720分辨率</span>
							<label>*</label>
						</li>
					</ul>
					<div id="img-error"></div>
				</div>
				<div class="bottomUp">
					<c:if test='${product.productId == 0}'>
						<div class="stateInfo">视频上传中 请勿刷新页面或者提交审核</div>
					</c:if>
					<div class="btn-c-r submit" id="infoBt">提交审核</div>
					<div class="btn-c-g cancle" onclick="window.location.href='/provider/portal'">取消</div>
				</div>
			</div>
			<div class="step3 hide">
				<div class="show-zero2 zeromodal-icon zeromodal-success">
					<span class="line tip"></span> <span class="line long"></span>
					<div class="placeholder"></div>
				</div>
				<div class="title">作品上传成功!</div>
				<div class="info">您的作品已成功上传,正在审核中...</div>
				<div class="autoJoin">
					自动跳转进入<a><span id="toPortal">作品列表页</span></a><span id="lasttime">3</span>秒
				</div>
			</div>
		</div>
	</div>
	<script src="${jqueryJs }"></script>
	<script src="${jquerybase64Js }"></script>
	<script src="${pluginJs }"></script>
	<script src="${blockUIJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${bootstrapSwitchJs }"></script>
	<script src="${webuploaderJs }"></script>
	<script src="${ajaxfileuploadJs }"></script>
	<script src="${kindeditorJs }"></script>
	<script src="${prettifyJs }"></script>
	<script src="${kindeditorzhJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${providerUploadJs }"></script>
	<script src="${datepickerJs }"></script>
	<script src="${datepickerZHJs }"></script>
</body>
</html>