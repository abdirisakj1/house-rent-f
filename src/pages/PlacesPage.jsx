import { Link } from "react-router-dom";
import Footer from "../Footer";

const luxuryHouses = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    title: "Oceanfront Villa",
    link: "#"
  },
  {
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    title: "Mountain Retreat",
    link: "#"
  },
  {
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
    title: "City Penthouse",
    link: "#"
  },
  {
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
    title: "Family Estate",
    link: "#"
  }
];

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

export default function PlacesPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* About Us */}
      <section className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">About Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to <span className="font-bold text-primary">Luxury Rental Houses</span> – your gateway to the world’s most exclusive and beautiful homes. Whether you’re seeking a beachfront villa, a mountain retreat, or a city penthouse, we connect you with unforgettable stays and premium experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <a href="#luxury" className="bg-primary text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-pink-600 transition">Explore Luxury Rentals</a>
          <a href="#features" className="bg-white border border-primary text-primary px-6 py-2 rounded-full font-semibold shadow hover:bg-primary hover:text-white transition">See Features</a>
        </div>
      </section>

      {/* Luxury Rental Houses */}
      <section id="luxury" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Luxury Rental Houses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {luxuryHouses.map((house, idx) => (
            <a key={idx} href={house.link} className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden">
              <img src={house.img} alt={house.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{house.title}</h3>
                <span className="text-primary font-bold">View Details</span>
              </div>
            </a>
          ))}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}