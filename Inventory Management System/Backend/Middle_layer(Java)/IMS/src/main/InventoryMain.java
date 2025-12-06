package main;

import java.util.List;
import java.util.Scanner;
import model.product;
import services.InventoryDAO;

public class InventoryMain {

	private static InventoryDAO dao = new InventoryDAO();

	private static void sellProduct(Scanner sc) {
		System.out.print("Enter product id to sell: ");
		int id = sc.nextInt();
		System.out.print("Enter quantity to sell: ");
		int qty = sc.nextInt();
		sc.nextLine(); // consume newline

		// optional: show current stock
		int currentQty = dao.getCurrentQuantity(id);
		if (currentQty == -1) {
			System.out.println("Product not found.");
			return;
		}
		if (qty <= 0) {
			System.out.println("Quantity must be positive.");
			return;
		}

		boolean success = dao.sellProduct(id, qty);
		if (success) {
			System.out.println("Sale recorded. Remaining stock: " + dao.getCurrentQuantity(id));
		} else {
			System.out.println("Insufficient stock or invalid product.");
		}
	}

	private static void restockProduct(Scanner sc) {
		System.out.print("Enter product id to restock: ");
		int id = sc.nextInt();
		System.out.print("Enter quantity to add: ");
		int qty = sc.nextInt();
		sc.nextLine(); // consume newline

		if (qty <= 0) {
			System.out.println("Quantity must be positive.");
			return;
		}

		boolean success = dao.restockProduct(id, qty);
		if (success) {
			System.out.println("Restock successful. New stock: " + dao.getCurrentQuantity(id));
		} else {
			System.out.println("Restock failed. Check product id.");
		}
	}

	private static void showLowStock() {
		int threshold = 2;
		java.util.List<product> list = dao.getLowStockProducts(threshold);

		if (list.isEmpty()) {
			System.out.println("No low stock products (below " + threshold + ").");
			return;
		}

		System.out.println("\nLOW STOCK PRODUCTS (Qty < " + threshold + ")");
		System.out.println("ID  | Name                 | Category     |   Price  | Qty");
		System.out.println("-------------------------------------------------------------");
		for (product p : list) {
			System.out.println(p);
		}
	}

	private static void viewAllProducts() {
		List<product> list = dao.getAllProducts();

		if (list.isEmpty()) {
			System.out.println("No products found.");
			return;
		}

		System.out.println("\nID  | Name                 | Category     |   Price  | Qty");
		System.out.println("-------------------------------------------------------------");
		for (product p : list) {
			System.out.println(p);
		}
	}

	private static void searchProducts(Scanner sc) {
		System.out.print("Enter product id / name / category to search: ");
		String keyword = sc.nextLine();

		List<product> list = dao.searchProducts(keyword);

		if (list.isEmpty()) {
			System.out.println("No matching products found.");
			return;
		}

		System.out.println("\nID  | Name                 | Category     |   Price  | Qty");
		System.out.println("-------------------------------------------------------------");
		for (product p : list) {
			System.out.println(p);
		}
	}

	private static void addProduct(Scanner sc) {
		System.out.print("Enter product name: ");
		String name = sc.nextLine();

		System.out.print("Enter category: ");
		String category = sc.nextLine();

		System.out.print("Enter price: ");
		double price = sc.nextDouble();

		System.out.print("Enter quantity: ");
		int quantity = sc.nextInt();
		sc.nextLine(); // consume newline

		product p = new product();
		p.setName(name);
		p.setCategory(category);
		p.setPrice(price);
		p.setQuantity(quantity);

		int rows = dao.addProduct(p);
		if (rows == 1) {
			System.out.println("Product added successfully.");
		} else {
			System.out.println("Failed to add product.");
		}
	}

	private static void deleteProduct(Scanner sc) {
		System.out.print("Enter product id to delete: ");
		int id = sc.nextInt();
		sc.nextLine(); // consume newline

		product p = dao.getProductById(id);
		if (p == null) {
			System.out.println("Product not found.");
			return;
		}

		System.out.println("\nProduct details:");
		System.out.println("ID   : " + p.getId());
		System.out.println("Name : " + p.getName());
		System.out.println("Price: " + p.getPrice());
		System.out.println("Qty  : " + p.getQuantity());
		System.out.print("Are you sure you want to delete this product and all its history? (yes/no): ");
		String ans = sc.nextLine().trim().toLowerCase();

		if (ans.equals("yes") || ans.equals("y")) {
			boolean ok = dao.deleteProduct(id);
			if (ok) {
				System.out.println("Product and its stock history deleted.");
			} else {
				System.out.println("Delete failed.");
			}
		} else {
			System.out.println("Delete cancelled.");
		}
	}
	
	private static void viewStockHistory() {
	    java.util.List<model.StockLog> list = dao.getStockHistory();

	    if (list.isEmpty()) {
	        System.out.println("No stock movements found.");
	        return;
	    }

	    System.out.println("\nSTOCK MOVEMENT HISTORY");
	    System.out.println("ID  | PID | Product         | Type |  Qty | Date-Time");
	    System.out.println("--------------------------------------------------------------");
	    for (model.StockLog log : list) {
	        System.out.println(log);
	    }
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int choice;

		do {
			System.out.println("1. Add Product");
			System.out.println("2. View all Products");
			System.out.println("3. Search Products");
			System.out.println("4. Sell Product");
			System.out.println("5. Restock Product");
			System.out.println("6. Low Stock Report (<2)");
			System.out.println("7. Delete Product");	
			System.out.println("8. View Stock History");
			System.out.println("0. Exit");
			System.out.println("Enter operation number:");
			choice = sc.nextInt();
			sc.nextLine(); // consume newline

			switch (choice) {
			case 1:
				addProduct(sc);
				break;
			case 2:
				viewAllProducts();
				break;
			case 3:
				searchProducts(sc);
				break;
			case 4:
				sellProduct(sc);
				break;
			case 5:
				restockProduct(sc);
				break;
			case 6:
				showLowStock();
				break;
			case 7:
				deleteProduct(sc);
				break;
			case 8:
			    viewStockHistory();
			    break;
			case 0:
				System.out.println("Exiting...");
				break;
			default:
				System.out.println("Invalid choice!");
			}
		} while (choice != 0);

		sc.close();
	}
}
