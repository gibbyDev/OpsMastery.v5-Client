"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { allColumns } from "./user-tables/columns";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  uniqueRoles: string[];
  statusOptions: { value: string; label: string }[];
  showColumns: Record<string, boolean>;
  setShowColumns: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

export default function UsersTableToolbar({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
  uniqueRoles,
  statusOptions,
  showColumns,
  setShowColumns,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />
      <select
        className="border rounded px-2 py-1"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">All Roles</option>
        {uniqueRoles.map((r) => (
          <option key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </option>
        ))}
      </select>
      <select
        className="border rounded px-2 py-1"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            Columns
            <ChevronDown className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <div className="flex flex-col gap-1">
            {allColumns
              .filter((col) => !col.alwaysVisible)
              .map((col) => (
                <label
                  key={col.key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={showColumns[col.key]}
                    onCheckedChange={(checked) =>
                      setShowColumns((prev) => ({
                        ...prev,
                        [col.key]: !!checked,
                      }))
                    }
                  />
                  <span>{col.label}</span>
                </label>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}