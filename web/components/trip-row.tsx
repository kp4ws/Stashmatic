import { Trip } from "@/types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  trip: Trip;
  onEdit: (item: Trip) => void;
  onDelete: (item: Trip) => void;
  onOpen: (item: Trip) => void;
};

export default function TripRow({ trip, onEdit, onDelete, onOpen }: Props) {
  return (
    <div
      className="px-4 py-3 flex justify-between items-center w-full"
      onClick={() => onOpen(trip)}
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-0.5">
        <p className="font-medium text-sm">{trip.name}</p>
        <p className="text-gray-400 text-xs">{trip.description}</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
          Ready
        </span> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(trip)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(trip)}
              className="text-red-500 focus:text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
