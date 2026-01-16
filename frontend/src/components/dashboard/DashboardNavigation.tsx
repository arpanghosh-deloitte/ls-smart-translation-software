import { Tabs, Tab, Box } from "@mui/material";
import React from "react";

interface DashboardNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs
        value={currentView}
        onChange={(_, newValue) => onViewChange(newValue)}
        aria-label="Dashboard views"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Manage Projects" value="projects" />
        <Tab label="Manage Packages" value="packages" />
        <Tab label="Manage Output" value="files" />
      </Tabs>
    </Box>
  );
};

export default DashboardNavigation;
