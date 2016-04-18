<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/lib/h5bp/h5bp.css" var="h5bpCss" />
<spring:url value="/resources/css/common.css" var="commonCss" />

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
<spring:url value="/resources/lib/jquery.cookie/jquery.cookie.js"
	var="cookiejs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/lib/My97DatePicker/WdatePicker.js"
	var="WdatePicker" />

<spring:url value="/resources/js/model.js" var="modelJs" />
<spring:url value="/resources/css/manager/flow.css" var="index" />
<spring:url value="/resources/css/flow/step-dc-style1.css"
	var="stepdcstyle" />
<spring:url value="/resources/js/flow/step-jquery-dc.js"
	var="stepjquery" />
<spring:url value="/resources/js/flow/flow.js" var="indexjs" />
<spring:url value="/resources/lib/dist/tether.min.js" var="tetherjs" />
<spring:url value="/resources/lib/dist/js/drop.min.js" var="dropjs" />
<spring:url value="/resources/js/flow/ajaxfileupload.js"
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

<link rel="stylesheet" href="${index }">
<link rel="stylesheet" href="${stepdcstyle }">
<link rel="stylesheet" href="${dropTheme }">
<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${blockUIJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${WdatePicker }"></script>
<script src="${stepjquery }"></script>
<script src="${cookiejs }"></script>
<script src="${indexjs }"></script>
<script src="${tetherjs }"></script>
<script src="${dropjs }"></script>
<script src="${modelJs }"></script>


<script type="text/javascript" src="${ajaxfileuploadJs}"></script>
<style>
.drop-content{
	background-color: #fff;
	width:160px;
	position:absolute;
	left: -170px;
}
.drop-content a{
display: inline-block;
width: 100%;
-webkit-animation-duration: 0.8s;
animation-duration: 0.8s;
-webkit-animation-fill-mode: both;
animation-fill-mode: both;
-webkit-animation-name: bounceIn;
animation-name: bounceIn;
}			
@-webkit-keyframes bounceIn {
0% {
  opacity: 0;
  -webkit-transform: scale3d(.3, .3, .3);
  transform: scale3d(.3, .3, .3);
}

20% {
  -webkit-transform: scale3d(1.1, 1.1, 1.1);
  transform: scale3d(1.1, 1.1, 1.1);
}

40% {
  -webkit-transform: scale3d(.9, .9, .9);
  transform: scale3d(.9, .9, .9);
}

60% {
  opacity: 1;
  -webkit-transform: scale3d(1.03, 1.03, 1.03);
  transform: scale3d(1.03, 1.03, 1.03);
}

80% {
  -webkit-transform: scale3d(.97, .97, .97);
  transform: scale3d(.97, .97, .97);
}

to {
  opacity: 1;
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
}
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

#circle-img-id{
-moz--animation:circle 1s infinite linear;/*匀速 循环*/
-webkit-animation:circle 1s infinite linear;/*匀速 循环*/
-o--animation:circle 1s infinite linear;/*匀速 循环*/
}

@-moz-keyframes circle{
0%{ transform:rotate(0deg); }
100%{ transform:rotate(-360deg); }
}
@-o-keyframes circle{
0%{ transform:rotate(0deg); }
100%{ transform:rotate(-360deg); }
}


@-webkit-keyframes circle{
0%{ transform:rotate(0deg); }
100%{ transform:rotate(-360deg); }
}
</style>

</head>
<body>
<div class="circle-div"></div>
	
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
		<div class="left-page">
			<div class="left-title">
				<label class="left-title-text">所有项目</label>
			</div>
			<r:permission uri="/add-view">
			<div class="newBtn">
				<img src="/resources/img/flow/add.png" class="newBtn-img">
			</div>
			</r:permission>
			<div class="indentdiv">
				<table class="indentlist">
				</table>
			</div>
		</div>
		<div class="right-page">
			<div class="flowblock">
				<div class="flow-title">
					<label class="flow-title-text">项目流程</label>
				</div>
				<div class="step_context step_margin test" data-open-on="hover">
				</div>
					<div class="drop-content" style="display: none;">
						<a href="#" class="drop-a"><img src="/resources/img/flow/point.png"/></a>
						<a href="#" class="drop-a content-title" ></a>
			            <a href="#" class="description-c"></a>
				</div>
				<div class="descriptiondiv top-margin">
					<div class="description-title-text ">阶段时间：</div>
					<div class="time-div-title">预计</div>
					<div >
					    <div class="time-div div-margin-sm " id="et_gt"></div>
                       	<div class="time-div div-margin" id="et_fa"></div>
                       	<div class="time-div div-margin" id="et_sw"></div>
                       	<div class="time-div div-margin-mid" id="et_zz"></div>
                       	<div class="time-div div-margin-mid"  id="et_jf"></div>
					</div>
                    <div class="time-div-title">实际</div>
                  	<div class="mo-time">
					    <div class="time-div div-margin-sm " id="cu_gt"></div>
                       	<div class="time-div div-margin" id="cu_fa"></div>
                       	<div class="time-div div-margin" id="cu_sw"></div>
                       	<div class="time-div div-margin-mid"  id="cu_zz"></div>
                       	<div class="time-div div-margin-mid" id="cu_jf"></div>
					</div>
					<div class="description-title-text">方案描述：</div>
					<br>
					<br> 
					<label class="description-text"></label>
				</div>
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

				</div>
			</div>
			<div class="indentinfo">
				<div class="indentinfo-title">
					<label class="indentinfo-title-text">项目详细信息</label>
					<r:permission uri="/project/update-indentProject">
					<button class="change-file-btn border-btn" id="upload-info-btn-id">修改</button>
					</r:permission>
				</div>
				<div class="indentinfo-table-div">
					<div class="indentinfo-table">
						<ul>
							<li>
								<div class="indent-title">项目信息</div>
								<div class="indent-content">项目编号</div>
								<div class="indent-content">项目名称</div>
								<div class="indent-content">项目预算区间</div>
							</li>
							<li class="li-margin">
								<div class="indent-title "></div>
								<div class="indent-content content-color projectId"></div>
								<div class="indent-content content-color projectName"></div>
								<div class="indent-content content-color viedoPrice "></div>
							</li>
							<li>
								<div class="indent-title">客户信息</div>
								<div class="indent-content">客户名称</div>
								<div class="indent-content">客户联系人</div>
								<div class="indent-content">客户电话</div>
							</li>
							<li class="li-margin">
								<div class="indent-title "></div>
								<div class="indent-content content-color userName"></div>
								<div class="indent-content content-color userContact"></div>
								<div class="indent-content content-color userPhone"></div>
							</li>
							<li>
								<div class="indent-title">供应商信息</div>
								<div class="indent-content ">导演名称</div>
								<div class="indent-content ">导演联系人</div>
								<div class="indent-content ">导演电话</div>
							</li>
							<li class="li-margin">
								<div class="indent-title"></div>
								<div class="indent-content content-color teamName"></div>
								<div class="indent-content content-color teamContact"></div>
								<div class="indent-content content-color teamPhone"></div>
							</li>
							<li>
								<div class="indent-title">项目描述</div> 
								<textarea class="indent-area" ></textarea>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="indentfile">
				<div class="indentfile-title">
					<label class="indentfile-title-text">项目文件</label>
					<r:permission uri="/addResource">
					<button class="upload-file-btn border-btn" id="upload-file-btn-id">上传</button>
					</r:permission>
					<input type="file" name="addfile" id="addfile">
				</div>
				<div class="file-table">
				</div>
				<div class="more-file">
					<button class="more-file-btn border-btn">更多文件</button>
				</div>
			</div>

			<div class="message-div">
				<div class="message-title">
					<label class="message-title-text">留言板</label>
				</div>
				<div class="message-table-div">
					<r:permission uri="/addComment">
					<textarea class="comment"></textarea>
					<button class="comment-btn border-btn">提交</button>
					</r:permission>
					<r:permission uri="/getAllComment">
					<table class="message-table">
					</table>
					<button class="more-comment border-btn">更多评论</button>
					</r:permission>
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal begin -->
	<div>
		<div class="modal fade upload-window" id="toolbar-modal">
			<div class="circle-img" id="circle-img-id"></div>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						<div class="common-icons-know-us-close-icon modal-icon"
							data-dismiss="modal" aria-label="Close"></div>
						<dl>
							<dt>
								<h1 id="modal-h3-first">选择文件</h1>
								<input readonly="readonly" class="upload-text"
									id="upload-file-name" placeholder="请选择文件" />
								<button class="upload-btn red-small-btn" id="upload-btn-id">浏览</button>
							</dt>

							<dt>
								<h2 id="modal-h3-first">选择分类</h2>
								<input id="input-value" class="input-select"
									readonly="readonly" placeholder="未选择"></input> <img
									class="select-image" src="/resources/img/flow/select.png">
								<ul class="ul-option" id="ul-select">
								</ul>
							</dt>
							<dt>
								<button class="select-cancle-btn gray-btn" id="cancle-btn">取消</button>
								<button class="select-true-btn red-btn" id="upload-circle-btn">上传</button>
							</dt>
							<dd id="modal-dd-second">
								<input class="upload-input" type="file" id="uploadfile" />
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
		<!-- toolbar modal end -->
				<!-- toolbar modal begin -->
	<div>
	<div class="modal fade upload-window" id="toolbar-check">
		<div class="modal-dialog">
			<div class="modal-content" >
				<div class="modal-body checkstep">
                   <button class="red-btn sure-margin">确定</button>
                   <label class="check-step" style="background-color: red;">确定下一步吗</label>
                   <button class="gray-btn cancle-margin">取消</button>   
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal end -->
	</div>
	
	<div class="-mob-share-ui-button -mob-share-open" id="share-open" style="visibility: hidden;"></div>
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
	<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
</body>
</html>