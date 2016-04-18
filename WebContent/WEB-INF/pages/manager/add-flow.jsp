<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib" %>

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
<spring:url value="/resources/css/manager/addflow.css" var="addflowcss" />
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
                     <button class="user-info-btn-cancle" id="hide-btn">取消</button>
                     <button class="user-info-btn" id="user-info-btn-finish">完成</button>
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
							<input type="text" class="tableinput-baseinfo projectId">
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">项目名称</div>
							<input type="text" class="tableinput-baseinfo projectName">
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key" >项目来源</div>
							<div class="tableinput-baseinfo projectId" id="projectSource-id" >
								<input readonly="readonly" id="projectSource" class="info-input" placeholder="请选择"/>
								<img class="select-img-point" src="/resources/img/flow/select.png">
							</div>
						</div>
                   </div>
                   <div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key">客户信息</div>
							<div class="baseinfo-table-key-add" id="add-user">添加用户</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">客户名称</div>
							<div class="tableinput-baseinfo userName" id="userName-id">
								<input id="userName" class="info-input"/>
								<img class="select-img-point" src="/resources/img/flow/select.png">
							</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">客户联系人</div>
							<input type="text" class="tableinput-baseinfo userContact">
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">客户电话</div>
							<input type="text" class="tableinput-baseinfo userPhone">
						</div>
                   </div>
				<div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key">供应商信息</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商名称</div>
							<div class="tableinput-baseinfo teamName" id="teamName-id" >
								<input id="teamName" class="info-input"/>
								<img class="select-img-point" src="/resources/img/flow/select.png">
							</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商联系人</div>
							<input type="text"  class="tableinput-baseinfo teamContact">
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商电话</div>
							<input type="text" class="tableinput-baseinfo teamPhone">
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
								<div>
							    	<input type="checkbox" class="radio-price"  id="radio-price">最终定价</input>
							    	   <lable class="checkword">最终价格</label>
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
				<div class="right-border right-border-margin"><input type="text" class="tableinput fastarttime" id="gtstarttime"></div>
				<div class="right-border right-border-margin"><input type="text" class="tableinput swstarttime" id="gtstarttime"></div>
				<div class="right-border right-border-margin"><input type="text" class="tableinput zzstarttime" id="gtstarttime"></div>
				<div class="right-border right-border-margin"><input type="text" class="tableinput jfstarttime" id="gtstarttime"></div>
			</div>	
		</div>
	</div>
	<div class="indent-btn-div">
		<button class="indent-btn">确认</button>
	</div>  	
</div>
</body>
</html>