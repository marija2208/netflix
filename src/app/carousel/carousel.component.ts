import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService } from '../services/slide.service';

interface SlideMetadata {
  logo?: string;
  year: string;
  rating: string;
  category: string;
  duration?: string; 
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  metadata: SlideMetadata;
  ctaText: string;
  buttonText: string;
  titleClass: string;
  descriptionClass: string;
  overlayClass: string;
  buttonClass: string;
  inputClass: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CarouselComponent implements OnInit {
  slides: Slide[] = [
    {
      id: 1,
      title: 'Unlimited movies, TV shows, and more',
      subtitle: 'Starts at EUR 4.99. Cancel anytime.',
      description:
        'An abandoned pup falls in with a ragtag crew of foul-mouthed dogs hellbent on getting him home to deliver payback to his deadbeat owner.',
      image: '../../assets/netflix.jpg',
      metadata: {
        logo: '',
        year: '',
        rating: '',
        category: '',
        duration: '',
      },
      ctaText:
        'Ready to watch? Enter your email to create or restart your membership.',
      buttonText: 'Get Started',
      titleClass: 'movie-title-style',
      descriptionClass: '',
      overlayClass: 'bg-gradient-to-r from-black/80 to-transparent',
      buttonClass: 'bg-red-600 hover:bg-red-700',
      inputClass: '',
    },
    {
      id: 2,
      title: 'Watch anywhere, anytime',
      subtitle: 'Stream on your phone, tablet, laptop, and TV.',
      description:
        'An abandoned pup falls in with a ragtag crew of foul-mouthed dogs hellbent on getting him home to deliver payback to his deadbeat owner.',
      image: '../../assets/strays.jpg',
      metadata: {
        logo: '../../assets/strays.webp',
        year: '2025',
        rating: 'ALL',
        category: 'Features',
        duration: '1h 33m', 
      },
      ctaText:
        'Ready to watch? Enter your email to create or restart your membership.',
      buttonText: 'Get Started',
      titleClass: 'tech-title-style',
      descriptionClass: 'font-light',
      overlayClass: 'bg-gradient-to-r from-black/80 to-transparent',
      buttonClass: 'bg-red-600 hover:bg-red-700',
      inputClass: '',
    },
    {
      id: 3,
      title: 'Back in action',
      subtitle: 'Save your favorites and always have something to watch.',
      description:
        'Fifteen years after vanishing from the CIA to start a family, elite spies Matt and Emily jump back into the world of espionage when their cover is blown.',
      image: '../../assets/banner1.jpeg',
      metadata: {
        logo: '../../assets/BackInAction.webp',
        year: '2023',
        rating: 'ALL',
        category: 'Features',
        duration: 'Varies', 
      },
      ctaText: 'Never be without your favorite shows, even offline.',
      buttonText: 'Watch now',
      titleClass: 'download-title-style',
      descriptionClass: 'text-blue-100',
      overlayClass: 'bg-gradient-to-b from-black/70 to-transparent',
      buttonClass: 'bg-red-500 hover:red-700',
      inputClass: '',
    },
    {
      id: 4,
      title: 'Create profiles for kids',
      subtitle: 'Let kids have adventures with their favorite characters.',
      description:
        'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.',
      image: '../../assets/kids.jpg',
      metadata: {
        year: '',
        rating: '',
        category: '',
        duration: '', 
      },
      ctaText: 'Create safe, age-appropriate experiences for your children.',
      buttonText: 'Join Now',
      titleClass: 'kids-title-style',
      descriptionClass: 'text-yellow-100',
      overlayClass: 'bg-gradient-to-r from-purple-900/20 to-transparent',
      buttonClass: 'bg-purple-600 hover:bg-purple-700',
      inputClass: '',
    },
  ];

  currentSlideIndex = 0;
  isPlaying = true;
  slideInterval: any;
  slideDuration = 5000; 
  progressValue = 0;

  constructor(private slideService: SlideService) {}

  ngOnInit(): void {
    this.startAutoRotation();
    // Initialize with the first slide's image
    this.slideService.updateCurrentImage(this.slides[0].image);
  }

  get currentSlide(): Slide {
    return this.slides[this.currentSlideIndex];
  }

  prevSlide(): void {
    this.resetProgress();
    this.currentSlideIndex =
      this.currentSlideIndex === 0
        ? this.slides.length - 1
        : this.currentSlideIndex - 1;
    // Update the image in the service
    this.slideService.updateCurrentImage(this.currentSlide.image);
  }

  nextSlide(): void {
    this.resetProgress();
    this.currentSlideIndex =
      this.currentSlideIndex === this.slides.length - 1
        ? 0
        : this.currentSlideIndex + 1;
    // Update the image in the service
    this.slideService.updateCurrentImage(this.currentSlide.image);
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.resetProgress();
      this.currentSlideIndex = index;
      // Update the image in the service
      this.slideService.updateCurrentImage(this.currentSlide.image);
    }
  }

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAutoRotation();
    } else {
      this.stopAutoRotation();
    }
  }

  startAutoRotation(): void {
    this.isPlaying = true;
    this.resetProgress();
  
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  
    let startTime = performance.now(); 
  
    const animate = () => {
      if (!this.isPlaying) return; 
  
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      this.progressValue = (elapsed / this.slideDuration) * 100;
  
      if (this.progressValue < 100) {
        requestAnimationFrame(animate);
      }
    };
  
    requestAnimationFrame(animate);
  
    this.slideInterval = setInterval(() => {
      this.nextSlide();
      this.resetProgress();
      startTime = performance.now(); 
      if (this.isPlaying) requestAnimationFrame(animate); 
    }, this.slideDuration);
  }

  stopAutoRotation(): void {
    this.isPlaying = false;
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  resetProgress(): void {
    this.progressValue = 0;
  }

}
