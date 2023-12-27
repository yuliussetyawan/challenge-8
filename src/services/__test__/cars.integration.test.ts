import CarsService from "../cars";
import CarsRepo from "../../repositories/cars";

describe("GET Cars", () => {
  it("return car data", async () => {
    const carResponse = {
      cars: [
        {
          id: 1,
          car_name: "BMW M5",
          car_categories: "small",
          car_size: "small",
          car_rent: "rent",
          car_img: "car.jpg",
          created_by: {
            id: 1,
            username: "admin",
            email: "admin@mail.com",
          },
          updated_by: {
            id: 1,
            username: "admin",
            email: "admin@mail.com",
          },
          deleted_by: {
            id: 1,
            username: "admin",
            email: "admin@mail.com",
          },
        },
      ],
    };
    const testCarRepo = new CarsRepo();
    testCarRepo.getCars= jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCarsResponse));

    const carService = new CarsService(testCarRepo);

    const carsData = await carService.getCars();

    expect(carsData).toEqual(carResponse);
  });
});
