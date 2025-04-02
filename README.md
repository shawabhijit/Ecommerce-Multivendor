# Ecommerce-Multivendor
A full-featured e-commerce platform built using Spring Boot (backend) and React (frontend), offering a seamless shopping experience with advanced functionalities.

# application.properties
add this code to your application.properties file in main/resources

```properties

spring.application.name=ecommerce_multivendor



spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce-multivendor
spring.datasource.username=postgres
spring.datasource.password=abhijit@07

# JPA & Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
#spring.jpa.generate-ddl=true
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.globally_quoted_identifiers=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# File Upload Configuration
#spring.servlet.multipart.enabled=true
#spring.servlet.multipart.max-file-size=1000MB
#spring.servlet.multipart.max-request-size=1000MB
# MVC Configuration
#spring.mvc.throw-exception-if-no-handler-found=true
#spring.mvc.async.request-timeout=3600000
# Server Configuration
server.port=8081
server.error.path=/user/error
#server.error.whitelabel.enabled=false
server.servlet.context-path=/
# mail service configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_gmail
spring.mail.password=your_gmail_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```
