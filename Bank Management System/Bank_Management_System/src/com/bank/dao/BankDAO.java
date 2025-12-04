package com.bank.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.bank.db.Account;

public class BankDAO {
	// DAO means Data Access Object.

	private static final String URL = "jdbc:mysql://localhost:3306/bank_db";
	private static final String USER = "root";
	private static final String PASSWORD = "12345";

	// Trying to build connection with MySQL with username and password
	private Connection getConnection() throws SQLException {
		return DriverManager.getConnection(URL, USER, PASSWORD);
	}

	// Method which creates Account number Automatically
	// Data has been hidden
	private String generateAccountNumber() {
		long base = 1_000_000_000_000L; // 12 digits
		long num = (long) (Math.random() * 9_000_000_000_000L); // 0 to 8999...
		return String.valueOf(base + num); // 1000... to 9999...
	}

	// Create new account
	public void createAccount(Account acc) throws SQLException {
		String sql = "INSERT INTO accounts(account_number, holder_name, pin, balance) VALUES(?, ?, ?, ?)";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(sql)) {
			acc.accountNumber = generateAccountNumber();
			ps.setString(1, acc.accountNumber);
			ps.setString(2, acc.holderName);
			ps.setInt(3, acc.pin);
			ps.setDouble(4, acc.balance);
			ps.executeUpdate();
		}
	}

	// Get account for login
	public Account getAccount(String accNo, int pin) throws SQLException {
		String sql = "SELECT * FROM accounts WHERE account_number = ? AND pin = ?";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(sql)) {
			ps.setString(1, accNo);
			ps.setInt(2, pin);
			try (ResultSet rs = ps.executeQuery()) {
				if (rs.next()) {
					Account a = new Account();
					a.id = rs.getInt("id");
					a.accountNumber = rs.getString("account_number");
					a.holderName = rs.getString("holder_name");
					a.pin = rs.getInt("pin");
					a.balance = rs.getDouble("balance");
					return a;
				}
			}

		}
		return null; // not found or wrong pin
	}

	// Deposit into the account
	public double deposit(String accNo, double amount) throws SQLException {
		String updateSql = "UPDATE accounts SET balance = balance + ? WHERE account_number = ?";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(updateSql)) {
			ps.setDouble(1, amount);
			ps.setString(2, accNo);
			ps.executeUpdate();
		}
		double newBalance = getBalance(accNo);

		String insertSql = "INSERT INTO transactions(account_number, deposit, withdraw, balance) VALUES(?, ?, NULL, ?)";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(insertSql)) {
			ps.setString(1, accNo);
			ps.setDouble(2, amount);
			ps.setDouble(3, newBalance);
			ps.executeUpdate();
		}
		return newBalance;
	}

	// Withdraw from the account
	public double withdraw(String accNo, double amount) throws SQLException {
		double current = getBalance(accNo);
		if (amount > current) {
			System.out.println("Insufficient balance");
			return current;
		}

		String updateSql = "UPDATE accounts SET balance = balance - ? WHERE account_number = ?";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(updateSql)) {
			ps.setDouble(1, amount);
			ps.setString(2, accNo);
			ps.executeUpdate();
		}
		double newBalance = getBalance(accNo);

		String withdrawSql = "INSERT INTO transactions(account_number, deposit, withdraw, balance) VALUES(?, NULL, ?, ?)";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(withdrawSql)) {
			ps.setString(1, accNo);
			ps.setDouble(2, amount);
			ps.setDouble(3, newBalance);
			ps.executeUpdate();
		}
		return newBalance;
	}

	// To check the balance
	private double getBalance(String accNo) throws SQLException {
		String sql = "SELECT balance FROM accounts WHERE account_number = ?";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(sql)) {
			ps.setString(1, accNo);
			try (ResultSet rs = ps.executeQuery()) {
				if (rs.next()) {
					return rs.getDouble("balance");
				}
			}
		}
		return 0.0;
	}

	public boolean deleteAccountWithTransactions(String accNo, int pin) throws SQLException {
		try (Connection con = getConnection()) {
			// 1) Delete transactions first
			String deleteTx = "DELETE FROM transactions WHERE account_number = ?";
			try (PreparedStatement ps = con.prepareStatement(deleteTx)) {
				ps.setString(1, accNo);
				ps.executeUpdate();
			}

			// 2) Delete account
			String deleteAcc = "DELETE FROM accounts WHERE account_number = ? AND pin = ?";
			try (PreparedStatement ps = con.prepareStatement(deleteAcc)) {
				ps.setString(1, accNo);
				ps.setInt(2, pin);
				int rows = ps.executeUpdate();
				return rows > 0;
			}
		}
	}

	// To check the transaction
	public void printLastTransactions(String accNo) throws SQLException {
		String sql = "SELECT deposit, withdraw, balance, txn_time " + "FROM transactions " + "WHERE account_number = ? "
				+ "ORDER BY txn_time DESC LIMIT 10";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(sql)) {

			ps.setString(1, accNo);
			try (ResultSet rs = ps.executeQuery()) {
				System.out.println("Last transactions:");
				System.out.println("Date/Time              | Deposit   | Withdraw  | Balance");
				while (rs.next()) {
					double dep = rs.getDouble("deposit");
					double wd = rs.getDouble("withdraw");
					double bal = rs.getDouble("balance");
					String time = rs.getString("txn_time");
					System.out.printf("%-20s | %-9.2f | %-9.2f | %-9.2f%n", time, dep, wd, bal);
				}
			}
		}
	}

}
