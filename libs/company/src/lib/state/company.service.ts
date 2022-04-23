import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Company} from "../company.types";
import {Observable} from "rxjs";

export const companyMock: Company.Entity = {
  id: '123',
  name: 'Bagira',
  departments: ['R&D', 'Sales', 'Marketing'],
  description: 'This is a cool company !'
}

@Injectable({providedIn: 'root'})
export class CompanyService {

  static companyUrl = 'company';

  constructor(private http: HttpClient) {
  }

  createCompany(company: Omit<Company.Entity, 'id'>) {
    // return this.http.post<Company.Response>(CompanyService.companyUrl, company);
    return new Observable<Company.Response>((observer) => {
      setTimeout(() => {
        observer.next({data: companyMock});
      }, 2000)
    })
  }

  updateCompany(company: Company.Entity) {
    // return this.http.put<Company.Response>(`${CompanyService.companyUrl}/${company.id}`, company);

    return new Observable<Company.Response>((observer) => {
      setTimeout(() => {
        observer.next({data: company})
      }, 2000)
    })
  }

  getCompany(companyId: string) {
    console.log(companyId);
    return new Observable<Company.Response>((observer) => {
      setTimeout(() => {
        observer.next({data: companyMock});
      }, 1000)
    })
  }
}
