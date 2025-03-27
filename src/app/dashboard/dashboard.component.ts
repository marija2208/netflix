import { Component,  } from '@angular/core';
import { NgFor } from '@angular/common'; 
@Component({
  selector: 'app-dashboard',
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  popular = Array(6).fill(0);  
  trending = Array(6).fill(0);
  onlyOn = Array(6).fill(0);


}
