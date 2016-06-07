<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/lib/h5bp/h5bp.css" var="h5bpCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
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
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/flow/left_menu_min.js" var="leftjs" />
<spring:url value="/resources/lib/My97DatePicker/WdatePicker.js"
	var="WdatePicker" />

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
<spring:url value="/resources/img" var="imgPath" />
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
<script src="${leftjs}"></script>
<script src="${WdatePicker }"></script>
<script src="${stepjquery }"></script>
<script src="${indexjs }"></script>
<script src="${tetherjs }"></script>
<script src="${dropjs }"></script>
<script src="${modelJs }"></script>


<script type="text/javascript" src="${ajaxfileuploadJs}"></script>
</head>
<body  >
<!-- <div class="circle-div"></div> -->

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
					<a href="<spring:url value='/provider/portal' /> " class="header-item" >信息管理</a>
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
	

		<div class="left-page" >
			<div class="left-title">
				<r:permission uri="/add-view">
					<div class="newBtn">
		                <img src="${imgPath }/flow/plus.png" class="left-title-images " title="添加项目">
		                <label class="left-title-text-top">新建项目</label>
				    </div>
			    </r:permission>
				<label class="left-title-text">所有项目</label>
			</div>
			
			<div class="indentdiv">
			<!-- 	<table class="indentlist projectliststyle">
				</table>
				<table class="indentlisthistory projectliststyle">
				</table> -->
				
			<div id="content" >
			    <div class="menu" id="menuId">
			        <ul>
			        <li><a id="doingProject" >进行中项目</a>
			            <ul id="doingProjectId" >
			              
			                <li><a id="myProject" >负责项目</a>
			                    <ul id="myProjectId">
			                      <!--   <li><a class="title-content" href="#">Subitem 1</a></li>
			                        <li><a class="title-content" href="#">Subitem 2</a></li>
			                        <li><a class="title-content" href="#">Subitem 3</a></li>
			                        <li><a class="title-content" href="#">Subitem 4</a></li> -->
			                    </ul>
			                </li>
			                
			               <r:identity role="employee">
			                 <li ><a id="helpProject" >协同项目</a>
			                    <ul id="helpProjectId">
			                       
			                    </ul>
			                </li>
			               </r:identity>
			               
			                 <li><a id="pauseProject" >暂停项目</a>
					            <ul id="pauseProjectId">
					               
					            </ul>
					        </li>
			            </ul>
			        </li>
			    
			        <li><a id="historyProject">历史项目</a>
			            <ul id="historyProjectId">
			                         
			            </ul>
			        </li>
			     
			    </ul>
			    </div>
			</div>
				
				
			</div>
		</div>
  


     <div class="noproject hide">
       <div class="no-poject-div" id="no-poject-div">
       	<ul>
        	<li><img src="/resources/img/flow/warning.png"></li>
        	<r:identity role="provider">
        		<li><label>当前没有项目分配</label></li>
        	</r:identity>
        	<r:identity role="customer">
        		<li><label>当前没有项目启动</label></li>
        	</r:identity>
        	<%-- <r:identity role="manager">
        		<li><label>当前没有任何项目,立即创建一个</label></li>
        		<li><button class="red-btn" id="new-project">确定</button></li>
        	</r:identity> --%>
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
						<img src="${imgPath }/flow/report.png" class="left-title-images"  title="导出报表">
						<label class="left-title-text-top">导出报表</label>
					 </div>   
				</r:permission>
				</div>
	            <label class="flow-title-text">项目进度</label>
				<div class="step_context step_margin test" data-open-on="hover">
				</div>
					<div class="drop-content" style="display: none;">
						<a href="#" class="drop-a"><img src="/resources/img/flow/point.png"/></a>
						<a href="#" class="drop-a content-title" ></a>
			            <a href="#" class="description-c"></a>
				   </div>


                <div class="descriptiondiv top-margin">
                <ul class="time-div firstline div-margin-sm ">
                	<li class="timeword" id="cu_gt" ></li>
                	<li class="stepword" id="stepword_gt">未完成</li>
                	<li><img class="firstline" src="/resources/images/flow/timeline.png"/></li>
                	<li class="li-top  opacity-li" id="div_gt"><dl class="hovertime">
                		   <dt class="stepword">计划完成时间</dt>
                		   <dd class="timeword" id="et_gt">未设置</dd>
                        </dl>
                	</li>
                </ul>

                <ul class="time-div secondline">
                	<li class="timeword" id="cu_fa"></li>
                	<li class="stepword" id="stepword_fa">未完成</li>
                	<li><img class="secondline" src="/resources/images/flow/timeline.png"/></li>
                	<li class="li-top opacity-li" id="div_fa"><dl class="hovertime">
                		   <dt class="stepword">计划完成时间</dt>
                		   <dd class="timeword" id="et_fa">未设置</dd>
                        </dl>
                	</li>
                </ul>

                <ul class="time-div thirdline div-margin-mid">
                	<li class="timeword" id="cu_sw"></li>
                	<li class="stepword" id="stepword_sw" >未完成</li>
                	<li><img class="thirdline" src="/resources/images/flow/timeline.png"/></li>
                	<li class="li-top  opacity-li" id="div_sw" ><dl class="hovertime">
                		   <dt class="stepword">计划完成时间</dt>
                		   <dd class="timeword" id="et_sw">未设置</dd>
                        </dl>
                	</li>
                </ul>

                 <ul class="time-div fourline div-margin-large">
                	<li class="timeword" id="cu_zz"></li>
                	<li class="stepword " id="stepword_zz">未完成</li>
                	<li><img class="fourline " src="/resources/images/flow/timeline.png"/></li>
                	<li class="li-top opacity-li" id="div_zz"><dl class="hovertime">
                		   <dt class="stepword">计划完成时间</dt>
                		   <dd class="timeword" id="et_zz">未设置</dd>
                        </dl>
                	</li>
                </ul>

                 <ul class="time-div fiveline  div-margin-xl">
                	<li class="timeword" id="cu_jf"></li>
                	<li class="stepword " id="stepword_jf">完成</li>
                	<li><img class="fiveline " src="/resources/images/flow/timeline.png"/></li>
                	<li class="li-top opacity-li" id="div_jf"><dl class="hovertime">
                		   <dt class="stepword" >计划完成时间</dt>
                		   <dd class="timeword" id="et_jf">未设置</dd>
                        </dl>
                	</li>
                </ul>
                </div>	
				<r:multPermission uri3="/completeTask" uri2="/suspendProcess" uri="/project/cancelProject">
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
			<div class="indentinfo">
				<div class="indentinfo-title">
					<label class="indentinfo-title-text">项目详细信息</label>
					<r:permission uri="/project/update-indentProject">
						<button class="change-file-btn border-btn" type="button" id="upload-info-btn-id">修改</button>
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
								<div class="indent-content-area indent-area hide" ></div>
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
					<input type="file" name="addfile"  id="addfile">
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
		<!-- 底栏 end -->
	</div>
	
	<!-- photo Modal start -->
		<div class="modal" id="mymodal" data-backdrop="static" data-keyboard=true>
			<div class="modal-dialog">
				<div class="modal-content model-distance" id="mymodal-content">
					<div class="modal-body" id="mymodal-body">
						<div class="progress progress-striped active">
							<div class="progress-bar progress-bar-success" role="progressbar" 
							aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0;"></div>
						</div>
						<div class="alert alert-warning" role="alert">完成上传之前请勿关闭页面</div>
					</div>
				</div>
			</div>
		</div>
		<!-- photo Modal end -->
	
	<!-- toolbar modal begin -->
		<div class="modal fade upload-window" id="toolbar-modal">
		<!-- 	<img class="circle-img" src="/resources/img/flow/circle.png" id="circle-img-id"></img> -->
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						<!-- <div class="common-icons-know-us-close-icon modal-icon"
							data-dismiss="modal" aria-label="Close"></div> -->
							<img class="canclemodal" src="/resources/img/flow/canclemodal.png">
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
								<button class="select-true-btn red-btn" id="upload-circle-btn">上传</button>
								<button class="select-cancle-btn gray-btn" id="cancle-btn">取消</button>
							</dt>
						</dl>
					</div>
				</div>
			</div>
		</div>
		<!-- toolbar modal end -->
					<!-- toolbar modal begin -->
		<div class="modal fade upload-window" id="toolbar-check">
			<div class="modal-dialog">
				<div class="modal-content" >
					
					<div class="modal-body checkstep">
					<img class="canclestep"  id="canclestep" src="/resources/img/flow/canclemodal.png">
		                   <button class="red-btn sure-margin">确定</button>
		                   <label class="check-step" >确定下一步吗</label>
		                   <button class="gray-btn cancle-margin">取消</button>   
					</div>
				</div>	
			</div>
		</div>
		
		<div class="modal fade upload-window" id="toolbar-no-message">
		<div class="modal-dialog">
			<div class="modal-content" >
				<div class="modal-body checkstep">
				   <label class="check-message" ></label>
                   <button class="red-btn sure-message" id="toolbar-no-message-btn">确定</button>
				</div>
			</div>
		</div>
		</div>
		<!-- toolbar modal end -->
	
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
	<input type="hidden" id="service-key" value="${key}">
</body>
</html>