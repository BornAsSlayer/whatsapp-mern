import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Avatar, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className='sidebar__header'>
                <Avatar src='https://yt3.ggpht.com/ytc/AKedOLTituQqBQSvZshTI9-FbvzNeCcbwgqG6-xgzHRa=s900-c-k-c0x00ffffff-no-rj'/>
                <div className='siderbar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        < ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                    <div className='sidebar__searchContainer'>
                        <SearchOutlinedIcon />
                        <input placeholder='Search or Start a new Chat' type="text" />
                        
                    </div>
                </div>
            <div className='sidebar__chats'>
                <SidebarChat /> 
                <SidebarChat /> 
                <SidebarChat /> 
                <SidebarChat /> 
            </div>
        </div>
    )
}

export default Sidebar
