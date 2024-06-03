import React, { useState,useEffect } from 'react';
import { useUser } from './usercontext';
import api from './services/Api'; 



function ListItem({ itemlist }) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">tconst</th>
            <th scope="col">title Type</th>
            <th scope="col">primary Title</th>
            <th scope="col">start Year</th>
            <th scope="col">genres</th>
          </tr>
        </thead>
        <tbody>
          {itemlist.map((item,index) => (
            <tr key={index}>
              <td>{item.tconst}</td>
              <td>{item.titleType}</td>
              <td>{item.primaryTitle}</td>
              <td>{item.startYear}</td>
              <td>{item.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }


function MovieSearch() {
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState({ year: '', genre: '', type: '', person_name: '' });
    const { user, token } = useUser();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const searchMovies = async () => {
        try {
            const response = await api.fetchmovies(filters,token)
            setMovies(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(()=>{
      searchMovies();
  },[])

    return (
        <div>
            <h4>Search Movies</h4>
            <div className="container">
                <div className="row">

                    <div className="col-md-3">
                    <input className="form-control" type="text" name="year" placeholder="Year" onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3">
                    <input className="form-control" type="text" name="genre" placeholder="Genre" onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3">
                    <input className="form-control" type="text" name="type" placeholder="Type" onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3">
                    <input className="form-control" type="text" name="person_name" placeholder="person name" onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3">
                    <button className="btn btn-success" onClick={searchMovies}>Search</button>
                    </div>
                </div>

                {movies.length > 0 ?(<div>
                <ListItem itemlist={movies}/>
            </div>):(<h4>No result found</h4>)}
                
            </div>
            
            
        </div>
    );
}

export default MovieSearch;
