// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe("Drinks API Service", () => {
//   it("should GET all drinks", (done) => {
//     chai
//       .request("http://localhost:3000")
//       .get("/api/drinks")
//       .end((err, resp) => {
//         expect(resp).to.have.status(200);
//         expect(resp.body).to.be.an("array");
//         expect(resp.body.length).to.not.equal(0);
//         done();
//       });
//   });

//   it("should GET a single drink", (done) => {
//     const expected = {
//       id: 1,
//       name: "Testing Snake Venom",
//       price: 8.22,
//     };
//     chai
//       .request("http://localhost:3000")
//       .get("/api/drinks/1")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.deep.equal(expected);
//         done();
//       });
//   });

//   it("should POST a new drink", (done) => {
//     const newDrink = {
//       name: "Test Drink",
//       price: 8.0,
//     };
//     chai
//       .request("http://localhost:3000")
//       .post("/api/drinks")
//       .send(newDrink)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equal("Drink added to the menu");
//         done();
//       });
//   });

//   it("should PUT update a drink", (done) => {
//     const updatedDrink = {
//       name: "Updated Drink",
//       price: 9.0,
//     };
//     chai
//       .request("http://localhost:3000")
//       .put("/api/drinks/1")
//       .send(updatedDrink)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equal("Drink updated");
//         done();
//       });
//   });

//   it("should DELETE a drink", (done) => {
//     chai
//       .request("http://localhost:3000")
//       .delete("/api/drinks/1")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equal("Drink deleted from the menu");
//         done();
//       });
//   });
// });
