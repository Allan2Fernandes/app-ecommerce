import { Component, inject, OnInit } from '@angular/core';
import { Button } from "../button/button";
import { Router } from '@angular/router';
import { ICONS } from '../../../constants/icons';
import { TokenService } from '../../../services/token-service';
import { AuthorizationService } from '../../../services/authorization-service';
import { TranslatePipe } from "../../../pipes/translate-pipe";
import { Helper } from '../../../services/helper';

@Component({
  selector: 'app-nav-bar',
  imports: [Button, TranslatePipe],
  templateUrl: './nav-bar.html',
})
export class NavBar implements OnInit{
  icons = ICONS
  ngOnInit(): void {
    
    if(Helper.isNullOrUndefined(this.tokenService.getToken())) {
      this.logout();
    }
  }
  router = inject(Router);
  
  tokenService = inject(TokenService);
  authorizationService = inject(AuthorizationService);

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authorizationService.logout();
  }
}