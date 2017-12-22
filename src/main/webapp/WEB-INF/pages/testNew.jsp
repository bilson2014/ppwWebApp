<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %> 



<%-- import Css --%>
<spring:url value="/resources/css/testIndex.css" var="indexCss"/>
<spring:url value="/resources/images" var="imgPath" />

<!--js  -->
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/testIndex.js" var="indexJs"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs" />
 <spring:url value="/resources/js/youku-player.js" var="ykJs" />
<!--map  -->
       <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts-all-3.js"></script>
       <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></script>
       <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></script>
       <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>
      <!--  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script> -->
      <!--  <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></script> -->
      <!--   <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></script> -->



<link rel="shortcut icon" href="${imgPath}/favicon.ico" >

<!DOCTYPE html>
<html class="no-js">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" id="keywords" content="">
    <meta name="description" content="">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title></title>
    <link rel="stylesheet" href="/resources/lib/swiper/swiper4.css">
    <link rel="stylesheet" href="${indexCss}">    
</head>


<body>

 <r:identity role="provider">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="provider">  
	    <input type="hidden" id="role" value="创作团队" />              
	 </r:identity>
	 <r:identity role="customer">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="customer">
	    <input type="hidden" id="role" value="客户" />         
	 </r:identity>
	 <r:identity role="employee">
	    <input type="hidden" id="role" value="内部员工" />
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="rolephoneImg" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="employee">
</r:identity>

 <jsp:include flush="true" page="header.jsp"></jsp:include> 

    <div class="pagev">
                    <!--第一屏 -->
		            <div class="setVideoContent" >
		               <video autoplay class="video" id="setTopVideo" src="http://resource.apaipian.com/resource/group1/M00/00/3A/CgpmTlhfirCAVDRKAbmOoC4ynVs922.mp4" style="width: 1920px; height: 1080px; margin-left: 0px; margin-top: -261px;"></video>
		               <div class="indexContent">
		                    
								 <div class="swiper-container swiper-banner flexslider">
											<div class="swiper-wrapper swiper-banner-slide">
												<div class="swiper-slide">
													<ul>
														<li class="title" id="bannerTitleAn1">视频出品量全国第一</li>
														<li class="desc" id="DescAn1">服务超过1500家客户 制作超过3000条商业视频</li>
													</ul>
												</div>
												<div class="swiper-slide">
													<ul>
														<li class="title" id="bannerTitleAn2">汇聚海内外优质商业视频创作人</li>
														<li class="desc" id="DescAn2">导演 / 编剧 / 策划 / 制片 / 摄影 / 55800+行业专家为您服务</li>
													</ul>
												</div>
												<div class="swiper-slide">
													<ul>
														<li class="title" id="bannerLast">高品质 低成本 高效率</li>
														<li class="desc" id="DescLast">全流程高质量监管 低于行业价30% 72小时极速出片</li>
													</ul>
												</div>
											</div>
											<div class="swiper-pagination swiper-pagination-banner"></div>
								 </div>
								 <div class="btn-c-r btn-left">拍片多少钱</div>
			                     <div class="btn-c-r btn-right">如何拍好片</div>
		               </div>
		            </div>
		            <div class="otherDiv" style="overflow:auto">
							
											                 <div class="searchDiv">
											                       <div class="titleClass">
											                            <div>一站式视频服务 为您提供专业的商业视频解决方案</div>
											                            <div></div>
											                       </div>
											                       <div class="setProdct">
											                           <div class="pItem home-search bb bbox " data-text="企业宣传">
											                                <img src="${imgPath}/index2/p1.png" />
											                                <div class="cn">企业宣传</div>
											                                <div class="en">ENTERPRISE PROMOTIONAL VIDEO</div>
											                                
											                           </div>
											                           <div class="pItem home-search bb  bbox " data-text="广告TVC">
											                                <img src="${imgPath}/index2/p2.png" />
											                                <div class="cn">广告TVC</div>
											                                <div class="en">TV COMMERCIALS</div>
											                                <div class="bl"></div>
											                           </div>
											                           <div class="pItem home-search bb  bbox" data-text="微电影">
											                                <img src="${imgPath}/index2/p3.png" />
											                                <div class="cn">微电影</div>
											                                <div class="en">MICRO FILMS</div>
											                                <div class="bl"></div>
											                           </div>
											                           <div class="pItem home-search bb  bbox" data-text="MG动画">
											                                <img src="${imgPath}/index2/p4.png" />
											                                <div class="cn">MG动画</div>
											                                <div class="en">MOTION GRAPHICS</div>
											                                <div class="bl"></div>
											                           </div>
											                           <div class="pItem home-search btbox" data-text="三维展示">
											                                <img src="${imgPath}/index2/p5.png" />
											                                <div class="cn">三维展示</div>
											                                <div class="en">3D PRODUCT ANIMATION </div>
											                           </div>
											                           <div class="pItem home-search btbox" data-text="路演视频">
											                                <img src="${imgPath}/index2/p6.png" />
											                                <div class="cn">路演视频</div>
											                                <div class="en">E-COMMERCE PRODUCT VIDEO</div>
											                                <div class="bt"></div>
											                           </div>
											                           <div class="pItem home-search  btbox" data-text="视频名片">
											                                <img src="${imgPath}/index2/p7.png" />
											                                <div class="cn">视频名片</div>
											                                <div class="en">VIDEO CARD</div>
											                                <div class="bt"></div>
											                           </div>
											                           <div class="pItem home-search  btbox" data-text="教学课件">
											                                <img src="${imgPath}/index2/p8.png" />
											                                <div class="cn">路演视频</div>
											                                <div class="en">LECTURE VIDEO</div>
											                                <div class="bt"></div>
											                           </div>
											                       </div>
											                 </div>
											                <!-- 结束 -->
											                <!-- 案例 -->
                                                                    <div class="videoProduct">
                                                                               <div class="orderPlay">预定拍摄</div>
                                                                               <div class="orderMore">查看更多案例</div>
			                                                                   <div class="titleClass">
														                            <div>部分合作过的经典案例</div>
														                            <div></div>
														                       </div>
                                                                             <img class="videoBack" src="${imgPath}/index2/product.png">
                                                                             <div class="swiper-container" id="product">
																				    <div class="swiper-wrapper">
																				      <div class="swiper-slide">
																				           <div class="productItem">
																				                <div class="productLeft">
																				                     <img src="${imgPath}/index2/product1.png">
																				                     <div class="leftTitle">茅台100周年纪念电影</div>
																				                     <div class="leftSTitle">向世界传播中国品牌</div>
																				                     <div class="leftContent">《1915金奖之旅》作为中国酒文化城的镇馆影片，再现了茅台酒成为世界三大蒸馏酒的辉煌历程。<br> 
