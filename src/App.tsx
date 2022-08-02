import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import JSONInput from "./components/JSONInput";
import { isNil } from "lodash";
import CVRender from "./components/CVRender";
import { PDFViewer } from "@react-pdf/renderer";
import defaultJson from "./assets/default.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const defaultJsonString: string = JSON.stringify(defaultJson, null, 4);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;
enum navItems {
    IMPORT_JSON = "Import JSON",
    EXPORT_JSON = "Export JSON",
}

export default function App(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerClick = (title: string) => {
        switch (title) {
            case navItems.IMPORT_JSON: {
                console.log("import json");
                fileInputRef?.current?.click();
                break;
            }

            case navItems.EXPORT_JSON: {
                console.log("export json");
                exportJson();
                break;
            }
        }
    };

    /**
     * handle readfile
     */
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [JSONFileContent, setJSONFileContent] =
        React.useState<string>(defaultJsonString);
    const exportJson = () => {
        try {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSONFileContent
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = "cv.json";
            link.click();
        } catch (error) {
            alert(`there is an error in your json, unable to export`);
        }
    };
    const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNil(event?.target?.files?.[0])) {
            try {
                const file = event?.target?.files?.[0];
                console.log(file);
                const reader = new FileReader();
                reader.addEventListener("load", (event) => {
                    try {
                        const result = event?.target?.result;
                        setJSONFileContent(
                            JSON.stringify(
                                JSON.parse(result as string),
                                null,
                                4
                            )
                        );
                    } catch (err) {
                        alert("file not valid");
                    }
                });
                reader.readAsText(file as Blob);
            } catch (err) {
                alert("file not valid");
            }
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            console.log(event?.target?.value);
            setJSONFileContent(event?.target?.value);
        } catch (e) {}
    };
    /**
     *
     */

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {Object.values(navItems).map((item: string) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        MUI
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {Object.values(navItems).map((item: string) => (
                            <Button
                                key={item}
                                sx={{ color: "#fff" }}
                                onClick={() => handleDrawerClick(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    p: 3,
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Toolbar />

                <div>
                    <JSONInput
                        value={JSONFileContent}
                        handleChange={handleChange}
                    ></JSONInput>
                </div>

                <div className="flex-1">
                    {defaultJsonString && (
                        <PDFViewer className="w-full h-full">
                            <CVRender value={JSONFileContent}></CVRender>
                        </PDFViewer>
                    )}
                </div>
                <input
                    id="upload"
                    ref={fileInputRef}
                    type="file"
                    accept="application/JSON"
                    className="hidden"
                    onChange={readFile}
                />
            </Box>
        </Box>
    );
}
