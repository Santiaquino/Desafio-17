import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import config from "../src/config/config.js";

const expect = chai.expect;
const requester = supertest(`http://localhost:${config.port}`);

describe("Test para las sesiones", () => {
  before(function () {
    mongoose.connect(config.mongo);
  });

  beforeEach(function () {
    mongoose.connection.collection("").deleteMany({});
  });

  after(function () {
    mongoose.connection.close();
    this.timeout(5000);
  });
});
