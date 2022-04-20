import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Company} from "../company.types";
import {Observable} from "rxjs";

const companyMock: Company.Entity = {
  name: 'company Mock',
  departments: ['Hello', 'World'],
  admin: 'admin@gmail.com'
}

@Injectable({providedIn: 'root'})
export class CompanyService {

  static companyUrl = 'company';

  constructor(private http: HttpClient) {
  }

  createCompany(company: Company.Entity) {
    // return this.http.post<Company.Response>(CompanyService.companyUrl, company);
    return new Observable<Company.Entity>((observer) => {
      setTimeout(() => {
        observer.next(companyMock);
      }, 2000)
    })
  }


}
