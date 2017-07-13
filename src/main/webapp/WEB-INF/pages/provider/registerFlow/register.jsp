<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>注册信息第一步</title>
	</head>
	<body>
		<h1>会员注册</h1>
		<sf:form commandName="team">
			<input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}" />
			<table style="background-color:#cccccc">
	            <tr>  
	                <td>名称（最大16字符）：</td>  
	                <td><sf:input type="text" path="teamName" size="25" maxlength="16" cssErrorClass="error"/></td>  
	            </tr>  
	            <tr>  
	                <td>密码（6到16字符）：</td>  
	                <td><sf:input type="password" path="password" size="25" maxlength="16" cssErrorClass="error"/></td>  
	            </tr>  
	            <tr>
	                <td>确认密码：</td>  
	                <td><input type="password" name="confirmedPasswd" size="25" maxlength="16"></td>  
	            </tr>  
	            <tr>  
	                <td align="center"><input type="submit" name="_eventId_backspace" value="上一步"></td>
	                <td align="center"><input type="submit" name="_eventId_doRegister" value="下一步" ></td>  
	            </tr>
			</table>
		</sf:form>
	</body>
	
	<script type="text/javascript">
		// 点击事件
		function check() {
			alert('Ok');
		}
	</script>
</html>