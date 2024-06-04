import React, { useState,useEffect } from 'react';
import { useUser } from '../hooks/usercontext';
import api from '../services/Api';


function ListItem({ itemlist }) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">nconst</th>
            <th scope="col">Name</th>
            <th scope="col">Birth Year</th>
            <th scope="col">Profession</th>
            <th scope="col">Known for Title</th>
          </tr>
        </thead>
        <tbody>
          {itemlist.map((item,index) => (
            <tr key={index}>
              <td>{item.nconst}</td>
              <td>{item.primaryName}</td>
              <td>{item.birthYear}</td>
              <td>{item.primaryProfession}</td>
              <td>{item.knownForTitles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }


function PersonSearch() {
    const [persons, setPersons] = useState([]);
    const [filters, setFilters] = useState({ name: '', movie_title: '', profession: '' });
    const { user, token } = useUser();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const searchPersons = async () => {
        try {
            const response = await api.fetchpersons(filters,token)
            setPersons(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(()=>{
        searchPersons();
    },[])



    return (
        <div>
            <h4>Search Persons</h4>
            {token ? (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">

                        <input className="form-control" type="text" name="name" placeholder="Name" onChange={handleInputChange} />
                        
                        </div>
                        <div className="col-md-3">
                        <input className="form-control" type="text" name="movie_title" placeholder="Movie Title" onChange={handleInputChange} />
                            </div>

                        <div className="col-md-3">
                        <input className="form-control" type="text" name="profession" placeholder="Profession" onChange={handleInputChange} />
                        
                            </div>   

                        <div className="col-md-3">
                        <button className="btn btn-success" onClick={searchPersons}>Search</button>
                            </div>     

                        
                    </div>
                   
                    {persons.length > 0 ? (<div>
                        <ListItem itemlist={persons} />
                    </div>) : (<h4>No result found</h4>)}
                </div>
            ) : (
                <a href="/">Login</a>
            )}
        </div>
    );
}

export default PersonSearch;
