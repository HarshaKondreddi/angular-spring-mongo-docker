# Use Maven to build the application
FROM maven:3.8-openjdk-8 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Use OpenJDK 8 Alpine as base image for running the application
FROM openjdk:8-jdk-alpine
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/springdocker-0.0.1-SNAPSHOT.jar app.jar

# We define that a volume named /tmp should exist
VOLUME /tmp

# We state that we want to open port 8080 on the container
EXPOSE 8080

# Debug: List files in the current directory
RUN ls -la

# The ENTRYPOINT command is the "what to run to 'start'" command
ENTRYPOINT ["java", "-Dspring.data.mongodb.uri=mongodb://database_mongo:27017/asmd_mongo_db", "-jar", "app.jar"]
#ENTRYPOINT ["java", "-Dspring.data.mongodb.uri=mongodb://asmd_mongo_container/asmd_mongoDB", "-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]