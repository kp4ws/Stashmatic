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
    <div className="rounded-xl overflow-hidden bg-white shadow-md mb-6 border border-emerald-900/10">
      {/* CATEGORY HEADER */}
      <div className="bg-emerald-700 px-5 py-3.5 flex justify-between items-center w-full">
        <h3 className="text-emerald-50 font-bold uppercase text-sm tracking-wider">
          {name}
        </h3>
        <div className="text-emerald-100/90 text-sm font-medium bg-emerald-800/50 px-2.5 py-0.5 rounded-full">{items.length} items</div>
      </div>

      {/* GEAR ITEM LIST */}
      <div className="bg-white divide-y divide-slate-100">
        {/* GEAR ITEMS */}
        {items.length === 0 ? (
          <p className="px-5 py-6 text-slate-400 text-sm italic text-center">No items yet</p>
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
