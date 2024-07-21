import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  // Ajusta el endpoint si es necesario, en base a la documentación específica de OpenAI
  //private apiUrl = 'https://api.openai.com/v1/chat/completions';
  //private apiKey = '';

  constructor(private http: HttpClient) {}

  getCompletion(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo', // Modelo correcto para chat completions
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}