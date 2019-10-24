const FileDataStore = require('./FileDataStore');
var expect = require('chai').expect;
const DuplicateListIdError = require('../errors/DuplicateListIdError');
const ListNotFoundError = require('../errors/ListNotFoundError');

const list1 = {id: 1, title: 'test list', items: []};
const list2 = {id: 2, title: 'test list 2', items: []};

afterEach(() => {
  FileDataStore.reset();
})

describe('FileDataStore', () => {
  describe('getList()', () => {
    it('returns null if the list is not present', () => {
      expect(new FileDataStore([list2]).getList(1)).to.be.null;
    });

    it('returns null if the list id is not valid', () => {
      const dataStore = new FileDataStore([list1]);
      expect(dataStore.getList(-1)).to.be.null;
      expect(dataStore.getList(20)).to.be.null; //greater than number of lists
    });

    it('throws a DuplicateListIdError if more than one list matches the id', () => {
      expect(() => {
        new FileDataStore([list1, list1]).getList(1);
      }).to.throw(DuplicateListIdError, /lists exist with the same id/).that.satisfies((e) => {
        return e.duplicateCount === 2 && e.listId === 1;
      });
    });

    it('returns the list for the given id if exists', () => {
      let list = new FileDataStore([list1]).getList(1);
      expect(list.title).to.equal('test list');
    });
  });

  describe('getAllLists()', () => {
    it('provides all lists currently loaded', () => {
      expect(new FileDataStore([list1, list2]).getAllLists().length).to.equal(2);
    });
  });

  describe('addItem()', () => {
    it('throws an error if the list does not exist', () => {
      expect(() => {
        new FileDataStore([list2]).addItem(1, {shortDesc: 'something'});
      }).to.throw(ListNotFoundError, /No list with id of/).that.satisfies((e) => {
        return e.listId == 1;
      });
    });

    it('adds the item to the list', () => {
      let dataStore = new FileDataStore([list1]);
      expect(dataStore.getList(1).items).to.be.empty;

      const id = dataStore.addItem(1, {shortDesc: 'something'});
      expect(id).to.equal(1);

      const list = dataStore.getList(1);
      expect(list.items.length).to.equal(1);
      expect(list.items[0].id).to.equal(id);
    });
  });

  describe('deleteList()', () => {
    it('throws a ListNotFoundError if the list does not exist', () => {
      expect(() => {
        new FileDataStore([list2]).deleteList(1);
      }).to.throw(ListNotFoundError, /No list with id of/).that.satisfies((e) => {
        return e.listId == 1;
      });
    });

    it('removes the specified list from storage', () => {
      let dataStore = new FileDataStore([list1, list2]);
      expect(dataStore.getAllLists().length).to.equal(2);

      dataStore.deleteList(1);
      expect(dataStore.getAllLists().length).to.equal(1);
      expect(dataStore.getList(1)).to.be.null;
    });
  });
});