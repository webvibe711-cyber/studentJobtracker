import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const initialForm = {
  studentName: '',
  email: '',
  jobTitle: '',
  company: '',
  applicationDate: new Date().toISOString().slice(0, 10),
  status: 'Applied',
};

export default function AddApplication({ onAdd }) {
  const location = useLocation();
  const selectedJob = location.state?.job;
  const [form, setForm] = useState(() => ({
    ...initialForm,
    jobTitle: selectedJob?.title ?? '',
    company: selectedJob?.company ?? '',
  }));
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    setSuccessMessage('');
  }

  function validateForm() {
    const nextErrors = {};
    const requiredFields = {
      studentName: 'Student name',
      email: 'Email',
      jobTitle: 'Job title',
      company: 'Company name',
      applicationDate: 'Application date',
      status: 'Application status',
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!form[field].trim()) nextErrors[field] = `${label} is required.`;
    });
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address, such as name@example.com.';
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);
    setSuccessMessage('');
    if (Object.keys(nextErrors).length > 0) return;

    onAdd({
      ...form,
      studentName: form.studentName.trim(),
      email: form.email.trim(),
      jobTitle: form.jobTitle.trim(),
      company: form.company.trim(),
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    });
    setSuccessMessage('Application saved to your tracker.');
    setForm({ ...initialForm, applicationDate: new Date().toISOString().slice(0, 10) });
  }

  function fieldError(field) {
    return errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;
  }

  return (
    <div className="content-page form-page">
      <div className="page-heading">
        <div><p className="eyebrow">KEEP THE MOMENTUM</p><h1>Add an application</h1><p>Record an opportunity so every next step stays on your radar.</p></div>
        <Link className="text-link heading-link" to="/applications">View tracked applications <span aria-hidden="true">&#8594;</span></Link>
      </div>
      <div className="form-layout">
        <form className="application-form" onSubmit={handleSubmit} noValidate>
          <div className="form-topline"><span>APPLICATION DETAILS</span><span>All fields required</span></div>
          {successMessage && <p className="success-message" role="status">{successMessage}</p>}
          <div className="form-grid">
            <label className="form-field">
              <span>Student name</span>
              <input name="studentName" value={form.studentName} onChange={updateField} autoComplete="name" aria-invalid={Boolean(errors.studentName)} aria-describedby={errors.studentName ? 'studentName-error' : undefined} />
              {fieldError('studentName')}
            </label>
            <label className="form-field">
              <span>Email address</span>
              <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
              {fieldError('email')}
            </label>
            <label className="form-field">
              <span>Job title</span>
              <input name="jobTitle" value={form.jobTitle} onChange={updateField} aria-invalid={Boolean(errors.jobTitle)} aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined} />
              {fieldError('jobTitle')}
            </label>
            <label className="form-field">
              <span>Company name</span>
              <input name="company" value={form.company} onChange={updateField} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'company-error' : undefined} />
              {fieldError('company')}
            </label>
            <label className="form-field">
              <span>Application date</span>
              <input name="applicationDate" type="date" value={form.applicationDate} onChange={updateField} aria-invalid={Boolean(errors.applicationDate)} aria-describedby={errors.applicationDate ? 'applicationDate-error' : undefined} />
              {fieldError('applicationDate')}
            </label>
            <label className="form-field">
              <span>Application status</span>
              <select name="status" value={form.status} onChange={updateField} aria-invalid={Boolean(errors.status)} aria-describedby={errors.status ? 'status-error' : undefined}>
                <option>Applied</option><option>Interview</option><option>Selected</option><option>Rejected</option>
              </select>
              {fieldError('status')}
            </label>
          </div>
          <div className="form-actions"><button className="button button-primary" type="submit">Save application <span aria-hidden="true">&#8594;</span></button></div>
        </form>
        <aside className="form-aside">
          <span className="aside-index">01 / 03</span>
          <span className="aside-symbol" aria-hidden="true">+</span>
          <h2>Make the follow-up easier.</h2>
          <p>Add the details you want at hand. Your application list stays saved on this device.</p>
          <div className="aside-bottom"><span className="aside-line" /><span>YOUR CAREER, ORGANIZED</span></div>
        </aside>
      </div>
    </div>
  );
}