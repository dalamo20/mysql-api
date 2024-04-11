const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Orders API Service", () => {
  // it("should GET all orders", (done) => {
  //   chai
  //     .request("http://localhost:3000")
  //     .get("/api/orders")
  //     .end((err, resp) => {
  //       expect(resp).to.have.status(200);
  //       expect(resp.body).to.be.an("array");
  //       expect(resp.body.length).to.not.equal(0);
  //       done();
  //     });
  // });
  // it.skip("should POST a new order", (done) => {
  //   const newOrder = {
  //     drink_id: 1,
  //     quantity: 6,
  //   };
  //   chai
  //     .request("http://localhost:3000")
  //     .post("/api/orders")
  //     .send(newOrder)
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body.message).to.equal("Order created");
  //       done();
  //     });
  // });
  // it("should GET a single order", (done) => {
  //   const expected = [
  //     {
  //       id: 1,
  //       drink_id: 4,
  //       quantity: 3,
  //       total_price: 18.00, //careful, each time i save a zero disappears and I must add it again. Otherwise this is a Double
  //       created_at: "2024-03-29T17:19:44.000Z",
  //     },
  //   ];
  //   chai
  //     .request("http://localhost:3000")
  //     .get("/api/orders/1")
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.deep.equal(expected);
  //       done();
  //     });
  // });
  // it("should PUT update an order", (done) => {
  //   const updatedOrder = {
  //     drink_id: 3,
  //     quantity: 2,
  //   };
  //   chai
  //     .request("http://localhost:3000")
  //     .put("/api/orders/9")
  //     .send(updatedOrder)
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });
  // it("should DELETE an order", (done) => {
  //   chai
  //     .request("http://localhost:3000")
  //     .delete("/api/orders/7")
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.be.an("object");
  //       expect(Object.keys(res.body).length).to.equal(1); //this one is tricky but it works. expected not matching actual
  //       done();
  //     });
  // });
});
