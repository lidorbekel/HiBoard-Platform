import {defaultStoreStatus, StoreStatus} from "@hiboard/core/store";
import {createState, Store, withProps} from "@ngneat/elf";
import {selectAllEntities, setEntities, withActiveId, withEntities} from "@ngneat/elf-entities";
import {Tasks} from "../types/tasks.type";
import {Injectable, OnDestroy} from "@angular/core";

export interface TasksState extends StoreStatus {
}

const {state, config} = createState(
  withEntities<Tasks.Entity>(),
  withProps<TasksState>(defaultStoreStatus),
  withActiveId()
);
const store = new Store({state, name: 'tasks', config});

// export const tasksStatus = {
//   loading$: store.pipe(select(({ loading }) => loading)),
//   error$: store.pipe(select(({ error }) => error)),
// }

@Injectable({
  providedIn: 'root'
})
export class TasksRepository implements OnDestroy {
  tasks$ = store.pipe(selectAllEntities());

  setTasks(tasks: Tasks.Entity[]) {
    store.update(setEntities(tasks));
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
