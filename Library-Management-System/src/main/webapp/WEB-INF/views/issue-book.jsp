<%@page import="com.jsp.library.entity.Student"%>
<%@page import="java.util.List"%>
<%@page import="com.jsp.library.entity.Book"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Issue Book</title>

<style>
@import
	url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap')
	;

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Inter', sans-serif;
	background: linear-gradient(135deg, #667eea, #764ba2);
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* 🔥 CARD */
.card {
	background: white;
	padding: 30px 35px;
	border-radius: 16px;
	width: 350px;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

/* 🔥 TITLE */
.card h2 {
	font-size: 18px;
	margin-bottom: 10px;
}

.book-name {
	font-size: 14px;
	color: #666;
	margin-bottom: 20px;
}

/* 🔥 LABEL */
label {
	font-size: 13px;
	display: block;
	margin-bottom: 6px;
	color: #444;
}

/* 🔥 SELECT */
select {
	width: 100%;
	padding: 10px;
	border-radius: 8px;
	border: 1px solid #ddd;
	font-size: 13px;
	outline: none;
	margin-bottom: 20px;
}

/* 🔥 BUTTON */
button {
	width: 100%;
	background: linear-gradient(135deg, #667eea, #764ba2);
	color: white;
	padding: 10px;
	border: none;
	border-radius: 8px;
	font-size: 13px;
	cursor: pointer;
}

button:hover {
	opacity: 0.9;
}
</style>
</head>

<body>

	<%
	Book book = (Book) request.getAttribute("book");
	List<Student> list = (List<Student>) request.getAttribute("list");
	%>

	<div class="card">

		<h2>Issue Book</h2>

		<div class="book-name">
			📚
			<%=book.getName()%>
		</div>

		<form action="issueBook" method="post">

			<input type="hidden" name="bookId" value="<%=book.getId()%>">

			<label>Select Student</label> <select name="studentId">
				<%
				for (Student student : list) {
				%>
				<option value="<%=student.getId()%>">
					<%=student.getName()%>
				</option>
				<%
				}
				%>
			</select>

			<button type="submit">Issue Book</button>

		</form>

	</div>

</body>
</html>