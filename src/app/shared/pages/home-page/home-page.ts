import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  backgroundImage = 'https://a-static.besthdwallpaper.com/flags-life-countries-world-map-wallpaper-2560x1440-81698_51.jpg';
}
