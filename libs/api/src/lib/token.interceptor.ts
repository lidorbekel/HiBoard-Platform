import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {switchMap} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.getToken().pipe(
      switchMap((token) => {
        req = req.clone({
          setHeaders: {
            Authorization: "Bearer " + token
          },
        });
        return next.handle(req);
      })
    )
  }
}
