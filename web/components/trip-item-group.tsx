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
    <div>
      {/* CATEGORY HEADER */}
      <div className="bg-emerald-600 px-4 py-3 flex justify-between items-center w-full">
        <h3 className="text-white font-bold uppercase text-sm tracking-wider">
          {name}
        </h3>
        {/* <div className="text-gray-50 text-sm">{items.length} items</div> */}
      </div>

      {/* TRIP ITEM LIST */}
      <div className="bg-white divide-y divide-gray-100">
        {/* TRIP ITEMS */}
        {items.length === 0 ? (
          <div>
            <Button
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={() => onAdd(categoryId)}
            >
              <Plus size={18} />
              Add {name}
            </Button> 
            {/* <p className="px-4 py-3 text-gray-400 text-sm italic">No items yet</p> */}
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
