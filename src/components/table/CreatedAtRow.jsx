import { Typography } from "@mui/material";
import * as moment from "moment";

const CreatedAtRow = ({params}) => {
    return ( 
        <Typography paragraph={true} sx={{mb: 0}}>
            {moment(params.value).format("DD/MM/YYYY")}
        </Typography>
     );
}
 
export default CreatedAtRow;