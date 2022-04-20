import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "./user.repository";
import {User} from "../../users.types";
import {tap} from "rxjs";

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

  createUser(user: Omit<User.Entity, 'id'>) {
    return this.http.post<User.Entity>(UserService.userUrl, user);
  }
}
