import { useState } from 'react';
import { Link } from 'react-router-dom';

const statusOptions = ['Applied', 'Interview', 'Selected', 'Rejected'];

function formatDate(dateString) {
  if (!dateString) return 'Not set';
  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? dateString
    : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

export default function Applications({ applications, onDelete }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const filteredApplications = applications.filter((application) => !selectedStatus || application.status === selectedStatus);

  function requestDelete(application) {
    const confirmed = window.confirm(`Delete your ${application.jobTitle} application at ${application.company}?`);
    if (confirmed) onDelete(application.id);
  }

  return (
    <div className="content-page applications-page">
      <div className="page-heading">
        <div><p className="eyebrow">YOUR PROGRESS</p><h1>Applications</h1><p>Every opportunity you've decided to pursue, in one place.</p></div>
        <Link className="button button-primary" to="/add-application">Add application <span aria-hidden="true">&#8594;</span></Link>
      </div>
      <section className="applications-toolbar" aria-label="Application list controls">
        <div><span className="toolbar-label">YOUR TRACKER</span><strong>{applications.length} {applications.length === 1 ? 'application' : 'applications'}</strong></div>
        <label className="status-filter"><span>Filter by status</span><select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}><option value="">All statuses</option>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></label>
      </section>
      {filteredApplications.length > 0 ? (
        <div className="applications-list">
          {filteredApplications.map((application) => (
            <article className="application-row" key={application.id}>
              <div className="application-date-block"><span>APPLIED</span><strong>{formatDate(application.applicationDate)}</strong></div>
              <div className="application-main"><h2>{application.jobTitle}</h2><p>{application.company}<span className="list-dot">&middot;</span>{application.studentName}</p></div>
              <span className={`status-badge status-${application.status.toLowerCase()}`}><span aria-hidden="true" />{application.status}</span>
              <button className="delete-button" type="button" onClick={() => requestDelete(application)} aria-label={`Delete ${application.jobTitle} at ${application.company}`} title="Delete application">Delete</button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state application-empty">
          <span className="empty-mark" aria-hidden="true">{applications.length ? '0' : '+'}</span>
          <h2>No applications found</h2>
          <p>{applications.length ? 'There are no applications with this status. Try another filter.' : 'When you apply for an internship, add it here to keep track of your progress.'}</p>
          {applications.length ? <button className="button button-outline" type="button" onClick={() => setSelectedStatus('')}>Show all applications</button> : <Link className="button button-primary" to="/add-application">Add your first application <span aria-hidden="true">&#8594;</span></Link>}
        </div>
      )}
    </div>
  );
}