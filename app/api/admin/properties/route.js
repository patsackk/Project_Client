import { NextResponse } from 'next/server';

let properties = [
  {
    id: 1,
    name: "Pool Villa",
    location: "Manik - Phuket",
    description: "Sleek modern stylish apartments",
    img: "/images/pool.jpg",
  },
  {
    id: 2,
    name: "Cafe",
    location: "Mueang - Phuket",
    description: "Sophisticated urban living",
    img: "/images/pro1.jpg",
  }
];  

export async function GET() {
  return NextResponse.json(properties);  // Return all properties
}

export async function POST(req) {
  try {
    const newProperty = await req.json();
    newProperty.id = properties.length + 1; // Assign a new ID
    properties.push(newProperty);
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('Error adding property:', error);
    return NextResponse.json({ error: 'Failed to save property' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const updatedProperty = await req.json();
    const index = properties.findIndex(property => property.id === updatedProperty.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    properties[index] = updatedProperty;  // Update the property
    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const index = properties.findIndex((property) => property.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    properties.splice(index, 1);  // Delete the property
    return NextResponse.json({ message: 'Property deleted' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}