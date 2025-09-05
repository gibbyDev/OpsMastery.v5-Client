import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import NewTicketForm from "@/features/tickets/components/new-ticket-form";

export const metadata = {
  title: "Dashboard: New Ticket",
};

export default function NewTicketPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <Heading title="Create Ticket" description="Add a new support ticket" />
        <Separator />
        <NewTicketForm />
      </div>
    </PageContainer>
  );
}