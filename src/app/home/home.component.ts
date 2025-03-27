import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { TrendingComponent } from '../trending/trending.component';
import { SlideService } from '../../app/services/slide.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-root',
  imports: [
    CarouselComponent,
    TrendingComponent,
    CommonModule,
    FaqComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Netflix';
  currentBackgroundImage = '../../assets/netflix.jpg';
  private subscription: Subscription | null = null;

  constructor(private slideService: SlideService) {}

  ngOnInit() {
    this.subscription = this.slideService.currentImage$.subscribe(
      (imagePath) => {
        this.currentBackgroundImage = imagePath;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
