import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {Templates} from "../templates.types";
import {BehaviorSubject, map, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class TemplatesService {
  private templates = new BehaviorSubject<Templates.Entity[]>([]);
  templates$ = this.templates.asObservable();
  activeTemplate$ = new BehaviorSubject<Templates.Entity | null>(null);

  static templatesUrl = (companyId: string, department: string) => {
    return `companies/${companyId}/department/${department}/templates`;
  }

  constructor(private http: HttpClient, private userRepo: UserRepository) {
  }

  getTemplates() {
    const {department, companyId} = this.userRepo.getCurrentUser()!;

    return this.http.get<Templates.Response>(TemplatesService.templatesUrl(companyId, department))
      .pipe(
        tap((res) => {
          this.templates.next(res.data);
        })
      )
  }

  getTemplate(id: string) {
    const {department, companyId} = this.userRepo.getCurrentUser()!;

    return this.http.get<Templates.TemplateResponse>(`${TemplatesService.templatesUrl(companyId, department)}/${id}`);
  }

  updateTemplate(template: Templates.Entity) {
    const {department, companyId} = this.userRepo.getCurrentUser()!;

    return this.http.patch<Templates.TemplateResponse>(`${TemplatesService.templatesUrl(companyId, department)}/${template.id}`,
      template).pipe(
      tap((res) => {
        this.templates.next(
          this.templates.getValue().map((temp) => {
            if (temp.id === template.id) {
              return {...res.data}
            }

            return temp;
          })
        )
      })
    );
  }

  createTemplate(newTemplate: Omit<Templates.Entity, 'id'>) {
    const {department, companyId} = this.userRepo.getCurrentUser()!;

    return this.http.post<Templates.TemplateResponse>(TemplatesService.templatesUrl(companyId, department),
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
    const {department, companyId} = this.userRepo.getCurrentUser()!;

    return this.http.delete(
      `${TemplatesService.templatesUrl(companyId, department)}/${id}`,
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

  updateTemplatesWithNewActivity(templates: Templates.Entity[], activityId: string) {
    const {department, companyId} = this.userRepo.getCurrentUser()!;

    const body: Templates.UpdateWithNewActivityBody = {
      templatesIds: templates.map(({id}) => id),
      activityId
    }


    return this.http.patch(TemplatesService.templatesUrl(companyId, department), body);
  }

  // addActivityToTemplates(activity: Omit<Activities.InventoryEntity, 'id'>, templates: Templates.Entity[]) {
  //   const body: Templates.Body = {
  //     templatesIds: templates.map(({id}) => id),
  //     activity
  //   }
  //
  //   const {department, companyId} = this.userRepo.getCurrentUser()!;
  //
  //   return this.http.patch(TemplatesService.templatesUrl(department, companyId), body);
  // }

  setActiveTemplate(template: Templates.Entity | null) {
    this.activeTemplate$.next(template);
  }
}
