
package com.safecity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class SafeCityApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(SafeCityApplication.class, args);
    }
}
