<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/lib/h5bp/h5bp.css" var="h5bpCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css"
	var="bootstrapCss" />
<spring:url value="/resources/css/commons.css" var="commonCss" />

<spring:url value="/resources/lib/dist/css/drop-theme-basic.css"
	var="dropTheme" />
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
<spring:url value="/resources/js/flow/left_menu_min.js" var="leftjs" />
<spring:url value="/resources/lib/My97DatePicker/WdatePicker.js"
	var="WdatePicker" />
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/js/model.js" var="modelJs" />
<spring:url value="/resources/css/flow/flow.css" var="index" />
<spring:url value="/resources/css/flow/step-dc-style1.css"
	var="stepdcstyle" />
<spring:url value="/resources/js/flow/step-jquery-dc.js"
	var="stepjquery" />
<spring:url value="/resources/js/flow/flow.js" var="indexjs" />


<spring:url value="/resources/lib/dist/tether.min.js" var="tetherjs" />
<spring:url value="/resources/lib/dist/js/drop.min.js" var="dropjs" />
<spring:url value="/resources/js/flow/ajaxfileupload.js"
	var="ajaxfileuploadJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css"
	var="datepickerCss" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js"
	var="datepickerJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js"
	var="datepickerZhJs" />
<spring:url value="/resources/js/flow/ZeroClipboard.js" var="zclipJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
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
<link rel="stylesheet" href="${bootstrapCss }">
<link rel="stylesheet" href="${commonCss }">
<link rel="stylesheet" href="${webuploaderCss }">

<link rel="stylesheet" href="${index }">
<link rel="stylesheet" href="${stepdcstyle }">
<link rel="stylesheet" href="${dropTheme }">
<link rel="stylesheet" href="${datepickerCss }">
<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
<script src="${jqueryJs }"></script>
<script src="${commonJs }"></script>
<script src="${pluginJs }"></script>
<script src="${blockUIJs }"></script>
<script src="${jsonJs }"></script>
<script src="${leftjs}"></script>
<script src="${WdatePicker }"></script>
<script src="${stepjquery }"></script>
<script src="${indexjs }"></script>
<script src="${datepickerJs }"></script>
<script src="${webuploaderJs }" ></script>
<script src="${tetherjs }"></script>
<script src="${dropjs }"></script>
<script src="${modelJs }"></script>
<script src="${datepickerZhJs }"></script>
<script src="${zclipJs }"></script>



