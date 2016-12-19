
<%@page import="java.lang.annotation.Target"%>
<%@ page import="com.panfeng.film.util.Constants"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>

<spring:url value="/resources/css/provider/productList.css" var="productListCss"/>
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
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->



<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
    <meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>拍片网－用户信息页</title>
     <link rel="stylesheet" type="text/css" href="${productListCss}">   
</head>

<body>

 <div class="proInfo">
    <div class="control">
       <div class="newProduct"><div></div><span>新建作品</span></div>
       <div class="moreUp"><div></div><span>批量上传作品</span></div>
    </div>
    
    <div class="noProduct">
        <div>暂无作品</div>
    </div>
    
     <div class="ProductContent">
        <div class="productCard">
            <img src="/resources/images/index/noImg.jpg"/>
            <div class="mid">
                <div class="title"><span></span></div>
                <div class="content"><></div>
                <ul>
                  <li>可见</li>
                  <li></li>
                  <li>不可见</li>
                </ul>
            </div>
        </div>
    </div>
    
    
    
    
 </div>

</body>

</html>
