import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import config from "../src/config/config.js";

const expect = chai.expect;
const requester = supertest(`http://localhost:${config.port}`);

describe("Test para los productos", () => {
  before(function () {
    mongoose.connect(config.mongo);
  });

  beforeEach(function () {
    mongoose.connection.collection("products").deleteMany({});
  });

  after(function () {
    mongoose.connection.close();
    this.timeout(5000);
  });

  it("Test para el guardado de un producto en la DB", async () => {
    const product = {
      title: "jostick",
      description: "este es un jostick de tal y tal ...",
      code: "HG8J7",
      price: 20000,
      status: true,
      stock: 200,
      category: "tecnology",
      thumbnail: "[]",
    };

    const response = await requester.post("/api/products").send(product);

    expect(response._body.payload.title).equal(product.title);
    expect(response._body).to.have.property("status").equal("success!");
  });

  it("Test para actualizar un producto en la DB", async () => {
    const response = await requester
      .put("/api/products/6464f13f3c8407551e843ede")
      .send({ title: "jostick play 5", stock: 20 });

    expect(response._body).to.have.property("status").equal("success!");
  });

  it("Test para eliminar un producto de la DB", async () => {
    const response = await requester.delete(
      "/api/products/6464f13f3c8407551e843ede"
    );

    expect(response._body).to.have.property("status").equal("success!");
  });
});
