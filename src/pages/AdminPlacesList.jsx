import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";
import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";

export default function AdminPlacesList() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlace, setEditingPlace] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    address: '',
    addedPhotos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 1,
    price: 100
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPlaces();
  }, []);

  function fetchPlaces() {
    setLoading(true);
    axios.get('https://house-rent-bk.onrender.com/api/places').then(response => {
      setPlaces(response.data);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching places:', err);
      setLoading(false);
    });
  }

  function startEdit(place) {
    setEditingPlace(place._id);
    setEditForm({
      title: place.title || '',
      address: place.address || '',
      addedPhotos: place.photos || [],
      description: place.description || '',
      perks: place.perks || [],
      extraInfo: place.extraInfo || '',
      checkIn: place.checkIn || '',
      checkOut: place.checkOut || '',
      maxGuests: place.maxGuests || 1,
      price: place.price || 100
    });
  }

  function cancelEdit() {
    setEditingPlace(null);
    setEditForm({
      title: '',
      address: '',
      addedPhotos: [],
      description: '',
      perks: [],
      extraInfo: '',
      checkIn: '',
      checkOut: '',
      maxGuests: 1,
      price: 100
    });
  }

  async function saveEdit(placeId) {
    setSaving(true);
    try {
      await axios.put('https://house-rent-bk.onrender.com/api/places', {
        id: placeId,
        ...editForm
      });
      setEditingPlace(null);
      fetchPlaces();
    } catch (error) {
      console.error('Error saving place:', error);
    }
    setSaving(false);
  }

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading places...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">All Places ({places.length})</h3>
        <p className="text-gray-600">Click on any place to view and edit its details</p>
      </div>
      
      {editingPlace ? (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Place</h2>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); saveEdit(editingPlace); }}>
            {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
            <input 
              type="text" 
              value={editForm.title} 
              onChange={ev => setEditForm(f => ({ ...f, title: ev.target.value }))} 
              placeholder="title, for example: My lovely apt"
              className="w-full border rounded-lg px-3 py-2"
            />
            
            {preInput('Address', 'Address to this place')}
            <input 
              type="text" 
              value={editForm.address} 
              onChange={ev => setEditForm(f => ({ ...f, address: ev.target.value }))} 
              placeholder="address"
              className="w-full border rounded-lg px-3 py-2"
            />
            
            {preInput('Photos','more = better')}
            <PhotosUploader addedPhotos={editForm.addedPhotos} onChange={(photos) => setEditForm(f => ({ ...f, addedPhotos: photos }))} />
            
            {preInput('Description','description of the place')}
            <textarea 
              value={editForm.description} 
              onChange={ev => setEditForm(f => ({ ...f, description: ev.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
            />
            
            {preInput('Perks','select all the perks of your place')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={editForm.perks} onChange={(perks) => setEditForm(f => ({ ...f, perks }))} />
            </div>
            
            {preInput('Extra info','house rules, etc')}
            <textarea 
              value={editForm.extraInfo} 
              onChange={ev => setEditForm(f => ({ ...f, extraInfo: ev.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
            />
            
            {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input 
                  type="text"
                  value={editForm.checkIn}
                  onChange={ev => setEditForm(f => ({ ...f, checkIn: ev.target.value }))}
                  placeholder="14"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input 
                  type="text"
                  value={editForm.checkOut}
                  onChange={ev => setEditForm(f => ({ ...f, checkOut: ev.target.value }))}
                  placeholder="11"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input 
                  type="number" 
                  value={editForm.maxGuests}
                  onChange={ev => setEditForm(f => ({ ...f, maxGuests: ev.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input 
                  type="number" 
                  value={editForm.price}
                  onChange={ev => setEditForm(f => ({ ...f, price: ev.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            
            <div className="flex gap-2 my-4">
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid gap-6">
          {places.length > 0 ? places.map(place => (
            <div 
              key={place._id} 
              onClick={() => startEdit(place)}
              className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-xl overflow-hidden">
                <PlaceImg place={place} />
              </div>
              {/* Debug output for troubleshooting */}
              <div className="text-xs text-gray-400">photos: {JSON.stringify(place.photos)}</div>
              <div className="grow">
                <h2 className="text-xl font-semibold">{place.title}</h2>
                <p className="text-gray-600 mt-1">{place.address}</p>
                <p className="text-sm text-gray-500 mt-2">{place.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-lg font-bold text-green-600">${place.price}</span>
                  <span className="text-sm text-gray-500">per night</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">Max {place.maxGuests} guests</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {place.perks?.slice(0, 3).map(perk => (
                    <span key={perk} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {perk}
                    </span>
                  ))}
                  {place.perks?.length > 3 && (
                    <span className="text-xs text-gray-500">+{place.perks.length - 3} more</span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 011.06-1.06L8.25 18l6.97-6.97a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No places found</p>
              <p className="text-gray-400 text-sm mt-2">Places will appear here once they are created</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
