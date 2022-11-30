import { Box, Typography, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionsRowCustomers from "../components/table/ActionsRowCustomers";
import { Link } from "react-router-dom";

const CustomerListePage = () => {
    const [customers, setCustomers] = useState([]);
    const [customersSearch, setCustomersSearch] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [columns, setColumns] = useState([
        { field: '_id', headerName: 'ID', width: 200 },
        { 
            field: 'firstName', headerName: 'Client', width: 130,
            renderCell: (params) => 
                `${params.row?.firstName} ${params.row?.lastName}`,
        },
        { 
            field: 'invoices', headerName: 'InvoicesNumber', width: 90,
            renderCell: (params) => `${params.row?.invoices.length}`,
        },
        { 
            headerName: 'Actions', width: 300,
            renderCell: (params) => <ActionsRowCustomers params={params} setCustomers={setCustomers}/>
         },
    ]);

    useEffect(() => {
        fecthCustomers();
    }, [])

    const fecthCustomers = async () => {
        fetch("http://localhost:8000/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data));
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const searchCustomers = customers.filter(customer => customer.firstName.toLowerCase().includes(value.toLowerCase()) || customer.lastName.toLowerCase().includes(value.toLowerCase()));
        if (value === "") {
            setCustomersSearch([]);
            setIsSearch(false);
        } else {
            setCustomersSearch(searchCustomers);
            setIsSearch(true);
        }
    }
    return ( 
        <Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Typography variant="h2">Liste des clients</Typography>
                <Link to="/customers/create">
                    <Button variant="contained">Nouveau Client</Button>
                </Link>
            </Box>
            <Box component="form">
                <TextField 
                    variant="outlined" 
                    label="Recherche" 
                    sx={{width: "100%"}}
                    onChange={(e) => handleSearch(e)}
                />
            </Box>
            <Box
                sx={{
                    height: 400, 
                    width: '100%',
                    mt: 4
                }}
            >
                {
                    isSearch ? (
                        <DataGrid
                            rows={customersSearch}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            getRowId={(row) => row._id}
                        />
                    ) : (
                        <DataGrid
                            rows={customers}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            getRowId={(row) => row._id}
                        />
                    )
                }
            </Box>
        </Box>
     );
}
 
export default CustomerListePage;