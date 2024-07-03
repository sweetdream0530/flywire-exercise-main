package com.flywire.exercise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.flywire.exercise", "com.flywire.exercise.config"})
public class FlywireSpringBootApp extends SpringBootServletInitializer
{

  public static void main(String[] args) throws Exception
  {
    SpringApplication.run(FlywireSpringBootApp.class, args);
  }
}
