<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/supplier/basics.css" var="basicsCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs" />



<spring:url value="/resources/lib/cripto/aes.js" var="aesJs" />
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs" />
<%-- <spring:url value="/resources/lib/webuploader/pad-zeropadding.js" var="padJs"/> --%>

<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/js/supplier/filmmaking.js" var="filmmakingJs"/>


<spring:url value="/resources/js/supplier/createActor.js" var="createActorJs"/>
<spring:url value="/resources/js/supplier/site.js" var="siteJs"/>
<spring:url value="/resources/js/supplier/device.js" var="deviceJs"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="title" content="">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<title>制片工具</title>
	<link rel="stylesheet" href="${webCss}">
	<link rel="stylesheet" href="${basicsCss}">
	


	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->

	
</head>
<body>

		 <div class="page">
		         <div class="managerPgae">
		           <div class="lineHead"></div>
		              <div class="managerCard">
		               		<div class='top'>
		               			<div class='people  top-text'>人员</div>
		               			<div class='sitett'>场地</div>
		               			<div class='facility'>设备</div>
		               			<div class='newbox'>
		               				<img src="/resources/images/supplier/add.png">新建
		               			</div>
		               		</div>	
		              		<div class='setCard'>
		              		<!--每个列表  idcard-->
		              			<div class='idcard '>
		              				<img class="imgs1" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527740495&di=f2c42a682f917b686de966d95944627d&src=http://img5.duitang.com/uploads/item/201411/04/20141104171337_xaMXx.jpeg">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs2" src="/resources/images/supplier/55.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			
		              			<div class='idcard '>
		              				<img class="imgs3" src="/resources/images/supplier/44.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs4" src="/resources/images/supplier/11.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs5" src="/resources/images/supplier/33.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div><div class='idcard '>
		              				<img class="imgs5" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528279592&di=fc4f3c06aa8ddd220b71df6f83582273&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F59%2F15%2F54f58PICMis_1024.png ">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			
		              			
    		
		              		</div>
		              		
		              		
		              		<!--每个 弹框的模板  -->
		              		
		              		<!--添加角色的 弹框  -->
		              		<div class='setting'>
		              			<div class='addpeople'>
		              				<div class='addtitle'>请选择添加的角色</div>
		              				<div class='addboxs'>
		              					<div class='check'>请选择</div>
		              					<img class='more' src="/resources/images/supplier/more.png">
		              					<div class='morecheck'>
		              						<span>演员</span>
		              						<span>导演</span>
		              					</div>
		              					<div class='sure'>确认</div>
		              					<div class='cancel'>取消</div>
		              				</div>
		              			</div>
		              			
		              			
		              			<!-- 添加演员 -->
		              			<div class='staffbox'>
		              				<div class='stafftitle'>
		              					<span>创建演员</span>
		              					<img alt="" src="/resources/images/supplier/close.png">
		              				</div>
		              				<div class='gather'>
		              					<div class='gatherleft'>
		              						<span>姓名</span>
		              						<input class='namegather' type='text' placeholder="">
		              						<p class='namegatherp errorp'></p>
		              						
		              						<span>性别</span>
		              						<div class='gendergather'>请选择性别</div>
		              						<img class='genderimg' alt="" src="/resources/images/supplier/more.png">
		              						<p class='gendergatherp errorp'></p>
		              						<div class='twocheck'>
		              							<p>男</p>
		              							<p>女</p>
		              						</div>
		              						
		              						<span>出生年份</span>
		              						<input class='oldgather' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              						<p class='oldgatherp errorp'></p>
		              						
		              						<span>种族</span>
		              						<div class='racegather'>请选择种族</div>
		              						<img class='raceimg' alt="" src="/resources/images/supplier/more.png">
		              						<p class='racegatherp errorp'></p>
		              						<div class='racecheck'>
		              							<p>小丸子</p>
		              							<p>机器猫</p>
		              							<p>葫芦娃</p>
		              							<p>哪吒</p>
		              						</div>
		              						
		              						<span>所在城市</span>
		              						<div class='citygather'>请选择城市</div>
		              						<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
		              						<p class='citygatherp errorp'></p>
		              						<div class='citycheck'>
		              							<p>中国1</p>
		              							<p>美国2</p>
		              							<p>中国1</p>
		              							<p>美国2</p>
		              							<p>中国1</p>
		              							<p>美国2</p>
		              						</div>
		              						
		              						<span>价格/天</span>
		              						<input class='pricegather' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              						<p class='pricegatherp errorp'></p>
		              						
		              						
		              					</div>
		              					<div class='gatherright'>
		              					
		              					<%-- <div class="user-icon" >          
                        <img alt="用户头像" data-value="${employee.employeeImg}" src="${imgPath}/provider/initLogo.png"   class="img-circle" id="user-img" width=120 height=120/>
                      	<input type="hidden" id="user_img_url" value="${imgPath}/provider/initLogo.png">
                    </div>                 
                    <p id='errorImg'>你可以上传JPG、GIF或PNG格式的文件，文件大小不能超过2M</p>
                    <div class="upload-btn">
                        <div id="uploadBt">上传头像</div>
                      	<input type="file" name="file" id="file" style="display: none;"/>
                     <p id='safeError'></p> 
                    </div> --%>
		              					
		              					
		              					 	<div class='addimage '>
		              							<img alt="用户头像" data-value="${employee.employeeImg}" src=""   class="img-circle" id="user-img" width=120 height=120/>
		        
		              							<div class='reupload'>重新上传</div>
		              							<img class='addimgs' alt="点击添加图片" src="/resources/images/supplier/adds.png"/>
		              							<input type="file" name="file" id="file" style="display: none;"/>
		              							<p>点击添加图片</p>
		              						</div>
		              						
		              						
		              						
		              						
		              						
		              						<div class='addboxs'>
		              							<span>可上传JPG、GIF或PNG格式的 文件，文件大小不能超过2M。</span>
		              							<div class='addtext'>上传更多照片</div>
		              							<p>(最多5张)</p>
		              						</div>
		              					</div>
		              					<!--上传的显示地方  -->
		              					<div class='showimages'>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive1" src="/resources/images/supplier/44.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive2" src="/resources/images/supplier/11.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive3" src="/resources/images/supplier/22.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive4" src="/resources/images/supplier/33.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						<div class='imgsboxs '>
		              							<img class="imgsfive5" src="/resources/images/supplier/55.png">
		              							<div class='imgshade '>
		              								<img class='select' src="/resources/images/supplier/select.png">
		              							</div>
		              						</div>
		              						
		              						
		              						
		              						
		              					</div>
		              					<div class='remark'>
		              						<span>备注</span>
		              						<textarea rows="4" cols="550" placeholder="请完善演员体重、三维、特殊技能、擅长角色、作品等信息"></textarea>
		              					</div>
		              					<!--提交按钮  -->
		              					<div class='gatherbut'>
		              						<div class='sure'>确认</div>
		              						<div class='cancel'>取消</div>
		              					</div>
		              					
		              					
		              				</div>
		              				
		              			</div>
		              			
		              		<!--添加导演  -->
		              		<div class='directorbox'>
		              			<div class='directortitle'>
		              				<span>创建导演</span>
		              				<img alt="关闭" src="/resources/images/supplier/close.png">
		              			</div>
		              			<div class='director'>
		              				<div class='directorl'>
		              				
		              					<span>姓名</span>
		              					<input class='namedir' type='text' placeholder="">
		              					<p class='namedirp errorp'>*错了</p>
		              						
		              					<span>擅长领域</span>
		              					<div class='skilldir'>请选择擅长领域</div>
		              					<img class='skillimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='skilldirp errorp'></p>
		              					<div class='skillcheck'>
		              						<p>唱歌</p>
		              						<p>跳舞</p>
		              						<p>唱歌1</p>
		              						<p>跳舞2</p>
		              						<p>唱歌44</p>
		              						<p>跳舞333</p>
		              					</div>
		              					
		              					<span>所在城市</span>
		              					<div class='citydir'>请选择城市</div>
		              					<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='citydirp errorp'></p>
		              					<div class='citycheck'>
		              						<p>中国</p>
		              						<p>美国</p>
		              						<p>北京</p>
		              						<p>日本</p>
		              						<p>韩国</p>
		              						<p>加拿大</p>
		              					</div>
		              					
		              					
		              					<span>价格/天</span>
		              					<input class='pricegather' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              					<p class='pricegatherp errorp'></p>
		              					
		              					
		              					
		              					
		              					
		              					
		              				</div>
		              				<div class='directorr'>
		              				
		              				</div>
		              			</div>
		              			
		              			<div class='remark'>
		              				<span>备注</span>
		              				<textarea rows="4" cols="550" placeholder="请完善导演简历以及作品等信息"></textarea>
		              			</div>
		              			<!--提交按钮  -->
		              			<div class='gatherbut'>
		              				<div class='sure'>确认</div>
		              				<div class='cancel'>取消</div>
		              			</div>
		              			
		              		
		              		</div>
		              		
		              		
		              		
		              		<!--添加场地  -->
		              		<div class='sitebox' >
		              			<div class='sitetitle'>
		              				<span>添加场地</span>
		              				<img alt="关闭" src="/resources/images/supplier/close.png">
		              			</div>
		              			<div class='site'>
		              				<div class='siteleft'>
		              				
		              					<span>名称</span>
		              					<input class='namesite' type='text' placeholder="">
		              					<p class='namesitep errorp'></p>
		              					
		              					<span>面积㎡</span>
		              					<input class='msite' type='text' placeholder="">
		              					<p class='msitep errorp'></p>
		              						
		              					<span>类型</span>
		              					<div class='typesite'>请选择场地类型</div>
		              					<img class='typeimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='typesitep errorp'></p>
		              					<div class='typecheck'>
		              						<p>内景</p>
		              						<p>外景</p>
		              						
		              					</div>
              					
		              					<span>价格/天</span>
		              					<input class='pricesite' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              					<p class='pricesitep errorp'></p>
		              					
		              					
		              					<span>所在城市</span>
		              					<div class='citysite'>请选择城市</div>
		              					<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='citysitep errorp'></p>
		              					<div class='citycheck'>
		              						<p>城市1</p>
		              						<p>北京</p>
		              						<p>山西</p>
		              						<p>北京气温气温</p>
		              						<p>城1</p>
		              						
		              					</div>
		              					
		              					
		              					<span>地址</span>
		              					<input class='locationsite' type='text' placeholder="请输入地址">
		              					<p class='locationsitep errorp'></p>
		              					
		              					
		              					
		              				</div>
		              				<div class='siteright'></div>
		              			</div>
		              			<div class='remark'>
		              				<span>备注</span>
		              				<textarea class='siteremark' rows="4" cols="550" placeholder="请完善场地信息"></textarea>
		              			</div>
		              			<!--提交按钮  -->
		              			<div class='gatherbut'>
		              				<div class='sure'>确认</div>
		              				<div class='cancel'>取消</div>
		              			</div>
		              			
		              		
		              		</div>
		              		
		              		
		              		<!--添加设备  -->
		              		<div class='equipbox' >
		              			<div class='equiptitle'>
		              				<span>添加设备</span>
		              				<img alt="关闭" src="/resources/images/supplier/close.png">
		              			</div>
		              			<div class='equip'>
		              				<div class='equipleft'>
		              				
		              					<span>设备类型</span>
		              					<div class='typeequip'>请选择设备类型</div>
		              					<img class='typeimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='typeequipp errorp'></p>
		              					<div class='typecheck'>
		              						<p>摄影设备</p>
		              						<p>摄影辅助</p>
		              						<p>镜头设备</p>
		              						<p>灯光设备</p>
		              					</div>
		              					
		              				</div>
		              				<div class='equipleft'>
		              					<span>设备名称</span>
		              					<div class='nameequip'>请选择设备名称</div>
		              					<img class='nameimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='nameequipp errorp'></p>
		              					<div class='namecheck'>
		              						<p>k</p>
		              						<p>t</p>
		              						<p>vvvv</p>
		              						<p>aaa</p>
		              						<p>wwww</p>
		              						<p>23dwed</p>
		              					</div>
		              				</div>
		              				
		              				<div class='equipleft'>
		              					<span>设备数量</span>
		              					<input class='numequip' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              					<p class='numequipp errorp'></p>
		              				</div>
		              				
		              				<div class='equipleft'>
		              					<span>单价/天</span>
		              					<input class='priceequip' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              					<p class='priceequipp errorp'></p>
		              				</div>
		              				
		              				<div class='equipleft'>
		              					<span>所在城市</span>
		              					<div class='cityequip'>请选择城市</div>
		              					<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='cityequipp errorp'></p>
		              					<div class='citycheck'>
		              						<p>城市1</p>
		              						<p>北京</p>
		              						<p>山西</p>
		              						<p>北京气温气温</p>
		              						<p>城1</p>
		              					</div>
		              				</div>
		              				
		              				
		              			</div>
		              			<div class='remark'>
		              				<span>备注</span>
		              				<textarea class='equipremark' rows="4" cols="550" placeholder="请完善设备信息"></textarea>
		              			</div>
		              			<!--提交按钮  -->
		              			<div class='gatherbut'>
		              				<div class='sure'>确认</div>
		              				<div class='cancel'>取消</div>
		              			</div>
		              			
		              		
		              		</div>
		              		
		              		
		              		
		              
		              </div>
		         </div>
		 </div>
		   
	
	<script src="${jqueryJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${createActorJs}"></script> 
	<script src="${siteJs}"></script> 
	<script src="${deviceJs}"></script> 
	
 	<script src="${webuploaderJs }"></script> 


	<script src="${filmmakingJs}"></script>
	
	
</body>
</html>