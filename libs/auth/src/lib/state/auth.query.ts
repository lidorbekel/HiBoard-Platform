import {Injectable} from "@angular/core";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {User} from "../../../../user/src/users.types";

@Injectable({providedIn: 'root'})
export class AuthQuery {
  constructor(private userRepo: UserRepository) {
  }

  hasAccess(role: User.Role | User.Role[]): boolean {
    const currentUser = this.userRepo.getCurrentUser();
    if (currentUser) {
      return Array(role).includes(currentUser.role);
    }
    return false;
  }
}
