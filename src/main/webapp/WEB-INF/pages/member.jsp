<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/member.css" var="memberCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/member.js" var="memberJs"/>
<spring:url value="/resources/lib/jquery/waypoints.min.js" var="waypointsJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
<!-- import img path -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
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
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="宣传片拍摄团队, mg动画制作公司, tvc广告创意,品牌微电影策划">
	<meta name="description" content="专业的pgc商业短视频制作团队，拍片网致力于为企业提供宣传片拍摄、mg动画制作、tvc广告创意、品牌微电影策划等服务。如果你想做点足够酷的事，就加入我们吧！">
	<title>宣传片拍摄团队_mg动画制作公司_tvc广告创意_品牌微电影策划-拍片网</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${memberCss }">
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<jsp:include flush="true" page="header.jsp"></jsp:include>  
 	<div class="outSideDiv">

		       <div class="titleTag">
            <div class="titleWord">
                <a href="/about-us.html">
                    <div>了解我们</div>
                </a>
                <a href="/order-flow.html">
                    <div>服务流程</div>
                </a>
                <a href="/company-service.html">
                    <div>服务协议</div>
                </a>
                <a href="/company-activity.html">
                    <div>公司活动</div>
                </a>
                <a >
                    <div class="checkActive">加入我们</div>
                </a>
            </div>
        </div>
	    <div class="page"></div>
		<div class="nav-shadow"></div>
		
		<div class="topContent ">
		      <div class="logoImg">
		    	<img src="${imgPath}/introduce/member/joinus.svg">
		      </div>	
		    <div>拍片网位于北京通惠河畔的国贸商业核心区，位置优越，交通便利。我们有家一般舒适的工作环境，自由的工作氛围，精英的互联网团队，扁平的管理结构，温暖的员工关怀，丰厚的福利待遇。<br>
		     从拍片网创立至今，有越来越多的优秀人才加入我们。我们为了同一个梦想而聚到一起，分享成长和成功带来的快乐。如果你也渴望实现梦想与价值，我们期待与你相遇！
		    </div>
		</div>
		
		<div class="imageWall">
		 <img src="/resources/images/introduce/member/topWall.jpg">
		 <img src="/resources/images/introduce/member/midWall.jpg">
		</div>
	        
	    <div class="introduce" >
			  <div class="logoImg">
		    	<img src="${imgPath}/introduce/member/member.svg">
		      </div>
			  <div>这里有最尖端前沿的技术，这里有最不寻常的经历，我们欢迎每一个新思维的加入，
			   <br>在这里没有不可能，我们创造一切可能。
			  </div>
		</div>
		
		<div class="contain member">
			<c:if test="${!empty list}">
				<c:forEach items="${list }" var="staff" varStatus="status">
					<c:if test="${status.count % 5 == 1 }">
						<ul class="ul-member">
					</c:if>
					<li class="nav-member">
						<div>
							<img class="member-img" alt="${staff.staffName}_拍片网" src="<spring:url value="${file_locate_storage_path }${staff.staffImageUrl }"/>">
							<p title="${staff.staffName }">${staff.staffName }</p>
							<p class="small-p" alt="${staff.staffPosition}">${staff.staffPosition}</p>
						</div>
					</li>
					<c:if test="${status.count % 5 == 0 }">
						</ul>
					</c:if>
				</c:forEach>
			</c:if>
		</div>
		
			<div class="introduce" >
				<div class="logoImg">
			    	<img src="${imgPath}/introduce/member/fuli.svg">
			     </div>
			</div>
		
		<div class="weal">
		   <ul>
			       <li>
			          <img src="/resources/images/introduce/member/member1.png">
			          <div>岗位晋升</div>
			       </li>
			       <li>
			          <img src="/resources/images/introduce/member/member2.png">
			          <div>扁平管理</div>
			       </li>
			       <li>
			          <img src="/resources/images/introduce/member/member3.png">
			          <div>丰厚期权</div>
			       </li>
			          <li>
			          <img src="/resources/images/introduce/member/member4.png">
			          <div>五险一金</div>
			       </li>
			       <li>
			          <img src="/resources/images/introduce/member/member5.png">
			          <div>节日礼物</div>
			       </li>
			       <li>
			          <img src="/resources/images/introduce/member/member6.png">
			          <div>生日蛋糕</div>
			       </li>
			       <li>
			          <img src="/resources/images/introduce/member/member7.png">
			          <div>活动郊游</div>
			       </li>
			       <li>
			          <img src="/resources/images/introduce/member/member8.png">
			          <div>帅哥美女</div>
			       </li>
		   </ul>
		</div>
		
		<div class="showVideo">
		<img src="/resources/images/introduce/member/come.png">
			<div class="video-div" id="activityPart">
			     <img class="playVideo" id="playVideos" src="/resources/images/introduce/member/playVideo.png">
				<video id="video" src="${file_locate_storage_path }group1/M00/00/20/CgqNZViiqe2ANmqIAZ-Ai8Au-R8971.mp4" preload="auto" controls="controls" poster="${imgPath }/introduce/member/poster.jpg" ></video>
		    </div>
		</div>    

		<div class="join-us" id="join-us">
	     	<h2>这一次你将离梦想真的很近！</h2>
	        <p>发送简历：姓名+【申请职位】至<a href="mailto:hr@paipianwang.cn">hr@paipianwang.cn</a></p>
	    </div>
        
	     <c:if test="${!empty jobList}">
	     	<div class="hold-work">
	     		<div class="work-list">
					<ul id="job-list">
					  <c:forEach items="${jobList }" var="job" varStatus="status">
					  		<c:if test="${status.count == 1 }">
						  		<li class="work active" data-value="${job.demand}" data-content="${job.jobDescription}" data-id="${job.jobId }" title="${job.jobName }">${job.jobName }</li>
							</c:if>
							<c:if test="${status.count != 1 }">
						  		<li class="work" data-value="${job.demand}" data-content="${job.jobDescription}" data-id="${job.jobId }" title="${job.jobName }">${job.jobName }</li>
							</c:if>
					  </c:forEach>
					</ul>
				</div>
				 <div class="line"></div> 
				<div class="work-message">
	              <h3 id="title">工作职责：</h3>
	              <p  id="job-demand" class="job-demand">
	              	 1、具备影视业或广告行业5年以上客户服务经验，制片管理经验，能够独立运行项目， 包括项目的研发及执行；<br> 2、拥有成熟的影视行业导演、编剧、策划、摄影等执行资源。 <br> 4、有关网站发展的相关其他工作。 
	              <br></p>
	              
	              <h3 id="title">工作描述：</h3>
	              <p  id="job-desc">
	              	1、负责拍片网平台影视及广告类项目的执行管理； <br>2、时时管理把控项目制作进展，保证项目顺利交付。 <br>3、负责网站平台客服在线解答等工作。 <br>4、有关网站发展的相关其他工作。 
	              <br></p>	
	             </div>
	     	</div>
	     </c:if> 	     
	     
	     <div class="bottomContent">
	         <div>如果你想做点足够酷的事，在一个每个人都有话语权的平台尽情施展，体会前所未有的成长速度！</div>
	         <div>那么加入一家注定伟大的公司，少年们还等什么！</div>
	         <div>地址: 北京朝阳区建外SOHO东区7号楼1803</div>
	     </div>
	</div>
   	<!-- foot -->
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
	
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
	<script src="${jsonJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${waypointsJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${memberJs }"></script>


</body>
</html>