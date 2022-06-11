import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {HotToastService} from "@ngneat/hot-toast";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(
    private toast: HotToastService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let msg = errorResponse.error?.Message || errorResponse.error?.message;
        if (msg) {
          if (msg === 'INVALID_PASSWORD') {
            msg = 'Invalid Password';
          }

          if (msg && msg.includes('EMAIL_EXISTS')) {
            msg = 'Email exists'
          } else if (msg && msg.includes('instance')) {
            msg = 'There was a problem, please try later...'
          }

          this.toast.error(msg, {
            duration: 10_000
          });
        }

        return throwError(errorResponse);
      })
    )
  }
}
