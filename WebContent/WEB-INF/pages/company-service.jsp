<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/company-service.css" var="companyServiceCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>

<!-- import img path -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网作品,私人定制服务,导演团队,创意拍片,视频展示">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－协议</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${companyServiceCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
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

   <div class="page">
       <div class="contain nav-title-wrap" >
			<ul class="ul-wrap" id="selects">
				<a href="<spring:url value='/about-us.html' />" class ="nav-title"><li >了解我们</li></a>
				<a href="<spring:url value='/order-flow.html' />" class ="nav-title"><li >服务流程</li></a>
				<a href="<spring:url value='/member.html' />" class ="nav-title"><li>加入我们</li></a>
				<a href="<spring:url value='/company-activity.html' />" class ="nav-title"><li >公司活动</li></a>
				<a href="<spring:url value='/company-service.html' />" class ="nav-title"><li id="first-title">服务协议</li></a>
			</ul>
		</div>

	<div class="nav-shadow"></div>
		 <div class="agreemen">
			<h1>网站使用协议</h1>
			<h2>第一条 本站服务条款的确认和接纳</h1>
			<p>1.1本站的各项电子服务的所有权和运作权归北京拍片乐科技有限公司所有。您同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。您确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。<br>
				1.2您点击同意本协议的，即视为您确认自己具有享受本站服务的相应的权利能力和行为能力，并能够独立承担法律责任。<br>
				1.3如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。<br>
				1.4 本协议内容包括协议正文及所有拍片网平台已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。<br>
				1.5 拍片网有权根据国家法律法规的更新、产品和服务规则的调整需要不时地制订、修改本协议及/或各类规则，并以网站公示的方式进行公示。如您继续使用拍片网平台服务的，即表示您接受经修订的协议和规则。<br></p>
			<h2>第二条  服务条款</h2>
			<p>2.1本站主要致力于为客户提供一站式视频内容制作服务。[具体内容请根据服务内容完善]</p>
			<h2>第三条 用户信息</h2>
			<p>3.1您应自行诚信向本站提供注册资料，您保证提供的注册资料真实、准确、完整、合法有效，您注册资料如有变动的，应及时更新注册资料，以便拍片网或其他用户或企业与您进行有效联系。如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且拍片网保留终止您使用拍片网各项服务的权利。<br>
			3.2您注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定改变您的密码。您应谨慎合理的保存、使用用户名和密码。您若发现任何非法使用您账号或存在安全漏洞的情况，请立即通知本站暂停相关服务并向公安机关报案。您理解本站对您的请求采取行动需要合理时间，本站对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。<br>
			3.3您不得将在本站注册获得的账户借给他人使用，否则您应承担由此产生的全部责任，并与实际使用人承担连带责任。<br>
			3.4您同意，拍片网有权使用您的注册信息、用户名、密码等信息，登录进入您的注册账户，进行证据保全，包括但不限于公证、见证等。<br>
			3.5 对于您提供的资料及数据信息，您授予拍片网独家的、全球通用的、永久的、免费的许可使用权利。您同意，拍片网有权(全部或部分地) 使用、复制、更正、发布、翻译、分发、执行和展示您的资料数据（包括但不限于注册资料、行为数据及全部展示于拍片网平台的各类信息）或制作其派生作品，并以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。<br></p>
			<h2>第四条 用户依法言行义务</h2>
			<p> 4.1本协议依据国家相关法律法规规章制定，您同意严格遵守以下义务：<br>
			4.1.1不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；<br>
			4.1.2不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；<br>
			4.1.3不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；<br>
			4.1.4不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；<br>
			4.1.5不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；<br>
			4.1.6不得教唆他人从事本条所禁止的行为；<br>
			4.1.7不得利用在本站注册的账户进行牟利性经营活动；<br>
			4.1.8不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；<br>
			4.2您应不时关注并遵守本站不时公布或修改的各类合法规则规定。
			本站保有删除站内各类不符合法律政策或不真实的信息内容而无须通知您的权利。<br>
			4.3若您未遵守以上规定的，本站有权作出独立判断并采取暂停或关闭您的账号等措施。您须对自己在网上的言论和行为承担法律责任。<br></p>


			<h2>第五条 内容的所有权</h2>
			<p>5.1内容的定义包括:文字、软件、声音、相片、录像、图表；在广告中的全部内容；电子邮件的全部内容；拍片网为用户提供的任何信息；所有这些内容均受版权、商标、标签和其它财产所有权法律的保护。所以，您只能在拍片网授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。</p>
			<h2>第六条 责任范围和责任限制</h2>
			<p>6.1鉴于本站仅作为您网上发布信息的网络平台提供者，并非信息的发布者；您明确同意使用本站的风险由您独自承担。本站明确表示不提供任何类型的担保，不论是明确的或隐含的。本站不担保服务一定能满足您的要求，也不担保服务不会受中断，对服务的及时性、安全性、真实性、出错发生都不作担保。本站拒绝提供任何担保，包括信息能否准确、及时、顺利地传送。您理解并接受下载或通过本站产品服务取得的任何信息资料取决于您自己，并由其承担系统受损、资料丢失以及其它任何风险。对在本站上得到的任何服务、信息，都不作担保。您不会从本站收到口头或书面的意见或信息，本站也不会在这里作明确担保。<br>
			6.2本站对下列不可抗力行为免责：信息网络正常的设备维护，信息网络连接故障，电脑、通讯或其他系统的故障，黑客行为引起的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的不能服务或延迟服务。</p>
			<h2>第七条  协议终止</h2>
			<p>7.1您同意，拍片网基于平台服务的安全性，有权中止向您提供部分或全部拍片网平台服务，暂时冻结您的账户，待安全问题解决后及时恢复，并对中止、冻结及恢复的事实及时通知。如果网站的安全问题是由于您的违法行为引起，拍片网有终止向您提供部分或全部拍片网平台服务，永久冻结（注销）您的账户，并有权向您对损失进行索赔。<br>
			7.2您有权向拍片网要求注销您的账户，经拍片网审核同意的，拍片网注销您的<br>账户，届时，您与拍片网基于本协议的合同关系即终止。您的账户被注销后，拍片网没有义务为您保留或向您披露您账户中的任何信息，也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。
			7.3您同意，您与拍片网的协议关系终止后，拍片网仍享有下列权利：<br>
			7.3.1继续保存您未及时删除的注册信息及您使用拍片网平台服务期间发布的所有信息至法律规定的记录保存期满。<br>
			7.3.2您在使用拍片网平台服务期间存在违法行为或违反本协议和/或规则的行为的，拍片网仍可依据本协议向您主张权利。</p>

			<h2>第八条 用户隐私制度</h2>
			<p>8.1 尊重用户个人隐私是拍片网的一项基本政策。所以，拍片网一定不会公开、编辑或透露您的注册资料及保存在拍片网平台各项服务中的非公开内容，除非拍片网在诚信的基础上认为透露这些信息在以下几种情况是必要的: <br>
			8.1.1遵守有关法律规定，包括在国家有关机关查询时，提供用户在拍片网平台的网页上发布的信息内容及其发布时间、互联网地址或者域名。 <br>
			8.1.2遵从拍片网产品服务程序。 <br>
			8.1.3保持维护拍片网的商标所有权。 <br>
			8.1.4在紧急情况下竭力维护用户个人和社会大众的隐私安全。 <br>
			8.1.5 拍片网认为必要的其他情况下。 <br>
			8.2你知悉并认可：拍片网可能会与第三方合作向您提供相关的网络服务，在此情况下，如该第三方同意承担与本网站同等的保护您隐私的责任，则拍片网有权将您的注册资料等提供给该第三方。另外，在不透露单个用户隐私资料的前提下，拍片网有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。<br>
			8.3为保护您的个人信息的安全。拍片网会使用各种安全技术和程序来保护您的个人信息不被未经授权的访问、使用或泄漏。对此您表示理解和认同。</p>
			<h2>第九条 法律管辖和适用</h2>
			<p>9.1本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，如无相关法律规定的，则应参照通用商业惯例和（或）行业惯例。 <br>
			9.2如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向拍片网平台所有者所在地人民法院提起诉讼。</p>
			<div id="servicePart"></div>
			
 			<h1 class="h1-margin" >拍片网服务协议</h1>
            
            <p class="top-big">甲方：客户<br>
			乙方：北京拍片乐科技有限公司<br></p>

			<p class="top">
			拍片网是互联网视频内容制作平台，所有权为乙方享有。平台汇聚导演、工作室、制作公司百余家，影视行业导演、编剧、摄影师、演员等顶尖人才30000余名，为客户提供一站式视频内容制作服务。甲方同意委托乙方为其介绍视频供应商（即视频制作方）制作视频，供甲方在全球范围内进行公司产品营销、品牌宣传、教学培训等目的使用。<br></p>


			<p class="top bottom">一、甲乙双方须签订年度服务合同后，双方服务内容与职责将按照本协议规定执行<br>
			二、甲方将单品视频制作项目制作费托管至乙方，视频制作费托管金额及支付时间以具体项目的《项目确认函》邮件为准，乙方收到视频托管费后通知视频供应商启动项目制作，待项目制作完成并通过甲方验收后，将制作费支付给供应商。<br>
			三、视频供应商确定后，由视频供应商制作《视频脚本》，并提交甲方确认，以甲方确认的《视频脚本》为准进行视频制作。如甲方的制作需求临时变更，则另行协商以邮件形式确认补充协议。<br>
			四、为保护甲方的信息安全，甲方指定以下联系人与乙方接洽本合同服务事宜。若甲方需增加和/或变更联系人的，应及时书面通知乙方。<br>
			五、具体实施内容双方可通过电子邮件形式确认，甲乙双方应按照本协议约定、附件内容及电子邮件的沟通记录履行义务，任何一方违反本协议及附件约定的，守约方有权向违约方主张违约责任。<br>
			六、双方需对对方的商业秘密、技术秘密、个人隐私，以及对方书面要求保密的其它信息采取有效的保密措施，以避免前述信息泄露。<br>
			七、因签订、履行本合同而发生的争议，双方应当协商解决；不能协商解决的，交由合乙方所在地有管辖权的人民法院管辖。</p>
         </div>
	</div>
	
	<div class="footer">
		<!-- 底栏 start -->
		<div class="footer-wrap">
			<div class="footer-content">
			
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >登录</a>
					<a href="<spring:url value="/mgr/login" />" target="_self">视频管家登录</a>
					<a href="<spring:url value="/provider/login" />" target="_self">供应商登录</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >联系我们</a>
					<a href="tel:4006609728" class="qqClient"><label class="tel-icon"></label><h3>4006609728</h3></a>
					<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>客户客服发发</h3></a>
					<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>供应商客服美美</h3></a>
					<a href="mailto:bdmarket@paipianwang.cn" class="mailClient"><label class="mail-icon"></label><h3>bdmarket@paipianwang.cn</h3></a>
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
		<!-- 底栏 end -->
	</div>
	
	<!-- 代码部分begin -->
	<div class="toolbar " id="toolbar-section" >
		<a href="javascript:void(0);" class="toolbar-item toolbar-item-weixin common-icons-tele-client" id="toolbar-item-weixin"></a>
		<a href="tencent://message/?uin=2640178216&Site=qq&Menu=yes" class="toolbar-item toolbar-item-qq common-icons-qq-client"></a>
		<a href="javascript:scroll(0,0)" id="top" class="toolbar-item toolbar-item-top common-icons-top-client"></a>
	</div>
	<!-- 代码部分end -->
	
	<!-- toolbar modal begin -->
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
	<!-- toolbar modal end -->
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
</body>
</html>