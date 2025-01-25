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
    const res = await fetch(`${BASE_URL}/todos?${query}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAddTodo = async (todo: TodoRequest): Promise<Todo> => {
  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
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
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteTodo = async (id: number) => {
  try {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(res.statusText);
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
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
