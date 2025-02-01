import axios from 'axios';
import {
  Todo,
  TodoRequest,
  MetaResponse,
  TodoInfo,
  TODO_STATUS,
} from '../shared/types.ts';

const BASE_URL = 'https://easydev.club/api/v2';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

export const fetchData = async (
  status: TODO_STATUS
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const { data, statusText } = await httpClient(`${BASE_URL}/todos?`, {
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
    const { data, statusText } = await httpClient.post(
      `${BASE_URL}/todos`,
      todo
    );
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
    const { data, statusText } = await httpClient.put(
      `${BASE_URL}/todos/${id}`,
      todo
    );
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
    const { statusText } = await httpClient.delete(`${BASE_URL}/todos/${id}`);
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
    const { data, statusText } = await httpClient.put(
      `${BASE_URL}/todos/${id}`,
      todo
    );
    if (statusText.toLocaleLowerCase() !== 'ok') {
      throw new Error(statusText);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
