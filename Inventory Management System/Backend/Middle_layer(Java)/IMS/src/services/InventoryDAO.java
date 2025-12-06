package services;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import db.DatabaseConnection;
import model.*;

public class InventoryDAO {

	public int addProduct(product product) {
		String sql = "INSERT INTO products (name, category, price, quantity) VALUES (?, ?, ?, ?)";
		try (Connection con = DatabaseConnection.getConnection(); PreparedStatement ps = con.prepareStatement(sql)) {

			ps.setString(1, product.getName());
			ps.setString(2, product.getCategory());
			ps.setDouble(3, product.getPrice());
			ps.setInt(4, product.getQuantity());

			return ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
		}
	}

	public List<product> getAllProducts() {
		List<product> list = new ArrayList<>();
		String sql = "SELECT id, name, category, price, quantity, created_date FROM products ORDER BY id";

		try (Connection con = DatabaseConnection.getConnection();
				PreparedStatement ps = con.prepareStatement(sql);
				ResultSet rs = ps.executeQuery()) {

			while (rs.next()) {
				product p = new product();
				p.setId(rs.getInt("id"));
				p.setName(rs.getString("name"));
				p.setCategory(rs.getString("category"));
				p.setPrice(rs.getDouble("price"));
				p.setQuantity(rs.getInt("quantity"));
				p.setCreatedDate(rs.getTimestamp("created_date"));
				list.add(p);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public List<product> searchProducts(String keyword) {
	    List<product> list = new ArrayList<>();
	    boolean isNumber = keyword.chars().allMatch(Character::isDigit);

	    String sql;
	    if (isNumber) {
	        // search by exact id OR name containing keyword
	        sql = "SELECT id, name, category, price, quantity, created_date "
	            + "FROM products "
	            + "WHERE id = ? "
	            + "ORDER BY id";
	    } else {
	        // search only by name (no category)
	        sql = "SELECT id, name, category, price, quantity, created_date "
	            + "FROM products "
	            + "WHERE name ILIKE ? "
	            + "ORDER BY id";
	    }

	    try (Connection con = DatabaseConnection.getConnection();
	         PreparedStatement ps = con.prepareStatement(sql)) {

	        if (isNumber) {
	            int id = Integer.parseInt(keyword);
	            ps.setInt(1, id);
	            ps.setString(2, "%" + keyword + "%");
	        } else {
	            ps.setString(1, "%" + keyword + "%");
	        }

	        try (ResultSet rs = ps.executeQuery()) {
	            while (rs.next()) {
	                product p = new product();
	                p.setId(rs.getInt("id"));
	                p.setName(rs.getString("name"));
	                p.setCategory(rs.getString("category"));
	                p.setPrice(rs.getDouble("price"));
	                p.setQuantity(rs.getInt("quantity"));
	                p.setCreatedDate(rs.getTimestamp("created_date"));
	                list.add(p);
	            }
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return list;
	}

	public int getCurrentQuantity(int productId) {
		String sql = "SELECT quantity FROM products WHERE id = ?";
		try (Connection con = DatabaseConnection.getConnection(); PreparedStatement ps = con.prepareStatement(sql)) {

			ps.setInt(1, productId);
			try (ResultSet rs = ps.executeQuery()) {
				if (rs.next()) {
					return rs.getInt("quantity");
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1; // not found or error
	}

	public boolean sellProduct(int productId, int sellQty) {
	    if (sellQty <= 0) return false;

	    String updateSql =
	            "UPDATE products SET quantity = quantity - ? WHERE id = ? AND quantity >= ?";
	    String selectQtySql =
	            "SELECT quantity FROM products WHERE id = ?";
	    String deleteLogsSql =
	            "DELETE FROM stock_log WHERE product_id = ?";
	    String deleteProductSql =
	            "DELETE FROM products WHERE id = ?";
	    String logSql =
	            "INSERT INTO stock_log (product_id, type, quantity_changed) VALUES (?, 'SALE', ?)";

	    Connection con = null;
	    try {
	        con = DatabaseConnection.getConnection();
	        con.setAutoCommit(false); // start transaction

	        // 1) update stock only if enough quantity
	        try (PreparedStatement psUpdate = con.prepareStatement(updateSql)) {
	            psUpdate.setInt(1, sellQty);
	            psUpdate.setInt(2, productId);
	            psUpdate.setInt(3, sellQty);

	            int rows = psUpdate.executeUpdate();
	            if (rows == 0) {
	                con.rollback();
	                return false; // not enough stock or invalid id
	            }
	        }

	        // 2) insert SALE log
	        try (PreparedStatement psLog = con.prepareStatement(logSql)) {
	            psLog.setInt(1, productId);
	            psLog.setInt(2, sellQty);
	            psLog.executeUpdate();
	        }

	        // 3) check remaining quantity
	        int remainingQty = -1;
	        try (PreparedStatement psSel = con.prepareStatement(selectQtySql)) {
	            psSel.setInt(1, productId);
	            try (ResultSet rs = psSel.executeQuery()) {
	                if (rs.next()) {
	                    remainingQty = rs.getInt("quantity");
	                }
	            }
	        }

	        // 4) if sold out, delete product + its logs
	        if (remainingQty == 0) {
	            // delete logs
	            try (PreparedStatement psLogs = con.prepareStatement(deleteLogsSql)) {
	                psLogs.setInt(1, productId);
	                psLogs.executeUpdate();
	            }
	            // delete product
	            try (PreparedStatement psProd = con.prepareStatement(deleteProductSql)) {
	                psProd.setInt(1, productId);
	                psProd.executeUpdate();
	            }
	        }

	        con.commit();
	        return true;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        if (con != null) {
	            try {
	                con.rollback();
	            } catch (SQLException ex) {
	                ex.printStackTrace();
	            }
	        }
	        return false;
	    } finally {
	        if (con != null) {
	            try {
	                con.setAutoCommit(true);
	                con.close();
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	}

	public boolean restockProduct(int productId, int addQty) {
		String updateSql = "UPDATE products SET quantity = quantity + ? WHERE id = ?";
		String logSql = "INSERT INTO stock_log (product_id, type, quantity_changed) VALUES (?, 'ADD', ?)";

		if (addQty <= 0) {
			return false;
		}

		Connection con = null;
		try {
			con = DatabaseConnection.getConnection();
			con.setAutoCommit(false); // transaction [web:62][web:70]

			// 1) update stock
			try (PreparedStatement psUpdate = con.prepareStatement(updateSql)) {
				psUpdate.setInt(1, addQty);
				psUpdate.setInt(2, productId);
				int rows = psUpdate.executeUpdate();
				if (rows == 0) {
					con.rollback();
					return false; // invalid id
				}
			}

			// 2) insert log row
			try (PreparedStatement psLog = con.prepareStatement(logSql)) {
				psLog.setInt(1, productId);
				psLog.setInt(2, addQty);
				psLog.executeUpdate();
			}

			con.commit();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			if (con != null) {
				try {
					con.rollback();
				} catch (SQLException ex) {
					ex.printStackTrace();
				}
			}
			return false;
		} finally {
			if (con != null) {
				try {
					con.setAutoCommit(true);
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public java.util.List<model.product> getLowStockProducts(int threshold) {
		java.util.List<model.product> list = new java.util.ArrayList<>();
		String sql = "SELECT id, name, category, price, quantity, created_date "
				+ "FROM products WHERE quantity < ? ORDER BY quantity ASC";

		try (Connection con = db.DatabaseConnection.getConnection();
				java.sql.PreparedStatement ps = con.prepareStatement(sql)) {

			ps.setInt(1, threshold);

			try (java.sql.ResultSet rs = ps.executeQuery()) {
				while (rs.next()) {
					model.product p = new model.product();
					p.setId(rs.getInt("id"));
					p.setName(rs.getString("name"));
					p.setCategory(rs.getString("category"));
					p.setPrice(rs.getDouble("price"));
					p.setQuantity(rs.getInt("quantity"));
					p.setCreatedDate(rs.getTimestamp("created_date"));
					list.add(p);
				}
			}
		} catch (java.sql.SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public product getProductById(int id) {
		String sql = "SELECT id, name, category, price, quantity, created_date " + "FROM products WHERE id = ?";
		try (Connection con = DatabaseConnection.getConnection(); PreparedStatement ps = con.prepareStatement(sql)) {

			ps.setInt(1, id);
			try (ResultSet rs = ps.executeQuery()) {
				if (rs.next()) {
					product p = new product();
					p.setId(rs.getInt("id"));
					p.setName(rs.getString("name"));
					p.setCategory(rs.getString("category"));
					p.setPrice(rs.getDouble("price"));
					p.setQuantity(rs.getInt("quantity"));
					p.setCreatedDate(rs.getTimestamp("created_date"));
					return p;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean deleteProduct(int productId) {
		String deleteLogsSql = "DELETE FROM stock_log WHERE product_id = ?";
		String deleteProductSql = "DELETE FROM products WHERE id = ?";

		Connection con = null;
		try {
			con = DatabaseConnection.getConnection();
			con.setAutoCommit(false);

			try (PreparedStatement psLogs = con.prepareStatement(deleteLogsSql)) {
				psLogs.setInt(1, productId);
				psLogs.executeUpdate(); // may delete 0 or more rows
			}

			int productRows;
			try (PreparedStatement psProduct = con.prepareStatement(deleteProductSql)) {
				psProduct.setInt(1, productId);
				productRows = psProduct.executeUpdate();
			}

			if (productRows == 0) {
				con.rollback();
				return false; // no such product
			}

			con.commit();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			if (con != null) {
				try {
					con.rollback();
				} catch (SQLException ex) {
					ex.printStackTrace();
				}
			}
			return false;
		} finally {
			if (con != null) {
				try {
					con.setAutoCommit(true);
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public java.util.List<model.StockLog> getStockHistory() {
		java.util.List<model.StockLog> list = new java.util.ArrayList<>();

		String sql = "SELECT sl.id, sl.product_id, p.name AS product_name, "
				+ "       sl.type, sl.quantity_changed, sl.log_date " + "FROM stock_log sl "
				+ "JOIN products p ON sl.product_id = p.id " + "ORDER BY sl.log_date DESC, sl.id DESC";

		try (java.sql.Connection con = db.DatabaseConnection.getConnection();
				java.sql.PreparedStatement ps = con.prepareStatement(sql);
				java.sql.ResultSet rs = ps.executeQuery()) {

			while (rs.next()) {
				model.StockLog log = new model.StockLog();
				log.setId(rs.getInt("id"));
				log.setProductId(rs.getInt("product_id"));
				log.setProductName(rs.getString("product_name"));
				log.setType(rs.getString("type"));
				log.setQuantityChanged(rs.getInt("quantity_changed"));
				log.setLogDate(rs.getTimestamp("log_date"));
				list.add(log);
			}
		} catch (java.sql.SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

}
