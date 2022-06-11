import { HttpClient } from '@angular/common/http';
import { User } from '../../../../user/src/users.types';
import { BehaviorSubject, first, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../../../user/src/lib/state/user.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyEmployeesService {
  private employees = new BehaviorSubject<User.Entity[]>([]);
  employees$ = this.employees.asObservable();

  private activeEmployee = new BehaviorSubject<User.Entity | null>(null);
  activeEmployee$ = this.activeEmployee.asObservable();

  static employeesUrl = (companyId: string) => {
    return `companies/${companyId}`;
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  fetchEmployeesByCompanyId(companyId: string) {
    return this.http
      .get<any>(CompanyEmployeesService.employeesUrl(companyId))
      .pipe(first())
      .subscribe((res) => {
        this.employees.next(res.data.users);
      });
  }
}
