# 1. Base image with JDK
FROM openjdk:17-slim

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy backend project files into container
COPY . /app

# 4. Compile all Java source files into /app/out
RUN mkdir -p out && javac -d out $(find ./src -name "*.java")

# 5. Start Java HTTP server (PORT comes from Render env var)
CMD ["java", "-cp", "out", "webConnection.InventoryHttpServer"]
