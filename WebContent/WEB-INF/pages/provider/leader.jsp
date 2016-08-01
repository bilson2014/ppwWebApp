
<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/provider/leader.css" var="providerLeaderCss"/>
<spring:url value="/resources/css/provider/step-dc-style2.css" var="providerStepCss2"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/provider/leader.js" var="leaderJs"/>
<spring:url value="/resources/img" var="path" />

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
	<title>拍片网 | 供应商引导页</title>
	<link rel="stylesheet" type="text/css" href="${bootstrapCss}">
	<link rel="stylesheet" type="text/css" href="${providerLeaderCss}">
	<link rel="stylesheet" type="text/css" href="${providerStepCss2}">

	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs}"></script>
	<script src="${leaderJs}"></script>
</head>
<body>
  <input id="unqiueId" value="${unqiueId}" />
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
  					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理</a>
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
  			
  			<div class="middle-part">
  				<div class="search-box" id="header-search">
  					<form method="get" action="/search" id="s-form">
  						<input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />
  						<a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>
  						<ul id="shelper" class="shelper-lucency"></ul>
  					</form>
  				</div>
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


 

	      <div class="step">


  <div class="step-bar" id="step-bar">
      <div class="first">1.基本信息</div>
      <div class="first">2.详细信息</div>
      <div class="first">3.注册完成</div>
  </div>



	      	        <!--   <div class="step-title">
                                           <div class="step-bar step-1">
                                            <div class="first">1. 填写基本资料</div>
                                            <div class="second">2. 注册完成</div>
                                           </div>
                                      <div class="step-bar step-2">
                                                <div class="first">1. 填写基本资料</div>
                                                <div class="second">2. 注册完成</div>
                                        </div>
                  </div>   -->

	      		 <div class="step-one-div" id="step1" data-step="1">
  	 				      <div class="input-group-div">
  	      		       	 	  <span class="title-word">公司名称</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-name" placeholder="请填写公司名称" aria-describedby="basic-addon2">
  	      					  <span class="error-word" id="company-name-error">公司名称未填写</span>
  	      				  </div>
  	      				   <div class="input-group-div">
  	      		       	 	  <span class="title-word">联系人</span>	
  	      					  <input type="text"  class="form-control step-one-input" id="company-linkman" placeholder="请填写联系人" aria-describedby="basic-addon2">
  	      					  <span class="error-word" id="company-linkman-error">联系人未填写</span>
  	      				  </div>
  	      				   <div class="input-group-div hide">
  	      		       	 	  <span class="title-word">密码</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-pwd" placeholder="请填写密码" aria-describedby="basic-addon2">
  	      					  <span class="error-word" id="company-pwd-error">密码未填写</span>
  	      				  </div>
  	      				   <div class="input-group-div">
  	      		       	 	  <span class="title-word">微信号</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-webchat" placeholder="请填写微信号" aria-describedby="basic-addon2">
  	      					  <span class="error-word" id="company-webchat-error">微信号未填写</span>
  	      				  </div>
  	      				   <div class="input-group-div">
  	      		       	 	  <span class="title-word">QQ</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-qq" placeholder="请填写QQ" aria-describedby="basic-addon2">
  	      					  <span class="error-word" id="company-qq-error">QQ未填写</span>
  	      				  </div>
  	      				  <div class="input-group-div">
  	      		       	 	  <span class="title-word">公司邮箱</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-email" placeholder="请填写公司邮箱" aria-describedby="basic-addon2">
  	      					  <span class="error-word" id="company-email-error">公司邮箱未填写</span>
  	      				  </div>
  	      				   <div class="input-group-div">
  	      		       	 	  <span class="title-word">公司地址</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-address" placeholder="请填写公司地址" aria-describedby="basic-addon2">
  	      					  <span class="error-word" id="company-address-error">公司地址未填写</span>
  	      				  </div>

  	      				  <div class="bottom-div">
				  	      	  	<Button class="red-btn" id="checkbtn">下一步</Button>
				  	      </div>
  	      		  </div>

                <div class="step-two-div hide" id="step2" data-step="2">


                <div class="input-group-div">
  	      			<span for="company-city" class="title-word">所在城市</span>	
							<select class="step-two-select-city form-control" id="company-province"   >
								<c:if test="${!empty provinces}">
									<c:forEach items="${provinces }" var="source" varStatus="status">
									  <option value ="${source.provinceID }"
									  	<c:if test="${provider.teamProvince == source.provinceID }">
									  		selected="selected"
									  	</c:if> >${source.provinceName }</option>
									</c:forEach>
								</c:if>
							</select>
									
					<span for="company-city" class="title-word-city">所在省</span>	
							<select class="step-two-select-city form-control"  id="company-city">
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

  	      			 <div class="input-group-div">
  	      		       	 	  <span for="company-priceRange" class="title-word">价格区间</span>	
  	      					  <input type="hidden" id="company-priceRange-value" value="${provider.priceRange }"/>
									<select class="step-two-select form-control" id="company-priceRange" >
										<option value="0" >看情况</option>
			            				<option value="1" >1万元及以上</option>
			            				<option value="2" >2万元及以上</option>
			            				<option value="3" >3万元及以上</option>
			            				<option value="4" >5万元及以上</option>
			            				<option value="5" >10万元及以上</option>
									</select>
  	      				  </div>

  	      				 <div class="input-group-div">
  	      		       	 	  <span for="company-infoResource" class="title-word">获知渠道</span>	
  	      						 <input type="hidden" id="company-infoResource-value" value="${provider.infoResource }"/>
									<select class="step-two-select form-control" id="company-infoResource" >
										<option value="0" >友情推荐</option>
			            				<option value="1" >网络搜索</option>
			            				<option value="2" >拍片帮</option>
			            				<option value="3" >拍片网</option>
									</select>
  	      				  </div> 


  	      				  	 <div class="input-group-div">
  	      		       	 	  <span for="company-business" class="title-checkbox-word">业务范围</span>	
  	      					      <div class="checkbox" id="business-checkbox">
										<ul class="ul-step-two">
											<li>	
												<input type="checkbox" name="business" value="0" /> 广告
									    	</li>
									    	<li>
												<input type="checkbox" name="business" value="1"/> 宣传片
									   	 	</li>
									    	<li>
												<input type="checkbox" name="business" value="2"/> 真人秀
									    	</li>
									    	<li>
												<input type="checkbox" name="business" value="3"/> 纪录片
									    	</li>
									    </ul>
									    <ul class="ul-step-two">
											<li>
												<input type="checkbox" name="business" value="4"/> 病毒视频
									  	  	</li>
									    	<li>
												<input type="checkbox" name="business" value="5"/> 电视栏目
									    	</li>
									   	 	<li>
												<input type="checkbox" name="business" value="6"/> 三维动画
									   		</li>
									   		<li>
												<input type="checkbox" name="business" value="7"/> MG动画
									  		</li>
									    </ul>
									    <ul class="ul-step-two">
									    	<li>
												<input type="checkbox" name="business" value="8"/> 体育赛事
										    </li>
										    <li>
												<input type="checkbox" name="business" value="9"/> 专题片
											</li>
                                             <li> 
												<input type="checkbox" name="business" value="10"/> VR拍摄
											</li>
											<li>
												<input type="checkbox" name="business" value="11"/> 产品拍摄
										    </li>
										</ul>    
										<ul class="ul-step-two">
											<li>
												<input type="checkbox" name="business" value="12"/> 微电影
										    </li>
										    <li>
												<input type="checkbox" name="business" value="13"/> 航拍
										    </li>
										    <li>
												<input type="checkbox" name="business" value="14"/> 活动视频
										    </li>
										    <li>
												<input type="checkbox" name="business" value="15"/> 后期制作
										    </li>
										 </ul>   
										  <span class="error-area-word" id="business-checkbox-error">业务未填写</span>
									</div>
                </div>

                    <div class="input-group-div">
  	      		       	 	  <span class="title-checkbox-word" for="company-teamDesc">公司简介</span>
  	      		       	 	  <textarea class="form-control step-area" id="company-teamDesc" rows="4" maxlength="200" placeholder="公司简介为必填字段">${provider.teamDescription }</textarea>	
  	      					  <span class="error-area-word" id="company-teamDesc-error">公司简介未填写</span>
  	      				  </div>

  	      				   <div class="input-group-div bot-area">
  	      		       	 	  <span class="title-checkbox-word" for="company-scale">公司规模</span>
  	      		       	 	  <textarea class="form-control step-area" id="company-scale" rows="4" maxlength="200" placeholder="公司规模为必填字段">${provider.teamDescription }</textarea>	
  	      					  <span class="error-area-word" id="company-scale-error">公司规模未填写</span>
  	      				  </div>

  	      				   <div class="input-group-div bot-area">
  	      		       	 	  <span class="title-checkbox-word" for="company-demand">对客户要求</span>
  	      		       	 	  <textarea class="form-control step-area" id="company-demand" rows="4" maxlength="200" placeholder="客户要求为必填字段">${provider.teamDescription }</textarea>	
  	      					  <span class="error-area-word" id="company-demand-error">对客户要求未填写</span>
  	      				  </div>
     
                           <div class="bottom-div">
                           	 <Button class="red-btn btn-left"  id="surebtn">确定</Button>        <Button class="red-btn btn-right" id="backbtn">上一步</Button>
                           </div>
                </div>
	      </div>	

	       	  <div class="step-three-div hide" id="step3" data-step="3">
                	 <div class="input-group-div">
                	 	 <ul class="ul-step-three">
                	 	 	 <li>
                	 	 	 	<img src="/resources/images/provder/check.png "/>
                	 	 	 </li>
                	 	 	  <li>
                	 	 	  	<span class="step-three-title">提交完成等待审核</span>
                	 	 	 </li>
                	 	 	  <li class="stepThreeLi">
                	 	 	 	<span  class="step-three-time" id="lasttime">0</span><span class="step-three-word">秒后自动到</span><span class="step-three-word-top" id="to-top">供应商主页</span>
                	 	 	 </li>

                	 	  </ul>	
                	 </div>
              </div>	

	   </div>


	 <div class="footer">
		<div class="footer-wrap">
			<div class="footer-content">
			
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >登录</a>
					<a href="<spring:url value="/mgr/login" />" target="_self">视频管家登录</a>
					<a href="<spring:url value="/provider/login" />" target="_self">供应商登录</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >联系我们</a>
					<a href="tel:010-59005941" class="qqClient"><label class="tel-icon"></label><h3>010-59005941</h3></a>
					<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>2640178216</h3></a>
					<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>3299894058</h3></a>
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
	</div>
	
	<div class="toolbar " id="toolbar-section" >
		<a href="javascript:void(0);" class="toolbar-item toolbar-item-weixin common-icons-tele-client" id="toolbar-item-weixin"></a>
		<a href="tencent://message/?uin=2640178216&Site=qq&Menu=yes" class="toolbar-item toolbar-item-qq common-icons-qq-client"></a>
		<a href="javascript:scroll(0,0)" id="top" class="toolbar-item toolbar-item-top common-icons-top-client"></a>
	</div>
	
	<div class="modal fade" id="toolbar-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<div class="common-icons-know-us-close-icon modal-icon" data-dismiss="modal" aria-label="Close"></div>
					<dl>
						<dt>
							<h3 id="modal-h3-first">马上接通视频营销管家</h3>
						</dt>
						
						<dd id="modal-dd-second">
							<input placeholder="输入电话，我们即刻回电!" type="text" id="phoneCall"/>
							<a href="javascript:void(0);" id="modal-call">
								<div class="call-btn">
									<label class="call-icon common-icons-telephone"></label> 闪电接通
								</div>
							</a>
							<label class="modal-message" style="display: none;"></label>
						</dd>
						
						<dt >
							<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no"><div class="model-qq-icon common-icons-qq-icon"></div></a>
						</dt>

						<dd>
							<h4>和QQ客服聊会</h4>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div> 

</body>

</html>