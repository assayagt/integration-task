import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TicketSubmission from './components/TicketSubmission';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/ticket-submission" element={<TicketSubmission />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
