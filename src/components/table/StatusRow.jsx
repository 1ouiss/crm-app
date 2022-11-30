import { Alert } from "@mui/material";

const StatusRow = ({params}) => {
    const severity = {
        paid: "success",
        send: "warning",
        cancel: "error",
    }

    return ( 
        <Alert severity={severity[params.value]} icon={false}>
            {params.value}
        </Alert>
     );
}
 
export default StatusRow;