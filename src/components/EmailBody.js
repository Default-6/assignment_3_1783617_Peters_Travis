import React from 'react';

const EmailBody = ({ email }) => {
  return (
    <div>
      {email ? (
        <div>
          <h2>{email.subject}</h2>
          <p>{email.message}</p>
        </div>
      ) : (
        <p>No email selected</p>
      )}
    </div>
  );
};

export default EmailBody;
