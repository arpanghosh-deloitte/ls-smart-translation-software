export interface ProjectData {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

export const initialProjects: ProjectData[] = [
  {
    id: "1",
    name: "Project 1",
    status: "Active",
    createdDate: "2024-03-01",
    createdBy: "John Doe",
    updatedDate: "2024-03-01",
    updatedBy: "Jane Doe",
  },
  {
    id: "2",
    name: "Project 2",
    status: "Inactive",
    createdDate: "2024-03-02",
    createdBy: "Jane Doe",
    updatedDate: "2024-03-02",
    updatedBy: "John Doe",
  },
  {
    id: "3",
    name: "Project 3",
    status: "Active",
    createdDate: "2024-03-03",
    createdBy: "John Doe",
    updatedDate: "2024-03-03",
    updatedBy: "Jane Doe",
  },
  {
    id: "4",
    name: "Project 4",
    status: "Inactive",
    createdDate: "2024-03-04",
    createdBy: "Jane Doe",
    updatedDate: "2024-03-04",
    updatedBy: "John Doe",
  },
  {
    id: "5",
    name: "Project 5",
    status: "Active",
    createdDate: "2024-03-05",
    createdBy: "John Doe",
    updatedDate: "2024-03-05",
    updatedBy: "Jane Doe",
  },
  {
    id: "6",
    name: "Project 6",
    status: "Active",
    createdDate: "2024-03-05",
    createdBy: "John Doe",
    updatedDate: "2024-03-05",
    updatedBy: "Jane Doe",
  },
];
