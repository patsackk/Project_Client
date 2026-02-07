'use client';

import Link from 'next/link';
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
    <main className="min-h-screen bg-sky-50">
      <header className="sticky top-0 bg-gradient-to-l from-sky-700 via-white shadow-lg py-6 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/images/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
            <div className="text-2xl font-bold text-gray-800">UTO Advance</div>
          </div>
          <nav>
            <ul className="flex space-x-6">
              {['Home', 'About', 'Properties', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-900 font-medium hover:text-slate-500 transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="container mx-auto py-10">
        <h2 className="text-4xl font-semibold mb-6">Manage Properties</h2>

        {/* Error message */}
        {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'location', 'description', 'img'].map((field) => (
            <div key={field}>
              <label className="block">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button type="submit" className="bg-sky-600 text-white p-3 rounded-md">
            {editingProperty ? 'Update' : 'Add'} Property
          </button>
        </form>

        {/* Property List */}
        <h3 className="text-3xl font-semibold mt-10">Property List</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h4 className="text-2xl font-semibold">{property.name}</h4>
              <p className="text-gray-500">{property.location}</p>
              <p>{property.description}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(property)}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
