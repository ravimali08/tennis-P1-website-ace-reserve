import { useState } from 'react';
import { ArrowRight, Trophy, Calendar, Users, Star, ChevronDown, ChevronUp } from 'lucide-react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const programs = [
    {
      title: "Junior Academy",
      audience: "Ages 5-12",
      price: "$189 / month",
      image: "/images/kids program.jpg",
      description: "Building technical fundamentals, coordination, and athletic passion for young juniors.",
      schedule: [
        "Mon & Wed: 4:00 PM - 5:00 PM",
        "Saturday: 9:00 AM - 10:30 AM"
      ]
    },
    {
      title: "Teenagers Development",
      audience: "Ages 13-18",
      price: "$229 / month",
      image: "/images/teenage program.jpg",
      description: "Designed for intermediate teenagers seeking competitive USTA/UTR match development.",
      schedule: [
        "Tue & Thu: 4:30 PM - 6:00 PM",
        "Saturday: 2:00 PM - 4:00 PM"
      ]
    },
    {
      title: "Adult Mastery",
      audience: "Ages 18+",
      price: "$169 / month",
      image: "/images/adult program.jpg",
      description: "High-energy drills, stroke analysis, and doubles strategy clinics tailored for adult league play.",
      schedule: [
        "Morning: Tue & Thu 7:00 AM",
        "Evening: Mon & Wed 7:00 PM"
      ]
    },
    {
      title: "Elite Performance",
      audience: "Advanced Players",
      price: "$549 / month",
      image: "/images/elite program.jpg",
      description: "Intense fitness conditioning, match play strategy analysis, and tournament preparation.",
      schedule: [
        "Mon - Fri: 2:00 PM - 6:00 PM",
        "Saturday: 8:00 AM - 12:00 PM"
      ]
    }
  ];

  const coaches = [
    {
      name: "James Mitchell",
      role: "Head Coach & Academy Director",
      quote: "Training ATP & collegiate level athletes.",
      focus: [
        "High Performance",
        "Stroke Refinement",
        "Collegiate Coach"
      ],
      specialties: [
        "Serve & Volley",
        "Match Strategy",
        "Elite Performance"
      ],
      exp: "15+",
      image: "/images/coach-james.jpg",
      credentials: [
        "Davis Cup Captain",
        "ATP High #180",
        "PTR Master Coach"
      ]
    },
    {
      name: "Ana Rodriguez",
      role: "Junior Development Lead",
      quote: "Building solid technical fundamentals for juniors.",
      focus: [
        "Junior Foundations",
        "Youth Discipline",
        "Athletic Development"
      ],
      specialties: [
        "Junior Development",
        "Footwork",
        "Fundamentals"
      ],
      exp: "8+",
      image: "/images/coach-ana.jpg",
      credentials: [
        "ITF Level 3 Coach",
        "WTA Top 200",
        "Junior Specialist"
      ]
    },
    {
      name: "Tyler Brooks",
      role: "Fitness & Movement Coach",
      quote: "Sports science agility & fitness specialist.",
      focus: [
        "Agility Specialist",
        "Tennis Conditioning",
        "Injury Prevention"
      ],
      specialties: [
        "Tennis Fitness",
        "Agility",
        "Injury Prevention"
      ],
      exp: "6+",
      image: "/images/coach-tyler.jpg",
      credentials: [
        "MS Kinesiology",
        "NSCA Strength Coach",
        "Former NCAA Player"
      ]
    },
    {
      name: "Rachel Chen",
      role: "Adult Programs Coach",
      quote: "High-energy adult clinics & doubles strategy.",
      focus: [
        "Adult Clinics",
        "Doubles Strategy",
        "Cardio Tennis"
      ],
      specialties: [
        "Adult Clinics",
        "Doubles Strategy",
        "Cardio Tennis"
      ],
      exp: "10+",
      image: "/images/coach-rachel.jpg",
      credentials: [
        "Master Instructor",
        "PTR Adult Specialist",
        "Cardio Certified"
      ]
    },
    {
      name: "James Carter",
      role: "Performance & Strategy Coach",
      quote: "Match strategy & tactical training expert.",
      focus: [
        "Match Strategy",
        "Tactical Training",
        "Mental Strength"
      ],
      specialties: [
        "Match Strategy",
        "Mental Toughness",
        "Tactical Development"
      ],
      exp: "12+",
      image: "/images/coach-james.jpg",
      credentials: [
        "Former Div I Coach",
        "PTR Performance Pro",
        "Sports Psychology"
      ]
    },
    {
      name: "Lisa Wong",
      role: "Youth Development Coach",
      quote: "Developing athletic literacy & tennis passion.",
      focus: [
        "Youth Fundamentals",
        "Speed Literacy",
        "Fun Drills"
      ],
      specialties: [
        "Junior Fundamentals",
        "Athletic Development",
        "Fun Learning"
      ],
      exp: "5+",
      image: "/images/coach-lisa.jpg",
      credentials: [
        "USTA QuickStart Pro",
        "PTR Junior Coach",
        "PE Background"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Ethan Carter",
      tagline: "Member since 2021",
      image: "/images/user-man-brick.jpg",
      quote: "Ace Reserve completely changed my game. The coaches are world-class and the facilities are immaculate. I look forward to every visit."
    },
    {
      name: "Olivia Brooks",
      tagline: "Junior Parent",
      image: "/images/user-girl-blonde.jpg",
      quote: "My son has grown so much as a player and a person since joining the junior academy. The coaches genuinely care about every kid."
    },
    {
      name: "Noah Bennett",
      tagline: "Adult League Player",
      image: "/images/user-man-glasses.jpg",
      quote: "The adult clinics are the perfect mix of fun and challenge. I have met great friends and improved my doubles strategy tremendously."
    },
    {
      name: "Sophia Mitchell",
      tagline: "Tournament Regular",
      image: "/images/user-girl-brunette.jpg",
      quote: "Best tournament organization in the region. Everything runs on time, the courts are perfect, and the competition is strong."
    }
  ];

  const blogPosts = [
    {
      title: "Doubles Domination: Winning Strategies for Partners",
      category: "Strategy",
      excerpt: "Doubles is as much about communication and positioning as it is about shot-making. Learn the net-control strategies that top teams use.",
      image: "/images/blog-doubles.png",
      date: "Apr 14, 2026",
      readTime: "5 min read"
    },
    {
      title: "Footwork Fundamentals Every Tennis Player Needs",
      category: "Fitness",
      excerpt: "Great footwork separates good players from great ones. Master these essential movement patterns to cover the court with confidence.",
      image: "/images/blog-footwork.png",
      date: "Apr 28, 2026",
      readTime: "4 min read"
    },
    {
      title: "Winning the Mental Game",
      category: "Performance",
      excerpt: "Tennis is as much mental as physical. Learn proven psychological strategies to stay composed under intense match pressure.",
      image: "/images/blog-mental.png",
      date: "May 12, 2026",
      readTime: "4 min read"
    },
    {
      title: "Summer Tournament Preview",
      category: "Tournaments",
      excerpt: "Our upcoming summer tournament calendar features events for juniors, adults, and senior players in Miami.",
      image: "/images/blog-tournament.png",
      date: "May 25, 2026",
      readTime: "3 min read"
    },
    {
      title: "Why Tennis is the Best Sport for Kids",
      category: "Juniors",
      excerpt: "From hand-eye coordination to emotional resilience, discover how tennis helps children grow on and off the court.",
      image: "/images/blog-kids.png",
      date: "Jun 08, 2026",
      readTime: "5 min read"
    },
    {
      title: "5 Drills to Perfect Your Serve",
      category: "Training",
      excerpt: "Master the most important shot in tennis with these proven practice drills used by our elite coaches.",
      image: "/images/blog-serve.png",
      date: "Jun 22, 2026",
      readTime: "6 min read"
    }
  ];

  const faqs = [
    {
      q: "What membership options are available?",
      a: "We offer Individual, Family, Junior, and Corporate memberships. Each includes court access, guest privileges, and discounted program rates. Contact us for a detailed comparison."
    },
    {
      q: "Can non-members book courts or attend events?",
      a: "Many events and court bookings are open to non-members, often at a slightly higher rate. Members receive priority booking and discounted pricing."
    },
    {
      q: "What should I bring to my first coaching session?",
      a: "Bring your racquet, appropriate court shoes, water, and comfortable athletic clothing. If you do not have a racquet, we have demo racquets available."
    },
    {
      q: "How do tournament registrations work?",
      a: "Register online through our tournament pages. After payment, you will receive a branded tournament pass with a QR code and unique pass ID for check-in."
    },
    {
      q: "Is there parking at the club?",
      a: "Yes, we offer complimentary parking for members and guests. Electric vehicle charging stations are also available."
    },
    {
      q: "Do you offer private lessons?",
      a: "Absolutely. Private and semi-private lessons are available with all of our certified coaches. You can book through the contact page or member dashboard."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.jpg" 
            alt="Tennis player serving" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-600/90 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Real Tennis Club Experience
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Where Actually<br />
              Champions Begin.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
              Experience world-class tennis facilities, professional coaching and premium courts built for players of every skill level.
            </p>
          </div>
        </div>
      </section>

      {/* Courts Showcase Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 text-left">
            <div className="max-w-2xl">
              <span className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4 block">[ PREMIUM SURFACES ]</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Designed for Modern<br />Tennis Players
              </h2>
            </div>
            <p className="text-gray-550 text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
              Purpose-built tennis courts crafted to deliver the perfect balance of speed, bounce, and joint-friendly performance. Select your surface and own the game.
            </p>
          </div>

          {/* Clean 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Clay Court Card */}
            <div 
              onClick={() => window.location.href = '/book-court'}
              className="group cursor-pointer bg-gray-50 rounded-[2rem] border border-gray-150 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-gray-200">
                  <img 
                    src="/images/C3.jpg" 
                    alt="Red Clay Court" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-8 pb-4">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block mb-2">Slow Pace • High Bounce</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Red Clay Stadium Courts</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Authentic red clay courts imported directly. Excellent traction, slow rallies, and easy sliding for ultimate joint comfort.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:text-blue-800 transition-colors">
                  Reserve Court <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Hard Court Card */}
            <div 
              onClick={() => window.location.href = '/book-court'}
              className="group cursor-pointer bg-gray-50 rounded-[2rem] border border-gray-150 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-gray-200">
                  <img 
                    src="/images/C1.jpg" 
                    alt="Indoor Hard Court" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-8 pb-4">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block mb-2">Medium-Fast • True Bounce</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Performance Hard Courts</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Premier cushioned indoor hard courts. Built with multilayer subfloor padding to protect joints while delivering clean speed.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:text-blue-800 transition-colors">
                  Reserve Court <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Grass Court Card */}
            <div 
              onClick={() => window.location.href = '/book-court'}
              className="group cursor-pointer bg-gray-50 rounded-[2rem] border border-gray-150 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-gray-200">
                  <img 
                    src="/images/C5.jpg" 
                    alt="Exhibition Grass Court" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-8 pb-4">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block mb-2">Fast Pace • Low Bounce</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Exhibition Grass Courts</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Traditional grass courts manicured meticulously. Delivers rapid low slices for the classic, timeless grass tennis experience.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:text-blue-800 transition-colors">
                  Reserve Court <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4 block">[ WHY US ]</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-16 max-w-3xl mx-auto">
            Everything Designed to<br />Improve Your Game
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-10 rounded-3xl text-left shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Trophy className="w-10 h-10 text-blue-600 mb-8" />
              <h3 className="text-xl font-bold mb-4">Elite Coaching</h3>
              <p className="text-gray-500">Certified coaches and structured training programs focused on real performance.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl text-left shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Calendar className="w-10 h-10 text-blue-600 mb-8" />
              <h3 className="text-xl font-bold mb-4">Smart Booking</h3>
              <p className="text-gray-500">Book courts and sessions in seconds with a fast, frictionless digital experience.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl text-left shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Users className="w-10 h-10 text-blue-600 mb-8" />
              <h3 className="text-xl font-bold mb-4">Competitive Community</h3>
              <p className="text-gray-500">Play with motivated players through leagues, matches, and regular tournaments.</p>
            </div>
          </div>
          
          <p className="text-gray-500 font-medium">No distractions. No compromises. Just better tennis.</p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4 block">[ COACHING PROGRAMS ]</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-12">
            Programs & Classes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-[2rem] border border-gray-150 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 text-left"
              >
                <div>
                  {/* Program Image Cover */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-gray-200">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {program.audience}
                    </div>
                  </div>

                  <div className="p-8 pb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {program.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                      {program.description}
                    </p>

                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-3">Schedule</p>
                      <ul className="space-y-2">
                        {program.schedule.map((item, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-xs text-gray-600 font-semibold leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <div className="border-t border-gray-100 pt-5 mb-5 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Weekly Rate</span>
                      <span className="text-2xl font-black text-gray-900">{program.price.split(' ')[0]}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-bold mb-1">/ month</span>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/coaching'}
                    className="w-full bg-blue-600 hover:bg-blue-750 hover:bg-blue-700 text-white py-3 rounded-full font-bold transition-all text-xs shadow-md shadow-blue-600/10"
                  >
                    View Program Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 border-y border-white/20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mb-16">
          <span className="text-sm font-bold text-blue-200 tracking-widest uppercase mb-4 block">[ OUR COACHES ]</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Train With Coaches Who<br />Play at the Highest Level
          </h2>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div key={index} className="bg-white rounded-[2rem] overflow-hidden border border-blue-100/50 shadow-xl group flex flex-col justify-between text-left">
                <div>
                  <div className="aspect-square overflow-hidden">
                    <img src={coach.image} alt={coach.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-1">{coach.name}</h3>
                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {coach.role}
                        </span>
                      </div>
                      
                      {/* Experience Badge Circle */}
                      <div className="w-14 h-14 rounded-full bg-blue-600 flex flex-col items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20 border border-blue-500/10">
                        <span className="text-base font-black leading-none">{coach.exp}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 leading-none">EXP</span>
                      </div>
                    </div>

                    <div className="border-t border-blue-100 pt-4 space-y-2">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Specialties</span>
                      <div className="flex flex-wrap gap-1.5">
                        {coach.specialties.map((spec, sIdx) => (
                          <span key={sIdx} className="bg-blue-50 text-blue-700 text-[10px] px-2.5 py-1 rounded-md font-semibold border border-blue-100">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4 block">[ TESTIMONIALS ]</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-16">
            What Our Members Say
          </h2>
        </div>

        {/* Sliding Infinite Marquee Row */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Fade overlays on edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <div className="animate-marquee flex gap-8 hover:[animation-play-state:paused] py-2">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 p-10 rounded-[2.2rem] border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-300 w-[420px] shrink-0 text-left"
              >
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-650 text-gray-600 italic mb-6 leading-relaxed text-sm">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 border-t border-gray-200/50 pt-5 mt-auto">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md shrink-0" 
                  />
                  <div>
                    <h4 className="font-black text-gray-900 text-base leading-none mb-1.5">{t.name}</h4>
                    <span className="text-gray-400 text-xs font-semibold block">{t.tagline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4 block">[ ARTICLES & UPDATES ]</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Latest from the Court
              </h2>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
              View All Posts
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, idx) => (
              <a href="/blog" key={idx} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 group flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                <div>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-xs font-semibold">{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-8 pb-8 flex justify-between items-center text-sm font-medium border-t border-gray-50 pt-6">
                  <span className="text-gray-400 text-xs">{post.date}</span>
                  <span className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors text-sm">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4 block">[ QUESTIONS ]</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl bg-gray-50 overflow-hidden">
                <button
                  className="w-full px-8 py-6 flex justify-between items-center text-left font-bold text-lg text-gray-900 hover:bg-gray-100/50 transition-colors"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-200/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-gray-50 rounded-[2rem] p-6 md:p-12 flex flex-col lg:flex-row items-center gap-12 border border-gray-100">
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden aspect-video lg:aspect-square">
              <img src="/images/cta.jpg" alt="Players having fun" className="w-full h-full object-cover" />
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Your Next Game<br />
                <span className="text-blue-600">Starts Here</span>
              </h2>
              <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto lg:mx-0">
                Join a premium tennis community at Ace Reserve Tennis Club, built for players who care about improvement, competition, and quality play.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-3 rounded-full text-blue-600 font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                  Contact Us
                </button>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                  Join Membership
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
