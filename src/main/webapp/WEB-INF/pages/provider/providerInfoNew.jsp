<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/provider/leader.css" var="providerLeaderCss"/>
<spring:url value="/resources/css/provider/step-dc-style2.css" var="providerStepCss2"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/provider/leaderNew.js" var="leaderJs"/>
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

	<script type="text/javascript">
	var _vds = _vds || [];
	window._vds = _vds;
	(function() {
		_vds.push([ 'setAccountId', '9f2e33a3d43b5d78' ]);
		(function() {
			var vds = document.createElement('script');
			vds.type = 'text/javascript';
			vds.async = true;
			vds.src = ('https:' == document.location.protocol ? 'https://'
					: 'http://')
					+ 'dn-growing.qbox.me/vds.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(vds, s);
		})();
	})();
</script>
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
  	<input id="unqiueId" value="${unqiueId}" />
    <jsp:include flush="true" page="../header.jsp"></jsp:include> 
	<div class="page" >
	  
	   
	  
	      <div class="agreement" id="agreement">
	           <div class="topTitle">拍片网网站使用说明和用户协议</div>
	      <div class="setBorder">     
	           <div class="agTitle">一、使用条件</div>
	           <div class="agContent">欢迎访问拍片网网站。拍片网按照下列条件向您提供服务。如果您访问拍片网网站或者在拍片网网站注册，您需
要接受以下《拍片网网站使用说明和用户协议》，请仔细阅读。此外，当您使用目前或者将来的服务协议（如：客户
或供应商等）或者访问或从与拍片网网站上传作品，不论是否包含在拍片网网站的网址里，您都必须服从于适用于这
些服务或商业行为的条件和指导方针。</div>
               <div class="agTitle">二、双方权利与义务</div>
	           <div class="agContent">为了了解我们的情况，请仔细阅读我们的“双方权利与义务”及“隐私权公告”，它同样规范您对拍片网网站的
访问、使用及合作行为。</div>
               <div class="agContent">1、拍片网网站及其使用人双方（以下简称：“双方”）保证该保密信息仅用于与合作有关的用途或目的。<br>
2、双方各自保证对对方所提供的保密信息予以妥善保存（保密信息包括但不限于：线上及线下展示或合作的业
务范围、项目名称、项目内容、价格、团队组建信息、供应商信息、客户信息等）。<br>
3、双方各自保证对对方所提供的保密信息按本协议约定予以保密，并至少采取适用于对自己的保密信息同样的
保护措施和审慎程度进行保密。
上述含有保密信息的资料、文件或其他含有保密信息的载体包括但不限于：该等资料、文件或载体的复印件、拷贝或
其他复制品。<br>
4、如果您使用本网站，您就有责任对您的账号和密码保密，并限制别人对您计算机的访问，您同意为您账户和
密码下所发生的一切行为负责。如果您在18 岁以下，您只有在父母或监护人的陪伴下才能使用拍片网网站。拍片网
网站有权利以自己的判断拒绝服务、终结账目、取消或编辑内容或取消订单。<br>
5、在网站使用过程及合作过程中，网站使用者（包括：游客、客户、供应商等）从拍片网网站（或子公司、关
联公司）获得的与合作有关或因合作产生的任何商业、营销、技术、运营数据或其他性质的资料，无论以何种形式或
载于何种载体，无论在披露时是否以口头、图像均具有保密性。<br>
6、供应商在拍片网网站上传作品时，不可在作品中以文字、数字、图表、图片、动画、水印、LOGO、音频或视
频等任何形式违规透露自己团队或相关个人的任何联系信息及联系方式，否则拍片网有权追究其违约责任。<br>
7、拍片网网站从网站供应商处获得的无论以何种形式或载于何种载体，无论在披露时是否以口头、图像或以书
面方式表明其具有保密性。<br>
8、上述保密信息可以以数据、文字及记载上述内容的资料、光盘、软件、图书等有形媒介体现，也可通过口头
等视听形式传递。</div>

             <div class="agTitle">三、网站资源访问权限</div>
	         <div class="agContent">
	           1、游客可从拍片网网站浏览该网站的部分展示作品。<br>
2、注册客户可从拍片网网站浏览自己所上传的作品及自己团队或个人的注册信息。<br>
3、注册供应商可从拍片网浏览自己团队或个人的注册信息及自己所上传的作品。<br>
4、拍片网网站许可您有限制的访问，未经本网站的明示书面同意，不得使用拍片网或其他任何利用拍片网网站
名称和商标的“隐藏文本”。任何未经拍片网网站授权或认可的使用都会导致许可的终止。未经拍片网网站的书面明
示同意，不得在链接中使用拍片网网站拥有所有权的logo 或其他绘图和商标。
	           </div>
	           
	         <div class="agTitle">四、产品描述</div>
	         <div class="agContent">
	            1、拍片网网站和其附属机构将尽可能地对产品详细描述。但是，本网站不保证对产品的描述和本站点其他内容
