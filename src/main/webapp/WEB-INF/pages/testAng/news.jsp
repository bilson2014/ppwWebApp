<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %> 

<spring:url value="/resources/lib/vue/vue.min.js" var="vueLib"/>
<spring:url value="/resources/js/vue/vue.js" var="angularJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs" />

<link rel="shortcut icon" href="${imgPath }/favicon.ico" >


<!DOCTYPE html>
<html class="no-js">



<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" id="keywords" content="<c:if test="${not empty fn:trim(news.seoKeywords) }"><c:forEach items="${fn:split(fn:trim(news.seoKeywords),' ') }" var="tag" end="2" varStatus="stat">${tag} <c:if test="${!stat.last }"></c:if></c:forEach></c:if>">
    <meta name="description" content="${news.seoDescription}">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>${news.seoTitle}-拍片网</title>
    <link rel="stylesheet" href="${newsCss }">
    <link rel="stylesheet" href="/resources/lib/swiper/swiper4.css">
    <script type="text/javascript" src="resources/lib/swiper/swiper4.js"></script>
    
</head>
 <script type="text/javascript" src="${vueLib}"></script>
 <script type="text/javascript" src="${jqueryJs}"></script>
 <style>
    html, body {
      position: relative;
      height: 100%;
    }
    body {
      background: #fff;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color:#000;
      margin: 0;
      padding: 0;
    }
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      font-size: 18px;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 30px;
    }
  </style>

<body>

  <div class="swiper-container">
    <div class="swiper-wrapper">
     <div class="swiper-slide vvv swiper-no-swiping" style="padding:0;overflow: hidden;">
              <video autoplay class="video" src="http://resource.apaipian.com/resource/group1/M00/00/3A/CgpmTlhfirCAVDRKAbmOoC4ynVs922.mp4" style="width: 1920px; height: 1080px; margin-left: 0px; margin-top: -261px;"></video>
     </div>
      <div class="swiper-slide swiper-no-swiping ">
        <h4 class="zero">Scroll Container</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, ex eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet dolor lectus eu libero. Vestibulum venenatis eget turpis sed faucibus. Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam elit ante, luctus non ante sit amet, sodales vulputate odio. Aenean tristique nisl tellus, sit amet fringilla nisl volutpat cursus. Quisque dignissim lectus ac nunc consectetur mattis. Proin vel hendrerit ipsum, et lobortis dolor. Vestibulum convallis, nibh et tincidunt tristique, nisl risus facilisis lectus, ut interdum orci nisl ac nunc. Cras et aliquam felis. Quisque vel ipsum at elit sodales posuere eget non est. Fusce convallis vestibulum dolor non volutpat. Vivamus vestibulum quam ut ultricies pretium.</p>
        <p>Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna consectetur convallis non vel mi. Donec libero dolor, volutpat ut urna sit amet, aliquet molestie purus. Phasellus faucibus, leo vel scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis ante orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque iaculis bibendum mauris. Cras ut egestas orci. Cras odio risus, sagittis ut nunc vitae, aliquam consectetur purus. Vivamus ornare nunc vel tellus facilisis, quis dictum elit tincidunt. Donec accumsan nisi at laoreet sodales. Cras at ullamcorper massa. Maecenas at facilisis ex. Nam mollis dignissim purus id efficitur.</p>
        <p>Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit. Integer tincidunt finibus metus vel porta. Mauris sed mauris congue, pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu et lacinia. Suspendisse augue justo, convallis eget arcu in, pretium tempor ligula. Nullam vulputate tincidunt est ut ullamcorper.</p>
        <p>Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi id tempor vulputate, nisi justo cursus justo, pellentesque condimentum diam arcu sit amet leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In placerat tellus a posuere vehicula. Donec diam massa, efficitur vitae mattis et, pretium in augue. Fusce iaculis mi quis ante venenatis, sit amet pellentesque orci aliquam. Vestibulum elementum posuere vehicula.</p>
        <p>Sed tincidunt diam a massa pharetra faucibus. Praesent condimentum id arcu nec fringilla. Maecenas faucibus, ante et venenatis interdum, erat mi eleifend dui, at convallis nisl est nec arcu. Duis vitae arcu rhoncus, faucibus magna ut, tempus metus. Cras in nibh sed ipsum consequat rhoncus. Proin fringilla nulla ut augue tempor fermentum. Nunc hendrerit non nisi vitae finibus. Donec eget ornare libero. Aliquam auctor erat enim, a semper risus semper at. In ut dui in metus tincidunt euismod eget et lacus. Aenean et dictum urna, sed rhoncus lorem. Duis pharetra sagittis odio. Etiam a libero ut nisi feugiat tincidunt vel vitae turpis. Maecenas vel orci sit amet lorem hendrerit venenatis sollicitudin ut dui. Quisque rhoncus nibh in massa pretium scelerisque.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, ex eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet dolor lectus eu libero. Vestibulum venenatis eget turpis sed faucibus. Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam elit ante, luctus non ante sit amet, sodales vulputate odio. Aenean tristique nisl tellus, sit amet fringilla nisl volutpat cursus. Quisque dignissim lectus ac nunc consectetur mattis. Proin vel hendrerit ipsum, et lobortis dolor. Vestibulum convallis, nibh et tincidunt tristique, nisl risus facilisis lectus, ut interdum orci nisl ac nunc. Cras et aliquam felis. Quisque vel ipsum at elit sodales posuere eget non est. Fusce convallis vestibulum dolor non volutpat. Vivamus vestibulum quam ut ultricies pretium.</p>
        <p>Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna consectetur convallis non vel mi. Donec libero dolor, volutpat ut urna sit amet, aliquet molestie purus. Phasellus faucibus, leo vel scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis ante orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque iaculis bibendum mauris. Cras ut egestas orci. Cras odio risus, sagittis ut nunc vitae, aliquam consectetur purus. Vivamus ornare nunc vel tellus facilisis, quis dictum elit tincidunt. Donec accumsan nisi at laoreet sodales. Cras at ullamcorper massa. Maecenas at facilisis ex. Nam mollis dignissim purus id efficitur.</p>
        <p>Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit. Integer tincidunt finibus metus vel porta. Mauris sed mauris congue, pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu et lacinia. Suspendisse augue justo, convallis eget arcu in, pretium tempor ligula. Nullam vulputate tincidunt est ut ullamcorper.</p>
        <p>Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi id tempor vulputate, nisi justo cursus justo, pellentesque condimentum diam arcu sit amet leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In placerat tellus a posuere vehicula. Donec diam massa, efficitur vitae mattis et, pretium in augue. Fusce iaculis mi quis ante venenatis, sit amet pellentesque orci aliquam. Vestibulum elementum posuere vehicula.</p>
        <p>Sed tincidunt diam a massa pharetra faucibus. Praesent condimentum id arcu nec fringilla. Maecenas faucibus, ante et venenatis interdum, erat mi eleifend dui, at convallis nisl est nec arcu. Duis vitae arcu rhoncus, faucibus magna ut, tempus metus. Cras in nibh sed ipsum consequat rhoncus. Proin fringilla nulla ut augue tempor fermentum. Nunc hendrerit non nisi vitae finibus. Donec eget ornare libero. Aliquam auctor erat enim, a semper risus semper at. In ut dui in metus tincidunt euismod eget et lacus. Aenean et dictum urna, sed rhoncus lorem. Duis pharetra sagittis odio. Etiam a libero ut nisi feugiat tincidunt vel vitae turpis. Maecenas vel orci sit amet lorem hendrerit venenatis sollicitudin ut dui. Quisque rhoncus nibh in massa pretium scelerisque.</p>
        <div style="backgorund:red;width:100%;height:400px"></div>
      </div>
    </div>
    <!-- Add Scroll Bar -->
    <div class="swiper-scrollbar"></div>
  </div>



  <!-- Initialize Swiper -->
 



