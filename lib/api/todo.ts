import axios from '.';
import { TodoType } from '../../types/todo';

export const getTodosApi = () => axios.get<TodoType[]>('api/todos');
// 체크하기
export const checkedTodoApi = (id: number) => axios.patch(`api/todos/${id}`);
