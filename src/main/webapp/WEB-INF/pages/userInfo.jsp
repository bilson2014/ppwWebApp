<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss"/>
<spring:url value="/resources/css/userInfo.css" var="userInfoCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/lib/jcrop/jquery.Jcrop.min.css" var="jcropCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js" var="blockUIJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<%-- <spring:url value="/resources/lib/jquery/ajaxfileupload_userInfo.js" var="ajaxfileuploadJs"/> --%>
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZHJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/userInfo.js" var="userInfoJs"/>
<spring:url value="/resources/images" var="path" />
<spring:url value="/resources/lib/jcrop/jquery.Jcrop.min.js" var="jcropJs"/>
<spring:url value="/resources/lib/jcrop/jquery.color.js" var="jcropColorJs"/>
<spring:url value="/resources/js/juicer.js" var="juicerJs"/>

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
	<title>供应商信息页面-拍片网</title>
	<link rel="shortcut icon" href="${path }/favicon.ico" >
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${datepickerCss }">
	<link rel="stylesheet" href="${webuploaderCss }">
	<link rel="stylesheet" href="${userInfoCss }">
	<link rel="stylesheet" href="${jcropCss }">
	<link rel="stylesheet" type="text/css" href="${webuploaderCss}">
	<spring:url value="/resources/lib/jquery.scroll/jquery.scrollbar.js" var="jsBarJs"/>
    <spring:url value="/resources/lib/jquery.scroll/jquery.scrollbar.css" var="jsBarCss"/>
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${blockUIJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
<%-- 	<script src="${ajaxfileuploadJs }" ></script> --%>
	<script src="${webuploaderJs }" ></script>
	<script src="${datepickerJs }" ></script>
	<script src="${datepickerZHJs }" ></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${userInfoJs }"></script>
	<script src="${webuploaderJs}"></script>
	<script src="${jcropJs }"></script>
	<script src="${jcropColorJs }"></script>
	<script src="${juicerJs }"></script>
	<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
	<spring:url value="/resources/images/provder" var="imgPath"/>
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
<body style="height: auto;">
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" id="user_sex" value="${user.sex }"/>
	<input type="hidden" id="user_unique" value="${user.id }"/>
	<input type="hidden" id="user_img" value="${user.imgUrl }"/>
		<!-- photo Modal start -->
	<div class="modal" id="mymodal">
		<div class="modal-dialog">
			<div class="modal-content model-distance">
				<div class="modal-header model-no-border">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				</div>
				<div class="modal-body">
					<div class="modal-left">
						<div class="modal-original">
							<img alt="" src="" id="modal-original-img">
						</div>
					</div>
					<div class="modal-right">
						<div class="modal-preview-container">
							<img alt="" src="" id="modal-preview">
						</div>
						<button class="btn btn-primary" type="button" id="uploadConfirmBt">确认</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- photo Modal start -->
     <div class="proInfo">
     					  <div class="updateLogo">   
	      		                    <div class="title">当前头像</div>
		      		                <div class="user-img-content">
										<div class="user-icon">
											<img alt="用户头像" src="${user.imgUrl}" class="img-circle" id="user-img"/>
											<input type="hidden" id="user_img_url" value="/resources/images/provider/default-user.jpg">
										</div>
										<div class="upload-info">
											<label>仅支持小于250KB的png/jpg格式，推荐120*120分辨率</label>
										</div>
										<div class="upload-btn">
											<!-- <button class="btn btn-primary" id="uploadBt" type="button">上传头像</button> -->
											<div id="uploadBt">上传头像</div>
											<input type="file" name="file" id="file" style="display: none;"/> 
											<div class="errorImg"></div>
										</div>
									</div>
							</div>	
                            <div class="infoItem" id="nickName-error">
                                <div class="title">昵称</div>
                                <input type="text" class="" id="nickName" value="${user.userName }" tabindex="1" placeholder="请输入昵称" autocomplete="off" />
                            </div>
                            <div class="infoItem" id="company-name-error">
                                <div class="title notop">性别</div>
                                <input type="hidden" class="sex" value="${user.sex }">
                                <div class="sexCheckItem selectItem" data-content="0">
                                     <div class="sexCheck" ></div>
                                     <div class="sexInfo">男</div>
                                </div>
                                 <div class="sexCheckItem" data-content="1">
                                     <div class="sexCheck" ></div>
                                     <div class="sexInfo">女</div>
                                </div>
                                 <div class="sexCheckItem" data-content="2">
                                     <div class="sexCheck" ></div>
                                     <div class="sexInfo">保密</div>
                                </div>
                            </div>
                             <div class="infoItem" >
                                <div class="title">真实姓名</div>
                                <input type="text" class="" id="trueName" value="${user.realName }" tabindex="2" placeholder="请输入真实姓名" autocomplete="off" />
                            </div>
                             <div class="infoItem">
                                <div class="title">公司名称</div>
                                <input type="text" class="" id="company" value="${user.userCompany }" tabindex="3" placeholder="请输入公司名称" autocomplete="off" />
                            </div>
                            <div class="infoItem" id="contact-email-error">
                                <div class="title">电子邮件</div>
                                <input type="text" class="" id="contact-email" value="${user.email }" tabindex="4" placeholder="请输入电子邮件" autocomplete="off" />
                            </div>
                            <div class="infoItem" id="contact-qq-error">
                                <div class="title">QQ</div>
                                <input type="text" class="" id="contact-qq" value="${user.qq }" tabindex="5" placeholder="请输入QQ号" autocomplete="off" />
                            </div>
                            <div class="infoItem">
                                <div class="title">微信</div>
                                <input type="text" class="" id="contact-wechat" value="${user.weChat }" tabindex="5" placeholder="请输入微信号" autocomplete="off" />
                            </div>
                            <div class="infoItem hide">
                                <div class="title">客户来源</div>
                                <div class="dropdown infoSelect priceRangeSelect" id="company-priceRange-value">
										<button class="btn dropdown-toggle" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span id='customerSource' data-value="3">渠道</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu" id="selectUl" role="menu"
											aria-labelledby="dropdownMenu1">
											<c:if test="${!empty userSource}">
												<c:forEach items="${userSource }" var="source" varStatus="status">
												  <li data-value ="${source.key }" 
												  	<c:if test="${user.customerSource == source.key }">
												  		selected="selected"
												  	</c:if> >${source.value }</li>
												</c:forEach>
							                </c:if>
										</ul>
									</div>
                            </div>
                            <div class="infoBottom">
	                            <div class="infoSubmit btn-c-r" id="self-info-contentBt">保存</div>
                            </div>
                       </div>
</body>
</html>