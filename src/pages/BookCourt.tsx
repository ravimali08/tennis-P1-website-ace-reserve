import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, ArrowRight, ShieldCheck, CreditCard, CheckCircle, Printer, MapPin, ChevronRight, Activity, CircleAlert, QrCode, ScanLine, ArrowLeftRight, X, Download } from 'lucide-react';

interface Court {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
}

export default function BookCourt() {
  // Booking Form State
  const [selectedCourtId, setSelectedCourtId] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [durationHours, setDurationHours] = useState(1);
  
  // Contact State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Payment State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentProgress, setPaymentProgress] = useState(0);

  // Card Inputs
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  
  const [bookingId, setBookingId] = useState("");
  
  // Validation Errors
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [paymentErrors, setPaymentErrors] = useState<string[]>([]);

  // Min date check (disables past dates)
  const todayStr = new Date().toISOString().split('T')[0];

  const courts: Court[] = [
    {
      id: 1,
      name: "Court 1",
      type: "Hard Court",
      image: "/images/C1.jpg",
      description: "Premier cushioned indoor hard court. Provides consistent ball bounce and speed, ideal for quick rallies."
    },
    {
      id: 2,
      name: "Court 2",
      type: "Hard Court",
      image: "/images/C2.jpg",
      description: "Outdoor championship hard court. Excellent lighting for night sessions, designed for competitive training."
    },
    {
      id: 3,
      name: "Court 3",
      type: "Clay Court",
      image: "/images/C3.jpg",
      description: "Authentic red clay court. Slow ball speed and high spin bounce, soft on players' knees."
    },
    {
      id: 4,
      name: "Court 4",
      type: "Clay Court",
      image: "/images/C4.jpg",
      description: "Outdoor green Har-Tru clay court. Premium playing conditions with superior drainage for all-weather play."
    },
    {
      id: 5,
      name: "Court 5",
      type: "Grass Court",
      image: "/images/C5.jpg",
      description: "Traditional grass court. Very fast pace and low slice bounce, providing a classic lawn tennis experience."
    },
    {
      id: 6,
      name: "Court 6",
      type: "Grass Court",
      image: "/images/C6.jpg",
      description: "Exhibition grass court. Impeccably manicured lawn, reserved for competitive matches and academy members."
    }
  ];

  interface TimeSlot {
    label: string;
    hours: number;
    isBooked: boolean;
  }

  const timeSlots: TimeSlot[] = [
    { label: "06:00 - 07:00", hours: 1, isBooked: false },
    { label: "07:00 - 08:00", hours: 1, isBooked: true },
    { label: "08:00 - 10:00", hours: 2, isBooked: false },
    { label: "10:00 - 11:00", hours: 1, isBooked: false },
    { label: "11:00 - 12:00", hours: 1, isBooked: true },
    { label: "12:00 - 13:00", hours: 1, isBooked: false },
    { label: "13:00 - 15:00", hours: 2, isBooked: false },
    { label: "15:00 - 16:00", hours: 1, isBooked: false },
    { label: "16:00 - 17:00", hours: 1, isBooked: true },
    { label: "17:00 - 20:00", hours: 3, isBooked: false },
    { label: "18:00 - 21:00", hours: 3, isBooked: false },
    { label: "20:00 - 21:00", hours: 1, isBooked: false }
  ];

  const selectedCourt = courts.find(c => c.id === selectedCourtId) || courts[0];

  const pricePerHour = 30;
  const totalPrice = durationHours * pricePerHour;

  // Checkout process simulation
  useEffect(() => {
    let interval: any;
    if (paymentStatus === 'processing') {
      interval = setInterval(() => {
        setPaymentProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setPaymentStatus('success');
            setTimeout(() => {
              const randId = `AR-BKG-${Math.floor(100000 + Math.random() * 900000)}`;
              setBookingId(randId);
              setIsCheckoutOpen(false);
              setIsSuccessOpen(true);
            }, 800);
            return 100;
          }
          return prev + 20;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [paymentStatus]);

  const handleConfirmBooking = () => {
    const errs = [];
    if (!name.trim()) errs.push("Full Name is required");
    if (!email.trim()) errs.push("Email Address is required");
    if (phone.replace(/\D/g, '').length !== 10) errs.push("Phone Number must be exactly 10 digits");
    if (!selectedDate) errs.push("Please select a booking date");
    if (!selectedTime) errs.push("Please select a time slot");

    if (errs.length > 0) {
      setValidationErrors(errs);
      window.scrollTo(0, 400); // Scroll to validation error section
    } else {
      setValidationErrors([]);
      setIsCheckoutOpen(true);
      setPaymentStatus('idle');
      setPaymentProgress(0);
      setPaymentErrors([]);
      
      // Clear inputs
      setCardName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      setIsCardFlipped(false);
    }
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = [];
    if (!cardName.trim()) errs.push("Cardholder Name is required");
    if (cardNumber.replace(/\s/g, '').length !== 16) errs.push("Enter a valid 16-digit card number");
    if (cardExpiry.length !== 5) {
      errs.push("Enter expiration date in MM/YY format");
    } else {
      const [m] = cardExpiry.split("/");
      const month = parseInt(m, 10);
      if (isNaN(month) || month < 1 || month > 12) {
        errs.push("Please enter a valid expiration month (01-12)");
      }
    }
    if (cardCvc.replace(/\D/g, '').length !== 3) errs.push("Enter a valid 3-digit CVV code");

    if (errs.length > 0) {
      setPaymentErrors(errs);
    } else {
      setPaymentErrors([]);
      setPaymentStatus('processing');
    }
  };

  const handleSimulateQrScan = () => {
    setPaymentStatus('processing');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPng = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear background with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1200);
    gradient.addColorStop(0, "#0b1329"); // deep midnight blue
    gradient.addColorStop(1, "#1d3557"); // dark slate blue
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
    ctx.fillText("COURT RESERVATION RECEIPT", 400, 160);

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
    ctx.fillText("STATUS: COURT BOOKED & PAID", 100, 280);

    // Court title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText(selectedCourt?.name || "Court Reservation", 100, 370);

    // Court Type pill
    if (selectedCourt) {
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
      ctx.fillRect(100, 400, 180, 40);
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 1;
      ctx.strokeRect(100, 400, 180, 40);
      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(selectedCourt.type.toUpperCase(), 190, 426);
    }

    // Booking Details
    ctx.textAlign = "left";
    ctx.fillStyle = "#9ca3af"; // gray-400
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Reservation Date", 100, 500);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(selectedDate, 100, 540);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Time Slot", 450, 500);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(selectedTime, 450, 540);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Player Name", 100, 640);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(name, 100, 680);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Duration", 450, 640);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(`${durationHours} ${durationHours === 1 ? "Hour" : "Hours"}`, 450, 680);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Booking ID", 100, 780);
    ctx.fillStyle = "#3b82f6"; // blue-500
    ctx.font = "bold 30px monospace";
    ctx.fillText(bookingId, 100, 820);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "normal 22px sans-serif";
    ctx.fillText("Amount Paid", 450, 780);
    ctx.fillStyle = "#10b981"; // green
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(`$${totalPrice}`, 450, 820);

    // Draw nice barcode lines
    ctx.fillStyle = "#ffffff";
    let barcodeX = 100;
    for (let i = 0; i < 48; i++) {
      const width = i % 3 === 0 ? 8 : (i % 2 === 0 ? 4 : 2);
      ctx.fillRect(barcodeX, 900, width, 100);
      barcodeX += width + 4;
    }

    // Footnote text
    ctx.fillStyle = "#6b7280";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PRESENT RECEIPT FOR COURT CHECK-IN AT FRONT DESK", 400, 1080);

    // Trigger download
    const link = document.createElement("a");
    link.download = `${name.replace(/\s+/g, "_")}_court_booking_receipt.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleReset = () => {
    setIsSuccessOpen(false);
    setSelectedDate("");
    setSelectedTime("");
    setDurationHours(1);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      {/* Inject custom CSS print styling directly into the document */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-booking-pass, #print-booking-pass * {
            visibility: visible;
          }
          #print-booking-pass {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-6 md:px-12">
        {/* Header Cover Banner */}
        <div className="relative rounded-[3rem] overflow-hidden p-8 md:p-16 text-white mb-16 shadow-xl">
          <div className="absolute inset-0 z-0">
            <img src="/images/indoor-court.jpg" alt="Courts" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-gray-950/90 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-600/30 backdrop-blur border border-blue-500/25 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-blue-300">
              <Activity className="w-3.5 h-3.5" /> Court Reservations
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Book a Court</h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Reserve one of our 6 world-class hard, clay, or grass courts. Select your session details, complete our checkout, and receive your booking pass instantly.
            </p>
          </div>
        </div>

        {/* Validation Errors banner */}
        {validationErrors.length > 0 && (
          <div className="bg-red-50 text-red-700 p-5 rounded-[2rem] border border-red-100 max-w-4xl mx-auto mb-10 space-y-1">
            <h4 className="font-extrabold flex items-center gap-2 mb-2 text-base">
              <CircleAlert className="w-5 h-5 text-red-650" /> Please complete required fields:
            </h4>
            {validationErrors.map((err, i) => (
              <div key={i} className="text-sm font-semibold pl-7">
                • {err}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
          
          {/* LEFT SELECTORS BLOCK */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Court Selector */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-8">
              <div>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-1">Step 1</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Select Tennis Court</h2>
              </div>

              {/* Grid of Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {courts.map((court) => (
                  <button
                    key={court.id}
                    onClick={() => setSelectedCourtId(court.id)}
                    className={`px-5 py-4 rounded-2xl border text-sm font-bold transition-all ${
                      selectedCourtId === court.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/10'
                        : 'bg-gray-550/5 bg-gray-50 hover:bg-gray-100 border-gray-250 text-gray-700'
                    }`}
                  >
                    {court.name}
                    <span className="block text-[10px] opacity-75 font-medium mt-0.5">{court.type}</span>
                  </button>
                ))}
              </div>

              {/* Interactive Dynamic Preview Card */}
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200/50 flex flex-col md:flex-row gap-6 items-center">
                {/* Visual Image with scale transition */}
                <div className="w-full md:w-2/5 aspect-square rounded-2xl overflow-hidden shadow-inner shrink-0 relative bg-gray-100">
                  <img
                    src={selectedCourt.image}
                    alt={selectedCourt.name}
                    className="w-full h-full object-cover object-center transition-all duration-300"
                    style={{ imageRendering: 'auto' }}
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-blue-700 uppercase tracking-wider border border-gray-100 shadow-sm">
                    {selectedCourt.type}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 w-full text-left">
                  <h4 className="text-2xl font-black text-gray-900">{selectedCourt.name}</h4>
                  <p className="text-gray-550 text-sm leading-relaxed">
                    {selectedCourt.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold bg-blue-50/50 border border-blue-100/50 px-3 py-1.5 rounded-lg w-fit">
                    <MapPin className="w-4 h-4 text-blue-600" /> Miami Championship Courts
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Date & Time Selector */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-8">
              <div>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-1">Step 2</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Choose Date & Time</h2>
              </div>

              {/* Date Input Calendar */}
              <div>
                <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-3">Booking Date *</label>
                <div className="relative max-w-sm">
                  <input
                    type="date"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-250 focus:border-blue-600 focus:outline-none text-sm transition-all bg-white"
                  />
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-3">Available Hourly Slots *</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot.label;
                    return (
                      <button
                        key={slot.label}
                        disabled={slot.isBooked}
                        onClick={() => {
                          setSelectedTime(slot.label);
                          setDurationHours(slot.hours);
                        }}
                        className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center ${
                          slot.isBooked
                            ? 'bg-gray-100 border-gray-200 text-gray-450 cursor-not-allowed opacity-60'
                            : isSelected
                              ? 'bg-blue-600 text-white border-blue-605 shadow-md shadow-blue-600/10'
                              : 'bg-white hover:bg-gray-50 border-gray-205 text-gray-600'
                        }`}
                      >
                        <span>{slot.label}</span>
                        <span className={`block text-[9px] font-medium mt-0.5 ${slot.isBooked ? 'text-red-500 font-bold' : isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                          {slot.isBooked ? 'Booked' : `${slot.hours} ${slot.hours === 1 ? 'hr' : 'hrs'}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Personal Contact Details */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-8">
              <div>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-1">Step 3</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Player Registration</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                    placeholder="e.g. 3055550100"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm bg-white"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT BOOKING DETAILS PANEL (STICKY SUMMARY) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 border border-gray-800 shadow-xl space-y-6 text-left">
              <h3 className="text-xl font-bold border-b border-gray-800 pb-4">
                Booking Summary
              </h3>

              {/* Court Details */}
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Court Number</span>
                  <span className="text-white font-bold">{selectedCourt.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Court Type</span>
                  <span className="text-white font-bold">{selectedCourt.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Date</span>
                  <span className="text-white font-bold">{selectedDate || "Not chosen"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Time Slot</span>
                  <span className="text-white font-bold">{selectedTime || "Not chosen"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Hourly Price</span>
                  <span className="text-white font-bold">${pricePerHour} / Hour</span>
                </div>
              </div>

              {/* Hour Duration display */}
              <div className="space-y-3 pt-2 border-t border-gray-800">
                <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span>Duration</span>
                  <span className="text-white font-bold">{durationHours} {durationHours === 1 ? "Hour" : "Hours"}</span>
                </div>
              </div>

              {/* Total Price Card */}
              <div className="bg-gray-850/80 p-5 rounded-2xl border border-gray-800 flex justify-between items-center pt-4 border-t border-gray-800">
                <div>
                  <span className="text-gray-400 text-xs font-semibold uppercase block">Total Due</span>
                  <span className="text-3xl font-black text-white">${totalPrice}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-colors text-center text-sm shadow-lg shadow-blue-600/10 block uppercase tracking-wider font-extrabold"
                >
                  Book Now
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Checkout Screen Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-100 shadow-2xl relative animate-fade-in my-8">
            {/* Modal Header */}
            <div className="bg-blue-950 text-white px-8 py-6 flex justify-between items-center relative">
              <div>
                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-1">Secure Checkout</span>
                <h3 className="text-2xl font-bold">Booking Payment</h3>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 text-left">
              {paymentErrors.length > 0 && (
                <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 text-sm mb-6 space-y-1">
                  {paymentErrors.map((err, i) => <div key={i}>• {err}</div>)}
                </div>
              )}

              {/* Secure Checkout details */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-150 flex items-center justify-between mb-4">
                <div>
                  <span className="text-gray-400 text-xs uppercase font-extrabold tracking-wider block">Reservation Total</span>
                  <span className="text-2xl font-black text-gray-900">${totalPrice}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-700 font-bold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                  <ShieldCheck className="w-4 h-4 text-blue-650" /> SECURE SSL
                </div>
              </div>

              {/* Payment Selector Tabs */}
              <div className="flex bg-gray-150 p-1 rounded-xl border border-gray-200 mb-6">
                <button
                  onClick={() => { setPaymentMethod('card'); setPaymentStatus('idle'); }}
                  disabled={paymentStatus === 'processing'}
                  className={`flex-1 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" /> Card Payment
                </button>
                <button
                  onClick={() => { setPaymentMethod('qr'); setPaymentStatus('idle'); }}
                  disabled={paymentStatus === 'processing'}
                  className={`flex-1 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'qr' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-550 hover:text-gray-800'
                  }`}
                >
                  <QrCode className="w-4 h-4" /> Global QR Scan
                </button>
              </div>

              {paymentStatus === 'processing' ? (
                /* Simulated transaction loader */
                <div className="text-center py-12 space-y-6">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-50 border-t-blue-600 animate-spin"></div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-850">Processing Secure SSL Transaction</h4>
                    <p className="text-gray-400 text-xs mt-1">
                      Verifying credit details with bank gateway. Please wait.
                    </p>
                    <div className="w-32 bg-gray-150 h-1 rounded-full mx-auto mt-4 overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${paymentProgress}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : paymentMethod === 'card' ? (
                /* Card Input form with 3D Flipping virtual card */
                <form onSubmit={handleCardSubmit} className="space-y-6">
                  
                  {/* 3D virtual card layout */}
                  <div className="flex justify-center mb-2">
                    <div className="w-full max-w-sm" style={{ perspective: '1000px' }}>
                      <div 
                        className="relative w-full h-44 rounded-2xl text-white p-5 shadow-xl transition-transform duration-500" 
                        style={{ 
                          transformStyle: 'preserve-3d', 
                          transform: isCardFlipped ? 'rotateY(180deg)' : 'none',
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 50%, #0f172a 100%)'
                        }}
                      >
                        {/* FRONT SIDE */}
                        <div 
                          className="absolute inset-0 p-5 flex flex-col justify-between"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-9 h-7 bg-amber-400 rounded-md flex items-center justify-center opacity-85 shadow">
                              <span className="block w-5 h-4 border border-amber-600/35 rounded-sm"></span>
                            </div>
                            <span className="font-extrabold text-[10px] italic tracking-widest text-blue-200">ACE PASS</span>
                          </div>

                          <div className="text-lg font-black tracking-widest text-center my-3 font-mono">
                            {cardNumber || "•••• •••• •••• ••••"}
                          </div>

                          <div className="flex justify-between items-center text-[10px]">
                            <div>
                              <span className="text-blue-300 block text-[8px] uppercase font-bold tracking-wider">Cardholder</span>
                              <span className="font-bold truncate max-w-[170px] block uppercase">{cardName || "YOUR NAME"}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-blue-300 block text-[8px] uppercase font-bold tracking-wider">Expires</span>
                              <span className="font-bold">{cardExpiry || "MM/YY"}</span>
                            </div>
                          </div>
                        </div>

                        {/* BACK SIDE */}
                        <div 
                          className="absolute inset-0 flex flex-col justify-between py-5"
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          <div className="w-full h-9 bg-gray-900/80 my-1"></div>
                          <div className="px-5 flex justify-between items-center gap-3">
                            <div className="flex-grow h-7 bg-white/20 rounded flex items-center justify-end px-3">
                              <span className="text-gray-400 italic text-[9px]">Security Code</span>
                            </div>
                            <div className="bg-white text-gray-900 font-mono font-bold px-2 py-0.5 rounded text-center shrink-0 text-sm">
                              {cardCvc || "•••"}
                            </div>
                          </div>
                          <div className="px-5 text-[7px] text-blue-300/60 uppercase tracking-widest text-center mt-1">
                            Ace Reserve Court Pass
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Cardholder Name *</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        onFocus={() => setIsCardFlipped(false)}
                        placeholder="Name on Credit Card"
                        className="w-full px-4 py-3 rounded-xl border border-gray-250 focus:outline-none focus:border-blue-600 text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Card Number *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
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
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-250 focus:outline-none focus:border-blue-600 text-sm bg-white"
                        />
                        <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Expiry Date *</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/[^0-9]/g, '');
                            if (v.length > 2) {
                              v = v.substring(0,2) + '/' + v.substring(2,4);
                            }
                            setCardExpiry(v);
                          }}
                          onFocus={() => setIsCardFlipped(false)}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-xl border border-gray-250 focus:outline-none focus:border-blue-600 text-sm text-center bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">CVC Code *</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                          onFocus={() => setIsCardFlipped(true)}
                          placeholder="•••"
                          className="w-full px-4 py-3 rounded-xl border border-gray-250 focus:outline-none focus:border-blue-600 text-sm text-center bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full transition-colors shadow-lg shadow-blue-600/10 text-sm"
                    >
                      Confirm Card Payment
                    </button>
                  </div>
                </form>
              ) : (
                /* Global QR Code (Stripe/PayPal international mock code for foreigners) */
                <div className="text-center space-y-6">
                  <div className="space-y-6 py-4">
                    <div className="w-48 h-48 bg-white border border-gray-250 rounded-2xl mx-auto p-4 flex items-center justify-center relative shadow-sm">
                      <QrCode className="w-full h-full text-gray-800" />
                      <ScanLine className="w-12 h-12 text-blue-600 absolute animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Scan Global Checkout QR Code</h4>
                      <p className="text-gray-400 text-xs mt-1">
                        Scan with your smartphone to pay via international Visa, Mastercard, or Apple Pay.
                      </p>
                    </div>
                    <button
                      onClick={handleSimulateQrScan}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow shadow-blue-600/10 flex items-center gap-2 mx-auto"
                    >
                      <ArrowLeftRight className="w-4 h-4" /> Simulate International Scan
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Booking Confirmation Modal */}
      {isSuccessOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-100 shadow-2xl relative animate-fade-in my-8">
            <div className="p-8 text-center space-y-6">
              
               <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto no-print">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>

              <div className="no-print">
                <h4 className="text-2xl font-black text-gray-900 mb-1">Booking Confirmed!</h4>
                <p className="text-gray-500 text-sm">
                  Your court reservation is secured. We look forward to seeing you.
                </p>
              </div>

              {/* Printable Ticket Receipt (Isolate using media print CSS style tag above) */}
              <div id="print-booking-pass" className="bg-white border-2 border-dashed border-gray-250 rounded-3xl p-6 text-left space-y-4 shadow-inner max-w-sm mx-auto relative overflow-hidden">
                <div className="bg-blue-950 text-white -mx-6 -mt-6 p-4 text-center">
                  <span className="font-extrabold tracking-widest text-[10px] uppercase text-blue-400 block mb-0.5">ACE RESERVE TENNIS CLUB</span>
                  <span className="text-sm font-bold">COURT RESERVATION RECEIPT</span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs font-semibold uppercase block">Reserved Court</span>
                  <h5 className="font-black text-gray-900 text-base leading-tight">
                    {selectedCourt.name}
                  </h5>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded uppercase mt-1 inline-block border border-blue-100">
                    {selectedCourt.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-gray-100 pt-4 text-xs font-semibold">
                  <div>
                    <span className="text-gray-400 font-medium block">Date</span>
                    <span className="text-gray-900">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block">Time Slot</span>
                    <span className="text-gray-900">{selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block">Duration</span>
                    <span className="text-gray-900">{durationHours} {durationHours === 1 ? "Hour" : "Hours"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block">Player Name</span>
                    <span className="text-gray-900">{name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block">Booking ID</span>
                    <span className="text-blue-600 font-bold">{bookingId}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block">Amount Paid</span>
                    <span className="text-gray-900 font-bold">${totalPrice}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 text-[10px] text-center text-gray-400 font-bold uppercase tracking-wider">
                  Present Receipt at Front Desk upon Arrival
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center no-print">
                <button
                  onClick={handleDownloadPng}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/10 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Receipt (PNG)
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-gray-150 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold text-sm transition-all border border-gray-200 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>
                <a
                  href="/"
                  onClick={handleReset}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full font-bold text-sm transition-all text-center"
                >
                  Back to Home
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
