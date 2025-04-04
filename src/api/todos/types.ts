export type TodoRequest = Partial<Pick<Todo, 'title' | 'isDone'>>;

export interface Todo {
  id: string;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export enum TodosStatus {
  ALL = 'all',
  COMPLETED = 'completed',
  IN_WORK = 'inWork',
}
