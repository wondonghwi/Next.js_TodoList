import React from 'react';
import { NextPage } from 'next';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';

const todos: TodoType[] = [
  {
    id: 1,
    text: '코딩하기',
    color: 'orange',
    checked: false,
  },
  {
    id: 2,
    text: '공부하기',
    color: 'navy',
    checked: true,
  },
];

const app: NextPage = () => {
  return <TodoList todos={todos} />;
};

export default app;
