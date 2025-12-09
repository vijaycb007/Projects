package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    // Local defaults for Eclipse / your PC
    private static final String LOCAL_URL  = "jdbc:postgresql://localhost:5432/Inventory_db";
    private static final String LOCAL_USER = "postgres";
    private static final String LOCAL_PASS = "12345";

    public static Connection getConnection() throws SQLException {
        String url  = System.getenv("DB_URL");
        String user = System.getenv("DB_USER");
        String pass = System.getenv("DB_PASS");

        if (url == null || user == null || pass == null) {
            url  = LOCAL_URL;
            user = LOCAL_USER;
            pass = LOCAL_PASS;
        }

        return DriverManager.getConnection(url, user, pass);
    }
}
