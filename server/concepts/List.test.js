const List = require('./List');
var expect = require('chai').expect;

describe('List', () => {
  describe('constructor', () => {
    it('sets defaults properly', () => {
      const list = new List({id: 1});
      expect(list.title).to.equal('I am a list!');
      expect(list.items).to.be.empty;
      expect(list.id).to.equal(1);
    });

    it('uses provided arguments', () => {
      const list = new List({id: 1, title: 'some title', items: [{shortDesc: 'blah'}]});
      expect(list.title).to.equal('some title');
      expect(list.items.length).to.equal(1);
      expect(list.items[0].shortDesc).to.equal('blah');
      expect(list.id).to.equal(1);
    });
  });

  describe('addItem', () => {
    it('adds an item', () => {
      let list = new List({id: 1});
      expect(list.items).to.be.empty;
      list.addItem({shortDesc: 'blah'});
      expect(list.items.length).to.equal(1);
      expect(list.items[0].shortDesc).to.equal('blah');
    });
  });
});