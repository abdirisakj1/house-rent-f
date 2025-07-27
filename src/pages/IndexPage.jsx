import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";

const categories = [
  { icon: "🏖️", name: "Beach" },
  { icon: "🏔️", name: "Mountain" },
  { icon: "🏙️", name: "City" },
  { icon: "👨‍👩‍👧‍👦", name: "Family" },
  { icon: "🌲", name: "Nature" },
  { icon: "🏊", name: "Pool" },
  { icon: "🐶", name: "Pet Friendly" },
  { icon: "🌟", name: "Luxury" }
];

const features = [
  { icon: "✅", text: "Verified luxury properties" },
  { icon: "🕒", text: "24/7 customer support" },
  { icon: "🔒", text: "Secure payments" },
  { icon: "🌍", text: "Worldwide destinations" },
  { icon: "🏆", text: "Top-rated hosts" },
  { icon: "💡", text: "Smart home features" }
];

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('https://house-rent-bk.onrender.com/api/places').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">Find Your Next Dream Stay</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover and book the world’s most unique and luxurious homes, handpicked for unforgettable experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <a href="#places" className="bg-primary text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-pink-600 transition">Browse Places</a>
          <a href="#features" className="bg-white border border-primary text-primary px-6 py-2 rounded-full font-semibold shadow hover:bg-primary hover:text-white transition">Why Choose Us?</a>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow px-6 py-4 w-32 hover:bg-primary hover:text-white transition">
              <span className="text-3xl mb-2">{cat.icon}</span>
              <span className="font-semibold">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
              <span className="text-2xl">{f.icon}</span>
              <span className="text-lg font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Places Ready to Book */}
    {/* Places Ready to Book */}
<section id="places" className="max-w-6xl mx-auto px-4 py-8">
  <h2 className="text-2xl font-bold mb-6 text-center">Places Ready to Book</h2>
  <div className="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {places.length > 0 ? places.map(place => (
      <Link 
        key={place._id} 
        to={'/place/' + place._id} 
        className="block bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
      >
        {place.photos?.[0] && (
          <PlaceImg 
            className="rounded-t-2xl object-cover aspect-square w-full h-48" 
            src={place.photos?.[0]} 
            alt="" 
          />
        )}
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h2 className="font-bold text-lg">{place.title}</h2>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-600">4.8</span>
            </div>
          </div>
          <h3 className="text-sm text-gray-500 mb-2">{place.address}</h3>
          <div className="mt-1">
            <span className="font-bold text-lg">${place.price}</span>
            <span className="text-gray-500"> per night</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Max {place.maxGuests} guests
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {place.perks?.includes('wifi') && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">wifi</span>
            )}
            {place.perks?.includes('parking') && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">parking</span>
            )}
            {place.perks?.includes('tv') && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">tv</span>
            )}
            {place.perks?.filter(p => !['wifi', 'parking', 'tv'].includes(p)).length > 0 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                +{place.perks?.filter(p => !['wifi', 'parking', 'tv'].includes(p)).length} more
              </span>
            )}
          </div>
        </div>
      </Link>
    )) : (
      <div className="col-span-full text-center text-gray-500">
        <p>No places found. Be the first to add a place!</p>
      </div>
    )}
  </div>
</section>
    </div>
  );
}