拍片网为茅台提供了影片创意策划，剧本撰写，并组建了600余人的创作团队 创作者包括《奥林匹克美术大会影片》的导演，《中国国家形象宣传片》的摄影指导， 电影《建国大业》的美术指导，《奥运福娃漫游记》的动画导演等知名创作人。</div>
																				                     <a>了解更多</a>
																				                </div>
																				                <div class="productVideo maotai">
																				                     <img src="https://filed.apaipian.com/group1/M00/00/AF/Cgpw7FnPZoKAHrlPAAKxC-ROmKw021.jpg">
																				                </div>
																				                 <div class="productPeople">
																				                      <img class="productIndex" src="${imgPath}/index2/one.png">
																				                      <div class="peopleTitle">
																				                           <img src="${imgPath}/index2/product.png">
																				                           <div>夏攀说<br>拍片网公司总裁</div>
																				                      </div>
																				                       <div class="peopleContent">
																				                         “我们认识一个人往往从他的<br>作品开始在自然科学和文学艺术领<br>域作品深刻的反映了创作者的灵魂质<br>地拍片网用作品说话”
																				                 	  </div>
																				                 </div>
																				           </div>
																				      </div>
																				      <div class="swiper-slide">
																				           <div class="productItem">
																				                <div class="productLeft">
																				                     <img src="${imgPath}/index2/product1.png">
																				                     <div class="leftTitle">茅台100周年纪念电影</div>
																				                     <div class="leftSTitle">向世界传播中国品牌</div>
																				                     <div class="leftContent">《1915金奖之旅》作为中国酒文化城的镇馆影片，再现了茅台酒成为世界三大蒸馏酒的辉煌历程。<br> 
