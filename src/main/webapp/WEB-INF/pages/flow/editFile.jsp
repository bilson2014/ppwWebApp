<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>作品修改</title>
	</head>
	<body>
		<h1>修改作品啊兄弟</h1>  
		${productId}
   		 <sf:form>
   		 	<input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}" />
   		 	<input type="submit" name="_eventId_save" value="保存" />
   		 	<input type="submit" name="_eventId_cancel" value="取消" />
   		 </sf:form>
	</body>
</html>