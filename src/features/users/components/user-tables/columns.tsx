export const allColumns = [
  { key: "id", label: "ID", hideByDefault: true },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "username", label: "Username" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions", align: "right", alwaysVisible: true },
];

export const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export const initialWidths = [80, 160, 220, 160, 120, 120, 100];