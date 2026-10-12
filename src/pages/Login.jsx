import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="login-page">
      <div className="login-layout">
        <div className="login-form-panel">
          <p className="eyebrow"><span className="eyebrow-dot" />STUDENT ACCESS</p>
          <h1>Welcome back.</h1>
          <p className="login-intro">Sign in with your student email to continue your job search.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field" htmlFor="student-email">
              <span>Student email</span>
              <input
                id="student-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@university.edu"
                required
              />
            </label>

            <label className="login-field" htmlFor="student-password">
              <span>Password</span>
              <span className="login-password-wrap">
                <input
                  id="student-password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  onClick={() => setPasswordVisible((visible) => !visible)}
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </span>
            </label>

            <label className="login-remember">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>

            <button className="button button-primary login-submit" type="submit">Sign in</button>
            {submitted && (
              <p className="login-notice" role="status">
                Student sign-in is not connected yet. Your credentials have not been sent.
              </p>
            )}
          </form>

          <p className="login-back"><Link to="/">Back to Job Tracker</Link></p>
        </div>

        <aside className="login-aside" aria-label="Job search progress">
          <span className="login-aside-index">YOUR NEXT CHAPTER</span>
          <div className="login-aside-mark" aria-hidden="true">JT</div>
          <h2>Keep your next move in view.</h2>
          <p>Find student opportunities and keep every application moving forward.</p>
          <div className="login-aside-footer"><span />A clearer path from search to offer</div>
        </aside>
      </div>
    </section>
  );
}