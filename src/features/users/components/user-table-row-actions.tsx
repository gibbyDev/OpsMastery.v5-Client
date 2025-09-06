"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { User } from "../hooks/useUsers";

type Props = {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
};

export default function UserTableRowActions({ user, onEdit, onDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Open actions">
          <Icons.ellipsis className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onEdit?.(user)}
          className="flex items-center gap-2"
        >
          <Icons.userPen className="w-4 h-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete?.(user)}
          className="flex items-center gap-2 text-red-600"
        >
          <Icons.trash className="w-4 h-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}