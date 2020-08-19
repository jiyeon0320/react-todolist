import React, { useState, useCallback } from 'react';
import '../styles/TodoInsert.scss';
import { MdAdd } from 'react-icons/md';

/** 할 일 입력함으로 인해 추가 기능 구현 */

//App에서 props로 받아온 onInsert 함수에
//현재 state 값을 파라미터로 넣어서 호출
const TodoInsert = ({ onInsert }) => {
  //input 상태 관리하기 위한 state
  const [state, setState] = useState('');

  //인풋 값 바뀌는 것을 담아둠
  // const onChange =(e)=>{
  // console.log(e.target.value);
  //   setState(e.target.value);
  // }

  // useCallback을 사용하여, 컴포넌트가 리렌더링될 때 마다 함수를 새로 만드는 것이 아니라,
  // 한 번 함수를 만들고 재사용할 수 있도록 해준다.
  const onChange = useCallback((e) => {
    setState(e.target.value);
  }, []);

  //onClick 대신 onSubmit을 사용한 이유는
  //submit은 엔터로도 이벤트가 발생한다.
  //onClick으로 할 경우, onKeyPress 이벤트를 활용해야 함
  const onSubmit = useCallback(
    (e) => {
      onInsert(state);
      setState(''); //insert 후 데이터 초기화 해주기

      //submit 이벤트는 브라우저에서 새로고침을 발생시킨다.
      //이를 방지하기 위해 이 함수를 호출함
      e.preventDefault();
    },
    [onInsert, state]
  );

  //onClick으로도 가능하다.
  /*
  const onClick = useCallback(()=>{
    onInsert(state);
    setState(''); 
  }, [onInsert, state]);
  */

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input placeholder="할 일 입력하기" value={state} onChange={onChange} />
      <button type="submit">
        {/* <button onClick={onClick}> */}
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
