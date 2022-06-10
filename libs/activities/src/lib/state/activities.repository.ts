import {defaultStoreStatus, StoreStatus} from "@hiboard/core/store";
import {createState, Store, withProps} from "@ngneat/elf";
import {selectAllEntities, setEntities, updateEntities, withActiveId, withEntities} from "@ngneat/elf-entities";
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

  updateUserActivity(id: string, userActivity: Activities.Entity) {
    store.update(updateEntities(id, userActivity));
  }

  ngOnDestroy(): void {
    store.destroy();
  }
}
