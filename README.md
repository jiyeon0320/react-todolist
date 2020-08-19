## To do List - REACT (주로 vlpt 깃 북, 리액트를 다루는 기술 참고했음)

- to do list 만들면서 리액트 구동원리 이해하고, scss 연습하기
- 함수형으로 써서 만들고, 코드마다 코드 의미 해석하기

###

styling : node-sass
icon : react-icons 사용

### 작업 순서

1. 세팅 - app.js 초기화 - index.js 에서 streactMode 지우기

   - 최상위 폴더에 jsconfig.json 파일 생성 후, 아래의 내용을 작성하면 닫혀 있는 파일에도 import 할 때 자동 완성 기능이 가능해짐

   ```
        {
          "compilerOptions": {
              "target": "es6"
          }
        }
   ```

2) 컴포넌트 구상

- TodoTemplate.js
  - 화면을 가운데 정렬
  - 타이틀을 보여줌
  - children으로 내부 JSX를 props로 받아 와서 렌더링
- TodoList.js
  - todos 배열을 props로 받아온 후, map으로 TodoItem을 리스트로 보여줌
- TodoItem.js
  - 한 개의 투두 아이템
  - 각 할 일 항목에 대한 정보 보여줌
  - todo 객체를 props로 받아 와서 상태(처리한 일인지, 해야될 일인지)에 따른 UI를 보여줌
- TodoInsert.js
  - 투두를 입력하는 컴포넌트
  - state를 통해 상태 관리

3. 코드
   3-1 App.js

```
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

```

3-2. TodoTemplate.js

```
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

```

3-3. TodoList.js

```
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

```

3-4. TodoItem.js

```
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

```

3-5. TodoInsert.js

```
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

```
