# 1. Base image with JDK
FROM eclipse-temurin:17-jdk-jammy

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy backend project files (including the JDBC jar) into container
COPY . /app

# 4. Compile all Java source files into /app/out, using the PostgreSQL driver on classpath
RUN mkdir -p out \
 && javac -cp "postgresql-42.7.8.jar" -d out $(find ./src -name "*.java")

# 5. Start Java HTTP server with both compiled classes and JDBC driver on classpath
CMD ["java", "-cp", "out:postgresql-42.7.8.jar", "webConnection.InventoryHttpServer"]
