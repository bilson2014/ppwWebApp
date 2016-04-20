<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>

<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/lib/h5bp/h5bp.css" var="h5bpCss" />
<spring:url value="/resources/css/common.css" var="commonCss" />
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />
<%-- import JS --%>
<spring:url value="/resources/lib/html5shiv/html5shiv.js"
	var="html5shivJs" />
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js"
	var="blockUIJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />

<spring:url value="/resources/js/common.js" var="commonJs" />

<spring:url value="/resources/lib/jquery.cookie/jquery.cookie.js"
var="cookiejs" />
<spring:url value="/resources/js/model.js" var="modelJs" />
<spring:url value="/resources/css/flow/addflow.css" var="addflowcss" />
<spring:url value="/resources/js/flow/addflow.js" var="addflowjs" />
<spring:url value="/resources/lib/jquery/ajaxfileupload.js"
	var="ajaxfileuploadJs" />
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
<link rel="stylesheet" href="${normalizeCss }">
<link rel="stylesheet" href="${h5bpCss }">
<link rel="stylesheet" href="${commonCss }">
<link rel="stylesheet" href="${addflowcss }">
<link rel="stylesheet" href="${datepickerCss }">
<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${blockUIJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${cookiejs }"></script>
<script src="${modelJs }"></script>
<script type="text/javascript" src="${addflowjs }"></script>
<script type="text/javascript" src="${ajaxfileuploadJs}"></script>
<script type="text/javascript" src="${datepickerJs }"></script>
<script type="text/javascript" src="${datepickerZhJs }"></script>
</head>
<body>

<div class="header">
		<div class="menu-bar nav">
			<div class="left-part">
				<a href="<spring:url value='/'/>" class="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
					<a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">我要拍片</a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理</a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
				</r:identity>
				<r:identity role="manager">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
				</r:identity>
				
				<r:noLogin>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
					<a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">我要拍片</a>
				</r:noLogin>
			</div>
			
			<div class="right-part">
				<r:noLogin>
					<a href="<spring:url value="/provider/login" />" class="header-item login-item" target="_self">供应商登录</a>
					<a href="<spring:url value="/login" />" class="header-item login-item" target="_self">客户登录</a>
				</r:noLogin>
				<r:identity role="customer">
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
				<r:identity role="manager">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
			</div>
		</div>
	</div>

<div class="page">
	<label class="state" >${state }</label>
		<div class="page-title">
		<label class="page-title-title">项目信息添加</label>
	</div>
	<!-- toolbar modal begin -->
	<div class="modal fade upload-window" id="toolbar-modal">            
		<div class="circle-div">
		</div>	
        <div class="circle-img" id="circle-img-id"></div>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">	 
                   <div class="title-model">添加新用户</div>                   
                   <div class="user-info-div">
                     <div class="user-info-title">客户名称</div>
                     <div class="user-info-title">客户联系人</div>
                     <div class="user-info-title">客户电话</div>
                   </div>
                     <div class="user-info-input-div">
			               <input class="user-info-input" placeholder="请输入" id="add_username"></input>
			               <input class="user-info-input" placeholder="请输入" id="add_contactname"></input>
			               <input class="user-info-input" placeholder="请输入" id="add_userphone"></input>
                     </div>
                     <button class="user-info-btn" id="user-info-btn-finish">完成</button>
                     <button class="user-info-btn-cancle" id="hide-btn">取消</button>
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal end -->
    <div class="infobody">
		<div class="baseinfo">
			<div class="baseinfo-right">
                   <div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key">项目信息</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">项目编号</div>
							<input type="text" class="tableinput-baseinfo border-gray projectId">
							<label class="error-label" id="error-projectId">该信息不能为空</label>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">项目名称</div>
							<input type="text" class="tableinput-baseinfo border-gray projectName">
							<label class="error-label" id="error-projectName">该信息不能为空</label>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key" >项目来源</div>
							<select class="tableinput-baseinfo" id="projectSource" ></select>
							<label class="error-label" id="error-projectSource">该信息不能为空</label>
								
							
						</div>
                   </div>
                   <div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key">客户信息</div>
							<div class="baseinfo-table-key-add" id="add-user">添加用户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">客户名称</div>
							<div class="tableinput-baseinfo-noborder userName" id="userName-id">
								<input id="userName"  class="info-input border-gray"/>
								<label class="username-error-label" id="error-userName">该信息不能为空</label>
							</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">客户联系人</div>
							<input type="text" class="tableinput-baseinfo border-gray userContact">
							<label class="error-label" id="error-userContact" >该信息不能为空</label>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">客户电话</div>
							<input type="text" class="tableinput-baseinfo border-gray userPhone">
							<label class="error-label" id="error-userPhone" >该信息不能为空</label>
						</div>
                   </div>
				<div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key">供应商信息</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商名称</div>
							<div class="tableinput-baseinfo-noborder teamName" id="teamName-id" >
								<input id="teamName" class="info-input border-gray " id="error-teamName"/>
							</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商联系人</div>
							<input type="text"  id="error-teamContact"  class="tableinput-baseinfo border-gray teamContact">
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商电话</div>
							<input type="text" class="tableinput-baseinfo border-gray teamPhone" id="error-teamPhone">
						</div>
				</div>
				<div class="baseinfo-table">
					<div class="divtable">
						<div class="baseinfo-table-key">项目价格</div>
						<input style="visibility: hidden;">
					</div>
					<div class="divtable">
						<div class="baseinfo-table-key pirce-title">项目预算信息</div>
							<div class="final-price-div">
								<div class="pirce-div mleft" ></div>
								<div class="mright">
							    	<input type="checkbox" class="radio-price border-gray"  id="radio-price"></input>
							    	  <lable class="checkword">确定报价</label>
										<label class="final-price-label" id="error-radio-price">该信息不能为空</label>
								</div>
						 </div>
					</div>
				</div>
	  			<div class="baseinfo-table">
					<div class="divtable">
						<div class="baseinfo-table-key">项目描述</div>
						<input style="visibility: hidden;">
					</div>
					<textarea rows="3" cols="90" class="textarea-baseinfo description"></textarea>
				</div>
				<ul class="ul-option" id="ul-select">
				</ul>

				<ul class="ul-option-team" id="ul-select-team">
				</ul>

				<ul class="ul-option-source" id="ul-select-source">
				</ul>                          
          	</div>
        </div>	
	</div>
	<div class="indent-time">
		<div class="indent-time-right">
			<div class="indent-time-table-border-tr">
				 <div class="right-border">项目时间表</div>
				 <div class="right-border right-border-margin">沟通</div>
				 <div class="right-border right-border-margin">方案</div>
				 <div class="right-border right-border-margin">商务</div>
				 <div class="right-border right-border-margin">制作</div>
				 <div class="right-border right-border-margin">交付</div>
			</div>	
			<div class="indent-time-table-border-tr-time">
				<div class="right-border-time-left"></div>
				<div class="right-border-time right-border-margin "><img class="img-size" src="/resources/img/flow/time-img.png"/></div>
				<div class="right-border-time "><img class="img-size" src="/resources/img/flow/time-img.png"/></div>
				<div class="right-border-time "><img class="img-size" src="/resources/img/flow/time-img.png"/></div>
				<div class="right-border-time "><img class="img-size" src="/resources/img/flow/time-img.png"/></div>
				<div class="right-border-time-end "><img class="img-size-end" src="/resources/img/flow/time-end.png"/></div>
			</div>	
			<div class="indent-time-table-border-tr-time">
				<div class="right-border">预计时间</div>
				<div class="right-border right-border-margin"><input type="text" class="tableinput gtstarttime" id="gtstarttime"></div>
				<div class="right-border right-border-margin"><input type="text" class="tableinput fastarttime" id="fastarttime"></div>
				<div class="right-border right-border-margin"><input type="text" class="tableinput swstarttime" id="swstarttime"></div>
				<div class="right-border right-border-margin"><input type="text" class="tableinput zzstarttime" id="zzstarttime"></div>
				<div class="right-border right-border-margin"><input type="text" class="tableinput jfstarttime" id="jfstarttime"></div>
			</div>
			  <div class="indent-time-table-border-tr-time-error">
				<div class="right-border"></div>
				<div class="right-border right-border-margin"><label id="error-gtstarttime"  class="tableinput-error ">日期有误</label></div>
				<div class="right-border right-border-margin"><label id="error-fastarttime" class="tableinput-error ">日期有误</label></div>
				<div class="right-border right-border-margin"><label id="error-swstarttime" class="tableinput-error ">日期有误</label></div>
				<div class="right-border right-border-margin"><label id="error-zzstarttime" class="tableinput-error ">日期有误</label></div>
				<div class="right-border right-border-margin"><label id="error-jfstarttime" class="tableinput-error ">日期有误</label></div>
			</div>
				
		</div>
	</div>
	<div class="indent-btn-div">
		<button class="indent-btn">确认</button>
		<a  href="javascript:void(0);" onClick="javascript :history.back(-1);"> <button class="indent-btn-cancle">取消</button></a>
	</div>  	
</div>

<div class="footer">
		<!-- 底栏 start -->
		<div class="footer-wrap">
			<div class="footer-content">
			
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >登录</a>
					<a href="<spring:url value="/mgr/login" />" target="_self">视频管家登录</a>
					<a href="<spring:url value="/provider/login" />" target="_self">供应商登录</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >联系我们</a>
					<a href="tel:4006609728" class="qqClient"><label class="tel-icon"></label><h3>4006609728</h3></a>
					<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>2640178216</h3></a>
					<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>3299894058</h3></a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >服务</a>
					<a href="<spring:url value='/order-flow.html' />">服务流程</a>
					
					<a href="javascript:void(0);" class="top-margin">工作时间</a>
					<a href="javascript:void(0);">工作日9:00 - 18:00</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >授权 / 条款</a>
					<a href="<spring:url value='/company-service.html' />">使用协议</a>
					<a href="<spring:url value='/company-service.html#servicePart' />">服务协议</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >了解拍片网</a>
					<a href="<spring:url value='/about-us.html' />">了解我们</a>
					<a href="<spring:url value='/member.html#join-us' />">加入我们</a>
					<a href="<spring:url value='/company-activity.html' />">公司活动</a>
					<a href="<spring:url value='/member.html#activityPart' />">团队简介</a>
				</div>

				<div class="footer-column">
					<div class="mark-icon"></div>
					<h4>关注送好礼</h4>
				</div>

				<div class="footer-notice">
					<h2>版权信息</h2>
					<p>本站视频作品采用知识共享署名-非商业性使用。本站不提供任何视听上传</p>
					<p>服务，所有内容均来自视频分享站点所提供的公开引用资源。</p>
				</div>
			</div>
			<div class="footer-box">
				&copy; 2014 攀峰文化 京ICP备 14036662号-1 | <a>百度统计</a>  <a href='<spring:url value="/sitemap.html" />' target="_blank" title="站长统计">站长统计</a>
			</div>
		</div>
		<!-- 底栏 end -->
	</div>
</body>
</html>