的描述都是准确、完整、可信赖、最新的和无错误的。<br>
2、最终解释权归拍片网网站所有。
	         </div>
	         
	         <div class="agTitle">五、网站规则、风险、免除责任及其他</div>
	         <div class="agContent">
1、使用者不得在拍片网网站上传内容疑似涉及违法、淫秽、胁迫、诽谤、侵犯知识产权和其他有害于第三方的
内容，上传内容不得含有病毒软件、政治活动、商业诱惑。拍片网网站有权（但不是职责或义务）取消或编辑这些内容，并且不定期的检查使用者上传及编辑的内容。<br>
2、您准许拍片网网站和其附属机构以及再被许可人有权使用你提交的内容，如果他们作出选择。您有责任保证<br>
您在拍片网网站的注册信息及所上传的作品的版权为你所有或享有其他控制权；保证内容的真实性、准确性；保证对
您提供内容的使用不会违反该规定和不会导致对任何实体和他人的损害；保证向拍片网网站和其附属机构赔偿因为你
提供的内容所带来的损失。拍片网网站有权但没有职责和义务监视、编辑和取消任何行为和内容。
3、拍片网网站对您或任何第三方所上传及编辑的内容不承担任何责任。本站点内容是由拍片网网站按照它本来
的情况或得到时的情况提供。该网站对该站点的经营、该站点的信息、内容<br>、资料和产品不承担任何责任且不承诺任
何保证，包括明示的和暗示的。你必须明示同意使用该站点风险自负。
4、拍片网网站在所适用法律许可的最大范围内放弃保证，无论明示和暗示的，包括但不限于对商业能力和为特
定目的的适当性的暗示保证。拍片网网站对缘于本网站的使用所导致的任何损害赔偿不承担任何责任，包括但不限于
直接的、间接的、附属性的、惩罚性的和结果性的损害赔偿。<br>
5、请浏览我们的规则，这些规则也会规范你对本网站的访问和使用。我们保留在任何时间改变网页、规则和使
用的条件的权利。<br>
6、您从拍片网网站购买的项目或产品都按照货物合同进行，这意味着该项目或产品的权利及风险在我们交付时
就已转移。
	         </div>
	         
	         <div class="agTitle">六、违约与赔偿</div>
	         <div class="agContent"> 
	              任何一方违反本协议的规定，应在第一时间采取一切必要措施防止保密信息的扩散，尽最大可能消除影响，并应
承担违约责任，向守约方支付违约金，违约金的以受损害方实际遭受的损失为限。
	         </div>
	         
	         <div class="agTitle">七、适用法律与争议解决</div>
	         <div class="agContent"> 
	             1、本网站使用说明和用户协议适用中华人民共和国有关法律。
