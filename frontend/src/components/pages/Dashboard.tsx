import { useState } from "react";
import { Box } from "@mui/material";
import ProjectList from "../dashboard/project/ProjectList";
import PackageList from "../dashboard/packages/PackageList";
import OutputList from "../dashboard/output/OutputList";
import DashboardNavigation from "../dashboard/DashboardNavigation";
import DashboardBreadcrumbs from "../dashboard/Breadcrumbs";

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const handleViewPackages = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView("packages");
  };

  const handleViewOutput = (packageId: string) => {
    setSelectedPackageId(packageId);
    setCurrentView("files");
  };

  const getBreadcrumbs = () => {
    if (currentView === "projects") {
      return [{ label: "My Dashboard" }];
    } else if (currentView === "packages") {
      return [{ label: "My Dashboard" }, { label: "Packages" }];
    } else if (currentView === "files") {
      return [{ label: "My Dashboard" }, { label: "Output" }];
    }
    return [{ label: "My Dashboard" }];
  };

  return (
    <Box>
      <DashboardBreadcrumbs items={getBreadcrumbs()} />
      <DashboardNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      {currentView === "projects" && <ProjectList onViewPackages={handleViewPackages} />}
      {currentView === "packages" && <PackageList projectId={selectedProjectId} onViewOutput={handleViewOutput} />}
      {currentView === "files" && <OutputList packageId={selectedPackageId} />}
    </Box>
  );
}