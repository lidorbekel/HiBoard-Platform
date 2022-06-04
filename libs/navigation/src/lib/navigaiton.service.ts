import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserRepository} from "../../../user/src/lib/state/user.repository";

@Injectable({providedIn: 'root'})
export class NavigationService {
  constructor(private router: Router, private userRepo: UserRepository) {
  }

  navigate(url: string) {
    return this.router.navigateByUrl(url);
  }

  forgotPassword() {
    return this.router.navigateByUrl('auth/reset-password/change-password')
  }

  toactivities() {
    return this.navigate('activities');
  }

  toLogin() {
    return this.navigate('auth/login');
  }

  toEmployees() {
    return this.navigate('employees');
  }

  toJoinHiboard() {
    return this.navigate('join')
  }

  toAdmin() {
    return this.navigate('admin');
  }

  toProfile() {
    return this.navigate('profile');
  }

  toDefaultByRole() {
    const {role} = this.userRepo.getCurrentUser()!;
    if (role === 'Admin') {
      return this.toAdmin();
    }
    if (role === 'Employee') {
      return this.toactivities();
    }

    return this.toEmployees();
  }

  toTemplate(id: string) {
    return this.navigate(`templates/${id}`)
  }

  toTemplates() {
    return this.navigate('templates')
  }
}
