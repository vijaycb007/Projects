package com.bank.app;

import java.util.Scanner;
import com.bank.db.Account;
import com.bank.dao.BankDAO;

public class MainMenu {

	public static void main(String[] args) throws Exception {
		Scanner sc = new Scanner(System.in);
		BankDAO dao = new BankDAO();

		System.out.println("1. Create Account");
		System.out.println("2. Login");
		System.out.print("Choose: ");
		int choice = sc.nextInt();
		sc.nextLine();

		if (choice == 1) {
			Account a = new Account();
			System.out.print("Holder name: ");
			a.holderName = sc.nextLine();
			System.out.print("PIN (4 digits): ");
			a.pin = sc.nextInt();
			a.balance = 0.0;
			dao.createAccount(a);
			System.out.println("Account created. Your account number is: " + a.accountNumber);
		} else if (choice == 2) {
			System.out.print("Account number: ");
			String accNo = sc.next();
			System.out.print("PIN: ");
			int pin = sc.nextInt();

			Account a = dao.getAccount(accNo, pin);
			if (a != null) {
				System.out.println("Login success! Welcome, " + a.holderName);

				int option;
				do {
					System.out.println("\n1. View Balance");
					System.out.println("2. Deposit");
					System.out.println("3. Withdraw");
					System.out.println("4. View transactions");
					System.out.println("5. Delete Account");
					System.out.println("6. Exit");
					System.out.print("Choose: ");
					option = sc.nextInt();

					switch (option) {
					case 1:
						System.out.println("Current balance = " + a.balance);
						break;
					case 2:
						System.out.print("Amount to deposit: ");
						double dep = sc.nextDouble();
						a.balance = dao.deposit(a.accountNumber, dep);
						System.out.println("Deposited. New balance = " + a.balance);
						break;
					case 3:
						System.out.print("Amount to withdraw: ");
						double wd = sc.nextDouble();
						a.balance = dao.withdraw(a.accountNumber, wd);
						System.out.println("New balance = " + a.balance);
						break;
					case 4:
					    dao.printLastTransactions(a.accountNumber);
					    break;
					case 5:
						System.out.println(
								"WARNING: If you delete this account, ALL its transactions will also be deleted.");
						System.out.print("Are you sure? (y/n): ");
						char confirm = sc.next().toLowerCase().charAt(0);
						if (confirm == 'y') {
							System.out.print("Enter PIN again to confirm: ");
							int confirmPin = sc.nextInt();
							if (confirmPin == a.pin && dao.deleteAccountWithTransactions(a.accountNumber, confirmPin)) {
								System.out.println("Account and all transactions deleted.");
								option = 5; // exit
							} else {
								System.out.println("Incorrect PIN or delete failed.");
							}
						} else {
							System.out.println("Delete cancelled.");
						}
						break;
					case 6:
						System.out.println("Goodbye!");
						break;
					default:
						System.out.println("Invalid option");
					}
				} while (option != 6);
			} else {
				System.out.println("Invalid account number or PIN");
			}

		}

		sc.close();
	}
}
