import {createState, select, Store, withProps} from '@ngneat/elf';
import {Injectable} from "@angular/core";
import {User} from "../../users.types";
import {defaultStoreStatus, StoreStatus} from "../../../../core/src/lib/store";

export interface UserState extends StoreStatus {
  user: User.Entity | null
}

const {state, config} = createState(
  withProps<UserState>({
    user: null,
    ...defaultStoreStatus
  }));

const store = new Store({state, name: 'user', config});

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  user$ = store.pipe(select((state) => state.user));
  loading$ = store.pipe(select((state) => state.loading));

  update(user: UserState['user']) {
    store.update((state) => ({
      ...state,
      user
    }));
  }

  getCurrentUser() {
    return store.query((state) => state.user);
  }

  setLoading(isLoading: boolean) {
    store.update((state) => ({
      ...state,
      loading: isLoading
    }));
  }
}
