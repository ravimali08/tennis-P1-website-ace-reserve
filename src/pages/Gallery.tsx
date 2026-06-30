import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items: GalleryItem[] = [
    { id: 1, title: "Post-Match Club Social Gathering", category: "Events", src: "/images/event-members-mixer.png" },
    { id: 2, title: "Lush Green Grass Court 6", category: "Courts", src: "/images/gallery-grass-court.png" },
    { id: 3, title: "Junior Agility Coordination Drills", category: "Events", src: "/images/event-junior-agility.png" },
    { id: 4, title: "Elite Performance Training Camp", category: "Coaching", src: "/images/elite program.jpg" },
    { id: 5, title: "Adult Hardcourt Doubles Cup Match", category: "Events", src: "/images/event-hardcourt-doubles.png" },
    { id: 6, title: "Indoor Performance Hard Court 1", category: "Courts", src: "/images/C2.jpg" },
    { id: 7, title: "Private Serve Analysis Session", category: "Coaching", src: "/images/gallery-serve-coaching.png" },
    { id: 8, title: "Summer Junior Rally Challenges", category: "Events", src: "/images/event-junior-rallies.png" },
    { id: 9, title: "Championship Stadium Clay Court", category: "Events", src: "/images/C1.jpg" },
    { id: 10, title: "Championship Trophy Presentation", category: "Events", src: "/images/gallery-trophy-ceremony.png" },
    { id: 11, title: "Club Spring Warm-Up Classic", category: "Events", src: "/images/event-spring-warmup.png" },
    { id: 12, title: "Summer Members' Mixer", category: "Events", src: "/images/event-members-mixer.png" }
  ];

  const filteredItems = activeFilter === "All"
    ? items
    : items.filter(item => item.category === activeFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const categories = ["All", "Courts", "Coaching", "Events"];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-550 text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <ImageIcon className="w-4 h-4 inline-block mr-1.5 align-text-bottom" /> Club Showcase
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Club Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Explore our state-of-the-art facilities, elite coaching sessions, and competitive member events.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setLightboxIndex(null); // Reset lightbox context if active
              }}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white text-lg font-bold leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-between items-center p-6 md:p-12 animate-fade-in"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="w-full flex justify-between items-center text-white relative z-10">
              <span className="text-sm font-semibold text-gray-400">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Stage */}
            <div className="flex-grow w-full flex items-center justify-center relative my-8">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 md:left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <div 
                className="max-h-[70vh] max-w-[85vw] flex items-center justify-center select-none"
                onClick={(e) => e.stopPropagation()} // Prevent closing
              >
                <img
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[70vh] max-w-[85vw] object-contain rounded-2xl shadow-2xl"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 md:right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="text-center text-white relative z-10 max-w-xl">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                {filteredItems[lightboxIndex].category}
              </span>
              <h4 className="text-xl font-bold leading-normal">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-xs text-gray-400 mt-2">
                Press Left/Right arrows to cycle, Esc to close
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