拍片网为茅台提供了影片创意策划，剧本撰写，并组建了600余人的创作团队 创作者包括《奥林匹克美术大会影片》的导演，《中国国家形象宣传片》的摄影指导， 电影《建国大业》的美术指导，《奥运福娃漫游记》的动画导演等知名创作人。</div>
																				                     <a>了解更多</a>
																				                </div>
																				                <div class="productVideo kaola" >
																				                     <img src="https://vthumb.ykimg.com/0541040859B6D65C000001183D0A1459">
																				                </div>
																				                 <div class="productPeople">
																				                      <img class="productIndex" src="${imgPath}/index2/two.png">
																				                      <div class="peopleTitle">
																				                           <img src="${imgPath}/index2/product.png">
																				                           <div>夏攀说<br>拍片网公司总裁</div>
																				                      </div>
																				                       <div class="peopleContent">
																				                         “我们认识一个人往往从他的<br>作品开始在自然科学和文学艺术领<br>域作品深刻的反映了创作者的灵魂质<br>地拍片网用作品说话”
																				                 	  </div>
																				                 </div>
																				           </div>
																				      </div>
																				      <div class="swiper-slide">
																				           <div class="productItem">
																				                <div class="productLeft">
																				                     <img src="${imgPath}/index2/product1.png">
																				                     <div class="leftTitle">茅台100周年纪念电影</div>
																				                     <div class="leftSTitle">向世界传播中国品牌</div>
																				                     <div class="leftContent">《1915金奖之旅》作为中国酒文化城的镇馆影片，再现了茅台酒成为世界三大蒸馏酒的辉煌历程。<br> 
