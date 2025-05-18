# Use an official Maven image with JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy everything needed for the build
COPY . .

# Build the app (skip tests for faster builds)
RUN mvn clean package -DskipTests

# Use a lightweight OpenJDK 21 runtime image
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the built jar
COPY --from=build /app/target/ecommerce_multivendor-0.0.1-SNAPSHOT.jar .

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "/app/ecommerce_multivendor-0.0.1-SNAPSHOT.jar"]
