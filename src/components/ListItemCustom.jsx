import { ListItem, styled } from "@mui/material";

const NavItem = styled(ListItem)(({ theme }) => ({
    maxWidth: "200px",
    "& a": {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "&:hover": {
            color: theme.palette.primary.dark,
        },
    },
}));
     
export default function ListItemCustom({children}) {
    return (
        <NavItem>
            {children}
        </NavItem>
    )
};