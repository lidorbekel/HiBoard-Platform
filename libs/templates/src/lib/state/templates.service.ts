import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CompanyRepository} from "@hiboard/company/state/company.repository";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {Templates} from "../templates.types";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {activitiesApiMock} from "@hiboard/activities/api/activities.api.mock";

const templatesMock: Templates.Response = {
  data: [
    {
      id: '1',
      name: 'Full Stack',
      activities: activitiesApiMock
    },
    {
      id: '2',
      name: 'Frontend',
      activities: activitiesApiMock
    },
    {
      id: '3',
      name: 'Backend',
      activities: activitiesApiMock
    }
  ]
}

@Injectable({providedIn: 'root'})
export class TemplatesService {
  private templates = new BehaviorSubject<Templates.Entity[]>([]);
  templates$ = this.templates.asObservable();

  static templatesUrl = (companyId: string, department: string) => {
    return `companies/${companyId}/department/${department.toLowerCase()}/templates`;
  }

  constructor(private http: HttpClient, private companyRepo: CompanyRepository, private userRepo: UserRepository) {
  }

  getTemplates() {
    // return this.http.get<Templates.Response>(TemplatesService.templatesUrl(this.companyRepo.companyId, this.userRepo.getCurrentUser()!.department))
    //   .subscribe(() => this.templates.next(templatesMock.data));

    return new Observable<Templates.Response>((observer) => {
      setTimeout(() => {
        observer.next({data: templatesMock.data})
      }, 2000)
    }).subscribe(() => this.templates.next(templatesMock.data))

  }

  createTemplate(newTemplate: Omit<Templates.Entity, 'id'>) {
    return this.http.post<Templates.TemplateResponse>(TemplatesService.templatesUrl(this.companyRepo.companyId, this.userRepo.getCurrentUser()!.department),
      newTemplate)
      .pipe(
        tap((res) => {
          this.templates.next([
            ...this.templates.getValue(),
            res.data
          ])
        })
      )
  }

  deleteTemplate(id: string) {
    return this.http.delete(
      `${TemplatesService.templatesUrl(this.companyRepo.companyId, this.userRepo.getCurrentUser()!.department)}/${id}`,
      {observe: 'response'}
    )
      .pipe(
        map(res => {
          if (res.status === 204) {
            this.templates.next(
              this.templates.getValue().filter((template) => template.id !== id))
          }
        })
      )
  }
}
