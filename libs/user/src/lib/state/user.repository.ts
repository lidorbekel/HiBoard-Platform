
import {createState, select, Store, withProps} from '@ngneat/elf';
import {Injectable} from "@angular/core";
import {User} from "../../users.types";

interface UserProps {
  user: User.Entity | null
}

const { state, config } = createState(
  withProps<UserProps>({ user: null })
);

const store = new Store({ state, name: 'user', config });

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  user$ = store.pipe(select((state) => state.user));

  update(user: UserProps['user']){
    store.update((state) => ({
      ...state,
      user
    }));
  }
}
