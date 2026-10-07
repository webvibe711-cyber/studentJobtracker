import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import AddApplication from './pages/AddApplication.jsx';
import Applications from './pages/Applications.jsx';

const STORAGE_KEY = 'student-job-tracker-applications';

function loadApplications() {
  try {
    const savedApplications = localStorage.getItem(STORAGE_KEY);
    const parsedApplications = savedApplications ? JSON.parse(savedApplications) : [];
    if (!Array.isArray(parsedApplications)) {
      return {
        applications: [],
        error: 'Saved application data was invalid. The tracker has been reset for this session.',
      };
    }
    return {
      applications: parsedApplications,
      error: '',
    };
  } catch {
    return {
      applications: [],
      error: 'Saved applications could not be read. You can still use the tracker for this session.',
    };
  }
}

export default function App() {
  const [initialData] = useState(loadApplications);
  const [applications, setApplications] = useState(initialData.applications);
  const [storageError, setStorageError] = useState(initialData.error);

  // Keep only application tracking data in localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
      setStorageError('');
    } catch {
      setStorageError('Changes could not be saved on this device. Check browser storage settings.');
    }
  }, [applications]);

  function addApplication(application) {
    setApplications((currentApplications) => [application, ...currentApplications]);
  }

  function deleteApplication(applicationId) {
    setApplications((currentApplications) =>
      currentApplications.filter((application) => application.id !== applicationId),
    );
  }

  return (
    <div className="app-shell">
      <Navbar applicationCount={applications.length} />
      {storageError && <p className="storage-alert" role="alert">{storageError}</p>}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home jobCount={10} applicationCount={applications.length} />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/add-application" element={<AddApplication onAdd={addApplication} />} />
          <Route
            path="/applications"
            element={<Applications applications={applications} onDelete={deleteApplication} />}
          />
          <Route path="*" element={<Home jobCount={10} applicationCount={applications.length} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}