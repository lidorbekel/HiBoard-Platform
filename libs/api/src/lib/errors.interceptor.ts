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
        if (errorResponse.status !== 500) {
          const msg = errorResponse.error?.Message;

          if (msg) {
            this.toast.error(msg, {
              duration: 20_000
            });
          }
        }

        return throwError(errorResponse);
      })
    )
  }
}
