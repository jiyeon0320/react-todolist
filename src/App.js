import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

/** todo 상태 사용 */
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '할 일 1', checked: true },
    { id: 2, text: '할 일 2', checked: true },
    { id: 3, text: '할 일 3', checked: false },
  ]);

  // 고윳값으로 사용될 id
  // useRef를 사용하여 변수를 담아주는데, id 값은 화면에 렌더링 될 값이 아니기 때문에
  // id 값이 바뀐다고 화면이 리렌더링 될 필요는 없기 때문이다.
  // 단순히 새로운 항목을 만들 때 참조되는 값일 뿐이기 때문에 ref를 사용한다.
  const nextId = useRef(4);

  // useCallback을 사용하여, 컴포넌트가 한 번 함수를 만들고 재사용할 수 있게 해줌
  const onInsert = useCallback(
    //text라는 파라미터를 넣어서
    (text) => {
      // 불변성을 위해 todo 객체를 새로 만들고, 여기에 새로운 값을 넣어준다.
      //.current 프로퍼티에 변경 가능한 값을 담는다.
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      //concat을 사용하여 추가되는 데이터를 배열의 마지막에 추가한다.
      setTodos(todos.concat(todo));
      nextId.current += 1; //nextId 값 1씩 더해주기
    },
    //검사할 값을 담은 배열(deps)
    //기존 todos 배열을 비교하기 위함
    [todos]
  );

  //항목 지우기
  // .filter 를 사용해서 항목을 지울 수 있다.
  // todo의 각 id 값을 비교해서 지운다
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  //항목 체크 언체크 변경하기
  const onToggle = useCallback(
    //해당 id(key) 값을 받아와서 map을 사용하여 기존 todos 배열에 있는 id 값을 비교한다.
    (id) => {
      setTodos(
        todos.map((todo) =>
          //id 값을 비교해 id가 같으면, 변경된 상태를 setTodos에 담는다.
          //id 값이 다르면 기존의 todo 값으로 둔다.
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  return (
    <TodoTemplate>
      {/* 이 곳에 TodoTemplate의 children 부분에 보여질 내용이다. */}
      <TodoInsert onInsert={onInsert} />
      {/* TodoList 컴포넌트에 todos 각 항목들이 props로 전달된다. */}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
