<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/list.css" var="listCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/list.js" var="listJs"/>
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
	<meta name="keywords" content="宣传片，广告片，微电影，病毒视频，纪录片，MG动画，MV，预告片，证言影片">
	<meta name="description" content="拍片网汇聚了入驻导演原创精品视频案例，覆盖了宣传片、广告片，微电影，病毒视频，纪录片，MG动画，MV，预告片，证言影片等各种类型，创意免费，价格透明，不满意可退款">
	<title>精品案例-拍片网</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${listCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script type="text/javascript">
		var _vds = _vds || [];
		window._vds = _vds;
		(function(){
		  _vds.push(['setAccountId', '9f2e33a3d43b5d78']);
		  (function() {
		    var vds = document.createElement('script');
		    vds.type='text/javascript';
		    vds.async = true;
		    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(vds, s);
		  })();
		})();
	</script>
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
    <jsp:include flush="true" page="header.jsp"></jsp:include> 
	<div class="page">
		<!-- 搜索条件模块 start -->
		<div class="classify-section">
			<div class="classify-wrap ">
				<div class="classify-type ">
					<dt>行业：<a class="active itemAll" href="javascript:void(0);">全部</a></dt>
					<dd id="classify-item ">
						<ul class="list-inline" id="item-list">
							<!-- 行业分类 -->
						</ul>
					</dd>
					<div class="more-link" id="more-link">
						<span>更多</span>
					</div>
				</div>
				
				<div class="classify-price ">
					<dt>价格：<a class="active priceAll" href="javascript:void(0);" data-begin="0" data-end="1000000000">全部</a></dt>
					<dd id="price-item">
						<ul class="list-inline">
							<li><a href="javascript:void(0);" data-begin="1" data-end="30000" class="priceAll">0~3万</a></li>
							<li><a href="javascript:void(0);" data-begin="29999" data-end="100000" class="priceAll">3~10万</a></li>
							<li><a href="javascript:void(0);" data-begin="99999" data-end="600000" class="priceAll">10~60万</a></li>
							<li><a href="javascript:void(0);" data-begin="599999" data-end="1000000000" class="priceAll">60万以上</a></li>
							<li><div class="price-section"><input type="text" id="start-price" />万 ~ <input type="text" id="end-price" />万<a href="javascript:void(0);"><button class="btn btn-primary disabled" id="priceBtn">确定</button></a></div></li>
						</ul>
					</dd>
				</div>
				
				<div class="classify-length">
					<dt>时长：<a class="active lengthAll" href="javascript:void(0);" data-begin="0" data-end="36000">全部</a></dt>
					<dd id="length-item">
						<ul class="list-inline">
							<li><a href="javascript:void(0);" class="lengthAll" data-begin="0" data-end="60">0~60秒</a></li>
							<li><a href="javascript:void(0);" class="lengthAll" data-begin="60" data-end="90">60~90秒</a></li>
							<li><a href="javascript:void(0);" class="lengthAll" data-begin="90" data-end="180">90~180秒</a></li>
							<li><a href="javascript:void(0);" class="lengthAll" data-begin="180" data-end="36000">180秒以上</a></li>
							<li><div class="length-section"><input type="text" id="start-length" />秒 ~ <input type="text" id="end-length" />秒<a href="javascript:void(0);"><button class="btn btn-primary disabled" id="lengthBtn">确定</button></a></div></li>
						</ul>
					</dd>
				</div>
			</div>
		</div>
		<!-- 搜索条件模块 end -->
		
		<!-- video list start -->
		<div class="video-section">
			<div class="video-content" id="video-content">
				<!--	视频内容 example 
				<div class="video-row">
					<div class="video-card video-col-4">
						<a href="javascript:void(0);">
							<img class="img-card-4" src="http://www.apaipian.com/product/img/product139-201510281719479522.jpg" />
						</a>
						<div class="video-desc-section">
							<h3>凌宇智控证言与特效结合的宣传片</h3>
							<h4>北京攀峰友文科技有限公司</h4>
							<div class="video-desc">
								精美、酷炫的短片，为我们呈现了一部高端产品，实拍三维后期包装的结合，简洁精致的画面语言，仿佛让整个短片都充满了生命力。
							</div>
						</div>
						<div class="video-price-section">
							<div class="video-price">
								<h2>￥103,734</h2>&nbsp;&nbsp;
								<h3>201,112</h3>
							</div>
							<a href="javascript:void(0);">了解详情</a>
						</div>
					</div>

				</div> -->
			</div>
		</div>
		<!-- video list end -->

		<!-- pagination start -->
		<div class="page-section">
			<div class="page-wrap">
				<div class="pagination">
					
				</div>
			</div>
		</div>
		<!-- pagination end -->
	</div>

	<!-- foot -->
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
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
	<script src="${jsonJs }"></script>
	<script src="${jqueryPageJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${listJs }"></script>
</body>
</html>