import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

const InvoiceForm = () => {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(id ? true : false);
    const [invoice, setInvoice] = useState({})
    const navigate = useNavigate();


    useEffect(() => {
        editMode && fetch(`http://localhost:8000/api/invoices/${id}`)
            .then(response => response.json())
            .then(data => setInvoice(data));
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice({ ...invoice, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            fetch(`http://localhost:8000/api/invoices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invoice)
            }).then(() => {
                console.log('Invoice updated');
                navigate('/');
            })
        } else {
            invoice.status = 'send';

            fetch('http://localhost:8000/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invoice)
            }).then(() => {
                console.log('Invoice created');
                navigate('/');
            })
        }
    }

    return ( 
        <Box component="form" sx={{display:"flex", gap:"20px", alignItems:"center" }}>
            <TextField id="outlined-basic" name="name" label="Name" variant="outlined" value={invoice.name || ""} onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="customer" label="Customer" variant="outlined" value={invoice.customer || ""} onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="status" label="Status" variant="outlined" value={invoice.status || ""} onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="amount" label="amount" variant="outlined" value={invoice.amount || ""} onChange={(e) => handleChange(e) } />
            <Button variant="contained" onClick={(e)=> handleSubmit(e)}>
                {editMode ? 'Update' : 'Create'}
            </Button>
        </Box>
    );
}
 
export default InvoiceForm;