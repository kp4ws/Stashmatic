import { MoreHorizontal } from "lucide-react";

type Props = {
    name: string;
    description: string;
    weight: number;
};

export default function GearRow({name, description, weight} : Props) {
  return (
    <div className="px-4 py-3 flex justify-between items-center w-full">
      {/* ITEM LEFT SIDE (description) */}
      <div className="flex flex-col gap-0.5">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>

      {/* ITEM RIGHT SIDE */}
      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-sm">{weight} lb</span>
        <button className="text-gray-400 p-1">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
