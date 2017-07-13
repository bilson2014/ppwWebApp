<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/providerFlow/infoStepUpLoad.css" var="providerLeaderCss"/>
<spring:url value="/resources/css/provider/step-dc-style2.css" var="providerStepCss2"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/providerFlow/infoStepUpLoad.js" var="leaderJs"/>
<spring:url value="/resources/images" var="path" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs" />
<spring:url value="/resources/js/juicer.js" var="juicerJs" />

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
	<title>供应商引导页-拍片网</title>
	<link rel="stylesheet" type="text/css" href="${bootstrapCss}">
	<link rel="stylesheet" type="text/css" href="${providerLeaderCss}">
	<link rel="stylesheet" type="text/css" href="${providerStepCss2}">
	<link rel="stylesheet" type="text/css" href="${webuploaderCss}">
	<link rel="stylesheet" type="text/css" href="${datepickerCss}">
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs}"></script>
	<script src="${datepickerJs}"></script>
	<script src="${datepickerZhJs}"></script>
	<script src="${juicerJs}"></script>
	<script src="${webuploaderJs}"></script>
	<script src="${leaderJs}"></script>
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
  	<input id="unqiueId" value="${unqiueId}" />
    <jsp:include flush="true" page="../header.jsp"></jsp:include> 
	<div class="page" >
	  	       
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
		                             <div class='videoCard'>                           
											<div class='videoContent'>                      
											   	<div id='' class='item'>			
												    <div class='videoName'>名字</div>   
												    <div class='videoState'>等待上传</div>
													 <div class="progress progress-striped active">
													    <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" style="width: 50%"></div>
													</div>		
												</div>                                          
										    </div>
									  </div>
									  
									   <div class='videoCard'>                           
											<div class='videoContent'>                      
											   	<div id='' class='item'>			
												    <div class='videoName'>名字</div>   
												    <div class='videoState'>等待上传</div>
													 <div class="progress progress-striped active">
													    <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" style="width: 50%"></div>
													</div>		
												</div>                                          
										    </div>
									  </div>  
							     </div>
							     <div class="showErrorUp"></div>
							     <div class="multDiv">
							           <div class="btn-c-g" id="cancleMult">取消</div>
							           <div class="btn-c-r" id="submit-multip">开始上传</div>
							           <div class="picker" id='picker'>选择文件</div>
							     </div>		                   
	                        </div>
	                  <!--批量end -->
	                  
	                  <!--作品列表 -->
	                        <div class="uploadChoose" id="uploadChoose">
                                 <div class="ucTitle">作品列表</div>
	                             <div class="newProduct" id="newProduct">
									<div></div>
									<span>新建作品</span>
								 </div>
	                             <div class="moreUp" id="moreUp">
									<div></div>
									<span>批量上传作品</span>
								 </div>
								 <div class="uploadLine"></div>
								 <div class="setContent">
								     <div class="noProduct">暂无作品</div>
											 <div class="productCard">
														<img class="media-object playCBtn" src="/resources/images/index/noImg.jpg">
													    <img class="playIcon playCBtn" src="/resources/images/index/play-icon.png">
													<input type="hidden" id="media-video" value="group1/M00/00/1F/Cgqp51lfN9iAft6OAAx1nq6Ls5Q189.mp4">
													<div class="mid  nC">
														<div class="title">
															<span></span> <span>snsdyvideodownlo</span>
														</div>
														<div class="content">
															<div class="cTitle">建议：</div>
															<div class="cContent">
															</div>
														</div>
													</div>
													<div class="lastContent">
													
													<div class="edit btn-c-r product-edit" data-id="14338">
																<div></div>
																<div>编辑</div>
													</div>
														
													<div class="del btn-c-g" data-id="14338">
															<div></div>
															<div>删除</div>
														</div>
													</div>
											</div>
											<div class="productCard">
														<img class="media-object playCBtn" src="/resources/images/index/noImg.jpg">
													    <img class="playIcon playCBtn" src="/resources/images/index/play-icon.png">
													<input type="hidden" id="media-video" value="group1/M00/00/1F/Cgqp51lfN9iAft6OAAx1nq6Ls5Q189.mp4">
													<div class="mid  nC">
														<div class="title">
															<span></span> <span>snsdyvideodownlo</span>
														</div>
														<div class="content">
															<div class="cTitle">建议：</div>
															<div class="cContent">
															</div>
														</div>
													</div>
													<div class="lastContent">
													
													<div class="edit btn-c-r product-edit" data-id="14338">
																<div></div>
																<div>编辑</div>
													</div>
														
													<div class="del btn-c-g" data-id="14338">
															<div></div>
															<div>删除</div>
														</div>
													</div>
											</div>
											<div class="productCard">
														<img class="media-object playCBtn" src="/resources/images/index/noImg.jpg">
													    <img class="playIcon playCBtn" src="/resources/images/index/play-icon.png">
													<input type="hidden" id="media-video" value="group1/M00/00/1F/Cgqp51lfN9iAft6OAAx1nq6Ls5Q189.mp4">
													<div class="mid  nC">
														<div class="title">
															<span></span> <span>snsdyvideodownlo</span>
														</div>
														<div class="content">
															<div class="cTitle">建议：</div>
															<div class="cContent">
															</div>
														</div>
													</div>
													<div class="lastContent">
													
													<div class="edit btn-c-r product-edit" data-id="14338">
																<div></div>
																<div>编辑</div>
													</div>
														
													<div class="del btn-c-g" data-id="14338">
															<div></div>
															<div>删除</div>
														</div>
													</div>
											</div>
											<div class="productCard">
														<img class="media-object playCBtn" src="/resources/images/index/noImg.jpg">
													    <img class="playIcon playCBtn" src="/resources/images/index/play-icon.png">
													<input type="hidden" id="media-video" value="group1/M00/00/1F/Cgqp51lfN9iAft6OAAx1nq6Ls5Q189.mp4">
													<div class="mid  nC">
														<div class="title">
															<span></span> <span>snsdyvideodownlo</span>
														</div>
														<div class="content">
															<div class="cTitle">建议：</div>
															<div class="cContent">
															</div>
														</div>
													</div>
													<div class="lastContent">
													
													<div class="edit btn-c-r product-edit" data-id="14338">
																<div></div>
																<div>编辑</div>
													</div>
														
													<div class="del btn-c-g" data-id="14338">
															<div></div>
															<div>删除</div>
														</div>
													</div>
											</div>
								 </div>
								   <div class="bottom-div">
		                           	 <Button class="gy-btn"  id="step3Pre">上一步</Button>  
		                           	 <Button class="red-btn btn-c-r" id="step3Next">下一步</Button>    
		                           </div>
	                        </div>
	                    
	                        <!--批量 END-->
						
	             </div>
			  
			  
			  
			  
	      </div>
	      
	  </div>    		
	<!-- foot -->
         					 <jsp:include flush="true" page="../foot.jsp"></jsp:include> 
                            <!--新版底部-->
	
	

	
	
</body>

</html>