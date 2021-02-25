import { useState, useContext, useEffect } from "react";
import nookies from 'nookies'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'

import { UserContext } from '../../context/user'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {

    }
})


const AutoCompleteTextField = (props) => {
    const {genCookies} = useContext(UserContext)
    const [theToken, setTheToken] = useState('')
    const [completions, setCompletions] = useState([])
    const [display, setDisplay] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const classes = useStyles()

    const handleAddressChange = async (address) => {
        props.callback(address)
        if(address.length >= 3) {
            try{
                const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search/Autocomplete`, {
                    addr: address,
                    token: theToken === '' ? null : theToken,
                    cookies: genCookies(),
                })

                const data = resp.data
                nookies.set(null, 'jwt_token', data.jwt_token)
                setCompletions(data.completions)
                setTheToken(data.token)
                console.log("setting completions", address);
                setDisplay(true)
            } 
            catch (error) {
                setCompletions([])
                setDisplay(false)
            }
        } else {
            setDisplay(false)
        }
    }
    
    const handleCB = (e, i) => {
        const add = e.target.innerHTML.split('<')[0]
        console.log("callback", e.target.innerHTML.split('<'));
        props.callback(add)
        setDisplay(false)
        setSelectedIndex(i);
    }

    return (
        <div>
             <input
                id="auto"
                autoComplete="off"
                {...props}
                onChange={e => handleAddressChange(e.target.value)}
            />
            { display && (
                <div className="autoContainer">
                <List component="nav" aria-label="main mailbox folders">
                {
                completions
                    .map((value, i) => {
                    return (
                        <ListItem
                            button
                            selected={selectedIndex === i}
                            onClick={(e) => handleCB(e, i)}
                        >
                            {value.name}
                        </ListItem>
                    );
                    })
                }
                </List>
                </div>
            )}
        </div>
    )
}

export default AutoCompleteTextField