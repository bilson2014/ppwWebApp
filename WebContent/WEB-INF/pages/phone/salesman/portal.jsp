<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/css/phone/play.css" var="playCss"/>
<spring:url value="/resources/css/phone/salesman/portal.css" var="portalCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/salesman/portal.js" var="portalJs"/>
<!-- imgPath -->
<spring:url value="/resources/img" var="imgPath"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<!-- iphone 手机默认全屏 -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<!-- 取消数字被识别为电话号码 -->
	<meta content="telephone=no" name="format-detection">
	<title>拍片网－移动端_产品页</title>
	<link rel="shortcut icon" href="${imgPath}/favicon.ico" >
	<link rel="stylesheet" href="${playCss}">
	<link rel="stylesheet" href="${portalCss}">
</head>
<body>

<div class="upload-window" id="toolbar-modal">
         
     	 <div class="closeVideo">
     	  <button id="closeBtn" type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="close-icon" aria-hidden="true">&times;</span></button>
        </div>
	         <div class="video-play-sections">
	        	<video controls id="recomment-video" src="" poster="" preload="auto" "></video>
	        </div>
        <div class="closeVideoBot" id="closeVideoBot"></div>
</div>

<div class="wrap">
	<input type="hidden" id="uniqueId" value="${uniqueId }"/>
	
	<div class="header">
			<!-- logo -->
			<dl>
				<dd>
					<a >
						<div class=""></div>
					</a>
				</dd>
				<dd>

					<a href="<spring:url value="/phone/salesman/${uniqueId }"/>" target="_self">
						<div class="logo"></div>
					</a>
				</dd>
				<dd>
				</dd>
			</dl>
		</div>
	
	   <div class="outside-div" >
            <div class="top-div">
	               <div class="title-word">经济实惠:</div>
				               <div class="title-content">
				               	    <div class="left-content">
				               	    	<label class="left-price" id="firstPrice"></label><label class="left-desc">元套餐</lable>
				                    </div>
				                     <div class="right-content">
				               	    	<label class="right-price">30<span class="right-desc">小时极速出片</span></label>
				               	    	<label class="right-price">HD<span class="right-desc">专业级高清拍摄制作</span></label>
				                    </div>
				                    
				               </div>
		              </div> 
            
		             <div class="inside-div"  id="first-video-section" >
			            <!--example  <div class="video-area-card">
				              <div class="video-play-section" id="first-video-section">
									<img class="video-play-section" src="http://test.apaipian.com:8080/product/img/product606-201605191420186152.JPG " />
							  </div>
							  <div class="video-content">
							     <ul>
							       <li class="font-title">sss</li>
		                           <li class="font-content">还是sOA啥事都静安寺殴打就的撒地加速的骄傲是京东丹娜丝殴打静安寺呕到家哦还是sOA啥事都静安寺殴打就的撒地加速的骄傲是京东丹娜丝殴打静安寺呕到家哦还是sOA啥事都静安寺殴打就的撒地加速的骄傲是京东丹娜丝殴打静安寺呕到家哦还是sOA啥事都静安寺殴打就的撒地加速的骄傲是京东丹娜丝殴打静安寺呕到家哦还是sOA啥事都静安寺殴打就的撒地加速的骄傲是京东丹娜丝殴打静安寺呕到家哦</li>					      
							       <li><a href="" class="btn-red-common video-btn">立即下单</a></li>
							     </ul>
							  </div> -->
						</div>
						
				
	   </div>
	   
	   	   <div class="outside-div margin-div" >
	            <div class="top-div">
		               <div class="title-word">高性价比:</div>
					               <div class="title-content">
					               	    <div class="left-content">
					               	    	<label class="left-price" id="secondPrice"></label><label class="left-desc">元套餐</lable>
					                    </div>
					                     <div class="right-content">
					               	    	<label class="right-price">48<span class="right-desc">小时极速出片</span></label>
					               	    	<label class="right-price">4K<span class="right-desc">广告级拍摄制作</span></label>
					                    </div>
					               </div>
			              </div> 
	            
			             <div class="inside-div"  id="second-video-section" >
				        </div>
	   		</div>
	   
	   	   <div class="outside-div margin-div" >
            		<div class="top-div">
		               		<div class="title-word">高端精致:</div>
					               <div class="title-content">
					               	    <div class="left-content">
					               	    	<label class="left-price" id="thirdPrice"></label><label class="left-desc">元套餐</lable>
					                    </div>
					                     <div class="right-content">
					               	    	<label class="right-price">72<span class="right-desc">小时极速出片</span></label>
					               	    	<label class="right-price">4K<span class="right-desc">电影级拍摄和制作</span></label>
					                    </div>
					               </div>
		              </div> 
            
		             <div class="inside-div"  id="third-video-section" >
          			</div> 
	       </div>
	
	</div>
	
</body>
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${commonJs }"></script>
<script src="${portalJs}"></script>



</html>
