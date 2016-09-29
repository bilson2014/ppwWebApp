<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/biao/biao.css" var="biaoCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<%-- import JS --%>
<spring:url value="/resources/js/biao/biao.js" var="biaoJs"/>
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
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
	<meta name="baidu-site-verification" content="dMz6jZpIwd" />
	<title></title>
	<link rel="stylesheet" href="${bootstrapCss}">
	<link rel="stylesheet" href="${biaoCss}">
	<link rel="shortcut icon" href="${imgPath}/favicon.ico" >
    <script src="${jqueryJs}"></script>
	<script src="${pluginJs}"></script>
	<script src="${biaoJs}"></script>
</head>
<body>

<div class="outSiderDiv">	
	<div class="subList">
	   <div class="subListTop">
	       <img class="logo" src="${imgPath}/biao/logo.png">
	       <img class="list" src="${imgPath}/biao/subListShow.png" id="openList">
	   </div>
	   
	   <div class="showList open" id="showList">
	      
	         <div class="listOption">
		           <div class="option">
		               <div></div>报表查询
		           </div>
	         </div>
	         
	         <div class="listOption">
		           <div class="option">
		               <div></div>报表设计
		           </div>
	         </div>
	         
	         <div class="listOption">
		           <div class="optionG">
		               <div></div>数据源管理
		           </div>
	         </div>
	   </div>
	   
	   <div class="listTree">
	               
	               <ul>
	                    <li class="parentLi">
		                      <div class="title">
		                          <img class="icon" src="/resources/images/biao/book.png">测试用数据
		                          <img class="checkImg" src="/resources/images/biao/greenT.png">
		                      </div>
		                         
		                      <ul>
		                         <li>dsda</li>
		                         <li class="check">dasda</li>
		                         <li>dsda</li>
		                      </ul>   
	                    </li>
	                    
	                    <li class="parentLi">
		                      <div class="title">
		                          <img class="icon" src="/resources/images/biao/book.png">测试用数据
		                          <img src="/resources/images/biao/greenT.png">
		                      </div>
		                         
		                      <ul>
		                         <li>dsda</li>
		                         <li>dasda</li>
		                         <li>dsda</li>
		                      </ul>   
	                    </li>
	               </ul>
	   </div>
	   
	   
	</div>
	
	<div class="contentList">
	    <div class="contentListTop">
		         <div class="step">
			        <div>浏览项目</div>
			        <div>浏览项目的十大<span>X</span></div>
			        <div class="green">浏览项目<span>X</span></div>
			     </div>
			     
			     <div class="personInfo">
			          <div class="name">name</div>
			          <img class="set" src="${imgPath}/biao/setting.png" id="openSet">
			          <img class="personHead" src="${imgPath}/provder/providerHead.jpg">
			           <div class="topCard open" id="setOpen">   
				            <div class="triangle"></div>
				               <ul>
				                  <li>头像设置</li>
				                  <li>权限设置</li>
				                  <li>项目周期查询</li>
				                  <li>退出登录</li>
				               </ul>
				       </div>
			     </div>   
			     
		         
	    </div>
	    
	      <div class="content">
	              
	             <div class="table hide">
	             
					    <div class="title">
					          <div class="examine">
					               <div class="statues">审核状态</div>
					               <div class="selectDiv">审核中</div>
					               <div class="selectImg"><img src="${imgPath}/biao/downTriangle.png"></div>
					          </div>
					          
					          <div class="colSpan">
					               <div class="selectImg"><img src="${imgPath}/biao/downTriangle.png"></div>
					               <div class="col">合并左边相同维度行</div>
					          </div>
					          
					           <div class="select">
					               <div>统计列</div>
					               <div>手机号码</div>
					               <div>电子邮件</div>
					               <div>公司地址</div>
					               <div>全选</div>
					          </div>
					          
					           <div class="colSpanRight">
					               <div class="selectImg"><img src="${imgPath}/biao/make.png"></div>
					               <div class="col">生成报表</div>
					          </div>
					          
					           <div class="colSpanRight">
					               <div class="selectImg"><img src="${imgPath}/biao/print.png"></div>
					               <div class="col">导出报表</div>
					          </div>
  
					          
					    </div>
					    
					    <div class="contentTable">
					           <div class="contentTableInSide">
									<div class="optionCard">
									     <div>的十大</div>
									     <div class="check">dasda</div>
									     <div class="checkWhite">dasda</div>
									     <div>dasda</div>
									</div>
								</div>	
					    </div>
					    
					      <div class="contentTableRight">
					             <div class="contentTableCard">
					             </div>
					             <div class="contentTableCard">
					             </div>
					             <div class="contentTableCard">
					             </div>
					           
					      </div>
					    
				   </div> 
				   
				   
				   <div class="table">
					   	    <div class="title">
					   	    
					   	          <div class="coloTitle">
					   	                                设置
					   	          </div>
					   	          
					   	          <div class="colInput">
					   	             <div>名称</div>
					   	             <input type="text">
					   	          </div>
						          
						          <div class="examine">
						               <div class="statues">数据源</div>
						               <div class="selectDiv">真实数据</div>
						               <div class="selectImg"><img src="${imgPath}/biao/downTriangle.png"></div>
						          </div>
						          
						           <div class="colInput">
					   	             <div>显示顺序</div>
					   	             <input type="text">
					   	          </div>
						          
						           <div class="colSpanRight">
						               <div class="selectImg"><img src="${imgPath}/biao/save.png"></div>
						               <div class="col">保存</div>
						          </div>
						          
						    </div>
						    
						    <div class="contentSql">
						          <div class="sqlTop">
						               <div class="sqlInfo">SQL语句</div>
						               
						               <div class="sqlCard">
						                     <div class="titleCard">布局列 ：</div>
						                     <div class="circleCard">
						                         <div class="checkCard">横向展示</div>
						                         <div>纵向展示</div>
						                     </div>
						               </div>
						               
						               <div class="sqlCard">
						                     <div class="titleCard">统计列 ：</div>
						                     <div class="circleCard">
						                         <div class="checkCard">横向展示</div>
						                         <div>纵向展示</div>
						                     </div>
						               </div>
						               
						               <div class="sqlCard">
						                     <div class="titleCard">统计列 ：</div>
						                     <input>
						               </div>
						               
						          </div>
						          <textarea></textarea>
						          
						          <div class="doSql">
						                 <div>执行SQL √ </div>
						                 <div>执行SQL √</div>
						          </div>
						          
						            <div class="sqlSet">						                                                    
						                  <div class="word">元件数据配置  </div>
						                  <div class="control">
						                       <div><img src="/resources/images/biao/add.png"></div>
						                       <div><img src="/resources/images/biao/del.png"></div>
						                       <div><img src="/resources/images/biao/new.png"></div>
						                       <div class="noBorder"><img src="/resources/images/biao/cancle.png"></div>
						                  </div>  				                                                                                                 
						            </div>
						    </div>
						    
						    
						    
						    
				   </div>
				    
				    
		 </div>		    
	    
	    
	</div>
</div>
	
	
	
	
</body>
</html>