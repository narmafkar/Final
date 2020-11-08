import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import Link from "next/link";

function MenuItem(props) {
  return (
    <ListItem button style={{ marginBottom: "25px" }}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <Link href={props.address}>
        <ListItemText primary={props.text} style={{ marginLeft: "15px" }} />
      </Link>
    </ListItem>
  );
}

export function CustomMenu({ drawerIsOpen, toggleDrawer }) {
  return (
    <Drawer anchor={"right"} open={drawerIsOpen} onClose={toggleDrawer}>
      <List
        onClick={toggleDrawer}
        style={{ width: 250, fontFamily: "'Cairo', sans-serif" }}
      >
        <MenuItem
          address={"/userProfile"}
          icon={<HomeIcon />}
          text={"صفحه اصلی"}
        />
        <MenuItem
          address={"/contactUs"}
          icon={<CallIcon />}
          text={"تماس با ما"}
        />
        <MenuItem
          address={"http://narmafkar.com"}
          icon={<InfoIcon />}
          text={"درباره ما"}
        />
        <MenuItem
          address={"/changePassword"}
          icon={<SettingsIcon />}
          text={"تنظیمات"}
        />
      </List>
    </Drawer>
  );
}
