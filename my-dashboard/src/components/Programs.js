import React, { useEffect, useState } from 'react';


const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    duration: '',
    startDate: '',
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        if (response.ok) {
          const data = await response.json();
          setPrograms(data);
          setFilteredPrograms(data);
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
        (filters.duration ? program.duration === filters.duration : true) &&
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
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={filters.duration}
          onChange={handleFilterChange}
        />
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
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            )}
            <div className="program-details">
              <h3>{program.name}</h3>
              <p>Category: {program.category}</p>
              <p>Duration: {program.duration}</p>
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
