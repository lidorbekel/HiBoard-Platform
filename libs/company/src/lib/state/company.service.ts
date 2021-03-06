import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../company.types';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  static companyUrl = 'companies';

  constructor(private http: HttpClient) {}

  createCompany(company: Omit<Company.Entity, 'id'>) {
    return this.http.post<Company.Response>(CompanyService.companyUrl, company);
  }

  updateCompany(company: Company.Entity) {
    return this.http.patch<Company.Response>(
      `${CompanyService.companyUrl}/${company.id}`,
      company
    );
  }

  getCompany(companyId: string) {
    return this.http.get<Company.Response>(
      `${CompanyService.companyUrl}/${companyId}`
    );
  }
}
