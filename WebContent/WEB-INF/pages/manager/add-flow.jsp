<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>

<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/lib/h5bp/h5bp.css" var="h5bpCss" />
<spring:url value="/resources/css/common.css" var="commonCss" />
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
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
<link rel="stylesheet" href="${normalizeCss }">
<link rel="stylesheet" href="${h5bpCss }">
<link rel="stylesheet" href="${commonCss }">
<link rel="stylesheet" href="${bootstrapCss }">
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
<body >

<div class="header">
     
     	<!-- show Modal start -->
<%-- 		<div class="modal" id="isShow" data-backdrop="static" data-keyboard=true>
			<div class="modal-dialog">
				<div class="modal-content model-distance" id="mymodal-content">
					<div class="modal-body" id="mymodal-body">
						
						<div class="alert alert-warning" role="alert">数据处理中请勿关闭页面</div>
						<img id="circleId" src="${imgPath }/flow/circle.png"/>
						    <div class="load-word">加载中</div>
							<div class="spinner">
							  <div class="bounce1"></div>
							  <div class="bounce2"></div>
							  <div class="bounce3"></div>
							</div>
					</div>
					
				</div>
			</div>
		</div> --%>
		
		<!-- show Modal end -->



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
				<r:identity role="employee">
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
				<r:identity role="employee">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
			</div>
		</div>
	</div>
