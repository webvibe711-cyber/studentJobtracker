export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  locations,
  onClear,
}) {
  return (
    <section className="filter-panel" aria-label="Filter internship listings">
      <label className="search-field">
        <span>Search opportunities</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Job title or company"
        />
      </label>
      <label className="filter-field">
        <span>Category</span>
        <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">All categories</option>
          <option>Electronics</option>
          <option>Embedded Systems</option>
          <option>IoT</option>
          <option>Web Development</option>
          <option>Software</option>
        </select>
      </label>
      <label className="filter-field">
        <span>Location</span>
        <select value={selectedLocation} onChange={(event) => onLocationChange(event.target.value)}>
          <option value="">All locations</option>
          {locations.map((location) => <option key={location}>{location}</option>)}
        </select>
      </label>
      <button className="clear-filters" type="button" onClick={onClear}>Clear filters</button>
    </section>
  );
}