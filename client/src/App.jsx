import React from 'react';
import FollowerList from './views/FollowerList';

const App = () => {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Followers</h1>
      <FollowerList />
    </div>
  );
};

export default App;
