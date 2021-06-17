import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { TodoType } from '../types/todo';
import pallete from '../styles/palette';
import TrashCanIcon from '../public/statics/svg/trash_can.svg';
import CheckMarkIcon from '../public/statics/svg/check_mark.svg';
import { useRouter } from 'next/router';
import { checkedTodoApi, deleteTodoAPI } from '../lib/api/todo';

interface TodoListProps {
  todos: TodoType[];
}

type ObjectIndexType = {
  [key: string]: number | undefined;
};

const TodoList = ({ todos }: TodoListProps) => {
  const router = useRouter();

  const [localTodos, setLocalTodos] = useState(todos);

  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {};
    localTodos.forEach(todo => {
      const value = colors[todo.color];
      if (!value) {
        //* 존재하지않던 key라면
        colors[`${todo.color}`] = 1;
      } else {
        //* 존재하는 키라면
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  //투두 체크하기
  const checkTodo = async (id: number) => {
    try {
      await checkedTodoApi(id);
      console.log('체크했습니다.');
      //체크를 적용하는 방법
      const newTodos = localTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      setLocalTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  };

  //투두 삭제하기
  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = localTodos.filter(todo => todo.id !== id);
      setLocalTodos(newTodos);
      console.log('삭제했습니다.');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은TODO<span>{localTodos.length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </div>
      <ul className="todo-list">
        {localTodos.map(todo => (
          <li className="todo-item" key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block bg-${todo.color}`} />
              <p className={`todo-text ${todo.checked ? 'checked-todo-text' : ''}`}>{todo.text}</p>
            </div>
            <div className="todo-right-side">
              {todo.checked && (
                <>
                  <TrashCanIcon
                    className="todo-trash-can"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  />
                  <CheckMarkIcon
                    className="todo-check-mark"
                    onClick={() => {
                      checkTodo(todo.id);
                    }}
                  />
                </>
              )}
              {!todo.checked && (
                <button
                  type="button"
                  className="todo-button"
                  onClick={() => {
                    checkTodo(todo.id);
                  }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${pallete.gray};

    .todo-list-last-todo {
      font-size: 14px;
      margin: 0 0 8px;

      span {
        margin-left: 12px;
      }
    }

    .todo-list-header-colors {
      display: flex;

      .todo-list-header-color-num {
        display: flex;
        margin-right: 8px;

        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0;
          margin-left: 6px;
        }

        .todo-list-header-round-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }

  .bg-blue {
    background-color: ${pallete.blue};
  }

  .bg-green {
    background-color: ${pallete.green};
  }

  .bg-navy {
    background-color: ${pallete.navy};
  }

  .bg-orange {
    background-color: ${pallete.orange};
  }

  .bg-red {
    background-color: ${pallete.red};
  }

  .bg-yellow {
    background-color: ${pallete.yellow};
  }

  .todo-list {
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 52px;
      border-bottom: 1px solid ${pallete.gray};

      .todo-left-side {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;

        .todo-color-block {
          width: 12px;
          height: 100%;
        }

        .checked-todo-text {
          color: ${pallete.gray};
          text-decoration: line-through;
        }

        .todo-text {
          margin-left: 12px;
          font-size: 16px;
        }
      }

      .todo-right-side {
        display: flex;
        align-items: center;
        margin-right: 12px;

        svg {
          &:first-child {
            margin-right: 16px;
          }
        }

        .todo-trash-can {
          width: 16px;

          path {
            fill: ${pallete.deep_red};
          }
        }

        .todo-check-mark {
          fill: ${pallete.deep_green};
        }

        .todo-button {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid ${pallete.gray};
          background-color: transparent;
          outline: none;
        }
      }
    }
  }
`;
