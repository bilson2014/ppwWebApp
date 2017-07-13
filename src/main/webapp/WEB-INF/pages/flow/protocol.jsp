<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/flow/protocol.css" var="protocolCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/flow/protocol.js" var="protocolJs"/>
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
	<title>供应商引导页-拍片网</title>
	<link rel="stylesheet" type="text/css" href="${protocolCss}">
	<script src="${jqueryJs }"></script>
	<script src="${protocolJs}"></script>
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
  	<input id="unqiueId" value="${unqiueId}" />
    <jsp:include flush="true" page="../header.jsp"></jsp:include> 
	<div class="page" >
	  
	      <div class="agreement" id="agreement">
	           <div class="topTitle">拍片网网站使用说明和用户协议</div>
	      <div class="setBorder">     
	           <div class="agTitle">一、使用条件</div>
	           <div class="agContent">欢迎访问拍片网网站。拍片网按照下列条件向您提供服务。如果您访问拍片网网站或者在拍片网网站注册，您需
要接受以下《拍片网网站使用说明和用户协议》，请仔细阅读。此外，当您使用目前或者将来的服务协议（如：客户
或供应商等）或者访问或从与拍片网网站上传作品，不论是否包含在拍片网网站的网址里，您都必须服从于适用于这
些服务或商业行为的条件和指导方针。</div>
               <div class="agTitle">二、双方权利与义务</div>
	           <div class="agContent">为了了解我们的情况，请仔细阅读我们的“双方权利与义务”及“隐私权公告”，它同样规范您对拍片网网站的
访问、使用及合作行为。</div>
               <div class="agContent">1、拍片网网站及其使用人双方（以下简称：“双方”）保证该保密信息仅用于与合作有关的用途或目的。<br>
2、双方各自保证对对方所提供的保密信息予以妥善保存（保密信息包括但不限于：线上及线下展示或合作的业
务范围、项目名称、项目内容、价格、团队组建信息、供应商信息、客户信息等）。<br>
3、双方各自保证对对方所提供的保密信息按本协议约定予以保密，并至少采取适用于对自己的保密信息同样的
保护措施和审慎程度进行保密。
上述含有保密信息的资料、文件或其他含有保密信息的载体包括但不限于：该等资料、文件或载体的复印件、拷贝或
其他复制品。<br>
4、如果您使用本网站，您就有责任对您的账号和密码保密，并限制别人对您计算机的访问，您同意为您账户和
密码下所发生的一切行为负责。如果您在18 岁以下，您只有在父母或监护人的陪伴下才能使用拍片网网站。拍片网
网站有权利以自己的判断拒绝服务、终结账目、取消或编辑内容或取消订单。<br>
5、在网站使用过程及合作过程中，网站使用者（包括：游客、客户、供应商等）从拍片网网站（或子公司、关
联公司）获得的与合作有关或因合作产生的任何商业、营销、技术、运营数据或其他性质的资料，无论以何种形式或
载于何种载体，无论在披露时是否以口头、图像均具有保密性。<br>
6、供应商在拍片网网站上传作品时，不可在作品中以文字、数字、图表、图片、动画、水印、LOGO、音频或视
频等任何形式违规透露自己团队或相关个人的任何联系信息及联系方式，否则拍片网有权追究其违约责任。<br>
7、拍片网网站从网站供应商处获得的无论以何种形式或载于何种载体，无论在披露时是否以口头、图像或以书
面方式表明其具有保密性。<br>
8、上述保密信息可以以数据、文字及记载上述内容的资料、光盘、软件、图书等有形媒介体现，也可通过口头
等视听形式传递。</div>

             <div class="agTitle">三、网站资源访问权限</div>
	         <div class="agContent">
	           1、游客可从拍片网网站浏览该网站的部分展示作品。<br>
2、注册客户可从拍片网网站浏览自己所上传的作品及自己团队或个人的注册信息。<br>
3、注册供应商可从拍片网浏览自己团队或个人的注册信息及自己所上传的作品。<br>
4、拍片网网站许可您有限制的访问，未经本网站的明示书面同意，不得使用拍片网或其他任何利用拍片网网站
名称和商标的“隐藏文本”。任何未经拍片网网站授权或认可的使用都会导致许可的终止。未经拍片网网站的书面明
示同意，不得在链接中使用拍片网网站拥有所有权的logo 或其他绘图和商标。
	           </div>
	           
	         <div class="agTitle">四、产品描述</div>
	         <div class="agContent">
	            1、拍片网网站和其附属机构将尽可能地对产品详细描述。但是，本网站不保证对产品的描述和本站点其他内容
