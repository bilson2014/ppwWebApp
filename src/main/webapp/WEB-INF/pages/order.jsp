<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />
<spring:url value="/resources/css/employee/orderIndex.css" var="orderCss"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/Clamp/clamp.js" var="clampJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/employee/orderIndex.js" var="orderIndexJs"/>
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs" />
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />
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
	<meta name="keywords" content="">
	<meta name="description" content="">
	<title>我的订单</title>	
    <link rel="stylesheet" href="${orderCss }">
    <link rel="stylesheet" href="${datepickerCss }">
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
     <r:identity role="provider">
	    <input type="hidden" id="rolephone" value="1314520ppw" />              
	 </r:identity>
	 <r:identity role="customer">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	 </r:identity>
	 <r:identity role="employee">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="rolephoneImg" value="1314520ppw" />
	 </r:identity>
	 <form method="post" action="/require" id="toListForm" class="hide">
            <input type='hidden' name="indentId" id="indentId" />
            <input type='hidden' name="requireId" id="requireId"/>
            <input type='hidden' name="flag" id="flag"/>
     </form>
	 

    <input type='hidden' value="${indentList.total}" id="total">
    <input type='hidden' value="0" id="role">
    <div class="page">
      <div class="modelPage" id="successModel">
           <div class="successModel">
               <div class="closeBtn"></div>
               <div class="show-zero2 zeromodal-icon zeromodal-success">'
					<span class="line tip"></span>
					<span class="line long"></span>
		       </div>
		   <div class="oSContent">
		        <div class="title">订单提交成功!</div>
		        <div class="desc">自动返回<span>订单列表页</span><span id="last3">3</span>秒</div>
		        <div class="descBot btn-c-r">确认</div>
		   </div>
           </div>
      </div>
      <div class="modelPage" id="sureModel">
           <div class="successModel">
               <div class="closeBtn"></div>
		   <div class="oSContent">
		        <div class="sTitle">订单将作废,请注明具体原因</div>
		        <textarea class="setTextArea" id="setTextArea"></textarea>
		        <div class="sDes">此联系人信息是否真实可靠，是否为我们的潜在客户?</div>
		        <div class="infoError" id="setInfoError">请填写备注信息</div>
		        <div class="sureBtn">
		           <div class="" id="real">潜在客户</div>
		           <div class="btn-c-r" id="noReal">虚假消息</div>
		        </div>
		   </div>
           </div>
      </div>
      
      <div class="modelPage" id="checkSureModel">
           <div class="successModel">
               <div class="closeBtn"></div>
			   <div class="oSContent">
			        <div class="tdDes">正式验证客户手机是否已经存在</div>
			        <div class="tDes">是否确认"此联系人为<span class="redColor" id="setColor"></span>客户?"</div>
			        <div class="t2"></div>
			        <div class="sureBtn">
			           <div class="btn-c-r" id="tModel">确定</div>
			           <div class="btn-c-g" id="cModel">取消</div>
			        </div>
			   </div>
           </div>
      </div>
      
      <div class="modelPage" id="showErrorInfoWin">
           <div class="successModel">
               <div class="closeBtn"></div>
		   <div class="checkListContent">
		         <img src="${imgPath}/orderManager/waring.png">  
		         <div class="lList">您提供的<span id="setErrorInfoWord"></span>信息不完整,<br/>请填写完成之后再提交</div>
		         <div class="serErrorDiv"></div>
		         <div class="checkBtn btn-c-r" id="checkError">确认</div>
		   </div>
           </div>
      </div>
      
      <div class="modelPage" id="smodelPage">
           <div class="submitModel" >
               <div class="closeBtn"></div>
               <div class="submitTitle">订单提交信息验证</div>
               <div class="infoWarn">
                   <img src="${imgPath}/orderManager/waring.png">
                   <div>注意:您输入的联系人手机已存在,且与当前联系人信息不一致。已存在的信息为：</div>
               </div>
               <div class="showInfomotion">
                       <div class="showItem">
                           <div>联系人</div>
                           <div id="mprealName"></div>
                       </div>
                        <div class="showItem">
                           <div>联系电话</div>
                           <div id="mpindent_tele"></div>
                       </div>
                        <div class="showItem">
                           <div>公司名称</div>
                           <div id="mpuserCompany"></div>
                       </div>
               </div>
               <div class="setWord">
                    <div>再次提交前,您需要:</div>
                    <div>1.核实订单中客户信息是否填写准确。</div>
                    <div>2.如已存在的客户信息有误,请联系CRM专员更新客户信息。</div>
               </div>
               <div class="sureBtn">
			           <div class="btn-c-r" id="mptModel">确定</div>
		       </div>
           </div>
      </div>
      
        <div class="modelPage" id="NewOrder">
              <div class="findInfo">
                    <div class="closeBtn"></div>
                    <div class="infoTitle" id="orderName">新建订单</div>
                    <input type="hidden" id="indent_recomment">
              <div class="itemContent">
                    <div class="infoItem">
                         <div class="setError" id="telNameError" data-content="">
	                          <div class="itemTitile">联系人</div>
	                          <input class="itemInput" id="telName" maxLength="10">
	                          <div class="must">*</div>
                         </div>  
                        <div class="setError longItem" id="companyNameError">
                          <div class="itemTitile">公司名称</div>
                          <input class="itemInput" id="companyName" id="companyName" maxLength="30">
                          <div class="must">*</div>
                        </div>  
                    </div>
                   
                    </div>
                       <div class="infoItem">
                       <div class="setError" id="orderComeInfoError" data-content="">
                          <div class="itemTitile">订单来源</div>
	                      <div class="orderSelect noUse nnU">
	                            <div data-value="" id="orderComeInfo">请选择</div>
	                            <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect" id='orderCome'>
	                                    
					                    <li class="showHelper" data-id="5">线下-直销</li>
					                    <li data-id="6">线下-活动</li>
					                    <li data-id="7">线下-渠道</li>
					                    <li data-id="8">复购</li>
					                    <li data-id="9">线上-400</li>
					                    <li data-id="10">线上-商桥</li>
	                                    <li class="removeLi" data-id="1">线上-网站</li>
					                    <li class="removeLi" data-id="2">线上-活动</li>
					                    <li class="removeLi" data-id="3">线上-新媒体</li>
					                    <li data-id="4">线上-电销</li>
					              		<li class="removeLi" data-id="11">线上-PC-首页banner</li>
					                    <li class="removeLi" data-id="12">线上-PC-直接下单</li>
					                    <li class="removeLi" data-id="13">线上-PC-成本计算器</li>
					                    <li class="removeLi" data-id="14">线上-PC-供应商首页下单</li>
					                    <li class="removeLi" data-id="15">线上-PC-作品</li>
					                    <li class="removeLi" data-id="16">线上-移动-首页banner</li>
					                    <li class="removeLi" data-id="17">线上-移动-成本计算器</li>
					                    <li class="removeLi" data-id="18">线上-移动-作品</li>
					                    <li class="removeLi" data-id="19">线上-公众号-成本计算器 </li>
					                    <li class="removeLi" data-id="20">线上-公众号-直接下单</li>
					                    <li class="removeLi" data-id="21">线上-公众号-作品</li>					                    
	                            </ul>                
	                       </div>
                          <div class="must">*</div>
                       </div>
                       
                       <div class="setError longItem" id="telesError" data-content="">   
                          <div class="itemTitile">联系电话</div>
                          <input class="itemInput" id="teles">
                          <div class="must">*</div>
                      </div>    
                      
                    </div>
                     <div class="infoItem" id="showHelper">  
                        <div class="setError" id="orderPError" data-content="">
	                          <div class="itemTitile">推荐人</div>
		                      <div class="orderSelect noUse">
		                            <div data-value="" id="orderP"></div>
		                            <img src="${imgPath}/orderManager/select.png">
		                            <ul class="oSelect" id='orderComePeople'>
		                            </ul>                
		                       </div>
	                          <div class="must">*</div>
                        </div>  
                    </div>
                    
                     <div class="infoItem">
                         <div class="setError" > 
                          <div class="itemTitile" style="top:-70px;">CRM备注</div>
                          <textarea id="orderNote"></textarea>
                          <div class="must"></div>
                        </div>  
                    </div> 
                    
                <div class="sureBtn">
                   <div class="btn-c-r" id="submitEdit">保存</div>
                   <div class="btn-c-g" id="cancleEdit">取消</div>
		        </div>
            </div>
      </div>

         <div class="modelPage" id="modifyUserInfo">
              <div class="findInfo cusInfo">
                    <div class="closeBtn"></div>
                    <div class="infoTitle" id="orderName">客户信息修改</div>
              <div class="itemContents">
              		<input type="hidden" id="userName">
                    <div class="infoItem">
                        <div class="setError" id="cusTelNameError" >
                          <div class="itemTitile">联系人</div>
                          <input class="itemInput" id="muRealName" maxLength="10">
                          <div class="must">*</div>
                        </div>  
                        
                        <div class="setError longItem" id="cusCompanyNameError" >  
                          <div class="itemTitile">公司名称</div>
                          <input class="itemInput" id="muUserCompany" maxLength="30">
                          <div class="must">*</div>
                        </div>  
                    </div>
                   
               
                    <div class="infoItem">
                    
                       <div class="setError " id="cusTelesError" >    
                          <div class="itemTitile">联系电话</div>
                          <input class="itemInput" id="muTelephone">
                          <input class="itemInput" type="hidden" id="oldmuTelephone">
                          <div class="must">*</div>
                       </div>
                    
                       <div class="setError longItem" id="cusTypeError">
                          <div class="itemTitile">客户类型</div>
	                      <div class="orderSelect">
	                            <div data-value="" id="muCustomerType"></div>
	                            <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect uCustomerType" id='uCustomerType'></ul>                
	                       </div>
                          <div class="must"></div>
                       </div>   
                          
                    </div>
                     <div class="infoItem" id="showHelper"> 
                        <div class="setError" id="cusWorkError" > 
                          <div class="itemTitile">职位</div>
	                      <div class="orderSelect">
	                            <div data-value="" id="muPosition"></div>
	                            <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect" id='uPosition'>
	                            </ul>                
	                       </div>
                          <div class="must"> </div>
                        </div>
                         <div class="setError longItem" id="showHelperEdit" style="display:none"> 
                          <div class="itemTitile">推荐人</div>
	                      <div class="orderSelect">
	                            <div data-id="" id="referrerId"></div>
	                            <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect" id='orderEdit'>
	                            </ul>                
	                       </div>
                          <div class="must"></div>
                        </div>    
                    </div>
                    <div class="borderline"></div>
                    <div class="infoItem">
                        <div class="setError" >
                          <div class="itemTitile">微信</div>
                          <input class="itemInput" id="muWeChat">
                          <div class="must"></div>
                        </div>  
                         
                        <div class="setError longItem" >     
                          <div class="itemTitile">邮件</div>
                          <input class="itemInput" id="muEmail">
                          <div class="must"></div>
                        </div>  
                    </div>
                    <div class="infoItem">
                        <div class="setError" id="muOfficialSiteError" >
                          <div class="itemTitile">网址</div>
                          <input class="itemWeb" id="muOfficialSite" placeholder="例如:http://www.example.com">
                          <div class="must"></div>
                        </div>  
                    </div>
                        <div class="borderline"></div>
                     <div class="infoItem">
                        <div class="setError" >
                          <div class="itemTitile">购买频次</div>
	                      <div class="orderSelect">
	                            <div data-value="1" id="muPurchaseFrequency"></div>
	                            <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect" id='uPurchaseFrequency'>
	                            </ul>                
	                       </div>
                          <div class="must"></div>
                        </div> 
                         
                       <div class="setError longItem" > 
                          <div class="itemTitile">购买价格</div>
	                      <div class="orderSelect">
	                            <div data-value="1" id="muPurchasePrice"></div>
	                            <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect" id='uPurchasePrice'>
	                            </ul>                
	                       </div>
                          <div class="must"></div>
                        </div>  
                      </div> 
                      
                      <div class="infoItem">
                         <div class="setError" > 
                          <div class="itemTitile">客户规模</div>
	                      <div class="orderSelect">
	                            <div data-value="1" id="muCustomerSize"></div>
	                            <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect" id='uCustomerSize'>
	                            </ul>                
	                       </div>
                          <div class="must"></div>
                         </div>
                         
                        <div class="setError longItem" >  
                          <div class="itemTitile">高层背书</div>
	                      <div class="orderSelect">
	                            <div data-value="1" id="muEndorse"></div>
	                            <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect" id='uEndorse'>
	                            </ul>                
	                       </div>
                          <div class="must"></div>
                        </div>  
                      </div>  
                      
                       <div class="borderline"></div> 
                       
                     <div class="infoItem">
                         <div class="setError" > 
                          <div class="itemTitile" style="top:-70px;">备注</div>
                          <textarea id="muNote"></textarea>
                          <div class="must"></div>
                        </div>  
                    </div>    
                          
                <div class="sureBtn">
                   <div class="btn-c-r" id="submitEditCus">确定</div>
                   <div class="btn-c-g" id="cancleEdit">取消</div>
		        </div>
            </div>
      </div>
      
      <div class="modelPage" id="userInfo">
              <div class="findInfo">
                    <div class="closeBtn"></div>
                    <div class="infoTitle">客户信息</div>
              <div class="itemContent">
                  <div class="infoItem">
                          <div class="itemTitile">昵称</div>
                          <input class="itemInput">
                          <div class="must">*</div>
                    </div>  
                    <div class="infoItem">
                          <div class="itemTitile">公司名称</div>
                          <input class="itemInput" id="formuserCompany">
                          <div class="must">*</div>
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">真实姓名</div>
                          <input class="itemInput"  id="formrealName">
                          <div class="must">*</div>
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">联系电话</div>
                          <input class="itemInput" id="formindent_teles">
                          <div class="must">*</div>
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">职位</div>
	                      <div class="orderSelect">
	                              <div>测试</div>
	                             <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect">
	                                <li>选项1</li>
	                                <li>选项2</li>
	                                <li>选项3</li>
	                                <li>选项4</li>
	                            </ul>                
	                       </div>
                          <div class="must">*</div>
                    </div>
                       <div class="infoItem">
                          <div class="itemTitile">性别</div>
	                      <div class="orderSelect">
	                              <div>男</div>
	                             <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect">
	                                <li>男</li>
	                                <li>女</li>
	                            </ul>                
	                       </div>
                          <div class="must">*</div>
                    </div>
                     <div class="infoItem" style="display:block">
                          <div class="itemTitile">客户类型</div>
	                      <div class="orderSelect">
	                              <div>测试</div>
	                             <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect">
	                                <li>选项1</li>
	                                <li>选项2</li>
	                                <li>选项3</li>
	                                <li>选项4</li>
	                            </ul>                
	                       </div>
                          <div class="must">*</div>
                    </div>
                    
                    <div class="itemLine"></div>

                    <div class="infoItem">
                          <div class="itemTitile">微信</div>
                          <input class="itemInput">
                    </div>
                    <div class="infoItem">
                          <div class="itemTitile">邮件</div>
                          <input class="itemInput">
                    </div>
                      <div class="infoItem">
                          <div class="itemTitile">网址</div>
                          <input class="itemInputMax">
                    </div>
                    
                    <div class="itemLine"></div>
                    
                     <div class="infoItem" >
                          <div class="itemTitile">购买频次</div>
	                      <div class="orderSelect">
	                              <div>测试</div>
	                             <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect">
	                                <li>选项1</li>
	                                <li>选项2</li>
	                                <li>选项3</li>
	                                <li>选项4</li>
	                            </ul>                
	                       </div>
                    </div>
                    
                     <div class="infoItem" >
                          <div class="itemTitile">购买价格</div>
	                      <div class="orderSelect">
	                              <div>测试</div>
	                             <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect">
	                                <li>选项1</li>
	                                <li>选项2</li>
	                                <li>选项3</li>
	                                <li>选项4</li>
	                            </ul>                
	                       </div>
                    </div>
                    
                     <div class="infoItem" >
                          <div class="itemTitile">客户规模</div>
	                      <div class="orderSelect">
	                              <div>测试</div>
	                             <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect">
	                                <li>选项1</li>
	                                <li>选项2</li>
	                                <li>选项3</li>
	                                <li>选项4</li>
	                            </ul>                
	                       </div>
                    </div>
                    
                     <div class="infoItem" >
                          <div class="itemTitile">高层背书</div>
	                      <div class="orderSelect">
	                              <div>测试</div>
	                             <img src="${imgPath}/orderManager/select.png">
	                            <ul class="oSelect">
	                                <li>选项1</li>
	                                <li>选项2</li>
	                                <li>选项3</li>
	                                <li>选项4</li>
	                            </ul>                
	                       </div>
                    </div>
                    <div class="itemLine"></div>
                    <div class="infoItem">
                          <div class="itemTitile textareaTitle">CRM备注</div>
                          <textarea></textarea>
                    </div>
                  </div>  
                <div class="sureBtn">
                   <div class="btn-c-r">确定</div>
                   <div class="btn-c-g">取消</div>
		        </div>
		         </div>
            </div>
      </div>
    
      <div class="tableList">
         <jsp:include flush="true" page="./employee/orderSearch.jsp"></jsp:include> 
         <table class="toDoing" id="setTable">
              <tr>
                   <th>订单编号</th>
                   <th>公司名称</th>
                   <th>联系人    </th>
                   <th>联系电话</th>
                   <th>订单来源</th>
                   <th>下单时间</th>
                   <th>订单修改</th>
                   <th>需求文档</th>
                   <th>提交</th>
                   <th>作废</th>
               </tr>
   
 		       <c:if test="${ ! empty indentList.rows }">
					<c:forEach items="${indentList.rows }" var="item" varStatus="status">
						<tr>
							<td class="id" data-value="${item.requireId}" data-indentName = "${item.indentName }"><c:out value="${item.id }"/></td>
							<td class="userCompany"><c:out value="${item.userCompany }"/></td>
							<td class="realName"><c:out value="${item.realName }"/></td>
							<td class="indent_tele"><c:out value="${item.indent_tele }"/></td>
							<td class="indentSource" data-source = ${item.indentSource }>
							          <c:if test="${item.indentSource == 1}">
							                           线上-网站
							          </c:if>
							          <c:if test="${item.indentSource == 2}">
							                            线上-活动
							          </c:if>
							          <c:if test="${item.indentSource == 3}">
							                            线上-新媒体 
							          </c:if>
							          <c:if test="${item.indentSource == 4}">
							                           线上-电销
							          </c:if>
							          <c:if test="${item.indentSource == 5}">
							                           线下-直销
							          </c:if>
							          <c:if test="${item.indentSource == 6}">
							                         线下-活动
							          </c:if>
							          <c:if test="${item.indentSource == 7}">
							                           线下-渠道
							          </c:if>
							          <c:if test="${item.indentSource == 8}">
							                           复购
							          </c:if>
							          <c:if test="${item.indentSource == 9}">
							                           线下-400
							          </c:if>
							          <c:if test="${item.indentSource == 10}">
							                           线下-商桥
							          </c:if>
							          <c:if test="${item.indentSource == 11}">
							                          线上-PC-首页banner
							          </c:if>
							          <c:if test="${item.indentSource == 12}">
							                           线上-PC-直接下单
							          </c:if>
							          <c:if test="${item.indentSource == 13}">
							                           线上-PC-成本计算器
							          </c:if>
							          <c:if test="${item.indentSource == 14}">
							                           线上-PC-供应商首页下单
							          </c:if>
							          <c:if test="${item.indentSource == 15}">
							                          线上-PC-作品
							          </c:if>
							          <c:if test="${item.indentSource == 16}">
							                           线上-移动-首页banner
							          </c:if>
							          <c:if test="${item.indentSource == 17}">
							                           线上-移动-成本计算器
							          </c:if>
							          <c:if test="${item.indentSource == 18}">
							                           线上-移动-作品
							          </c:if>
							          <c:if test="${item.indentSource == 19}">
							                           线上-公众号-成本计算器
							          </c:if>
							           <c:if test="${item.indentSource == 20}">
							                           线上-公众号-直接下单
							          </c:if>
							           <c:if test="${item.indentSource == 21}">
							                           线上-公众号-作品
							          </c:if>
							</td>
							<td class="orderDate"><c:out value="${item.orderDate }"/></td>
							<td class="info"><div></div></td>
							<td class="edit"><div></div></td>
							<td class="submit sbtn" data-requireId="${item.requireId }"><div></div></td>
							<td class="cancle"><div></div></td>
						</tr>
					</c:forEach>
				</c:if> 
         </table>

         <!-- pagination start -->
		<div class="page-section">
			<div class="page-wrap">
				<div class="pagination">
					
				</div>
			</div>
		</div>
		<!-- pagination end -->
      </div>   
    </div>

   
    <!--新版底部-->
    
    <script type="text/javascript" src="${jqueryJs}"></script>
    <script type="text/javascript" src="${jqueryPageJs}"></script>
    <script type="text/javascript" src="${jsonJs}"></script>
    <script type="text/javascript" src="${datepickerJs}"></script>
    <script type="text/javascript" src="${datepickerZhJs}"></script>
    <script type="text/javascript" src="${commonJs}"></script>
    <script type="text/javascript" src="${orderIndexJs}"></script>
</body>

</html>