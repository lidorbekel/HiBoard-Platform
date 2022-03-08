import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class NavigationService {
  constructor(private router: Router) {
  }

  navigate(url: string) {
    return this.router.navigateByUrl(url);
  }

  forgotPassword(){
    return this.router.navigateByUrl('auth/reset-password/change-password')
  }

  toHome() {
    return this.navigate('dashboard');
  }

  toLogin() {
    return this.navigate('auth/login');
  }
}
