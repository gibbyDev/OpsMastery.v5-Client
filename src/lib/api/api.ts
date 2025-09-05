import api from "./axios";
import axios from "./axios";

// Refactored searchUsers function
export const searchUsers = async (query: string, accessToken?: string) => {
  const res = await api.get("/users/search", {
    params: { q: query },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    withCredentials: true,
  });
  return Array.isArray(res.data) ? res.data : [];
};

// Add this to your exports:
export async function getTickets() {
  const res = await axios.get("/tickets");
  // Map API response to frontend shape
  return (Array.isArray(res.data) ? res.data : res.data.tickets).map((t: any) => ({
    id: String(t.ID),
    title: t.Title,
    description: t.Description,
    status: t.Status,
    priority: t.Priority,
    reporter: t.Reporter?.Name || "",
    assignee: t.Assignee?.Name || "",
    client: t.Client?.Name || "",
    createdAt: t.CreatedAt,
  }));
}

// Add or update this function:
export async function getUsers() {
  const res = await axios.get("/users");
  // Map API response to frontend shape
  return (Array.isArray(res.data) ? res.data : res.data.users).map((u: any) => ({
    id: String(u.ID),
    name: u.Name,
    email: u.Email,
    username: u.Username,
    role: u.Role,
    status: u.Active ? "Active" : "Inactive",
  }));
}

/**
 * Create a new ticket.
 * @param ticket { title, description, priority, status, ReporterID, AssigneeID, ClientID }
 */
export async function createTicket(ticket: {
  title: string;
  description: string;
  priority: string;
  status: string;
  ReporterID: number;
  AssigneeID: number;
  ClientID: number;
}) {
  const res = await axios.post("/ticket", ticket);
  return res.data;
}