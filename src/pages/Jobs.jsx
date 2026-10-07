import { useState } from 'react';
import JobCard from '../components/JobCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

const jobs = [
  { id: 1, title: 'Embedded Systems Intern', company: 'Northstar Robotics', location: 'Austin, TX', category: 'Embedded Systems', type: 'Hybrid' },
  { id: 2, title: 'Frontend Developer Intern', company: 'Brightleaf Studio', location: 'Remote', category: 'Web Development', type: 'Remote' },
  { id: 3, title: 'IoT Engineering Intern', company: 'Fieldnote Labs', location: 'Seattle, WA', category: 'IoT', type: 'On-site' },
  { id: 4, title: 'Software Engineering Intern', company: 'Orbit Systems', location: 'Remote', category: 'Software', type: 'Remote' },
  { id: 5, title: 'Electronics Design Intern', company: 'Copperline Tech', location: 'Boston, MA', category: 'Electronics', type: 'Hybrid' },
  { id: 6, title: 'Firmware Engineering Intern', company: 'Northstar Robotics', location: 'Austin, TX', category: 'Embedded Systems', type: 'On-site' },
  { id: 7, title: 'Web Applications Intern', company: 'Common Ground Digital', location: 'Chicago, IL', category: 'Web Development', type: 'Hybrid' },
  { id: 8, title: 'Connected Devices Intern', company: 'Fieldnote Labs', location: 'Remote', category: 'IoT', type: 'Remote' },
  { id: 9, title: 'QA Software Intern', company: 'Orbit Systems', location: 'Denver, CO', category: 'Software', type: 'On-site' },
  { id: 10, title: 'Hardware Validation Intern', company: 'Copperline Tech', location: 'Boston, MA', category: 'Electronics', type: 'Hybrid' },
].map((job) => ({ ...job, applyUrl: 'https://www.linkedin.com/jobs/' }));

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const locations = [...new Set(jobs.map((job) => job.location))].sort();

  const filteredJobs = jobs.filter((job) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = !query || job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query);
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  function clearFilters() {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
  }

  return (
    <div className="content-page jobs-page">
      <div className="page-heading">
        <div><p className="eyebrow">FIND YOUR FIT</p><h1>Internship directory</h1><p>Explore sample opportunities across technology and engineering.</p></div>
        <span className="listing-count"><b>{filteredJobs.length.toString().padStart(2, '0')}</b> opportunities</span>
      </div>
      <div className="sample-disclaimer"><span aria-hidden="true">i</span><p><b>Sample listings for your project.</b> These records are examples, not verified live vacancies. Follow each employer's official careers page for current openings.</p></div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        locations={locations}
        onClear={clearFilters}
      />
      {filteredJobs.length > 0 ? (
        <div className="jobs-grid">{filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}</div>
      ) : (
        <div className="empty-state"><span className="empty-mark" aria-hidden="true">?</span><h2>No results found</h2><p>Try another search or clear a filter to see more opportunities.</p><button className="button button-outline" type="button" onClick={clearFilters}>Clear filters</button></div>
      )}
    </div>
  );
}