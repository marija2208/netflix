import { Component,  } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-trending',
  imports: [NgFor],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
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

}
