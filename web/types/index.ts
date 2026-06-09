import {components} from "@/types/schema"

//Users
export type User = components["schemas"]["UserResponse"]
export type UserUpdate = components["schemas"]["UserUpdate"]

//Categories
export type Category = components["schemas"]["CategoryResponse"]
export type CategoryCreate = components["schemas"]["CategoryCreate"]
export type CategoryUpdate = components["schemas"]["CategoryUpdate"]

// Gear Items
export type GearItem = components["schemas"]["GearItemResponse"]
export type GearItemCreate = components["schemas"]["GearItemCreate"]
export type GearItemUpdate = components["schemas"]["GearItemUpdate"]

//Trips
export type Trip = components["schemas"]["TripResponse"]
export type TripCreate = components["schemas"]["TripCreate"]
export type TripUpdate = components["schemas"]["TripUpdate"]

//Trip Items
export type TripItem = components["schemas"]["TripItemResponse"]
export type TripItemCreate = components["schemas"]["TripItemCreate"]
export type TripItemUpdate = components["schemas"]["TripItemUpdate"]

//UI
export type DialogMode = "add" | "edit";