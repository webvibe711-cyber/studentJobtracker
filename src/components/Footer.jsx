export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>Student Job Tracker <span className="footer-divider">|</span> Mini Project</span>
        <span>&copy; {new Date().getFullYear()} Student Job Tracker</span>
      </div>
    </footer>
  );
}