import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "./user.repository";
import {User} from "../../users.types";
import {Observable, tap} from "rxjs";
import {CompanyService} from "@hiboard/company/state/company.service";
import {CompanyRepository} from "@hiboard/company/state/company.repository";

const adminUserMock: User.Entity = {
  firstName: 'Ido',
  lastName: 'Golan',
  role: 'Admin',
  id: '15',
  email: 'ido@lumigo.io',
  companyId: '7'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static userUrl = 'user';

  constructor(private http: HttpClient, private userRepo: UserRepository, private companyService: CompanyService, private companyRepo: CompanyRepository) {
  }

  getUser() {
    this.userRepo.setLoading(true);
    this.companyRepo.setLoading(true);

    return this.http.get<User.Response>(UserService.userUrl)
      .pipe(
        tap(({data}) => {
          this.userRepo.setLoading(false);
          this.userRepo.update(data);

          const {companyId} = data;
          this.companyService.getCompany(companyId).subscribe((companyRes) => {
            this.companyRepo.update(companyRes.data)
            this.companyRepo.setLoading(false);
          })
        })
      )
  }

  createUser(user: Omit<User.Entity, 'id'> & { password: string }) {
    return this.http.post<User.Entity>(UserService.userUrl, user);
  }

  updateUser(user: Omit<User.Entity, 'id'> & { password?: string, newPassword?: string }) {
    // const url = `${UserService.userUrl}/${this.userRepo.getCurrentUser()!.id}`;
    // return this.http.patch<User.Response>(url, user).pipe(
    //   tap((userRes) => {
    //     if (userRes.data.email) {
    //       this.userRepo.update(userRes.data);
    //     }
    //   })
    // );

    return new Observable<User.Entity>((observer) => {
      console.log(user);
      setTimeout(() => {
        observer.next({...adminUserMock, ...user});
      }, 2000)
    }).pipe(
      tap((userRes) => {
        if (userRes.email) {
          this.userRepo.update({...userRes, ...user});
        }
      })
    );
  }
}
