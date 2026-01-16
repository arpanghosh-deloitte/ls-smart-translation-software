export interface OutputData {
  id: string;
  packageId: string;
  name: string;
  status: "Active" | "Inactive";
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

export const initialOutputs: OutputData[] = [
  {
    id: "1",
    packageId: "1",
    name: "Output 1-A-1",
    status: "Active",
    createdDate: "2024-03-01",
    createdBy: "John Doe",
    updatedDate: "2024-03-01",
    updatedBy: "Jane Doe",
  },
  {
    id: "2",
    packageId: "1",
    name: "Output 1-A-2",
    status: "Active",
    createdDate: "2024-03-02",
    createdBy: "Jane Doe",
    updatedDate: "2024-03-02",
    updatedBy: "John Doe",
  },
  {
    id: "3",
    packageId: "2",
    name: "Output 1-B-1",
    status: "Active",
    createdDate: "2024-03-03",
    createdBy: "John Doe",
    updatedDate: "2024-03-03",
    updatedBy: "Jane Doe",
  },
  {
    id: "4",
    packageId: "3",
    name: "Output 1-C-1",
    status: "Inactive",
    createdDate: "2024-03-04",
    createdBy: "Jane Doe",
    updatedDate: "2024-03-04",
    updatedBy: "John Doe",
  },
];
