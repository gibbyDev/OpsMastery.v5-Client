const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

function getAuthHeaders(accessToken?: string): Record<string, string> {
  return accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};
}

export async function fetchTickets(search?: string, accessToken?: string) {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  const url = `${API_URL}/tickets${params}`;
  const res = await fetch(url, {
    headers: getAuthHeaders(accessToken),
    credentials: "include",
  });
  if (!res.ok) throw new Error('Failed to fetch tickets');
  const data = await res.json();
  return Array.isArray(data) ? data : data.tickets;
}

export async function getTicketById(ticketId: string, accessToken?: string) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}`, {
    headers: getAuthHeaders(accessToken),
    credentials: "include",
  });
  if (!res.ok) throw new Error('Failed to fetch ticket');
  return await res.json();
}