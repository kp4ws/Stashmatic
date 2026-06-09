import GearRow from "@/components/gear-row";
import { GearItem } from "@/types";

type Props = {
  name: string;
  items: GearItem[];
  onEdit: (item: GearItem) => void;
  onDelete: (item: GearItem) => void;
};

export default function CategoryGroup({ name, items, onEdit, onDelete }: Props) {
  return (
    <div>
      {/* CATEGORY HEADER */}
      <div className="bg-emerald-600 px-4 py-3 flex justify-between items-center w-full">
        <h3 className="text-white font-bold uppercase text-sm tracking-wider">
          {name}
        </h3>
        <div className="text-gray-50 text-sm">{items.length} items</div>
      </div>

      {/* GEAR ITEM LIST */}
      <div className="bg-white divide-y divide-gray-100">
        {/* GEAR ITEMS */}
        {items.length === 0 ? (
          <p className="px-4 py-3 text-gray-400 text-sm italic">No items yet</p>
        ) : (
          items.map((item) => (
            <GearRow
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
