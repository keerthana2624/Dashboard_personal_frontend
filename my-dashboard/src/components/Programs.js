import React, { useEffect, useState } from 'react';
import './Programs.css'; // Import the CSS file

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    duration: '',
    startDate: '',
  });
  const [uniqueDurations, setUniqueDurations] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        if (response.ok) {
          const data = await response.json();
          setPrograms(data);
          setFilteredPrograms(data);

          // Extract unique durations from the courses data
          const durations = [...new Set(data.map(program => program.duration))];
          setUniqueDurations(durations);
        } else {
          console.error('Failed to fetch programs');
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const filtered = programs.filter(program => {
      return (
        (filters.category ? program.category === filters.category : true) &&
        (filters.duration ? parseInt(program.duration) === parseInt(filters.duration) : true) &&
        (filters.startDate ? new Date(program.start_date) >= new Date(filters.startDate) : true)
      );
    });

    setFilteredPrograms(filtered);
  }, [filters, programs]);

  const handleApplyClick = (courseId) => {
    // Handle the apply action here
    console.log(`Applied for course with ID: ${courseId}`);
  };

  return (
    <div className="programs-container">
      <h2>Available Programs</h2>
      <div className="filters">
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select name="duration" value={filters.duration} onChange={handleFilterChange}>
          <option value="">All Durations</option>
          {uniqueDurations.map(duration => (
            <option key={duration} value={duration}>
              {duration} {duration > 1 ? 'Weeks' : 'Week'}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
      </div>
      <ul className="program-list">
        {filteredPrograms.map(program => (
          <li key={program.id} className="program-item">
            {program.image_url && (
              <img
                src={`http://localhost:5000${program.image_url}`}
                alt={program.name}
                className="program-image"
              />
            )}
            <div className="program-details">
              <h3>{program.name}</h3>
              <p>Category: {program.category}</p>
              <p>Duration: {program.duration} {program.duration > 1 ? 'Weeks' : 'Week'}</p>
              <p>Start Date: {new Date(program.start_date).toLocaleDateString()}</p>
              <button onClick={() => handleApplyClick(program.id)}>Apply</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Programs;
