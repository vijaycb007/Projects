# 1. Base image with JDK
FROM eclipse-temurin:17-jdk-jammy

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy backend project files into container
COPY . /app

# 4. Compile all Java source files into /app/out
RUN mkdir -p out && javac -d out $(find ./src -name "*.java")

# 5. Start Java HTTP server
CMD ["java", "-cp", "out", "webConnection.InventoryHttpServer"]
