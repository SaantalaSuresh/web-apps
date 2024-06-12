import React, { useState, useEffect } from 'react';
import './style.css';

const initialItems = [
  { id: 1, name: "redmi", category: 'mobile', date: '2024-06-01' },
  { id: 2, name: 'Puma', category: 'cloths', date: '2024-06-02' },
  { id: 3, name: 'milk', category: 'Grocery ', date: '2024-06-03' }
];

const ItemList = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : initialItems;
  });
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [newItem, setNewItem] = useState({ name: '', category: '', date: '' });
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', category: '', date: '' });
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const handleInsert = (e) => {
    e.preventDefault();
    const newItemId = items.length ? items[items.length - 1].id + 1 : 1;
    setItems([...items, { ...newItem, id: newItemId }]);
    setNewItem({ name: '', category: '', date: '' });
    setShowAddItemPopup(false);
  };

  const handleNewItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleEditItemChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEdit = (id) => {
    const item = items.find(item => item.id === id);
    setEditItem(item);
    setEditItemId(id);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setItems(items.map(item => (item.id === editItemId ? editItem : item)));
    setEditItemId(null);
  };

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const getFilteredAndSortedItems = () => {
    let filteredItems = items;

    if (search) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCategory) {
      filteredItems = filteredItems.filter(item =>
        item.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    if (filterDate) {
      filteredItems = filteredItems.filter(item =>
        item.date === filterDate
      );
    }

    if (sortField) {
      filteredItems = filteredItems.sort((a, b) =>
        a[sortField] > b[sortField] ? 1 : -1
      );
    }

    if (sortOrder === 'desc') {
      filteredItems.reverse();
    }

    return filteredItems;
  };

  return (
    <div className="item-list-container">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        className="search-input"
      />
      <select value={filterCategory} onChange={handleFilterCategoryChange}>
        <option value="">All Categories</option>
        <option value="mobile">Mobile</option>
        <option value="cloths">Cloths</option>
        <option value="Grocery">Grocery</option>
        
      </select>
      <input
        type="date"
        value={filterDate}
        onChange={handleFilterDateChange}
        className="date-filter"
      />
      <table className="items-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('category')}>Category</th>
            <th onClick={() => handleSort('date')}>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getFilteredAndSortedItems().map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => handleEdit(item.id)} className='edit-btn'>Edit</button>
                <button onClick={() => handleDelete(item.id)} className='delete-btn'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowAddItemPopup(true)} className="add-item-button">Add Item</button>
      {showAddItemPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleInsert}>
              <h3>Add Product</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newItem.name}
                onChange={handleNewItemChange}
                className="modal-input"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={newItem.category}
                onChange={handleNewItemChange}
                className="modal-input"
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={newItem.date}
                onChange={handleNewItemChange}
                className="modal-input"
              />
              <button type="submit" className="modal-button">Add Item</button>
            </form>
            <div className='close-btn'> <button onClick={() => setShowAddItemPopup(false)} className='btn'>Close</button></div>
          </div>
        </div>
      )}
      {editItemId && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSaveEdit}>
              <h3>Edit Product</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editItem.name}
                onChange={handleEditItemChange}
                className="modal-input"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={editItem.category}
                onChange={handleEditItemChange}
                className="modal-input"
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={editItem.date}
                onChange={handleEditItemChange}
                className="modal-input"
              />
              <button type="submit" className="modal-button">Save</button>
            </form>
            <div className='close-btn'> <button onClick={() => setEditItemId(null)} className='btn'>Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;