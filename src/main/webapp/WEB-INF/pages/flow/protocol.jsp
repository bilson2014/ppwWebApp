<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>协议</title>
	</head>
	<body>
		<h1>不同意你就死定了</h1>  
   		必须同意，不然别来找我<br><br>
   		 <sf:form>
   		 	<input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}" />
   		 	<input type="submit" name="_eventId_agree" value="同意" />
   		 	<input type="submit" name="_eventId_cancel" value="取消" />
   		 </sf:form>
	</body>
</html>