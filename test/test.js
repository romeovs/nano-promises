import { db, expect, reset } from "./instrument";
import Lab from "lab";

var lab = Lab.script();
var {describe, it} = lab;
export { lab };

var id = "baz";
var dummy = {
    foo: "bar"
};
var bulkDummy = {
    docs: [{
        _id: "one",
        foo: "bar"
    }, {
        _id: "two",
        foo: "baz"
    }]
};

describe("get", function () {
    lab.before((arg)=> {
        console.log("reset");
        reset(arg);
    });

    it("should insert one item", function (done) {
        var insertion = db.insert(dummy, id);

        expect(insertion).to
            .not.be.rejected;

        insertion.then(([body, header])=> {
            expect(body.ok).to.equal(true);
            done();
        });
    });

    it("should be able to fetch one item", function (done) {
        var lookup = db.get(id);

        expect(lookup).to
            .not.be.rejected;

        lookup.then(([body, header])=> {
            expect(body._id).to.equal(id);
            done();
        });
    });

    it("should be able to fetch one item", function (done) {
        var fetchRevs = db.fetchRevs({
            keys: [id]
        });

        expect(fetchRevs).to
            .not.be.rejected;

        fetchRevs.then(([body, header])=> {
            expect(body.rows.length).to.equal(1);
            expect(body.rows[0].id).to.equal(id);
            done();
        });
    });

    it("should insert bulk items", function (done) {
        var bulkInsertion = db.bulk(bulkDummy);

        expect(bulkInsertion).to
            .not.be.rejected;
        bulkInsertion.then(([body, header])=> {
            expect(body[0].id).to.equal("one");
            expect(body[1].id).to.equal("two");
            done();
        });
    });

    it("should be able to fetch multiple items", function (done) {
        var fetch = db.fetch({
            keys: ["one", "two"]
        });

        expect(fetch).to
            .not.be.rejected;

        fetch.then(([body, header])=> {
            expect(body.rows.length).to.equal(2);
            expect(body.rows[0].id).to.equal("one");
            expect(body.rows[1].id).to.equal("two");
            done();
        });
    });
});
