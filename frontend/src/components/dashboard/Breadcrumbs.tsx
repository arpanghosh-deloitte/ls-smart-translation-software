import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface DashboardBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const DashboardBreadcrumbs = ({ items }: DashboardBreadcrumbsProps) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ mb: 2 }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography key={index} color="#000" fontWeight={600}>
            {item.label}
          </Typography>
        ) : (
          <Typography
            key={index}
            component="span"
            color="#86BC25"
            fontWeight={600}
            sx={{
              cursor: item.onClick ? "pointer" : "default",
              textDecoration: "none",
              "&:hover": item.onClick ? { textDecoration: "underline" } : {},
            }}
            onClick={item.onClick}
          >
            {item.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default DashboardBreadcrumbs;
