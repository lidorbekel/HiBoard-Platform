import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "./user.repository";
import {User} from "../../users.types";
import {Observable, tap} from "rxjs";

const adminUserMock: User.Entity = {
  firstName: 'adminFirst',
  lastName: 'adminLast',
  role: 'admin',
  id: '15',
  email: 'admin@gmail.com'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static userInfoUrl = 'userinfo';
  static userUrl = 'user';

  constructor(private http: HttpClient, private userRepo: UserRepository) {
  }

  getUser() {
    this.userRepo.setLoading(true);

    return this.http.get<User.Response>(UserService.userInfoUrl)
      .pipe(
        tap(({data}) => {
          this.userRepo.setLoading(false);
          this.userRepo.update(data);
        })
      )
  }

  createUser(user: Omit<User.Entity, 'id'> & { password: string }) {
    // return this.http.post<User.Entity>(UserService.userUrl, user);
    return new Observable<User.Entity>((observer) => {
      setTimeout(() => {
        observer.next(adminUserMock);
      }, 2000)
    })
  }
}
