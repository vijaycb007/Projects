# 1. Base image with JDK
FROM openjdk:17-slim

# 2. Set working directory
WORKDIR /app

# 3. Copy project files into container
COPY . /app

# 4. Compile all Java files into /app/out
RUN mkdir -p out && javac -d out $(find ./src -name "*.java")

# 5. Run the server
CMD ["java", "-cp", "out", "webConnection.InventoryHttpServer"]
