import { Injectable } from '@angular/core';

export interface Profile {
  id: number;
  name: string;
  ageRestriction: string;
  isKidsAccount: boolean;
  avatar: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  subscriptionType: string | null;
  profiles: Profile[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      isSubscribed: true,
      subscriptionType: 'Premium',
      profiles: [
        { id: 101, name: 'John', ageRestriction: '18+', isKidsAccount: false, avatar: '../../assets/icon_red.webp' },
        { id: 102, name: 'Emma', ageRestriction: 'PG', isKidsAccount: true, avatar: '../../assets/kids1.png' }
      ]
    },
    {
      id: 2,
      name: 'Sarah Connor',
      email: 'sarahconnor@example.com',
      password: 'terminator',
      isSubscribed: false,
      subscriptionType: null,
      profiles: [
        { id: 201, name: 'Sarah', ageRestriction: '18+', isKidsAccount: false, avatar: '../../assets/green.png' }
      ]
    }
  ];

  constructor() {}

  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    return user ? {...user} : null;
  }
  
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  }
}