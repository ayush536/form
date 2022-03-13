import { getDefaultNormalizer } from "@testing-library/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        age:"",
        address:"",
        department:"",
        marital:"",
    });

    const[users, setUsers] = useState([])
    const[page, setPage] = useState(1)

    useEffect(() => {
        getData();
    }, [page])

    const getData = () => {
        axios.get(`http://localhost:3005/users?_limit=9&_page=${page}`)
        .then((res) => {
            setUsers(res.data)
        })
    }

    const handleChange = (e) => {
        const {id,value} = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3005/users", formData)
        .then(() => {
            alert("user registered sucessfully");
            setFormData({
                name: "",
                age:"",
                address:"",
                department:"",
                marital:"",
            })
        })
        getData()
    }
    return(
        <form onSubmit={handleSubmit}>
            <h1>EMPLOYEE DETAILS</h1>
            <input 
            value={formData.name}
            id="name"
            type="text"
            onChange={handleChange}
            placeholder="Enter name"
            />
            <input 
            value={formData.age}
            id="age"
            type="number" 
            onChange={handleChange}
            placeholder="your age is"
            />
            <input
            value={formData.address}
            id="address" 
            type="text"
            onChange={handleChange}
            placeholder="ADDRESS" 
            />
            <input 
            value={formData.department}
            id="department"
            type="text"
            onChange={handleChange}
            placeholder="DEPARTMENT" 
            />
            <input 
            value={formData.marital}
            id="marital"
            type="text"
            onChange={handleChange}
            placeholder="Marital status" 
            />
            {users.map((g) => (
                <div key={g.id}>{g.name}, age :{g.age}, address:{g.address}, department: {g.department}</div>
            ))}
            <input type="submit" value="Submit your data" />
        </form>
    )
}