拍片网为茅台提供了影片创意策划，剧本撰写，并组建了600余人的创作团队 创作者包括《奥林匹克美术大会影片》的导演，《中国国家形象宣传片》的摄影指导， 电影《建国大业》的美术指导，《奥运福娃漫游记》的动画导演等知名创作人。</div>
																				                     <a>了解更多</a>
																				                </div>
																				                <div class="productVideo wanda">
																				                     <img src="https://vthumb.ykimg.com/0541040859B6D55500000174DC0DE4BF">
																				                </div>
																				                 <div class="productPeople">
																				                      <img class="productIndex" src="${imgPath}/index2/three.png">
																				                      <div class="peopleTitle">
																				                           <img src="${imgPath}/index2/product.png">
																				                           <div>夏攀说<br>拍片网公司总裁</div>
																				                      </div>
																				                       <div class="peopleContent">
																				                         “我们认识一个人往往从他的<br>作品开始在自然科学和文学艺术领<br>域作品深刻的反映了创作者的灵魂质<br>地拍片网用作品说话”
																				                 	  </div>
																				                 </div>
																				           </div>
																				      </div>
																				    </div>
																			    <!-- Add Pagination -->
																			    <div class="swiper-pagination swiperProduct" ></div>
																			  </div>
                                                                    </div>
											                <!-- 案例结束 -->
														    <!-- 合作-->
														    <div class="ourFriends">
														          <div class="titleClass">
											                            <div>一站式视频服务 为您提供专业的商业视频解决方案</div>
											                            <div></div>
											                       </div>
											                       <div class="content">全面覆盖互联网、科技、金融、电商、制造、教育、医药等行业</div>
																		<div class="swiper-container swiper-friends ClientsSli">
																					<div class="swiper-wrapper">
																						<div class="swiper-slide ">
																							<ul class="Clients">
																								<li><img src="${imgPath}/index2/f1.png"></li>
																								<li><img src="${imgPath}/index2/f2.png"></li>
																								<li><img src="${imgPath}/index2/f3.png"></li>
																								<li><img src="${imgPath}/index2/f4.png"></li>
																								<li><img src="${imgPath}/index2/f5.png"></li>
																								<li><img src="${imgPath}/index2/f6.png"></li>
																								<li><img src="${imgPath}/index2/f7.png"></li>
																								<li><img src="${imgPath}/index2/f8.png"></li>
																								<li><img src="${imgPath}/index2/f9.png"></li>
																								<li><img src="${imgPath}/index2/f10.png"></li>
																								<li><img src="${imgPath}/index2/f11.png"></li>
																								<li><img src="${imgPath}/index2/f12.png"></li>
																								<li><img src="${imgPath}/index2/f13.png"></li>
																								<li><img src="${imgPath}/index2/f14.png"></li>
																								<li><img src="${imgPath}/index2/f15.png"></li>
																								<li><img src="${imgPath}/index2/f16.png"></li>
																								<li><img src="${imgPath}/index2/f17.png"></li>
																								<li><img src="${imgPath}/index2/f18.png"></li>
																							</ul>
																						</div>
																						<div class="swiper-slide">
                   																			<ul class="Clients">
																								<li><img src="${imgPath}/index2/f21.png"></li>
																								<li><img src="${imgPath}/index2/f22.png"></li>
																								<li><img src="${imgPath}/index2/f23.png"></li>
																								<li><img src="${imgPath}/index2/f24.png"></li>
																								<li><img src="${imgPath}/index2/f25.png"></li>
																								<li><img src="${imgPath}/index2/f26.png"></li>
																								<li><img src="${imgPath}/index2/f27.png"></li>
																								<li><img src="${imgPath}/index2/f28.png"></li>
																								<li><img src="${imgPath}/index2/f29.png"></li>
																								<li><img src="${imgPath}/index2/f210.png"></li>
																								<li><img src="${imgPath}/index2/f211.png"></li>
																								<li><img src="${imgPath}/index2/f212.png"></li>
																								<li><img src="${imgPath}/index2/f213.png"></li>
																								<li><img src="${imgPath}/index2/f214.png"></li>
																								<li><img src="${imgPath}/index2/f215.png"></li>
																								<li><img src="${imgPath}/index2/f216.png"></li>
																								<li><img src="${imgPath}/index2/f217.png"></li>
																								<li><img src="${imgPath}/index2/f218.png"></li>
																							</ul>		
																						</div>
																						<div class="swiper-slide">
                   																			<ul class="Clients">
																								<li><img src="${imgPath}/index2/f31.png"></li>
																								<li><img src="${imgPath}/index2/f32.png"></li>
																								<li><img src="${imgPath}/index2/f33.png"></li>
																								<li><img src="${imgPath}/index2/f34.png"></li>
																								<li><img src="${imgPath}/index2/f35.png"></li>
																								<li><img src="${imgPath}/index2/f36.png"></li>
																								<li><img src="${imgPath}/index2/f37.png"></li>
																								<li><img src="${imgPath}/index2/f38.png"></li>
																								<li><img src="${imgPath}/index2/f39.png"></li>
																								<li><img src="${imgPath}/index2/f310.png"></li>
																								<li><img src="${imgPath}/index2/f311.png"></li>
																								<li><img src="${imgPath}/index2/f312.png"></li>
																								<li><img src="${imgPath}/index2/f313.png"></li>
																								<li><img src="${imgPath}/index2/f314.png"></li>
																								<li><img src="${imgPath}/index2/f315.png"></li>
																								<li><img src="${imgPath}/index2/f316.png"></li>
																								<li><img src="${imgPath}/index2/f317.png"></li>
																								<li><img src="${imgPath}/index2/f318.png"></li>
																							</ul>		
																						</div>
																						
																					</div>
																					 <div class="swiper-button-next nextFriend"></div>
    																				 <div class="swiper-button-prev prevFriend"></div>
																		 </div>
														    </div>
														    
														    <!-- 合作结束 -->
														    <div class="mapDiv">   
														     <div class="mapTitle">
														           <div class="top">55800<span>+影视创作人</span></div>
														           <div class="bot1">75<span>个主城市,</span></div>
														           <div class="bot2">专业的影视团队就在您身边</div>
														     </div>
														     <div id="container" style="height:1000px"></div>
														    </div> 
														    <!-- 数据-->
														    <div class="data">
														         <div class="dataContent">
														            <img src="${imgPath}/index2/data.png">
														            <div class="setContent">
														                 <div class="firstDiv"><div>数据</div><div></div><div>智能管理</div></br><div>让影视项目更高效</div></div>
														                 <div class="redLine"></div>
														                 <div class="lastDiv">丰富的影视人才数据，云端全流程管理系统，</br>让项目执行效率提高200%。</div>
														            </div>
														         </div>
														    </div>
														     <!-- plant-->	
														     <div class="plant">
														          <img style="width:100%" src="${imgPath}/index2/bannerbot.png">
														          <div class="setPlant">
															           <div class="titleClass">
												                            <div>拍片星球</div>
												                            <div></div>
												                       </div>
												                       <div class="plantContent">
												                          <a href="http://zhuanti.apaipian.com/" target="_blank" >
												                            <div class="plantItem">
												                                 <img src='${imgPath}/index2/plant1.png'>
												                                 <div>特色专题</div>
												                            </div>
												                          </a>
												                          <a href="news-list.html">  
												                            <div class="plantItem">
												                                 <img src='${imgPath}/index2/plant2.png'>
												                                 <div>新闻资讯</div>
												                            </div>
												                          </a>
												                           <a>  
												                            <div class="plantItem">
												                                 <img src='${imgPath}/index2/plant3.png'>
												                                 <div>拍片工厂(建设中)</div>
												                            </div>
												                           </a> 
												                       </div>
														          </div>
														     </div>
														     <!-- 链接-->
														     <div class="touzi">
														           <div class="titleClass">
												                            <div>投资方</div>
												                            <div></div>
												                   </div>
												                   <div class="touDiv">
													                   <a href="http://www.preangelfund.cn/" target="_blank"><img src="${imgPath}/index2/tou1.png"></a>
													                   <a href="http://www.apluscap.com/" target="_blank"><img src="${imgPath}/index2/tou2.png"></a>
													                   <a href="http://www.eaglesfund.com/" target="_blank"><img src="${imgPath}/index2/tou3.png"></a>
													                   <a href="http://www.gtja.com/" target="_blank"><img src="${imgPath}/index2/tou4.png"></a>
												                   </div>
												                   
												                   <div class="titleClass">
												                            <div>友情链接</div>
												                            <div></div>
												                   </div>
												                   
												                   <div class="ourFriendsLink">
																	   <a  href="http://www.plusx.cn/" target="_blank"><img alt="图片直播" src="/resources/images/index/friend1.png"></a>
																	   <a  href="http://www.techuangyi.com" target="_blank"><img alt="特创易LOGO设计" src="/resources/images/index/friend2.png"></a>
																	   <a  href="http://www.cubead.com/" target="_blank"><img alt="大数据整合营销" src="/resources/images/index/friend3.png"></a>
																	   <a  href="http://www.bjjfsd.com/" target="_blank"><img alt="北京网站制作" src="/resources/images/index/friend4.png"></a>
																	   <a  href="http://www.qiqueqiao.com/" target="_blank"><img alt="企鹊桥" src="/resources/images/index/friend5.png"></a>
																	   <a  href="http://www.dadetong.com/" target="_blank"><img alt="大德通众包平台" src="/resources/images/index/friend6.png"></a>
																	   <a  href="http://www.ciprun.com/" target="_blank"><img alt="专利申请" src="/resources/images/index/friend7.jpg"></a>
																	</div>
												                   
														     </div>
														     
														     <!-- end-->	
														    <jsp:include flush="true" page="foot.jsp"></jsp:include>           
									              </div>
									  						 
    </div>   
</body>

	

 <script type="text/javascript" src="${jqueryJs}"></script>
 <script type="text/javascript" src="${ykJs}"></script>
 <script type="text/javascript" src="https://player.youku.com/jsapi"></script>
 <script type="text/javascript" src="resources/lib/swiper/swiper4.js"></script>
 <script type="text/javascript" src="${indexJs}"></script>
 <script type="text/javascript" src="${commonJs}"></script>

</html>
