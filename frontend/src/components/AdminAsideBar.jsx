import React, { useState } from "react";
import {Box, Drawer, List, ListItem, ListItemButton, ListItemText} from "@mui/material";

function AdminAsideBar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Drawer variant="permanent" anchor="left" open={open}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default AdminAsideBar;
