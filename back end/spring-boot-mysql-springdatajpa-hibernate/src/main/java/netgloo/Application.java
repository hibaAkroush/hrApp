package netgloo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;



@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
@SpringBootApplication
@ComponentScan(basePackages = { "netgloo.controllers" })
@EnableAutoConfiguration
@EntityScan(basePackages = { "domain" })
//@EnableJpaRepositories(basePackages = "netgloo.models", repositoryBaseClass = BaseRepositoryImpl.class)
@EnableCaching

public class Application extends SpringBootServletInitializer {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
  @Bean
  public WebMvcConfigurer corsConfigurer() {
      return new WebMvcConfigurerAdapter() {
          @Override
          public void addCorsMappings(CorsRegistry registry) {
              registry.addMapping("/**").allowedOrigins("http://localhost:9000");
          }
      };
  }
}
