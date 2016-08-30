<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
<spring:url value="/resources/css/phone/manager/updateProjectInfo.css" var="updateProjectInfoCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />


<%-- import JS --%>

<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/manager/updateProjectInfo.js" var="updateProjectInfoJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />


<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<title></title>
	<link rel="shortcut icon" href="${imgPath}/favicon.ico" >
	<link rel="stylesheet" href="${bootstrapCss}">
	<link rel="stylesheet" href="${commonCss}">
    <link rel="stylesheet" href="${updateProjectInfoCss}">
    <link rel="stylesheet" href="${datepickerCss}">
   
    
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->

	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${commonJs }"></script>
    <script src="${updateProjectInfoJs }"></script>
    <script src="${datepickerJs }"></script>
    <script src="${datepickerZhJs }"></script>


</head>
<body>

<input type="" value="<r:outName />"  id="logiNname">

	          <div class="headerNew">
		              <div class="leftHeader">
						 <div class="back"></div>
					  </div>	
					  <div class="rightHeader hide">
						 <div class="commit"></div>
					  </div>
			   	     <div class="midHeader">
						 <div class="logo"></div>
					 </div>
		     </div>
		     	
		     
		        <div class="errorDiv"  id="errorDiv" style="display: none;">error</div>
		     
		      <div class="updateContent"> 
		      
			     <div class="contentInput">
			          <div class="firstDiv">
			              <span class="firstSpan">*</span>
			              <span class="secondSpan">来源信息</span>
			          </div>
			          <div class="secondDiv">
			            <input readonly="readonly" value="">
			           </div> 
			     </div>
			     
			      <div class="contentInput">
			          
			           <div class="firstDiv">
			              <span class="firstSpan">*</span>
			              <span class="secondSpan">项目名称</span>
			          </div>
			          <div class="secondDiv">
			            <input value="" placeholder="项目名称" id="projectName">
			           </div> 
			     </div>
			     
			      <div class="contentInput">
			          <div class="firstDiv">
			              <span class="firstSpan">*</span>
			              <span class="secondSpan">来源信息</span>
			          </div>
			          <div class="secondDiv">
			            <select class="tableinput-baseinfo form-control" id="projectSource">
				              <option>电话下单</option>
				              <option>个人信息下单</option>
				              <option>系统下单</option>
				              <option>重复下单</option>
				              <option>活动下单</option>
				              <option>渠道优惠</option>
			              </select>
			           </div> 
			     </div>
			     
			      <div class="contentInput hide" id="referrer">
			          <div class="firstDiv">
			              <span class="firstSpan">*</span>
			              <span class="secondSpan">推荐人</span>
			          </div>
			          <div class="secondDiv">
			            <input value="" id="input-referrer">
			            <ul class="ul-option-source" style="display: block;" id="ul-select-referrer"></ul>
			           </div> 
			     </div>
			<!-- 协同人 -->     
			    <div class="keBianShiDiv" id="synergyInfo">
				     <div class="borderLine" id="synergyTopLine"></div> 
					       <div class="contentInput" id="addSynergy">
					          <div class="firstDiv">
					              <span class="firstSpan" style="opacity:0">*</span>
					              <span class="secondSpan">协同人信息</span>
					          </div>
					          <div class="secondDiv">
					                 <div class="positionAdd">
						               <div class="addPeople">添加协同人</div>
						               <div class="add" id="addSynergyIcon"></div>
						             </div>  
					          </div> 
					     </div>
					    <div class="borderLine" id="synergyBottomLine"></div>   
				    
				     <div class="autoDiv hide" id="synergy">
				     </div>
			     
		        </div> 
		     <!-- 客户信息 --> 
		         <div class="keBianShiDiv" id="userInfo">
		         
					      <div class="contentInput" id="userOpen">
					          
					          <div class="firstDiv">
					              <span class="firstSpan">*</span>
					              <span class="secondSpan">客户信息</span>
					          </div>
					          
					          <div class="secondDiv">
				                 <div class="positionAdd">
					               		<div class="openDiv" id="userOpenIcon"></div>
					             </div>  
					          </div> 
					     </div>
					    <div class="borderLine" id="userBottomLine"></div>   
				    
				     <div class="autoDiv hide" id="user">
				         <div class="autoContent">
				         <input type="hidden" class="userId" id="userId">
									<div class="divPosition">
											<input placeholder="客户名称" class="info" id="userName">
											<ul class="ul-option" id="ul-select" style="display: block;">
											</ul>
									</div>
									<div class="divPosition">
											<input placeholder="客户联系人" class="info" id="userContact">
									</div>
									<div class="divPosition">
											<input placeholder="客户电话" class="info" id="userPhone">
									</div>
						</div>
				     </div>
		        </div>   
		        
		             <!-- 供应商信息 --> 
		         <div class="keBianShiDiv" id="providerInfo">
		         
					      <div class="contentInput" id="providerOpen">
					          <div class="firstDiv">
					              <span class="firstSpan">*</span>
					              <span class="secondSpan">供应商信息</span>
					          </div>
					          
					          <div class="secondDiv">
				                 <div class="positionAdd">
					               		<div class="openDiv" id="providerOpenIcon"></div>
					             </div>  
					          </div> 
					     </div>
					    <div class="borderLine" id="providerBottomLine"></div>   
				    
				     <div class="autoDiv hide" id="provider">
				         <input type="hidden" class="teamId" id="teamId">
				         <div class="autoContent">
									<div class="divPosition">
											<input placeholder="供应商名称" class="info" id="teamName">
											<ul class="ul-option" id="ul-select-team" style="display: block;">
											</ul>
									</div>
									<div class="divPosition">
											<input placeholder="供应商联系人" class="info" id="teamContact">
									</div>
									<div class="divPosition">
											<input placeholder="供应商电话" class="info" id="teamPhone">
									</div>
						</div>
				     </div>
		        </div>  
		        
		         <!-- 项目价格 --> 
		         <div class="keBianShiDiv" id="priceInfo">
		         
					      <div class="contentInput" id="priceOpen">
					          <div class="firstDiv">
					              <span class="firstSpan">*</span>
					              <span class="secondSpan">项目价格</span>
					          </div>
					          
					          <div class="secondDiv">
				                 <div class="positionAdd">
					               		<div class="openDiv" id="priceOpenIcon"></div>
					             </div>  
					          </div> 
					     </div>
					    <div class="borderLine" id="priceBottomLine"></div>   
				    
				     <div class="autoDiv hide" id="price">
				         <div class="autoContent">
				                    <div class="divPosition">
											<input placeholder="项目预算信息" class="leftPrice" id="firstinput">
											<div   class="midPrice">~</div>
											<input class="rightPrice" id="lastinput">
											<span>元</span>
									</div>
									<div class="divPosition">
											<input placeholder="项目最终价格" class="info" id="finishInput">
											<span>元</span>
									</div>
									<div class="divPosition">
											<input placeholder="客户支付金额（选填" class="info" id="userinput">
											<span>元</span>
									</div>
									<div class="divPosition">
											<input placeholder="支付供应商金额（选填）" class="info" id='providerInput'>
											<span>元</span>
									</div>
						</div>
				     </div>
		        </div>  
		        
		           <!-- 项目描述 --> 
		           <div class="keBianShiDiv">
				         <div class="contentTextArea">
					          <div class="firstDiv">
					              <span class="firstSpan">*</span>
					              <span class="secondSpan">项目描述</span>
					          </div>
					          <div class="secondDiv">
					              <textarea class="textareaSize"></textarea>
					          </div> 
					     </div>
				  </div>
				  
				    <!-- 项目时间表 --> 
		         <div class="keBianShiDiv" id="timeInfo" >
		               <div class="borderLine" id="timetopLine"></div>   
					      <div class="contentInput" id="timeOpen" >
					          <div class="firstDiv">
					              <span class="firstSpan">*</span>
					              <span class="secondSpan">项目时间表</span>
					          </div>
					          
					          <div class="secondDiv">
				                 <div class="positionAdd">
					               		<div class="openDiv" id="timeOpenIcon"></div>
					             </div>  
					          </div> 
					     </div>
					    <div class="borderLine" id="timeBottomLine"></div>   
				    
				     <div class="autoDiv hide" id="time">
				         <div class="autoContent">
				            <div class="timeContent">
				              	<div class="title">预算时间</div>
				              	<ul class="timeInput">
				              	     <li><input class="" id="gtstarttime"></li>
				              	     <li><input class="" id="fastarttime"></li>
				              	     <li><input class="" id="swstarttime"></li>
				              	     <li><input class="" id="zzstarttime"></li>
				              	     <li><input class="" id="jfstarttime"></li>
				              	</ul>
				              	
				              	<div class="timeImg">
				              	      <img src="${imgPath }/phone/manager/time.png">
				              	      <img src="${imgPath }/phone/manager/time.png">
				              	      <img src="${imgPath }/phone/manager/time.png">
				              	      <img src="${imgPath }/phone/manager/time.png">
				              	      <img src="${imgPath }/phone/manager/timeEnd.png">
				              	       <div class="vLine"></div>
				              	</div>
				              	<ul class="timeWord">
				              	     <li>沟通</li>
				              	     <li>方案</li>
				              	     <li>商务</li>
				              	     <li>制作</li>
				              	     <li>交付</li>
				              	</ul>
				              	
				             </div> 
									
						</div>
				     </div>
		        </div>  
		       
		         <div class="completeDiv">
		               <div class="cancle">取消</div>
		               <div class="save" id="commit">保存</div>
		         </div>      
		         
		         <input type="hidden" id="key" style="display: none;" value="${key}">
		         <label class="state" >${state }</label>

</body>
</html>