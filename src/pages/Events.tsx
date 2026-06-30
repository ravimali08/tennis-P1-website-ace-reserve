import { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, Users, ArrowRight, X, Sparkles, CheckCircle, Printer, MessageSquare, CreditCard, Smartphone, ShieldCheck, User, Mail, Phone } from 'lucide-react';

interface ClubEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  price: string;
  spotsLeft: number;
  image: string;
  description: string;
  targetAudience: string;
  ageGroup: string;
}

export default function Events() {
  // Checkout States
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<0 | 1 | 2 | 3>(0); // Step 0 is Event Details
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // Payment states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [ticketId, setTicketId] = useState("");

  const events: ClubEvent[] = [
    {
      id: 1,
      title: "Summer Members' Mixer",
      date: "Jul 18, 2025",
      time: "18:00",
      type: "Social",
      price: "Free",
      spotsLeft: 45,
      image: "/images/event-members-mixer.png",
      description: "An evening of tennis, food, and music exclusively for Ace Reserve members. Meet fellow players, enjoy complimentary refreshments, and participate in friendly round-robin matches.",
      targetAudience: "All (Adults, Teenagers, Kids)",
      ageGroup: "All Ages"
    },
    {
      id: 2,
      title: "Open Court Day",
      date: "Jul 26, 2025",
      time: "10:00",
      type: "Community",
      price: "Free",
      spotsLeft: 120,
      image: "/images/event-open-court.png",
      description: "Try our world-class courts for free. Open to the entire community, this event includes free mini-lessons, court time, and tours of the club facilities.",
      targetAudience: "All (Adults, Teenagers, Kids)",
      ageGroup: "All Ages"
    },
    {
      id: 3,
      title: "Cardio Tennis Night",
      date: "Aug 02, 2025",
      time: "19:00",
      type: "Fitness",
      price: "$25",
      spotsLeft: 20,
      image: "/images/event-cardio-tennis.png",
      description: "High-energy group fitness on the court. Perfect for all levels, this calorie-burning session combines tennis drills with music and movement.",
      targetAudience: "Adults",
      ageGroup: "18+ Years"
    },
    {
      id: 4,
      title: "Junior Awards Banquet",
      date: "Aug 15, 2025",
      time: "17:30",
      type: "Social",
      price: "$35",
      spotsLeft: 80,
      image: "/images/event-junior-awards.png",
      description: "Celebrate the achievements of our junior players with dinner, awards, and highlights from the season. Families and guests welcome.",
      targetAudience: "Kids & Teenagers",
      ageGroup: "Under 18 Years"
    },
    {
      id: 5,
      title: "Community Tennis Festival",
      date: "Sep 06, 2025",
      time: "11:00",
      type: "Community",
      price: "$10",
      spotsLeft: 200,
      image: "/images/tourney-junior-funcup.png",
      description: "A fun-filled day for the whole family featuring exhibition matches, kids' activities, food trucks, and raffle prizes. Open to all.",
      targetAudience: "All (Adults, Teenagers, Kids)",
      ageGroup: "All Ages"
    },
    {
      id: 6,
      title: "Pro-Am Doubles Clinic",
      date: "Sep 20, 2025",
      time: "14:00",
      type: "Clinic",
      price: "$75",
      spotsLeft: 16,
      image: "/images/blog-doubles.png",
      description: "Play alongside our elite coaches in a pro-am doubles clinic. Includes strategy sessions, match play, and post-clinic refreshments.",
      targetAudience: "Adults",
      ageGroup: "18+ Years"
    }
  ];

  const handleOpenGetTicket = (event: ClubEvent) => {
    setSelectedEvent(event);
    setCheckoutStep(0);
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvc("");
    setPaymentMethod('card');
  };

  // Payment simulation logic
  useEffect(() => {
    let interval: any;
    if (isProcessing) {
      interval = setInterval(() => {
        setProgressPercentage((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            setTicketId(`AR-EVT-${Math.floor(100000 + Math.random() * 900000)}`);
            setCheckoutStep(3);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    // Name validation
    if (userName.trim().length < 2) {
      alert("Please enter your full name (at least 2 characters).");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone validation
    const cleanPhone = userPhone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      alert("Please enter a valid phone number (at least 10 digits).");
      return;
    }

    if (selectedEvent.price === "Free") {
      // Free event: Skip payment step and go straight to Step 3
      setTicketId(`AR-EVT-${Math.floor(100000 + Math.random() * 900000)}`);
      setCheckoutStep(3);
    } else {
      // Paid event: Go to Payment step
      setCheckoutStep(2);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cardName.trim().length < 2) {
      alert("Please enter the cardholder name.");
      return;
    }

    const cleanCard = cardNumber.replace(/\D/g, "");
    if (cleanCard.length !== 16) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }

    if (cardExpiry.length !== 5) {
      alert("Please enter card expiry in MM/YY format.");
      return;
    }
    const [m] = cardExpiry.split("/");
    const month = parseInt(m, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      alert("Please enter a valid expiration month (01-12).");
      return;
    }

    const cleanCvc = cardCvc.replace(/\D/g, "");
    if (cleanCvc.length !== 3) {
      alert("Please enter a valid 3-digit CVC code.");
      return;
    }

    setIsProcessing(true);
    setProgressPercentage(0);
  };

  const triggerQrPayment = () => {
    setIsProcessing(true);
    setProgressPercentage(0);
  };

  const closeCheckout = () => {
    setSelectedEvent(null);
    setCheckoutStep(0);
  };

  // Card Inputs Formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s?/g, '').replace(/\D/g, '');
    const parts = [];
    for (let i = 0; i < val.length; i += 4) {
      parts.push(val.substring(i, i + 4));
    }
    if (parts.length > 0) {
      setCardNumber(parts.join(' ').substring(0, 19));
    } else {
      setCardNumber("");
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\//g, '').replace(/\D/g, '');
    if (val.length >= 2) {
      setCardExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`.substring(0, 5));
    } else {
      setCardExpiry(val);
    }
  };

  // Direct PNG Ticket Exporter via HTML5 Canvas
  const handleDownloadPng = () => {
    if (!selectedEvent) return;

    const canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clip rounded corners
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 48);
    ctx.clip();

    // Gradient by event type
    const grad = ctx.createLinearGradient(0, height, width, 0);
    if (selectedEvent.type === "Social") {
      grad.addColorStop(0, "#083344"); // cyan-950
      grad.addColorStop(0.5, "#1e3a8a"); // blue-900
      grad.addColorStop(1, "#1e1b4b"); // indigo-950
    } else if (selectedEvent.type === "Community") {
      grad.addColorStop(0, "#022c22"); // emerald-950
      grad.addColorStop(0.5, "#0f766e"); // teal-700
      grad.addColorStop(1, "#164e63"); // cyan-900
    } else {
      grad.addColorStop(0, "#0c0a09"); // stone-950
      grad.addColorStop(0.5, "#78350f"); // amber-900
      grad.addColorStop(1, "#451a03"); // amber-950
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);



    // Left Header Logo text
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 28px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("ACE RESERVE", 50, 80);

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("MIAMI TENNIS CLUB", 50, 110);

    // Right Header Badge (EVENT PASS) - flat styling
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.roundRect(width - 240, 50, 190, 44, 22);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("EVENT ACCESS PASS", width - 145, 77);

    // Event Title
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("EVENT PASS TICKET", 50, 310);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 36px sans-serif";
    ctx.fillText(selectedEvent.title.toUpperCase(), 50, 365);

    // Footer divider line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 430);
    ctx.lineTo(width - 50, 430);
    ctx.stroke();

    // Metadata
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("TICKET ID", 50, 480);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px monospace";
    ctx.fillText(ticketId, 50, 520);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("DATE & TIME", 300, 480);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(`${selectedEvent.date} @ ${selectedEvent.time}`, 300, 520);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("ATTENDEE", 580, 480);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(userName.toUpperCase() || "HOLDER NAME", 580, 520);

    // Price Pill / Tag (Right side)
    ctx.fillStyle = "#22c55e"; // green color
    ctx.font = "900 18px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(selectedEvent.price === "Free" ? "FREE ENTRY" : `FEE: ${selectedEvent.price}`, width - 50, 480);

    // Mock Barcode block
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.beginPath();
    ctx.roundRect(width - 240, 500, 190, 44, 6);
    ctx.fill();

    ctx.fillStyle = "#000000";
    const bars = [2, 6, 4, 8, 2, 4, 6, 2, 8, 4, 2, 6, 4, 2, 8];
    let currentX = width - 230;
    for (let i = 0; i < bars.length; i++) {
      ctx.fillRect(currentX, 505, bars[i], 34);
      currentX += bars[i] + 4;
    }

    // Trigger download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${userName.replace(/\s+/g, '_')}_event_ticket.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Rebuilt Cover Hero Section */}
        <div className="relative rounded-[3rem] overflow-hidden p-8 md:p-20 text-white mb-16 shadow-2xl border border-white/10 no-print">
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            >
              <source src="/videos/EV_HR_VDS.mp4" type="video/mp4" />
            </video>
            {/* 20% Opacity Blue Overlay */}
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-3xl text-left">
            <span className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 text-blue-300">
              <Sparkles className="w-4 h-4 text-blue-400" /> Club Socials & Clinics
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Club Events & Mixers
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 mb-8 leading-relaxed">
              Connect with fellow members, improve your conditioning, and celebrate milestones together. RSVP for our upcoming mixers, cardio drills, and banquets.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#events-grid" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Explore Event Calendar
              </a>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div id="events-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 no-print">
          {events.map((event, index) => (
            <div key={index} className="bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 group flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 text-left">
              <div>
                {/* Image Section */}
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent mix-blend-multiply"></div>
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-wider shadow-sm">
                    {event.type}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {event.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 border-b border-gray-200/50 pb-5">
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                      <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-semibold text-gray-900">
                        {event.price === "Free" ? "Free Entry" : event.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                      <Users className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{event.spotsLeft} spots left</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-550 text-gray-500 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
              
              <div className="px-8 pb-8 pt-2">
                <button 
                  onClick={() => handleOpenGetTicket(event)}
                  className="bg-blue-650 bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-full font-bold transition-all shadow-md shadow-blue-600/10 text-center text-sm"
                >
                  Get Ticket
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EVENTS WIZARD OVERLAY MODAL */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto no-print">
            <div className={`bg-white rounded-[2.5rem] w-full ${checkoutStep === 0 ? 'max-w-4xl' : 'max-w-2xl'} overflow-hidden border border-gray-150 shadow-2xl relative my-8 text-left`}>
              
              {/* Modal Close */}
              {checkoutStep !== 3 && (
                <button 
                  onClick={closeCheckout}
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-250 rounded-full transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* STEP 0: EVENT DETAILS PAGE OVERVIEW */}
              {checkoutStep === 0 && (
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Left Detail Panel */}
                  <div className="md:w-3/5 p-8 space-y-6">
                    <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block">Event Details</span>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">{selectedEvent.title}</h2>
                    
                    <div className="aspect-video rounded-2xl overflow-hidden border border-gray-100">
                      <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover object-top" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">About the Event</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{selectedEvent.description}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Session Highlights</h4>
                      <ul className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Professional Court Setup</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Staff Coordinator Guided</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Complimentary Drinks Included</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Exclusive Club Entry Pass</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Sidebar Price & Ticket Card */}
                  <div className="md:w-2/5 bg-gray-50 p-8 border-l border-gray-150 flex flex-col justify-between">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">Event Ticket</h3>
                      
                      <div className="space-y-4 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Date</span>
                            <span className="text-gray-800 font-bold">{selectedEvent.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Start Time</span>
                            <span className="text-gray-800 font-bold">{selectedEvent.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600 shrink-0" />
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Remaining Spots</span>
                            <span className="text-gray-800 font-bold">{selectedEvent.spotsLeft} Available</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-blue-600 shrink-0" />
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Eligible Audience / Age</span>
                            <span className="text-gray-800 font-bold">
                              {selectedEvent.ageGroup === "All Ages" ? "All Ages" : `${selectedEvent.targetAudience} (${selectedEvent.ageGroup})`}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-blue-600 shrink-0" />
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Entry Fee</span>
                            <span className={`text-sm font-black ${selectedEvent.price === "Free" ? "text-green-650 text-green-600" : "text-gray-900"}`}>
                              {selectedEvent.price === "Free" ? "Free Entry" : `${selectedEvent.price} per ticket`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-bold shadow-md shadow-blue-600/10 text-center text-sm"
                      >
                        Get Ticket
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Steps Header (1 & 2 only) */}
              {checkoutStep > 0 && checkoutStep < 3 && (
                <div className="bg-blue-950 text-white p-6 md:p-8 relative">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 block mb-1">EVENT ACCESS TICKET</span>
                  <h3 className="text-2xl font-black">{selectedEvent.title}</h3>
                  
                  {/* Step indicators */}
                  <div className="flex gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        checkoutStep >= 1 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'
                      }`}>1</span>
                      <span className="text-xs font-semibold text-white/90">Info</span>
                    </div>
                    {selectedEvent.price !== "Free" && (
                      <>
                        <div className="h-0.5 bg-white/20 w-8 self-center"></div>
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            checkoutStep >= 2 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'
                          }`}>2</span>
                          <span className={`text-xs font-semibold ${checkoutStep >= 2 ? 'text-white' : 'text-white/40'}`}>Payment</span>
                        </div>
                      </>
                    )}
                    <div className="h-0.5 bg-white/20 w-8 self-center"></div>
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        checkoutStep === 3 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'
                      }`}>3</span>
                      <span className={`text-xs font-semibold ${checkoutStep === 3 ? 'text-white' : 'text-white/40'}`}>Event Pass</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: PERSONAL INFORMATION */}
              {checkoutStep === 1 && (
                <form onSubmit={handleInfoSubmit} className="p-8 space-y-6">
                  <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-0.5">Selected Event</span>
                      <span className="text-lg font-bold text-blue-955 text-blue-950 leading-tight block">{selectedEvent.title}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xl font-black ${selectedEvent.price === "Free" ? "text-green-600" : "text-blue-950"}`}>
                        {selectedEvent.price === "Free" ? "FREE" : selectedEvent.price}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Entry Ticket</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white text-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="jane.doe@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white text-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                          placeholder="Enter 10-digit number"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white text-gray-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(0)}
                      className="text-gray-500 hover:text-gray-800 text-sm font-bold flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" /> Back to Details
                    </button>
                    
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/10"
                    >
                      {selectedEvent.price === "Free" ? "Confirm Free Ticket" : "Proceed to Payment"}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: PAYMENT OVERLAY (Paid Events Only) */}
              {checkoutStep === 2 && (
                <div className="p-8 space-y-6">
                  {isProcessing ? (
                    <div className="text-center py-16 space-y-6 bg-gray-50 rounded-3xl border border-gray-100 animate-pulse">
                      <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-50 border-t-blue-600 animate-spin"></div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-850">Processing Secure Payment</h4>
                        <p className="text-gray-400 text-xs mt-1">
                          Communicating with secure merchant channels... ({progressPercentage}%)
                        </p>
                        <div className="w-48 bg-gray-200 h-1.5 rounded-full mx-auto mt-4 overflow-hidden">
                          <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Method Tabs Selector */}
                      <div className="flex bg-gray-100 p-1.5 rounded-full border border-gray-200/50">
                        <button
                          onClick={() => setPaymentMethod('card')}
                          className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            paymentMethod === 'card' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" /> Credit / Debit Card
                        </button>
                        <button
                          onClick={() => setPaymentMethod('qr')}
                          className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            paymentMethod === 'qr' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          <Smartphone className="w-4 h-4" /> Scan QR (Foreign Guests)
                        </button>
                      </div>

                      {/* Credit card payments */}
                      {paymentMethod === 'card' && (
                        <form onSubmit={handlePaymentSubmit} className="space-y-6">
                          
                          {/* 3D card layout */}
                          <div className="relative w-full max-w-sm mx-auto h-48 [perspective:1000px] mb-8">
                            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isCardFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                              {/* Front */}
                              <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-tr from-blue-900 via-indigo-900 to-indigo-950 text-white flex flex-col justify-between shadow-xl [backface-visibility:hidden]">
                                <div className="flex justify-between items-start">
                                  <span className="font-bold tracking-widest text-[9px] uppercase text-white/50">SECURE MERCHANT CARD</span>
                                  <div className="w-10 h-7 bg-amber-400/80 rounded-md border border-amber-300/30"></div>
                                </div>
                                <div className="font-mono text-lg tracking-widest py-2 text-center text-white/95">
                                  {cardNumber || "•••• •••• •••• ••••"}
                                </div>
                                <div className="flex justify-between text-xs">
                                  <div>
                                    <span className="text-[8px] uppercase tracking-wider text-white/40 block">Cardholder</span>
                                    <span className="font-semibold tracking-wide uppercase truncate max-w-[150px] block">{cardName || "YOUR FULL NAME"}</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[8px] uppercase tracking-wider text-white/40 block">Expires</span>
                                    <span className="font-mono font-semibold">{cardExpiry || "MM/YY"}</span>
                                  </div>
                                </div>
                              </div>
                              {/* Back */}
                              <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-blue-950 to-indigo-950 text-white flex flex-col justify-between shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <div className="bg-gray-800 h-10 w-full mt-4"></div>
                                <div className="px-6 py-2">
                                  <div className="flex items-center justify-end bg-white/10 p-2 rounded">
                                    <span className="text-[8px] uppercase text-white/40 mr-2 font-mono">CVV</span>
                                    <span className="font-mono text-sm tracking-widest font-extrabold text-white">{cardCvc || "•••"}</span>
                                  </div>
                                </div>
                                <div className="p-4 text-[7px] text-white/30 text-center font-mono">
                                  Security certified payment gateway. SSL transaction ID confirmed.
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Inputs */}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cardholder Name</label>
                              <input
                                type="text"
                                required
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="Name as it appears on card"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Number</label>
                              <input
                                type="text"
                                required
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="0000 0000 0000 0000"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-mono"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expiration Date</label>
                                <input
                                  type="text"
                                  required
                                  value={cardExpiry}
                                  onChange={handleExpiryChange}
                                  placeholder="MM/YY"
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Security Code (CVC)</label>
                                <input
                                  type="password"
                                  required
                                  maxLength={3}
                                  value={cardCvc}
                                  onFocus={() => setIsCardFlipped(true)}
                                  onBlur={() => setIsCardFlipped(false)}
                                  onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                  placeholder="123"
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-mono"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setCheckoutStep(1)}
                              className="text-gray-500 hover:text-gray-800 text-sm font-bold flex items-center gap-1.5"
                            >
                              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Info
                            </button>
                            
                            <button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/10"
                            >
                              Pay {selectedEvent.price} Securely
                            </button>
                          </div>
                        </form>
                      )}

                      {/* QR payment simulator */}
                      {paymentMethod === 'qr' && (
                        <div className="text-center py-6 space-y-6">
                          <div className="bg-gray-550 bg-gray-50 border border-gray-150 p-6 rounded-3xl max-w-xs mx-auto space-y-4">
                            <div className="relative aspect-square w-48 mx-auto bg-white border border-gray-200 p-2 rounded-xl flex items-center justify-center overflow-hidden">
                              <div className="absolute left-0 w-full h-0.5 bg-blue-600 shadow-lg shadow-blue-500/50 animate-[bounce_2s_infinite]"></div>
                              <svg className="w-full h-full text-gray-800" viewBox="0 0 100 100" fill="currentColor">
                                <path d="M5,5 h30 v30 h-30 z M10,10 h20 v20 h-20 z M15,15 h10 v10 h-10 z" />
                                <path d="M65,5 h30 v30 h-30 z M70,10 h20 v20 h-20 z M75,15 h10 v10 h-10 z" />
                                <path d="M5,65 h30 v30 h-30 z M10,70 h20 v20 h-20 z M15,75 h10 v10 h-10 z" />
                                <path d="M45,10 h10 v10 h-10 z M45,25 h15 v5 h-15 z M50,35 h5 v5 h-5 z" />
                                <path d="M70,45 h10 v10 h-10 z M85,45 h10 v5 h-10 z M80,55 h15 v10 h-15 z" />
                                <path d="M45,65 h10 v15 h-10 z M50,85 h15 v5 h-15 z M75,75 h20 v20 h-20 z" />
                              </svg>
                            </div>
                            <div className="text-xs">
                              <span className="font-extrabold text-gray-805 text-gray-800 block">International Merchant QR</span>
                              <span className="text-gray-400 mt-0.5 block">Supports Visa, Mastercard, AMEX</span>
                            </div>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={triggerQrPayment}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/10"
                            >
                              Simulate QR Payment Scan
                            </button>
                          </div>

                          <div className="pt-4 border-t border-gray-100 flex justify-start">
                            <button
                              type="button"
                              onClick={() => setCheckoutStep(1)}
                              className="text-gray-500 hover:text-gray-800 text-sm font-bold flex items-center gap-1.5"
                            >
                              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Info
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* STEP 3: EVENT TICKET GENERATOR */}
              {checkoutStep === 3 && (
                <div className="p-8 text-center space-y-8">
                  <div className="no-print">
                    <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-1">Pass ID Confirmed!</h4>
                    <p className="text-gray-550 text-gray-500 text-xs">
                      Your event access ticket pass is generated. Present this ticket at the front gate.
                    </p>
                  </div>

                  {/* The Access Card Badge */}
                  <div 
                    id="print-membership-card" 
                    className={`w-full max-w-lg mx-auto aspect-[1.58] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between select-none text-left ${
                      selectedEvent.type === "Social"
                        ? "bg-gradient-to-tr from-cyan-950 via-blue-900 to-indigo-950 border border-blue-500/20"
                        : selectedEvent.type === "Community"
                          ? "bg-gradient-to-tr from-emerald-950 via-teal-900 to-cyan-900 border border-teal-500/20"
                          : "bg-gradient-to-tr from-stone-950 via-amber-900 to-amber-950 border border-amber-500/25"
                    }`}
                  >


                    {/* Header Row */}
                    <div className="flex justify-between items-start z-10 relative">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-5 h-5 text-blue-400" />
                          <span className="font-extrabold tracking-widest text-xs uppercase text-white">ACE RESERVE</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-white/60 font-bold block">Miami Tennis Club</span>
                      </div>
                      <span className="text-[10px] font-black tracking-widest uppercase bg-black/25 px-3 py-1 rounded-full text-white/90">
                        EVENT ACCESS PASS
                      </span>
                    </div>

                    {/* Body Row (Event Title) */}
                    <div className="z-10 relative my-2">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-white/50 block mb-0.5">Event Pass Title</span>
                      <span className="text-xl font-bold uppercase tracking-tight truncate block max-w-xs">{selectedEvent.title}</span>
                    </div>

                    {/* Footer Row */}
                    <div className="flex justify-between items-end border-t border-white/10 pt-4 z-10 relative">
                      <div className="space-y-1 text-xs">
                        <div className="grid grid-cols-2 gap-x-6">
                          <div>
                            <span className="text-[9px] uppercase text-white/40 block font-bold">Ticket ID</span>
                            <span className="font-mono font-bold tracking-wider text-white/95">{ticketId}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase text-white/40 block font-bold">Attendee</span>
                            <span className="font-bold text-white/95 uppercase truncate block max-w-[100px]">{userName}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-white/40 block font-bold">Schedule Time</span>
                          <span className="font-bold text-[10px] text-white/90">{selectedEvent.date} @ {selectedEvent.time}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black tracking-wider text-green-400 bg-green-950/40 px-2 py-0.5 rounded border border-green-500/20 block uppercase text-[10px] mb-1.5">
                          {selectedEvent.price === "Free" ? "FREE ENTRY" : `FEE: ${selectedEvent.price}`}
                        </span>
                        
                        {/* Barcode */}
                        <div className="h-6 w-24 bg-white/95 rounded px-1 flex items-center justify-center gap-0.5 overflow-hidden">
                          {[1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4].map((w, idx) => (
                            <div key={idx} className="bg-black h-full shrink-0" style={{ width: `${w}px` }}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 justify-center pt-4 border-t border-gray-150 no-print">
                    <button
                      onClick={handleDownloadPng}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold text-sm transition-all border border-gray-200 flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" /> Download Ticket (PNG)
                    </button>
                    <button
                      onClick={closeCheckout}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-600/10"
                    >
                      Finish & Close
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