<div class="page" >
	<div class="page-title">
		<label class="page-title-title">项目信息添加</label>
	</div>
    <div class="infobody">
		<div class="baseinfo">
			<div class="baseinfo-right">
                   <div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key">项目信息</div>
						</div>
						<div class="divtable" id="div-projectId">
							<div class="baseinfo-table-key">项目编号</div>
							<input type="text" readonly="readonly" class="tableinput-baseinfo projectId form-control">
							<label class="error-label" id="error-projectId">该信息不能为空</label>
						</div>
						<div class="divtable" id="div-projectName">
							<div class="baseinfo-table-key">项目名称</div>
							<input type="text" class="tableinput-baseinfo  projectName form-control">
							<label class="error-label" id="error-projectName">该信息不能为空</label>
						</div>
						
                   </div>

                  <div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key">来源信息</div>
						</div>
						<div class="divtable" id="div-projectSource">
							<div class="baseinfo-table-key" >项目来源</div>
							<select class="tableinput-baseinfo form-control selectdiv" id="projectSource" ></select>
							<label class="error-label" id="error-projectSource">该信息不能为空</label>
						</div>
						<div class="divtable hide" id="div-friendship">
							<input type="hidden" id="referrer-Id-hidden">
							<div class="baseinfo-table-key">推荐人</div>
							<input type="text" id="input-referrer" class="tableinput-baseinfo form-control">
							<label class="error-label" id="error-input-referrer">该信息有误</label>
						</div>
						
						<ul class="ul-option-source" style="" id="ul-select-referrer">
						</ul>  
                   </div>
                   
                   
                    <div class="cooperative-div">
						<div class="divtable">
							<div class="cooperative-table-key">协同人信息</div>
							<div class="cooperative-table-key pos-top glyphicon glyphicon-plus" data-id="1" id="add-Synergy"></div>
						</div>
							<div>
								<div id="cooperative-id">
									<div class="cooperative">协同人名称</div>
									<div class="cooperative pos-left">比例</div>
								</div>
								<div id="Synergy-root" style="display: inline-block;">
								
								</div>
							</div>
							
							
                   </div>
                   

                   <div class="baseinfo-table">
                   		<input type="hidden" class="userId" id="userId">
						<div class="divtable">
							<div class="baseinfo-table-key">客户信息</div>
						</div>
						<div class="divtable" id="div-userName">
							<div class="baseinfo-table-key">客户名称</div>
							<div class="tableinput-baseinfo-noborder userName" id="userName-id">
								<input id="userName"  class="info-input border-gray form-control"/>
								<label class="username-error-label" id="error-userName">信息输入有误</label>
							</div>
						</div>
						<div class="divtable" id="div-userContact">
							<div class="baseinfo-table-key">客户联系人</div>
							<input type="text" class="tableinput-baseinfo form-control userContact">
							<label class="error-label" id="error-userContact" >该信息不能为空</label>
						</div>
						<div class="divtable" id="div-userPhone">
							<div class="baseinfo-table-key">客户电话</div>
							<input type="text" class="tableinput-baseinfo form-control userPhone">
							<label class="error-label" id="error-userPhone" >号码有误</label>
						</div>
						
						<ul class="ul-option" id="ul-select">
								</ul>
                   </div>
				<div class="baseinfo-table">
						<input type="hidden" class="teamId" id="teamId">
						<div class="divtable">
							<div class="baseinfo-table-key">供应商信息</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商名称</div>
							<div class="tableinput-baseinfo-noborder teamName" id="teamName-id" >
								<input id="teamName" class="info-input form-control " id="error-teamName"/>
								<label class="error-label" id="error-teamName" >该信息输入有误</label>
							</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商联系人</div>
							<input type="text"  id="error-teamContact"  class="tableinput-baseinfo form-control teamContact">
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商电话</div>
							<input type="text" class="tableinput-baseinfo form-control teamPhone" id="error-teamPhone">
						</div>
						
						<ul class="ul-option-team" id="ul-select-team">
			 	        </ul>
				</div> 
				<div class="baseinfo-table" style="height:180px" >
					
					<div class="divtable">
						<div class="baseinfo-table-key" >项目价格</div>
					</div>

					<div class="divtable pospricediv">
						<div class="baseinfo-table-key pirce-title">项目预算信息</div>
							<div class="final-price-div">
								<div class="pirce-div mleft" >
									<input type="text" id="firstinput" class="pirce-input form-control firstinput">
									<div class="midinput"></div>
									<input type="text" id="lastinput" class="pirce-input form-control lastinput"> 元
									<label class="final-price-label" id="error-radio-price">输入信息有误</label>
								</div>
						 </div>
					</div>

					<div class="divtable finishdiv finish">
							<div class="baseinfo-table-key">项目最终价格</div>
							<input type="text" id='finishInput' class="tableinput-baseinfo form-control finishInput wordMargin"/>元
					</div>
					<div>
                    <label class="final-price-left-label" id="error-finishInput">输入信息有误</label>
                    </div>
					<div class="mright">
					</div> 
								
				</div>
			<div class="price-inarea" id="close-div">
					
					<div class="divtable userPrice">
						<div class="userPriceTitle pirce-title">客户支付金额</div>
							<div class="final-price-div">
								<div class="pirce-div mleft" >
									<input type="text" id="userinput" class="pirce-input-user form-control lastinput"> 元
									<label class="user-price-label" id="error-user-price">请输入数字</label>
								</div>
						 </div>
					</div>
					<div class="divtable finishdiv finish providerPrice">
							<div class="userPriceTitle">支付供应商金额</div>
							<input type="text" id='providerInput' class="tableinput-baseinfo form-control finishInput wordMargin"/>元
					</div>
					<div>
                    <label class="provider-price-left-label" id="error-provider-price">请输入数字</label>
                    </div>
				</div>
				<div class="loadMore" id="open-div"><div style="display:inline-block;" id="loadWord">展开更多</div><img id="circleImg" style="display:inline-block;position:relative;left:10px;" src="${imgPath }/flow/getMore.png"/></div>
	  			<div class="baseinfo-table">
					<div class="divtable">
						<div class="baseinfo-table-key" >项目描述</div>
					</div>
					<textarea rows="2" cols="90" class="textarea-baseinfo description form-control"></textarea>
				</div>
			

				
  
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
				<div class="right-border-time right-border-margin"  id="gtstarttimeid"><img class="img-size" src="/resources/img/flow/time-img.png"/></div>
				<div class="right-border-time"      id="fastarttimeid"><img class="img-size" src="/resources/img/flow/time-img.png"/></div>
				<div class="right-border-time"      id="swstarttimeid"><img class="img-size" src="/resources/img/flow/time-img.png"/></div>
				<div class="right-border-time"      id="zzstarttimeid"><img class="img-size" src="/resources/img/flow/time-img.png"/></div>
				<div class="right-border-time-end"  id="jfstarttimeid"><img class="img-size-end" src="/resources/img/flow/time-end.png"/></div>
			</div>	
			<div class="indent-time-table-border-tr-time">
				<div class="right-border">预计时间</div>
				<div class="right-border right-border-margin" id="div-gtstarttime"><input type="text" class="tableinput gtstarttime form-control" id="gtstarttime"></div>
				<div class="right-border right-border-margin" id="div-fastarttime"><input type="text" class="tableinput fastarttime form-control" id="fastarttime"></div>
				<div class="right-border right-border-margin" id="div-swstarttime"><input type="text" class="tableinput swstarttime form-control" id="swstarttime"></div>
				<div class="right-border right-border-margin" id="div-zzstarttime"><input type="text" class="tableinput zzstarttime form-control" id="zzstarttime"></div>
				<div class="right-border right-border-margin" id="div-jfstarttime"><input type="text" class="tableinput jfstarttime form-control" id="jfstarttime"></div>
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
		<button class="indent-btn" id="indent-btn">确认</button>
		<a  href="javascript:void(0);" onClick="javascript :history.back(-1);"> <button class="indent-btn-cancle">取消</button></a>
	</div>  	
	            
	            <div class="bottom-div">
	                      <div class="loadmore-div">
				       			<div class="load-word">加载中</div>
										<div class="spinner">
										  <div class="bounce1"></div>
										  <div class="bounce2"></div>
										  <div class="bounce3"></div>
										</div>
								</div>
						  </div>	
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
					<a href="mailto:bd@paipianwang.cn" class="mailClient"><label class="mail-icon"></label><h3>bd@paipianwang.cn</h3></a>
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
					<h4>关注官方微信</h4>
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
		<input type="hidden" id="key" style="display: none;" value="${key}">
		<label class="state" >${state }</label>
	</div>
</body>
</html>