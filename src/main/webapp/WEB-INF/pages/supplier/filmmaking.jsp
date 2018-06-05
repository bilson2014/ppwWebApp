<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/supplier/basics.css" var="basicsCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>

<spring:url value="/resources/lib/webuploader/webuploader.min.js" var="aesJs"/>
<%-- <spring:url value="/resources/lib/webuploader/pad-zeropadding.js" var="padJs"/> --%>

<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/js/supplier/filmmaking.js" var="filmmakingJs"/>

<spring:url value="/resources/js/supplier/createActor.js" var="createActorJs"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="title" content="">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<title>制片工具</title>
	<link rel="stylesheet" href="${webCss}">
	<link rel="stylesheet" href="${basicsCss}">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
		 <div class="page">
		         <div class="managerPgae">
		           <div class="lineHead"></div>
		              <div class="managerCard">
		               		<div class='top'>
		               			<div class='people  top-text'>人员</div>
		               			<div class='site'>场地</div>
		               			<div class='facility'>设备</div>
		               			<div class='newbox'>
		               				<img src="/resources/images/supplier/add.png">新建
		               			</div>
		               		</div>	
		              		<div class='setCard'>
		              		<!--每个列表  idcard-->
		              			<div class='idcard '>
		              				<img class="imgs1" src="/resources/images/supplier/22.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs2" src="/resources/images/supplier/55.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			
		              			<div class='idcard '>
		              				<img class="imgs3" src="/resources/images/supplier/44.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs4" src="/resources/images/supplier/11.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs5" src="/resources/images/supplier/33.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			
		              			
		              		
		              		</div>
		              		
		              		
		              		<!--每个 弹框的模板  -->
		              		
		              		<!--添加角色的 弹框  -->
		              		<div class='setting'>
		              			<div class='addpeople'>
		              				<div class='addtitle'>请选择添加的角色</div>
		              				<div class='addboxs'>
		              					<div class='check'>请选择</div>
		              					<img class='more' src="/resources/images/supplier/more.png">
		              					<div class='morecheck'>
		              						<span>演员</span>
		              						<span>导演</span>
		              					</div>
		              					<div class='sure'>确认</div>
		              					<div class='cancel'>取消</div>
		              				</div>
		              			</div>
		              			
		              			
		              			<!-- 添加演员 -->
		              			<div class='staffbox'>
		              				<div class='stafftitle'>
		              					<span>创建演员</span>
		              					<img alt="" src="/resources/images/supplier/close.png">
		              				</div>
		              				<div class='gather'>
		              					<div class='gatherleft'>
		              						<span>姓名</span>
		              						<input class='namegather' type='text' placeholder="">
		              						<p class='namegatherp errorp'></p>
		              						
		              						<span>性别</span>
		              						<div class='gendergather'>请选择性别</div>
		              						<img class='genderimg' alt="" src="/resources/images/supplier/more.png">
		              						<p class='gendergatherp errorp'></p>
		              						<div class='twocheck'>
		              							<p>男</p>
		              							<p>女</p>
		              						</div>
		              						
		              						<span>出生年份</span>
		              						<input class='oldgather' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              						<p class='oldgatherp errorp'></p>
		              						
		              						<span>种族</span>
		              						<div class='racegather'>请选择种族</div>
		              						<img class='raceimg' alt="" src="/resources/images/supplier/more.png">
		              						<p class='racegatherp errorp'></p>
		              						<div class='racecheck'>
		              							<p>小丸子</p>
		              							<p>机器猫</p>
		              							<p>葫芦娃</p>
		              							<p>哪吒</p>
		              						</div>
		              						
		              						<span>所在城市</span>
		              						<div class='citygather'>请选择城市</div>
		              						<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
		              						<p class='citygatherp errorp'></p>
		              						<div class='citycheck'>
		              							<p>中国1</p>
		              							<p>美国2</p>
		              							<p>中国1</p>
		              							<p>美国2</p>
		              							<p>中国1</p>
		              							<p>美国2</p>
		              						</div>
		              						
		              						<span>价格/天</span>
		              						<input class='pricegather' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              						<p class='pricegatherp errorp'></p>
		              						
		              						
		              					</div>
		              					<div class='gatherright'>
		              						<div class='addimage'>
		              						
		              							<!-- <div class="form-group">
   													<input id="itemImagers" name="itemImagers" type="file" multiple class="file" data-overwrite-initial="false" data-min-file-count="2">
 												</div> -->
 												<!-- <input type="file" name="file" class="webuploader-element-invisible" multiple="multiple" accept="image/*">
 												<div id="demo">
    												<div id="as" ></div>
												</div> -->
												
												<!-- <div id="uploader-demo">
        用来存放item
        <div id="fileList" class="uploader-list"></div>
        <div id="filePicker">选择图片</div>
</div> -->



<div style="margin-top: 10px; margin-left: 180px">  
    <input id="specialrecommendfile" type="file" size="30"  
    name="file">  
    <button type="button" onclick="UploadSpecialRecommendPic()"  
    class="btn btn-warning btn-lg">上传</button>  
    <input type=hidden class="span5" id="specialRecommendPic"  
    name="riIndexPic">  
</div> 
 												

		              						
		              							<div class='reupload'>重新上传</div>
		              							<img class='' alt="点击添加图片" src="/resources/images/supplier/adds.png">
		              							<p>点击添加图片</p>
		              						</div>
		              						<div class='addboxs'>
		              							<span>可上传JPG、GIF或PNG格式的 文件，文件大小不能超过2M。</span>
		              							<div class='addtext'>上传更多照片</div>
		              							<p>(最多5张)</p>
		              						</div>
		              					</div>
		              					<!--上传的显示地方  -->
		              					<div class='showimages'>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive1" src="/resources/images/supplier/44.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive2" src="/resources/images/supplier/11.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive3" src="/resources/images/supplier/22.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive4" src="/resources/images/supplier/33.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive5" src="/resources/images/supplier/55.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						
		              						
		              						
		              						
		              					</div>
		              					<div class='remark'>
		              						<span>备注</span>
		              						<textarea rows="4" cols="550" placeholder="请完善演员体重、三维、特殊技能、擅长角色、作品等信息"></textarea>
		              					</div>
		              					<!--提交按钮  -->
		              					<div class='gatherbut'>
		              						<div class='sure'>确认</div>
		              						<div class='cancel'>取消</div>
		              					</div>
		              					
		              					
		              				</div>
		              				
		              			</div>
		              			
		              			
		              			
		              		</div>
		              		
		              		
		              		
		              
		              </div>
		         </div>
		 </div>
		   
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${loginJs }"></script>
	<script src="${createActorJs}"></script> 
	<script src="${filmmakingJs}"></script>
	
	
</body>
</html>