import { createState, select, Store, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { defaultStoreStatus, StoreStatus } from '@hiboard/core/store';
import { Company } from '@hiboard/company/company.types';

export interface CompanyState extends StoreStatus {
  company: Company.Entity | null;
}

const { state, config } = createState(
  withProps<CompanyState>({
    company: null,
    ...defaultStoreStatus,
  })
);

const store = new Store({ state, name: 'company', config });

@Injectable({
  providedIn: 'root',
})
export class CompanyRepository {
  company$ = store.pipe(select((state) => state.company));
  loading$ = store.pipe(select((state) => state.loading));

  update(company: CompanyState['company']) {
    store.update((state) => ({
      ...state,
      company,
    }));
  }

  get currentCompany() {
    return store.query((state) => state.company);
  }

  get companyId() {
    return store.query((state) => state.company!.id);
  }

  setLoading(isLoading: boolean) {
    store.update((state) => ({
      ...state,
      loading: isLoading,
    }));
  }
}
