<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%-- import CSS --%>
<spring:url value="/resources/css/supplier/basics.css" var="basicsCss" />
<spring:url value="/resources/lib/webuploader/webuploader.css"
	var="webuploaderCss" />
<spring:url value="/resources/lib/jcrop/jquery.Jcrop.min.css"
	var="jcropCss" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js"
	var="bootstrapJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js"
	var="webuploaderJs" />
<spring:url value="/resources/lib/jquery/ajaxfileupload.js"
	var="ajaxfileuploadJs" />

<spring:url value="/resources/lib/jcrop/jquery.Jcrop.min.js"
	var="jcropJs" />
<spring:url value="/resources/lib/jcrop/jquery.color.js"
	var="jcropColorJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />

<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/js/supplier/filmmaking.js"
	var="filmmakingJs" />
<spring:url value="/resources/js/supplier/createActor.js"
	var="createActorJs" />
<spring:url value="/resources/js/supplier/createDirector.js"
	var="createDirectorJs" />
<spring:url value="/resources/js/supplier/site.js" var="siteJs" />
<spring:url value="/resources/js/supplier/device.js" var="deviceJs" />
<spring:url value="/resources/js/supplier/people.js" var="peopleJs" />
<spring:url value="/resources/js/supplier/createCameraman.js" var="cameramanJs" />
<spring:url value="/resources/js/supplier/props.js" var="propsJs" />
<spring:url value="/resources/js/supplier/clothing.js" var="clothingJs" />

<spring:url value="/resources/js/supplier/moreimg.js" var="moreimgJs" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->
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
<link rel="shortcut icon" href="${imgPath }/favicon.ico">



<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->


