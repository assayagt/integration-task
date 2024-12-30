import React, { useState } from 'react';
import axios from 'axios';

const TicketSubmission = () => {
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occurrences, setOccurrences] = useState('');
  const [ticketUrl, setTicketUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!projectId || !title || !description || !occurrences) {
      setError('Please fill in all fields');
      return;
    }

    const email = sessionStorage.getItem('email');
    const api_token = sessionStorage.getItem('api_token');

    if (!email || !api_token) {
      setError('You must log in first.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/create', {
        project_id: projectId,
        title: title,
        description: description,
        occurrences: occurrences,
        email: email,          
        api_token: api_token,  
      });

      setTicketUrl(response.data.ticketUrl);
      setError(''); // Clear any previous error message
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the ticket.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Create Jira Ticket</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-lg">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="projectId" className="form-label">Project ID:</label>
            <input
              type="text"
              id="projectId"
              className="form-control"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="occurrences" className="form-label">Occurrences:</label>
            <input
              type="number"
              id="occurrences"
              className="form-control"
              value={occurrences}
              onChange={(e) => setOccurrences(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleSubmit}>Create Ticket</button>
        </div>
      </div>

      {ticketUrl && (
        <div className="mt-4 alert alert-success">
          <p>Ticket created successfully! You can view it here:</p>
          <a href={ticketUrl} target="_blank" rel="noopener noreferrer" className="alert-link">
            {ticketUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default TicketSubmission;
