export interface StoreStatus {
  loading: boolean;
  error?: any;
}

export const defaultStoreStatus: StoreStatus = {
  loading: false
}
