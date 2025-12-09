// package api;
package webConnection;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import model.StockLog;
import model.product;
import services.InventoryDAO;

public class InventoryHttpServer {

	public static void main(String[] args) throws Exception {
	    InventoryDAO dao = new InventoryDAO();

	    int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

	    // GET /api/products
	    server.createContext("/api/products", exchange -> {
	        addCorsHeaders(exchange);
	        if ("GET".equals(exchange.getRequestMethod())) {
	            handleGetProducts(exchange, dao);
	        } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	            exchange.sendResponseHeaders(204, -1);
	        } else {
	            exchange.sendResponseHeaders(405, -1);
	        }
	        exchange.close();
	    });

	    // POST /api/products/add
	    server.createContext("/api/products/add", exchange -> {
	        addCorsHeaders(exchange);
	        if ("POST".equals(exchange.getRequestMethod())) {
	            handleAddProduct(exchange, dao);
	        } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	            exchange.sendResponseHeaders(204, -1);
	        } else {
	            exchange.sendResponseHeaders(405, -1);
	        }
	        exchange.close();
	    });

	    // DELETE /api/products/delete
	    server.createContext("/api/products/delete", exchange -> {
	        addCorsHeaders(exchange);
	        if ("DELETE".equals(exchange.getRequestMethod())) {
	            handleDeleteProduct(exchange, dao);
	        } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	            exchange.sendResponseHeaders(204, -1);
	        } else {
	            exchange.sendResponseHeaders(405, -1);
	        }
	        exchange.close();
	    });
	    
	    server.createContext("/api/stock-history", exchange -> {
	        addCorsHeaders(exchange);
	        if ("GET".equals(exchange.getRequestMethod())) {
	            handleStockHistory(exchange, dao);
	        } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	            exchange.sendResponseHeaders(204, -1);
	        } else {
	            exchange.sendResponseHeaders(405, -1);
	        }
	        exchange.close();
	    });
	    
	 // POST /api/products/sell
	    server.createContext("/api/products/sell", exchange -> {
	        addCorsHeaders(exchange);
	        if ("POST".equals(exchange.getRequestMethod())) {
	            handleSellProduct(exchange, dao);
	        } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	            exchange.sendResponseHeaders(204, -1);
	        } else {
	            exchange.sendResponseHeaders(405, -1);
	        }
	        exchange.close();
	    });
	    
	 // POST /api/products/restock
	    server.createContext("/api/products/restock", exchange -> {
	        addCorsHeaders(exchange);
	        if ("POST".equals(exchange.getRequestMethod())) {
	            handleRestockProduct(exchange, dao);
	        } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	            exchange.sendResponseHeaders(204, -1);
	        } else {
	            exchange.sendResponseHeaders(405, -1);
	        }
	        exchange.close();
	    });
	    
	 // GET /api/products/search?keyword=...
	    server.createContext("/api/products/search", exchange -> {
	        addCorsHeaders(exchange);
	        if ("GET".equals(exchange.getRequestMethod())) {
	            handleSearchProducts(exchange, dao);
	        } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	            exchange.sendResponseHeaders(204, -1);
	        } else {
	            exchange.sendResponseHeaders(405, -1);
	        }
	        exchange.close();
	    });


	    server.setExecutor(null);
	    server.start();
	    System.out.println("Server started on http://localhost:8080");
	}


    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
    }

    private static void handleGetProducts(HttpExchange exchange, InventoryDAO dao) throws IOException {
        try {
            List<product> products = dao.getAllProducts();
            // Simple manual JSON (you can replace with any JSON library)
            StringBuilder json = new StringBuilder("[");
            for (int i = 0; i < products.size(); i++) {
                product p = products.get(i);
                json.append("{")
                    .append("\"id\":").append(p.getId()).append(",")
                    .append("\"name\":\"").append(escape(p.getName())).append("\",")
                    .append("\"category\":\"").append(escape(p.getCategory())).append("\",")
                    .append("\"price\":").append(p.getPrice()).append(",")
                    .append("\"quantity\":").append(p.getQuantity()).append(",")
                    .append("\"createdDate\":\"").append(p.getCreatedDate()).append("\"")
                    .append("}");
                if (i < products.size() - 1) json.append(",");
            }
            json.append("]");

            byte[] response = json.toString().getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(500, -1);
        }
    }

    private static void handleAddProduct(HttpExchange exchange, InventoryDAO dao) throws IOException {
        try (InputStream is = exchange.getRequestBody()) {
            String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            // body will be JSON like: {"name":"...", "category":"...", "price":123, "quantity":10}
            // parse it very simply (or use a JSON library if allowed)
            String name = getJsonValue(body, "name");
            String category = getJsonValue(body, "category");
            double price = Double.parseDouble(getJsonValue(body, "price"));
            int quantity = Integer.parseInt(getJsonValue(body, "quantity"));

            product p = new product();
            p.setName(name);
            p.setCategory(category);
            p.setPrice(price);
            p.setQuantity(quantity);
            dao.addProduct(p); // this will insert into DB

            String response = "{\"status\":\"ok\"}";
            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(201, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        } catch (Exception e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(400, -1);
        }
    }
    
    private static void handleDeleteProduct(HttpExchange exchange, InventoryDAO dao) throws IOException {
        try {
            String query = exchange.getRequestURI().getQuery(); // e.g. "id=2"
            if (query == null || !query.startsWith("id=")) {
                exchange.sendResponseHeaders(400, -1);
                return;
            }

            int id = Integer.parseInt(query.substring("id=".length()));

            boolean ok = dao.deleteProduct(id);

            String response = ok ? "{\"status\":\"deleted\"}" : "{\"status\":\"not_found\"}";
            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(ok ? 200 : 404, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        } catch (Exception e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(500, -1);
        }
    }
    
    private static void handleSearchProducts(HttpExchange exchange, InventoryDAO dao) throws IOException {
        try {
            // parse query ?keyword=...
            String query = exchange.getRequestURI().getQuery();
            String keyword = "";
            if (query != null) {
                for (String part : query.split("&")) {
                    String[] kv = part.split("=", 2);
                    if (kv.length == 2 && kv[0].equals("keyword")) {
                        keyword = URLDecoder.decode(kv[1], StandardCharsets.UTF_8);
                        break;
                    }
                }
            }

            System.out.println("handleSearchProducts keyword = " + keyword);

            java.util.List<model.product> list;
            if (keyword == null || keyword.trim().isEmpty()) {
                list = dao.getAllProducts();
            } else {
                list = dao.searchProducts(keyword.trim());
            }

            String json = toJson(list); // same helper you use for /api/products
            byte[] resp = json.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
            exchange.sendResponseHeaders(200, resp.length);
            exchange.getResponseBody().write(resp);
        } catch (Exception e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(500, -1);
        } finally {
            exchange.getResponseBody().close();
        }
    }

    
    private static void handleStockHistory(HttpExchange exchange, InventoryDAO dao) throws IOException {
        try {
            List<StockLog> list = dao.getStockHistory();

            StringBuilder json = new StringBuilder("[");
            for (int i = 0; i < list.size(); i++) {
                StockLog log = list.get(i);
                json.append("{")
                    .append("\"id\":").append(log.getId()).append(",")
                    .append("\"productId\":").append(log.getProductId()).append(",")
                    .append("\"productName\":\"").append(escape(log.getProductName())).append("\",")
                    .append("\"type\":\"").append(escape(log.getType())).append("\",")
                    .append("\"quantityChanged\":").append(log.getQuantityChanged()).append(",")
                    .append("\"logDate\":\"").append(log.getLogDate()).append("\"")
                    .append("}");
                if (i < list.size() - 1) json.append(",");
            }
            json.append("]");

            byte[] response = json.toString().getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(500, -1);
        }
    }
    
 // Very simple JSON int parser for flat JSON objects like {"id":1,"quantity":2}
    private static int parseJsonInt(String json, String key) {
        // find: "key":
        String pattern = "\"" + key + "\"";
        int idx = json.indexOf(pattern);
        if (idx == -1) return -1;

        // move to after the colon
        idx = json.indexOf(":", idx);
        if (idx == -1) return -1;
        idx++; // move past ':'

        // skip spaces
        while (idx < json.length() && Character.isWhitespace(json.charAt(idx))) {
            idx++;
        }

        // read digits (and optional minus sign)
        StringBuilder sb = new StringBuilder();
        while (idx < json.length()) {
            char c = json.charAt(idx);
            if ((c >= '0' && c <= '9') || c == '-') {
                sb.append(c);
                idx++;
            } else {
                break;
            }
        }

        try {
            return Integer.parseInt(sb.toString());
        } catch (NumberFormatException e) {
            return -1;
        }
    }


    private static void handleSellProduct(HttpExchange exchange, InventoryDAO dao) throws IOException {
        try {
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            int id = parseJsonInt(body, "id");
            int qty = parseJsonInt(body, "quantity");

            if (id <= 0 || qty <= 0) {
                byte[] resp = "{\"error\":\"Invalid id or quantity\"}".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(400, resp.length);
                exchange.getResponseBody().write(resp);
                return;
            }

            boolean ok = dao.sellProduct(id, qty);
            if (ok) {
                byte[] resp = "{\"status\":\"ok\"}".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, resp.length);
                exchange.getResponseBody().write(resp);
            } else {
                byte[] resp = "{\"error\":\"Product not found or insufficient stock\"}".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(400, resp.length);
                exchange.getResponseBody().write(resp);
            }
        } catch (Exception e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(500, -1);
        } finally {
            exchange.getResponseBody().close();
        }
    }

    private static void handleRestockProduct(HttpExchange exchange, InventoryDAO dao) throws IOException {
        try {
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            int id = parseJsonInt(body, "id");
            int qty = parseJsonInt(body, "quantity");

            if (id <= 0 || qty <= 0) {
                byte[] resp = "{\"error\":\"Invalid id or quantity\"}".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(400, resp.length);
                exchange.getResponseBody().write(resp);
                return;
            }

            boolean ok = dao.restockProduct(id, qty);
            if (ok) {
                byte[] resp = "{\"status\":\"ok\"}".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, resp.length);
                exchange.getResponseBody().write(resp);
            } else {
                byte[] resp = "{\"error\":\"Product not found\"}".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(400, resp.length);
                exchange.getResponseBody().write(resp);
            }
        } catch (Exception e) {
            e.printStackTrace();
            exchange.sendResponseHeaders(500, -1);
        } finally {
            exchange.getResponseBody().close();
        }
    }
    
    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("\"", "\\\"");
    }
    
    private static String toJson(java.util.List<model.product> products) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");

        for (int i = 0; i < products.size(); i++) {
            model.product p = products.get(i);
            if (i > 0) sb.append(",");

            sb.append("{");
            sb.append("\"id\":").append(p.getId()).append(",");
            sb.append("\"name\":\"").append(escapeJson(p.getName())).append("\",");
            sb.append("\"category\":\"").append(escapeJson(p.getCategory())).append("\",");
            sb.append("\"price\":").append(p.getPrice()).append(",");
            sb.append("\"quantity\":").append(p.getQuantity()).append(",");
            sb.append("\"createdDate\":\"").append(p.getCreatedDate()).append("\"");
            sb.append("}");
        }

        sb.append("]");
        return sb.toString();
    }

    private static String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private static String getJsonValue(String json, String key) {
        // very naive parser: good enough for your own controlled JSON
        String pattern = "\"" + key + "\":";
        int idx = json.indexOf(pattern);
        if (idx == -1) return "";
        idx += pattern.length();
        // skip possible quotes/space
        while (idx < json.length() && (json.charAt(idx) == ' ')) idx++;
        boolean quoted = json.charAt(idx) == '"';
        if (quoted) idx++;
        StringBuilder sb = new StringBuilder();
        while (idx < json.length()) {
            char c = json.charAt(idx);
            if (quoted && c == '"') break;
            if (!quoted && (c == ',' || c == '}')) break;
            sb.append(c);
            idx++;
        }
        return sb.toString().trim();
    }
}

