import React, { useState } from 'react';
import axios from 'axios';

const TicketSubmission = () => {
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occurrences, setOccurrences] = useState('');

  const [ticketUrl, setTicketUrl] = useState('');

  const handleSubmit = async () => {

    if (!projectId || !title || !description || !occurrences) {
      alert('Please fill in all fields');
      return;
    }

    try {
      
      const response = await axios.post('http://localhost:5000/api/create', {
        project_id: projectId,
        title: title,
        description: description,
        occurrences: occurrences,
      });
      
    
      setTicketUrl(response.data.ticketUrl);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the ticket.');
    }
  };

  return (
    <div>
      <h2>Create Jira Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectId">Project ID:</label>
          <input
            type="text"
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="occurrences">Occurrences:</label>
          <input
            type="number"
            id="occurrences"
            value={occurrences}
            onChange={(e) => setOccurrences(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Ticket</button>
      </form>

      {ticketUrl && (
        <div>
          <p>Ticket created successfully! You can view it here:</p>
          <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
            {ticketUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default TicketSubmission;
