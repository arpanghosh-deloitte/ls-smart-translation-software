export interface PackageData {
  id: string;
  projectId: string;
  name: string;
  status: "Active" | "Inactive";
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

export const initialPackages: PackageData[] = [
  {
    id: "1",
    projectId: "1",
    name: "Package 1-A",
    status: "Active",
    createdDate: "2024-03-01",
    createdBy: "John Doe",
    updatedDate: "2024-03-01",
    updatedBy: "Jane Doe",
  },
  {
    id: "2",
    projectId: "1",
    name: "Package 1-B",
    status: "Active",
    createdDate: "2024-03-02",
    createdBy: "Jane Doe",
    updatedDate: "2024-03-02",
    updatedBy: "John Doe",
  },
  {
    id: "3",
    projectId: "1",
    name: "Package 1-C",
    status: "Inactive",
    createdDate: "2024-03-03",
    createdBy: "John Doe",
    updatedDate: "2024-03-03",
    updatedBy: "Jane Doe",
  },
  {
    id: "4",
    projectId: "2",
    name: "Package 2-A",
    status: "Active",
    createdDate: "2024-03-04",
    createdBy: "Jane Doe",
    updatedDate: "2024-03-04",
    updatedBy: "John Doe",
  },
  {
    id: "5",
    projectId: "3",
    name: "Package 3-A",
    status: "Active",
    createdDate: "2024-03-05",
    createdBy: "John Doe",
    updatedDate: "2024-03-05",
    updatedBy: "Jane Doe",
  },
];
