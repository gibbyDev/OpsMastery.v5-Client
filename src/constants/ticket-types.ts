export type Ticket = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Title: string;
  Description: string;
  ReporterID: number;
  Reporter: any;
  AssigneeID: number;
  Assignee: any;
  ClientID: number;
  Client: any;
  Status: string;
  Priority: string;
  Chats: any;
};