<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>欢迎</title>
	</head>
	<body>
		<h1>欢迎您选择简微</h1>  
   		 如果您喜欢我们的简微，请点击下一步，开始您的旅程<br><br>
   		 <sf:form>
   		 	<input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}" />
   		 	<input name="userId" value="${userId}" />
   		 	<input type="submit" name="_eventId_register" value="下一步" />
   		 	<input type="submit" name="_eventId_cancel" value="取消" />
   		 </sf:form>
	</body>
</html>