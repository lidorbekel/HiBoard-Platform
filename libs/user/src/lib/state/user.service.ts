import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "./user.repository";
import {User} from "../../users.types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static userUrl = 'user';

  constructor(private http: HttpClient, private userRepo: UserRepository) {
  }

  getUser() {
    this.userRepo.setLoading(true);

    // TODO remove mock
    this.userRepo.update({
      firstName: 'Ido',
      lastName: 'Golan',
      id: '1',
      email: 'idogo@gmail.com',
      role: 'employee'
    });

    this.userRepo.setLoading(false);
    // return this.http.get<User.Response>(UserService.userUrl)
    //   .pipe(
    //     tap(({data}) => {
    //       this.userRepo.update(data);
    //     })
    //   )
  }

  createUser(user: Omit<User.Entity, 'id'>) {
    // return this.http.post<User.Entity>(UserService.userUrl, user);
    return new Observable<User.Response>((observer) => {
      setTimeout(() => {
        observer.next({
          data: {
            user: {
              id: '1',
              ...user
            }
          }
        })
      }, 2000)
    })
  }
}
