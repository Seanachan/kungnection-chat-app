package com.Kungnection.backend;

import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class Judge0Service {
  private final WebClient webClient;
  
  public Judge0Service() {
    String apiKey = System.getenv("X_RAPIDAPI_KEY");
    if (apiKey == null || apiKey.isEmpty()) {
      throw new IllegalStateException("X_RAPIDAPI_KEY environment variable is not set");
    }
    
    this.webClient = WebClient.builder()
        .baseUrl("https://judge0-ce.p.rapidapi.com")
        .defaultHeader("X-RapidAPI-Key", apiKey)
        .defaultHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com")
        .build();
  }

  public String submitCode(String code, int languageId) {
    Map<String, Object> payload = Map.of(
        "source_code", code,
        "language_id", languageId);

    return webClient.post()
        .uri("/submissions?base64_encoded=false&wait=true")
        .bodyValue(payload)
        .retrieve()
        .bodyToMono(String.class)
        .block();
  }
}