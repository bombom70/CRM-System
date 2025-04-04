import { httpClient } from '../httpClient.ts';
import {
  TodosStatus,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from './types.ts';

export const fetchData = async (
  status: TodosStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const { data } = await httpClient('/todos', {
      params: {
        filter: status,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddTodo = async (todo: TodoRequest): Promise<Todo> => {
  try {
    const { data } = await httpClient.post('/todos', todo);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchEditTodo = async (
  id: string,
  todo: TodoRequest
): Promise<Todo> => {
  try {
    const { data } = await httpClient.put(`/todos/${id}`, todo);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteTodo = async (id: number) => {
  try {
    await httpClient.delete(`/todos/${id}`);
  } catch (error) {
    throw error;
  }
};

export const fetchDoneTodo = async (
  id: number,
  todo: TodoRequest
): Promise<Todo> => {
  try {
    const { data } = await httpClient.put(`/todos/${id}`, todo);
    return data;
  } catch (error) {
    throw error;
  }
};
