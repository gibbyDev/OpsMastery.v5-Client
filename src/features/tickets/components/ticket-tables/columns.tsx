export const allColumns = [
  { key: "id", label: "ID", hideByDefault: true },
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "reporter", label: "Reporter" },
  { key: "assignee", label: "Assignee" },
  { key: "client", label: "Client" },
  { key: "createdAt", label: "Created" },
  { key: "actions", label: "Actions", align: "right", alwaysVisible: true },
];

export const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "Closed", label: "Closed" },
  { value: "Resolved", label: "Resolved" },
];

export const priorityOptions = [
  { value: "", label: "All Priorities" },
  { value: "Low", label: "Low" },
  { value: "Normal", label: "Normal" },
  { value: "High", label: "High" },
  { value: "Urgent", label: "Urgent" },
];

export const initialWidths = [80, 160, 220, 120, 120, 120, 120, 120, 120, 100];