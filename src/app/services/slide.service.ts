import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private currentImageSource = new BehaviorSubject<string>('../../assets/netflix.jpg');
  
  currentImage$ = this.currentImageSource.asObservable();
  
  updateCurrentImage(imagePath: string): void {
    this.currentImageSource.next(imagePath);
  }
}