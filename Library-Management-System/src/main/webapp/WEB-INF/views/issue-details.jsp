<%@page import="com.jsp.library.entity.Issue"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Issue Details</title>
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', Arial, sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 48px 24px;
  }

  body::before, body::after {
    content: '';
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.25;
    z-index: 0;
    pointer-events: none;
  }

  body::before {
    width: 500px;
    height: 500px;
    background: #a78bfa;
    top: -120px;
    right: -100px;
  }

  body::after {
    width: 400px;
    height: 400px;
    background: #818cf8;
    bottom: -100px;
    left: -80px;
  }

  .page-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .page-title {
    text-align: center;
    margin-bottom: 36px;
  }

  .page-title h1 {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.5px;
  }

  .page-title p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 6px;
  }

  .card {
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 28px 32px;
    border-bottom: 1px solid #f0f1f6;
  }

  .card-header .icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .card-header h2 {
    font-size: 17px;
    font-weight: 600;
    color: #1a1a2e;
  }

  .card-header p {
    font-size: 13px;
    color: #8b8fa8;
    margin-top: 3px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead th {
    background: #fafafa;
    color: #9094aa;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 14px 24px;
    text-align: left;
    border-bottom: 1px solid #f0f1f6;
  }

  tbody td {
    padding: 18px 24px;
    font-size: 14px;
    color: #1a1a2e;
    border-bottom: 1px solid #f7f8fc;
    text-align: left;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr {
    transition: background 0.15s;
  }

  tbody tr:hover td {
    background: #fafbff;
  }

  .status-badge {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 14px;
    border-radius: 20px;
  }

  .status-issued {
    background: #fff8ec;
    color: #d97706;
  }

  .status-returned {
    background: #eefaf4;
    color: #22a06b;
  }

  .return-btn {
    text-decoration: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.3px;
    padding: 8px 18px;
    border-radius: 10px;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    display: inline-block;
    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);
  }

  .return-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);
  }

  .return-btn:active {
    transform: scale(0.97);
    box-shadow: none;
  }
</style>
</head>
<body>
  <%
  List<Issue> list = (List<Issue>) request.getAttribute("list");
  %>

  <div class="page-wrapper">

    <div class="page-title">
      <h1>Issue Details</h1>
      <p>Track all issued and returned books</p>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2>Issue Records</h2>
          <p>All book issue and return transactions</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Book</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <%
          for (Issue issue : list) {
          %>
          <tr>
            <td><%=issue.getStudent().getName()%></td>
            <td><%=issue.getBook().getName()%></td>
            <td><%=issue.getIssuedDate()%></td>
            <td><%=issue.getReturnedDate()%></td>
            <td>
              <span class="status-badge <%=issue.getStatus().equals("ISSUED") ? "status-issued" : "status-returned"%>">
                <%=issue.getStatus()%>
              </span>
            </td>
            <td>
              <%
              if (issue.getStatus().equals("ISSUED"))
              %>
              <a href="returnBook?id=<%=issue.getId()%>" class="return-btn">Return</a>
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