import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit{
  constructor(private _router: Router){ }
  currentRoute: string = ''

  ngOnInit(): void {
    this._router.events.subscribe(route => {
      if(route instanceof NavigationEnd){
        this.currentRoute = route.urlAfterRedirects
      }
    })
  }
}