<script type="text/javascript" src="${ajaxfileuploadJs}"></script>
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<!-- <div class="circle-div"></div> -->
	<r:identity role="customer">
		<input type="hidden" value="customer" id="type">
	</r:identity>
	<r:identity role="provider">
		<input type="hidden" value="provider" id="type">
	</r:identity>
	<r:identity role="employee">
		<input type="hidden" value="employee" id="type">
	</r:identity>
	<input type="hidden" value="${userId }" id="userId">
	<div class="header headerMove" id="header">
 		<input type="hidden" id="csrftoken" name="csrftoken" value="${csrftoken}"/>
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				
				<r:noLogin>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:noLogin>
                <a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">精品案例<span></span></a>
                <a href="/order-flow.html" class="header-item" target="_parent">服务流程<span></span></a>
                <a class="header-item header-item-last" id="showVideo" target="_parent">
                    <div class="showVideo"></div>
                    	拍片网介绍
                    <span></span>
                </a>
                 <a href="/news/list" class="header-item" target="_parent">新闻资讯<span></span></a>
            </div>
            <input type="hidden" id="commonToken" name="token" value="${token}"/>
            <div class="middle-part">
                <div class="search-box">
                    <form method="get" action="/search" id="s-form">
                        <div class="bannerSearchFind"></div>
                        <input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />
                        <a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>
                        <ul id="shelper" class="shelper-lucency"></ul>
                    </form>
                </div>
            </div>
            <div class="right-part">
            	<r:noLogin>
					<a href="<spring:url value="/login" />" class="header-item login-item" target="_self">登录</a>
					<a href="<spring:url value="/register" />" class="header-item login-item" target="_self">注册</a>
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
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
            </div>
        </div>
    </div>
	<div class="page" id="page">

		<div class="left-page">
			<div class="left-title">
				<r:permission uri="/add-view">
					<div class="newBtn">
						<img src="${imgPath }/flow/plus.png" class="left-title-images "
							title="添加项目"> <label class="left-title-text-top">新建项目</label>
					</div>
				</r:permission>
				<label class="left-title-text">所有项目</label>
			</div>
			<r:identity role="employee">
				<!-- 管家 -->
				<div class="indentdiv">
					<div id="content">
						<div class="menu" id="menuId">
							<ul>
								<li><a id="doingProject">进行中</a>
									<ul id="doingProjectId">
										<li><a id="myProject">负责</a>
											<ul id="myProjectId">
											</ul></li>
										<r:identity role="employee">
											<li><a id="helpProject">协同</a>
												<ul id="helpProjectId">
	
												</ul></li>
										</r:identity>
									</ul>
								</li>
								<li><a id="historyProject">暂停</a>
									<ul id="pauseProjectId" style="margin-top: 10px;">

									</ul>
								</li>
								<li><a id="historyProject">完成/取消</a>
									<ul id="historyProjectId">
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</r:identity>
			
			
			<r:identity role="provider">
				<div class="indentdiv">
					<div id="content">
						<div class="menu" id="menuId">
							<ul>
								<li><a id="doingProject">进行中</a>
									<ul id="myProjectId" style="margin-top:10px">
									</ul>
								</li>
								<li><a id="historyProject">完成/取消</a>
									<ul id="historyProjectId">
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<ul id="pauseProjectId" class="hide"></ul>
				</div>
			</r:identity>
			<r:identity role="customer">
				<div class="indentdiv">
					<div id="content">
						<div class="menu" id="menuId">
							<ul>
								<li><a id="doingProject">进行中</a>
									<ul id="myProjectId" style="margin-top:10px">
									</ul>
								</li>
								<li><a id="historyProject">完成/取消</a>
									<ul id="historyProjectId">
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<ul id="pauseProjectId" class="hide"></ul>
				</div>
			</r:identity>
			
			
		</div>

		<div class="noproject hide">
			<div class="no-poject-div" id="no-poject-div">
				<ul>
					<li><img src="/resources/images/flow/warning.png"></li>
					<r:identity role="provider">
						<li><label>当前没有项目分配</label></li>
					</r:identity>
					<r:identity role="customer">
						<li><label>当前没有项目启动</label></li>
					</r:identity>
					<r:permission uri="/add-view">
						<li><label>当前没有任何项目,立即创建一个</label></li>
						<li><button class="red-btn" id="new-project">确定</button></li>
					</r:permission>
				</ul>
			</div>
		</div>
		<div class="right-page">
			<div class="flowblock">
				<div class="flow-title">
					<r:permission uri="/project/get/report">
						<div class="right-div" id="project-report">
							<img src="${imgPath }/flow/report.png" class="left-title-images"
								title="导出报表"> <label class="left-title-text-top">导出报表</label>
						</div>
					</r:permission>
				</div>
				<label class="flow-title-text">项目进度</label>
				<div class="step_context step_margin test" data-open-on="hover">
				</div>
				<div class="drop-content" style="display: none;">
					<a href="#" class="drop-a"><img
						src="/resources/images/flow/point.png" /></a> <a href="#"
						class="drop-a content-title"></a> <a href="#"
						class="description-c"></a>
				</div>


				<div class="descriptiondiv top-margin">
					<ul class="time-div firstline div-margin-sm ">
						<li class="timeword" id="cu_gt"></li>
						<li class="stepword" id="stepword_gt">未完成</li>
						<li><img class="firstline"
							src="/resources/images/flow/timeline.png" /></li>
						<li class="li-top  opacity-li" id="div_gt"><dl
								class="hovertime">
								<dt class="stepword">计划完成时间</dt>
								<dd class="timeword" id="et_gt">未设置</dd>
							</dl></li>
					</ul>

					<ul class="time-div secondline">
						<li class="timeword" id="cu_fa"></li>
						<li class="stepword" id="stepword_fa">未完成</li>
						<li><img class="secondline"
							src="/resources/images/flow/timeline.png" /></li>
						<li class="li-top opacity-li" id="div_fa"><dl
								class="hovertime">
								<dt class="stepword">计划完成时间</dt>
								<dd class="timeword" id="et_fa">未设置</dd>
							</dl></li>
					</ul>

					<ul class="time-div thirdline div-margin-mid">
						<li class="timeword" id="cu_sw"></li>
						<li class="stepword" id="stepword_sw">未完成</li>
						<li><img class="thirdline"
							src="/resources/images/flow/timeline.png" /></li>
						<li class="li-top  opacity-li" id="div_sw"><dl
								class="hovertime">
								<dt class="stepword">计划完成时间</dt>
								<dd class="timeword" id="et_sw">未设置</dd>
							</dl></li>
					</ul>

					<ul class="time-div fourline div-margin-large">
						<li class="timeword" id="cu_zz"></li>
						<li class="stepword " id="stepword_zz">未完成</li>
						<li><img class="fourline "
							src="/resources/images/flow/timeline.png" /></li>
						<li class="li-top opacity-li" id="div_zz"><dl
								class="hovertime">
								<dt class="stepword">计划完成时间</dt>
								<dd class="timeword" id="et_zz">未设置</dd>
							</dl></li>
					</ul>

					<ul class="time-div fiveline  div-margin-xl">
						<li class="timeword" id="cu_jf"></li>
						<li class="stepword " id="stepword_jf">完成</li>
						<li><img class="fiveline "
							src="/resources/images/flow/timeline.png" /></li>
						<li class="li-top opacity-li" id="div_jf"><dl
								class="hovertime">
								<dt class="stepword">计划完成时间</dt>
								<dd class="timeword" id="et_jf">未设置</dd>
							</dl></li>
					</ul>
				</div>
				<r:multPermission uri3="/completeTask" uri2="/suspendProcess"
					uri="/project/cancelProject">
					<div class="flowbtndiv" id="btndiv-id">
						<r:permission uri="/completeTask">
							<button class="flowbtn red-btn ">下一步</button>
						</r:permission>
						<r:permission uri="/suspendProcess">
							<button class="pausebtn gray-btn btn-margin">暂停</button>
						</r:permission>
						<r:permission uri="/project/cancelProject">
							<button class="cancelbtn gray-btn btn-margin">取消</button>
						</r:permission>
						<r:permission uri="/jumpPrevTask">
							<button class="prev-task gray-btn btn-margin hide">上一步</button>
						</r:permission>
					</div>
				</r:multPermission>
			</div>

			<r:identity role="customer">

				<div class="payInfo payTop hide" id="cusId">
					<label class="pay-title">订单信息</label>
					<button class="border-btn payBtnPos" type="button"
						id="payHistoryBtnOrder">账单</button>
					<div class="userContent">
						<div id="userContentId">
							<div style="display: inline-block">
								<img src="${imgPath }/flow/ring.png"></img>
							</div>
							<div style="display: inline-block" id="userContent">
								<div class="colorGray">
									您有<span>订单</span>需要支付啦！
								</div>
								<div class="colorGray">
									请到<span>账单</span>进行支付哦！
								</div>
								<div id="openHistory">立即前往></div>
							</div>
						</div>
					</div>
					<div class="loadMoreCus" id="loadCus">
						<div style="display: inline-block;" id="loadWordCus">展开更多</div>
						<img id="circleCusImg"
							style="display: inline-block; position: relative; left: 10px;"
							src="${imgPath }/flow/getMore.png" />
					</div>

				</div>
			</r:identity>

			<r:identity role="employee">
				<div class="payInfo payTop hide" id="managerId">
					<label class="pay-title">收款方式</label> <a
						href="<spring:url value='/payment/payList'/>" class="hide"><span
						id="historyList">跳转</span></a>
					<button class="border-btn payBtnPos" type="button" id="payHistory">支付记录</button>

					<div class="pay-way">
						<button class="payBtnOnline pay-btn" type="button" id="Online">发起线上收款</button>
						<button class="payBtnOutline pay-btn" type="button" id="Outline">记录线下收款
						</button>
					</div>
					<div class="loadMore" id="loadEmployee">
						<div style="display: inline-block;" id="loadWordEmployee">展开更多</div>
						<img id="circleEmployeeImg"
							style="display: inline-block; position: relative; left: 10px;"
							src="${imgPath }/flow/getMore.png" />
					</div>
				</div>

			</r:identity>

			<div class="payCardHeight payInfo" id="payHistoryList">
				<div class="loadmore-div" id="listLoad">
					<div class="load-word">加载中</div>
					<div class="spinner">
						<div class="bounce1"></div>
						<div class="bounce2"></div>
						<div class="bounce3"></div>
					</div>
				</div>


				<div class="payCardZoom" id="payListPage">
					<!-- 支付历史 -->
				</div>
			</div>

			<div class="indentinfo">
				<div class="indentinfo-title">
					<label class="indentinfo-title-text">项目详细信息</label>
					<r:permission uri="/project/update-indentProject">
						<button class="change-file-btn border-btn" type="button"
							id="upload-info-btn-id">修改</button>
					</r:permission>
				</div>
				<div class="indentinfo-table-div">
					<div class="indentinfo-table">
						<ul>
							<li>
								<div class="indent-title">项目信息</div>
								<div class="indent-content">项目编号</div>
								<div class="indent-content-mid">项目名称</div>
								<div class="indent-content">项目预算区间</div>
							</li>
							<li class="li-margin">
								<div class="indent-title "></div>
								<div class="indent-content content-color projectId"></div>
								<div class="indent-content-mid content-color projectName"></div>
								<div class="indent-content content-color viedoPrice "></div>
							</li>
							<li>
								<div class="indent-title">客户信息</div>
								<div class="indent-content">客户名称</div>
								<div class="indent-content-mid">客户联系人</div>
								<div class="indent-content">客户电话</div>
							</li>
							<li class="li-margin">
								<div class="indent-title "></div>
								<div class="indent-content content-color userName"></div>
								<div class="indent-content-mid content-color userContact"></div>
								<div class="indent-content content-color userPhone"></div>
							</li>
							<li>
								<div class="indent-title">供应商信息</div>
								<div class="indent-content ">供应商名称</div>
								<div class="indent-content-mid ">供应商联系人</div>
								<div class="indent-content ">供应商电话</div>
							</li>
							<li class="li-margin">
								<div class="indent-title"></div>
								<div class="indent-content content-color teamName"></div>
								<div class="indent-content-mid content-color teamContact"></div>
								<div class="indent-content content-color teamPhone"></div>
							</li>
							<li>
								<div class="indent-title hide">项目描述</div>
								<div class="indent-content-area indent-area hide"></div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="indentfile">
				<div class="indentfile-title">
					<label class="indentfile-title-text">项目文件</label>
				<div class="loadmore-file hide" id="loadmore-fileGIG">
					<div class="load-word">加载中</div>
					<div class="spinner">
						<div class="bounce1"></div>
						<div class="bounce2"></div>
						<div class="bounce3"></div>
					</div>
				</div>
					<r:permission uri="/addResource">
					 
						<button class="upload-file-btn border-btn" id="upload-file-btn-id">上传</button>
					 	
					</r:permission>
					<input type="file" name="addfile" id="addfile">
				</div>
				<div class="file-table"></div>
				
				<div class="loadMoreCus more-file-btn" id="more-file-btn">
						<div style="display: inline-block;" id="fileWord">展开更多</div>
						<img id="more-FileImg" style="display: inline-block; position: relative; left: 10px;"
							src="${imgPath }/flow/getMore.png" class="open" />
					</div>

			</div>

			<div class="message-div">
				<div class="message-title">
					<label class="message-title-text">留言板</label>
				</div>
				
				<div class="message-table-div">
					<r:permission uri="/addComment">
						<textarea class="comment"></textarea>

						<div id="loadHeight">
						 <button class="comment-btn border-btn">提交</button>
						</div>
					</r:permission>
					<div class="loadmore-Comment hide" id="loadmore-CommentGIF">
					<div class="load-word">加载中</div>
					<div class="spinner">
						<div class="bounce1"></div>
						<div class="bounce2"></div>
						<div class="bounce3"></div>
					</div>
				</div>
					<r:permission uri="/getAllComment">
						<table class="message-table">
						</table>
				
					<div class="loadMoreCus more-comment" id="more-comment">
						<div style="display: inline-block;" id="more-comment-text">展开更多</div>
						<img id="more-commentImg"
							style="display: inline-block; position: relative; left: 10px;"
							src="${imgPath }/flow/getMore.png" class="open" />
					</div>
					</r:permission>
				</div>
			</div>
		</div>
	</div>


	<!-- foot -->
  <!-- foot -->
         					<div class="foot3">
                                <div class="footContent">
                                    <div class="contentTop">
                                        <div class="topItem codeWidth">
                                            <div class="Twocode"></div>
                                            <div class="smWord">扫一扫 关注官方微信</div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>登录</a></div>
                                            <div class="cusLogin iconItem"><a href="<spring:url value="/login?role=user" />">客户登录</a></div>
                                            <div class="proLogin iconItem"><a href="<spring:url value="/login?role=director" />">导演登录</a></div>
                                            <div class="manLogin iconItem"><a href="<spring:url value="/mgr/login" />">管家登录</a></div>
                                            <div class="reg iconItem"><a href="<spring:url value="/register" />">注册</a></div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>关于拍片网</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/about-us.html' />">了解我们</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/member.html#join-us' />">加入我们</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/company-activity.html' />">公司活动</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/member.html#activityPart' />">团队介绍</a></div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>服务</a></div>
                                            <div class="noiconItem" ><a href="<spring:url value='/order-flow.html' />">服务流程</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/company-service.html#servicePart' />">服务协议</a></div>
