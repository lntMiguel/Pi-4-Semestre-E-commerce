package br.com.pi.pi_ecommerce.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permite CORS para todos os endpoints
                .allowedOrigins("http://localhost:3000")  // Permite acesso apenas da origem localhost:3000 (seu front-end)
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Permite os métodos HTTP
                .allowedHeaders("*")  // Permite todos os cabeçalhos
                .allowCredentials(true);  // Permite credenciais como cookies ou headers de autorização
    }
}
