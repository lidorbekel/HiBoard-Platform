import { HttpClient } from '@angular/common/http';
import { User } from '../../../../user/src/users.types';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../../../user/src/lib/state/user.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyUsersService {
  private managers = new BehaviorSubject<User.Entity[]>([]);
  managers$ = this.managers.asObservable();

  private activeManager = new BehaviorSubject<User.Entity | null>(null);
  activeManager$ = this.activeManager.asObservable();

  static ManagerUrl = (adminID: number) => {
    return `${adminID}/Managers`;
  };
  constructor(private http: HttpClient, private userService: UserService) {}

  fetchManagersByAdminId(adminId: number) {
    // return this.http.get<User.EmployeesResponse>(EmployeesService.employeesUrl(managerId));

    return new Observable<User.Entity[]>((observer) => {
      setTimeout(() => {
        observer.next([
          {
            id: 12345,
            email: 'email',
            firstName: 'lidor',
            lastName: 'bekel',
            role: 'Employee',
            companyId: '1',
            department: 'Sales',
            done: 70,
          },
          {
            id: 43434,
            email: 'email2',
            firstName: 'bar',
            lastName: 'amsalem',
            role: 'Employee',
            companyId: '1',
            department: 'Sales',
            done: 35,
          },
        ]);
      }, 2000);
    }).subscribe((res) => {
      this.managers.next(res);
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
