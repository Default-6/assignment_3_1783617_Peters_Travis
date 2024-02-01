import React, { useState, useEffect } from 'react';
import { fetchEmails } from './services/emailService';
import EmailSidebar from './components/EmailSidebar';
import EmailBody from './components/EmailBody';
import SearchBar from './components/SearchBar';

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolder, setCurrentFolder] = useState('inbox'); // Default to inbox

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmails();

      // Ensure the 'read' property is a boolean
      const emailsWithBooleanRead = data.map(email => ({ ...email, read: email.read === 'true' }));
      
      setEmails(emailsWithBooleanRead);
    };

    fetchData();
  }, []);

  const handleEmailClick = (clickedEmail) => {
    console.log('Clicked email before update:', clickedEmail);
    
    // Mark clicked email as read
    const updatedEmails = emails.map((email) =>
      email.id === clickedEmail.id ? { ...email, read: true } : email
    );
  
    console.log('Updated emails:', updatedEmails);
    setEmails(updatedEmails);
    setSelectedEmail(clickedEmail);
  };

  const handleFolderChange = (folder) => {
    setCurrentFolder(folder);
    setSelectedEmail(null); // Reset selected email when changing folder
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDelete = (emailId) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, deleted: true } : email
    );

    setEmails(updatedEmails);
    setSelectedEmail(null); // Reset selected email after deletion
  };

  const filteredEmails = emails.filter((email) =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const folderFilteredEmails =
    currentFolder === 'inbox'
      ? filteredEmails.filter((email) => !email.deleted)
      : filteredEmails.filter((email) => email.deleted);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div>
        <button onClick={() => handleFolderChange('inbox')}>Inbox</button>
        <button onClick={() => handleFolderChange('deleted')}>Deleted</button>
      </div>
      <div style={{ display: 'flex' }}>
        <EmailSidebar
          emails={folderFilteredEmails}
          onEmailClick={handleEmailClick}
          onDeleteClick={handleDelete}
          selectedEmail={selectedEmail}
        />
        <EmailBody email={selectedEmail} />
      </div>
    </div>
  );
}

export default App;
