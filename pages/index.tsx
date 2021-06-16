import React from 'react';
import { NextPage } from 'next';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';

const todos: TodoType[] = [];

const app: NextPage = () => {
  return <TodoList todos={todos} />;
};

export default app;
