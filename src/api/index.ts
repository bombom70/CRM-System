import axios from 'axios';
import {
  Todo,
  TodoRequest,
  MetaResponse,
  TodoInfo,
  TodosStatus,
} from '../shared/types.ts';

const BASE_URL = 'https://easydev.club/api/v2';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

export const fetchData = async (
  status: TodosStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const { data, statusText } = await httpClient('/todos', {
      params: {
        filter: status,
      },
    });
    if (statusText.toLocaleLowerCase() !== 'ok') {
      throw new Error(statusText);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddTodo = async (todo: TodoRequest): Promise<Todo> => {
  try {
    const { data, statusText } = await httpClient.post('/todos', todo);
    if (statusText.toLocaleLowerCase() !== 'ok') {
      throw new Error(statusText);
    }
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
    const { data, statusText } = await httpClient.put(`/todos/${id}`, todo);
    if (statusText.toLocaleLowerCase() !== 'ok') {
      throw new Error(statusText);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteTodo = async (id: number) => {
  try {
    const { statusText } = await httpClient.delete(`/todos/${id}`);
    if (statusText.toLocaleLowerCase() !== 'ok') {
      throw new Error(statusText);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchDoneTodo = async (
  id: number,
  todo: TodoRequest
): Promise<Todo> => {
  try {
    const { data, statusText } = await httpClient.put(`/todos/${id}`, todo);
    if (statusText.toLocaleLowerCase() !== 'ok') {
      throw new Error(statusText);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
