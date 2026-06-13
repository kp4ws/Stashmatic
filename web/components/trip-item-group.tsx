import { DialogMode, TripItem } from "@/types";
import TripItemRow from "./trip-item-row";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import TripItemDialog from "./trip-item-dialog";

import { useState } from "react";

type Props = {
  name: string;
  items: TripItem[];
  onEdit: (item: TripItem) => void;
  onDelete: (item: TripItem) => void;
};

export default function TripItemGroup({
  name,
  items,
  onEdit,
  onDelete,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<DialogMode>("add");
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);

  const handleSubmit = async (gearId: string) => {
    if(mode === "edit" && editingItem) {
    }
    else {

    }

    setOpen(false);
    setEditingItem(false);
  };

  const handleOpenAdd = () => {
    setMode("add");
    setEditingItem(null);
    setOpen(true);
  };

  const handleOpenEdit = () => {
    setMode("edit");
    setEditingItem(null);
    setOpen(true);
  };

  return (
    <div>
      {/* CATEGORY HEADER */}
      <div className="bg-emerald-600 px-4 py-3 flex justify-between items-center w-full">
        <h3 className="text-white font-bold uppercase text-sm tracking-wider">
          {name}
        </h3>
        <div className="text-gray-50 text-sm">{items.length} items</div>
      </div>

      {/* TRIP ITEM LIST */}
      <div className="bg-white divide-y divide-gray-100">
        {/* TRIP ITEMS */}
        {items.length === 0 ? (
          <div>
            <Button
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={handleOpenAdd}
            >
              <Plus size={18} />
              Add Gear Item
            </Button> 
            {/* <p className="px-4 py-3 text-gray-400 text-sm italic">No items yet</p> */}
  
            <TripItemDialog
              key={editingItem?.id ?? "add"}
              open={open}
              onOpenChange={setOpen}
              mode={mode}
              editingItem={editingItem}
              gear_items={categories}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
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