<!--    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
              <video autoplay class="video" src="http://resource.apaipian.com/resource/group1/M00/00/3A/CgpmTlhfirCAVDRKAbmOoC4ynVs922.mp4" style="width: 1920px; height: 1080px; margin-left: 0px; margin-top: -261px;"></video>
            </div>
            <div class="swiper-slide" style="overflow:auto">
                <div class="try" style="width:100%;position: absolute;top:0">
                    <div style="width:100%;height:500px;background:green"></div>
                    <div style="width:100%;height:500px;background:red"></div>
                    <div style="width:100%;height:500px;background:blue"></div>
                </div>
            </div>
        </div>
    </div>  -->
  
			    <!--     <div class="youLike">
			             <div class="title">您可能感兴趣的文章  <span>Recommendation</span></div>
			             <div class="atrContent"> 
			             </div>
			        </div>
			        数据
			        <div id="app">
					  <p>{{ message }}</p>
					</div>
			       多选
	                <div id='example-3'>
						  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
						  <label for="jack">Jack</label>
						  <input type="checkbox" id="john" value="John" v-model="checkedNames">
						  <label for="john">John</label>
						  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
						  <label for="mike">Mike</label>
						  <br>
						  <span>Checked names: {{ checkedNames }}</span>
					</div>
					单选
					<div id="example-4">
					  <input type="radio" id="one" value="One" v-model="picked">
					  <label for="one">One</label>
					  <br>
					  <input type="radio" id="two" value="Two" v-model="picked">
					  <label for="two">Two</label>
					  <br>
					  <span>Picked: {{ picked }}</span>
					</div>
										
					<div  id="test">  
				        <div v-for = "todo in todos">
				            <div>Id={{ todo.firstName}}</div>
				            <div>名称={{ todo.lastName}}</div>
				        </div>  
				    </div>  -->


</body>
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript"
	src="resources/lib/jquery/waypoints.min.js"></script>
 <script>
    var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
    //  slidesPerView: 'auto',
      freeMode: true, 
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      mousewheel: true,
      on: {
  	    slideChangeTransitionStart: function(){
  	    	if(this.activeIndex == 0){
  	    		swiper.slideTo(1, 1000, false);//切换到第一个slide，速度为1秒
  	    	}
         }
      },
    });
    
    $('.zero').on('click',function(){
   // 	alert($(this).text());
    })
    
    $(window).scroll(function () {
              console.info(1);
    });
    
  </script>

<%-- <script type="text/javascript" src="${angularJs}"></script>
<script type="text/javascript" src="${commonJs}"></script>
<script type="text/javascript" src="${jsonJs}"></script> --%>
</html>
