import axios from 'axios';
import {
  Todo,
  TodoRequest,
  MetaResponse,
  TodoInfo,
  TODO_STATUS,
} from '../shared/types.ts';

const BASE_URL = 'https://easydev.club/api/v2';

export const fetchData = async (
  status: TODO_STATUS
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const query = new URLSearchParams();
    if (status) {
      query.append('filter', status);
    }
    const { data, statusText } = await axios(`${BASE_URL}/todos?${query}`);
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
    const { data, statusText } = await axios.post(`${BASE_URL}/todos`, todo);
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
    const { data, statusText } = await axios.put(
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
    const { statusText } = await axios.delete(`${BASE_URL}/todos/${id}`);
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
    const { data, statusText } = await axios.put(
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
