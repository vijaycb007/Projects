package model;

import java.sql.Timestamp;

public class StockLog {
    private int id;
    private int productId;
    private String productName; // from join
    private String type;        // ADD or SALE
    private int quantityChanged;
    private Timestamp logDate;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getQuantityChanged() { return quantityChanged; }
    public void setQuantityChanged(int quantityChanged) { this.quantityChanged = quantityChanged; }

    public Timestamp getLogDate() { return logDate; }
    public void setLogDate(Timestamp logDate) { this.logDate = logDate; }

    @Override
    public String toString() {
        return String.format("| %3d | %3d | %-15s | %-4s | %5d | %s |",
                id, productId, productName, type, quantityChanged, logDate);
    }
}
