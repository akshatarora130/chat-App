import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {

    return(
        <>
            <TextField
                variant="outlined"
                placeholder="Search a chat"
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    margin: "10px",
                    width: "93%",
                }}
                // @ts-ignore
                onChange={(e) => {

                }}
            />
            <hr style={{
                marginLeft: "60px",
                marginTop: "10px"
            }}/>
        </>
    )
}

export default SearchBar;