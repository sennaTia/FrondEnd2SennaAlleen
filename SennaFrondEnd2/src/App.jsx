import React, { useState } from 'react';
import Login from './Login';
import Feed from './Feed';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif', 
      backgroundColor: '#fafafa', 
      minHeight: '100vh', 
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: '#fff', border: '1px solid #dbdbdb', borderRadius: '3px', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', margin: '10px 0 20px 0', letterSpacing: '-1px' }}>
          InstaClone
        </h1>
        
        {!user ? (
          <Login onLoginSuccess={(name) => setUser(name)} />
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #dbdbdb' }}>
              <span style={{ fontWeight: 'bold' }}>{user}</span>
              <button onClick={() => setUser(null)} style={{ background: 'none', border: 'none', color: '#0095f6', fontWeight: 'bold', cursor: 'pointer' }}>
                Uitloggen
              </button>
            </div>
            <Feed user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;