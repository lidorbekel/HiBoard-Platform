import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "./user.repository";
import {tap} from "rxjs";
import {User} from "../../user.types";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static userUrl = 'user';
  constructor(private http: HttpClient, private userRepo: UserRepository) {
  }

  getUser() {
    // TODO remove mock
    // this.userRepo.update({
    //   firstName: 'Ido',
    //   lastName: 'Golan',
    //   id: '1',
    //   email: 'idogo@gmail.com',
    //   role: 'employee'
    // });
    return this.http.get<User.Response>(UserService.userUrl)
      .pipe(
        tap(({ data }) => {
          this.userRepo.update(data);
        })
      )
  }
}
