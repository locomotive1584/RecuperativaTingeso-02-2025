import React, {useState} from "react";
import {Box, Button, Menu, MenuItem} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const UnfoldingMenu = ({title, options}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMouseLeave = () => {
        setAnchorEl(null);
    }

    const navigate = useNavigate();

    const handleItemClick = (option) => (e) => {
        handleMouseLeave();

        if(!option) return;

        if(typeof option == "string") return;

        if (option.onClick && typeof option.onClick === "function") {

            option.onClick(e);
            return;
        }

        if(option.to){
            navigate(option.to);
        }
    }

    return (
        <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{display: "inline-block", margin: "0 10px"}}>

            <Button
                variant="contained"
                sx={{backgroundColor: "#d79a01"}}>
                {title}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMouseLeave}
                MenuListProps={{
                    onMouseLeave: handleMouseLeave}}
                PaperProps={{
                    sx:{minWidth: 200,
                        backgroundColor: "background.paper",
                        color: "text.primary"
                    }
                }}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                transformOrigin={{vertical: "top", horizontal: "left"}}
            >
                
                {options.map((option, index) => {

                    const label = typeof option === "string"? option: option.label || "";
                    return(
                    <MenuItem 
                        key={index}
                        onClick={handleItemClick(option)}
                        sx={{whiteSpace: "nowrap"}}>
                        {option.label}
                    </MenuItem>)
                }
            )}
            </Menu>
        </Box>
    )
}