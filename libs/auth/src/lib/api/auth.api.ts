import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Auth} from "@hiboard/auth/auth.types";

@Injectable({ providedIn: 'root' })
export class AuthApi {
  constructor(private http: HttpClient) {
  }

  login(credentials: Auth.Login.Body){
    return this.http.post<Auth.Response>('login', credentials);
  }
}
