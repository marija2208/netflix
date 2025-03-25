import { Component } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";

@Component({
  selector: 'app-root',
  imports: [CarouselComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Netflix';
}
