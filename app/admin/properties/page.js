'use client';

import React, { useState, useEffect } from 'react';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    img: '',
  });
  const [editingProperty, setEditingProperty] = useState(null);
  const [error, setError] = useState('');

  // Fetch properties once on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/admin/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties');
      }
    };
    fetchProperties();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission (Add/Edit property)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.description || !formData.img) {
      setError('Please fill in all fields');
      return;
    }

    const method = editingProperty ? 'PUT' : 'POST';
    const url = '/api/admin/properties';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: editingProperty?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save property');
      }

      const updatedProperty = await response.json();
      setProperties((prevProperties) => {
        if (method === 'POST') {
          return [...prevProperties, updatedProperty]; // Add new property
        } else {
          return prevProperties.map((property) =>
            property.id === updatedProperty.id ? updatedProperty : property
          ); // Update existing property
        }
      });

      setFormData({ name: '', location: '', description: '', img: '' });
      setEditingProperty(null);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save property');
    }
  };

  // Handle property delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/admin/properties', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }

      setProperties(properties.filter((property) => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property');
    }
  };

  // Handle edit button click
  const handleEdit = (property) => {
    setFormData({
      name: property.name,
      location: property.location,
      description: property.description,
      img: property.img,
    });
    setEditingProperty(property);
  };

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="page-title mb-6">Manage Properties</h1>

        {/* Error message */}
        {error && <div className="alert-error mb-4">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          {['name', 'location', 'description', 'img'].map((field) => (
            <div key={field}>
              <label className="label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          ))}
          <button type="submit" className="btn-primary">
            {editingProperty ? 'Update' : 'Add'} Property
          </button>
        </form>

        {/* Property List */}
        <h2 className="section-title mt-12">Property List</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900">{property.name}</h3>
              <p className="text-gray-500">{property.location}</p>
              <p className="mt-2 text-gray-600">{property.description}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(property)}
                  className="btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
