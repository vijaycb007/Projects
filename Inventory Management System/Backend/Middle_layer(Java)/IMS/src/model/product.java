package model;

import java.sql.Timestamp;

public class product {
    private int id;
    private String name;
    private String category;
    private double price;
    private int quantity;
    private Timestamp createdDate;
    
    // Default constructor
    public product() {}
    
    // Constructor with all fields
    public product(int id, String name, String category, double price, int quantity, Timestamp createdDate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.createdDate = createdDate;
    }
    
    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    
    public Timestamp getCreatedDate() { return createdDate; }
    public void setCreatedDate(Timestamp createdDate) { this.createdDate = createdDate; }
    
    @Override
    public String toString() {
        return String.format("| %3d | %-20s | %-12s | %8.2f | %5d |", 
                           id, name, category, price, quantity);
    }
}
