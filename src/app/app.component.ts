import { Component } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { TrendingComponent } from './trending/trending.component';
@Component({
  selector: 'app-root',
  imports: [CarouselComponent, TrendingComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Netflix';
}
