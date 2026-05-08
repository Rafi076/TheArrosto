import { useState, useEffect } from 'react';
import {
  MapPin, Phone, Clock, Star, ChevronDown, Menu, X,
  UtensilsCrossed, Car, Bike, Quote, Instagram, Facebook,
  ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';

const NAV_LINKS = ['Home', 'Menu', 'Gallery', 'Reviews', 'About', 'Contact'];

const MENU_CATEGORIES = [
  {
    name: 'Signature Mains',
    items: [
      { name: 'Peri Peri Chicken Quarter', desc: 'Flame-grilled quarter chicken glazed in our house peri peri sauce', price: '৳420' },
      { name: 'Sirloin Steak', desc: 'Pan-seared sirloin with garlic butter, seasonal greens & roasted potatoes', price: '৳580' },
      { name: 'Set Meal 1', desc: 'Fried rice, peri peri chicken, sautéed vegetables & french fries', price: '৳550' },
      { name: 'Fried Prawn Platter', desc: 'Crispy golden prawns served with tartare sauce & lemon wedges', price: '৳490' },
    ],
  },
  {
    name: 'Beverages',
    items: [
      { name: 'Welcome Watermelon Juice', desc: 'Freshly pressed watermelon blended with mint & a hint of lime', price: '৳120' },
      { name: 'Blue Lagoon', desc: 'Blue curacao syrup, lemonade & sparkling water over crushed ice', price: '৳150' },
      { name: 'Campari Mocktail', desc: 'Citrus-forward mocktail with grapefruit, soda & fresh herbs', price: '৳140' },
      { name: 'Cappuccino', desc: 'Double espresso topped with velvety microfoam milk', price: '৳130' },
    ],
  },
  {
    name: 'Desserts',
    items: [
      { name: 'Falooda', desc: 'Rose-flavoured milk with basil seeds, vermicelli & vanilla ice cream', price: '৳160' },
      { name: 'Breath Mint Mousse', desc: 'Light chocolate mousse with a cool peppermint finish', price: '৳140' },
    ],
  },
];

const GALLERY_IMAGES = [
  { src: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Peri Peri Chicken' },
  { src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Restaurant Interior' },
  { src: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Sirloin Steak' },
  { src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Fine Dining Ambiance' },
  { src: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Drinks & Cocktails' },
  { src: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Desserts' },
];

const REVIEWS = [
  {
    name: 'Abu Sufian Mohammad Khaled',
    role: 'Local Guide · 119 reviews',
    stars: 5,
    text: 'The Arrosto in Chittagong impresses with its spacious, modern interior and relaxed, upscale vibe. Sleek décor, comfy seating & warm lighting create a welcoming atmosphere. The food is decent — a solid accompaniment to the ambiance. A great hangout spot!',
    time: '10 months ago',
  },
  {
    name: 'Rifat Hossain',
    role: 'Google Review',
    stars: 4,
    text: 'Loved the peri peri chicken and the blue lagoon mocktail. The ambiance is really different from most places in Chittagong — modern, clean and comfortable. Will definitely come back with family.',
    time: '8 months ago',
  },
  {
    name: 'Tasnuva Islam',
    role: 'Google Review',
    stars: 4,
    text: 'Great spot for a casual dinner. The kids zone kept my little ones entertained while we enjoyed our meals. Falooda was a highlight — creamy, refreshing and beautifully presented.',
    time: '5 months ago',
  },
];

function StarRating({ count, size = 'sm' }: { count: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${cls} ${i <= count ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [reserveForm, setReserveForm] = useState({ name: '', phone: '', date: '', guests: '2', note: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  const nextImg = () => setGalleryIdx((i) => (i + 1) % GALLERY_IMAGES.length);
  const prevImg = () => setGalleryIdx((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-stone-950 text-stone-100 overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-stone-950/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex flex-col leading-none">
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-amber-400 tracking-widest uppercase">The Arrosto</span>
            <span className="text-stone-400 text-xs tracking-[0.3em] uppercase">Chittagong</span>
          </button>
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <button
                  onClick={() => scrollTo(l.toLowerCase())}
                  className="text-sm tracking-wider uppercase text-stone-300 hover:text-amber-400 transition-colors duration-200"
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:block px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-semibold tracking-wider uppercase rounded transition-colors duration-200"
          >
            Reserve
          </button>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden text-stone-300 hover:text-amber-400">
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-stone-950/98 backdrop-blur-md border-t border-stone-800 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="text-left text-base tracking-wider uppercase text-stone-300 hover:text-amber-400 transition-colors"
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-2 px-5 py-3 bg-amber-500 text-stone-950 text-sm font-semibold tracking-wider uppercase rounded"
            >
              Reserve a Table
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-400 text-xs tracking-[0.4em] uppercase font-medium">Est. Chittagong</span>
            <div className="h-px w-12 bg-amber-500" />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Where Every Meal<br />
            <em className="text-amber-400 not-italic">Tells a Story</em>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Upscale flavours, warm ambiance and unforgettable moments — all in the heart of Chittagong.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('menu')}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold tracking-wider uppercase text-sm rounded transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center"
            >
              Explore Menu <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 border border-stone-500 hover:border-amber-400 text-stone-200 hover:text-amber-400 font-medium tracking-wider uppercase text-sm rounded transition-all duration-200"
            >
              Reserve a Table
            </button>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating count={4} />
              <span className="text-amber-400 font-bold text-lg">4.2</span>
            </div>
            <div className="h-4 w-px bg-stone-600" />
            <span className="text-stone-400 text-sm">1,549 Google Reviews</span>
          </div>
        </div>
        <button
          onClick={() => scrollTo('menu')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-400 hover:text-amber-400 transition-colors animate-bounce"
        >
          <ChevronDown className="w-7 h-7" />
        </button>
      </section>

      {/* FEATURES STRIP */}
      <section className="bg-stone-900 border-y border-stone-800">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: <UtensilsCrossed className="w-6 h-6" />, label: 'Dine-In', sub: 'Spacious seating for all occasions' },
            { icon: <Car className="w-6 h-6" />, label: 'Drive-Through', sub: 'Quick pickup on the go' },
            { icon: <Bike className="w-6 h-6" />, label: 'No-Contact Delivery', sub: 'Via Foodpanda & more' },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="text-amber-400">{icon}</div>
              <span className="font-semibold tracking-wide text-stone-100">{label}</span>
              <span className="text-stone-400 text-sm">{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Interior"
            className="w-full h-[500px] object-cover rounded-lg"
          />
          <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-amber-500 rounded-lg hidden md:block" />
          <div className="absolute top-6 left-6 bg-stone-950/90 backdrop-blur px-5 py-4 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-amber-400 font-bold text-lg">4.2</span>
            </div>
            <span className="text-stone-400 text-xs">1,549 reviews</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-500" />
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Our Story</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            A Sanctuary of<br /><em className="text-amber-400">Good Taste</em>
          </h2>
          <p className="text-stone-300 text-base leading-relaxed mb-6">
            Nestled on the 1st floor of the Panchlaish Minar Building on O.R. Nizam Road, The Arrosto is Chittagong's destination for relaxed upscale dining. From flame-grilled peri peri chicken to hand-cut sirloin steaks, every dish is prepared with care and served in a setting that feels both sophisticated and welcoming.
          </p>
          <p className="text-stone-400 text-base leading-relaxed mb-10">
            With a dedicated kids' zone, a full juice bar, and an ambiance built for lingering conversations, The Arrosto is equally suited for family gatherings, date nights and corporate lunches.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Average Price', value: '৳400–600' },
              { label: 'Open Until', value: '1 AM' },
              { label: 'Location', value: 'O.R. Nizam Rd' },
              { label: 'Phone', value: '01847-166370' },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="text-stone-500 text-xs uppercase tracking-widest">{label}</span>
                <p className="text-stone-100 font-medium mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-amber-500" />
              <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">What We Serve</span>
              <div className="h-px w-10 bg-amber-500" />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold">Our Menu</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {MENU_CATEGORIES.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`px-6 py-2.5 rounded-full text-sm tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === i
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'border border-stone-700 text-stone-400 hover:border-amber-500 hover:text-amber-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {MENU_CATEGORIES[activeCategory].items.map((item) => (
              <div
                key={item.name}
                className="group bg-stone-800/60 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/40 rounded-lg p-6 flex justify-between gap-4 transition-all duration-200"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-100 group-hover:text-amber-400 transition-colors mb-1">{item.name}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <span className="text-amber-400 font-semibold text-lg whitespace-nowrap shrink-0">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm tracking-wider uppercase border-b border-amber-500/40 hover:border-amber-400 pb-0.5 transition-all"
            >
              Full Menu on Facebook <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-500" />
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Visual Feast</span>
            <div className="h-px w-10 bg-amber-500" />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold">Gallery</h2>
        </div>
        <div className="relative mb-4 overflow-hidden rounded-xl h-[420px] md:h-[560px]">
          <img
            src={GALLERY_IMAGES[galleryIdx].src}
            alt={GALLERY_IMAGES[galleryIdx].alt}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
          <button
            onClick={prevImg}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-950/60 hover:bg-amber-500 text-stone-100 hover:text-stone-950 p-2.5 rounded-full transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImg}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-950/60 hover:bg-amber-500 text-stone-100 hover:text-stone-950 p-2.5 rounded-full transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="absolute bottom-4 right-4 text-stone-300 text-sm bg-stone-950/60 px-3 py-1 rounded-full">
            {galleryIdx + 1} / {GALLERY_IMAGES.length}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => setGalleryIdx(i)}
              className={`aspect-square overflow-hidden rounded-lg transition-all ${
                i === galleryIdx ? 'ring-2 ring-amber-500 opacity-100' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-amber-500" />
              <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">What Guests Say</span>
              <div className="h-px w-10 bg-amber-500" />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold mb-4">Guest Reviews</h2>
            <div className="flex items-center justify-center gap-3">
              <StarRating count={4} size="lg" />
              <span className="text-amber-400 font-bold text-2xl">4.2</span>
              <span className="text-stone-400">· 1,549 Google Reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-stone-800/60 border border-stone-700 rounded-xl p-7 flex flex-col gap-4">
                <Quote className="w-8 h-8 text-amber-500/50" />
                <p className="text-stone-300 text-sm leading-relaxed flex-1">"{r.text}"</p>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-stone-100 text-sm">{r.name}</p>
                    <p className="text-stone-500 text-xs mt-0.5">{r.role}</p>
                  </div>
                  <div className="text-right">
                    <StarRating count={r.stars} />
                    <span className="text-stone-500 text-xs mt-1 block">{r.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / RESERVE */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-500" />
            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Find Us</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold mb-8">
            Visit The<br /><em className="text-amber-400">Arrosto</em>
          </h2>
          <div className="space-y-6">
            {[
              {
                icon: <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
                label: 'Address',
                value: '1st Floor, Panchlaish Minar Building\n15 O.R. Nizam Road, Chattogram 4203\nFloor 1 · Royal Hut Unit-2',
              },
              {
                icon: <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
                label: 'Hours',
                value: 'Open daily · Closes 1 AM',
              },
              {
                icon: <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
                label: 'Phone',
                value: '01847-166370',
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex gap-4">
                {icon}
                <div>
                  <p className="text-stone-500 text-xs uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-stone-200 text-sm leading-relaxed whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex gap-4 flex-wrap">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-stone-700 hover:border-amber-500 text-stone-300 hover:text-amber-400 rounded-lg text-sm transition-all"
            >
              <Facebook className="w-4 h-4" /> Menu on Facebook
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-stone-700 hover:border-amber-500 text-stone-300 hover:text-amber-400 rounded-lg text-sm transition-all"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
          </div>
          <div className="mt-10 rounded-xl overflow-hidden border border-stone-800 h-52 bg-stone-800 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-stone-400 text-sm">15 O.R. Nizam Road, Chattogram</p>
              <a
                href="https://maps.google.com/?q=The+Arrosto+Chittagong"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-amber-400 text-xs underline hover:text-amber-300"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 md:p-10">
          <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold mb-2">Reserve a Table</h3>
          <p className="text-stone-400 text-sm mb-8">We'll confirm your booking within 2 hours.</p>
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-400" />
              </div>
              <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold mb-2">Reservation Received</h4>
              <p className="text-stone-400 text-sm">Thank you, {reserveForm.name}! We'll call you at {reserveForm.phone} to confirm your table.</p>
              <button
                onClick={() => { setSubmitted(false); setReserveForm({ name: '', phone: '', date: '', guests: '2', note: '' }); }}
                className="mt-6 text-amber-400 hover:text-amber-300 text-sm underline"
              >
                Make another reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleReserve} className="space-y-5">
              <div>
                <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">Full Name</label>
                <input
                  required
                  value={reserveForm.name}
                  onChange={(e) => setReserveForm({ ...reserveForm, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 text-stone-100 placeholder-stone-500 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">Phone Number</label>
                <input
                  required
                  value={reserveForm.phone}
                  onChange={(e) => setReserveForm({ ...reserveForm, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 text-stone-100 placeholder-stone-500 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">Date</label>
                  <input
                    required
                    type="date"
                    value={reserveForm.date}
                    onChange={(e) => setReserveForm({ ...reserveForm, date: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 text-stone-100 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">Guests</label>
                  <select
                    value={reserveForm.guests}
                    onChange={(e) => setReserveForm({ ...reserveForm, guests: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 text-stone-100 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  >
                    {['1','2','3','4','5','6','7','8+'].map((g) => (
                      <option key={g} value={g}>{g} {g === '1' ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">Special Request (optional)</label>
                <textarea
                  value={reserveForm.note}
                  onChange={(e) => setReserveForm({ ...reserveForm, note: e.target.value })}
                  placeholder="Dietary requirements, occasion, seating preference..."
                  rows={3}
                  className="w-full bg-stone-800 border border-stone-700 focus:border-amber-500 text-stone-100 placeholder-stone-500 rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold tracking-wider uppercase text-sm rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-100"
              >
                Confirm Reservation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 border-t border-stone-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-amber-400 tracking-widest uppercase mb-1">The Arrosto</div>
              <p className="text-stone-500 text-sm">15 O.R. Nizam Rd, Chattogram 4203</p>
            </div>
            <div className="flex gap-8 text-sm text-stone-400">
              {['Home', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l.toLowerCase())}
                  className="hover:text-amber-400 transition-colors uppercase tracking-wider text-xs"
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <Phone className="w-4 h-4 text-amber-500" />
              <span className="text-sm">01847-166370</span>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-stone-800 text-center text-stone-600 text-xs">
            &copy; {new Date().getFullYear()} The Arrosto, Chittagong. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
