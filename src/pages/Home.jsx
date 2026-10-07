import { Link } from 'react-router-dom';

export default function Home({ jobCount, applicationCount }) {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT STEP STARTS HERE</p>
          <h1>Student Job<br /><span>Tracker</span></h1>
          <p className="hero-description">Find internships, explore opportunities, and track your applications.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/jobs">Explore Jobs <span aria-hidden="true">&#8594;</span></Link>
            <Link className="button button-outline" to="/applications">Track Applications</Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="Three steps from discovery to your next opportunity">
          <div className="visual-header"><span>YOUR SEARCH, IN MOTION</span><span className="visual-status">● ACTIVE</span></div>
          <div className="route-line" aria-hidden="true"><span /><span /><span /></div>
          <div className="route-steps">
            <div><strong>01</strong><span>Discover</span></div>
            <div><strong>02</strong><span>Apply</span></div>
            <div><strong>03</strong><span>Follow up</span></div>
          </div>
          <div className="visual-note"><span className="note-spark" aria-hidden="true">+</span><span>Small steps add up.<br /><b>Keep your momentum.</b></span></div>
          <span className="visual-orbit orbit-one" aria-hidden="true" />
          <span className="visual-orbit orbit-two" aria-hidden="true" />
        </div>
      </section>

      <section className="overview-section" aria-labelledby="overview-title">
        <div className="section-heading">
          <div><p className="eyebrow">YOUR DASHBOARD</p><h2 id="overview-title">A clear view of what's next</h2></div>
          <Link className="text-link" to="/applications">View your applications <span aria-hidden="true">&#8594;</span></Link>
        </div>
        <div className="stats-grid">
          <article className="stat-card stat-jobs">
            <span className="stat-label">Sample opportunities</span>
            <strong>{jobCount.toString().padStart(2, '0')}</strong>
            <span className="stat-footnote">Internships to explore</span>
            <span className="stat-decoration" aria-hidden="true">J</span>
          </article>
          <article className="stat-card stat-applications">
            <span className="stat-label">Your applications</span>
            <strong>{applicationCount.toString().padStart(2, '0')}</strong>
            <span className="stat-footnote">Applications in your tracker</span>
            <span className="stat-decoration" aria-hidden="true">A</span>
          </article>
          <div className="dashboard-note">
            <span className="note-line" />
            <p><b>One place to stay organized.</b><br />Save an opportunity, record your application, and keep every next step in sight.</p>
            <Link to="/add-application" aria-label="Add an application">Add an application <span aria-hidden="true">&#8594;</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}