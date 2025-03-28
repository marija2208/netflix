import { Component, OnInit } from '@angular/core';
import { UserService, Profile, User } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chooseprofile',
  templateUrl: './chooseprofile.component.html',
  styleUrls: ['./chooseprofile.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ChooseProfileComponent implements OnInit {
  currentUser: User | null = null;
  profiles: Profile[] = [];
  maxProfiles = 5; 
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.profiles = [...this.currentUser.profiles];
    
    const hasKidsProfile = this.profiles.some(profile => profile.isKidsAccount);
    
    if (!hasKidsProfile) {
      const defaultKidsProfile: Profile = {
        id: 10, 
        name: 'Children',
        ageRestriction: 'PG',
        isKidsAccount: true,
        avatar: 'kids-default.png'
      };
      
      this.profiles.push(defaultKidsProfile);
    }
  }

  selectProfile(profile: Profile): void {
    sessionStorage.setItem('currentProfile', JSON.stringify(profile));
    this.router.navigate(['/dashboard']);
  }

  canAddProfile(): boolean {
    const userCreatedProfiles = this.profiles.filter(p => !(p.id === 999 && p.name === 'Children' && p.isKidsAccount));
    return userCreatedProfiles.length < this.maxProfiles;
  }

  addProfile(): void {
    if (!this.canAddProfile()) {
      alert('Maximum number of profiles reached');
      return;
    }
    
    this.router.navigate(['/addProfile']);
  }

  manageProfiles(): void {
    this.router.navigate(['/manageProfiles']);
  }

  logout(): void {
    this.userService.logout();
    sessionStorage.removeItem('currentProfile');
    this.router.navigate(['/login']);
  }

  getAvatarUrl(avatarPath: string): string {
    if (avatarPath.startsWith('http')) {
      return avatarPath;
    }
    
    if (avatarPath === 'kids-default.png') {
      return '../../assets/children.png';
    }
    return `../../assets/avatars/${avatarPath}`;
  }
}