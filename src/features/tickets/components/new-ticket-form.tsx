"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createTicket } from "@/lib/api/api";
import { useAuth } from "@/hooks/useAuth";

const ticketSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  priority: z.enum(["Low", "Normal", "High", "Urgent"]),
  status: z.enum(["Open", "In Progress", "Closed", "Resolved"]).default("Open"),
  ReporterID: z.coerce.number().min(1, "Reporter ID is required"),
  AssigneeID: z.coerce.number().min(1, "Assignee ID is required"),
  ClientID: z.coerce.number().min(1, "Client ID is required"),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

export default function NewTicketForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      priority: "Normal",
      status: "Open",
      ReporterID: user?.id ? Number(user.id) : undefined,
    },
  });

  const onSubmit = async (data: TicketFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createTicket(data);
      setSuccess("Ticket created!");
      reset();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to create ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-lg w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Title" {...register("title")} disabled={loading} />
      {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

      <Textarea placeholder="Description" {...register("description")} disabled={loading} />
      {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

      <div>
        <label className="block mb-1 text-sm font-medium">Priority</label>
        <select className="w-full border rounded px-2 py-1" {...register("priority")} disabled={loading}>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
        {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Status</label>
        <select className="w-full border rounded px-2 py-1" {...register("status")} disabled={loading}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
          <option value="Resolved">Resolved</option>
        </select>
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </div>

      <Input
        placeholder="Reporter ID"
        type="number"
        {...register("ReporterID", { valueAsNumber: true })}
        disabled={loading}
      />
      {errors.ReporterID && <p className="text-sm text-red-500">{errors.ReporterID.message}</p>}

      <Input
        placeholder="Assignee ID"
        type="number"
        {...register("AssigneeID", { valueAsNumber: true })}
        disabled={loading}
      />
      {errors.AssigneeID && <p className="text-sm text-red-500">{errors.AssigneeID.message}</p>}

      <Input
        placeholder="Client ID"
        type="number"
        {...register("ClientID", { valueAsNumber: true })}
        disabled={loading}
      />
      {errors.ClientID && <p className="text-sm text-red-500">{errors.ClientID.message}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Ticket"}
      </Button>
      {success && <p className="text-green-600 text-sm">{success}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}