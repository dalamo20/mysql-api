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
//     const expected = [
//       {
//         id: 1,
//         name: "Updated Drink",
//         price: 9.00, //careful, each time i save a zero disappears and I must add it again. Otherwise this is a Double
//       },
//     ];
//     chai
//       .request("http://localhost:3000")
//       .get("/api/drinks/1")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.deep.equal(expected);
//         done();
//       });
//   });

//   it.skip("should POST a new drink", (done) => {
//     const newDrink = {
//       name: "Drink Special",
//       price: 8.00,
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
//       name: "Mojito",
//       price: 10.05,
//     };
//     chai
//       .request("http://localhost:3000")
//       .put("/api/drinks/5")
//       .send(updatedDrink)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });

//   it("should DELETE a drink", (done) => {
//     chai
//       .request("http://localhost:3000")
//       .delete("/api/drinks/6")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an("object");
//         expect(Object.keys(res.body).length).to.equal(1); //this one is tricky but it works. expected not matching actual
//         done();
//       });
//   });
// });
