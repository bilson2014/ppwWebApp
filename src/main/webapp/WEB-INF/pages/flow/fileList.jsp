<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>文件列表</title>
	</head>
	<body>
		<h1>看看吧兄弟_${teamId }</h1>  <br/>
		<a href="${flowExecutionUrl}&_eventId=uploadFile&productId=0">文件上传</a> <br/>
		
		<table >
			<tr>
				<td>作品名称</td>
				<td>操作</td>
			</tr>
			<c:forEach var="product" items="${products}">
                <tr>
					<td>${product.productName} </td>
					<td><a href="${flowExecutionUrl}&_eventId=editFile&productId=${product.id}">修改</a></td>
				</tr>
                </c:forEach>
		</table>
		
   		 <sf:form>
   		 	<input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}" />
   		 	<input type="submit" name="_eventId_checkUploadFile" value="下一步" />
   		 	<input type="submit" name="_eventId_cancel" value="取消" />
   		 </sf:form>
	</body>
</html>