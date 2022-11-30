import { List } from "@mui/material";
import { Link } from "react-router-dom";
import ListItemCustom from "./ListItemCustom";

const MainNavbar = () => {
    return ( 
        <nav>
            <List sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ListItemCustom>
                    <Link to="/">Factures</Link>
                </ListItemCustom>
                <ListItemCustom>
                    <Link to="/customers">Clients</Link>
                </ListItemCustom>
            </List>
        </nav>
     );
}
 
export default MainNavbar;