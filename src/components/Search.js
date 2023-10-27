import React, { useEffect, useState } from 'react'

const Search = () => {
    const [data, setData] = useState([])
    const [filterData, setfilterData] = useState([])

   useEffect(()=>{
    fetch('http://localhost:5000/tasks')
    .then(res => res.json())
    .then(data => {
                   console.log(data);
                   setfilterData(data);
                })
    
   },[])

   

   const handleFilter = (value) => {
    const res = filterData.filter(f => f.text.toLowerCase().includes(value))
    setData(res);

   }
 
  return (
    <>
    <div className='recherche'>
      <input type='text' className="search"  placeholder="Search.." onChange={e =>handleFilter(e.target.value)}  />
      {data.map((d,i)=>
    <div key={i}>
      <div className='div'>search</div>
       {d.text}
    </div>
     )}
    </div>
     
    </>
  )
}

export default Search
