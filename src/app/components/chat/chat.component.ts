import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  selectedFile: File | null = null;
  selectedImage: string | null = null; // Nueva propiedad para la URL de la imagen seleccionada
  prediction: string | null = null;
  userMessage: string = '';
  messages: { user: boolean, text: string }[] = []; // Definición e inicialización de messages

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post<any>('http://localhost:5000/predict', formData).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);  // Asegúrate de que la respuesta se imprime aquí
        this.prediction = response.prediction;
        console.log('Prediction:', this.prediction);
        this.messages.push({ user: false, text: `Prediction: ${this.prediction}` });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  sendMessage() {
    if (this.userMessage.trim() === '') {
      return; // Evita enviar mensajes vacíos
    }

    this.messages.push({ user: true, text: this.userMessage }); // Agrega el mensaje del usuario
    this.userMessage = ''; // Limpia el campo de entrada de texto

    // Aquí puedes implementar la lógica para enviar el mensaje al servidor si es necesario
    console.log('Sending message:', this.messages[this.messages.length - 1]);
  }
}
