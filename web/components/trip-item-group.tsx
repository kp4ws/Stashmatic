import {TripItem } from "@/types";
import TripItemRow from "./trip-item-row";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

type Props = {
  name: string;
  categoryId: string;
  items: TripItem[];
  onAdd: (categoryId: string) => void;
  onEdit: (item: TripItem) => void;
  onDelete: (item: TripItem) => void;
};

export default function TripItemGroup({
  name,
  categoryId,
  items,
  onAdd,
  onEdit,
  onDelete,
}: Props) {

  return (
    <div className="mb-6 overflow-hidden rounded-xl bg-emerald-50 shadow-sm">
      <div className="bg-emerald-700 px-5 py-3.5 flex justify-between items-center w-full">
        <h3 className="text-emerald-50 font-bold uppercase text-sm tracking-wider">
          {name}
        </h3>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-500 text-white"
          onClick={() => onAdd(categoryId)}
        >
          <Plus size={16} className="mr-1" />
          Add
        </Button>
      </div>

      <div className="bg-emerald-50 divide-y divide-slate-100">
        {items.length === 0 ? (
          <div className="p-4 text-center text-slate-500 italic text-sm">
            No items selected
          </div>
        ) : (
          items.map((item) => (
            <TripItemRow
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
