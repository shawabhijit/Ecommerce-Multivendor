import { Divider, ListItem, ListItemText } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

type drawerListProps = {
    menu: menuItem[];
    menu2: menuItem[];
    toogleDrawer: () => void
}

type menuItem = {
    name: string;
    path: string;
    icon: string;
    activeIcon: any;
}

const DrawerList = ({ menu, menu2, toogleDrawer }: drawerListProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className='h-full'>
            <div className='flex flex-col justify-between h-full w-[300px] border-r border-r-gray-500 py-5'>
                <div className='space-y-2'>
                    {
                        menu.map((item, index) => (
                            <div onClick={() => navigate(item.path)} className='pr-9 hover:cursor-pointer' key={index}>
                                <p className={`${item.path == location.pathname ? "bg-teal-500 text-white" : "text-teal-500"} 
                                flex items-center px-5 py-3 rounded-r-full gap-4`}>
                                    <ListItem sx={{ width: "30px" }}>
                                        {
                                            item.path == location.pathname ? item.activeIcon : item.icon
                                        }
                                    </ListItem>
                                    <ListItemText primary={item.name} />
                                </p>
                            </div>
                        ))
                    }
                </div>
                <Divider />
                <div className='space-y-2 '>
                    {
                        menu2.map((item, index) => (
                            <div onClick={() => navigate(item.path)} className='pr-9 hover:cursor-pointer' key={index}>
                                <p className={`${item.path == location.pathname ? "bg-teal-500 text-white" : "text-teal-500"} 
                                flex items-center px-5 py-3 rounded-r-full gap-4`}>
                                    <ListItem sx={{ width: "30px" }}>
                                        {
                                            item.path == location.pathname ? item.activeIcon : item.icon
                                        }
                                    </ListItem>
                                    <ListItemText primary={item.name} />
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DrawerList