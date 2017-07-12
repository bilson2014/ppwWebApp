<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/providerFlow/infoStepOne.css" var="providerLeaderCss"/>
<spring:url value="/resources/css/provider/step-dc-style2.css" var="providerStepCss2"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/providerFlow/infoStepOne.js" var="leaderJs"/>
<spring:url value="/resources/images" var="path" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />

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
	<script src="${leaderJs}"></script>
	<script src="${webuploaderJs}"></script>


</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
  	<input id="unqiueId" value="${unqiueId}" />
    <jsp:include flush="true" page="../header.jsp"></jsp:include> 
	<div class="page" >
	  	       
	      <div class="step">
			  <div class="step-bar" id="step-bar">
			      <div class="first step-1" id="step-1" data-content="填写基本信息">1</div>
			      <div class="line"></div>
			      <div class="first" id="step-2" data-content="填写详细信息">2</div>
			      <div class="line"></div>
			      <div class="first" id="step-3" data-content="上传作品">3</div>
			      <div class="line"></div>
			      <div class="first" id="step-3" data-content="资质审核">4</div>
			  </div>
	      		 <div class="step-one-div" id="step1" data-step="1">
	      		         <form:form  method="post" commandName="leader" id="toLeaderForm">     
	      		             <div class="updateLogo">   
	      		                    <div class="title">公司LOGO</div>
		      		                <div class="user-img-content" id="user-img-content">
										<div class="user-icon">
											<img alt="用户头像" src="/resources/images/provider/initLogo.png" class="img-circle" id="user-img"/>
											<input type="hidden" id="user_img_url" value="">
										</div>
										<div class="upload-info">
											<label>您上可以上传JPG、	GIF或PNG格式的文件，文件大小不能超过250KB</label>
										</div>
										<div class="upload-btn">
											<!-- <button class="btn btn-primary" id="uploadBt" type="button">上传头像</button> -->
											<div id="uploadBt">上传LOGO</div>
											<input type="file" name="file" id="file" style="display: none;"/> 
										</div>
									</div>
							</div>
							
								   <div class="input-group-div" id="company-name-error">
		  	      		       	 	  <span class="title-word">公司名称</span>	
		  	      					  <form:input class="form-control step-one-input" path="teamName" id="teamName" placeholder="请填写公司名称"/>
		  	      				  </div>
					      	      				  
  	      				  <div class="input-group-div" id="company-nature-error">
  	      		       	 	  <span class="title-word">公司性质</span>
  	      		       	 	  <div class="radioDiv">
  	      		       	 	    <label><form:radiobutton path="teamNature" class="radio" value="0" id="checkCompany" />公司 </label>
                                <label><form:radiobutton path="teamNature" class="radio" value="1" id="checkWorkRoom"/>工作室 </label>
  	      		       	 	  </div>
  	      				  </div>
  	      				  
  	      				 <div class="input-group-div" id="company-scale-error">
  	      		       	 	  <span for="company-priceRange" class="title-word">规模</span>
  	      		       	 	  <form:input path="scale" type="hidden" id="company-scale"/>	
									<div class="dropdown leaderSelect" id="company-priceRange-value">
										<button class="btn btn-default dropdown-toggle step-two-select" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span id='indent_scale' data-value="">请选择...</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu" id="selectUl" role="menu"
											aria-labelledby="dropdownMenu1">
											<li data-value="0" >5人以下</li>
											<li data-value="1" >5-10人</li>
				            				<li data-value="2" >11-50人</li>
				            				<li data-value="3" >51-100人</li>
				            				<li data-value="4" >101-500人</li>
				            				<li data-value="5" >500人以上</li>
										</ul>
									</div>
  	      				  </div> 
  	      				  
			  	      	  <div class="input-group-div" id="cityError">
			  	      	        <form:input path="teamProvince" type="hidden" id="company-priceRange-value" value=""/>	
			  	      			<span for="company-city" class="title-word">所在省</span>	
										<div class="dropdown leaderSelect select-city" id="company-priceRange-value">
													<button class="btn btn-default dropdown-toggle step-two-select-city" type="button"
														id="dropdownMenu1" data-toggle="dropdown">
														<c:if test="${!empty provinces}">
															<c:forEach items="${provinces }" var="source" varStatus="status">
																<c:if test="${ status.index == 0}">
																		<span data-value ="${source.provinceID }"  id='getProvince'>${source.provinceName }</span>
																			<div class="carets"></div>
																		</button>
																		<ul class="dropdown-menu id="selectUl" role="menu"
																			aria-labelledby="dropdownMenu1">
																</c:if>
																  <li class="Province" data-value ="${source.provinceID }"
																  	<c:if test="${provider.teamProvince == source.provinceID }">
																  		selected="selected"
																  	</c:if> >${source.provinceName }</li>
																</c:forEach>
															</c:if>									
													</ul>
										</div>
												
								<span for="company-city" class="title-word-city">所在城市</span>	
								        <form:input path="teamCity" type="hidden" id="company-priceRange-value" value=""/>	
										<div class="dropdown leaderSelect select-city" id="company-priceRange-value">
													<button class="btn btn-default dropdown-toggle step-two-select-city" type="button"
														id="dropdownMenu1" data-toggle="dropdown">
														<c:if test="${!empty citys}">
																<c:forEach items="${citys }" var="source" varStatus="status">
																  <c:if test="${ status.index == 0}">
																			<span id='getCity' data-value ="${source.cityID }">${source.city}</span>
																			<div class="carets"></div>
																		</button>
																		<ul class="dropdown-menu" id="selectUlCity" role="menu"
																			aria-labelledby="dropdownMenu1">
															      </c:if>
																  <li data-value ="${source.cityID }"
																  	<c:if test="${provider.teamCity == source.cityID }">
																  		selected="selected"
													  				</c:if> >${source.city }</li>
																</c:forEach>
															</c:if>										
													</ul>
												</div>
			  	      		</div>
			  	      		
			  	      	  <div class="input-group-div" id="addressError">
  	      		       	 	  <span class="title-word">详细地址</span>
  	      		       	 	   <form:input path="address" class="form-control step-one-input" id="company-address" placeholder="请填写详细地址 "/>		
  	      				  </div>
  	      				  
  	      				   <div class="input-group-div noStar" id="webError">
  	      		       	 	  <span class="title-word">官网网址</span>
  	      		       	 	  <form:input path="officialSite" class="form-control step-one-input" id="companyWeb" placeholder="例如：http://ww.example.com"/>		
  	      				  </div>
  	      				  
  	      				   <div class="input-group-div" id="companyDataError">
  	      		       	 	  <span class="title-word">从业时间</span>
  	      		       	 	  <form:input readonly="readonly" path="establishDate" class="form-control step-one-input" id="company-data" placeholder="请选择日期"/>		
  	      				  </div>
  	      				  
  	      				   <div class="updateLogo example">   
	      		                    <div class="title">上传资质</div>
		      		                <div class="user-img-content" id="user-img-contentInfo">
		      		                <div class="upload-info">
										<label>您上可以上传JPG、	GIF或PNG格式的文件，文件大小不能超过250KB</label>
									</div>
										 <div class="logoItem"> 
											<div class="user-icon">
												<img alt="上传资质" src="/resources/images/provider/initLogo.png" class="img-circle" id="user-img-info"/>
												<form:input path="certificateUrl" type="hidden" id="user_img_url_Info"/>		
											</div>
											<div class="findLogo" id="theInfo">查看示例</div>
											<div class="upload-btn">
												<div id="uploadYE">上传营业执照</div>
												<input type="file" name="file" id="file" style="display: none;"/> 
											</div>
										</div>	
										 <div class="logoItem"> 
											<div class="user-icon">
												<img alt="用户头像" src="/resources/images/provider/initLogo.png" class="img-circle" id="user-img-z"/>
												<form:input path="certificateUrl" type="hidden" id="user_img_url_Z"/>
											</div>
											<div class="findLogo" id="theZ">查看示例</div>
											<div class="upload-btn">
												<div id="uploadZCard">身份证正面</div>
												<input type="file" name="file" id="file" style="display: none;"/> 
											</div>
										</div>	
										
										 <div class="logoItem"> 
											<div class="user-icon">
												<img alt="用户头像" src="/resources/images/provider/initLogo.png" class="img-circle" id="user-img-b"/>
												<form:input path="certificateUrl" type="hidden" id="user_img_url_B"/>
											</div>
											<div class="findLogo" id="theB">查看示例</div>
											<div class="upload-btn">
												<div id="uploadBCard">身份证背面</div>
												<input type="file" name="file" id="file" style="display: none;"/> 
											</div>
										</div>	
									</div>
							</div>
							
							<div class="borderLine"></div>
							
				          <div class="input-group-div"  id="business-checkbox-error">
				              <form:input path="business" type="hidden" id="businessSkill"/>
  	      		       	 	  <span for="company-business" class="title-checkbox-word">业务范围</span>
  	      		       	 	      <div class="checkInfo">请选择公司/工作室所能创作的影片类型（多选）</div>	
  	      					      <div class="checkbox" id="business-checkbox">
										<ul class="ul-step-two" id="getBussiness">
											<li>	
												<div class="getTag" name="business" data-value="0"> 宣传片</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="16" />活动视频</div>
									    	</li>
									    	<li>
												<div class="getTag" name="business" data-value="1"/>病毒视频</div>
									   	 	</li>
									    	<li>
												<div class="getTag" name="business" data-value="2"/>微电影</div>
									    	</li>
									    	<li>
												<div class="getTag" name="business" data-value="3"/>MG动画</div>
									    	</li>
											<li>
												<div class="getTag" name="business" data-value="4"/>广告TVC</div>
									  	  	</li>
									    	<li>
												<div class="getTag" name="business" data-value="5"/>真人秀节目</div>
									    	</li>
									    	<li>
												<div class="getTag" name="business" data-value="17"/>VR视频</div>
									    	</li>
									   	 	<li>
												<div class="getTag" name="business" data-value="6"/> 教学视频</div>
									   		</li>
									   		<li>
												<div class="getTag" name="business" data-value="7"/>网络节目</div>
									  		</li>
									    	<li>
												<div class="getTag" name="business" data-value="8"/>网络剧</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="9"/>网络电影</div>
											</li>
                                             <li> 
												<div class="getTag" name="business" data-value="10"/>MV</div>
											</li>
											<li>
												<div class="getTag" name="business" data-value="11"/>实验影片</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="12"/>电影预告片</div>
										    </li>
										
										    <li>
												<div class="getTag" name="business" data-value="13"/>花絮</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="14"/>演播室栏目</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="15"/>真人秀节目</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>综艺节目</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>访谈</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>三维建筑漫游动画</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>三维产品动画</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>三维角色动画</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>三维特效影片</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>Flash角色动画</div>
										    </li>
										     <li>
												<div class="getTag" name="business" data-value="18"/>定格动画</div>
										    </li>
										     <li>
												<div class="getTag" name="business" data-value="18"/>二维逐帧动画</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>博物馆视频</div>
										    </li>
										     <li>
												<div class="getTag" name="business" data-value="18"/>展览视频</div>
										    </li>
										     <li>
												<div class="getTag" name="business" data-value="18"/>体验馆视频</div>
										    </li>
										    <li>
												<div class="getTag" name="business" data-value="18"/>异形投影视频</div>
										    </li> 
										    <li>
												<div class="getTag" name="business" data-value="18"/>AR视频</div>
										    </li>  
										 </ul>   
									</div>
                             </div>
                             
                            	<div class="borderLine"></div>
							
				          <div class="input-group-div"  id="checkbox-error">
				              <form:input path="skill" type="hidden" id="skill" />
  	      		       	 	  <span for="company-business" class="title-checkbox-word">业务技能</span>
  	      		       	 	      <div class="checkInfo"> 请选择公司/工作室所能承担的专业工作（多选）</div>
  	      		       	 	      <div class="checkTitle" style="margin-bottom: 12px;">创意策划</div>	
  	      					      <div class="checkbox" id="business-checkbox">
										<ul class="ul-step-two" id="getDream">
											<li>	
												<div class="getTag" name="business" data-value="0"> 解说词</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0"> 广告语</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0"> 故事</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0"> 贴图分镜</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0"> 手绘分镜</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0"> 美术设计</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0"> 影片策略</div>
									    	</li>
										 </ul>
								
										    
								  </div>
								  <div class="checkTitle">创作团队(必填)</div>	
  	      					      <div class="checkbox" id="business-checkbox">
										<ul class="ul-step-two" id="getTeam">
											<li>	
												<div class="getTag" name="business" data-value="0"> 导演</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0"> 制片</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0"> 摄影</div>
									    	</li>
										 </ul>   
								  </div>
								   <div class="checkTitle">后期制作</div>	
  	      					      <div class="checkbox" id="business-checkbox">
										<ul class="ul-step-two" id="getLast">
											<li>	
												<div class="getTag" name="business" data-value="0">剪辑</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0">包装</div>
									    	</li>
									    	<li>	
												<div class="getTag" name="business" data-value="0">调色</div>
									    	</li>
										 </ul>   
								  </div>
                             </div>
                             
                          <div class="input-group-div" id="company-teamDesc-error">
  	      		       	 	  <span class="title-checkbox-word" for="company-teamDesc">公司简介</span>
  	      		       	 	  <form:textarea path="teamDescription" class="form-control step-area" id="company-teamDesc" rows="4" maxlength="200" placeholder="公司简介为必填字段"/>  
  	      				  </div>
  	      				  
                      </form:form>
  	      			           <div class="setMid"> 
				  	      	  	   <Button class="red-btn btn-c-r " id="step1Next">下一步</Button>
				  	      	   </div>	
  	      		  </div>
  	      		 </div> 

               

		<!-- photo Modal start -->
	<div class="modal" id="errorModal">
		<div class="modal-dialog">
			<div class="modal-content model-distance">
				<div class="modal-body">
					<label id="error-message"></label>
					<button type="button" class="btn btn-warning" id="iKnow">知道了</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 示例 -->
	<div class="tooltip-warn-banner" id="tooltip-warn-banner">
		<div class="card">
		<div class="top">
			<div class="topBanner closeBanner" ></div>
		</div>
			<div class="imgContent">
				<img src="/resources/images/provider/checkZInfo.jpg"
					id="previewImg" class="previewImg"
					style="width: 650px; height: 358px;">
			</div>
		</div>
	</div>
	
   <div class="tooltip-warn-banner " id="tooltip-warn-bannerZ">
		<div class="card">
		<div class="top">
			<div class="topBanner closeBanner" ></div>
		</div>
			<div class="imgContent">
				<img src="/resources/images/provider/checkZ.jpg"
					id="previewImg" class="previewImg"
					style="width: 650px; height: 358px;">
			</div>
		</div>
	</div>
	
	 <div class="tooltip-warn-banner " id="tooltip-warn-bannerB">
		<div class="card">
		<div class="top">
			<div class="topBanner closeBanner" ></div>
		</div>
			<div class="imgContent">
				<img src="/resources/images/provider/checkB.jpg"
					id="previewImg" class="previewImg"
					style="width: 650px; height: 358px;">
			</div>
		</div>
	</div>
	
   <div class="tooltip-warn-banner verBanner " id="tooltip-warn-bannerInfo">
		<div class="card">
		<div class="top">
			<div class="topBanner closeBanner"> </div>
		</div>
			<div class="imgContent">
				<img src="/resources/images/provider/theInfo.jpg"
					id="previewImg" class="previewImg"
					style="width:450px; height:457px;">
			</div>
		</div>
	</div>
	
	<!-- foot -->
         					 <jsp:include flush="true" page="../foot.jsp"></jsp:include> 
                            <!--新版底部-->
	
	

	
	
</body>

</html>