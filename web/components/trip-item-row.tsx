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
  const weightLb =
    item.recorded_weight > 0 ? (item.recorded_weight / 453.592).toFixed(1) : null;

  return (
    <div className="px-4 py-3 flex justify-between items-center w-full group hover:bg-slate-50 transition-colors">
      {/* ITEM LEFT SIDE (description) */}
      <div className="flex flex-col gap-0.5">
        <p className="font-medium text-slate-800 text-sm transition-colors">{item.recorded_name}</p>
        <p className="text-slate-500 text-xs truncate max-w-[200px] sm:max-w-xs md:max-w-md">Qty: {item.quantity}</p>
      </div>

      {/* ITEM RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {!weightLb ? (
          <span className="text-amber-500/80 text-xs bg-amber-50 px-2 py-0.5 rounded-full font-medium">No weight</span>
        ) : (
          <span className="text-slate-500 text-xs bg-slate-100 px-2 py-0.5 rounded-full font-medium">{weightLb} lb</span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 hover:bg-slate-200/50">
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>
              Edit
            </DropdownMenuItem>
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