<%--                                             <div class="noiconItem"><a href="<spring:url value="/login" />">找拍摄团队</a></div>
                                            <div class="noiconItem"><a href="<spring:url value="/provider/login" />">我要发作品</a></div> --%>
                                        </div>
                                        <div class="topItem onLineWidth">
                                            <div class="title"><a>在线联系我们</a></div>
                                            <div class="cusSer iconItem"><a href="tencent://message/?uin=2640178216&Site=qq&Menu=no">客户客服</a></div>
                                            <div class="proSer iconItem"><a href="tencent://message/?uin=3299894058&Site=qq&Menu=no">导演客服</a></div>
                                            <div class="email iconItem"><a href="mailto:bdmarket@paipianwang.cn">bdmarket@paipianwang.cn</a></div>
                                        </div>
                                        <div class="topItem">
                                            <div class="title"><a>咨询电话</a></div>
                                            <div class="tel"><a href="tel:4006609728">400-660-9728</a></div>
                                            <div class="workTime"><a>工作时间 9:00-18:00  (周一至周五)</a></div>
                                        </div>
                                    </div>
                                    <div class="contentBottom">
                                        <div>版权信息</div>
                                        <div>本站视频作品采用知识共享署名-非商业性使用.本站不提供任何视听上传服务,</div>
                                        <div>所有内容均来自视频分享站点所提供的公开引用资源.</div>
                                        <div>© 2014 攀峰文化 京ICP备 14036662号-1 | 百度统计 站长统计</div>
                                    </div>
                                </div>
                            </div>
                           
                            <!--新版底部-->
	</div>

	<!-- photo Modal start -->
	<div class="modal" id="mymodal" data-backdrop="static"
		data-keyboard=true>
		<div class="modal-dialog">
			<div class="modal-content model-distance" id="mymodal-content">
				<div class="modal-body" id="mymodal-body">
					<div class="progress progress-striped active">
						<div class="progress-bar progress-bar-success" role="progressbar"
							aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
							style="width: 0;"></div>
					</div>
					<div class="alert alert-warning" role="alert">完成上传之前请勿关闭页面</div>
				</div>
			</div>
		</div>
	</div>
	<!-- photo Modal end -->

	<!-- toolbar modal begin -->
	<div class="modal fade upload-window" id="toolbar-modal">
		<!-- 	<img class="circle-img" src="/resources/images/flow/circle.png" id="circle-img-id"></img> -->
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<!-- <div class="common-icons-know-us-close-icon modal-icon"
							data-dismiss="modal" aria-label="Close"></div> -->
							<img class="canclemodal" src="/resources/images/flow/canclemodal.png">
						<dl>
							<dt>
								<h1 id="modal-h3-first">选择文件</h1>
								<input readonly="readonly" class="upload-text"
									id="upload-file-name" placeholder="请选择文件" />
								<!-- <button class="upload-btn red-small-btn" id="upload-btn-id">浏览</button> -->
								<div id="picker" class="upload-btn">浏览</div>
							</dt>
							<dt>
								<h2 id="modal-h3-first">选择分类</h2>
								<input id="input-value" class="input-select"
									readonly="readonly" placeholder="未选择"></input> <img
									class="select-image" src="/resources/images/flow/select.png">
								<ul class="ul-option" id="ul-select">
								</ul>
							</dt>
							<dt>
								<button class="select-true-btn red-btn" id="upload-circle-btn">上传</button>
								<button class="select-cancle-btn gray-btn" id="cancle-btn">取消</button>
							</dt>
						</dl>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal end -->
	<!-- toolbar modal begin -->
	<div class="modal fade upload-window" id="toolbar-check">
		<div class="modal-dialog">
			<div class="modal-content">

				<div class="modal-body checkstep">
					<img class="canclestep" id="canclestep"
						src="/resources/images/flow/canclemodal.png">
					<button class="red-btn sure-margin" id="sureCheck">确定</button>
					<label class="check-step" id="sureToNext">确定下一步吗</label>
					<div class="check-step-load hide" id="listLoadCheck">
						<div class="load-word">效验中</div>
						<div class="spinner">
							<div class="bounce1"></div>
							<div class="bounce2"></div>
							<div class="bounce3"></div>
						</div>
					</div>
					<button class="gray-btn cancle-margin" id="noSureCheck">取消</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade upload-window" id="toolbar-pause-re">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body checkstep">

					<div class="pauseWord">
						<img class="canclestepPause" id="canclestepPause"
							src="/resources/images/flow/canclemodal.png">
						<div id="pauseWord">确定暂停吗？</div>
						<div class="hide" id="pauseError">请填写原因</div>
						<div class="pauseTop" id="errorReason"
							style="display: inline-block;">
							<textarea class="form-control textareaInfo" id="reason"
								placeholder="原因"></textarea>
						</div>

					</div>
					<div class="pauseBtn">
						<button class="red-btn puaseLeft" id="sureControl">确定</button>
						<button class="gray-btn puaseRight" id="cancleControl">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade upload-window" id="toolbar-no-message">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body checkstep">
					<label class="check-message"></label>
					<button class="red-btn sure-message" id="toolbar-no-message-btn">确定</button>
				</div>
			</div>
		</div>
	</div>


	<div class="modal fade upload-window" id="close-list">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body checkstep">
					<img class="canclestep" id="canclestepClose"
						src="/resources/images/flow/canclemodal.png">
					<button class="red-btn sure-margin" id="sureClose">确定</button>
					<label class="check-step">确定关闭当前订单吗</label>
					<button class="gray-btn cancle-margin" id="falseClose">取消</button>
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal end -->

	<!-- toolbar modal begin 分享 -->
	<div class="modal fade upload-window" id="toolbar-share">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="pay-title-link">链接信息</div>
				<img class="canclePayLink" id="canclePayLink"
					src="/resources/images/flow/canclemodal.png">
				<div id="copySuccess" class="copyDiv">
					<div class="copySuccessImg">
						<img src="${imgPath }/flow/linkGreen.png" />
					</div>
					<div class="copySuccess">复制成功</div>
				</div>
				<div class="input-group getShareLink">
					<input type="text" class="form-control getShareLinkInput"
						value="http:测试测试" id="shareLinkList"> <span
						class="input-group-addon getShareLinkBtn" id="copyShareLink"
						data-clipboard-target="shareLinkList">复制链接</span>
				</div>
				<div class="pay-bottom-link">
					<div class="pay-redLink-btn">返回</div>
				</div>

				<div class="input-group getShareLink hide">
					<dl class="share-list">
						<dt>分享:</dt>
						<dd>
							<img alt="分享至微信" class="-mob-share-weixin share" title="分享至微信"
								src="/resources/images/icons/webcat.png"
								data-no='<c:out value="${product.productId }" />'>
						</dd>
						<dd>
								<img alt="分享至qq空间" class="-mob-share-qzone share" title="分享至qq空间"
								src="/resources/images/icons/qqzone.png"
								data-no='<c:out value="${product.productId }" />'>
						</dd>
						<dd>
							<img alt="分享至qq" class="-mob-share-qq share" title="分享至qq"
								src="/resources/images/icons/qq.png"
								data-no='<c:out value="${product.productId }" />'>
						</dd>
						<dd>
							<img alt="分享至新浪微博" class="-mob-share-weibo share" title="分享至新浪微博"
								src="/resources/images/icons/weibo.png"
								data-no='<c:out value="${product.productId }" />'>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal end -->

	<!-- toolbar modal begin 线上线下 -->
	<div class="modal fade upload-window" id="toolbar-OnOff">
		<div class="modal-dialog">
			<div class="modal-content">

				<div class="payInfo payInfoheight" id="payInfo">
					<img class="canclePay" id="canclePay"
						src="/resources/images/flow/canclemodal.png">
					<div class="pay-title" id="payTitleId">收款信息</div>
					<div class="payLeft ">
						<ul id="OnlineInfo">
							<li>
								<div class="payInline" id="payTime-outlineDiv">
									<div class="payBigWord" id="pay-time">发起收款时间</div>
									<input id="payTime-outline" readonly="readonly"
										class="pay-input form-control hide paySmallWord"></input> <input
										disabled="disabled" id="payTime-online"
										class="pay-input form-control paySmallWord" value="231231231"></input>
									<div class="pay-error hide" id="payTime-outlineError">错误提示</div>
								</div>

								<div class="payInline payRight" id="order-outlineDiv">
									<div class="payBigWord" id="payOrder">支付单号</div>
									<input id="order-outline"
										class="pay-input form-control hide paySmallWord"></input> <input
										disabled="disabled" id="order-online"
										class="pay-input form-control paySmallWord"></input>
									<div class="pay-error hide" id="order-outlineError">错误提示</div>
								</div>
							</li>

							<li>
								<div class="payInline" id="projectNameDiv">
									<div class="payBigWord">项目名称</div>
									<input class="pay-input form-control paySmallWord"
										id="projectName"></input>
									<div class="pay-error hide" id="projectNameError">错误提示</div>
								</div>

								<div class="payInline payRight" id="cusNameDiv">
									<div class="payBigWord" id="pay-people">付款方</div>
									<input class="pay-input form-control paySmallWord" id="cusName"}></input>
									<div class="pay-error hide" id="cusNameError">错误提示</div>
								</div>
							</li>

							<li>
								<div id="payMoneyDiv">
									<div class="payBigWord">支付金额</div>
									<input class="pay-input form-control paySmallWord"
										id="payMoney"></input><label class="yuan">元</label>
									<div class="pay-error-price hide" id="payMoneyError">错误提示</div>
								</div>
							</li>
						</ul>

						<div class="createLink hide" id="link">
							<ul>
								<li>
									<div class="input-group getLink">
										<input type="text" class="form-control getLinkInput"
											value="http://www.apaipian.com" id="shareLink"> <span
											class="input-group-addon getLinkBtn" id="copyLink"
											data-clipboard-target="shareLink">复制链接</span>
									</div>
								</li>
							</ul>
						</div>
					</div>



					<div class="pay-bottom">
						<div id="pay-sure" class="pay-red-btn">确认</div>
						<input id="checkWay" class="hide" value="0"></input>
					</div>
					<div id="copyListSuccess">
						<div class="copyListSuccessImg">
							<img src="${imgPath }/flow/linkGreen.png" />
						</div>
						<div class="copyListSuccess">复制成功</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal end -->

	<!-- wang -->
	<div class="modal fade upload-window" id="next-modal">
		<!-- 	<img class="circle-img" src="/resources/images/flow/circle.png" id="circle-img-id"></img> -->
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<!-- <div class="common-icons-know-us-close-icon modal-icon"
							data-dismiss="modal" aria-label="Close"></div> -->
					<img class="checkListClose" 
						src="/resources/images/flow/canclemodal.png">
					<div>
						<ul id="checkListUL">
						</ul>
						<label class="closeLoad"  id="checkListLabel">加载中.....</label>
						<div class="checkListTrue">
							<button class="red-btn hide" id="nextflowbtn" >确定</button>
							<button class="gray-btn" id="checkListcancle">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end -->

	<div class="modal fade upload-window" id="toolbar-list">
		<div class="modal-dialog">
			<div class="modal-content">
				<div id="showErrorList"
					style="margin-top: 20px; margin-bottom: 10px;"></div>
				<div class="pay-bottom-link">
					<div class="pay-redLink-btn" id="closeThis">返回</div>
				</div>
			</div>
		</div>
	</div>

	<div class="-mob-share-ui-button -mob-share-open" id="share-open"
		style="visibility: hidden;"></div>
	<div class="-mob-share-ui" style="display: none">
		<ul class="-mob-share-list">
			<li class="-mob-share-weixin share"><p>微信</p></li>
			<li class="-mob-share-qq"><p>QQ</p></li>
			<li class="-mob-share-weibo share"><p>新浪微博</p></li>
			<li class="-mob-share-qzone"><p>QQ空间</p></li>
		</ul>
		<div class="-mob-share-close">取消</div>
	</div>
	<div class="-mob-share-ui-bg"></div>
	<script id="-mob-share"
		src="https://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
	<input type="hidden" id="service-key" value="${key}">
</body>
</html>