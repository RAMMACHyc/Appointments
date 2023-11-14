import React, { useEffect, useState } from 'react';
import { BiTimer } from 'react-icons/bi'
import { FaUserTie,FaUser } from 'react-icons/fa6'

const Search = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        setFilterData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (value) => {
    const filteredData = filterData.map((task) => {
      const index = task.text.toLowerCase().indexOf(value.toLowerCase());
      if (index !== -1) {
        return {
          ...task,
          text:
            task.text.substring(0, index) +
            `<mark>${task.text.substring(index, index + value.length)}</mark>` +
            task.text.substring(index + value.length),
        };
      }
      return null; 
    }).filter(Boolean); 

    setData(filteredData);
  };

  return (
    <>
      <input
        type='text'
        className='search'
        placeholder='Search..'
        onChange={(e) => handleFilter(e.target.value)}
      />
      <div style={{display:"flex"}}>
        {data.map((task, index) => (
          <div className='task1' key={index}>
            <div>
               <div style={{borderBottom:" 1px dashed #e5734f",display:"flex"}} > 
                <FaUserTie style={{color:'gray',width:'25px',textAlign:"center"}} />
                 <h3 dangerouslySetInnerHTML={{ __html: task.text }} />
               </div>
               
          
               <p><FaUser style={{color:'gray',width:'25px'}} />{task.petName}</p>
              <p><BiTimer style={{color:'gray',width:'25px'}} />{task.day}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
