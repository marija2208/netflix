import { Component, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-player',
  imports: [NgIf, NgClass],
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.css'],
  standalone: true
})
export class MoviePlayerPageComponent implements AfterViewInit, OnInit {
  safeUrl: SafeResourceUrl | null = null;
  isControlsVisible = true;
  timeoutId: any = null;
  isPlaying = true;
  isMuted = false;
  currentTime = 0;
  duration = 63;
  private youtubePlayer: HTMLIFrameElement | null = null;
  private timeTrackerId: any = null;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      const videoId = params.get('id');
      if (videoId) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/h-2LIjOt0rA/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`
        );
      }
    });
    this.setControlsTimeout();
  }

  ngOnInit(): void {
    this.setupYoutubeMessageListener();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.youtubePlayer = document.querySelector('iframe') as HTMLIFrameElement;
      
      if (this.youtubePlayer && this.youtubePlayer.contentWindow) {
        this.youtubePlayer.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }), 
          '*'
        );
        
        setTimeout(() => {
          if (this.youtubePlayer && this.youtubePlayer.contentWindow) {
            this.youtubePlayer.contentWindow.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'unMute',
                args: []
              }), 
              '*'
            );
            
            this.youtubePlayer.contentWindow.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'getDuration',
                args: []
              }), 
              '*'
            );
            
            this.startTimeTracking();
          }
        }, 2000);
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.clearControlsTimeout();
    if (this.timeTrackerId) {
      clearInterval(this.timeTrackerId);
    }
  }

  startTimeTracking(): void {
    this.timeTrackerId = setInterval(() => {
      if (this.youtubePlayer && this.youtubePlayer.contentWindow && this.isPlaying) {
        this.youtubePlayer.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'getCurrentTime',
            args: []
          }), 
          '*'
        );
      }
    }, 1000);
  }

  setupYoutubeMessageListener(): void {
    window.addEventListener('message', (event) => {
      if (event.origin.startsWith('https://www.youtube.com')) {
        try {
          const data = JSON.parse(event.data);
          
          if (data.event === 'onStateChange') {
            if (data.info === 1) {
              this.isPlaying = true;
              this.setControlsTimeout();
            } else if (data.info === 2) {
              this.isPlaying = false;
              this.isControlsVisible = true;
              this.clearControlsTimeout();
            }
          }
          
          if (data.event === 'getDuration') {
            if (typeof data.info === 'number' && data.info > 0) {
              this.duration = data.info;
            }
          }
          
          if (data.event === 'getCurrentTime') {
            if (typeof data.info === 'number') {
              this.currentTime = data.info;
            }
          }
        } catch (e) {
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
  
  @HostListener('mousemove')
  @HostListener('click')
  handleMouseMove(): void {
    this.isControlsVisible = true;
    this.clearControlsTimeout();
    this.setControlsTimeout();
  }
  
  setControlsTimeout(): void {
    this.clearControlsTimeout();
    this.timeoutId = setTimeout(() => {
      if (this.isPlaying) {
        this.isControlsVisible = false;
      }
    }, 3000);
  }
  
  clearControlsTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  
  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    
    if (this.youtubePlayer && this.youtubePlayer.contentWindow) {
      const command = this.isPlaying ? 'playVideo' : 'pauseVideo';
      this.youtubePlayer.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: []
        }), 
        '*'
      );
    }
    
    if (!this.isPlaying) {
      this.isControlsVisible = true;
      this.clearControlsTimeout();
    } else {
      this.setControlsTimeout();
    }
  }
  
  toggleMute(): void {
    this.isMuted = !this.isMuted;
    
    if (this.youtubePlayer && this.youtubePlayer.contentWindow) {
      const command = this.isMuted ? 'mute' : 'unMute';
      this.youtubePlayer.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: []
        }), 
        '*'
      );
    }
  }
  
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  get progressPercentage(): number {
    return (this.currentTime / this.duration) * 100;
  }
  
  seekVideo(event: MouseEvent): void {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    
    this.currentTime = percentage * this.duration;
    
    if (this.youtubePlayer && this.youtubePlayer.contentWindow) {
      this.youtubePlayer.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [this.currentTime, true]
        }), 
        '*'
      );
    }
  }
  
  handleOverlayClick(event: MouseEvent): void {
    this.togglePlay();
    
    event.preventDefault();
    event.stopPropagation();
  }


  isFullscreen = false;

toggleFullscreen(): void {
  const container = document.querySelector('.netflix-player-container') as HTMLElement;
  //Check if the browser supports fullscreen
  if (!this.isFullscreen) {
    if (container.requestFullscreen) {
      container.requestFullscreen()
        .then(() => this.isFullscreen = true)
        .catch(err => console.error('Error attempting to enable fullscreen:', err));
    } else if ((container as any).mozRequestFullScreen) { 
      (container as any).mozRequestFullScreen();
      this.isFullscreen = true;
    } else if ((container as any).webkitRequestFullscreen) { 
      (container as any).webkitRequestFullscreen();
      this.isFullscreen = true;
    } else if ((container as any).msRequestFullscreen) { 
      (container as any).msRequestFullscreen();
      this.isFullscreen = true;
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
        .then(() => this.isFullscreen = false)
        .catch(err => console.error('Error attempting to exit fullscreen:', err));
    } else if ((document as any).mozCancelFullScreen) { 
      (document as any).mozCancelFullScreen();
      this.isFullscreen = false;
    } else if ((document as any).webkitExitFullscreen) { 
      (document as any).webkitExitFullscreen();
      this.isFullscreen = false;
    } else if ((document as any).msExitFullscreen) { 
      (document as any).msExitFullscreen();
      this.isFullscreen = false;
    }
  }
}
}