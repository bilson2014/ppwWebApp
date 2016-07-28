<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss"/>
<spring:url value="/resources/css/provider/info.css" var="providerInfoCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js" var="blockUIJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/ajaxfileupload.js" var="ajaxfileuploadJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZHJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/provider/info.js" var="providerInfoJs"/>

<spring:url value="/resources/img" var="path" />

<spring:url value="/resources/images" var="imgPaths" />
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
	<link rel="stylesheet" href="${providerInfoCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${blockUIJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${ajaxfileuploadJs }" ></script>
	<script src="${datepickerJs }" ></script>
	<script src="${datepickerZHJs }" ></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${providerInfoJs }"></script>
	<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
	<spring:url value="/resources/images/provder" var="imgPath"/>
</head>
<body>
	<input type="hidden" value="${provider.teamId }" id="company-id"/>
	<div class="content-wrap">
		
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#info" aria-controls="info" role="tab" data-toggle="tab">基本信息</a></li>
			<li role="presentation"><a href="#safe" aria-controls="safe" role="tab" data-toggle="tab">安全设置</a></li>
			<li role="presentation"><a href="#logo" aria-controls="logo" role="tab" data-toggle="tab">供应商LOGO</a></li>
			<li role="presentation"><a href="#band" aria-controls="band" role="tab" data-toggle="tab">三方绑定</a></li>
		</ul>

		<!-- Tab panes -->
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane fade in active" id="info">
				<div class="form-wrap">
					<form class="form-horizontal" autocomplete="off" accept-charset="UTF-8">
						<fieldset>
							<!-- 成功提示框 start -->
							<div class="tooltip-success-show" style="display: none;">
								<label class="tooltip-success-message">信息更新成功</label>
							</div>
							<!-- 成功提示框  end -->
							<!-- 错误提示框 start -->
							<div class="tooltip-show" style="display: none;">
								<label class="tooltip-message"></label>
							</div>
							<!-- 错误提示框  end -->
							<div class="form-group">
								<label for="company-name" class="col-sm-2 control-label">公司名称</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="company-name" maxlength="32" placeholder="公司名称为必填字段" value="${provider.teamName }">
								</div>
								<span style="color:red;">*</span>
							</div>
							<div class="form-group">
								<label for="company-email" class="col-sm-2 control-label">公司邮箱</label>
								<div class="col-sm-6">
									<input type="email" class="form-control" id="company-email" placeholder="请填写公司邮箱" value="${provider.email }">
								</div>
								<span style="color:red;">*</span>
							</div>
							<div class="form-group">
								<label for="company-address" class="col-sm-2 control-label">公司地址</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="company-address" placeholder="请填写公司地址" value="${provider.address }">
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<!-- add more file start -->
							<div class="form-group">
								<label for="company-linkman" class="col-sm-2 control-label">联系人</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="company-linkman" placeholder="联系人是必填项" value="${provider.linkman }">
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-phoneNumber" class="col-sm-2 control-label">手机号码</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="company-phoneNumber" placeholder="手机号是必填项" value="${provider.phoneNumber }">
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-webchat" class="col-sm-2 control-label">微信号</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="company-webchat" placeholder="微信号是必填项" value="${provider.webchat }">
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-qq" class="col-sm-2 control-label">QQ</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="company-qq" placeholder="QQ号码是必填项" value="${provider.qq }">
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-establishDate" class="col-sm-2 control-label">成立时间</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="company-establishDate" placeholder="请选择公司成立时间" readonly="readonly" value="${provider.establishDate }">
								</div>
							</div>
							
							<div class="form-group">
								<label for="company-officialSite" class="col-sm-2 control-label">官网</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="company-officialSite" placeholder="格式:http://www.example.com" value="${provider.officialSite }">
								</div>
							</div>
							
							<div class="form-group">
								<label for="company-city" class="col-sm-2 control-label">所在省</label>
								<div class="col-sm-2">
									<input type="hidden" id="company-city-value" value="${provider.city }"/>
									<select class="form-control" id="company-province" ><!-- 省市级联 省 -->
										<c:if test="${!empty provinces}">
											<c:forEach items="${provinces }" var="source" varStatus="status">
											  <option value ="${source.provinceID }"
											  	<c:if test="${provider.teamProvince == source.provinceID }">
											  		selected="selected"
											  	</c:if> >${source.provinceName }</option>
											</c:forEach>
										</c:if>
									</select>
							    </div>
							    
							    <label for="company-city" class="col-sm-2 control-label">所在市</label>
							    <div class="col-sm-2">
									<select class="form-control" id="company-city" ><!-- 省市级联 市 -->
									<c:if test="${!empty citys}">
											<c:forEach items="${citys }" var="source" varStatus="status">
											  <option value ="${source.cityID }"
											  	<c:if test="${provider.teamCity == source.cityID }">
											  		selected="selected"
											  	</c:if> >${source.city }</option>
											</c:forEach>
										</c:if>
									</select>
								</div>	
								<span style="color:red;">*</span>
							  </div>  		
			<%-- 				<div class="form-group">	
								<label for="company-city" class="col-sm-2 control-label">所在市</label>	
								  <div class="col-sm-6">
									<select class="form-control" id="company-city" ><!-- 省市级联 市 -->
									<c:if test="${!empty citys}">
											<c:forEach items="${citys }" var="source" varStatus="status">
											  <option value ="${source.cityID }"
											  	<c:if test="${provider.teamCity == source.cityID }">
											  		selected="selected"
											  	</c:if> >${source.city }</option>
											</c:forEach>
										</c:if>
									</select>
								</div>	
								<span style="color:red;">*</span>
							</div> --%>
							
							<div class="form-group">
								<label for="company-priceRange" class="col-sm-2 control-label">价格区间</label>
								<div class="col-sm-6">
								<input type="hidden" id="company-priceRange-value" value="${provider.priceRange }"/>
									<select class="form-control" id="company-priceRange" >
										<option value="0" >看情况</option>
			            				<option value="1" >1万元及以上</option>
			            				<option value="2" >2万元及以上</option>
			            				<option value="3" >3万元及以上</option>
			            				<option value="4" >5万元及以上</option>
			            				<option value="5" >10万元及以上</option>
									</select>
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-infoResource" class="col-sm-2 control-label">获知渠道</label>
								<div class="col-sm-6">
									<input type="hidden" id="company-infoResource-value" value="${provider.infoResource }"/>
									<select class="form-control" id="company-infoResource" >
										<option value="0" >友情推荐</option>
			            				<option value="1" >网络搜索</option>
			            				<option value="2" >拍片帮</option>
			            				<option value="3" >拍片网</option>
									</select>
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-business" class="col-sm-2 control-label">业务范围</label>
								<input type="hidden" value="${provider.business }" id="company-business"/>
								<div class="col-sm-6">
									<div class="checkbox" id="business-checkbox">
										<label>
											<input type="checkbox" name="business" value="0" /> 广告
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="1"/> 宣传片
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="2"/> 真人秀
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="3"/> 纪录片
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="4"/> 病毒视频
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="5"/> 电视栏目
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="6"/> 三维动画
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="7"/> MG动画
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="8"/> 体育赛事
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="9"/> 专题片
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="10"/> VR拍摄
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="11"/> 产品拍摄
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="12"/> 微电影
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="13"/> 航拍
									    </label>
									    
									    <label>
											<input type="checkbox" name="business" value="14"/> 活动视频
									    </label>
									    
									     <label>
											<input type="checkbox" name="business" value="15"/> 后期制作
									    </label>
									</div>
									
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-teamDesc" class="col-sm-2 control-label">公司简介</label>
								<div class="col-sm-6">
									<textarea class="form-control" id="company-teamDesc" rows="5" maxlength="200" placeholder="公司简介为必填字段">${provider.teamDescription }</textarea>
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-scale" class="col-sm-2 control-label">公司规模</label>
								<div class="col-sm-6">
									<textarea class="form-control" id="company-scale" rows="5" maxlength="200" placeholder="请填写坐班人数及坐班导演或合作导演，坐班后期等信息">${provider.scale }</textarea>
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-businessDesc" class="col-sm-2 control-label">主要客户</label>
								<div class="col-sm-6">
									<textarea class="form-control" id="company-businessDesc" rows="5" maxlength="200" placeholder="请填写主要客户/作品及价格">${provider.businessDesc }</textarea>
								</div>
							</div>
							
							<div class="form-group">
								<label for="company-demand" class="col-sm-2 control-label">对客户的要求</label>
								<div class="col-sm-6">
									<textarea class="form-control" id="company-demand" rows="5" maxlength="200" placeholder="请填写对客户的要求">${provider.demand }</textarea>
								</div>
								<span style="color:red;">*</span>
							</div>
							
							<div class="form-group">
								<label for="company-description" class="col-sm-2 control-label">备注</label>
								<div class="col-sm-6">
									<textarea class="form-control" id="company-description" rows="5" maxlength="200" placeholder="再次填写备注信息">${provider.description }</textarea>
								</div>
							</div>
							<!-- add more file end -->
							

							<div class="form-group">
								<div class="col-sm-offset-2 col-sm-6">
									<button type="button" class="btn btn-default" id="infoBt">保存</button>
									<div class="serviceId">
										<ul class="service-ul-left">
											<li><img src="${imgPath}/twocode.jpg"/></li>
											<li>管家服务号</li>
										</ul>
										<ul class="service-ul-right">
											<li class="service-phone">010-58612562</li>
											<li>管家服务热线</li>
										</ul>
								    </div>
								</div>
							</div>
							
						</fieldset>
					</form>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane fade in" id="safe">
				<div class="form-wrap" id="loginpwdupdate">
					<form class="form-horizontal" autocomplete="off" accept-charset="UTF-8">
						<fieldset>
							<!-- 成功提示框 start -->
							<div class="tooltip-success-show" style="display: none;">
								<label class="tooltip-success-message">信息更新成功</label>
							</div>
							<!-- 成功提示框  end -->
							<!-- 错误提示框 start -->
							<div class="tooltip-show" style="display: none;">
								<label class="tooltip-message"></label>
							</div>
							<!-- 错误提示框  end -->
							<div class="form-group">
								<label class="col-sm-2 control-label">用户名</label>
								<label class="col-sm-6 control-label field-label" style="text-align: left;" id="userName">${provider.loginName }</label>
							</div>
							<!-- 
							<div class="form-group">
								<label for="company-password" class="col-sm-2 control-label">密码</label>
								<div class="col-sm-6">
									<input type="password" class="form-control" id="company-password" maxlength="16" placeholder="请输入当前密码">
								</div>
								<span style="color:red;">*</span>
							</div>
							 -->
							<div class="form-group">
								<label for="company-newPassword" class="col-sm-2 control-label">新密码</label>
								<div class="col-sm-6">
									<input type="password" class="form-control" id="company-newPassword" maxlength="16" placeholder="请输入6-16位密码">
								</div>
								<span style="color:red;">*</span>
							</div>
							<div class="form-group">
								<label for="company-confirmPassword" class="col-sm-2 control-label">密码确认</label>
								<div class="col-sm-6">
									<input type="password" class="form-control" id="company-confirmPassword" maxlength="16" placeholder="请重新输入密码">
								</div>
								<span style="color:red;">*</span>
							</div>
							<div class="form-group">
									<label class="col-sm-2 control-label">验证码</label>
									<div class="col-sm-3">
										<input type="text" class="form-control" id="upd-veritifyCode" tabindex="2" placeholder="请输入验证码" autocomplete="off" />
									</div>
									<div class="col-sm-3">
										<button type="button" class="btn btn-default codeBt" id="upd-codeBt">获取验证码</button>
									</div>
									<div class="col-sm-4">
										<label id="upd-label-code" class="label-message hide" >请输入验证码</label>
										<label id="upd-label-code-error" class="label-message hide" >验证码错误</label>
									</div>
								</div>
							<div class="form-group">
								<div class="col-sm-offset-2 col-sm-6">
									<button type="button" class="btn btn-default" id="passwordBt">保存</button>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
				
				<div class="form-wrap" id="loginpwdinsert" >
					<form class="form-horizontal" autocomplete="off" accept-charset="UTF-8">
						<fieldset>
							<!-- 成功提示框 start -->
							<div class="tooltip-success-show" style="display: none;">
								<label class="tooltip-success-message">信息更新成功</label>
							</div>
							<!-- 成功提示框  end -->
							<!-- 错误提示框 start -->
							<div class="tooltip-show" style="display: none;">
								<label class="tooltip-message"></label>
							</div>
							<!-- 错误提示框  end -->
							<div class="form-group">
								<label class="col-sm-2 control-label">用户名</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="insUserName" maxlength="16" placeholder="请输入用户名">
								</div>
								<span style="color:red;">*</span>
							</div>
							<div class="form-group">
								<label for="company-password" class="col-sm-2 control-label">密码</label>
								<div class="col-sm-6">
									<input type="password" class="form-control" id="insPassword" maxlength="16" placeholder="请输入当前密码">
								</div>
								<span style="color:red;">*</span>
							</div>
							<div class="form-group">
								<label for="company-confirmPassword" class="col-sm-2 control-label">密码确认</label>
								<div class="col-sm-6">
									<input type="password" class="form-control" id="insTwoPassword" maxlength="16" placeholder="请重新输入密码">
								</div>
								<span style="color:red;">*</span>
							</div>
							<div class="form-group">
									<label class="col-sm-2 control-label">验证码</label>
									<div class="col-sm-3">
										<input type="text" class="form-control" id="veritifyCode" tabindex="2" placeholder="请输入验证码" autocomplete="off" />
									</div>
									<div class="col-sm-3">
										<button type="button" class="btn btn-default codeBt" id="codeBt">获取验证码</button>
									</div>
									<div class="col-sm-4">
										<label id="upd-label-code" class="label-message hide" >请输入验证码</label>
										<label id="upd-label-code-error" class="label-message hide" >验证码错误</label>
									</div>
								</div>
							<div class="form-group">
								<div class="col-sm-offset-2 col-sm-6">
									<button type="button" class="btn btn-default" id="insSubmit">保存</button>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
				
			</div>
			<div role="tabpanel" class="tab-pane fade in" id="logo">
				<div class="form-wrap">
					<!-- 成功提示框 start -->
					<div class="tooltip-success-show" style="display: none;">
						<label class="tooltip-success-message">信息更新成功</label>
					</div>
					<!-- 成功提示框  end -->
					<!-- 错误提示框 start -->
					<div class="tooltip-show" style="display: none;">
						<label class="tooltip-message"></label>
					</div>
					<!-- 错误提示框  end -->
					<input type="hidden" value="${provider.teamPhotoUrl }" id="logoPath"/>
					<img src="<%=request.getContextPath() %>/team/img/default.png" alt="供应商LOGO" class="img-thumbnail" id="logoImg">
					<div class="group-form">
						<p class="help-block" style="color: red;">点击图片打开文件</p>
						<button class="btn btn-primary" id="uploadBt" type="button">保存LOGO</button>
						<input type="file" id="file" name="file" style="display: none;"/>
						<p class="help-block">仅支持小于5M的png/jpg格式，推荐120*120分辨率<span style="color:red;">*</span></p>
					</div>
				</div>
			</div>
			
			<div role="tabpanel" class="tab-pane fade in" id="band">
			<!-- 成功提示框 start -->
			<div class="tooltip-success-show" style="display: none;">
				<label class="tooltip-success-message">信息更新成功</label>
			</div>
    		  <div class="noband" id="wechat">
			       <div class="inLine"><img src="${imgPaths}/icons/webcat.png"></div>
			       <div class="inLine vertical">
			            <ul>
			               <li>微信登录</li>
			               <li class="bandWord" id="wechatWord"></li>
			            </ul>
			       </div>
			       <div class="bandBtn"  data-status="0"  id="wechatBtn"></div>
			  </div>
					  
			 <div class="line"></div>
		  
			    <div class="noBand" id="qq">
				   <div class="inLine"><img src="${imgPaths}/icons/qq.png"></div>
				       <div class="inLine vertical">
				            <ul>
				               <li>QQ账号</li>
				               <li class="bandWord" id="qqWord"></li>
				            </ul>
				       </div>
				       <div class="bandBtn"  data-status="0"  id="qqBtn"></div>
				  </div>
				  
				  <div class="line"></div>
				  
		    <div class="noBand" id="wb">
			   <div class="inLine"><img src="${imgPaths}/icons/weibo.png"></div>
			       <div class="inLine vertical">
			            <ul>
			               <li>微博账号</li>
			               <li class="bandWord" id="wbWord"></li>
			            </ul>
			       </div>
			       <div class="bandBtn"  data-status="0"  id="wbBtn"></div>
			  </div>
			</div>
			
			
		</div>
	</div>
</body>
</html>