合同纠纷解决方式：如因本协议以及本协议履行过程中出现的争议，双方应协商解决；协商不成时，双方同意提交本
协议签订地（北京市朝阳区）法院诉讼。<br>
2、无论何种与访问拍片网网站和通过本网站合作有关的争议，争端应由合作双方协商解决,如不能协商解决则应提
交仲裁，仲裁裁决将作为有权管辖法庭判断的重要参考。在可适用法律允许的最大范围内，如根据本协议没有协议仲
裁将结合根据本协议涉及到其他当事人的仲裁进行，无论是通过集团仲裁进行还是其他。
            </div>
             
            <div class="checkItem">
                 <input id="isAgree" name="Fruit" type="checkbox"  />
                 <div>我已认证阅读并同意 <span id="showErrorAgree" style="color:#fe5453;padding-left:60px;display:none">请勾选”我已阅读并同意“以上条款后继续</span></div>
            </div>
            
            <div class="agreeBtn">
                 <div class="btn-c-g" id="noagree">拒绝</div>
                 <div class="btn-c-r" id="agree">同意</div>
            </div>
             
	    </div>
	   </div> 

	      </div>
	       
	      <div class="step hideStep">
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
											<label>您上可以上传JPG、	GIF或PNG格式的文件，文件大小不能超过10M</label>
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
										<label>您上可以上传JPG、	GIF或PNG格式的文件，文件大小不能超过10M</label>
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
  	      				  
  	      				   <!--联系人 -->
  	      				   <form:input path="linkman" type="hidden" id="setLinkman" />
  	      				   <form:input path="email" type="hidden" id="setEmail"/>
  	      				   <form:input path="webchat" type="hidden" id="setWebChat" />
  	      				   <form:input path="qq" type="hidden" id="setQQ"/>
  	      				   <form:input path="phoneNumber" type="hidden" id="setPhoneNumber"/>
  	      				  
                      </form:form>
  	      			           <div class="setMid"> 
				  	      	  	   <Button class="red-btn btn-c-r " id="step1Next">下一步</Button>
				  	      	   </div>	
  	      		  </div>

                <div class="step-two-div" id="step2" data-step="2">
  	      	               <div class="input-group-div" id="company-linkman-error">
  	      		       	 	  <span class="title-word">联系人姓名</span>	
  	      					  <input type="text"  class="form-control step-one-input" id="company-linkman" placeholder="请填写联系人姓名" aria-describedby="basic-addon2">
  	      				  </div>
  	      				   <div class="input-group-div" id="company-email-error">
  	      		       	 	  <span class="title-word">邮箱</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-email" placeholder="请填写邮箱" aria-describedby="basic-addon2">
  	      				  </div>
  	      				   <div class="input-group-div noStar" id="company-webchat-error">
  	      		       	 	  <span class="title-word">微信</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-webchat" placeholder="请填写微信" aria-describedby="basic-addon2">
  	      				  </div>
  	      				   <div class="input-group-div noStar" id="company-qq-error">
  	      		       	 	  <span class="title-word">QQ</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-qq" placeholder="请填写QQ" aria-describedby="basic-addon2">
  	      				  </div>
  	      				 
  	      				   <div class="input-group-div noStar" id="company-phone-errors">
  	      		       	 	  <span class="title-word">座机</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-phone" placeholder="请填写座机" aria-describedby="basic-addon2">
  	      				  </div>
     
                           <div class="bottom-div">
                           	 <Button class="gy-btn"  id="step2Pre">上一步</Button>  
                           	 <Button class="red-btn btn-c-r" id="step2Next">下一步</Button>    
                           </div>
               
	             </div>	
	             
	             <div class="step-three-div" id="step3" data-step="3">
	                 <!--批量 -->
	                        <div class="multUpload" id="multUpload">
	                             <div class="setItem">
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
							     <div class="multDiv">
							           <div class="btn-c-g" id="cancleMult">取消</div>
							           <div class="btn-c-r">开始上传</div>
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
							   <div class="upVideoCard" id="upVideoCard">
										<div class="step1 hideUp1">
											<div class="upImg">
												<img src="/resources/images/provider/upLoadNew.png" />
											</div>
											<div class="upBtn btn-c-r" id="upBtn">上传视频</div>
											<div class="error_upload"></div>
											<div class="infoCard">
												<div class="title">拍片网郑重提醒您：</div>
												<div class="redWord">上传作品必须为贵公司或贵工作室及个人的原创作品;</div>
												<div class="redWord">不得上传有贵公司或贵工作室及个人二维码/电话/手机/微信等联系方式的作品;</div>
												<div class="redWord">作品必须填写创作完成日期。</div>
												<div class="midWord">为响应国家九部委联合开展深入整治互联网和手机媒体淫秽色情及低俗信息专项行动的号召，营造一个
													健康文明的网络环境，给大家一个和谐积极的家园。</div>
												<div class="grayWord">不得上传任何有违国家法律法规的视频。</div>
												<div class="grayWord">不得上传具有色情内容的视频</div>
												<div class="grayWord">不得上传内容低俗，格调不高的视频。</div>
												<div class="grayWord">不得上传具有色情诱导性内容的视频。</div>
												<div class="grayWord">不得在标题、简介和标签中出现任何具有低俗色情含义的字眼。</div>
												<div class="grayWord">不含有涉及版权问题的影视片段。</div>
												<div class="midWord">如果有违上述内容，我们将一律予以删除，我们希望我们最珍贵的客户及供应商，理解并监督我们。</div>
											</div>
											<div class="infoCard">
												   <div class="title">上传视频要求：</div>
									               <div class="redWord">视频格式 : MP4格式</div>
												   <div class="redWord">视频编码 : H264编码</div>
												   <div class="redWord">音频编码 : MP3编码</div>
												   <div class="redWord">文件大小 : 200Mb以下</div>
												   <div class="redWord">分辨率 : 1920x1080、1280x720、960x540</div>
												   <div class="redWord">比特率 : 3000kb/s(1920x1080)、1400kb/s(1280x720)、900kb/s(960x540)</div>
												   <div class="redWord">帧速率 : 24fps</div>
												   <div class="redWord">色彩空间 : yuv420p</div>
												   <div class="midWord">我们建议您使用以下转码软件</div>
												   <div class="grayWord">Windows系统 : 格式工厂</div>
									               <div class="grayWord">Mac系统：Any Video Converter</div>
									               <div class="midWord">如果您对此有疑问,您可以拨打(010-59005319)与我们联系。</div>
											</div>
											 <div class="setMid"> 
							  	      	  	   <Button class="gy-btn btn-c-r " id="checkbtn">上一步</Button>
							  	      	     </div>	
										</div>
										<!--上传第一步end-->
													<div class="step2  hideUp2<c:if test='${product.productId == 0}'>hide</c:if>">
																<div class="upProgress">
																	<div class="proTitle">上传进度</div>
																	<div class="progress progress-striped active">
																		<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
																			aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
																			style="width: 0;"></div>
																	</div>
																	<div class="upIng">上传中...</div>
																	<div class="upSuccess hide">
																		<img src="/resources/images/provider/sure.png">上传成功
																	</div>
																	<div class="upError hide">
																		<img src="/resources/images/provider/error.png">上传失败请重新上传
																	</div>
																</div>
														
															<div class="proItem" id="video-name-error">
																<div class="itemTitle">作品名称</div>
																<input type="text" class="" id="video-name"
																	maxlength="30" placeholder="视频标题为必填字段"
																	value="${product.productName }">
															</div>
															
															<div class="proItem" id="creationTime-error">
																<div class="itemTitle">创作时间</div>
																<input type="text" class="" id="creationTime"
																	placeholder="请选择作品创作时间" readonly="readonly"
																	value="">
															</div>
															<div class="proItem noItem">
																<div class="itemTitle">视频封面</div>
																<ul>
																	<li>
																		<div class="upBanner" id='upBtn-pic'>上传封面</div>
																		<div class="findEx" id="findEx">查看示例</div>
																	</li>
																	<li>
																			<img id="LDimg" src="/resources/images/index/noImg.jpg">
																			<input type="hidden" id='pic-LD-url' data-change="0">
																	</li>
																	<li>
																		<span>仅支持小于10M的png/jpg格式,推荐1280*720(16:9)分辨率</span>
																		<label>*</label>
																	</li>
																</ul>
																<div id="img-error"></div>
															</div>
															<div class="bottomUp">
																<c:if test='${product.productId == 0}'>
																	<div class="stateInfo">视频上传中 请勿刷新页面或者提交审核</div>
																</c:if>
																<div class="btn-c-g cancle" id="cancleUpload">取消</div>
																<div class="btn-c-r submit" id="infoBt">保存</div>
																
															</div>
														</div>
									</div>
	             </div>

	        	  <div class="step-four-div" id="step4" data-step="4">
                	
                	<div class="successCheck" id="successCheck">
                	     <div class="checkInfo">
                	        请确认提交信息的真实性，所有上传的作品均为注册公司真实作品。<br>
                                                             确认无误请点击提交审核，完成注册进入审核阶段。
                	     </div>
                	     <div class="scDiv">
                	           <div class="btn-c-g" id="step4Pre">上一步</div>
                	           <div class="btn-c-r" id="step4Next">提交审核</div>
                	     </div>
                	</div>
                	
                	 <div class="success" id="success">
                	 	 <ul class="ul-step-three">
                               <li>
					                  <div class="show-zero2 zeromodal-icon zeromodal-success">
									 	<span class="line tip"></span>
									   	<span class="line long"></span>
									  	<div class="placeholder"></div>
									  </div>	
                               </li> 
                               <li class="title">恭喜您注册成功，已进入审核阶段</li>
                               <li class="info">公司信息审核需要5个工作日，作品审核需要10个工作日。<br>审核结果将以邮件和短信的形式告知，请耐心等待。</li>
	                	 	   <li class="stepThreeLi">
	                	 	 	    <a href="/"><div class="btn-c-r">返回首页</div></a>
	                	 	 	 	<!-- <span class="step-three-word">自动跳转进</span><span class="step-three-word-top" id="to-top">个人信息</span><span class="step-three-word">页面</span><span  class="step-three-time" id="lasttime">0</span><span class="step-three-word">秒</span> -->
	                	 	   </li>
                	 	  </ul>	
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
	
	
	<div class="toolbar " id="toolbar-section" >
		<a href="javascript:void(0);" class="toolbar-item toolbar-item-weixin common-icons-tele-client" id="toolbar-item-weixin"></a>
		<a href="tencent://message/?uin=2640178216&Site=qq&Menu=yes" class="toolbar-item toolbar-item-qq common-icons-qq-client"></a>
		<a href="javascript:scroll(0,0)" id="top" class="toolbar-item toolbar-item-top common-icons-top-client"></a>
	</div>
	
	
</body>

</html>