<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/supplier/basics.css" var="basicsCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss" />
<spring:url value="/resources/lib/jcrop/jquery.Jcrop.min.css" var="jcropCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs" />
<spring:url value="/resources/lib/jquery/ajaxfileupload.js" var="ajaxfileuploadJs"/>

<spring:url value="/resources/lib/jcrop/jquery.Jcrop.min.js" var="jcropJs"/>
<spring:url value="/resources/lib/jcrop/jquery.color.js" var="jcropColorJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>

<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/js/supplier/filmmaking.js" var="filmmakingJs"/>
<spring:url value="/resources/js/supplier/createActor.js" var="createActorJs"/>
<spring:url value="/resources/js/supplier/createDirector.js" var="createDirectorJs"/>
<spring:url value="/resources/js/supplier/site.js" var="siteJs"/>
<spring:url value="/resources/js/supplier/device.js" var="deviceJs"/>

<spring:url value="/resources/js/supplier/moreimg.js" var="moreimgJs"/>
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
	<link rel="stylesheet" href="${webuploaderCss}">
	<link rel="stylesheet" href="${jcropCss}">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	
	
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->

	
</head>
<body>
<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />

		 <div class="page" id='filmmaking'>
		         <div class="managerPgae">
		           <div class="lineHead"></div>
		              <div class="managerCard">
		               		<div class='top'>
		               			<div class='people  top-text'>人员</div>
		               			<div class='sitett'>场地</div>
		               			<div class='facility'>设备</div>
		               			<div class='newbox'>
		               			
		               				<span>添加</span>
		               			</div>
		               		</div>	
		              		<div class='setCard'>
		              		 	
		              		 	
		              		 	
		              		</div>
		              		<div class='writepng'>
		              		 		<img  src="/resources/images/supplier/write.png">
		              		 </div>
		        
		              		<!--添加角色的 弹框  -->
		              		<div class='setting' >

		              			<div class='addpeople'>
		              				<div class='addtitle'>请选择添加的角色</div>
		              				<div class='addboxs'>
		              					<input class='check ods' placeholder="请选择">
		              					<img class='more ct' src="/resources/images/supplier/more.png">
		              					<div class='morecheck odbox'>
		              						<span class='boxs'>演员</span>
		              						<span class='boxs'>导演</span>
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
		              						<span>演员姓名</span>
		              						<input class='namegather' type='text' placeholder="">
		              						<p class='namegatherp errorp'></p>
		              						
		              						<span>性别</span>
		              						<div class='gendergather '>请选择</div>
		              						<img class='genderimg ' alt="" src="/resources/images/supplier/more.png">
		              						<p class='gendergatherp errorp'></p>
		              						<div class='twocheck '>
		              							<p key='1' >男</p>
		              							<p key='2' >女</p>
		              						</div>
		              						
		              						<span>出生年份</span>
		              						<input class='oldgather' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              						<p class='oldgatherp errorp'></p>
		              						
		              						<span>种族</span>
		              						<div class='racegather '>请选择</div>
		              						<img class='raceimg ' alt="" src="/resources/images/supplier/more.png">
		              						<p class='racegatherp errorp'></p>
		              						<div class='racecheck '></div>
		              						
		              						<span>所在城市</span>
		              						<div class='citygather '>请选择</div>
		              						<img class='cityimg ' alt="" src="/resources/images/supplier/more.png">
		              						<p class='citygatherp errorp'></p>
		              						<div class='citycheck '>
		              						</div>
		              						
		              						<span>价格(元/天)</span>
		              						<input class='pricegather' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              						<p class='pricegatherp errorp'></p>
		              						
		              					</div>
		              					<div class='gatherright'>
		              						<div class='tipsimage'>演员照片
		              						<span>(5张演员照片图包含1张封面)</span>
		              						</div>
		              					 	<div class='addimage filesimage' id='filePicker1'><!-- id='picker' -->
		              					 		<div class='updateimg'>
		              					 			<img alt="用户头像" class='fileimg' src="/resources/images/supplier/666.png""/>
		              					 		</div>

		              						</div>
		              						
		              						<div class='addboxs'>
		              							<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>
		              							<div class='addtext filesimage' id='filePicker2' ></div>
		              						
		              						</div>
		              						
		              					</div>
		              					<!--上传的显示地方  -->
		              					<div class='showimages' style="display: none;">
		              						
		              					</div>
		              					<div class='remark'>
		              						<span>备注</span>
		              						<textarea class='remarkgather' rows="4" cols="550" placeholder="请完善演员体重、三维、特殊技能、擅长角色、作品等信息"></textarea>
		              					</div>
		              					<!--提交按钮  -->
		              					<div class='gatherbut'>
		              						<div class='sure'>确认</div>
		              						<div class='cancel'>取消</div>
		              					</div>
		              					
		              					
		              				</div>
		              				
		              			</div>
		              	
	<!-- photo Modal start -->
	<div class="cusModel" id="mymodal">
		<div class="modal-dialog">
			<div class="modal-content model-distance">
				<div class="modal-header model-no-border">
				    <span>请选择照片区域</span>
					<img class="closeBtn" id="closePhone" alt="关闭" src="/resources/images/supplier/close.png">
				</div>
				<div class="modal-body">
					<div class="modal-left">
						<div class="modal-original">
							<img id="modal-original-img" alt="全图" src="">
						</div>
					</div>
					<div class="modal-right">
						<div class="modal-preview-container">
							<img id="modal-preview" alt="全图" src="">
						</div>
						<span class='preview'>图片预览</span>
						<button class="btn btn-primary" type="button" id="uploadConfirmBt">确认</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- photo Modal end -->	
		              		<!--添加导演  -->
		              		<div class='directorbox'>
		              			<div class='directortitle'>
		              				<span>创建导演</span>
		              				<img alt="关闭" src="/resources/images/supplier/close.png">
		              			</div>
		              			<div class='director'>
		              				<div class='directorl'>
		              				
		              					<span>导演姓名</span>
		              					<input class='namedir' type='text' placeholder="">
		              					<p class='namedirp errorp'></p>
		              						
		              					<span>擅长领域</span>
		              					<div class='skilldir'>请选择</div>
		              					<img class='skillimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='skilldirp errorp'></p>
		              					<div class='skillcheck'>
		              					</div>
		              					
		              					<span>所在城市</span>
		              					<div class='citydir'>请选择</div>
		              					<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='citydirp errorp'></p>
		              					<div class='citycheck'>
		              					</div>
		              					
		              					
		              					<span>价格(元/天)</span>
		              					<input class='pricedir' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              					<p class='pricedirp errorp'></p>
		              					
		              					
		              				</div>
		              				<div class='directorr'>
		              					<div class='tipsimage'>导演照片
		              						<span>(1张导演照片封面)</span>
                                        </div>
		              					<div class='addimage filesimage' id='filePicker3'>
		              						<div class='updateimg'>
		              					 		<img alt="用户头像" class='fileimg'/>
		              					 	</div>
		              					</div>
		              					<div class='addboxs'>
		              						<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>
		              							
		              					</div>
		              					
		              				</div>
		              			</div>
		              			
		              			<div class='remark'>
		              				<span>备注</span>
		              				<textarea class='remarkdirector' rows="4" cols="550" placeholder="请完善导演简历以及作品等信息"></textarea>
		              			</div>
		              			<!--提交按钮  -->
		              			<div class='gatherbut'>
		              				<div class='sure'>确认</div>
		              				<div class='cancel'>取消</div>
		              			</div>
		              		</div>
		              		
		              		<!--添加场地  -->
		              		<div class='sitebox'>
		              			<div class='sitetitle'>
		              				<span>添加场地</span>
		              				<img alt="关闭" src="/resources/images/supplier/close.png">
		              			</div>
		              			<div class='site'>
		              				<div class='siteleft'>
		              				
		              					<span>场地名称</span>
		              					<input class='namesite' type='text' placeholder="">
		              					<div class='hint'>如:北京高碑店**影视基地实景棚</div>
		              					<p class='namesitep errorp'></p>
		              					
		              					<span>面积(㎡)</span>
		              					<input class='msite' type='text' placeholder="">
		              					<p class='msitep errorp'></p>
		              						
		              					<span>场地类型</span>
		              					<div class='typesite'>请选择</div>
		              					<img class='typeimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='typesitep errorp'></p>
		              					<div class='typecheck'>
		              						<p key='1'>内景</p>
		              						<p key='2'>外景</p>
		              					</div>
              					
		              					<span>价格(元/天)</span>
		              					<input class='pricesite' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              					<p class='pricesitep errorp'></p>
		              					
		              					<span>所在城市</span>
		              					<div class='citysite'>请选择</div>
		              					<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
		              					<p class='citysitep errorp'></p>
		              					<div class='citycheck'>
		              					</div>
		              					
		              					<span>详细地址</span>
		              					<input class='locationsite' type='text' placeholder="请输入地址">
		              					<p class='locationsitep errorp'></p>
		              					
		              					
		              					
		              				</div>
		              				<div class='siteright'>
		              						<div class='tipsimage'>场地照片
		              						<span>(4张实景图包含1张场地封面)</span>
		              						</div>
		              				
		              						<div class='addimage filesimage' id='filePicker4'><!-- id='picker' -->
		              					 		<div class='updateimg'>
		              					 			<img alt="用户头像" class='fileimg' data-value="${employee.employeeImg}" src=""/>
		              					 		</div>
		              							
		              						</div>
		              						<!-- <img class='addimgs' alt="点击添加图片" src="/resources/images/supplier/adds.png"/>
		               						<p class='clickimg'>点击添加图片</p>  -->
		              						
		              						<div class='addboxs'>
		              							<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>
		              							<div class='addtext filesimage' id='filePicker5' ></div>
		              						
		              						</div>
		              						
		              				</div>
		              			</div>
		              			
		              			<!--上传的显示地方  -->
		              			<div class='siteimages' style="display: none;">
		             <!--  <div class='imgsboxs '>
          				<img class='imgsfive1' data-value="+userTarget.result+" src="+getResourcesName()+userTarget.result+">
          				<div class='imgshade '>
          				<img class='select' src='/resources/images/supplier/select.png'>
          				</div>
          			</div> -->
          				
          					
		              			</div>
		              			
		              			<div class='remark'>
		              				<span>备注</span>
		              				<textarea class='siteremark' rows="4" cols="550" placeholder="请提供更多信息（如：棚高，配置等）"></textarea>
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
		              					<div class='typeequip'>请选择</div>
		              					<img class='typeimg' alt="" src="/resources/images/supplier/more.png">
		              					<!-- <p class='typeequipp errorp'>*请选择设备类型</p> -->
		              					<div class='typecheck'></div>
		              					
		              					<span class='bastname'>设备名称</span>
		              					<input class='nameequip' placeholder="请选择" readonly="readonly">
		              					<img class='nameimg' alt="" src="/resources/images/supplier/more.png">
		              					<!-- <p class='nameequipp errorp'>*请选择设备名称</p> -->
		              					<div class='namecheck'></div>
		              					
		              					
		              					<span class='typeequipp errorp'>*请选择设备类型</span>
		              					<span class='nameequipp errorp'>*请选择设备名称</span>
		              					
		              				</div>
		              				
		              				
		              				<div class='equipleft'>
		              					<span>库存总量(台)</span>
		              					<input class='numequip' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              					
		              				
		              					<span class='days'>单价(元/天)</span>
		              					<input class='priceequip' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
		              					<span class='numequipp errorp'>*请输入库存总量</span>
		              					<span class='priceequipp errorp'>*请输入单价</span>
		              				</div>
		              				
		              				<div class='equipleft' style="width: 335px;">
		              					<span>所在城市</span>
		              					<div class='cityequip'>请选择</div>
		              					<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
		              					<div class='citycheck'></div>
		              					<span class='cityequipp errorp'>*请选择城市</span>
		              				</div>
		              				
		              				
		              			</div>
		              			<div class='remark'>
		              				<span>备注</span>
		              				<textarea class='equipremark' rows="4" cols="550" placeholder="请填写租赁设备详细信息（如：设备状态，租赁规则等）"></textarea>
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
		   
	<div class="tooltip-success-show"></div>
	

	
	<script src="${jqueryJs }"></script>
	<script src="${webuploaderJs}"></script>
	<script src="${ajaxfileuploadJs}"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${createActorJs}"></script> 
<%--  <script src="${moreimgJs}"></script> --%>
	<script src="${createDirectorJs}"></script> 
	<script src="${siteJs}"></script> 
	<script src="${deviceJs}"></script> 


	
	<script src="${jcropJs}"></script>
	<script src="${jcropColorJs}"></script>
	<script src="${jsonJs}"></script>
	
	<script src="${filmmakingJs}"></script>
	
	

	
	
</body>
</html>