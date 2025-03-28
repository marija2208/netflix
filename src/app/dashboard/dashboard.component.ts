import { UserService } from './../services/user.service';
import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private userService:UserService,private router: Router) {}

  popular = Array(6).fill(0);  
  trending = Array(6).fill(0);
  onlyOn = Array(6).fill(0);

  selectedVideoId: string | null = null;

  playMovie(youtubeId: string): void {
    this.router.navigate(['/watch', youtubeId]); 
  }
  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }


}
