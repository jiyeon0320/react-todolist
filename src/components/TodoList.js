import React from 'react';
import '../styles/TodoList.scss';
import TodoItem from './TodoItem';

/** 투 두 아이템들이 모여 리스트로 된 것을 보여주는 컴포넌트 */

//App에서 <TodoList todos={todos} /> 여기에 todos를 props로 전달된 것을
//파라미터로 받아온다.
// onRemove란 props를 파라미터로 받아오기
// TodoItem에서 항목을 삭제, 수정하려면 TodoList를 거쳐야 한다.
const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        // onRemove, onToggle을 props로 그대로 담아서 전달한다.
        <TodoItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
