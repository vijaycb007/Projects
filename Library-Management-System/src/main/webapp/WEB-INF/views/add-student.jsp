<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Add Student</title>
<script
	src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<style>
@import
	url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap')
	;

*, *::before, *::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: 'Inter', Arial, sans-serif;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
	background: #ffffff;
	border-radius: 20px;
	padding: 48px 40px;
	width: 420px;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-header {
	text-align: center;
	margin-bottom: 36px;
}

.card-header .icon {
	width: 56px;
	height: 56px;
	background: linear-gradient(135deg, #667eea, #764ba2);
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 16px;
}

.card-header h1 {
	font-size: 22px;
	font-weight: 600;
	color: #1a1a2e;
	letter-spacing: -0.3px;
}

.card-header p {
	font-size: 14px;
	color: #8b8fa8;
	margin-top: 6px;
}

.field {
	margin-bottom: 20px;
}

.field label {
	display: block;
	font-size: 13px;
	font-weight: 500;
	color: #4a4a68;
	margin-bottom: 8px;
	letter-spacing: 0.2px;
}

.field input {
	width: 100%;
	height: 48px;
	padding: 0 16px;
	border: 1.5px solid #e2e4ed;
	border-radius: 12px;
	font-size: 15px;
	color: #1a1a2e;
	background: #f8f9fc;
	transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
	outline: none;
}

.field input:focus {
	border-color: #667eea;
	background: #ffffff;
	box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.12);
}

.field input::placeholder {
	color: #b0b3c6;
}

input[type="submit"] {
	width: 100%;
	height: 52px;
	margin-top: 12px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: #ffffff;
	border: none;
	border-radius: 12px;
	font-size: 15px;
	font-weight: 600;
	letter-spacing: 0.3px;
	cursor: pointer;
	transition: opacity 0.2s, transform 0.1s;
}

input[type="submit"]:hover {
	opacity: 0.92;
}

input[type="submit"]:active {
	transform: scale(0.98);
}
</style>
</head>
<body>
	<div class="card">
		<div class="card-header">
			<div class="icon">
				<script
					src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
				<dotlottie-player
					src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
					background="transparent" speed="1"
					style="width: 40px; height: 40px;" loop autoplay>
				</dotlottie-player>
			</div>
			<h1>Add New Student</h1>
			<p>Fill in the details below to register a student</p>
		</div>
		<form action="addStudent" method="post">
			<div class="field">
				<label for="name">Full Name</label> <input type="text" id="name"
					name="name" placeholder="Enter your name">
			</div>
			<div class="field">
				<label for="email">Email Address</label> <input type="email"
					id="email" name="email" placeholder="Enter your email">
			</div>
			<input type="submit" value="Add Student">
		</form>
	</div>
</body>
</html>