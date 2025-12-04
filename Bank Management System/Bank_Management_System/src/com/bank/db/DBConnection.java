package com.bank.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

	public static void main(String[] args) {
		String url = "jdbc:mysql://localhost:3306/bank_db";
		// Enter username
		String user = "root";
		// Enter password
		String password = "12345";
		/*
		 * Trying to build connection with MySQL with username and password
		 */
		try (Connection con = DriverManager.getConnection(url, user, password)) {
			System.out.println("Connection successful!");
			// If the connection is failed please check it with any AI
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
