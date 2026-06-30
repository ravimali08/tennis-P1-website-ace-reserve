import { useState, useEffect } from 'react';
import { Trophy, Calendar, Search, ShieldCheck, X, CreditCard, Award, QrCode, CheckCircle, Printer, ScanLine, ArrowLeftRight, HelpCircle, Users, Activity, Landmark, Download } from 'lucide-react';

interface Tournament {
  title: string;
  date: string;
  category: "Junior" | "Adult";
  fee: string;
  image: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  description: string;
  spotsLeft?: number;
}

interface BracketMatch {
  p1: string;
  p2: string;
  s1: string;
  s2: string;
  winner: 1 | 2;
}

interface BracketData {
  qf: BracketMatch[];
  sf: BracketMatch[];
  f: BracketMatch;
  champion: string;
}

export default function Tournaments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Junior" | "Adult">("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Upcoming" | "Ongoing" | "Completed">("All");
  
  // Registration Wizard State
  const [registeringIndex, setRegisteringIndex] = useState<number | null>(null);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentProgress, setPaymentProgress] = useState(0);

  // Draws State
  const [drawsTournamentIndex, setDrawsTournamentIndex] = useState<number | null>(null);

  // Card details state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  
  // Form fields state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formRating, setFormRating] = useState("");
  const [formShirt, setFormShirt] = useState("M");
  const [formAge, setFormAge] = useState("");
  
  // Errors state
  const [errors, setErrors] = useState<string[]>([]);
  const [ticketId, setTicketId] = useState("");

  const tournaments: Tournament[] = [
    { 
      title: "Junior Agility Cup", 
      date: "2026-05-02", 
      category: "Junior", 
      fee: "Free", 
      image: "/images/event-junior-agility.png",
      status: "Completed",
      description: "Concluded fitness and footwork showcase event. Junior academy players evaluated baseline acceleration and court agility drill scores." 
    },
    { 
      title: "Summer Junior Rallies", 
      date: "2026-06-06", 
      category: "Junior", 
      fee: "Free", 
      image: "/images/event-junior-rallies.png",
      status: "Ongoing",
      description: "Live junior rally challenges in progress. Matches are currently active across multiple under-16 age brackets." 
    },
    { 
      title: "Adult Open Challenger", 
      date: "2026-08-23", 
      category: "Adult", 
      fee: "Free", 
      image: "/images/event-adult-challenger.png",
      status: "Upcoming",
      spotsLeft: 4,
      description: "A friendly but competitive adult tournament with singles and doubles brackets. Perfect for league players looking for tournament experience." 
    },
    { 
      title: "Spring Warm-Up Classic", 
      date: "2026-04-04", 
      category: "Adult", 
      fee: "$40", 
      image: "/images/event-spring-warmup.png",
      status: "Completed",
      description: "Concluded season-opening social tournament for adult members. Focus on warm-up rallies and friendly match play." 
    },
    { 
      title: "Miami USTA Junior Championship", 
      date: "2026-08-09", 
      category: "Junior", 
      fee: "$45", 
      image: "/images/event-usta-junior.png",
      status: "Upcoming",
      spotsLeft: 3,
      description: "A USTA-sanctioned junior tournament featuring singles and doubles draws across multiple age divisions. Excellent match play." 
    },
    { 
      title: "Elite Junior Showcase", 
      date: "2026-08-16", 
      category: "Junior", 
      fee: "$60", 
      image: "/images/event-elite-junior.png",
      status: "Upcoming",
      description: "Competitive junior tournament for advanced young players ready for serious match play, intense rallies, and ranking points." 
    },
    { 
      title: "Adult Hardcourt Doubles Cup", 
      date: "2026-09-27", 
      category: "Adult", 
      fee: "$80", 
      image: "/images/event-hardcourt-doubles.png",
      status: "Upcoming",
      spotsLeft: 5,
      description: "Double up for our premier adult outdoor hardcourt doubles draw. Open to all ratings with post-tournament buffet." 
    },
    { 
      title: "Vanguard Senior Open", 
      date: "2026-10-04", 
      category: "Adult", 
      fee: "Free", 
      image: "/images/event-senior-open.png",
      status: "Upcoming",
      description: "A competitive singles and doubles bracket for mature players aged 45 and over. Red clay tournament draws." 
    }
  ];

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  // Filter and Search logic
  const filteredTournaments = tournaments.filter((t) => {
    const titleMatch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = t.date.includes(searchTerm);
    const categoryMatch = selectedCategory === "All" || t.category === selectedCategory;
    const statusMatch = selectedStatus === "All" || t.status === selectedStatus;
    return (titleMatch || descMatch || dateMatch) && categoryMatch && statusMatch;
  });

  // Deterministic Bracket Data Generator
  const generateBracketData = (title: string): BracketData => {
    const isJunior = title.toLowerCase().includes("junior") || title.toLowerCase().includes("teen");
    const juniorNames = ["Lucas S.", "Ethan H.", "Mason M.", "Oliver P.", "Chloe T.", "Emma L.", "Sophia B.", "Isabella K."];
    const adultNames = ["James M.", "Robert C.", "Michael F.", "William G.", "David K.", "Richard H.", "Thomas L.", "Charles V."];
    const names = isJunior ? juniorNames : adultNames;
    
    return {
      qf: [
        { p1: names[0], p2: names[1], s1: "6 6", s2: "4 2", winner: 1 },
        { p1: names[2], p2: names[3], s1: "3 6 4", s2: "6 2 6", winner: 2 },
        { p1: names[4], p2: names[5], s1: "6 6", s2: "3 1", winner: 1 },
        { p1: names[6], p2: names[7], s1: "2 5", s2: "6 7", winner: 2 }
      ],
      sf: [
        { p1: names[0], p2: names[3], s1: "6 7 6", s2: "4 5 2", winner: 1 },
        { p1: names[4], p2: names[7], s1: "4 2", s2: "6 6", winner: 2 }
      ],
      f: { p1: names[0], p2: names[7], s1: "6 3 7", s2: "4 6 5", winner: 1 },
      champion: names[0]
    };
  };

  // Unique Pass ID generator
  const generatePassId = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `AR-TRN-${random}`;
  };

  // Payment loader simulation
  useEffect(() => {
    let interval: any;
    if (paymentStatus === 'processing') {
      interval = setInterval(() => {
        setPaymentProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setPaymentStatus('success');
            setTimeout(() => {
              setTicketId(generatePassId());
              setStep(3);
            }, 800);
            return 100;
          }
          return prev + 20;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [paymentStatus]);

  const handleOpenRegistration = (index: number) => {
    setRegisteringIndex(index);
    setStep(0); // Set to Details View (Step 0)
    setPaymentMethod('card');
    setPaymentStatus('idle');
    setPaymentProgress(0);
    setErrors([]);
    
    // Clear forms
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormRating("");
    setFormAge("");
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setIsCardFlipped(false);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = [];
    if (!formName.trim()) newErrors.push("Player Name is required");
    if (!formEmail.trim()) newErrors.push("Email is required");
    const cleanPhone = formPhone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) newErrors.push("Phone number must be exactly 10 digits");
    if (!formAge.trim()) newErrors.push("Age is required");
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
      setStep(2); // Go to checkout
    }
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = [];
    if (!cardName.trim()) newErrors.push("Cardholder Name is required");
    if (cardNumber.replace(/\s/g, '').length !== 16) newErrors.push("Enter a valid 16-digit Card Number");
    if (cardExpiry.length !== 5) {
      newErrors.push("Enter expiry in MM/YY format");
    } else {
      const [m] = cardExpiry.split("/");
      const month = parseInt(m, 10);
      if (isNaN(month) || month < 1 || month > 12) {
        newErrors.push("Please enter a valid expiration month (01-12)");
      }
    }
    if (cardCvc.replace(/\D/g, '').length !== 3) newErrors.push("Enter a valid 3-digit CVV code");

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
      setPaymentStatus('processing');
    }
  };

  const handleSimulateUpi = () => {
    setPaymentStatus('processing');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPng = () => {
    if (registeringIndex === null) return;
    const tournament = tournaments[registeringIndex];

    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear background with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1200);
    gradient.addColorStop(0, "#030712"); // dark gray/black
    gradient.addColorStop(1, "#1e3a8a"); // navy blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 1200);

    // Accent line/top bar
    ctx.fillStyle = "#2563eb"; // blue-600
    ctx.fillRect(0, 0, 800, 30);

    // Header banner text
    ctx.fillStyle = "#60a5fa"; // blue-400
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ACE RESERVE TENNIS CLUB", 400, 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText("DIGITAL COMPETITIVE PASS", 400, 160);

    // Subtle divider
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 220);
    ctx.lineTo(720, 220);
    ctx.stroke();

    // Entry status label
    ctx.fillStyle = "#10b981"; // emerald-500
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("STATUS: ENTRY CONFIRMED", 100, 280);

    // Tournament title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText(tournament.title, 100, 370);

    // Tournament Details
    ctx.fillStyle = "#9ca3af"; // gray-400
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Tournament Date", 100, 460);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(formatDate(tournament.date), 100, 500);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Player Name", 100, 580);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(formName, 100, 620);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Division / UTR", 100, 700);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(formRating || "Standard Draw", 100, 740);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Shirt Size", 450, 700);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(`Size ${formShirt}`, 450, 740);

    // Pass ID / Barcode block
    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Competitor Pass ID", 100, 830);
    ctx.fillStyle = "#3b82f6"; // blue-500
    ctx.font = "bold 30px monospace";
    ctx.fillText(ticketId, 100, 870);

    // Draw nice barcode lines
    ctx.fillStyle = "#ffffff";
    let barcodeX = 100;
    for (let i = 0; i < 48; i++) {
      const width = i % 3 === 0 ? 8 : (i % 2 === 0 ? 4 : 2);
      ctx.fillRect(barcodeX, 930, width, 100);
      barcodeX += width + 4;
    }

    // Footnote text
    ctx.fillStyle = "#6b7280";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PRESENT BARCODE FOR CHECK-IN AT DESK", 400, 1100);

    // Trigger download
    const link = document.createElement("a");
    link.download = `${formName.replace(/\s+/g, "_")}_tournament_pass.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        
        {registeringIndex === null ? (
          /* ========================================================
             LISTING VIEW (GRID, FILTERS, HERO BANNER)
             ======================================================== */
          <>
            {/* Cover Hero Page Banner */}
            <div className="relative rounded-[3rem] overflow-hidden p-8 md:p-20 text-white mb-10 shadow-2xl border border-white/10">
              <div className="absolute inset-0 z-0">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/TR_HR_VD.mp4" type="video/mp4" />
                </video>
                {/* 20% Opacity Blue Overlay */}
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              </div>
              
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 text-blue-300">
                  <Award className="w-4 h-4 text-blue-400" /> USTA & UTR Competitive Play
                </span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                  Championship Tournaments
                </h1>
                <p className="text-lg md:text-xl text-blue-100/90 mb-8 leading-relaxed">
                  Test your limits. Play competitive singles and doubles draws at Ace Reserve. Register online, secure your spot, and receive your digital QR entry pass.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#draws" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-gray-150 transition-colors shadow-lg">
                    View Tournament Schedule
                  </a>
                  <div className="flex items-center gap-2 text-sm text-blue-200">
                    <ShieldCheck className="w-5 h-5 text-blue-400" /> Secure SSL Checkout Enabled
                  </div>
                </div>
              </div>
            </div>

            {/* Club Statistics Counter Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
              {[
                { label: "Total Tournaments", val: "8 Events", icon: Trophy, color: "text-blue-600" },
                { label: "Active Entrants", val: "450+ Players", icon: Users, color: "text-green-600" },
                { label: "Cumulative Prizes", val: "$15,000+", icon: Activity, color: "text-amber-500" },
                { label: "Affiliations", val: "USTA / UTR", icon: Landmark, color: "text-indigo-600" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-gray-50 rounded-2xl shrink-0">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">{stat.label}</span>
                    <span className="text-lg font-black text-gray-900">{stat.val}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter & Search Bar Section */}
            <div id="draws" className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-150 shadow-sm mb-12 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                {/* Search Input */}
                <div className="w-full md:w-1/2 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tournaments by title, description, or date..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 rounded-full border border-gray-250 focus:border-blue-600 focus:outline-none text-sm transition-all shadow-inner bg-gray-50/50"
                  />
                </div>

                {/* Division Filter */}
                <div className="flex gap-2 shrink-0 flex-wrap">
                  {["All", "Junior", "Adult"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all border uppercase tracking-wider ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {cat === "All" ? "All Divisions" : `${cat} Draw`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mr-2">Tournament Status:</span>
                {["All", "Upcoming", "Ongoing", "Completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status as any)}
                    className={`px-5 py-2 rounded-full font-bold text-xs transition-all border ${
                      selectedStatus === status
                        ? 'bg-gray-900 text-white border-gray-905'
                        : 'bg-white text-gray-550 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {status === "All" ? "All Schedules" : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Tournament Cards Grid */}
            {filteredTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTournaments.map((tournament, idx) => {
                  const originalIndex = tournaments.findIndex(t => t.title === tournament.title && t.date === tournament.date);
                  
                  return (
                    <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 group">
                      <div>
                        {/* Top Cover Card Image */}
                        <div className="aspect-[16/10] overflow-hidden relative bg-gray-200">
                          <img 
                            src={tournament.image} 
                            alt={tournament.title} 
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent mix-blend-multiply"></div>
                          
                          {/* Category & Status badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-blue-700 uppercase tracking-wider shadow-sm border border-gray-550/10 w-fit">
                              {tournament.category} Draw
                            </span>
                            
                            <span className={`px-3 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-sm w-fit text-white ${
                              tournament.status === "Upcoming"
                                ? 'bg-blue-600 border border-blue-500'
                                : tournament.status === "Ongoing"
                                  ? 'bg-green-600 border border-green-500 animate-pulse'
                                  : 'bg-gray-500 border border-gray-400'
                            }`}>
                              {tournament.status}
                            </span>
                          </div>

                          {/* Urgency Badge for Upcoming events */}
                          {tournament.status === "Upcoming" && tournament.spotsLeft && (
                            <div className="absolute bottom-4 right-4 bg-red-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-red-600/30 border border-red-500 animate-zoom-in-out">
                              {tournament.spotsLeft} spots left
                            </div>
                          )}
                        </div>

                        <div className="p-8 pb-4">
                          {/* Date details */}
                          <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-semibold">
                            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{formatDate(tournament.date)}</span>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                            {tournament.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                            {tournament.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-8 pb-8 pt-4 border-t border-gray-50 flex justify-between items-center">
                        <div>
                          <span className="text-gray-400 text-[10px] font-extrabold uppercase block tracking-wider">Entry Price</span>
                          <span className={`text-2xl font-black ${tournament.fee === "Free" ? "text-green-600" : "text-gray-900"}`}>
                            {tournament.fee}
                          </span>
                        </div>
                        
                        {tournament.status === "Upcoming" ? (
                          <button 
                            onClick={() => handleOpenRegistration(originalIndex)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/10 text-sm"
                          >
                            Register
                          </button>
                        ) : (
                          <button
                            onClick={() => setDrawsTournamentIndex(originalIndex)}
                            className="bg-blue-50 text-blue-700 px-5 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors text-xs uppercase tracking-wider"
                          >
                            View Brackets
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-150 shadow-sm max-w-2xl mx-auto">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Tournaments Found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or status filter.</p>
              </div>
            )}
          </>
        ) : (
          /* ========================================================
             FULL DETAIL & REGISTRATION INLINE PAGE VIEW (NO MODAL!)
             ======================================================== */
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-8 animate-fade-in text-left">
            
            {/* Header Block with Back Navigation Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6 gap-4">
              <div>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-1">Registration Portal</span>
                <h2 className="text-3xl font-black text-gray-900">{tournaments[registeringIndex].title}</h2>
              </div>
              <button 
                onClick={() => setRegisteringIndex(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors shrink-0"
              >
                ← Back to Tournament List
              </button>
            </div>

            {/* Steps Progress Indicator */}
            {step >= 1 && (
              <div className="bg-blue-50 px-8 py-4 rounded-2xl border border-blue-100/50 flex justify-between text-xs font-bold text-gray-500 max-w-2xl mx-auto">
                <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-blue-700' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</span>
                  <span>Player Info</span>
                </div>
                <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-blue-700' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</span>
                  <span>Secure Payment</span>
                </div>
                <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-blue-700' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</span>
                  <span>Confirmation Pass</span>
                </div>
              </div>
            )}

            {/* Registration Wizard Content */}
            <div className="pt-4">
              {errors.length > 0 && step >= 1 && (
                <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 text-sm mb-6 space-y-1 max-w-2xl mx-auto">
                  {errors.map((err, i) => <div key={i} className="flex items-center gap-1.5"><span>•</span> {err}</div>)}
                </div>
              )}

              {step === 0 && (
                /* Step 0: Tournament Details Overview (Inline Full-Page) */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Full Details */}
                  <div className="lg:col-span-8 space-y-8">
                    <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-sm bg-gray-150">
                      <img 
                        src={tournaments[registeringIndex].image} 
                        alt={tournaments[registeringIndex].title} 
                        className="w-full h-full object-cover object-top" 
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-2xl font-black text-gray-900 border-b border-gray-150 pb-2">Tournament Overview</h4>
                      <p className="text-gray-500 text-base leading-relaxed">
                        {tournaments[registeringIndex].description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-200/50">
                        <h4 className="text-lg font-bold text-gray-900">Match Format & Rules</h4>
                        <ul className="list-disc pl-5 text-gray-500 text-xs leading-relaxed space-y-1">
                          <li>Single Elimination, 3 sets match format with regular scoring.</li>
                          <li>Official Wilson US Open Extra Duty felt balls will be provided.</li>
                          <li>Warm-up is strictly limited to 10 minutes on-court before start.</li>
                          <li>All line calls are self-officiated; good sportsmanship is expected.</li>
                        </ul>
                      </div>

                      <div className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-200/50">
                        <h4 className="text-lg font-bold text-gray-900">Prizes & Player Perks</h4>
                        <ul className="list-disc pl-5 text-gray-500 text-xs leading-relaxed space-y-1">
                          <li>Custom Championship Trophy for the division winner.</li>
                          <li>500 UTR/USTA Club Ranking Points added to winner profiles.</li>
                          <li>Gift vouchers to the Ace Reserve Pro Shop for finalists.</li>
                          <li>All participants receive a custom-fitted Ace Reserve dry-fit T-shirt.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Sidebar Box */}
                  <div className="lg:col-span-4 bg-gray-950 text-white rounded-[2rem] p-8 border border-gray-850 space-y-6 shadow-xl w-full sticky top-24">
                    <h4 className="text-base font-extrabold text-blue-400 uppercase tracking-widest border-b border-gray-800 pb-3">
                      Event Summary
                    </h4>

                    <div className="space-y-4 text-xs font-semibold text-gray-300">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Division Category</span>
                        <span className="text-white font-bold">{tournaments[registeringIndex].category} Draw</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Schedule Date</span>
                        <span className="text-white font-bold">{formatDate(tournaments[registeringIndex].date)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Tournament Fee</span>
                        <span className="text-green-400 font-extrabold text-sm">{tournaments[registeringIndex].fee}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Registration Status</span>
                        <span className="text-blue-400 font-bold">Open</span>
                      </div>
                      {tournaments[registeringIndex].spotsLeft && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Remaining Slots</span>
                          <span className="text-red-400 font-bold">{tournaments[registeringIndex].spotsLeft} spots left</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-colors text-center text-sm shadow-lg shadow-blue-600/10 block"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                /* Step 1: Info Collection Form */
                <form onSubmit={handleStep1Submit} className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-150 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Player Name *</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                        placeholder="e.g. 3055550100"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Age *</label>
                      <input
                        type="number"
                        required
                        value={formAge}
                        onChange={(e) => setFormAge(e.target.value)}
                        placeholder="Player Age"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">UTR / USTA Rating ID (Optional)</label>
                      <input
                        type="text"
                        value={formRating}
                        onChange={(e) => setFormRating(e.target.value)}
                        placeholder="e.g. UTR 7.2 or USTA #8874"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">T-Shirt Size *</label>
                      <select
                        value={formShirt}
                        onChange={(e) => setFormShirt(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                      >
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full transition-colors text-sm"
                    >
                      Back to Details
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full transition-colors text-sm shadow-md shadow-blue-600/10"
                    >
                      Proceed to Checkout ({tournaments[registeringIndex].fee === "Free" ? "Free Event" : tournaments[registeringIndex].fee})
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                /* Step 2: Redesigned Secure Checkout with 3D Flipping Card & UPI Scanner */
                <div className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-150 shadow-sm">
                  
                  {/* Checkout Details Header */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-150 flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 text-xs uppercase font-extrabold tracking-wider block">Entry Total</span>
                      <span className="text-2xl font-black text-gray-900">
                        {tournaments[registeringIndex].fee === "Free" ? "$0.00 (Free Event)" : tournaments[registeringIndex].fee}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                      <ShieldCheck className="w-4.5 h-4.5 text-blue-600" /> SSL SECURE
                    </div>
                  </div>

                  {/* Payment Method Selector Tab Bar */}
                  <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
                    <button
                      onClick={() => { setPaymentMethod('card'); setPaymentStatus('idle'); }}
                      disabled={paymentStatus === 'processing'}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === 'card' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-550 hover:text-gray-800'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> Card Payment
                    </button>
                    <button
                      onClick={() => { setPaymentMethod('upi'); setPaymentStatus('idle'); }}
                      disabled={paymentStatus === 'processing'}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === 'upi' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-550 hover:text-gray-800'
                      }`}
                    >
                      <QrCode className="w-4 h-4" /> UPI Scanner
                    </button>
                  </div>

                  {paymentStatus === 'processing' ? (
                    /* Processing Loading State with spinner */
                    <div className="text-center py-12 space-y-6">
                      <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-50 border-t-blue-600 animate-spin"></div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">Processing Secure Transaction</h4>
                        <p className="text-gray-400 text-xs mt-1">
                          Verifying your credentials with BHIM SSL Gateway. Please wait.
                        </p>
                        <div className="w-32 bg-gray-150 h-1 rounded-full mx-auto mt-4 overflow-hidden">
                          <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${paymentProgress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ) : paymentMethod === 'card' ? (
                    /* Credit/Debit Card Method */
                    <form onSubmit={handleCardSubmit} className="space-y-6">
                      
                      {/* 3D-Flipped Virtual Card View container */}
                      <div className="flex justify-center mb-4">
                        <div className="w-full max-w-sm" style={{ perspective: '1000px' }}>
                          <div 
                            className="relative w-full h-48 rounded-[1.5rem] text-white p-6 shadow-xl transition-transform duration-500" 
                            style={{ 
                              transformStyle: 'preserve-3d', 
                              transform: isCardFlipped ? 'rotateY(180deg)' : 'none',
                              background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 50%, #0f172a 100%)'
                            }}
                          >
                            {/* FRONT SIDE */}
                            <div 
                              className="absolute inset-0 p-6 flex flex-col justify-between"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="flex justify-between items-start">
                                <div className="w-10 h-8 bg-amber-400 rounded-lg flex items-center justify-center opacity-85 shadow">
                                  <span className="block w-6 h-5 border border-amber-600/35 rounded-sm"></span>
                                </div>
                                <span className="font-extrabold text-sm italic tracking-widest text-blue-200">ACE PASS</span>
                              </div>

                              <div className="text-xl font-black tracking-widest text-center my-4 font-mono">
                                {cardNumber || "•••• •••• •••• ••••"}
                              </div>

                              <div className="flex justify-between items-center text-xs">
                                <div>
                                  <span className="text-blue-300 block text-[9px] uppercase font-bold tracking-wider">Cardholder</span>
                                  <span className="font-bold truncate max-w-[180px] block uppercase">{cardName || "YOUR NAME"}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-blue-300 block text-[9px] uppercase font-bold tracking-wider">Expires</span>
                                  <span className="font-bold">{cardExpiry || "MM/YY"}</span>
                                </div>
                              </div>
                            </div>

                            {/* BACK SIDE */}
                            <div 
                              className="absolute inset-0 flex flex-col justify-between py-6"
                              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                              <div className="w-full h-10 bg-gray-900/80 my-2"></div>
                              <div className="px-6 flex justify-between items-center gap-4">
                                <div className="flex-grow h-8 bg-white/20 rounded flex items-center justify-end px-3">
                                  <span className="text-gray-400 italic text-[10px]">Security Code</span>
                                </div>
                                <div className="bg-white text-gray-900 font-mono font-bold px-3 py-1 rounded text-center shrink-0">
                                  {cardCvc || "•••"}
                                </div>
                              </div>
                              <div className="px-6 text-[8px] text-blue-300/60 uppercase tracking-widest text-center mt-2">
                                Ace Reserve Tennis Club VIP Card
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* Input Fields */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Cardholder Name *</label>
                          <input
                            type="text"
                            required
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            onFocus={() => setIsCardFlipped(false)}
                            placeholder="Name as it appears on card"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Card Number *</label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                              const matches = v.match(/\d{4,16}/g);
                              const match = (matches && matches[0]) || '';
                              const parts = [];
                              for (let i=0, len=match.length; i<len; i+=4) {
                                parts.push(match.substring(i, i+4));
                              }
                              setCardNumber(parts.length > 0 ? parts.join(' ') : v);
                            }}
                            onFocus={() => setIsCardFlipped(false)}
                            placeholder="1234 5678 1234 5678"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Expiration *</label>
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={(e) => {
                                let v = e.target.value.replace(/[^0-9]/g, '');
                                if (v.length > 2) v = v.substring(0,2) + '/' + v.substring(2,4);
                                setCardExpiry(v);
                              }}
                              onFocus={() => setIsCardFlipped(false)}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm text-center"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">CVC Code *</label>
                            <input
                              type="password"
                              required
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                              onFocus={() => setIsCardFlipped(true)}
                              placeholder="•••"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm text-center"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full transition-colors text-sm"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full transition-colors shadow-lg shadow-blue-600/10 text-sm"
                        >
                          Confirm Payment & Entry
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* UPI QR Code Scanner Method */
                    <div className="text-center space-y-6">
                      <div className="space-y-6 py-4">
                        <div className="w-48 h-48 bg-white border border-gray-250 rounded-2xl mx-auto p-4 flex items-center justify-center relative shadow-sm">
                          <QrCode className="w-full h-full text-gray-800" />
                          <ScanLine className="w-12 h-12 text-blue-600 absolute animate-bounce" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Scan BHIM UPI QR Code</h4>
                          <p className="text-gray-400 text-xs mt-1">
                            Scan with Google Pay, PhonePe, Paytm, or BHIM app to authorize.
                          </p>
                        </div>
                        <button
                          onClick={handleSimulateUpi}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow shadow-blue-600/10 flex items-center gap-2 mx-auto"
                        >
                          <ArrowLeftRight className="w-4 h-4" /> Simulate QR Payment Scan
                        </button>
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => { setStep(1); setPaymentStatus('idle'); }}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full transition-colors text-sm"
                        >
                          Back to Info
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {step === 3 && (
                /* Step 3: Success Pass Screen */
                <div className="text-center space-y-8 py-4 max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-150 shadow-sm animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-blue-600" />
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2">Registration Confirmed!</h4>
                    <p className="text-gray-500 text-sm">
                      Thank you for registering, {formName}. Your competitive tournament pass is ready.
                    </p>
                  </div>

                  {/* Visual Pass Ticket */}
                  <div id="print-ticket" className="bg-white border-2 border-dashed border-gray-200 rounded-[2rem] p-6 max-w-sm mx-auto shadow-inner text-left space-y-6 relative overflow-hidden">
                    {/* Ticket Brand Banner */}
                    <div className="bg-blue-950 text-white -mx-6 -mt-6 p-4 text-center">
                      <span className="font-extrabold tracking-widest text-[10px] uppercase text-blue-400 block mb-0.5">ACE RESERVE TENNIS CLUB</span>
                      <span className="text-sm font-bold">DIGITAL COMPETITIVE PASS</span>
                    </div>

                    {/* Ticket Details */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase">
                        <span>Event Entry</span>
                        <span className="text-blue-600">Confirmed</span>
                      </div>
                      <h5 className="font-black text-gray-900 text-base leading-tight">
                        {tournaments[registeringIndex].title}
                      </h5>
                      <p className="text-gray-500 text-xs">
                        Date: <span className="font-bold text-gray-800">{formatDate(tournaments[registeringIndex].date)}</span>
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 font-semibold block mb-0.5">Player Name</span>
                        <span className="font-bold text-gray-800">{formName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold block mb-0.5">Division / UTR</span>
                        <span className="font-bold text-gray-800">{formRating || "Standard Draw"}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold block mb-0.5">Shirt Size</span>
                        <span className="font-bold text-gray-800">Size {formShirt}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold block mb-0.5">Pass ID</span>
                        <span className="font-bold text-blue-600">{ticketId}</span>
                      </div>
                    </div>

                    {/* Mock QR Code Visual Layout */}
                    <div className="border-t border-gray-100 pt-4 flex flex-col items-center gap-2">
                      <div className="w-32 h-32 bg-gray-100 border border-gray-250 rounded-xl p-2 flex items-center justify-center relative shadow-sm">
                        <QrCode className="w-full h-full text-gray-800" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Present QR Code at Desk for Check-In</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleDownloadPng}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/10 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Pass (PNG)
                    </button>
                    <button
                      onClick={handlePrint}
                      className="bg-gray-150 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 border border-gray-200"
                    >
                      <Printer className="w-4 h-4" /> Print Pass
                    </button>
                    <button
                      onClick={() => setRegisteringIndex(null)}
                      className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md"
                    >
                      Back to Listings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Interactive Bracket visualizer modal */}
        {drawsTournamentIndex !== null && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-[2.5rem] w-full max-w-5xl overflow-hidden border border-gray-100 shadow-2xl relative animate-fade-in my-8">
              {/* Modal Header */}
              <div className="bg-blue-950 text-white px-8 py-6 flex justify-between items-center relative">
                <div>
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-1">Tournament Draw Sheet</span>
                  <h3 className="text-2xl font-bold">{tournaments[drawsTournamentIndex].title}</h3>
                </div>
                <button 
                  onClick={() => setDrawsTournamentIndex(null)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bracket Tree Board */}
              <div className="p-8 bg-gray-50 overflow-x-auto min-w-[750px] md:min-w-fit">
                <div className="grid grid-cols-4 gap-4 items-center justify-between relative">
                  
                  {/* ROUND 1: QUARTERFINALS */}
                  <div className="space-y-6 flex flex-col justify-around h-[380px]">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block text-center mb-2">Quarterfinals</span>
                    {generateBracketData(tournaments[drawsTournamentIndex].title).qf.map((match, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm space-y-1.5 text-xs relative">
                        <div className={`flex justify-between items-center px-1.5 py-0.5 rounded ${match.winner === 1 ? 'font-bold text-blue-700 bg-blue-50/50' : 'text-gray-550'}`}>
                          <span className="truncate max-w-[100px]">{match.p1}</span>
                          <span className="font-mono text-[10px]">{match.s1}</span>
                        </div>
                        <div className={`flex justify-between items-center px-1.5 py-0.5 rounded ${match.winner === 2 ? 'font-bold text-blue-700 bg-blue-50/50' : 'text-gray-550'}`}>
                          <span className="truncate max-w-[100px]">{match.p2}</span>
                          <span className="font-mono text-[10px]">{match.s2}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ROUND 2: SEMIFINALS */}
                  <div className="space-y-12 flex flex-col justify-around h-[380px] pl-6 relative">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block text-center mb-2">Semifinals</span>
                    {generateBracketData(tournaments[drawsTournamentIndex].title).sf.map((match, i) => (
                      <div key={i} className="bg-white border border-blue-100 rounded-xl p-3 shadow-md space-y-1.5 text-xs relative">
                        <div className={`flex justify-between items-center px-1.5 py-0.5 rounded ${match.winner === 1 ? 'font-bold text-blue-700 bg-blue-50/50' : 'text-gray-550'}`}>
                          <span className="truncate max-w-[100px]">{match.p1}</span>
                          <span className="font-mono text-[10px]">{match.s1}</span>
                        </div>
                        <div className={`flex justify-between items-center px-1.5 py-0.5 rounded ${match.winner === 2 ? 'font-bold text-blue-700 bg-blue-50/50' : 'text-gray-550'}`}>
                          <span className="truncate max-w-[100px]">{match.p2}</span>
                          <span className="font-mono text-[10px]">{match.s2}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ROUND 3: FINALS */}
                  <div className="space-y-24 flex flex-col justify-center h-[380px] pl-6 relative">
                    <div className="space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block text-center mb-2">Grand Finals</span>
                      {(() => {
                        const match = generateBracketData(tournaments[drawsTournamentIndex].title).f;
                        return (
                          <div className="bg-gray-900 text-white border border-gray-800 rounded-xl p-4 shadow-xl space-y-2 text-xs relative">
                            <div className={`flex justify-between items-center px-1.5 py-1 rounded ${match.winner === 1 ? 'font-bold text-amber-400 bg-white/5' : 'text-gray-400'}`}>
                              <span className="truncate max-w-[100px]">{match.p1}</span>
                              <span className="font-mono text-[10px]">{match.s1}</span>
                            </div>
                            <div className={`flex justify-between items-center px-1.5 py-1 rounded ${match.winner === 2 ? 'font-bold text-amber-400 bg-white/5' : 'text-gray-400'}`}>
                              <span className="truncate max-w-[100px]">{match.p2}</span>
                              <span className="font-mono text-[10px]">{match.s2}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* CHAMPION SHOWCASE */}
                  <div className="flex flex-col items-center justify-center h-[380px] text-center pl-6">
                    <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center mb-4 shadow animate-bounce">
                      <Trophy className="w-8 h-8 text-amber-500" />
                    </div>
                    <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider block mb-1">Champion</span>
                    <h4 className="text-xl font-black text-gray-900">
                      {generateBracketData(tournaments[drawsTournamentIndex].title).champion}
                    </h4>
                    <span className="text-gray-450 text-[10px] font-semibold mt-1">Ace Reserve Club Cup winner</span>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 border-t border-gray-100 px-8 py-5 flex justify-end">
                <button 
                  onClick={() => setDrawsTournamentIndex(null)}
                  className="bg-blue-650 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all"
                >
                  Close Draws
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
