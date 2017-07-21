<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss"/>
<spring:url value="/resources/css/provider/info.css" var="providerInfoCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js" var="blockUIJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<%-- <spring:url value="/resources/lib/jquery/ajaxfileupload_userInfo.js" var="ajaxfileuploadJs"/> --%>
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZHJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/provider/comPro.js" var="commonJs"/>
<spring:url value="/resources/js/provider/info.js" var="providerInfoJs"/>
<spring:url value="/resources/images" var="path" />

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
	<title>供应商信息页面-拍片网</title>
	<link rel="shortcut icon" href="${path }/favicon.ico" >
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${datepickerCss }">
	<link rel="stylesheet" href="${webuploaderCss }">
	<link rel="stylesheet" href="${providerInfoCss }">
	<link rel="stylesheet" type="text/css" href="${webuploaderCss}">
	<spring:url value="/resources/lib/jquery.scroll/jquery.scrollbar.js" var="jsBarJs"/>
<spring:url value="/resources/lib/jquery.scroll/jquery.scrollbar.css" var="jsBarCss"/>
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${blockUIJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
<%-- 	<script src="${ajaxfileuploadJs }" ></script> --%>
	<script src="${webuploaderJs }" ></script>
	<script src="${datepickerJs }" ></script>
	<script src="${datepickerZHJs }" ></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${providerInfoJs }"></script>
	<script src="${webuploaderJs}"></script>
	<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
	<spring:url value="/resources/images/provder" var="imgPath"/>
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
<body style="height: auto;">
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" value="${provider.teamId }" id="company-id"/>
    <input type="hidden" id="bean-flag" value="${provider.flag }">
	<input type="hidden" id="bean-checkStatus" value="${provider.checkStatus }">
	<input type="hidden" id="checkDetails" value="${provider.checkDetails}">
	<input type="hidden" id="recommendation" value="${provider.recommendation }">
    <div class="proInfo">
     					  <div class="updateLogo">   
	      		                    <div class="title">公司LOGO</div>
		      		                <div class="user-img-content">
										<div class="user-icon">
											<img alt="用户头像" src="/resources/images/provider/initLogo.png" data-value="${provider.teamPhotoUrl }" class="img-circle" id="user-img"/>
											<input type="hidden" id="user_img_url" value="/resources/images/provider/initLogo.png">
										</div>
										<div class="upload-info">
											<label>仅支持小于250KB的png/jpg格式，推荐120*120分辨率</label>
										</div>
										<div class="upload-btn">
											<!-- <button class="btn btn-primary" id="uploadBt" type="button">上传头像</button> -->
											<div id="uploadBt">上传Logo</div>
											<input type="file" name="file" id="file" style="display: none;"/> 
											<div class="errorImg"></div>
										</div>
									</div>
							</div>	
                            <div class="infoItem" id="company-name-error">
                                <div class="title">公司名称</div>
                                <input type="text" class=" " id="company-name" maxlength="32" placeholder="公司名称为必填字段" value="${provider.teamName }">
                            </div>
               
                             <div class="infoItem" id="company-address-error">
                                <div class="title">详细地址</div>
                                <input type="text" class=" " id="company-address" placeholder="请填写详细地址" value="${provider.address }">
                            </div>
                            <div class="infoItem" id="company-linkman-error">
                                <div class="title">联系人姓名</div>
                                <input type="text" class=" " id="company-linkman" placeholder="联系人姓名是必填项" value="${provider.linkman }">
                            </div>
                            <div class="infoItem" id="company-phoneNumber-error">
                                <div class="title">手机号</div>
                                <input type="text" readonly class="noBorderInput" id="company-phoneNumber" placeholder="手机号是必填项" value="${provider.phoneNumber }">
                            </div>
                            <div class="infoItem" id="company-email-error">
                                <div class="title">邮箱</div>
                                <input type="email" class=" " id="company-email" placeholder="请填写公司邮箱" value="${provider.email }">
                            </div>
                            <div class="infoItem noImportant" id="company-webchat-error">
                                <div class="title">微信</div>
                                <input type="text" class=" " id="company-webchat" placeholder="微信是非必填项" value="${provider.webchat }">
                            </div>
                            <div class="infoItem noImportant" id="company-qq-error">
                                <div class="title">QQ</div>
                               <input type="text" class=" " id="company-qq" placeholder="QQ号码是非必填项" value="${provider.qq }">
                            </div>
                            <div class="infoItem noImportant" id="company-phoneNumber-error">
                                <div class="title" id="telNumber">座机</div>
                                <input type="text" readonly class="noBorderInput" id="company-phoneNumber" placeholder="座机" value="${provider.telNumber }">
                            </div>
                            <div class="infoItem noImportant">
                                <div class="title">从业时间</div>
                                <input type="text" class=" " id="company-establishDate" placeholder="请选择从业时间" readonly="readonly" value="${provider.establishDate }">
                            </div>
                            <div class="infoItem noImportant" id="web-error">
                                <div class="title">官网网址</div>
                               <input type="text" class=" " id="company-officialSite" placeholder="格式:http://www.example.com" value="${provider.officialSite }">
                            </div>
                            <div class="infoItem inline" id='getProvince-error'>
                            <div class="title">所在省</div>	
								<div class="dropdown leaderSelect select-city" id="company-priceRange-value">
										<button class="btn btn-default dropdown-toggle step-two-select-city" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span data-value ="${source.provinceID }"  id='getProvince'>${source.provinceName }</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu" id="selectUl" role="menu"
											aria-labelledby="dropdownMenu1">
											<c:if test="${!empty provinces}">
												<c:forEach items="${provinces }" var="source" varStatus="status">
													  <li class="Province" data-value ="${source.provinceID }"
													  	<c:if test="${provider.teamProvince == source.provinceID }">
													  		selected="selected"
													  	</c:if> >${source.provinceName }</li>
													</c:forEach>
												</c:if>									
										</ul>
							</div>
                            </div>
                            
                           <div class="infoItem inline-noLeft" id='getCity-error'>
	                            <div class="title">所在市</div>	
									<div class="dropdown leaderSelect select-city" id="company-priceRange-value">
										<button class="btn btn-default dropdown-toggle step-two-select-city" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
										<span id='getCity' data-value ="${source.cityID }">${source.city}</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu" id="selectUlCity" role="menu" aria-labelledby="dropdownMenu1">
											<c:if test="${!empty citys}">
													<c:forEach items="${citys }" var="source" varStatus="status">
													  <li data-value ="${source.cityID }"
													  	<c:if test="${provider.teamCity == source.cityID }">
													  		selected="selected"
										  				</c:if> >
										  					${source.city }
										  				</li>
													</c:forEach>
											</c:if>										
										</ul>
									</div>
	                            </div>
                            <div class="infoItem">
                                <div class="title">价格区间</div>
                                <div class="dropdown infoSelect priceRangeSelect" id="company-priceRange-value">
										<button class="btn dropdown-toggle" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span id='priceRange' data-value="${provider.priceRange }"></span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu" id="selectUl" role="menu" aria-labelledby="dropdownMenu1">
										    <li data-value="8">5千以内</li>
											<li data-value="7">5千-1万</li>
											<li data-value="6">1-3万</li>
											<li data-value="5">3-5万</li>
											<li data-value="4">5-10万</li>
											<li data-value="3">10-20万</li>
											<li data-value="2">20-50万</li>
											<li data-value="1">50万以上</li>
										</ul>
									</div>
                            </div>
                            
                             <div class="infoItem" id="company-scale-error">
                                <div class="title">规模</div>
                                 <div class="dropdown infoSelect priceScaleSelect" id="company-priceRange-value">
										<button class="btn dropdown-toggle" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span id='company-scale' data-value="${provider.scale }">请选择</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu" id="selectUl" role="menu" aria-labelledby="dropdownMenu1">
										    <li data-value="0">5人以下</li>
											<li data-value="1">5-10人</li>
											<li data-value="2">11-50人</li>
											<li data-value="3">51-100人</li>
											<li data-value="4">101-500人</li>
											<li data-value="5">500人以上</li>
										</ul>
									</div>
                            </div>
                            
                        <%--     <div class="infoItem">
                                <div class="title">获知渠道</div>
                                <div class="dropdown infoSelect infoResourceSelect" id="company-priceRange-value">
										<button class="btn dropdown-toggle" type="button"
											id="dropdownMenu1" data-toggle="dropdown">

											<span id='infoResource' data-value="${provider.infoResource }"></span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu" id="selectUl" role="menu"
											aria-labelledby="dropdownMenu1">
											<li data-value="0">友情推荐</li>
											<li data-value="1">网络搜索</li>
											<li data-value="2">拍片帮</li>
											<li data-value="3">拍片网</li>
											<li data-value="4">电销</li>
										</ul>
									</div>
                            </div> --%>
                            <div class="infoItem" id="Tags-error">
                                <div class="title">业务范围</div>
                                <div class="checkInfo">请选择公司/工作室所能创作的影片类型（多选）</div>
                                <input type="hidden" id="Tags" value="${provider.business}">
                              <ul class="ul-step-two marLeft" id="businessSkill" style="margin-top:10px">
	                                 <li><div class="getTag" name="business" data-value="宣传片">宣传片</div></li>
									 <li><div class="getTag" name="business" data-value="活动视频">活动视频</div></li>
							         <li><div class="getTag" name="business" data-value="病毒视频">病毒视频</div></li>
							         <li><div class="getTag" name="business" data-value="微电影">微电影</div></li>
									 <li><div class="getTag" name="business" data-value="MG动画">MG动画</div></li>
									 <li><div class="getTag" name="business" data-value="广告TVC">广告TVC</div></li>
								     <li><div class="getTag" name="business" data-value="真人秀节目">真人秀节目</div></li>
								     <li><div class="getTag" name="business" data-value="VR视频">VR视频</div></li>
								     <li><div class="getTag" name="business" data-value="教学视频"> 教学视频</div></li>
								     <li><div class="getTag" name="business" data-value="网络节目">网络节目</div></li>
								     <li><div class="getTag" name="business" data-value="网络剧">网络剧</div></li>
								     <li><div class="getTag" name="business" data-value="网络电影">网络电影</div></li>
								     <li><div class="getTag" name="business" data-value="MV">MV</div></li>
								     <li><div class="getTag" name="business" data-value="实验影片">实验影片</div></li>
								     <li><div class="getTag" name="business" data-value="电影预告片">电影预告片</div></li>
							         <li><div class="getTag" name="business" data-value="花絮">花絮</div></li>
								     <li><div class="getTag" name="business" data-value="演播室栏目">演播室栏目</div></li>
								     <li><div class="getTag" name="business" data-value="真人秀节目">真人秀节目</div></li>
									 <li><div class="getTag" name="business" data-value="综艺节目" >综艺节目</div></li>
									<li><div class="getTag" name="business" data-value="访谈" >访谈</div></li>
									<li><div class="getTag" name="business" data-value="三维建筑漫游动画" >三维建筑漫游动画</div></li>
									<li><div class="getTag" name="business" data-value="三维产品动画" >三维产品动画</div></li>
									<li><div class="getTag" name="business" data-value="三维角色动画" >三维角色动画</div></li>
									<li><div class="getTag" name="business" data-value="三维特效影片" >三维特效影片</div></li>
									<li><div class="getTag" name="business" data-value="Flash角色动画" >Flash角色动画</div></li>
									<li><div class="getTag" name="business" data-value="定格动画" >定格动画</div></li>
									<li><div class="getTag" name="business" data-value="二维逐帧动画" >二维逐帧动画</div></li>
									<li><div class="getTag" name="business" data-value="博物馆视频" >博物馆视频</div></li>
									<li><div class="getTag" name="business" data-value="展览视频" >展览视频</div></li>
									<li><div class="getTag" name="business" data-value="体验馆视频" >体验馆视频</div></li>
									<li><div class="getTag" name="business" data-value="异形投影视频" >异形投影视频</div></li>
									<li><div class="getTag" name="business" data-value="AR视频" >AR视频</div></li>
                                 </ul>   
                            </div>
 
                            	<div class="infoItem" id="skill-error">
											<input type="hidden" id="skill" value="${provider.skill}"/>
											<div class="title">业务技能</div>
											<div class="checkInfo">请选择公司/工作室所能承担的专业工作（多选）</div>
											<div class="checkTitle" style="margin-bottom: 12px;">创意策划</div>
											<div class="checkbox" id="business-checkbox">
												<ul class="ul-step-two marLeft businessSkill" id="getDream">
													<li>
														<div class="getTag" name="business" data-value="解说词">解说词</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="广告语">广告语</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="故事">故事</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="贴图分镜">贴图分镜</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="手绘分镜">手绘分镜</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="美术设计">美术设计</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="影片策略">影片策略</div>
													</li>
												</ul>
											</div>
											<div class="checkTitle">创作团队(必填)</div>
											<div class="checkbox" id="business-checkbox">
												<ul class="ul-step-two marLeft businessSkill" id="getTeamSkill">
													<li>
														<div class="getTag" name="business" data-value="导演">导演</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="制片">制片</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="摄影">摄影</div>
													</li>
												</ul>
											</div>
											<div class="checkTitle">后期制作</div>
											<div class="checkbox" id="business-checkbox">
												<ul class="ul-step-two marLeft businessSkill" id="getLast">
													<li>
														<div class="getTag" name="business" data-value="剪辑">剪辑</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="包装">包装</div>
													</li>
													<li>
														<div class="getTag" name="business" data-value="调色">调色</div>
													</li>
												</ul>
											</div>
	                        </div>
                            
                            
                            
                            <div class="infoItem" id="company-teamDesc-error">
                                <div class="title">公司简介</div>
                                <textarea class=" " id="company-teamDesc" rows="5" maxlength="200" placeholder="公司简介为必填字段">${provider.teamDescription }</textarea>
                            </div>
                           
                             <div class="infoItem noImportant">
                                <div class="title">备注</div>
                               <textarea class=" " id="company-description" rows="5" maxlength="200" placeholder="再次填写备注信息">${provider.description }</textarea>
                            </div>
                            <div class="infoBottom">
	                            <div class="infoSubmit btn-c-r" id="infoBt">提交审核</div>
                            </div>
                       </div>
</body>
</html>