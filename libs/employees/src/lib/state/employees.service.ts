import {HttpClient} from "@angular/common/http";
import {User} from "../../../../user/src/users.types";
import {BehaviorSubject, map} from "rxjs";
import {Injectable} from "@angular/core";
import {UserService} from "../../../../user/src/lib/state/user.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employees = new BehaviorSubject<User.Entity[]>([]);
  employees$ = this.employees.asObservable();

  private activeEmployee = new BehaviorSubject<User.Entity | null>(null);
  activeEmployee$ = this.activeEmployee.asObservable();

  static employeesUrl = (managerId: number) => {
    return `user/${managerId}/employees`;
  }

  constructor(private http: HttpClient, private userService: UserService) {
  }

  fetchEmployeesByManagerId(managerId: number) {
    return this.http.get<User.EmployeesResponse>(EmployeesService.employeesUrl(managerId)).subscribe(res => {
      this.employees.next(res.data)
    })

    // return new Observable<User.Entity[]>((observer) => {
    //   setTimeout(() => {
    //     observer.next([{
    //       id: 12345,
    //       email: 'email',
    //       firstName: 'lidor',
    //       lastName: 'bekel',
    //       role: 'Employee',
    //       companyId: '1',
    //       department: 'Sales',
    //       done: 70
    //     },
    //       {
    //         id: 43434,
    //         email: 'email2',
    //         firstName: 'bar',
    //         lastName: 'amsalem',
    //         role: 'Employee',
    //         companyId: '1',
    //         department: 'Sales',
    //         done: 35
    //       }
    //     ])
    //   }, 2000)
    // }).subscribe(res => {
    //   this.employees.next(res)
    // })
  }

  addEmployee(user: User.Entity) {
    this.employees.next([
      ...this.employees.getValue(),
      user
    ])
  }

  deleteEmployee(id: number) {
    return this.userService.deleteUser(id)
      .pipe(
        map(res => {
          if (res.status === 204) {
            this.employees.next(
              this.employees.getValue().filter((employee) => employee.id !== id))
          }
        })
      )
  }
}
