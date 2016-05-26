<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/css/phone/salesman/portal.css" var="portalCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/salesman/portal.js" var="portalJs"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap-alert.min.css" var="bsAlterCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap-button.min.css" var="bsCss"/>
<spring:url value="/resources/css/phone/drpOrder.css" var="drpCss"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="Js"/>
<spring:url value="/resources/js/phone/drpOrder.js" var="drpJs"/>
<spring:url value="/resources/css/phone/salesman" var="bsAlterCss"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="baseJs"/>
<spring:url value="/resources/js/youku-player.js" var="ykJs" />
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
	<meta name="keywords" content="拍片网,视频制作,手机拍片,手机视频,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_移动端_首页</title>

	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${portalCss }">
	


   
</head>
<body>

	<input type="hidden" id="uniqueId" value="${uniqueId }"/>
	
	<div class="header">
			<!-- logo -->
			<dl class="header-ul">
			
				<dd>
					<a href="<spring:url value="/phone/salesman/${uniqueId }"/>" target="_self">
						<div class="logo"></div>
					</a>
				</dd>
			</dl>
		</div>
	
	   <!-- toolbar modal begin -->
    <div class="upload-window" id="toolbar-modal">
      <div class="closeVideo">
            <label id="closeBtn">X</label>
        </div>
        <video class="videoSize"  id="recomment-video" src="" poster="" controls preload="auto" style="display: none;"></video> 
      <!--youku video  -->
       <div class="player-video" id="player-video"></div>
        <div class="closeVideo"></div>
    </div>
    <!-- toolbar modal end -->

	<div class="show-video-div">		
		<div class="outside-div topMargin"  >
             <div class="top-div">
	               <div class="title-word">经济实惠:</div>
	               <div class="title-content">
	               	    <div class="left-content">
	               	    	<label class="left-price" id="firstPrice">12800</label><label class="left-desc">元套餐</lable>
	                    </div>
	                     <div class="right-content">
	               	    	<label class="right-price">30<span class="right-desc">小时极速出片</span></label>
	               	    	<label class="right-price">HD<span class="right-desc">专业级高清拍摄制作</span></label>
	                    </div>
	               </div>
              </div> 
            
             <div class="inside-div" id="first-video-section" >
                        <!-- example 
                         <div class="video-area">
                        	 <div class="video-img">
                              <img src="http://www.apaipian.com/product/img/product7-201510281611495342.jpg" alt="智能硬件专场_拍片网">
                                          	         </div>
                                          	         <div class="video-content">
                                  	<div class="video-title">产品展示片</div>
                                  	<div class="video-title-content">sssssssssssss</br>hhhhhhhhhhhhhhhhhhhhhhhhhhhh</br>vvvvvvvvvvvvvvv</br></div>
                                          	         </div>	
                                          	         <button class="btn-red-common video-btn">立即下单</button>
                        </div>	 -->

                      
             		</div> 
        	 </div>


         		<div class="outside-div" >
			             <div class="top-div">
				               <div class="title-word">高性价比:</div>
				               <div class="title-content">
				               	    <div class="left-content">
				               	    	<label class="left-price" id="secondPrice">29800</label><label class="left-desc">元套餐</lable>
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


			     <div class="outside-div"  >
			             <div class="top-div">
				               <div class="title-word">高端精致:</div>
				               <div class="title-content">
				               	    <div class="left-content">
				               	    	<label class="left-price" id="thirdPrice">59800</label><label class="left-desc">元套餐</lable>
				                    </div>
				                     <div class="right-content">
				               	    	<label class="right-price">72<span class="right-desc">小时极速出片</span></label>
				               	    	<label class="right-price">4k<span class="right-desc">电影级拍摄和制作</span></label>
				                    </div>
				               </div>
			              </div> 
            
			             <div class="inside-div" id="third-video-section"  >
			             </div> 
			     </div>
			 </div>
	
</body>
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${commonJs }"></script>
<script src="${portalJs}"></script>
<script src="http://player.youku.com/jsapi"></script>
<script src="${ykJs}"></script>
<script src="${baseJs}"></script>  

<!-- 加载Mob share 控件 -->
<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
</html>


<!-- 		第一块视频区域
	<div class="video-content">
		<%-- <div class="contain-row">
			<a href="<spring:url value='/phone/play/7'/>">
				<div class="video-col">
					<div class="video-post">
						<img src="http://www.apaipian.com/product/img/product7-201510281611495342.jpg" alt="智能硬件专场_拍片网">
					</div>
					
					<div class="video-desc">
						<dl>
							<dt><h2>精致的智能硬件宣传影片</h2></dt>
							<dd>逼真的工业级渲染，家庭的使用场景展示，通过高科技的视觉元素渲染产品特点，完美呈现产品精致的一面，国际市场取得了惊人的销量。</dd>
							<dt><label>￥</label>56,880元<label class="doraction">113,760</label></dt>
							<dd><a href="<spring:url value='/phone/play/7'/>"><div class="detail-btn">查看详情</div></a></dd>
						</dl>
					</div>
				</div>
			</a>
		</div> --%>
	</div> -->