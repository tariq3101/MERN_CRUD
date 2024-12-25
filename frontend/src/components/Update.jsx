// import React from 'react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const getSingleUSer = async ()=>{

    const response = await fetch(`http://localhost:5000/${id}`);

    const result = await response.json();
    if(!response.ok){
      console.log(result.error)
      setError(result.error)
    }

    if(response.ok){
      setError("");
      console.log("Updated user: ", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  }

  const handleUpdate = async (e) =>{
    e.preventDefault();
    const updatedUser = {name, email, age};
    const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();

    if(!response.ok){
        console.log(result.error);
        setError(result.error);
    } 

    if(response.ok){
        setError("");
        navigate("/all");
    }
  }
  useEffect(()=>{
    getSingleUSer();
  }, []);

  return (
    <div className='container my-2'>
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className='text-container'>Edit the data</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" id="exampleInputPassword1" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  )
}

export default Update
