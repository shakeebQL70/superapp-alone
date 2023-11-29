import React, { useEffect, useMemo, useState } from 'react'
import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppBarStore } from '../Store/store';
export interface IAppMenuItem {
    name: string;
    link?:string;
    Icon?: any;
    items?: IAppMenuItem[]
} 

const isParent = (items: IAppMenuItem[], pathname: string): boolean => {
    let result = false
    for(const item of items){
      if(item.link === pathname){
        result = true;
      }
      else if(item.items){
        result = isParent(item.items, pathname)
      }
    }

    return result;
}

  const AppMenuItem = (props : IAppMenuItem) => {
    const navigate = useNavigate();
    const { name, Icon, items = [], link } = props
    const location = useLocation();
    const pathname = location.pathname;

    const isActive = pathname === link || isParent(items, pathname)
    
    const isAppBarOpen = useAppBarStore((state) => state.isExpanded)
    const setSideBar = useAppBarStore((state) => state.sideBarAction)
    
    
    const path = useMemo(() => location.pathname.split('/')?.[1] || '', [location])
    const isOpen = path.toLocaleLowerCase() === name.toLocaleLowerCase() && isAppBarOpen
    const [open, setOpen] = useState(isOpen)
    
    const isExpandable = !!items?.length

    function handleClick() {
        setSideBar(true)
        if(isAppBarOpen && isExpandable){
            setOpen(!open)
        }
    }
  
    const MenuItemRoot = (
        <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => link && navigate(link)}
        >
            <ListItemButton selected={isActive} onClick={handleClick}>
                {!!Icon && (
                    <ListItemIcon>
                        <Icon sx={{color: isActive ? '#1976d2' : 'inherit'}} />
                    </ListItemIcon>
                )}
                <ListItemText primary={<Typography sx={{color: isActive ? '#1976d2' : 'inherit', fontWeight: isActive ? 900 : 'normal'}}>{name}</Typography>} inset={!Icon} />
                
                {isExpandable && !open && <ExpandMoreIcon />}
                {isExpandable && open && <ExpandLessIcon />}
            </ListItemButton>
        </ListItem>
    )
  
    const MenuItemChildren = isExpandable && isAppBarOpen ? (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          {items.map((item: IAppMenuItem, index: number) => (
            <AppMenuItem {...item} key={index} />
          ))}
        </List>
      </Collapse>
    ) : null
  
    return (
      <Box bgcolor={open && isAppBarOpen ? "rgba(0,0,0,0.05)" : 'transparent'}>
        {MenuItemRoot}
        {MenuItemChildren}
      </Box>
    )
  }

  export default AppMenuItem
  