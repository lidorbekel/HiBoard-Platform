import {defaultStoreStatus, StoreStatus} from "../../../../core/src/lib/store";
import {createState, select, Store, withProps} from "@ngneat/elf";
import {selectAllEntities, setEntities, withActiveId, withEntities} from "@ngneat/elf-entities";
import {Tasks} from "@hiboard/home/types/tasks.type";
import {Injectable, OnDestroy} from "@angular/core";

export interface TasksState extends StoreStatus {}

const { state, config } = createState(
  withEntities<Tasks.Entity>(),
  withProps<TasksState>(defaultStoreStatus),
  withActiveId()
);
const store = new Store({ state, name: 'tasks', config });

@Injectable({
  providedIn: 'root'
})
export class TasksRepository implements OnDestroy {
  tasks$ = store.pipe(selectAllEntities());
  loading$ = store.pipe(select((state) => state.loading));

  setTasks(tasks: Tasks.Entity[]){
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
