import { useState } from 'react';
import { Clock, Award, CheckCircle, X, ChevronRight, HelpCircle, ShieldCheck, CreditCard, QrCode, ArrowLeft, CircleAlert, Activity, Download } from 'lucide-react';

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

function generateRandomEnrollmentId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const randomNum2 = Math.floor(1000 + Math.random() * 9000);
  return `AC-${randomNum}-${randomNum2}`;
}

export default function Coaching() {
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Checkout Registration Modal State
  const [checkoutProgramId, setCheckoutProgramId] = useState<number | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");

  // Card details
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentProgress, setPaymentProgress] = useState(0);

  const [enrollmentId, setEnrollmentId] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [paymentErrors, setPaymentErrors] = useState<string[]>([]);

  // Generation of Enrollment ID and form initiation
  const startRegister = (programId: number) => {
    setCheckoutProgramId(programId);
    const prog = programs.find(p => p.id === programId);
    if (prog) {
      setSelectedSchedule(prog.schedule[0]);
    }
    setCheckoutStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setPaymentStatus('idle');
    setPaymentProgress(0);
    setValidationErrors([]);
    setPaymentErrors([]);
    
    // Generate random Enrollment ID
    setEnrollmentId(generateRandomEnrollmentId());
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
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

  const validateStep1 = () => {
    const errors = [];
    if (!name.trim()) errors.push("Full Name is required.");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.push("Please provide a valid email address.");
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) errors.push("Phone number must be exactly 10 digits.");
    if (!selectedSchedule) errors.push("Please select a session schedule.");
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCheckoutStep(2);
    }
  };

  const validatePayment = () => {
    const errors = [];
    if (!cardName.trim()) errors.push("Cardholder Name is required.");
    if (cardNumber.replace(/\s/g, '').length !== 16) errors.push("Please enter a valid 16-digit card number.");
    if (cardExpiry.length !== 5) {
      errors.push("Please enter card expiry in MM/YY format.");
    } else {
      const [m] = cardExpiry.split("/");
      const month = parseInt(m, 10);
      if (isNaN(month) || month < 1 || month > 12) {
        errors.push("Please enter a valid expiration month (01-12).");
      }
    }
    if (cardCvc.replace(/\D/g, '').length !== 3) errors.push("Please enter a valid 3-digit CVV code.");
    setPaymentErrors(errors);
    return errors.length === 0;
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      simulatePayment();
    }
  };

  const simulatePayment = () => {
    setPaymentStatus('processing');
    setPaymentProgress(0);
    const interval = setInterval(() => {
      setPaymentProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setPaymentStatus('success');
          setCheckoutStep(3);
          return 100;
        }
        return old + 20;
      });
    }, 300);
  };

  const triggerQrPayment = () => {
    setPaymentStatus('processing');
    setPaymentProgress(0);
    const interval = setInterval(() => {
      setPaymentProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setPaymentStatus('success');
          setCheckoutStep(3);
          return 100;
        }
        return old + 25;
      });
    }, 400);
  };

  const closeCheckout = () => {
    setCheckoutProgramId(null);
    setCheckoutStep(1);
  };

  const handleDownloadPng = () => {
    const checkoutProgram = programs.find(p => p.id === checkoutProgramId);
    if (!checkoutProgram) return;

    // Create high-res canvas (960 x 600 px)
    const canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clip rounded corners (radius 48px)
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 48);
    ctx.clip();

    // Create program-specific gradient background
    const grad = ctx.createLinearGradient(0, height, width, 0);
    if (checkoutProgram.title.includes("Elite")) {
      grad.addColorStop(0, "#0c0a09"); // stone-950
      grad.addColorStop(0.5, "#1c1917"); // stone-900
      grad.addColorStop(1, "#78350f"); // amber-900
    } else if (checkoutProgram.title.includes("Kids")) {
      grad.addColorStop(0, "#064e3b"); // emerald-955
      grad.addColorStop(0.5, "#0f766e"); // teal-700
      grad.addColorStop(1, "#0369a1"); // sky-700
    } else if (checkoutProgram.title.includes("Teenager")) {
      grad.addColorStop(0, "#1e1b4b"); // indigo-950
      grad.addColorStop(0.5, "#4338ca"); // indigo-700
      grad.addColorStop(1, "#6d28d9"); // violet-700
    } else {
      // Adult
      grad.addColorStop(0, "#0f172a"); // slate-900
      grad.addColorStop(0.5, "#1d4ed8"); // blue-700
      grad.addColorStop(1, "#1e3a8a"); // blue-900
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
    ctx.fillText("MIAMI TENNIS ACADEMY", 50, 110);

    // Right Header Badge
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.roundRect(width - 320, 50, 270, 44, 22);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("OFFICIAL ACADEMY ENROLLMENT", width - 185, 77);

    // Student Name
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("STUDENT / ATHLETE NAME", 50, 250);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 38px sans-serif";
    ctx.fillText(name.toUpperCase() || "ATHLETE NAME", 50, 305);

    // Program Title
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("ACADEMY COURSE", 50, 360);

    ctx.fillStyle = "#38bdf8"; // sky-400 color
    ctx.font = "900 24px sans-serif";
    ctx.fillText(checkoutProgram.title.toUpperCase(), 50, 395);

    // Footer divider line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 440);
    ctx.lineTo(width - 50, 440);
    ctx.stroke();

    // Member Metadata
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("ENROLLMENT ID", 50, 490);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px monospace";
    ctx.fillText(enrollmentId, 50, 530);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("SESSION SCHEDULE", 280, 490);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    const schedText = selectedSchedule || "CLASSES STARTING SOON";
    ctx.fillText(schedText.toUpperCase(), 280, 530);

    // Tuition Paid (Right side)
    ctx.fillStyle = "#f59e0b"; // gold/amber color
    ctx.font = "900 15px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("TUITION: " + checkoutProgram.price.toUpperCase(), width - 50, 490);

    // Mock Barcode block
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.beginPath();
    ctx.roundRect(width - 240, 510, 190, 44, 6);
    ctx.fill();

    ctx.fillStyle = "#000000";
    const bars = [3, 5, 2, 7, 3, 2, 6, 3, 8, 2, 3, 5, 3, 2, 7];
    let currentX = width - 230;
    for (let i = 0; i < bars.length; i++) {
      ctx.fillRect(currentX, 515, bars[i], 34);
      currentX += bars[i] + 4;
    }

    // Trigger download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${name.replace(/\s+/g, '_')}_academy_pass.png`;
    link.href = dataUrl;
    link.click();
  };


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
  const checkoutProgram = programs.find(p => p.id === checkoutProgramId);

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
                  <button 
                    onClick={() => startRegister(program.id)}
                    className="w-1/2 sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-full text-sm font-extrabold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/10"
                  >
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

        {/* Registration/Checkout Modal */}
        {checkoutProgramId !== null && checkoutProgram && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className={`bg-white rounded-[2.5rem] w-full ${checkoutStep === 3 ? 'max-w-xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto border border-gray-150 shadow-2xl relative my-8 text-left`}>
              
              {/* Steps Header (Only shown for Step 1 & 2) */}
              {checkoutStep < 3 && (
                <div className="bg-blue-955 bg-blue-900 text-white px-8 py-6 flex justify-between items-center relative">
                  <div>
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-1">
                      Step {checkoutStep} of 2
                    </span>
                    <h3 className="text-xl font-bold">Register for {checkoutProgram.title}</h3>
                  </div>
                  <button 
                    onClick={closeCheckout}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Step indicator bar */}
              {checkoutStep < 3 && (
                <div className="bg-blue-950 px-8 py-3 border-t border-white/5 flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                      checkoutStep >= 1 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'
                    }`}>1</span>
                    <span className={checkoutStep >= 1 ? 'text-white font-bold' : ''}>Personal Details</span>
                  </div>
                  <div className="w-12 h-px bg-white/10"></div>
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                      checkoutStep >= 2 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'
                    }`}>2</span>
                    <span className={checkoutStep >= 2 ? 'text-white font-bold' : ''}>Secure Payment</span>
                  </div>
                </div>
              )}

              {/* Step 1: Personal Details & Schedule */}
              {checkoutStep === 1 && (
                <form onSubmit={handleStep1Submit} className="p-8 space-y-6">
                  {validationErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl space-y-1 text-xs">
                      {validationErrors.map((err, i) => (
                        <div key={i} className="flex items-center gap-1.5 font-bold">
                          <CircleAlert className="w-3.5 h-3.5 text-red-600" />
                          <span>{err}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                        placeholder="(305) 555-0199"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preferred Schedule</label>
                      <select 
                        value={selectedSchedule}
                        onChange={(e) => setSelectedSchedule(e.target.value)}
                        className="w-full pl-4 pr-6 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-medium"
                      >
                        {checkoutProgram.schedule.map((time, idx) => (
                          <option key={idx} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex justify-between items-center">
                    <div>
                      <span className="text-gray-400 text-[10px] font-bold block uppercase tracking-wider">Tuition Fee</span>
                      <span className="text-xl font-black text-gray-900">{checkoutProgram.price}</span>
                    </div>
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full text-sm transition-all shadow-md shadow-blue-600/10 flex items-center gap-1.5"
                    >
                      Proceed to Payment <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Secure Payment */}
              {checkoutStep === 2 && (
                <div className="p-8 space-y-6">
                  {/* Payment Method Selector */}
                  <div className="flex gap-4 p-1 bg-gray-100 rounded-full border border-gray-200">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-1/2 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                        paymentMethod === 'card' ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> Credit / Debit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod('qr')}
                      className={`w-1/2 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                        paymentMethod === 'qr' ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <QrCode className="w-4 h-4" /> QR Scan Pay
                    </button>
                  </div>

                  {paymentStatus === 'processing' ? (
                    <div className="text-center py-12 space-y-6">
                      <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                          <Activity className="w-6 h-6 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-base font-bold text-gray-900">Processing Registration Payment...</h4>
                        <p className="text-gray-400 text-xs">Securing session slot at Miami Academy</p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 max-w-xs mx-auto overflow-hidden">
                        <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${paymentProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {paymentMethod === 'card' && (
                        <form onSubmit={handlePaymentSubmit} className="space-y-6">
                          {paymentErrors.length > 0 && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl space-y-1 text-xs">
                              {paymentErrors.map((err, i) => (
                                <div key={i} className="flex items-center gap-1.5 font-bold">
                                  <CircleAlert className="w-3.5 h-3.5 text-red-600" />
                                  <span>{err}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Flip Credit Card Mockup */}
                          <div className="w-full max-w-sm mx-auto aspect-[1.58] [perspective:1000px]">
                            <div className={`relative w-full h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] ${isCardFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                              {/* Front Side */}
                              <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-950 p-6 text-white flex flex-col justify-between shadow-lg [backface-visibility:hidden] border border-blue-800/20">
                                <div className="flex justify-between items-start">
                                  <span className="font-extrabold tracking-widest text-[10px] uppercase text-white/70">ACE RESERVE SECURE</span>
                                  <CreditCard className="w-8 h-8 text-white/30" />
                                </div>
                                <div className="font-mono text-lg tracking-widest font-semibold my-2">
                                  {cardNumber || "•••• •••• •••• ••••"}
                                </div>
                                <div className="flex justify-between items-end text-xs">
                                  <div>
                                    <span className="text-[8px] uppercase tracking-wider text-white/40 block">Cardholder</span>
                                    <span className="font-bold tracking-wide truncate block max-w-xs uppercase">{cardName || "YOUR NAME"}</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[8px] uppercase tracking-wider text-white/40 block">Expires</span>
                                    <span className="font-mono font-semibold">{cardExpiry || "MM/YY"}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Back Side */}
                              <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-blue-955 to-indigo-955 text-white flex flex-col justify-between shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <div className="bg-gray-800 h-10 w-full mt-4"></div>
                                <div className="px-6 py-2">
                                  <div className="flex items-center justify-end bg-white/10 p-2 rounded">
                                    <span className="text-[8px] uppercase text-white/40 mr-2 font-mono">CVV</span>
                                    <span className="font-mono text-sm tracking-widest font-extrabold text-white">{cardCvc || "•••"}</span>
                                  </div>
                                </div>
                                <div className="p-4 text-[8px] text-white/30 text-center font-mono">
                                  Security certified payment gateway. SSL transaction ID confirmed.
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Inputs */}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cardholder Name</label>
                              <input
                                type="text"
                                required
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="Name as it appears on card"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-medium"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Card Number</label>
                              <input
                                type="text"
                                required
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="0000 0000 0000 0000"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Expiration Date</label>
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
                              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Security Code (CVC)</label>
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

                          <div className="pt-4 border-t border-gray-150 flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setCheckoutStep(1)}
                              className="text-gray-500 hover:text-gray-800 text-sm font-bold flex items-center gap-1.5"
                            >
                              <ArrowLeft className="w-4 h-4" /> Back to Info
                            </button>
                            
                            <button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/10"
                            >
                              Pay {checkoutProgram.price} Securely
                            </button>
                          </div>
                        </form>
                      )}

                      {paymentMethod === 'qr' && (
                        <div className="text-center py-6 space-y-6">
                          <div className="bg-gray-50 border border-gray-150 p-6 rounded-3xl max-w-xs mx-auto space-y-4">
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
                              <span className="font-extrabold text-gray-800 block">International Merchant QR</span>
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

                          <div className="pt-4 border-t border-gray-150 flex justify-start">
                            <button
                              type="button"
                              onClick={() => setCheckoutStep(1)}
                              className="text-gray-500 hover:text-gray-800 text-sm font-bold flex items-center gap-1.5"
                            >
                              <ArrowLeft className="w-4 h-4" /> Back to Info
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Success Pass Card (Enrollment Pass Card style) */}
              {checkoutStep === 3 && (
                <div className="p-8 text-center space-y-8">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-1">Registration Complete!</h4>
                    <p className="text-gray-500 text-xs">
                      Your digital academy pass is generated. Class slot confirmed.
                    </p>
                  </div>

                  {/* Printable Enrollment Pass Card Badge */}
                  <div 
                    id="print-enrollment-card" 
                    className={`w-full max-w-lg mx-auto aspect-[1.58] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between select-none text-left ${
                      checkoutProgram.title.includes("Elite")
                        ? "bg-gradient-to-tr from-stone-950 via-stone-900 to-amber-900 border border-amber-500/30"
                        : checkoutProgram.title.includes("Kids")
                          ? "bg-gradient-to-tr from-emerald-955 via-teal-900 to-cyan-900 border border-teal-500/20"
                          : checkoutProgram.title.includes("Teenager")
                            ? "bg-gradient-to-tr from-indigo-955 via-indigo-900 to-indigo-800 border border-indigo-500/20"
                            : "bg-gradient-to-tr from-slate-900 via-blue-955 to-indigo-955 border border-gray-700/20"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-start z-10 relative">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <ShieldCheck className="w-5 h-5 text-blue-400" />
                          <span className="font-extrabold tracking-widest text-xs uppercase text-white">ACE RESERVE</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-white/60 font-bold block">Miami Tennis Academy</span>
                      </div>
                      <span className="text-[9px] font-black tracking-widest uppercase bg-black/25 px-3 py-1 rounded-full text-white/90">
                        ACADEMY MEMBER
                      </span>
                    </div>

                    {/* Body Row (Athlete Name & Program) */}
                    <div className="z-10 relative my-2 space-y-1">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-white/50 block">Student Name</span>
                        <span className="text-lg font-bold uppercase tracking-tight truncate block max-w-xs">{name || "ATHLETE NAME"}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-white/50 block">Academy Course</span>
                        <span className="text-sm font-extrabold uppercase text-sky-400 block">{checkoutProgram.title}</span>
                      </div>
                    </div>

                    {/* Footer Row (Metadata & Barcode) */}
                    <div className="flex justify-between items-end border-t border-white/10 pt-4 z-10 relative">
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-[8px] uppercase text-white/40 block font-bold">Enrollment ID</span>
                          <span className="font-mono font-bold tracking-wider text-white/95 text-[10px]">{enrollmentId}</span>
                        </div>
                        <div>
                          <span className="text-[8px] uppercase text-white/40 block font-bold">Session Timing</span>
                          <span className="font-bold text-[9px] text-white/90 truncate block max-w-[150px]">{selectedSchedule}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black tracking-wider text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 block uppercase text-[10px] mb-1.5">
                          {checkoutProgram.price}
                        </span>
                        
                        {/* Barcode mockup */}
                        <div className="h-6 w-24 bg-white/95 rounded px-1 flex items-center justify-center gap-0.5 overflow-hidden">
                          {[1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4].map((w, idx) => (
                            <div key={idx} className="bg-black h-full shrink-0" style={{ width: `${w}px` }}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Print and Close controls */}
                  <div className="flex gap-4 justify-center pt-4 border-t border-gray-150">
                    <button
                      onClick={handleDownloadPng}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/10 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Pass (PNG)
                    </button>
                    <button
                      onClick={closeCheckout}
                      className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md"
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
