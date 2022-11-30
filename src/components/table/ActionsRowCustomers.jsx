import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ActionsRowCustomers = ({params, setCustomers}) => {

    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.stopPropagation()
        console.log("Delete", params.row._id);
        fetch(`http://localhost:8000/api/customers/${params.row._id}`,
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
                setCustomers(data)
                navigate('/customers')
            })
    }

    return ( 
        <Box display="flex" justifyContent="space-around">
            <Link to={`/customers/${params.row._id}`}>
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
 
export default ActionsRowCustomers;