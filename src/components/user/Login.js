import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // 입력된 아이디와 비밀번호를 확인하는 로직을 구현합니다
    // 실제로는 서버와 통신하여 로그인을 처리하거나, 로컬 상태와 비교하는 등의 작업을 수행할 수 있습니다

    console.log('아이디:', username);
    console.log('비밀번호:', password);

    // 로그인 후에 필요한 동작을 수행합니다
  };

  return (
    <div>
      <h2>Login 페이지</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">아이디:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;