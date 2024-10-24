import { Component, EventEmitter, Output } from '@angular/core';
import { SpotifyService } from '../core/services/spotify.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  followedArtists: any[] = [];
  selectedMenuItem: string = 'profile';  // Por defecto, selecciona "profile"

  // Método para cambiar el ítem activo
  selectMenuItem(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }

  constructor(private spotifyService: SpotifyService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getFollowedArtists();
  }

  // Método para obtener los artistas seguidos
  getFollowedArtists() {
    const token = this.authService.getAccessToken();
    if (token) {
      this.spotifyService.getFollowedArtists(token)
        .subscribe((data: any) => {
          this.followedArtists = data.artists.items;  // Guardar los artistas obtenidos
          console.log('Followed artists:', this.followedArtists);  // Mostrar en consola
        });
    }
  }

  logout() {
    this.authService.logout();
  }
}
