"use client";

import { useInventory } from "@/hooks/features/use-inventory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, Plus } from "lucide-react";
import CategoryGroup from "@/components/category-group";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InventoryPage() {
  // const { items, categories, isLoading, error, deleteItem } = useInventory();

  const mockCategories = [
    {
      id: "1",
      title: "Pack",
      is_default: true,
      user_id: "mock-user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
    {
      id: "2",
      title: "Shelter",
      is_default: true,
      user_id: "mock-user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
    {
      id: "3",
      title: "Sleep System",
      is_default: true,
      user_id: "mock-user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
    {
      id: "4",
      title: "Cooking",
      is_default: true,
      user_id: "mock-user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
    {
      id: "5",
      title: "Water Filter",
      is_default: true,
      user_id: "mock-user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
    {
      id: "6",
      title: "Rain Gear",
      is_default: true,
      user_id: "mock-user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
  ];

  const mockItems = [
    {
      id: "1",
      category_id: "1",
      user_id: "mock-user",
      name: "Atmos AG 65",
      brand: "Osprey",
      weight_grams: 2087,
      description: 'Fits torso 18-20"',
      is_consumable: false,
      is_worn: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      category_id: "1",
      user_id: "mock-user",
      name: "Exos 58",
      brand: "Osprey",
      weight_grams: 1315,
      description: null,
      is_consumable: false,
      is_worn: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      category_id: "2",
      user_id: "mock-user",
      name: "Copper Spur HV UL2",
      brand: "Big Agnes",
      weight_grams: 1316,
      description: null,
      is_consumable: false,
      is_worn: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      category_id: "3",
      user_id: "mock-user",
      name: "Revelation 20°",
      brand: "Enlightened Equipment",
      weight_grams: 635,
      description: null,
      is_consumable: false,
      is_worn: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      category_id: "4",
      user_id: "mock-user",
      name: "PocketRocket 2",
      brand: "MSR",
      weight_grams: 0,
      description: "Need fuel canister",
      is_consumable: true,
      is_worn: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "6",
      category_id: "5",
      user_id: "mock-user",
      name: "Sawyer Squeeze",
      brand: "Sawyer",
      weight_grams: 85,
      description: null,
      is_consumable: false,
      is_worn: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "7",
      category_id: "6",
      user_id: "mock-user",
      name: "Marmot PreCip Jacket",
      brand: "Marmot",
      weight_grams: 312,
      description: null,
      is_consumable: false,
      is_worn: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
  const items = mockItems;
  const categories = mockCategories;
  // if (isLoading) {
  //   // TODO: Refactor loading widget
  //   return <p>Loading ...</p>;
  // }

  // if (error) {
  //   // TODO: Refactor error widget
  //   return (
  //     <div className="">
  //       <h2 className="text-white">Failed to load inventory</h2>
  //     </div>
  //   );
  // }

  const handleAdd = () => {};

  return (
    <div className="min-h-screen px-6 py-4 pb-24">
      {/* TODO: Error/Warning bar at top */}
      {/* <div></div> */}
      {/* Inventory Header */}
      <header className="flex justify-between items-center mb-6">
        {/* TODO: Consider hiding page headers on desktop screens */}
        <h1 className="text-lg md:text-4xl text-white font-bold">Inventory</h1>

        {/* IMPORT/EXPORT BUTTONS & FILTER */}
        {/* TODO: Deferred to later version */}
        {/* <div className="flex justify-center items-center">
          <div className="px-4">
            <Button size="lg">Import</Button>
            <Button size="lg">Export</Button>
          </div>

          <Filter color="white" size={24} />
        </div> */}
      </header>

      {/* CATEGORY SECTIONS */}
      <section className="flex flex-col gap-4">
        {/* CATEGORY CARD */}
        {categories.map((category) => {
          const categoryItems = items.filter(
            (item) => item.category_id === category.id,
          );

          return (
            <CategoryGroup
              key={category.id}
              name={category.title}
              items={categoryItems}
            />
          );
        })}
      </section>

      {/* FOOTER SECTION (ADD BUTTON) */}
      <section className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-900 border-t border-emerald-800">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={handleAdd}
              >
                <Plus size={18} />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Gear Item</DialogTitle>
                <DialogDescription>
                  Add a new gear item into your inventory
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue="" />
                </Field>
                {/* TODO: Add gear type dropdown */}
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </section>
    </div>
  );
}
