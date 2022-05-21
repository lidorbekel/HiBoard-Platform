import {defaultStoreStatus, StoreStatus} from "@hiboard/core/store";
import {createState, Store, withProps} from "@ngneat/elf";
import {selectAllEntities, setEntities, withActiveId, withEntities} from "@ngneat/elf-entities";
import {Activities} from "../types/activities.type";
import {Injectable, OnDestroy} from "@angular/core";

export interface ActivitiesState extends StoreStatus {
}

const {state, config} = createState(
  withEntities<Activities.Entity>(),
  withProps<ActivitiesState>(defaultStoreStatus),
  withActiveId()
);
const store = new Store({state, name: 'activities', config});

// export const activitiesStatus = {
//   loading$: store.pipe(select(({ loading }) => loading)),
//   error$: store.pipe(select(({ error }) => error)),
// }

@Injectable({
  providedIn: 'root'
})
export class ActivitiesRepository implements OnDestroy {
  activities$ = store.pipe(selectAllEntities());

  setActivities(activities: Activities.Entity[]) {
    store.update(setEntities(activities));
  }

  setLoading(loading: boolean) {
    store.update((state) => ({
      ...state,
      loading
    }))
  }

  ngOnDestroy(): void {
    store.destroy();
  }
}
