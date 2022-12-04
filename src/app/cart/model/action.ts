type ActionType = 'ADD' | 'UPDATE' | 'DELETE';
export interface Action<T> {
  item: T;
  actionType: ActionType;
}
