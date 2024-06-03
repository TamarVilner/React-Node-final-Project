import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUser } from '../store/slices/userSlice';

export default function Users() {

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const allUsers = useSelector(u => u.user.allUsers);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {allUsers && allUsers.map((u, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <Divider variant="inset" component="li" />}  {/* מציג מחיצה רק אם זה לא הפריט הראשון */}
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={u.imgUrl} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={u.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        password: {u.password} telephone: {u.telephone} tz: {u.tz}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </React.Fragment>
            ))}
        </List>
    );
}
