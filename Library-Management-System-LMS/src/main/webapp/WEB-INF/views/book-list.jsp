<%@page import="com.jsp.library.entity.Book"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Library Dashboard</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Inter', sans-serif;
	background: linear-gradient(135deg, #667eea, #764ba2);
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 40px 20px;
}

/* 🔥 MAIN CONTAINER */
.container {
	width: 100%;
	max-width: 750px;
}

/* 🔥 TITLE */
.header {
	text-align: center;
	color: white;
	margin-bottom: 25px;
}

.header h1 {
	font-size: 22px;
}

.header p {
	font-size: 13px;
	opacity: 0.8;
	margin-top: 4px;
}

/* 🔥 NAV */
.nav {
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-bottom: 20px;
}

.nav a {
	text-decoration: none;
	color: white;
	background: rgba(255,255,255,0.15);
	padding: 10px 16px;
	border-radius: 10px;
	font-size: 13px;
}

/* 🔥 CARD */
.card {
	background: white;
	border-radius: 16px;
	box-shadow: 0 8px 30px rgba(0,0,0,0.2);
	overflow: hidden;
}

/* 🔥 CARD HEADER */
.card-header {
	padding: 16px 18px;
	border-bottom: 1px solid #eee;
}

.card-header h2 {
	font-size: 15px;
}

.card-header p {
	font-size: 12px;
	color: #777;
	margin-top: 3px;
}

/* 🔥 TABLE */
table {
	width: 100%;
	border-collapse: collapse;
}

thead {
	background: #f4f5f7;
}

th {
	font-size: 11px;
	text-align: left;
	padding: 12px 18px;
	color: #666;
}

td {
	padding: 14px 18px;
	font-size: 13px;
	border-top: 1px solid #f1f1f1;
}

/* 🔥 ALIGNMENT */
td:nth-child(3),
th:nth-child(3) {
	text-align: center;
}

td:nth-child(4),
th:nth-child(4) {
	text-align: center;
}

/* 🔥 BADGE */
.badge {
	background: #eef0fc;
	color: #667eea;
	padding: 4px 10px;
	border-radius: 20px;
	font-size: 12px;
	font-weight: 600;
}

/* 🔥 BUTTON */
.btn {
	background: linear-gradient(135deg,#667eea,#764ba2);
	color: white;
	padding: 6px 14px;
	border-radius: 8px;
	font-size: 12px;
	text-decoration: none;
	display: inline-block;
}
</style>
</head>

<body>

<%
List<Book> list = (List<Book>) request.getAttribute("list");
%>

<div class="container">

	<!-- HEADER -->
	<div class="header">
		<h1>📚 Library Dashboard</h1>
		<p>Manage books efficiently</p>
	</div>

	<!-- NAV -->
	<div class="nav">
		<a href="addBookPage">📖 Add Book</a>
		<a href="addStudentPage">🧑🏻‍🎓 Add Student</a>
		<a href="issueDetails">📲 View Issues</a>
	</div>

	<!-- CARD -->
	<div class="card">

		<div class="card-header">
			<h2>Book Inventory</h2>
			<p>All books available in the system</p>
		</div>

		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Author</th>
					<th>Copies</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				<%
				for (Book book : list) {
				%>
				<tr>
					<td><%=book.getName()%></td>
					<td><%=book.getAuthor()%></td>
					<td>
						<span class="badge"><%=book.getAvailableCopies()%></span>
					</td>
					<td>
						<a href="issuePage?id=<%=book.getId()%>" class="btn">Issue</a>
					</td>
				</tr>
				<%
				}
				%>
			</tbody>
		</table>

	</div>

</div>

</body>
</html>