import { TripItem } from "@/types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  item: TripItem;
  onEdit: (item: TripItem) => void;
  onDelete: (item: TripItem) => void;
};

export default function TripItemRow({ item, onEdit, onDelete }: Props) {
  const weightDisplay =
    item.recorded_weight > 0 ? `${item.recorded_weight.toLocaleString()} g` : null;

  return (
    <div className="flex w-full items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-slate-50">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-sm font-medium text-slate-800 transition-colors">
          {item.recorded_name}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {!weightDisplay ? (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
            No weight
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
            {weightDisplay}
          </span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:bg-slate-200/50 hover:text-slate-600"
            >
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(item)}
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
