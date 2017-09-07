<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/css/manager/safeInfo.css" var="safeCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/provider/comPro.js" var="commonJs" />
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<%-- --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js"
	var="blockUIJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js"
	var="bootstrapJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js"
	var="webuploaderJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js"
	var="datepickerJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js"
	var="datepickerZHJs" />
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs" />
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs" />
<spring:url value="/resources/js/provider/comPro.js" var="commonJs" />
<spring:url value="/resources/js/manager/safeInfo.js" var="safeInfoJs"/>
<spring:url value="/resources/images" var="imgPath" />
<%--去除底部客服 --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>安全信息页</title>
<link rel="stylesheet" href="${safeCss}">
<script type="text/javascript" src="resources/lib/Clamp/clamp.js"></script>
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${commonJs}"></script>
<script src="${jsonJs }"></script>
<script type="text/javascript" src="${safeInfoJs}"></script>
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${blockUIJs }"></script>
<script src="${jsonJs }"></script>
<script src="${bootstrapJs }"></script>
<script src="${webuploaderJs }"></script>
<script src="${datepickerJs }"></script>
<script src="${datepickerZHJs }"></script>
<script src="${aesJs }"></script>
<script src="${padJs }"></script>
<script src="${commonJs }"></script>

<!--[if lt IE 9]>
        <script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
    <![endif]-->
</head>
<body>

  <!-- 弹出框 -->
    <div class="tooltip-check" id="tooltip-check">
        <div class="checkCard">
            <div class="hint">提示</div>
            <div class="line"></div>
            <div class="closeCheck" id='closeCheck'>X</div>      
            <div class="checkInfo" id="checkInfo"></div>
            <div class="checkBottom">
                <div class="sureCheck" id="sureCheck">确认</div>
            </div>
        </div>
    </div>
    
  	<!--main部分  -->
	<div class="main">
        <div class="right" id="right">
            <!--信息模块  -->
            <div class="infos" id="infos">
                <div class="first">
                    <span class="text">员工头像</span>
                    <div class="user-icon" >          
                        <img alt="用户头像" data-value="${employee.employeeImg}" src="${imgPath}/provider/initLogo.png"   class="img-circle" id="user-img" width=120 height=120/>
                      	<input type="hidden" id="user_img_url" value="../resources/images/provider/initLogo.png">
                    </div>                 
                    <p id='errorImg'>你可以上传JPG、GIF或PNG格式的文件，文件大小不能超过2M</p>
                    <div class="upload-btn">
                        <div id="uploadBt">上传头像</div>
                      <input type="file" name="file" id="file" style="display: none;"/>
                     <p id='safeError'></p> 
                    </div>

                    <div class="name">
                        <span>员工姓名</span>
                        <span id='trueName'>${employee.employeeRealName}</span>
                    </div>
                </div>
                <div class="second">
                    <div class="password">
                        <span>登录密码</span>
                        <span>使用账号登录时需要输入的密码</span>
                    </div>
                    <div class="username">
                        <span>用户名</span>
                        <span id='loginName'>${employee.employeeLoginName}</span>
                    </div>
                    <div class="but" id="password">设置</div>
                </div>
                <div class="third">
                    <div class="phone">
                        <span>手机绑定</span>
                        <span>确保账号登录时的安全性，同时作为密码找回身份验证使用</span>
                    </div>
                    <div class="oldphone">
                        <span>原手机号</span>
                        <span id="nowphone">${employee.phoneNumber}</span> 
                    </div>
                    <div class="but" id="phone">设置</div>
                </div>
                <div class="four">
                    <div class="mail">
                        <span>邮箱绑定</span>
                        <span>作为项目邮件确认函工具使用，同时作为密码找回身份验证使用</span>
                    </div>
                    <div class="oldmail">
                        <span>现用邮箱</span>
                        <span id='nowmail'>${employee.email}</span>
                    </div>
                    <div class="but" id='emil'>设置</div>
                </div>
            </div>
            <!--密码模块  -->
            <div class="pas" id="pas">
                <div class="login">
                    <span>登录密码</span>
                    <span>使用账号登录时需要输入的密码</span>
                </div>
                <div class="newpas">
                    <span>新密码</span>
                    <input id='inputpas' type="password"></input>
                    <p></p>
                </div>
                <div class="reppas">
                    <span>确认密码</span>
                    <input id='inputrep' type="password"></input>
                    <div id="correctagn">
                    <img src='${imgPath}/provider/sure.png'>
                    </div>
                    <div id='mistakeagn'>
                    <img src='${imgPath}/provider/error.png'>
                    </div>
                </div>
                <div class="btn">
                    <span id="pascancel">取消</span>
                    <span id="saverep">保存</span>
                </div>
            </div>
            <!--手机模块  -->
            <div class="pho" id="pho">
                <div class="login">
                    <span>手机绑定</span>
                    <span>确保账号登录时的安全性，同时作为密码更改，密码找回，支付时验证身份使用</span>
                </div>
                <div class="phone">
                    <span>原手机号</span>
                    <span id='conceal'></span>
                </div>
                <div class="newphone">
                    <span>新手机号</span>
                    <input id="inputnewpho"></input>
                    <p></p>
                </div>
                <div class="verifynewphone">
                    <span>验证手机</span>
                    <input id="inputvernewpho"></input>
                    <span id="send">发送验证码</span>
                    <p></p>
                </div>
                <div class="btn">
                    <span id="phocancel">取消</span>
                    <span id="savepho">保存</span>
                </div>
            </div>
            <!--邮箱模块  -->
            <div class="emil" id="emils">
                <div class="login">
                    <span>邮箱绑定</span>
                    <span>作为项目邮件确认函工具使用，同时作为密码找回身份验证使用</span>
                </div>
                <div class="oldemil">
                    <span>原邮箱</span>
                    <span id='oldemails'></span>
                </div>
                <div class="newemil">
                    <span>新邮箱</span>
                    <input id="inputnewemi" ></input>
                <div id='orderSelect'>
                <span id='biao'>@</span>
                	<div>paipianwang.com</div>
                	<img src='${imgPath}/orderManager/select.png'>
                	<ul>
                		<li>paipianwang.cn</li>
                	</ul>
                </div>
                    <p></p>
                </div>    
                <div class="btn">
                    <span id="emilcancel">取消</span>
                    <span id="saveem">保存</span>
                </div>
            </div>
        </div>
    </div>
   
</body>
</html>