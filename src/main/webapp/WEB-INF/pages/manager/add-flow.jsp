<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/lib/h5bp/h5bp.css" var="h5bpCss" />
<spring:url value="/resources/css/commons.css" var="commonCss" />
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/html5shiv/html5shiv.js"
	var="html5shivJs" />
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js"
	var="blockUIJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/lib/jquery.cookie/jquery.cookie.js"
var="cookiejs" />
<spring:url value="/resources/js/model.js" var="modelJs" />
<spring:url value="/resources/css/flow/addflow.css" var="addflowcss" />
<spring:url value="/resources/js/flow/addflow.js" var="addflowjs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs" />
<spring:url value="/resources/lib/jquery/ajaxfileupload.js"
var="ajaxfileuploadJs" />
	<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="${normalizeCss }">
<link rel="stylesheet" href="${h5bpCss }">
<link rel="stylesheet" href="${commonCss }">
<link rel="stylesheet" href="${bootstrapCss }">
<link rel="stylesheet" href="${addflowcss }">
<link rel="stylesheet" href="${datepickerCss }">

<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${blockUIJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${cookiejs }"></script>
<script src="${modelJs }"></script>
<script type="text/javascript" src="${addflowjs }"></script>
<script type="text/javascript" src="${ajaxfileuploadJs}"></script>
<script type="text/javascript" src="${datepickerJs }"></script>
<script type="text/javascript" src="${datepickerZhJs }"></script>
<script type="text/javascript" src="${bootstrapJs }"></script>
<script type="text/javascript">
function checkMobile(str) {
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/;
	if(str.match(reg)){
		return true;
	} else{
		return false;
	}
}
</script>

</head>
<body >
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<jsp:include flush="true" page="../header.jsp"></jsp:include> 
<div class="page" >
<input type="hidden" value="<r:outName />"  id="logiNname">
	<div class="page-title">
		<label class="page-title-title">项目信息添加</label>
	</div>
	<input type="hidden" id="key" style="display: none;" value="${key}">
	<label class="state" >${state }</label>
    <div class="infobody">
		<div class="baseinfo">
			<div class="baseinfo-right">
                   <div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key font-weight-title">项目信息</div>
						</div>
						<div class="divtable" id="div-projectId">
							<div class="baseinfo-table-key">项目编号</div>
							<input type="text" readonly="readonly" class="tableinput-baseinfo projectId form-control">
							<label class="error-label" id="error-projectId">该信息不能为空</label>
						</div>
						<div class="divtable" id="div-projectName">
							<div class="baseinfo-table-key">项目名称</div>
							<input type="text" class="tableinput-baseinfo  projectName form-control">
							<label class="error-label" id="error-projectName">该信息不能为空</label>
						</div>
                   </div>
                  <div class="baseinfo-table">
						<div class="divtable">
							<div class="baseinfo-table-key font-weight-title">来源信息</div>
						</div>
						<div class="divtable" id="div-projectSource">
							<div class="baseinfo-table-key" >项目来源</div>
							<select class="tableinput-baseinfo form-control selectdiv" id="projectSource" >
								<option value="推广">推广</option>
								<option value="活动">活动</option>
								<option value="新媒体">新媒体</option>
								<option value="渠道">渠道</option>
								<option value="线下拓展">线下拓展</option>
								<option value="市场活动">市场活动</option>
								<option value="社区运营">社区运营</option>
								<option value="自主开发">自主开发</option>
								<option value="电销">电销</option>
								<option value="复购">复购</option>
								<option value="推荐">推荐</option>
							</select>
							<label class="error-label" id="error-projectSource">该信息不能为空</label>
						</div>
						<div class="divtable hide" id="div-friendship">
							<input type="hidden" id="referrer-Id-hidden">
							<div class="baseinfo-table-key">推荐人</div>
							<input type="text" id="input-referrer" class="tableinput-baseinfo form-control">
							<label class="error-label" id="error-input-referrer">该信息有误</label>
						</div>
						<ul class="ul-option-source" style="" id="ul-select-referrer">
						</ul>  
                   </div>
                   
                    <div class="cooperative-div">
						<div class="divtable">
							<div class="cooperative-table-key font-weight-title">协同人信息</div>
							<div class="cooperative-table-key pos-top glyphicon glyphicon-plus" data-id="1" id="add-Synergy"></div>
						</div>
							<div>
								<div id="cooperative-id">
									<div class="cooperative">协同人名称</div>
									<div class="cooperative pos-left">比例</div>
								</div>
								<div id="Synergy-root" style="display: inline-block;">
								</div>
							</div>
						<label id="helpLabel" style="position: relative;left: 273px;font-size: 14px;color: #B8B8B8">无协同人信息</label>
                   </div>
                   <div class="baseinfo-table">
                   		<input type="hidden" class="userId" id="userId">
						<div class="divtable">
							<div class="baseinfo-table-key font-weight-title">客户信息</div>
						</div>
						<div class="divtable" id="div-userName">
							<div class="baseinfo-table-key">客户名称</div>
							<div class="tableinput-baseinfo-noborder userName" id="userName-id">
								<input id="userName"  class="info-input border-gray form-control"/>
								<label class="username-error-label" id="error-userName">客户不存在</label>
							</div>
						</div>
						<div class="divtable" id="div-userContact">
							<div class="baseinfo-table-key">客户联系人</div>
							<input type="text" class="tableinput-baseinfo form-control userContact">
							<label class="error-label" id="error-userContact" >该信息不能为空</label>
						</div>
						<div class="divtable" id="div-userPhone">
							<div class="baseinfo-table-key">客户电话</div>
							<input type="text" class="tableinput-baseinfo form-control userPhone">
							<label class="error-label" id="error-userPhone" >号码有误</label>
						</div>
						<ul class="ul-option" id="ul-select"></ul>
                   </div>
				<div class="baseinfo-table">
						<input type="hidden" class="teamId" id="teamId">
						<div class="divtable">
							<div class="baseinfo-table-key font-weight-title">供应商信息</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商名称</div>
							<div class="tableinput-baseinfo-noborder teamName" id="teamName-id" >
								<input id="teamName" class="info-input form-control " id="error-teamName"/>
								<label class="error-label" id="error-teamName" >供应商不存在</label>
							</div>
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商联系人</div>
							<input type="text"  id="error-teamContact"  class="tableinput-baseinfo form-control teamContact">
						</div>
						<div class="divtable">
							<div class="baseinfo-table-key">供应商电话</div>
							<input type="text" class="tableinput-baseinfo form-control teamPhone" id="error-teamPhone">
						</div>
						
						<ul class="ul-option-team" id="ul-select-team">
			 	        </ul>
				</div> 
				<div class="baseinfo-table" style="height:175px" >
					<div class="divtable">
						<div class="baseinfo-table-key font-weight-title" >项目价格</div>
					</div>
					<div class="divtable pospricediv">
						<div class="price-table-key pirce-title ">项目预算信息</div>
							<div class="final-price-div">
								<div class="pirce-div mleft" >
									<input type="text" id="firstinput" class="pirce-input form-control firstinput">
									<div class="midinput"></div>
									<input type="text" id="lastinput" class="pirce-input form-control lastinput"><label style="color:#666;padding-left:5px">元</label>
									<label class="final-price-label" id="error-radio-price">输入信息有误</label>
								</div>
						 </div>
					</div>
					<div class="divtable finishdiv finish">
							<div class="price-table-key ">项目最终价格</div>
							<input type="text" id='finishInput' class="tableinput-baseinfo form-control finishInput wordMargin"/><label style="color:#666;">元</label>
					</div>
					<div>
                    <label class="final-price-left-label" id="error-finishInput">输入信息有误</label>
                    </div>
					<div class="mright"></div> 
				</div>
			<div class="price-inarea" id="close-div" style="margin-top: -53px !important;">
					<div class="divtable userPrice">
						<div class="userPriceTitle pirce-title">客户支付金额</div>
							<div class="final-price-div">
								<div class="pirce-div mleft" >
									<input type="text" id="userinput" class="pirce-input-user form-control lastinput"><label style="color:#666;padding-left:5px">元</label>
									<label class="user-price-label" id="error-user-price">请输入数字</label>
								</div>
						 </div>
					</div>
					<div class="divtable finishdiv finish providerPrice">
							<div class="userPriceTitle">支付供应商金额</div>
							<input type="text" id='providerInput' class="tableinput-baseinfo form-control finishInput wordMargin"/><label style="color:#666;">元</label>
					</div>
					<div>
                    <label class="provider-price-left-label" id="error-provider-price">请输入数字</label>
                    </div>
				</div>
				<div class="loadMore" id="open-div"><div style="display:inline-block;" id="loadWord">展开更多</div><img id="circleImg" style="display:inline-block;position:relative;left:10px;" src="${imgPath }/flow/getMore.png"/></div>
	  			<div class="baseinfo-table">
					<div class="divtable">
						<div class="baseinfo-table-key font-weight-title" >项目描述</div>
					</div>
					<textarea rows="2" cols="90" class="textarea-baseinfo description form-control"></textarea>
				</div>
          	</div>
        </div>	
	</div>
	<div class="indent-time">
		<div class="indent-time-right">
			<div class="indent-time-table-border-tr">
				 <div class="right-border font-weight-title">项目时间表</div>
				 <div class="right-border right-border-margin">沟通</div>
				 <div class="right-border right-border-margin">方案</div>
				 <div class="right-border right-border-margin">商务</div>
				 <div class="right-border right-border-margin">制作</div>
				 <div class="right-border right-border-margin">交付</div>
			</div>	
			<div class="indent-time-table-border-tr-time">
				<div class="right-border-time-left"></div>
				<div class="right-border-time right-border-margin"  id="gtstarttimeid"><img class="img-size" src="/resources/images/flow/time-img.png"/></div>
				<div class="right-border-time"      id="fastarttimeid"><img class="img-size" src="/resources/images/flow/time-img.png"/></div>
				<div class="right-border-time"      id="swstarttimeid"><img class="img-size" src="/resources/images/flow/time-img.png"/></div>
				<div class="right-border-time"      id="zzstarttimeid"><img class="img-size" src="/resources/images/flow/time-img.png"/></div>
				<div class="right-border-time-end"  id="jfstarttimeid"><img class="img-size-end" src="/resources/images/flow/time-end.png"/></div>
			</div>	
			<div class="indent-time-table-border-tr-time">
				<div class="right-border font-weight-title">预计时间</div>
				<div class="right-border right-border-margin" id="div-gtstarttime"><input type="text" class="tableinput gtstarttime form-control" id="gtstarttime"></div>
				<div class="right-border right-border-margin" id="div-fastarttime"><input type="text" class="tableinput fastarttime form-control" id="fastarttime"></div>
				<div class="right-border right-border-margin" id="div-swstarttime"><input type="text" class="tableinput swstarttime form-control" id="swstarttime"></div>
				<div class="right-border right-border-margin" id="div-zzstarttime"><input type="text" class="tableinput zzstarttime form-control" id="zzstarttime"></div>
				<div class="right-border right-border-margin" id="div-jfstarttime"><input type="text" class="tableinput jfstarttime form-control" id="jfstarttime"></div>
			</div>
			<div class="indent-time-table-border-tr-time-error">
				<div class="right-border"></div>
				<div class="right-border right-border-margin"><label id="error-gtstarttime"  class="tableinput-error ">日期有误</label></div>
				<div class="right-border right-border-margin"><label id="error-fastarttime" class="tableinput-error ">日期有误</label></div>
				<div class="right-border right-border-margin"><label id="error-swstarttime" class="tableinput-error ">日期有误</label></div>
				<div class="right-border right-border-margin"><label id="error-zzstarttime" class="tableinput-error ">日期有误</label></div>
				<div class="right-border right-border-margin"><label id="error-jfstarttime" class="tableinput-error ">日期有误</label></div>
			</div>
		</div>
	</div>
	<div class="indent-btn-div">
		<button  class="indent-btn" id="indent-btn"  >确认</button>
		<a  href="javascript:void(0);" onClick="javascript :history.back(-1);"> <button class="indent-btn-cancle">取消</button></a>
			</div>  	
	            <div class="bottom-div">
                      <div class="loadmore-div">
			       			<div class="load-word">加载中</div>
									<div class="spinner">
									  <div class="bounce1"></div>
									  <div class="bounce2"></div>
									  <div class="bounce3"></div>
									</div>
							</div>
					  </div>	
			</div>
<!-- foot -->
         					<jsp:include flush="true" page="../foot.jsp"></jsp:include> 
                            <!--新版底部-->
</body>
</html>