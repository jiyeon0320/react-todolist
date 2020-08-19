import React from 'react';
import '../styles/TodoItem.scss';
import cn from 'classnames';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';

/** 투 두 각 한 개에 대한 컴포넌트 */

// TodoList의 todo란 props를 전달 받아서 출력하기

const TodoItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  //클릭으로 삭제하기
  const onClick = () => {
    onRemove(id);
  };

  // 항목 변경(토글 체크 or 언체크)
  const onCheck = () => {
    onToggle(id);
  };

  return (
    <div className="TodoItem">
      <div className={cn('checkbox', { checked })} onClick={onCheck}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={onClick}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoItem;
