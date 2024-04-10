// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe("Orders API Service", () => {
//   it("should GET all orders", (done) => {
//     chai
//       .request("http://localhost:3000")
//       .get("/api/orders")
//       .end((err, resp) => {
//         expect(resp).to.have.status(200);
//         expect(resp.body).to.be.an("array");
//         expect(resp.body.length).to.not.equal(0);
//         done();
//       });
//   });

//   it("should POST a new order", (done) => {
//     const newOrder = {
//       drink_id: 1,
//       quantity: 2,
//     };
//     chai
//       .request("http://localhost:3000")
//       .post("/api/orders")
//       .send(newOrder)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equal("Order created");
//         done();
//       });
//   });

//   it("should GET a single order", (done) => {
//     chai
//       .request("http://localhost:3000")
//       .get("/api/orders/1")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an("object");
//         done();
//       });
//   });

//   it("should PUT update an order", (done) => {
//     const updatedOrder = {
//       drink_id: 2,
//       quantity: 3,
//     };
//     chai
//       .request("http://localhost:3000")
//       .put("/api/orders/1")
//       .send(updatedOrder)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equal("Order updated");
//         done();
//       });
//   });

//   it("should DELETE an order", (done) => {
//     chai
//       .request("http://localhost:3000")
//       .delete("/api/orders/1")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equal("Order deleted");
//         done();
//       });
//   });
// });
