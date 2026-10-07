import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-topline">
        <span className="job-category">{job.category}</span>
        <span className="job-type">{job.type}</span>
      </div>
      <div className="job-card-title-row">
        <div>
          <h2>{job.title}</h2>
          <p className="company-name">{job.company}</p>
        </div>
        <span className="company-monogram" aria-hidden="true">{job.company.slice(0, 1)}</span>
      </div>
      <p className="job-location"><span aria-hidden="true">Location</span>{job.location}</p>
      <div className="job-card-actions">
        <a className="text-link" href={job.applyUrl} target="_blank" rel="noreferrer">
          View opportunity <span aria-hidden="true">&#8599;</span>
        </a>
        <Link className="button button-small button-dark" to="/add-application" state={{ job }}>
          Track application
        </Link>
      </div>
    </article>
  );
}