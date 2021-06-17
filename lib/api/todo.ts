import axios from '.';
import { TodoType } from '../../types/todo';

interface AddTodoAPIBody {
  text: string;
  color: TodoType['color'];
}

export const getTodosApi = () => axios.get<TodoType[]>('api/todos');
// 체크하기
export const checkedTodoApi = (id: number) => axios.patch(`api/todos/${id}`);
// 추가하기
export const addTodoAPI = (body: AddTodoAPIBody) => axios.post('api/todos', body);
// 삭제하기
export const deleteTodoAPI = (id: number) => axios.delete(`/api/todos/${id}`);
