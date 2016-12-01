<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/login.js" var="loginJs" />
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="拍片网登录">
    <meta name="description" content="">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>拍片网－广告－宣传片－微电影－视频营销</title>
    <link rel="stylesheet" href="/resources/css/login.css">
    <script src="${jqueryJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${loginJs }"></script>
	<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
</head>

<body>
    <div class="page">


          <div class="loginLeftArea">

              <div id="showCus" >
                <div class="setImageCus"></div>
                <div class="setInfo">
                       <div class="infoTop">
                               <label>让所有企业都能够</label>
                               <label>享受高品质的视频服务!</label>
                       </div>
                         <div class="infoItem">
                               <label>600+脑洞超大的创意人员</label>
                               <label>为您提供服务</label>
                               <div class="cIcon1"></div>
                         </div>
                          <div class="infoItem">
                               <label>5000+导演随时抢单,</label>
                               <label>甄选出最适合您的一位</label>
                               <div class="cIcon2"></div>
                         </div>
                          <div class="infoItem">
                               <label>视频管家一对一服务,</label>
                               <label>性价比高,质量保障</label>
                               <div class="cIcon3"></div>
                         </div>
                         <div class="infoItem">
                               <label>全新的线上管理系统,</label>
                               <label>随时随地了解状态</label>
                               <div class="cIcon4"></div>
                         </div>
                </div>
              </div>

               <div id="showPro" style="display:none">
                <div class="setImagePro"></div>
                <div class="setInfo">
                       <div class="infoTop">
                               <label>让每个导演都能</label>
                               <label>拍出优秀作品!</label>
                       </div>
                         <div class="infoItem">
                               <label>35000+影视行业资源</label>
                               <label>免费对接</label>
                               <div class="cIcon5"></div>
                         </div>
                          <div class="infoItem">
                               <label>每月500+真实可靠,</label>
                               <label>类型多元的项目</label>
                               <div class="cIcon6"></div>
                         </div>
                          <div class="infoItem">
                               <label>确认交片即收的全额制作费,</label>
                               <label>无拖欠尾款</label>
                               <div class="cIcon7"></div>
                         </div>
                         <div class="infoItem">
                               <label>免费的经济服务,</label>
                               <label>免费的线上线下推广服务</label>
                               <div class="cIcon4"></div>
                         </div>
                </div>
              </div>    

          </div>





        <div class="loginModel">
            <div class="showArea">
                <div class="title">
                    <div id="toDir">客户登录</div>
                    <div id="toCus">导演登录</div>
                    <div id="moveLine"></div>
                </div>

                <div id="hideCus">
                <div class="loginDiv right" id="cusPhoneLogin">
                              <div class="loginContent input-group">
                                  <input class="fontSizeBaseLight" placeholder="手机号" id="user_phoneNumber"></input>
                                  <div class="otherDiv"></div>
                                  <div class="errorDiv hide" id="phone_error_user">*手机号错误</div>
                              </div>
                              <div class="loginContent input-group">
                                   <input class="fontSizeBaseLight"  placeholder="图片验证码 " id="kaptcha_code_user"></input>
                                   <div class="otherDiv "><img alt="图片验证码 " src="/login/kaptcha.png?41 " id="kaptcha_pic_user" class="btn-validation"></div>
                                   <div class="errorDiv hide " id="kapt_error_info_user" >*验证码错误</div>
                              </div>  
                              <div class="loginContent input-group">
                                   <input class="fontSizeBaseLight"  placeholder="短信验证码 " id="verification_code_user"></input>
                                   <div class="otherDiv "><button type="button" id="get_code_user" class="btn-get-validation fontSizeBaseLight " >点击获取</button></div>
                                   <div class="errorDiv hide " id="code_error_info_user">*验证码错误</div>
                              </div>
                              <div class="changeLogin" id="toNoPhone">使用账号登录</div>
                              <div class="redBtn btn-c-r" id="submitBtn-user">登录</div>
                              <div class="Ihave ">还没有账号?&nbsp&nbsp&nbsp请<a><span onclick="window.location.href='/register'">注册</span></a></div>
                              <div class="bindLogin ">
                                        <div>第三方登录</div>
                                        <ul>
                                            <li id="webcat"	>威信</li>
                                            <li id="qqBt">qq</li>
                                            <li id="weiboBt">weibo</li>
                                        </ul>
                              </div> 
                    </div>
                  
                  <div class="loginDiv" id="cusNoPhoneLogin" style="display:none" >
                              <div class="loginContent input-group">
                                    <input class="fontSizeBaseLight" placeholder="用户名" id="user_name"></input>
                                    <div class="otherDiv"></div>
                                    <div class="errorDiv hide" id="user_name_error">*请输入用户名</div>
                             </div>
                              <div class="loginContent input-group">
                                   <input class="fontSizeBaseLight"  placeholder="密码" id="user_pwd"></input>
                                   <div class="errorDiv hide" id="user_pwd_error">*请输入密码</div>
                              </div>  
                              <div class="changeLogin"><span id="toUsePhone">使用手机号登录</span><span onclick="window.location.href='/user/repwd'">忘记了密码?</span></div>
                              <div class="redBtn btn-c-r" id="submitBtn_user_name">登录</div>
                              <div class="Ihave ">还没有账号?&nbsp&nbsp&nbsp请<a><span onclick="window.location.href='/register'">注册</span></a></div>
                  </div>
                 </div>


                   <div id="hideProvider" style="display:none">
                          <div class="loginDiv right" id="providePhoneLogin" style="display:none">
                              <div class="loginContent input-group">
                                  <input class="fontSizeBaseLight" placeholder="手机号" id="team_phoneNumber"></input>
                                  <div class="otherDiv"></div>
                                  <div class="errorDiv hide" id="phone_error_team">*手机号错误</div>
                              </div>
                              <div class="loginContent input-group">
                                   <input class="fontSizeBaseLight"  placeholder="图片验证码 " id="kaptcha_code_team"></input>
                                   <div class="otherDiv "><img alt="图片验证码 " src="/login/kaptcha.png?41" id="kaptcha_pic_team" class="btn-validation"></div>
                                   <div class="errorDiv hide " id="kapt_error_info_team" >*验证码错误</div>
                              </div>  
                              <div class="loginContent input-group ">
                                   <input class="fontSizeBaseLight"  placeholder="短信验证码 " id="verification_code_team"></input>
                                   <div class="otherDiv "><button type="button" id="get_code_team" class="btn-get-validation fontSizeBaseLight " >点击获取</button></div>
                                   <div class="errorDiv hide" id="code_error_info_team">*验证码错误</div>
                              </div>
                              <div class="changeLogin" id="toNoProPhone">使用账号登录</div>
                              <div class="redBtn btn-c-r" id="submitBtn-team">登录</div>
                              <div class="Ihave ">还没有账号?&nbsp&nbsp&nbsp请<a><span onclick="window.location.href='/register'">注册</span></a></div>
                          </div>
                  
                          <div class="loginDiv" id="providerNoPhoneLogin"  style="display:none">
                                      <div class="loginContent input-group">
                                            <input class="fontSizeBaseLight" placeholder="用户名" id="team_name"></input>
                                            <div class="otherDiv"></div>
                                            <div class="errorDiv hide" id="team_name_error">*用户名错误</div>
                                     </div>
                                      <div class="loginContent input-group">
                                           <input class="fontSizeBaseLight "  placeholder="密码" id="team_pwd"></input>
                                           <div class="errorDiv hide" id="team_pwd_error">*密码错误</div>
                                      </div>  
                                      <div class="changeLogin"><span id="toProPhone">使用手机号登录</span><span onclick="window.location.href='/provider/repwd'">忘记了密码?</span></div>
                                      <div class="redBtn btn-c-r" id="submitBtn_team_name">登录</div>
                                      <div class="Ihave ">还没有账号?&nbsp&nbsp&nbsp请<a><span onclick="window.location.href='/register'">注册</span></a></div>
                          </div>
                 </div>

               </div>
        </div>
    </div>
</body>

</html>
