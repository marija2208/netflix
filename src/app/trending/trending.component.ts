import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  
  trending = [
    { 
      title: 'The endless night', 
      image: '../../assets/endlessnight.jpg',
      description: 'When a detective investigates a mysterious case, dark secrets of the town begin to unravel.',
      year: '2025',
      rating: '16+',
      category: 'Show',
      genres: ['Thrillers', 'Dramas']
    },
    { 
      title: 'Squid Game', 
      image: '../../assets/squidgames.jpeg',
      description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
      year: '2021',
      rating: '18+',
      category: 'Show',
      genres: ['Thrillers', 'Dramas']
    },
    { title: 'Young Sheldon', image: '../../assets/youngsheldon.jpg',
      description: 'Young Sheldon is a comedy series about a young Sheldon Cooper, who exhibits genius-level intellect and prodigious talent in science and mathematics.',
      year: '2017',
      rating: '7+',
      category: 'Show',
      genres: ['Comedy', 'Family']
     },
    { title: 'Prison Break', image: '../../assets/prisonbreak.jpeg',
      description:"Prison Break is a drama series that follows Michael Scofield, a structural engineer who devises an elaborate plan to break his brother Lincoln Burrows out of prison.",
      year: '2005',   
      rating: '16+',
      category: 'Show',
      genres: ['Thrillers', 'Dramas']
  
      
     },
    { title: 'Emily in Paris', image: '../../assets/emilyinparis.jpg',
      description:'Emily, an ambitious twenty-something marketing executive from Chicago, unexpectedly lands her dream job in Paris when her company acquires a French luxury marketing company — and she is tasked with revamping their social media strategy.',
      year: '2020', 
      rating: '13+',
      category: 'Show',
      genres: ['Comedy', 'Romance']

     },
    { title: 'Cobra Kai', image: '../../assets/cobrakai.jpg',
      description:'Cobra Kai takes place over 30 years after the events of the 1984 All Valley Karate Tournament with the continuation of the inescapable conflict between Daniel LaRusso and Johnny Lawrence.',
      year: '2018',
      rating: '16+',
      category: 'Show',
      genres: ['Action', 'Drama']

     },
    { title: 'Back in Action', image: '../../assets/backinaction.png', description: 'Fifteen years after vanishing from the CIA to start a family, elite spies Matt and Emily jump back into the world of espionage when their cover is blown.', year: '2025', rating: '16+', category: 'Show', genres: ['Action', 'Drama'] },

    { title: 'The Residence', image: '../../assets/theresidence.jpeg', description: 'A young couple moves into an apartment only to be surrounded by peculiar neighbors and occurrences. When the wife becomes mysteriously pregnant, paranoia over the safety of her unborn child begins to control her life.', year: '2025', rating: '16+', category: 'Show', genres: ['Horror', 'Thriller'] },
  ];
  
  private scrollAmount = 200;
  showDialog = false;
  selectedItem: any = null;
  
  nextSlide(): void {
    const container = this.carouselContainer.nativeElement;
    container.scrollLeft += this.scrollAmount;
  }
  
  prevSlide(): void {
    const container = this.carouselContainer.nativeElement;
    container.scrollLeft -= this.scrollAmount;
  }
  
  openDialog(item: any): void {
    this.selectedItem = item;
    this.showDialog = true;
  }
  
  closeDialog(): void {
    this.showDialog = false;
  }
}