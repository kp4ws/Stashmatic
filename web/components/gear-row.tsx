import { GearItem } from "@/types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  item: GearItem;
  onEdit: (item: GearItem) => void;
  onDelete: (item: GearItem) => void;
};

export default function GearRow({ item, onEdit, onDelete }: Props) {
  const weightLb =
    item.weight_grams > 0 ? (item.weight_grams / 453.592).toFixed(1) : null;

  return (
    <div className="px-4 py-3 flex justify-between items-center w-full">
      {/* ITEM LEFT SIDE (description) */}
      <div className="flex flex-col gap-0.5">
        <p className="font-medium text-sm">{item.name}</p>
        <p className="text-gray-400 text-xs">{item.description}</p>
      </div>

      {/* ITEM RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* {!weightLb ? (
          <span className="text-amber-500 text-sm">No weight</span>
        ) : (
          <span className="text-gray-500 text-sm">{item.weight_grams} lb</span>
        )} */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400">
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
