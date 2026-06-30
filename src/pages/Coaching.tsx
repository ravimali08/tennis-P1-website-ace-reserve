import { useState } from 'react';
import { Calendar, Clock, DollarSign, BookOpen, Award, CheckCircle, X, ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';

interface Program {
  id: number;
  title: string;
  price: string;
  image: string;
  schedule: string[];
  focus: string;
  includes: string[];
  curriculum: string[];
}

export default function Coaching() {
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);


  const programs: Program[] = [
    {
      id: 1,
      title: "Kids Coaching Program",
      price: "$189 / month",
      image: "/images/kids program.jpg",
      schedule: [
        "Monday & Wednesday: 4:00 PM - 5:00 PM",
        "Saturday: 9:00 AM - 10:30 AM"
      ],
      focus: "Building coordination, basic stroke mechanics, and a love for the game in kids aged 6-12.",
      includes: [
        "3 hours of weekly professional instruction",
        "Youth racquet size & weight assessment",
        "End-of-month fun mini-match play",
        "Complimentary club t-shirt"
      ],
      curriculum: [
        "Weeks 1-2: Hand-eye coordination games, racquet grip, and basic court movement.",
        "Weeks 3-4: Developing the forehand and backhand groundstroke fundamentals.",
        "Weeks 5-6: Fun cooperative rallies, serve toss motion, and basic scorekeeping rules.",
        "Weeks 7-8: End-of-program mini-tournament and graduation ceremony."
      ]
    },
    {
      id: 2,
      title: "Teenager Program",
      price: "$229 / month",
      image: "/images/teenage program.jpg",
      schedule: [
        "Tuesday & Thursday: 4:30 PM - 6:00 PM",
        "Saturday Match Play: 2:00 PM - 4:00 PM"
      ],
      focus: "Tactical development, footwork agility, and match play preparation for teenagers aged 13-17.",
      includes: [
        "5 hours of weekly training and match play",
        "Slow-motion video analysis of groundstrokes",
        "Priority entry to junior club leagues",
        "Strength and agility conditioning"
      ],
      curriculum: [
        "Weeks 1-2: Baseline consistency, footwork recovery, and stance stability.",
        "Weeks 3-4: serve and return positioning, point construction tactics.",
        "Weeks 5-6: Transitioning from baseline to net, mid-court volleys, and overheads.",
        "Weeks 7-8: Live situational match play, mental preparation, and UTR evaluation."
      ]
    },
    {
      id: 3,
      title: "Adult Program",
      price: "$169 / month",
      image: "/images/adult program.jpg",
      schedule: [
        "Morning: Tue & Thu 7:00 AM - 8:30 AM",
        "Evening: Mon & Wed 7:00 PM - 8:30 PM",
        "Weekend Social: Saturday 10:00 AM"
      ],
      focus: "Skill refinement, high-energy cardio fitness, and strategic doubles positioning for adult players.",
      includes: [
        "3 hours of weekly clinics & social play",
        "High-intensity cardiovascular tennis drills",
        "Doubles pairing assessment and match strategy",
        "Complimentary entry to monthly social mixers"
      ],
      curriculum: [
        "Weeks 1-2: High-energy baseline drill sequences, stamina building, and court movement.",
        "Weeks 3-4: Net-play volleys, drop shots, and overhead defense.",
        "Weeks 5-6: Strategic doubles positioning, poaching, and server-partner alignment.",
        "Weeks 7-8: Round-robin match play practice and tactical refinement."
      ]
    },
    {
      id: 4,
      title: "Elite Program",
      price: "$549 / month",
      image: "/images/elite program.jpg",
      schedule: [
        "Monday - Friday: 2:00 PM - 6:00 PM",
        "Saturday: 8:00 AM - 12:00 PM"
      ],
      focus: "High-performance physical and tactical training for tournament-bound and advanced athletes.",
      includes: [
        "24 hours of weekly elite-level instruction",
        "Quarterly sports science fitness assessments",
        "2 complimentary private 1-on-1 coaching hours",
        "UTR ranking tracking and performance analysis"
      ],
      curriculum: [
        "Weeks 1-2: Advanced shot selection, depth control, topspin variations, and court positioning.",
        "Weeks 3-4: Fitness threshold training, speed acceleration, and explosive agility.",
        "Weeks 5-6: Opponent tracking, point analysis, and match strategy adjustments.",
        "Weeks 7-8: High-intensity situational matches, pressure scenarios, and tournament warm-up."
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

  const selectedProgram = programs.find(p => p.id === selectedProgramId);

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Rebuilt Cover Hero Section with Loop Background Video */}
        <div className="relative rounded-[3rem] overflow-hidden p-8 md:p-20 text-white mb-16 shadow-2xl border border-white/10">
          <div className="absolute inset-0 z-0">
            {/* Loop Autoplaying HTML5 Video */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            >
              <source src="/videos/tennis_broll_2.mp4" type="video/mp4" />
            </video>
            {/* Cohesive Blue/Black Theme Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-gray-950/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 text-blue-300">
              <Award className="w-4 h-4 text-blue-400" /> Professional Academy
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Coaching Programs
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 mb-8 leading-relaxed">
              Unlock your true potential. Explore our four specialized coaching programs designed for juniors, teenagers, adults, and elite competitive athletes.
            </p>
            <a href="#programs-grid" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-gray-150 transition-colors shadow-lg">
              Explore Our Programs
            </a>
          </div>
        </div>



        {/* Programs Grid */}
        <div id="programs-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {programs.map((program) => (
            <div key={program.id} className="bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 group">
              <div>
                {/* Visual Image with Cohesive Blue Overlay */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent mix-blend-multiply"></div>
                </div>
                
                <div className="p-8 md:p-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {program.focus}
                  </p>

                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase text-gray-900 tracking-wider block">Timings</span>
                    <ul className="space-y-2">
                      {program.schedule.map((time, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-8 md:px-10 pb-8 md:pb-10 pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-gray-400 text-xs font-bold uppercase block tracking-wider">Tuition</span>
                  <span className="text-2xl font-black text-gray-900">{program.price}</span>
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setSelectedProgramId(program.id)}
                    className="w-1/2 sm:w-auto bg-blue-50 text-blue-700 px-7 py-3.5 rounded-full text-sm font-extrabold hover:bg-blue-100 transition-colors"
                  >
                    View Details
                  </button>
                  <button className="w-1/2 sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-full text-sm font-extrabold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/10">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coaches Roster */}
        <div className="border-t border-gray-100 pt-24 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4 block">[ INSTRUCTORS ]</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Staff Coaches</h2>
            <p className="text-lg text-gray-600">
              Train under our certified elite coaches committed to improving your strokes, agility, and mental game.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div key={index} className="bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 text-left">
                <div>
                  <div className="aspect-square overflow-hidden relative">
                    <img src={coach.image} alt={coach.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 via-transparent to-transparent mix-blend-multiply"></div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{coach.name}</h3>
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

                    <p className="text-gray-700 text-sm font-semibold italic border-l-2 border-blue-600 pl-3 leading-relaxed">
                      "{coach.quote}"
                    </p>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Core Focus</span>
                      <ul className="space-y-1.5 text-xs text-gray-600">
                        {coach.focus.map((item, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>



                    <div className="border-t border-gray-100 pt-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Credentials</span>
                      <ul className="space-y-1.5 text-[11px] text-gray-650 text-gray-650 text-gray-650 text-gray-600 font-semibold">
                        {coach.credentials.map((cred, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus / Detailed Info Modal */}
        {selectedProgramId !== null && selectedProgram && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden border border-gray-100 shadow-2xl relative animate-fade-in my-8">
              {/* Modal Header */}
              <div className="bg-blue-950 text-white px-8 py-6 flex justify-between items-center relative">
                <div>
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-1">Program Syllabus</span>
                  <h3 className="text-2xl font-bold">{selectedProgram.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProgramId(null)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto max-h-[70vh] space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Focus & Objectives</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedProgram.focus}</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">What's Included</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProgram.includes.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-gray-700 text-sm font-semibold">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">8-Week Curriculum Breakdown</h4>
                  <div className="space-y-4">
                    {selectedProgram.curriculum.map((week, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="bg-blue-650 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-gray-600 text-sm leading-relaxed">{week}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 border-t border-gray-100 px-8 py-5 flex justify-between items-center">
                <div>
                  <span className="text-gray-400 text-xs font-bold block uppercase">Monthly Fee</span>
                  <span className="text-xl font-black text-gray-900">{selectedProgram.price}</span>
                </div>
                <button 
                  onClick={() => setSelectedProgramId(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full text-sm transition-all shadow-md shadow-blue-600/10"
                >
                  Close Syllabus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto border-t border-gray-250/60 pt-16">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4 inline-block mr-1.5 align-text-bottom" /> FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              Find answers to commonly asked questions about our tennis academy coaching programs.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What coaching programs do you offer?",
                a: "We offer four specialized coaching programs: Junior Academy (ages 5-12), Teenagers Development (ages 13-18), Adult Mastery (ages 18+), and Elite Competitive Training for advanced ranking players."
              },
              {
                q: "How do I choose the right coaching program?",
                a: "Our programs are structured based on age groups and skill levels. Beginners can start with our Junior or Adult programs, while competitive players aiming for USTA/UTR points should register for our Elite program."
              },
              {
                q: "Can I book a single coaching session or is it monthly?",
                a: "Our core coaching programs run on a monthly subscription model, which includes group classes, private tracking, and court bookings. However, you can contact our front desk for custom private packages."
              },
              {
                q: "What is the maximum group size for coaching?",
                a: "To maintain premium quality and personal attention, our group classes have a strict ratio of 4 to 6 players per coach."
              },
              {
                q: "Are tennis rackets and equipment provided?",
                a: "Yes, premium Wilson training rackets and tennis balls are provided during the sessions. However, we highly recommend players bring their own fitted racket for long-term consistency."
              },
              {
                q: "What is the cancellation and refund policy?",
                a: "You can cancel or pause your monthly subscription with a 7-day notice before the next billing cycle. Refunds are not provided for classes missed due to personal reasons, but make-up sessions can be requested."
              }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left font-bold text-gray-900 hover:bg-gray-50/50 transition-colors gap-4"
                  >
                    <span className="text-sm md:text-base">{faq.q}</span>
                    {isOpen ? (
                      <ChevronRight className="w-5 h-5 text-blue-600 transform rotate-90 transition-transform duration-200 shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
