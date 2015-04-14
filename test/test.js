import { db, expect, reset } from './instrument'
import Lab from 'lab'

var lab = Lab.script();
var { describe, it } = lab;
export { lab };

var id    = 'baz';
var dummy = { foo: 'bar' };

describe('get', function() {
  lab.before(reset);

  it('should insert one item', function(done) {
    var insertion = db.insert(dummy, id);

    expect(insertion).to
      .not.be.rejected
      .and.notify(done);
  });

  it('should be able to fetch one item', function(done) {
    var lookup = db.get(id);

    expect(lookup).to
      .not.be.rejected
      .and.notify(done);
  });
});
