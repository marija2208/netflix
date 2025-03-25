

import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [NgFor],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
    
  trending = [
    { title: 'The endless night', image: '../../assets/endlessnight.jpg' },
    { title: 'Squid Game', image: '../../assets/squidgames.jpeg' },
    { title: 'Young Sheldon', image: '../../assets/youngsheldon.jpg' },
    { title: 'Prison Break', image: '../../assets/prisonbreak.jpeg' },
    { title: 'Emily in Paris', image: '../../assets/emilyinparis.jpg' },
    { title: 'Cobra Kai', image: '../../assets/cobrakai.jpg' },
    { title: 'Back in Action', image: '../../assets/backinaction.jpeg' },
    { title: 'The Residence', image: '../../assets/theresidence.jpeg' }
  ];
  
  private scrollAmount = 200;
    
  nextSlide(): void {
    const container = this.carouselContainer.nativeElement;
    container.scrollLeft += this.scrollAmount;
  }
      
  prevSlide(): void {
    const container = this.carouselContainer.nativeElement;
    container.scrollLeft -= this.scrollAmount;
  }
}