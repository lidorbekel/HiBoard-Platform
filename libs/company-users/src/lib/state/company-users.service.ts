import {HttpClient} from '@angular/common/http';
import {User} from '../../../../user/src/users.types';
import {BehaviorSubject, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserService} from '../../../../user/src/lib/state/user.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyUsersService {
  private managers = new BehaviorSubject<User.Entity[]>([]);
  managers$ = this.managers.asObservable();

  private activeManager = new BehaviorSubject<User.Entity | null>(null);
  activeManager$ = this.activeManager.asObservable();

  static ManagerUrl = (adminID: number) => {
    return `user/${adminID}/employees`;
  };

  constructor(private http: HttpClient, private userService: UserService) {
  }

  fetchManagersByAdminId(adminId: number) {
    return this.http.get<User.UsersResponse>(CompanyUsersService.ManagerUrl(adminId))
      .subscribe((res) => {
        this.managers.next(res.data);
      });
  }

  addManager(user: User.Entity) {
    this.managers.next([...this.managers.getValue(), user]);
  }

  deleteManager(id: number) {
    return this.userService.deleteUser(id).pipe(
      tap((res) => {
        if (res) {
          this.managers.next(
            this.managers.getValue().filter((manager) => manager.id !== id)
          );
        }
      })
    );
  }
}
