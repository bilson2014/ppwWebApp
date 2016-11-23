<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap-switch.min.css" var="bootstrapSwitchCss"/>
<spring:url value="/resources/css/provider/upload.css" var="providerUploadCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/lib/kindeditor/themes/default/default.css" var="defaultCss" />
<spring:url value="/resources/lib/kindeditor/plugins/code/prettify.css" var="prettifyCss" />
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js" var="blockUIJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap-switch.min.js" var="bootstrapSwitchJs"/>
<spring:url value="/resources/lib/jquery/ajaxfileupload.js" var="ajaxfileuploadJs"/>
<spring:url value="/resources/lib/kindeditor/kindeditor-all-min.js" var="kindeditorJs" />
<spring:url value="/resources/lib/kindeditor/plugins/code/prettify.js" var="prettifyJs" />
<spring:url value="/resources/lib/kindeditor/lang/zh_CN.js" var="kindeditorzhJs" />
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<spring:url value="/resources/js/provider/upload.js" var="providerUploadJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZHJs"/>

<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网 | 上传页面</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${bootstrapSwitchCss }">
	<link rel="stylesheet" href="${defaultCss }">
	<link rel="stylesheet" href="${prettifyCss }">
	<link rel="stylesheet" href="${providerUploadCss }">
	<link rel="stylesheet" href="${datepickerCss }">
	<link rel="stylesheet" href="${webuploaderCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<!-- 成功提示框 start -->
	<div class="tooltip-success-show" style="display: none;">
		<label class="tooltip-success-message">信息更新成功</label>
	</div>
	<!-- 成功提示框  end -->
	<input type="hidden" value="${cKey }" id="company-id"/>
	<input type="hidden" value="${productKey }" id="p-id"/>
	<input type="hidden" value="${action }" id="action"/>
	<input type="hidden" value="${sId }" id="s-id"/>
	<input type="hidden" value="${model.videoDescription }" id="page-description"/>
	<input type="hidden" value="${model.sessionId }" id="sessionId"/>
	<img id="tempImg" dynsrc="" src="" style="display:none" />
	<div class="content-wrap">
		<div class="form-wrap">
			<form class="form-horizontal" autocomplete="off" accept-charset="UTF-8">
				<fieldset >
					<!-- 错误提示框 start -->
					<div class="tooltip-show" style="display: none;">
						<label class="tooltip-message"></label>
					</div>
					<!-- 错误提示框  end -->
			
					<div class="form-group">
						<label for="video-name" class="col-sm-2 control-label">视频标题</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="video-name" maxlength="12" placeholder="视频标题为必填字段" value="${model.productName }">
						</div>
						<span style="color:red;">*</span>
					</div>
					<div class="form-group">
						<label for="video-type" class="col-sm-2 control-label">类型</label>
						<div class="col-sm-6">
							<input type="hidden" id="vType" value="${model.productType }"/>
							<select class="form-control" id="video-type">
								
							</select>
						</div>
						<span style="color:red;">*</span>
					</div>
					<div class="form-group">
						<label for="video-length" class="col-sm-2 control-label">视频长度</label>
						<div class="col-sm-3">
							<input type="number" class="form-control" id="video-length" placeholder="请填写数字" value="${model.videoLength }">
						</div>
						秒<span style="color:red;">*</span>
					</div>
					<div class="form-group">
						<label for="video-price" class="col-sm-2 control-label">价格</label>
						<div class="col-sm-3">
							<input type="number" class="form-control" id="video-price" placeholder="请填写数组" value="${model.servicePrice }">
						</div>
						元<span style="color:red;">*</span>
					</div>
					<div class="form-group">
						<label for="video-switch" class="col-sm-2 control-label">是否可见</label>
						<div class="col-sm-3">
							<input type="checkbox" id="video-switch" name="video-switch" value="${model.visible }">
						</div>
					</div>
					
					<div class="form-group">
						<label for="video-switch" class="col-sm-2 control-label">创作时间</label>
						<div class="col-sm-3">
							<input type="text" class="form-control" id="creationTime" placeholder="请选择作品创作时间" readonly="readonly" value="${model.creationTime }">
						</div>
						<span style="color:red;">*</span>
					</div>
					
					<div class="form-group">
						<label for="video-tag" class="col-sm-2 control-label">标签</label>
						<div class="col-sm-6">
							<div class="upload_filed_area">
								<div class="mod_keyword">
									<c:if test="${not empty model.tags }">
										<span class="keyword_placeholder" style="color: rgb(153, 153, 153); height: 12px; vertical-align: middle; font-size: 12px; display: none;">准确的标签将有利于您的视频被推荐和曝光哦~</span>
										<c:forEach items="${fn:split(model.tags,' ') }" var="tag">
											<span class="keyword_item">
												<b class="keyword_item_inner">${tag }</b>
												<a href="javascript:void(0);" class="btn_keyword_del">
													<span>x</span>
												</a>
											</span> 
										</c:forEach>
									</c:if>
									<c:if test="${empty model.tags }" >
										<span class="keyword_placeholder" style="color: rgb(153, 153, 153); height: 12px; vertical-align: middle; font-size: 12px; display: inline;">准确的标签将有利于您的视频被推荐和曝光哦~</span>
									</c:if>
									<span class="keyword_input">
										<input type="text" class="input_inner" id="text_tags"/>
									</span>
								</div>
							</div>
							<p style="color:#999;font-size: 12px;">敲击空格键添加标签</p>
							<div class="alert alert-danger" id="tagLabel" style="display: none;">每个标签最多8个汉字或16个字母！</div>
						</div>
						<span style="color:red;">*</span>
					</div>
					
					<div class="form-group">
						<label for="video-description" class="col-sm-2 control-label">视频简介</label>
						<div class="col-sm-6">
							<textarea class="form-control" id="video-description" rows="4" maxlength="150" placeholder="公司简介为必填字段">${model.pDescription }</textarea>
						</div>
						<span style="color:red;">*</span>
					</div>
					<div class="form-group">
						<label for="pageDescription" class="col-sm-2 control-label">作品页简介</label>
						<div class="col-sm-6">
							<textarea class="form-control" id="pageDescription" name="pageDescription" ></textarea>
							<p style="color:#999;font-size: 12px;">图片宽度900显示效果最佳，每张图片大小不得大于250KB</p>
						</div>
					</div>
					<div class="form-group">
						<label for="video-picHDUrl" class="col-sm-2 control-label">缩略图</label>
						<div class="col-sm-3">
							<div class="img-icon" id="video-picHD-div">
								<img src="" alt="拍片网" class="img-thumbnail" id="HDImg">
								<div style="margin:0px 40px;float:left" id="HDImgName"></div>
								<input type="hidden" value="${model.picHDUrl }" id="video-picHDUrl"/>
							</div>
							<div class="upload-btn">
								<div class="picker" id="uploadHDBt">上传缩略图</div>
								<a href="javascript:void(0);" data-href="default-thumbnail.jpg" class="exampleUrl" data-width="1000" data-height="600">查看示例</a>
								<p class="help-block">仅支持小于250K的png/jpg格式，推荐1110*600分辨率<span style="color:red;">*</span></p>
								<div class="alert alert-danger" id="imageLabel-HD" style="display: none;"></div>
							</div> 
							</div>
				
						
						<label for="video-picLDUrl" class="col-sm-2 control-label">封面</label>
						<div class="col-sm-3">
							<div class="img-icon" id="video-picLD-div">
								<img src="" alt="拍片网" class="img-thumbnail" id="LDImg">
								<div style="margin:0px 40px;float:left" id="LDImgName"></div>
								<input type="hidden" value="${model.picLDUrl }" id="video-picLDUrl"/>
							</div>
							<div class="upload-btn">
								<div class="picker" id="uploadLDBt">上传封面</div>
								<a href="javascript:void(0);" data-href="default-thumbnail.jpg" class="exampleUrl" data-width="1000" data-height="600">查看示例</a>
								<p class="help-block">仅支持小于250K的png/jpg格式，推荐1110*600分辨率<span style="color:red;">*</span></p>
								<div class="alert alert-danger" id="imageLabel-LD" style="display: none;"></div>
							</div> 
							
						</div>
					</div>
					<div class="form-group">
						<label for="video-picLDUrl" class="col-sm-2 control-label">视频</label>
						<div class="col-sm-6">
							<div class="upload-btn">
								<input type="hidden" value="${model.videoUrl }" id="videoUrl"/>
								<input type="hidden" value="0" id="video-change"/>
								<div class="picker" id='uploadVideoBt'>上传视频</div>
								<div style="display:inline;margin:10px" id="videoName"></div>
								<input type="file" id="videoFile" name="uploadFiles" style="display: none;">
								<p class="help-block">视频上传仅支持H264编码，MP4格式且不大于500M的视频文件<span style="color:red;">*</span></p>
								<div class="alert alert-danger" id="videoLabel" style="display: none;"></div>
							</div>
							
						</div>
					</div>
				
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-6 save">
							<button type="button" class="btn btn-default" id="infoBt">保存</button>
							&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default" id="backBt">返回</button>
						</div>
					</div>
				</fieldset>
			</form>
		</div>
		
		<!-- photo Modal start -->
		<div class="modal" id="mymodal" data-backdrop="static" data-keyboard=true>
			<div class="modal-dialog">
				<div class="modal-content model-distance" id="mymodal-content">
					<div class="modal-body" id="mymodal-body">
						<div class="progress progress-striped active">
							<div class="progress-bar progress-bar-success" role="progressbar" 
							aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0;"></div>
						</div>
						<div class="alert alert-warning" role="alert">完成上传之前请勿关闭页面</div>
					</div>
				</div>
			</div>
		</div>
		<!-- photo Modal end -->
		
		<!-- photo Modal start -->
		<div class="modal" id="photoModel" >
			<div class="modal-dialog" id="photoModel-dialog">
				<div class="modal-content model-distance" id="photoModel-content">
					<div class="modal-header model-no-border">
						<button type="button" class="close" data-dismiss="modal"><span class="closeBtn" aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					</div>
					<div class="modal-body">
						<img src="" alt="" id="previewImg" class="previewImg"/>
					</div>
				</div>
			</div>
		</div>
		<!-- photo Modal end -->
		
			<!-- photo Modal start -->
		<div class="modal" id="warmModel" >
			<div class="modal-dialog" id="photoModel-dialog">
				<div class="modal-content model-distance-warm" id="photoModel-content">
					<div class="modal-header model-no-border">
						<button type="button" class="close" data-dismiss="modal"><span class="closeBtn" aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					</div>
					<div class="modal-body">
					    <div>
                             <ul>
                                <li><span>拍片网郑重提醒您:</span></li>
                                <li class="top"> 为响应国家九部委联合开展深入整治互联网和手机媒体淫秽色情及低俗信息专项行动的号召，营造一个健康文明的网络环境，给大家一个和谐积极的家园。</li>
                                <li><label class="circle"></label>不得上传任何有违国家法律法规的视频。</li>
                                <li><label class="circle"></label>不得上传具有色情内容的视频。</li>
                                <li><label class="circle"></label>不得上传内容低俗，格调不高的视频。</li>
                                <li><label class="circle"></label>不得上传具有色情诱导性内容的视频。</li>
                                <li><label class="circle"></label>不得在标题、简介和标签中出现任何具有低俗色情含义的字眼。</li>
                                <li><label class="circle"></label>不含有涉及版权问题的影视片段。</li>
                                <li class="bot">如果您上传了这些内容，我们将一律予以删除，我们希望我们最珍贵的客户及供应商，理解并监督我们。</li>
                                <li><div class="checkInfo"><button type="button" class="btn btn-default" id="sureUpdate" style="margin-right:10px;">确认</button><button type="button" class="btn btn-default" id="cancleUpdate">取消</button></div></li>
                             </ul>
					    </div>
					</div>
				</div>
			</div>
		</div>
		<!-- photo Modal end -->
	</div>
<script src="${jqueryJs }"></script>
<script src="${jquerybase64Js }"></script>
<script src="${pluginJs }"></script>
<script src="${blockUIJs }"></script>
<script src="${jsonJs }"></script>
<script src="${bootstrapJs }"></script>
<script src="${bootstrapSwitchJs }"></script>
<script src="${webuploaderJs }" ></script>
<script src="${ajaxfileuploadJs }"></script>
<script src="${kindeditorJs }"></script>
<script src="${prettifyJs }"></script>
<script src="${kindeditorzhJs }"></script>
<script src="${commonJs }"></script>
<script src="${providerUploadJs }"></script>
<script src="${datepickerJs }" ></script>
<script src="${datepickerZHJs }" ></script>
</body>
</html>