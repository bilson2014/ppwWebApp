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
<spring:url value="/resources/js/vue/tablesMergeCell.js" var="tablesMergeCell"/>
<spring:url value="/resources/js/vue/base.css" var="base"/>
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
          
          
     
  </style>

<body>
      
      <table id="process-demo-1" class="tb tb-b c-100 c-t-center">
        <thead>
        <tr>
            <th>col0</th>
            <th>col1</th>
            <th>col2</th>
            <th>col3</th>
        </tr>
        <tr>
            <th>col0</th>
            <th>col1</th>
            <th>col2</th>
            <th>col3</th>
        </tr>
        </thead>
        <tbody class="setTr">
        <tr>
            <td>SuZhou</td>
            <td>11111</td>
            <td>22222</td>
            <td>SuZhouCity</td>
        </tr>
        </tbody>
    </table>
 
</body>
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${tablesMergeCell}"></script>
<link rel="stylesheet" href="${base}">

 <script>
 var data = new Array();
 $(function(){
	 
	 
	 function cTable(id, text,rt,vb) {
			this.id = id;
			this.value = text;
			this.rt = rt;
			this.vb = vb;
		}
	 data.push(new cTable(3,1,3,4));
	 data.push(new cTable(1,2,3,4));
	 data.push(new cTable(1,2,3,4));
	 data.push(new cTable(2,2,3,4));
	 data.push(new cTable(1,2,3,4));
	 data.push(new cTable(2,2,3,4));
	 data.push(new cTable(2,2,3,4));
	 data.push(new cTable(3,2,3,4));
     var g = orderBy(data, ['id'], 'asc');
	 for (var int = 0; int < g.results.length; int++) {
	         $('.setTr').append(createMultOption(g.results[int]));
	}
	 
	 function changeGroup(arr){
		
		         
		        var objArr = [];            //定义一个空数组
		        var len = arr.length;
		         
		        for (var i = 0;i < len; i++){
		            var Id = arr[i].id;
		            var Name = arr[i].value;
		            var Value = arr[i].rt;
		             
		            if(!objArr[Id]){        //objArr[Id]未定义或不存在
		                objArr[Id]  = {};
		            }
		             
		            if(!objArr[Id][Name]){     //objArr[Id][Name]未定义或不存在
		                objArr[Id][Name] = {};
		                objArr[Id][Name].Value = [];
		            }
		             
		            objArr[Id][Name].Value.push(Value);
		        }
		        return  objArr;
		        console.log('aa'+objArr);
		 
	 }
	 
	 
	 
     $('#process-demo-1').tablesMergeCell({
         cols: [0]
     });
     
     function createMultOption(item){
    	    
    		var html = [
    		    	    '<tr>',
    		    		'<td>'+item.id+'</td>',
    		    		'<td>'+item.value+'</td>',
    		    		'<td>'+item.rt+'</td>',
    		    		'<td>'+item.vb+'</td>',
    		    		'</tr>'
    		    	].join('');
    		    	return html;
    	}
     
     
     function orderBy(source, orders, type) {

         if (source instanceof Array && orders instanceof Array && orders.length > 0) {

           var ordersc = orders.concat([]);
           var sorttype = type || 'asc';
           var results = [];
           var totalSum = {};

           function grouporder(source, orders, totalSum) {

             source.sort(function(a, b) {
               var convertA = a[orders[0]];
               var convertB = b[orders[0]];
               if (typeof convertA == 'string' && typeof convertB == 'string') {
                 if (sorttype.toUpperCase() == 'ASC') {
                   return convertA.localeCompare(convertB);
                 } else {
                   return convertB.localeCompare(convertA);
                 }
               } else {
                 if (sorttype.toUpperCase() == 'ASC') {
                   return convertA - convertB;
                 } else {
                   return convertB - convertA;
                 }
               }

             })

             var groupmap = new Map();
             source.forEach((item) => {
               if (groupmap.has(item[orders[0]])) {
                 groupmap.get(item[orders[0]]).push(item);
               } else {
                 groupmap.set(item[orders[0]], []);
                 groupmap.get(item[orders[0]]).push(item);
               }
             })

             orders.shift();

             for (let [key, val] of groupmap) {

               totalSum[key] = {};
               totalSum[key].name = key;
               totalSum[key].value = val.length;
               if (orders.length == 0) {
                 results = results.concat(val);
               } else {
                 totalSum[key].children = {};
                 var orderscopy = orders.concat([]);
                 grouporder(val, orderscopy, totalSum[key].children);
               }
             }
           }

           grouporder(source, ordersc, totalSum);

           return {
             results: results,
             totalSum: totalSum
           };
         } else {
           return source;
         }
         
       }    
     
 });
 
 
 
 

 
 
 </script>
  
<script type="text/javascript" src="${angularJs}"></script>
<%-- <script type="text/javascript" src="${angularJs}"></script>
<script type="text/javascript" src="${commonJs}"></script>
<script type="text/javascript" src="${jsonJs}"></script> --%>
</html>
