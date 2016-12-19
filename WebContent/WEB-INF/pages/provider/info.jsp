<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
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
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/provider/info2.js" var="providerInfoJs"/>

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
	<title>拍片网 | 供应商信息页面</title>
	<link rel="shortcut icon" href="${path }/favicon.ico" >
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${datepickerCss }">
	<link rel="stylesheet" href="${webuploaderCss }">
	<link rel="stylesheet" href="${providerInfoCss }">
	<link rel="stylesheet" type="text/css" href="${webuploaderCss}">
	
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
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" value="${provider.teamId }" id="company-id"/>
    
     <div class="proInfo">
     					  <div class="updateLogo">   
	      		                    <div class="title">公司LOGO</div>
		      		                <div class="user-img-content">
										<div class="user-icon">
											<img alt="用户头像" src="/resources/images/provider/initLogo.png" class="img-circle" id="user-img"/>
											<input type="hidden" id="user_img_url" value="/resources/images/index/db13.jpg">
										</div>
										<div class="upload-info">
											<label>您上可以上传JPG、	GIF或PNG格式的文件，文件大小不能超过2M</label>
										</div>
										<div class="upload-btn">
											<!-- <button class="btn btn-primary" id="uploadBt" type="button">上传头像</button> -->
											<div id="uploadBt">上传头像</div>
											<input type="file" name="file" id="file" style="display: none;"/> 
										</div>
									</div>
							</div>	
     
                            <div class="infoItem">
                                <div class="title">公司名称</div>
                                <input type="text" class=" " id="company-name" maxlength="32" placeholder="公司名称为必填字段" value="${provider.teamName }">
                            </div>
                             <div class="infoItem">
                                <div class="title">公司邮件</div>
                                <input type="email" class=" " id="company-email" placeholder="请填写公司邮箱" value="${provider.email }">
                            </div>
                             <div class="infoItem">
                                <div class="title">公司地址</div>
                                <input type="text" class=" " id="company-address" placeholder="请填写公司地址" value="${provider.address }">
                            </div>
                            <div class="infoItem">
                                <div class="title">联系人</div>
                                <input type="text" class=" " id="company-linkman" placeholder="联系人是必填项" value="${provider.linkman }">
                            </div>
                            <div class="infoItem">
                                <div class="title">手机号</div>
                                <input type="text" readonly class=" " id="company-phoneNumber" placeholder="手机号是必填项" value="${provider.phoneNumber }">
                            </div>
                            <div class="infoItem">
                                <div class="title">微信号</div>
                                <input type="text" class=" " id="company-webchat" placeholder="微信号是必填项" value="${provider.webchat }">
                            </div>
                            <div class="infoItem">
                                <div class="title">QQ</div>
                               <input type="text" class=" " id="company-qq" placeholder="QQ号码是必填项" value="${provider.qq }">
                            </div>
                            <div class="infoItem noImportant">
                                <div class="title">成立时间</div>
                                <input type="text" class=" " id="company-establishDate" placeholder="请选择公司成立时间" readonly="readonly" value="${provider.establishDate }">
                            </div>
                            <div class="infoItem noImportant">
                                <div class="title">公司官网</div>
                               <input type="text" class=" " id="company-officialSite" placeholder="格式:http://www.example.com" value="${provider.officialSite }">
                            </div>
                            <div class="infoItem inline">
                            <div class="title">所在省</div>	
								<div class="dropdown leaderSelect select-city" id="company-priceRange-value">
										<button class="btn btn-default dropdown-toggle step-two-select-city" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span data-value ="${source.provinceID }"  id='getProvince'>${source.provinceName }</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu id="selectUl" role="menu"
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
                            
                           <div class="infoItem inline-noLeft">
	                            <div class="title">所在市</div>	
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
                            <div class="infoItem">
                                <div class="title">价格区间</div>
                                <div class="dropdown infoSelect" id="company-priceRange-value">
										<button class="btn dropdown-toggle" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span id='indent_recomment' data-value="0">看情况</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu" id="selectUl" role="menu"
											aria-labelledby="dropdownMenu1">
											<li data-value="0">看情况</li>
											<li data-value="0">1万元及以上</li>
											<li data-value="1">2万元及以上</li>
											<li data-value="2">3万元及以上</li>
											<li data-value="3">5万元及以上</li>
											<li data-value="4">10万元及以上</li>
										</ul>
									</div>
                            </div>
                            <div class="infoItem">
                                <div class="title">获知渠道</div>
                                <div class="dropdown infoSelect" id="company-priceRange-value">
										<button class="btn dropdown-toggle" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span id='indent_recomment' data-value="0">友情推荐</span>
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
                            </div>
                            <div class="infoItem">
                                <div class="title">业务范围</div>
                                
                                 <ul class="ul-step-two">
                                      <li>  
                                        <div class="getTag" name="business" data-value="0"> 广告</div>
                                      </li>
                                      <li>  
                                        <div class="getTag" name="business" data-value="16" /> TVC</div>
                                      </li>
                                      <li>
                                        <div class="getTag" name="business" data-value="1"/> 宣传片</div>
                                      </li>
                                      <li>
                                        <div class="getTag" name="business" data-value="2"/> 真人秀</div>
                                      </li>
                                      <li>
                                        <div class="getTag" name="business" data-value="3"/> 纪录片</div>
                                      </li>
                                    <li>
                                      <div class="getTag" name="business" data-value="4"/> 病毒视频</div>
                                        </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="5"/> 电视栏目</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="17"/> MV</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="6"/> 三维动画</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="7"/> MG动画</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="8"/> 体育赛事</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="9"/> 专题片</div>
                                    </li>
                                      <li> 
                                      <div class="getTag" name="business" data-value="10"/> VR拍摄</div>
                                    </li>
                                    <li>
                                      <div class="getTag" name="business" data-value="11"/> 产品拍摄</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="12"/> 微电影</div>
                                      </li>
                                  
                                      <li>
                                      <div class="getTag" name="business" data-value="13"/> 航拍</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="14"/> 活动视频</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="15"/> 后期制作</div>
                                      </li>
                                      <li>
                                      <div class="getTag" name="business" data-value="18"/> 包装</div>
                                      </li>
                                   </ul>   
                            </div>
                            <div class="infoItem">
                                <div class="title">公司简介</div>
                                <textarea class=" " id="company-teamDesc" rows="5" maxlength="200" placeholder="公司简介为必填字段">${provider.teamDescription }</textarea>
                            </div>
                            <div class="infoItem">
                                <div class="title">公司规模</div>
                                <textarea class=" " id="company-scale" rows="5" maxlength="200" placeholder="请填写坐班人数及坐班导演或合作导演，坐班后期等信息">${provider.scale }</textarea>
                            </div>
                            <div class="infoItem noImportant">
                                <div class="title">主要客户</div>
                                <textarea class=" " id="company-businessDesc" rows="5" maxlength="200" placeholder="请填写主要客户/作品及价格">${provider.businessDesc }</textarea>
                            </div>
                             <div class="infoItem">
                                <div class="title">对客户要求</div>
                               <textarea class=" " id="company-demand" rows="5" maxlength="200" placeholder="请填写对客户的要求">${provider.demand }</textarea>
                            </div>
                             <div class="infoItem noImportant">
                                <div class="title">备注</div>
                               <textarea class=" " id="company-description" rows="5" maxlength="200" placeholder="再次填写备注信息">${provider.description }</textarea>
                            </div>
                            <div class="infoBottom">
	                            <div class="infoSubmit btn-c-r" id="submitCheck">提交审核</div>
                            </div>
                       </div>
</body>
</html>