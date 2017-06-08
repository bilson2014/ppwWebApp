<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/provider/leader.css" var="providerLeaderCss"/>
<spring:url value="/resources/css/provider/step-dc-style2.css" var="providerStepCss2"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/provider/leader.js" var="leaderJs"/>
<spring:url value="/resources/images" var="path" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>

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
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs}"></script>
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

	      <div class="step">
			  <div class="step-bar" id="step-bar">
			      <div class="first step-1" id="step-1" data-content="填写基本信息">1</div>
			      <div class="line"></div>
			      <div class="first" id="step-2" data-content="填写详细信息">2</div>
			      <div class="line"></div>
			      <div class="first" id="step-3" data-content="资质审核">3</div>
			  </div>
	      		 <div class="step-one-div" id="step1" data-step="1">
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
											<div id="uploadBt">上传头像</div>
											<input type="file" name="file" id="file" style="display: none;"/> 
										</div>
									</div>
							</div>	
  	 				      <div class="input-group-div" id="company-name-error">
  	      		       	 	  <span class="title-word">公司名称</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-name" placeholder="请填写公司名称" aria-describedby="basic-addon2">
  	      				  </div>
  	      				   <div class="input-group-div" id="company-linkman-error">
  	      		       	 	  <span class="title-word">联系人</span>	
  	      					  <input type="text"  class="form-control step-one-input" id="company-linkman" placeholder="请填写联系人" aria-describedby="basic-addon2">
  	      				  </div>
  	      				   <div class="input-group-div" id="company-webchat-error">
  	      		       	 	  <span class="title-word">微信号</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-webchat" placeholder="请填写微信号" aria-describedby="basic-addon2">
  	      				  </div>
  	      				   <div class="input-group-div" id="company-qq-error">
  	      		       	 	  <span class="title-word">QQ</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-qq" placeholder="请填写QQ" aria-describedby="basic-addon2">
  	      				  </div>
  	      				  <div class="input-group-div" id="company-email-error">
  	      		       	 	  <span class="title-word">公司邮箱</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-email" placeholder="请填写公司邮箱" aria-describedby="basic-addon2">
  	      				  </div>
  	      				   <div class="input-group-div" id="company-address-errors">
  	      		       	 	  <span class="title-word">公司地址</span>	
  	      					  <input type="text" class="form-control step-one-input" id="company-address" placeholder="请填写公司地址" aria-describedby="basic-addon2">
  	      				  </div>

  	      				  <div class="bottom-div">
				  	      	  	<Button class="red-btn margin-left btn-c-r" id="checkbtn">下一步</Button>
				  	      </div>
  	      		  </div>

                <div class="step-two-div" id="step2" data-step="2">
                <div class="input-group-div">
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

  	      			 <div class="input-group-div">
  	      		       	 	  <span for="company-priceRange" class="title-word">价格区间</span>	
  	      					  <input type="hidden" id="company-priceRange-value" value="${provider.priceRange }"/>
									<div class="dropdown leaderSelect" id="company-priceRange-value">
										<button class="btn btn-default dropdown-toggle step-two-select" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span id='indent_recomment' data-value="0">看情况</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu id="selectUl" role="menu"
											aria-labelledby="dropdownMenu1">
											<li data-value="0" >看情况</li>
											<li data-value="1" >1万元及以上</li>
				            				<li data-value="2" >2万元及以上</li>
				            				<li data-value="3" >3万元及以上</li>
				            				<li data-value="4" >5万元及以上</li>
				            				<li data-value="5" >10万元及以</li>
										</ul>
									</div>
  	      				  </div>

  	      				 <div class="input-group-div">
  	      		       	 	  <span for="company-infoResource" class="title-word">获知渠道</span>	
  	      						 <input type="hidden" id="company-infoResource-value" value="${provider.infoResource }"/>
									<div class="dropdown leaderSelect" id="company-infoResource">
										<button class="btn btn-default dropdown-toggle step-two-select" type="button"
											id="dropdownMenu1" data-toggle="dropdown">
											<span id='indent_qwe'>友情推荐</span>
											<div class="carets"></div>
										</button>
										<ul class="dropdown-menu id="selectUl" role="menu"
											aria-labelledby="dropdownMenu1">
											<li data-value="0">友情推荐</li>
											<li data-value="1">网络搜索</li>
											<li data-value="2">拍片帮</li>
											<li data-value="3">拍片网</li>
											<li data-value="4">电销</li>
										</ul>
									</div>
  	      				  </div> 

                             <div class="borderLine"></div>
  	      				  	 <div class="input-group-div"  id="business-checkbox-error">
  	      		       	 	  <span for="company-business" class="title-checkbox-word">业务范围</span>	
  	      					      <div class="checkbox" id="business-checkbox">
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
                </div>
                
                <div class="borderLine"></div>

                    <div class="input-group-div" id="company-teamDesc-error">
  	      		       	 	  <span class="title-checkbox-word" for="company-teamDesc">公司简介</span>
  	      		       	 	  <textarea class="form-control step-area" id="company-teamDesc" rows="4" maxlength="200" placeholder="公司简介为必填字段">${provider.teamDescription }</textarea>	
  	      				  </div>

  	      				   <div class="input-group-div bot-area" id="company-scale-error">
  	      		       	 	  <span class="title-checkbox-word" for="company-scale">公司规模</span>
  	      		       	 	  <textarea class="form-control step-area" id="company-scale" rows="4" maxlength="200" placeholder="公司规模为必填字段">${provider.teamDescription }</textarea>	
  	      				  </div>

  	      				   <div class="input-group-div bot-area">
  	      		       	 	  <span class="title-checkbox-word" for="company-demand">对客户要求</span>
  	      		       	 	  <textarea class="form-control step-area" id="company-demand" rows="4" maxlength="200" placeholder="客户要求为必填字段">${provider.teamDescription }</textarea>	
  	      				  </div>
     
                           <div class="bottom-div">
                           	  <Button class="red-btn btn-c-r" id="surebtn">提交</Button> <Button class="gy-btn"  id="backbtn">上一步</Button>    
                           </div>
               
	                   </div>	

	       	  <div class="step-three-div" id="step3" data-step="3">
                	 <div class="success">
                	 	 <ul class="ul-step-three">
                               <li>
					                  <div class="show-zero2 zeromodal-icon zeromodal-success">
									 	<span class="line tip"></span>
									   	<span class="line long"></span>
									  	<div class="placeholder"></div>
									  </div>	
                               </li> 
                               <li class="title">资质审核提交完成</li>
                               <li class="info">官方将在3个工作日内完成您的资质审核，敬请等候...</li>
                	 	 	  <li class="stepThreeLi">
                	 	 	 	<span class="step-three-word">自动跳转进</span><span class="step-three-word-top" id="to-top">个人信息</span><span class="step-three-word">页面</span><span  class="step-three-time" id="lasttime">0</span><span class="step-three-word">秒</span>
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
	<!-- photo Modal start -->
	<!-- foot -->
         					 <jsp:include flush="true" page="../foot.jsp"></jsp:include> 
                            <!--新版底部-->
	
	
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