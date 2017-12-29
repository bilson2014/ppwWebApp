<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %> 

<spring:url value="/resources/lib/vue/vue.min.js" var="vueLib"/>
<spring:url value="/resources/js/vue/testNew.js" var="angularJs"/>
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
    }
    
    .try{
       position: relative;
       left:-200px;
       transition: all 3s;
     }
     
     .show{
     left:0px !important;
     }
     
  </style>

<body>

 <div class="swiper-container vs">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
              <video autoplay class="video" src="http://resource.apaipian.com/resource/group1/M00/00/3A/CgpmTlhfirCAVDRKAbmOoC4ynVs922.mp4" style="width: 1920px; height: 1080px; margin-left: 0px; margin-top: -261px;"></video>
            </div>
            <div class="swiper-slide" style="overflow:auto">
					    <div class="swiper-container sss">
							    <div class="swiper-wrapper">
									      <div class="swiper-slide swiper-no-swiping">
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
										        <p>Sed tincidunt diam a massa pharetra </p>
										        <p>Sed tincidunt diam a massa pharetra </p>
										        <p>Sed tincidunt diam a massa pharetra </p>
										        <p >Sed tincidunt diam a massa pharetra </p>
										        <p class="setHeight">Sed tincidunt diam a massa pharetra </p>
										        <div style="backgorund:red;width:100%;height:400px；background:blue"></div>
									        
											         <div class="swiper-container testAni" style="height:300px">
														        <div class="swiper-wrapper">
														            <div class="swiper-slide">
														               <div class="try">dasdasdadas</div>
														            </div>
														            <div class="swiper-slide">
														               <div class="try">aaaaaaaa</div>
														            </div>
														           <div class="swiper-slide">
														               <div class="try">bbbbbbbbb</div>
														            </div>
														            <div class="swiper-slide">
														               <div class="try">ppppppp</div>
														            </div>
														         </div>
														         <div class="swiper-pagination"></div>
														         <div class="swiper-button-next sbn"></div>
                                                                 <div class="swiper-button-prev sbp"></div>
												     </div>		            
							            </div>
							    <div class="swiper-scrollbar"></div>
					  </div>
            </div>
        </div>
    </div>  
</body>
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript"
	src="resources/lib/jquery/waypoints.min.js"></script>
 <script>
 
 
     var isClose = "1";
     var isChange = 0;
	 var sw = new Swiper('.vs', {
	     direction: 'vertical',
	     mousewheel:true,
	     on:{
	    	 slideChangeTransitionEnd: function(){
	    	      var num = this.activeIndex;
	    	         if(num == 1){
	    	        	 isClose = "1";
	    	         }
	    	    },
	        },
	 });
    
    var swipers = new Swiper('.sss', {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true, 
      mousewheel:true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      on:{
    	    setTransition: function(){  
    	    	 var vbn =  $('.swiper-scrollbar-drag').offset().top;
    	    	 if(isChange == 0){
    	    		 isChange = vbn;
    	    	 }
    	    	 console.info('first='+isChange);
	    	     var scrollPos =  $('.swiper-scrollbar-drag').css("transform").replace(/[^0-9\-,]/g,'').split(',')[5];
	    	     console.info('isClose='+isClose);
	    	     if(isClose != 1){
	    	    	 console.info(vbn);
	    	    	 console.info(isClose);
	    	    	 if(vbn == isChange){	
		    	    	 sw.allowSlidePrev = true;
	    	    		 sw.slidePrev();
		    	     }else{
		    	    	 console.info('false');
		    	    	 sw.allowSlidePrev = false;
		    	     }
	    	    	 isClose = vbn;
	    	     }else{
	    	    	 isClose = vbn;
	    	     }
	    	     var b = $('.setHeight').offset().top;
	    	     if(b < 1000){
	    	    	 $('.testAni').find('.swiper-wrapper .swiper-slide-active .try').addClass('show');
	    	     }
   	    },
    	  },
    }); 
    
    var testAni = new Swiper('.testAni', {
    	loop : true,
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
        navigation: {
    	    nextEl: '.swiper-button-next',
    	    prevEl: '.swiper-button-prev',
    	  },
    	  on:{
 	    	 slideChangeTransitionEnd: function(){
		    	  $('.try').removeClass('show');
	 	          $('.testAni').find('.swiper-wrapper .swiper-slide-active .try').addClass('show');
 	    	    },
 	        },
   });
    
    
  </script>
  
<script type="text/javascript" src="${angularJs}"></script>
<%-- <script type="text/javascript" src="${angularJs}"></script>
<script type="text/javascript" src="${commonJs}"></script>
<script type="text/javascript" src="${jsonJs}"></script> --%>
</html>
