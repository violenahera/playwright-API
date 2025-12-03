import { test, expect } from "@playwright/test";
import { describe } from "node:test";
import { ApiLogger } from "../utils/apiLogger";
import addPetJSON from "../payloads/pet.json" with {type: "json"};
import { Pet } from "../utils/type";


let log= new ApiLogger();


test.describe("Pets", async () => {
  test("Get all pet", async ({ request }) => {
    const response =await request.get("store/inventory");
    await  expect(response).toBeOK;
    log.log("GET", response);
  });
  test("Get pet with id=5", async ({ request }) => {
    const response =await request.get("pet/5");
    await  expect(response).toBeOK;
    log.log("GET", response);
  });
  test("Delete pet with id=5", async ({ request }) => {
    const response =await request.delete("pet/2");
    await  expect(response).toBeOK;
    log.log("DELETE", response);
  });
  test("Search by status", async ({ request }) => {
    const requestOption = {
      params: {
        status: "available",
      },    
    }
    const response =await request.get("pet/findByStatus", requestOption);
    await  expect(response).toBeOK;
    log.log("GET", response);
  });
   test("Add a new pet", async ({ request }) => {
    const requestOption = {
          data: addPetJSON,     
    }
    const response =await request.post("pet", requestOption);
    await  expect(response).toBeOK;
    log.log("POST", response);
    const petResponse= await (response.json()) as  Pet;
    console.log(petResponse.name);
    console.log(JSON.stringify(petResponse,null,2));    
  });
});
