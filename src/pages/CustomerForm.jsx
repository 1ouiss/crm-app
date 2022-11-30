import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

const CustomerForm = () => {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(id ? true : false);
    const [customer, setCustomer] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        editMode && fetch(`http://localhost:8000/api/customers/${id}`)
            .then(response => response.json())
            .then(data => setCustomer(data));
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            fetch(`http://localhost:8000/api/customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }).then(() => {
                console.log('Invoice updated');
                navigate('/customers');
            })
        } else {
            fetch('http://localhost:8000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }).then(() => {
                console.log('Invoice created');
                navigate('/customers');
            })
        }
    }

    return ( 
        <Box component="form" sx={{display:"flex", gap:"20px", alignItems:"center" }}>
            <TextField id="outlined-basic" name="firstName" label="First Name" variant="outlined" value={customer.firstName || ""} onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="lastName" label="last Name" variant="outlined" value={customer.lastName || ""} onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="user" label="User" variant="outlined" value={customer.user || ""} onChange={(e) => handleChange(e) } />
            <Button variant="contained" onClick={(e)=> handleSubmit(e)}>
                {editMode ? 'Update' : 'Create'}
            </Button>
        </Box>
    );
}
 
export default CustomerForm;