import * as React from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  ThemeProvider,
} from "@mui/material/styles";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppBarStore, useUserStore } from "../Store/store";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AppsIcon from "@mui/icons-material/Apps";
import SchoolIcon from "@mui/icons-material/School";
import DevicesIcon from "@mui/icons-material/Devices";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import theme1 from "../theme";
import AppMenuItem, { IAppMenuItem } from "./AppMenuItem";
import { Tooltip } from "@mui/material";
import ContentSkeleton from "UI/contentSkeleton";

type TBreadCrumbs = {
  [key: string]: string;
};

const breadcrumbs: TBreadCrumbs = {
  "/": "",
  "/opms": "OPMS",
  "/project": "Projects",
  "/schools": "Schools",
  "/teachers": "Teacher Details",
  "/students": "Students Details",
  "/employee": "Profile",
  "/mis": "MIS/Office Work",
  "/labusage": "Labusage",
  "/visitors": "Visitors ",
  "/dc": "Dc Visitors",
  "/service": "Service Desk",
  "/teacher-training": "Teacher Training Module"
};

const appMenuItems: IAppMenuItem[] = [
  {
    name: "Dashboard",
    link: "/",
    Icon: SpaceDashboardIcon,
  },
  {
    name: "OPMS",
    Icon: AccountBalanceIcon,
    items: [
      {
        name: "Projects",
        link: "/opms/project",
      },
      {
        name: "Schools",
        link: "/opms/schools",
      },
      {
        name: "Teacher Details",
        link: "/opms/teachers",
      },
      {
        name: "Profile",
        link: "/opms/employee",
      },
      {
        name: "Service Desk",
        link: "/opms/service",
      },
      {
        name: "Teacher Training Module",
        link: "/opms/teacher-training"
      },
      {
        name: "Students",
        items: [
          {
            name: "List",
            link: "/opms/students",
          },
          {
            name: "Details",
            link: "/opms/students/details",
          },
        ],
      },
      {
        name: "Lab Assets",
        items: [
          {
            name: "Asset List",
            link: "/opms/lab-assets",
          },
          {
            name: "Replacement List",
            link: "/opms/lab-assets/replacement",
          },
          {
            name: "Feedback List",
            link: "/opms/lab-assets/feedback",
          },
        ],
      },
      {
        name: "Reports",
        items: [
          {
            name: "Report 1",
            link: "/opms/report1",
          },
          {
            name: "Report 2",
            link: "/opms/report2",
          },
        ],
      },
      {
        name: "Lab Usage",
        items: [
          {
            name: "Theory/Practical/Multimedia",
            link: "/opms/labusage/",
          },
          {
            name: "MIS/Office Work",
            link: "/opms/labusage/mis",
          },
        ],
      },
      {
        name: "Visitors",
        items: [
          {
            name: "Visitors List",
            link: "/opms/visitors/",
          },
          {
            name: "DC Visitors List",
            link: "/opms/visitors/dc",
          },
        ],
      },
      {
        name: "Asset Theft",
        link: "/opms/asset-theft",
      },
      {
        name: "Assets Call Log",
        link: "/opms/asset-call-log",
        items: [
          {
            name: "Assets FAQ",
            link: "/opms/asset-call-log/faq",
          },
        ],
      },
      {
        name: "Content Feedback",
        link: "/opms/content-feedback",
      },
      {
        name: "Uptime Downtime",
        link: "/opms/uptime-downtime",
      },
    ],
  },
  {
    name: "MDM",
    Icon: DevicesIcon,
    items: [
      {
        name: "MDM 1",
        link: "/mdm",
      },
      {
        name: "MDM 2",
        link: "/mdm",
      },
    ],
  },
  {
    name: "EdXpert",
    link: "/edxpert",
    Icon: SchoolIcon,
  },
];

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 2),
  // backgroundColor: theme.palette.primary.main,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Root() {
  const theme = useTheme();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const onLogout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const selectedProject = useUserStore((state) => state.selectedProject);
  const open = useAppBarStore((state) => state.isExpanded);
  const setOpen = useAppBarStore((state) => state.sideBarAction);

  const handleDrawerAction = () => {
    setOpen();
  };

  return (
    <ThemeProvider theme={theme1}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerAction}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box>
                <Typography variant="h6" noWrap component="div" mr={1}>
                  EDIQUE
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  {pathnames.map((value) => {
                    const to = `/${value}`;
                    return (
                      <Typography color="white" key={to}>
                        {breadcrumbs[to]}
                      </Typography>
                    );
                  })}
                </Breadcrumbs>
              </Box>
            </Box>

            <Box display="flex" gap="5px" alignItems="center">
              <Box display="flex" alignItems="center" gap="3px">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={selectedProject.id + ""}
                    onChange={(event: SelectChangeEvent) => {
                      console.log(event.target.value);
                    }}
                    displayEmpty
                    sx={{
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                  >
                    {user?.projectList?.map((project) => (
                      <MenuItem value={project.id + ""} key={project.id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Tooltip title="Notifications">
                <IconButton color="inherit" onClick={() => null} edge="end">
                  <NotificationsOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Profile">
                <IconButton color="inherit" onClick={() => null} edge="end">
                  <AccountCircleOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton color="inherit" onClick={onLogout} edge="end">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Box display="flex" alignItems="center" gap="10px">
              <AppsIcon color="info" />
              <Typography fontWeight="bold" color={theme.palette.primary.main}>
                {" "}
                Project Admin{" "}
              </Typography>
            </Box>
            <IconButton onClick={handleDrawerAction}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List component="nav" disablePadding>
            {appMenuItems.map((item, index) => (
              <AppMenuItem {...item} key={index} />
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "rgb(245, 247, 250)",
            minHeight: "100vh",
          }}
        >
          <DrawerHeader sx={{ bgcolor: "transparent" }} />
          <React.Suspense fallback={<ContentSkeleton />}>
            <Outlet />
          </React.Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
