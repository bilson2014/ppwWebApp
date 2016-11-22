<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>



<spring:url value="/resources/css/news/news.css" var="newsCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/jquery.flexslider-min.js" var="flexsliderJS"/>
<spring:url value="/resources/js/news.js" var="newsJS"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/common3.js" var="common3Js"/>
<!DOCTYPE html>
<html class="no-js">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="拍片网登录">
    <meta name="description" content="">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>拍片网－广告－宣传片－微电影－视频营销</title>
    <link rel="stylesheet" href="${newsCss }">
    <link rel="stylesheet" href="${bootstrapCss }">

</head>

<body>
    <div class="header headerMove" id="header">
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
                <a href="<spring:url value='/mgr/index'/>" class="header-item">首页<span></span></a>
                <a  class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
                <a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">精品案例<span></span></a>
                <a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">服务流程<span></span></a>
                <a class="header-item header-item-last" id="showVideo" target="_parent">
                    <div class="showVideo">
                    </div>
                    拍片网介绍
                    <span></span>
                </a>
            </div>
            <div class="middle-part">
                <div class="search-box">
                    <form method="get" action="/search" id="s-form">
                        <div class="bannerSearchFind"></div>
                        <input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />
                        <a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>
                        <ul id="shelper" class="shelper-lucency"></ul>
                    </form>
                </div>
            </div>
            <div class="right-part">
                <a class="header-item login-item" target="_self">登录</a>
                <a class="header-item login-item" target="_self">注册</a>
            </div>
        </div>
    </div>
    <div class="page">
        <div class="bottomContent">
            <div class="contentWidth">
                <div class="leftContent">
                    <div class="title">${news.title}</div>
                    <div class="setPro" id="newsValue">
                        ${news.discription}
                    </div>
                </div>
                <div class="rightContent">
                    <div class="title">本片导演更多影片推荐</div>
                    <div class="setVideo">
                        <div class="videoModel">
                            <label>标题</label>
                            <label>宣传片宣传片宣传片 宣传片宣传片宣传片宣传片宣传片宣传片宣传片宣传片
                            </label>
                            <label>了解更多</label>
                        </div>
                        <div class="videoModel">
                            <label>标题</label>
                            <label>宣传片</label>
                            <label>了解更多</label>
                        </div>
                        <div class="videoModel">
                            <label>标题</label>
                            <label>宣传片</label>
                            <label>了解更多</label>
                        </div>
                        <div class="videoModel">
                            <label>标题</label>
                            <label>宣传片</label>
                            <label>了解更多</label>
                        </div>
                        <div class="videoModel">
                            <label>标题</label>
                            <label>宣传片</label>
                            <label>了解更多</label>
                        </div>
                    </div>
                </div>
            </div>
        </div> <div class="foot3">
                                <div class="footContent">
                                    <div class="contentTop">
                                        <div class="topItem codeWidth">
                                            <div class="Twocode"></div>
                                            <div class="smWord">扫一扫 关注官方微信</div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>登录</a></div>
                                            <div class="cusLogin iconItem"><a>客户登录</a></div>
                                            <div class="proLogin iconItem"><a>供应商登录</a></div>
                                            <div class="manLogin iconItem"><a>管家登录</a></div>
                                            <div class="reg iconItem"><a>注册</a></div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>关于拍片网</a></div>
                                            <div class="noiconItem"><a>了解我们</a></div>
                                            <div class="noiconItem"><a>加入我们</a></div>
                                            <div class="noiconItem"><a>公司活动</a></div>
                                            <div class="noiconItem"><a>团队介绍</a></div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>服务</a></div>
                                            <div class="noiconItem"><a>服务流程</a></div>
                                            <div class="noiconItem"><a>服务协议</a></div>
                                            <div class="noiconItem"><a>找拍摄团队</a></div>
                                            <div class="noiconItem"><a>我要发作品</a></div>
                                        </div>
                                        <div class="topItem onLineWidth">
                                            <div class="title"><a>在线联系我们</a></div>
                                            <div class="cusSer iconItem"><a href="tencent://message/?uin=2640178216&Site=qq&Menu=no"></a></div>
                                            <div class="proSer iconItem"><a href="tencent://message/?uin=3299894058&Site=qq&Menu=no">供应商客服</a></div>
                                            <div class="email iconItem"><a href="mailto:bdmarket@paipianwang.cn">bdmarket@paipianwang.cn</a></div>
                                        </div>
                                        <div class="topItem">
                                            <div class="title"><a>咨询电话</a></div>
                                            <div class="tel"><a href="tel:4006609728">400-660-9728</a></div>
                                            <div class="workTime"><a>工作时间 9:00-18:00  (周一至周五)</a></div>
                                        </div>
                                    </div>
                                    <div class="contentBottom">
                                        <div>版权信息</div>
                                        <div>本站视频作品采用知识共享署名-非商业性使用.本站不提供任何视听上传服务,</div>
                                        <div>所有内容均来自视频分享站点所提供的公开引用资源.</div>
                                        <div>© 2014 攀峰文化 京ICP备 14036662号-1 | 百度统计 站长统计</div>
                                    </div>
                                </div>
                            </div>
                            <!--新版底部-->
    </div>
     <script type="text/javascript" src="${jqueryJs }"></script>
    <script type="text/javascript" src="${bootstrapJs }"></script>
    <script type="text/javascript" src="${flexsliderJS }"></script>
    <script type="text/javascript" src="${newsJS }"></script>
    <script type="text/javascript" src="${commonJs }"></script>
    <script type="text/javascript" defer async="true" src="${common3Js }"></script>
</body>

</html>
