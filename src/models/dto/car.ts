import { UserResponse } from "./user";
interface CarRequest {
  car_name: string;
  car_rent_price: number;
  car_size: string;
  car_img?: Express.Multer.File;
  user_id?: number;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
interface CarResponse {
  id: number;
  car_name: string;
  car_rent_price: number;
  car_size: string;
  car_img?: string;
  created_by: UserResponse;
  updated_by: UserResponse;
  deleted_by: UserResponse;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { CarResponse, CarRequest };
