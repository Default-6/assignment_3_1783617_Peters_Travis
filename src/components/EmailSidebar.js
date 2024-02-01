import React from 'react';

const EmailSidebar = ({ emails, onEmailClick, onDeleteClick, selectedEmail }) => {
  return (
    <div>
      {emails.map((email) => (
        <div key={email.id} style={{ marginBottom: '10px' }}>
          <div
            onClick={() => onEmailClick(email)}
            style={{
              backgroundColor:
                email === selectedEmail
                  ? 'lightblue'
                  : email.read
                  ? 'lightgrey'
                  : 'white',
              padding: '10px',
              cursor: 'pointer',
              textDecoration: email.deleted ? 'line-through' : 'none',
            }}
          >
            <div>{email.from}</div>
            <div>{email.subject}</div>
            <div>{email.address}</div>
            <div>{email.timestamp}</div>
          </div>
          <button onClick={() => onDeleteClick(email.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EmailSidebar;