</head>
<body style="overflow: hidden;">
	<input type="hidden" id="storage_node"
		value="${file_locate_storage_path }" />

	<div class="page" id='filmmaking'>
		<div class="managerPgae">
			<div class="lineHead"></div>
			<div class="managerCard">


				<div class='top'>
					<div class='people  top-text'>人员</div>
					<div class='sitett'>场地</div>
					<div class='facility'>设备</div>
					<div class='costume'>服装道具</div>
					<div class='newbox'>
						<span>添加</span>
					</div>
				</div>
				<div class='setCard peo' id='peo'></div>
				<div class='setCard sit' id='sit'></div>
				<div class='setCard fac' id='fac'></div>
				<div class='setCard peo' id='cos'></div>
				<div class='writepng'>
					<img src="/resources/images/supplier/write.png">
				</div>

				<!--添加角色的 弹框  -->
				<div class='setting'>

					<div class='addpeople'>
						<div class='addtitle'>请选择添加的角色</div>
						<div class='addboxs'>
							<input class='check ods' placeholder="请选择"> <img
								class='more ct' src="/resources/images/supplier/more.png">
							<div class='morecheck odbox'>
								<span class='boxs'>演员</span> <span class='boxs'>导演</span>
							</div>
							<div class='sure'>确认</div>
							<div class='cancel'>取消</div>
						</div>
					</div>
					<!--侧边选择  -->
					<div class='role'>
						<p class='pickdir pickrole' style="border-top-left-radius: 6px;">导演</p>
						<p class='pickact'>演员</p>
						<p class='pickcam'>摄影师</p>
						<p class='picklig'>灯光师</p>
			<!-- 			<p class='pickpro'>制片人</p> -->
						<p class='pickedi'>剪辑师</p>
						<p class='pickpac'>包装师</p>
						<p class='pickcol'>调色师</p>
						<p class='pickprop'>道具师</p>
						<p class='pickart'>美术师</p>
						<p class='pickcos'>服装师</p>
						<p class='pickdre'>化妆师</p>
						<p class='pickmix'>录音师</p>
					</div>
					
					<div class='customeRole'>
						<p class='pickclo pickrole' style="border-top-left-radius: 6px;">服装</p>
						<p class='pickpro'>道具</p>
					</div>

					<!-- 添加演员 -->
					<div class='staffbox addPeopleBox'>
						<div class='stafftitle addPeopleTitle'>
							<span>创建演员</span> <img alt=""
								src="/resources/images/supplier/close.png">
						</div>
						<div class='gather addContent'>
							<div class='gatherleft leftAddDiv'>
								<span>演员姓名</span> <input class='namegather' type='text'
									placeholder="">
								<p class='namegatherp errorp'></p>

                             <h2 class="setPosition">
								<span>性别</span>
								<div class='gendergather '>请选择</div>
								<img class='genderimg ' alt=""
									src="/resources/images/supplier/more.png">
								<p class='gendergatherp errorp'></p>
								<div class='twocheck selectCheck'>
									<p key='1'>男</p>
									<p key='2'>女</p>
								</div>
							</h2>	

								<span>出生年份</span> <input class='oldgather' type='text'
									onKeyUp="if(this.value.length>4){this.value=this.value.substr(0,4)};this.value=this.value.replace(/^(3[0-9][0-9]|4[0-9][0-9]|5[0-9][0-9]|6[0-9][0-9]|7[0-9][0-9]|8[0-9][0-9]|9[0-9]|0[0-9]|1[0-8]|2[1-9])$/,'');"
									placeholder="请输入数字">

								<!-- onkeyup="value=value.replace(/^(3|4|5|6|7|8|9|0|1[0-8]|2[1-9])$/,'')" 
		              						onKeyUp="if(this.value.length>4){this.value=this.value.substr(0,4)};this.value=this.value.replace(/^(3|4|5|6|7|8|9|0|1[0-8]|2[1-9])$/,'');" -->

								<p class='oldgatherp errorp'></p>
								<!-- onkeyup="value=value.replace(/[^\d]/g,'')"
		              						<!-- onkeyup="value=value.replace(/^(19|20)[0-9]{2}/g,'')" -->
								<!-- reg = /^(0|86|17951)? (19[0-9]|20[0-9])[0-9]{1}$/; -->
								
							 <h2 class="setPosition">	
								<span>种族</span>
								<div class='racegather '>请选择</div>
								<img class='raceimg ' alt=""
									src="/resources/images/supplier/more.png">
								<p class='racegatherp errorp'></p>
								<div class='racecheck selectCheck'></div>
							</h2>	

                             <h2 class="setPosition">
								<span>所在城市</span>
								<div class='citygather cityValue'>请选择</div>
								<img class='cityimg ' alt=""
									src="/resources/images/supplier/more.png">
								<p class='citygatherp errorp'></p>
								<div class='citycheck setCity selectCheck'></div>
                             </h2>
                             
								<span>价格(元/天)</span> <input class='pricegather' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='pricegatherp errorp'></p>

							</div>
							<div class='gatherright rightAddDiv'>
								<div class='tipsimage'>
									演员照片 <span>(5张演员照片图包含1张封面)</span>
								</div>
								<div class='addimage filesimage' id='filePicker1'>
									<!-- id='picker' -->
									<div class='updateimg'>
										<img alt="用户头像" class='fileimg' src="" />
									</div>

								</div>

								<div class='addboxs'>
									<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>
									<div class='addtext filesimage' id='filePicker2'></div>

								</div>

							</div>
							<!--上传的显示地方  -->
							<div class='showimages' style="display: none;"></div>
							<div class='remark'>
								<span>备注</span>
								<textarea class='remarkgather' rows="4" cols="550"
									placeholder="请完善演员体重、三维、特殊技能、擅长角色、作品等信息"></textarea>
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
									<span>请选择照片区域</span> <img class="closeBtn" id="closePhone"
										alt="关闭" src="/resources/images/supplier/close.png">
								</div>
								<div class="modal-body">
									<div class="modal-left">
										<div class="modal-original">
											<img id="modal-original-img" alt="全图" src="">
										</div>
									</div>
									<div class="modal-right">
										<div class="modal-preview-container">
											<img id="modal-preview" alt="全图a" src="/resources/images/supplier/black.png">
										</div>
										<span class='preview'>图片预览</span>
										<button class="btn btn-primary" type="button"
											id="uploadConfirmBt">确认</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- photo Modal end -->
					<!--添加导演  -->
					<div class='directorbox addPeopleBox'>
						<div class='directortitle addPeopleTitle'>
							<span>创建导演</span> 
							<img alt="关闭" src="/resources/images/supplier/close.png">
						</div>
						<div class='director addContent'>
							<div class='directorl leftAddDiv'>

								<span>导演姓名</span> <input class='namedir' type='text' placeholder="">
								<p class='namedirp errorp'></p>

                             <h2 class='setPosition'>
								<span>擅长领域</span> <span class='morepick'>(可多选)</span>
								<div class='skilldir'>请选择</div>
								<img class='skillimg' alt="" src="/resources/images/supplier/more.png">
								<p class='skilldirp errorp'></p>
								<div class='skillcheck selectCheck'></div>
                             </h2>
                             
                             <h2 class='setPosition'>
								<span>所在城市</span>
								<div class='citydir cityValue'>请选择</div>
								<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
								<p class='citydirp errorp'></p>
								<div class='citycheck setCity selectCheck'></div>
							</h2>	

								<span>价格(元/天)</span> <input class='pricedir' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='pricedirp errorp'></p>

							</div>
							<div class='directorr rightAddDiv'>
								<div class='tipsimage'>
									导演照片 <span>(1张导演照片封面)</span>
								</div>
								<div class='addimage filesimage' id='filePicker3'>
									<div class='updateimg'>
										<img alt="用户头像" class='fileimg' />
									</div>
								</div>
								<div class='addboxs'>
									<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>

								</div>

							</div>
						</div>

						<div class='remark'>
							<span>备注</span>
							<textarea class='remarkdirector' rows="4" cols="550"
								placeholder="请完善导演简历以及作品等信息"></textarea>
						</div>
						<!--提交按钮  -->
						<div class='gatherbut'>
							<div class='sure'>确认</div>
							<div class='cancel'>取消</div>
						</div>
					</div>

					<!--添加其他职业  -->
					<div class='peoplebox addPeopleBox'>
						<div class='peopletitle addPeopleTitle'>
							<span>创建灯光师</span> <img alt="关闭"
								src="/resources/images/supplier/close.png">
						</div>
						<div class='profession other addContent'>
							<div class='peoplel leftAddDiv'>
								<input type="hidden" id='professionpeo'> <span>姓名</span>
								<input class='namepeo' type='text' placeholder="">
								<p class='namepeop errorp'></p>
                             
                             <h2 class="setPosition">
								<span>所在城市</span>
								<div class='citypeo cityValue'>请选择</div>
								<img class='cityimg' alt=""
									src="/resources/images/supplier/more.png">
								<p class='citypeop errorp'></p>
								<div class='citycheck setCity selectCheck'></div>
							</h2>	

								<span>价格(元/天)</span> <input class='pricepeo' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='pricepeop errorp'></p>

							</div>
							<div class='peopler rightAddDiv'>
								<div class='tipsimage'>
									照片 <span>(1张照片封面)</span>
								</div>
								<div class='addimage filesimage' id='filePicker6'>
									<div class='updateimg'>
										<img alt="用户头像" class='fileimg' />
									</div>
								</div>
								<div class='addboxs'>
									<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>

								</div>
							</div>
						</div>

						<div class='remark'>
							<span>备注</span>
							<textarea class='remarkpeople' rows="4" cols="550"
								placeholder="请完善简历"></textarea>
						</div>
						<!--提交按钮  -->
						<div class='gatherbut'>
							<div class='sure'>确认</div>
							<div class='cancel'>取消</div>
						</div>
					</div>

					<!-- 添加摄影师 -->
					<div class='cameramanbox addPeopleBox'>
						<div class='cameramantitle addPeopleTitle'>
							<span>创建摄影师</span> <img alt="关闭"
								src="/resources/images/supplier/close.png">
						</div>
						<div class='cameraman addContent'>
							<div class='cameramanl leftAddDiv'>

								<span>摄影师姓名</span> <input class='nameca' type='text'
									placeholder="">
								<p class='namecap errorp'></p>

                            <h2 class="setPosition">
								<span>特殊技能</span> <!-- <span class='morepick'>(可多选)</span> -->
								<!-- <div class='specialSkill'>请选择</div> -->
								<input class='specialSkill' placeholder="请选择">
								<img class='specialSkillimg' alt=""
									src="/resources/images/supplier/more.png">
								<p class='specialSkillp errorp'></p>
								<div class='specialSkillcheck selectCheck'>
									<p key='1'>水下拍摄</p>
									<p key='2'>航拍</p>
								</div>
							</h2>	
                            
                            <h2 class="setPosition">
								<span>所在城市</span>
								<div class='cityca cityValue'>请选择</div>
								<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
								<p class='citycap errorp'></p>
								<div class='citycheck setCity selectCheck'></div>
							</h2>	

								<span>价格(元/天)</span> <input class='priceca' type='text' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='pricecap errorp'></p>

							</div>
							<div class='cameramanr rightAddDiv'>
								<div class='tipsimage'>
									摄影师照片 <span>(1张摄影师照片封面)</span>
								</div>
								<div class='addimage filesimage' id='filePicker7'>
									<div class='updateimg'>
										<img alt="用户头像" class='fileimg' />
									</div>
								</div>
								<div class='addboxs'>
									<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>
								</div>
							</div>
						</div>

						<div class='remark'>
							<span>备注</span>
							<textarea class='remarkca' rows="4" cols="550" placeholder="请完善摄影师简历以及作品等信息"></textarea>
						</div>
						<!--提交按钮  -->
						<div class='gatherbut'>
							<div class='sure'>确认</div>
							<div class='cancel'>取消</div>
						</div>
					</div>

					<!--添加场地  -->
					<div class='sitebox addPeopleBox'>
						<div class='sitetitle addPeopleTitle'>
							<span>添加场地</span> <img alt="关闭"
								src="/resources/images/supplier/close.png">
						</div>
						<div class='site addContent'>
							<div class='siteleft leftAddDiv'>

								<span>场地名称</span> <input class='namesite' type='text'
									placeholder="">
								<div class='hint'>如:北京高碑店**影视基地实景棚</div>
								<p class='namesitep errorp'></p>

								<span>面积(㎡)</span> <input class='msite' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='msitep errorp'></p>
								
                              <h1 class="setPosition">
								<span>场地类型</span>
								<div class='typesite'>请选择</div>
								<img class='typeimg' alt=""
									src="/resources/images/supplier/more.png">
								<p class='typesitep errorp'></p>
								<div class='typecheck selectCheck'>
									<p key='1'>内景</p>
									<p key='2'>外景</p>
								</div>
							  </h1>	

								<span>价格(元/天)</span> <input class='pricesite' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='pricesitep errorp'></p>

                              <h1 class="setPosition"> 
									<span>所在城市</span>
									<div class='citysite cityValue'>请选择</div>
									<img class='cityimg' alt="" src="/resources/images/supplier/more.png">
									<p class='citysitep errorp'></p>
									<div class='citycheck setCity selectCheck'></div>
	
									<span>详细地址</span> <input class='locationsite' type='text'
										placeholder="请输入地址">
									<p class='locationsitep errorp'></p>
							  </h1>	

							</div>
							<div class='siteright rightAddDiv lineImg'>
								<div class='tipsimage'>
									场地照片 <span>(4张实景图包含1张场地封面)</span>
								</div>

								<div class='addimage filesimage' id='filePicker4'>
									<!-- id='picker' -->
									<div class='updateimg'>
										<img alt="用户头像" class='fileimg'
											data-value="${employee.employeeImg}" src="" />
									</div>

								</div>
								<!-- <img class='addimgs' alt="点击添加图片" src="/resources/images/supplier/adds.png"/>
		               						<p class='clickimg'>点击添加图片</p>  -->

								<div class='addboxs'>
									<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>
									<div class='addtext filesimage' id='filePicker5'></div>

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
							<textarea class='siteremark' rows="4" cols="550"
								placeholder="请提供更多信息（如：棚高，配置等）"></textarea>
						</div>
						<!--提交按钮  -->
						<div class='gatherbut'>
							<div class='sure'>确认</div>
							<div class='cancel'>取消</div>
						</div>


					</div>


					<!--添加设备  -->
					<div class='equipbox'>
						<div class='equiptitle'>
							<span>添加设备</span> <img alt="关闭"
								src="/resources/images/supplier/close.png">
						</div>
						<div class='equip'>
							<div class='equipleft'>

								<span>设备类型</span>
								<div class='typeequip'>请选择</div>
								<img class='typeimg' alt=""
									src="/resources/images/supplier/more.png">
								<!-- <p class='typeequipp errorp'>*请选择设备类型</p> -->
								<div class='typecheck'></div>

								<span class='bastname'>设备名称</span> <input class='nameequip'
									placeholder="请选择" readonly="readonly"> <img
									class='nameimg' alt=""
									src="/resources/images/supplier/more.png">
								<!-- <p class='nameequipp errorp'>*请选择设备名称</p> -->
								<div class='namecheck'></div>


								<span class='typeequipp errorp'>*请选择设备类型</span> <span
									class='nameequipp errorp'>*请选择设备名称</span>

							</div>


							<div class='equipleft'>
								<span>库存总量(台)</span> <input class='numequip' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">


								<span class='days'>单价(元/天)</span> <input class='priceequip'
									type='text' onkeyup="value=value.replace(/[^\d]/g,'')"
									placeholder="请输入数字"> <span class='numequipp errorp'>*请输入库存总量</span>
								<span class='priceequipp errorp'>*请输入单价</span>
							</div>

							<div class='equipleft' style="width: 335px;">
								<span>所在城市</span>
								<div class='cityequip cityValue'>请选择</div>
								<img class='cityimg' alt=""
									src="/resources/images/supplier/more.png">
								<div class='citycheck setCity'></div>
								<span class='cityequipp errorp'>*请选择城市</span>
							</div>


						</div>
						<div class='remark'>
							<span>备注</span>
							<textarea class='equipremark' rows="4" cols="550"
								placeholder="请填写租赁设备详细信息（如：设备状态，租赁规则等）"></textarea>
						</div>
						<!--提交按钮  -->
						<div class='gatherbut'>
							<div class='sure'>确认</div>
							<div class='cancel'>取消</div>
						</div>

					</div>
					
					<!-- 添加服装 -->
					<div class='clothingbox addPeopleBox'>
						<div class='clothingtitle addPeopleTitle'>
							<span>添加服装</span> <img alt="关闭"
								src="/resources/images/supplier/close.png">
						</div>
						<div class='clothing addContent'>
							<div class='clothingl leftAddDiv'>
							
							<h2 class="setPosition">
								<span>服装类别</span>
								<div class='typeclo'>请选择类别</div>
								<img class='typecloimg' alt=""
									src="/resources/images/supplier/more.png">
								<p class='typeclop errorp'></p>
								<div class='typeclocheck selectCheck'></div>
							</h2>	

								<span>服装名称</span> <input class='nameclo' type='text'
									placeholder="">
								<p class='nameclop errorp'></p>
                            
                            <h2 class="setPosition">
								<span>授权方式</span>
								<div class='accreditclo'>请选择授权方式</div>
								<img class='accreditcloimg' alt=""
									src="/resources/images/supplier/more.png">
								<p class='accreditclop errorp'></p>
								<div class='accreditclocheck selectCheck'></div>
						    </h2>		

								<span>库存(套)</span> <input class='stockNumberclo' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='stockNumberclop errorp'></p>
								
								<span>价格(元/天)</span> <input class='priceclo' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='priceclop errorp'></p>
							
							<h2 class="setPosition">	
								<span>所在城市</span>
								<div class='cityclo cityValue'>请选择城市</div>
								<img class='cityimg' alt=""
									src="/resources/images/supplier/more.png">
								<p class='cityclop errorp'></p>
								<div class='citycheck setCity selectCheck'></div>
							</h2>	

							</div>
							<div class='clothingr rightAddDiv lineImg'>
								<div class='tipsimage'>
									服装照片 <span>(1张服装照片)</span>
								</div>
								<div class='addimage filesimage' id='filePicker8'>
									<div class='updateimg'>
										<img alt="用户头像" class='fileimg' />
									</div>
								</div>
								
								<div class='addboxs'>
									<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>

								</div>

							</div>
						</div>

						<div class='remark'>
							<span>备注</span>
							<textarea class='remarkclo' rows="4" cols="550"
								placeholder="请完善服装尺码、用途以及租赁或购买等相关事项"></textarea>
						</div>
						<!--提交按钮  -->
						<div class='gatherbut'>
							<div class='sure'>确认</div>
							<div class='cancel'>取消</div>
						</div>
					</div>
					
					<!-- 添加道具 -->
					<div class='propsbox addPeopleBox'>
						<div class='propstitle addPeopleTitle'>
							<span>添加道具</span> <img alt="关闭"
								src="/resources/images/supplier/close.png">
						</div>
						<div class='props addContent'>
							<div class='propsl leftAddDiv'>
							
							<h2 class="setPosition">
								<span>道具类别</span>
								<div class='typepro'>请选择类别</div>
								<img class='typeproimg' alt=""	src="/resources/images/supplier/more.png">
								<p class='typeprop errorp'></p>
								<div class='typeprocheck selectCheck'></div>
							</h2>	

								<span>道具名称</span> <input class='namepro' type='text'
									placeholder="">
								<p class='nameprop errorp'></p>

                             <h2 class="setPosition">
								<span>授权方式</span>
								<div class='accreditpro'>请选择授权方式</div>
								<img class='accreditproimg' alt=""
									src="/resources/images/supplier/more.png">
								<p class='accreditprop errorp'></p>
								<div class='accreditprocheck selectCheck'></div>
							</h2>	

								<span>数量</span> <input class='stockNumberpro' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='stockNumberprop errorp'></p>
								
								<span>价格(元/天)</span> <input class='pricepro' type='text'
									onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
								<p class='priceprop errorp'></p>
								
								
							<h2 class="setPosition">	
								<span>所在城市</span>
								<div class='citypro cityValue'>请选择城市</div>
								<img class='cityimg' alt=""
									src="/resources/images/supplier/more.png">
								<p class='cityprop errorp'></p>
								<div class='citycheck setCity selectCheck'></div>
						     </h2>		
                        
							</div>
							<div class='propsr rightAddDiv lineImg'>
								<div class='tipsimage'>
									道具照片 <span>(1张道具照片)</span>
								</div>
								<div class='addimage filesimage' id='filePicker9'>
									<div class='updateimg'>
										<img alt="用户头像" class='fileimg' />
									</div>
								</div>
								<div class='addboxs'>
									<span>可上传JPG、PNG或JPEG格式的 文件，文件大小不能超过1M。</span>
								</div>

							</div>
						</div>

						<div class='remark'>
							<span>备注</span>
							<textarea class='remarkpro' rows="4" cols="550"
								placeholder="请完善道具尺寸、用途以及租赁或购买等相关事项"></textarea>
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
		
		
	  <div class="cusModel" id="checkSureModel">
           <div class="successModel">
               <div class="closeBtn"></div>
			   <div class="oSContent">
			        <div class="tdDes" style="padding-top:80px;">确认删除吗?</div>
			        <div class="sureBtn" style="padding-top:40px;">
			           <div class="btn-c-r" id="tModel">确定</div>
			           <div class="btn-c-g" id="cModel">取消</div>
			        </div>
			   </div>
           </div>
      </div>


		<script src="${jqueryJs }"></script>
		<script src="${webuploaderJs}"></script>
		<script src="${ajaxfileuploadJs}"></script>
		<script src="${jsonJs }"></script>
		<script src="${commonJs }"></script>
		<script src="${createActorJs}"></script>
		<%-- <script src="${moreimgJs}"></script> --%>
		<script src="${createDirectorJs}"></script>
		<script src="${siteJs}"></script>
		<script src="${deviceJs}"></script>
		<script src="${peopleJs}"></script>
		<script src="${cameramanJs }"></script>
		<script src="${propsJs }"></script>
		<script src="${clothingJs }"></script>


		<script src="${jcropJs}"></script>
		<script src="${jcropColorJs}"></script>
		<script src="${jsonJs}"></script>

		<script src="${filmmakingJs}"></script>
</body>
</html>