的描述都是准确、完整、可信赖、最新的和无错误的。<br>
2、最终解释权归拍片网网站所有。
	         </div>
	         
	         <div class="agTitle">五、网站规则、风险、免除责任及其他</div>
	         <div class="agContent">
1、使用者不得在拍片网网站上传内容疑似涉及违法、淫秽、胁迫、诽谤、侵犯知识产权和其他有害于第三方的
内容，上传内容不得含有病毒软件、政治活动、商业诱惑。拍片网网站有权（但不是职责或义务）取消或编辑这些内容，并且不定期的检查使用者上传及编辑的内容。<br>
2、您准许拍片网网站和其附属机构以及再被许可人有权使用你提交的内容，如果他们作出选择。您有责任保证<br>
您在拍片网网站的注册信息及所上传的作品的版权为你所有或享有其他控制权；保证内容的真实性、准确性；保证对
您提供内容的使用不会违反该规定和不会导致对任何实体和他人的损害；保证向拍片网网站和其附属机构赔偿因为你
提供的内容所带来的损失。拍片网网站有权但没有职责和义务监视、编辑和取消任何行为和内容。
3、拍片网网站对您或任何第三方所上传及编辑的内容不承担任何责任。本站点内容是由拍片网网站按照它本来
的情况或得到时的情况提供。该网站对该站点的经营、该站点的信息、内容<br>、资料和产品不承担任何责任且不承诺任
何保证，包括明示的和暗示的。你必须明示同意使用该站点风险自负。
4、拍片网网站在所适用法律许可的最大范围内放弃保证，无论明示和暗示的，包括但不限于对商业能力和为特
定目的的适当性的暗示保证。拍片网网站对缘于本网站的使用所导致的任何损害赔偿不承担任何责任，包括但不限于
直接的、间接的、附属性的、惩罚性的和结果性的损害赔偿。<br>
5、请浏览我们的规则，这些规则也会规范你对本网站的访问和使用。我们保留在任何时间改变网页、规则和使
用的条件的权利。<br>
6、您从拍片网网站购买的项目或产品都按照货物合同进行，这意味着该项目或产品的权利及风险在我们交付时
就已转移。
	         </div>
	         
	         <div class="agTitle">六、违约与赔偿</div>
	         <div class="agContent"> 
	              任何一方违反本协议的规定，应在第一时间采取一切必要措施防止保密信息的扩散，尽最大可能消除影响，并应
承担违约责任，向守约方支付违约金，违约金的以受损害方实际遭受的损失为限。
	         </div>
	         
	         <div class="agTitle">七、适用法律与争议解决</div>
	         <div class="agContent"> 
	             1、本网站使用说明和用户协议适用中华人民共和国有关法律。
合同纠纷解决方式：如因本协议以及本协议履行过程中出现的争议，双方应协商解决；协商不成时，双方同意提交本
协议签订地（北京市朝阳区）法院诉讼。<br>
2、无论何种与访问拍片网网站和通过本网站合作有关的争议，争端应由合作双方协商解决,如不能协商解决则应提
交仲裁，仲裁裁决将作为有权管辖法庭判断的重要参考。在可适用法律允许的最大范围内，如根据本协议没有协议仲
裁将结合根据本协议涉及到其他当事人的仲裁进行，无论是通过集团仲裁进行还是其他。
            </div>
             
            <div class="checkItem">
                 <input id="isAgree" name="Fruit" type="checkbox"  />
                 <div>我已认证阅读并同意 <span id="showErrorAgree" style="color:#fe5453;padding-left:60px;display:none">请勾选”我已阅读并同意“以上条款后继续</span></div>
            </div>
            
            <div class="agreeBtn">
             <sf:form>
	   		 	<input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}" />
	   		 	<input type="button" name="_eventId_agree" class="btn-c-g" id="agree" value="同意" onclick="checkAgree()"/>
	   		 	<input type="submit" name="_eventId_cancel" class="btn-c-r" value="取消" />
	   		 </sf:form>
	   		</div>
             
	    </div>
	   </div> 

	      </div>
	
	<!-- foot -->
         					 <jsp:include flush="true" page="../foot.jsp"></jsp:include> 
                            <!--新版底部-->
</body>
</html>