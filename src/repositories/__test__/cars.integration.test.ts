import CarsRepo from "../cars";
import { Car } from "../../models/entity/car";


describe("get cars", () => {
  it("return car data", async () => {
    const newCarData: Car = {
      id: 1,
      car_name: "BMW M5",
      car_rentperday: "rent",
      car_categories: "small",
      car_size: "small",
      car_img: "car.jpg",
    };
    const createdCar = await CarsRepo.createCar(newCarData);
    const showCar = await CarsRepo.getCarsById(createdCar.id as number);
    await CarsRepo.deleteCarById(createdCar.id as number, 2);

    expect(showCar[0].id).toEqual(createdCar.id);
    expect(showCar[0].car_name).toEqual(newCarData.car_name);
    expect(showCar[0].car_rentperday).toEqual(newCarData.car_rentperday);
    expect(showCar[0].car_categories).toEqual(newCarData.car_categories);
    expect(showCar[0].car_size).toEqual(newCarData.car_size);
    expect(showCar[0].car_img).toEqual(newCarData.car_img);
  });
});


describe("post cars", () => {
  it("create new car", async () => {
    const newCarData: Car = {
      car_name: "BMW M5",
      car_rentperday: "rent",
      car_categories: "small",
      car_size: "small",
      car_img: "car.jpg",
    };
    const postCar = await CarsRepo.createCar(newCarData);
    expect(postCar).toBeDefined();
    expect(postCar.id).toBeDefined();
    expect(postCar.car_name).toEqual(newCarData.car_name);
    expect(postCar.car_categories).toEqual(newCarData.car_categories);
    expect(postCar.car_size).toEqual(newCarData.car_size);
    expect(postCar.status_rental).toEqual(newCarData.status_rental);
    expect(postCar.car_img).toEqual(newCarData.car_img);

    await CarsRepo.deleteCarById(postCar.id as number, 2);
  });
});


describe("delete cars", () => {
  it("delete car data", async () => {
    const removedCar: Car = {
      car_name: "BMW M5",
      car_rentperday: "rent",
      car_categories: "small",
      car_size: "small",
      car_img: "car.jpg",
    };

    const savedCar = await CarsRepo.createCar(removedCar);
    const discardCar = await CarsRepo.deleteCarById(
      savedCar.id as number,
      26
    );
    expect(discardCar).toBeDefined();
  });
});


describe("update cars", () => {
  it("update car data", async () => {
    const currentCar: Car = {
      car_name: "BMW M5",
      car_rentperday: "rent",
      car_categories: "small",
      car_size: "small",
      car_img: "car.jpg",
    };

    const savedCar = await CarsRepo.createCar(currentCar);
    const modifiedCarData: Car = {
      car_name: "BMW M5",
      car_rentperday: "rent",
      car_categories: "small",
      car_size: "small",
      car_img: "car.jpg",
    };

    const updatedCar = await CarsRepo.updateCarById(
      savedCar.id as number,
      modifiedCarData
    );

    const retrievedUpdatedCar = await CarsRepo.getCarsById(
      savedCar.id as number
    );

    expect(retrievedUpdatedCar).toBeDefined();
    expect(retrievedUpdatedCar[0].id).toEqual(savedCar.id);
    expect(retrievedUpdatedCar[0].car_name).toEqual(modifiedCarData.car_name);
    expect(retrievedUpdatedCar[0].car_rentperday).toEqual(
      modifiedCarData.car_rentperday
    );
    expect(retrievedUpdatedCar[0].car_categories).toEqual(
      modifiedCarData.car_categories
    );
    expect(retrievedUpdatedCar[0].car_size).toEqual(modifiedCarData.car_size);
    expect(retrievedUpdatedCar[0].car_img).toEqual(modifiedCarData.car_img);

    await CarsRepo.deleteCarById(updatedCar?.id as number, 2);
  });
});