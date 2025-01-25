import { Todo, TodoRequest, MetaResponse, TodoInfo } from '../shared/types.ts';

const BASE_URL = 'https://easydev.club/api/v2';

export const fetchData = async (
  status: string
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const res = await fetch(`${BASE_URL}/todos?filter=${status}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return data;
  } catch (error) {
    throw Error();
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
    throw Error();
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
    throw Error();
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
    throw Error();
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
    throw Error();
  }
};
