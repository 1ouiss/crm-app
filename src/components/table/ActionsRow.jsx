import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ActionsRow = ({params, setInvoices}) => {

    const handleDelete = (e) => {
        e.stopPropagation()
        console.log("Delete", params.row._id);
        fetch(`http://localhost:8000/api/invoices/${params.row._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setInvoices(data)
            })
    }

    return ( 
        <Box display="flex" justifyContent="space-around">
            <Link to={`/invoices/${params.row._id}`}>
                <Button variant="contained" color="primary" size="small">
                    Editer
                </Button>
            </Link>
            <Button variant="contained" color="secondary" size="small" sx={{ml: 2}} onClick={handleDelete}>
                Supprimer
            </Button>
        </Box>
     );
}
 
export default ActionsRow;