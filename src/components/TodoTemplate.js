import React from 'react';
import '../styles/TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title"> To Do List</div>
      {/* 투두 리스트 내용을 children으로 받아와 보여준다 */}
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
