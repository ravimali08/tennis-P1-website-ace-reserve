import { useState, useEffect } from 'react';
import { Check, Star, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Printer, ArrowLeft, CreditCard, Smartphone, CheckCircle, Shield, Award, Sparkles, User, Mail, Phone, Calendar } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  color: string;
}

export default function Membership() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Checkout Wizard State
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // Card Payment Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // General Checkout States
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [memberId, setMemberId] = useState("");

  const plans: Plan[] = [
    {
      name: "Junior Membership",
      price: "$99",
      period: "/ month",
      description: "Designed for young players under 18 seeking court access and competitive development.",
      features: [
        "Court access during designated junior slots",
        "10% discount on Junior Coaching programs",
        "Entry to junior club tournaments",
        "Standard locker room access"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Individual Membership",
      price: "$189",
      period: "/ month",
      description: "Our core membership tier. Perfect for individual players looking for full court access.",
      features: [
        "7-day advanced court booking window",
        "2 complimentary guest passes per month",
        "15% discount on all coaching programs & clinics",
        "Full fitness center and locker room access",
        "Priority tournament entry"
      ],
      popular: true,
      color: "border-blue-600 shadow-xl"
    },
    {
      name: "Family Membership",
      price: "$299",
      period: "/ month",
      description: "Perfect for active couples and families who want to play and train together.",
      features: [
        "All benefits for up to 4 family members",
        "10-day advanced court booking window",
        "4 complimentary guest passes per month",
        "20% discount on all coaching programs & junior camps",
        "Locker access & fitness center access for all"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Elite Membership",
      price: "$499",
      period: "/ month",
      description: "The ultimate club experience. Unlimited access, private coaching, and VIP privileges.",
      features: [
        "14-day priority court booking window",
        "8 complimentary guest passes per month",
        "30-day discount on clinics + 2 private lessons/month",
        "VIP lounge and private locker access",
        "Free UTR tracking and custom court analysis",
        "Priority VIP tournament seating"
      ],
      popular: false,
      color: "border-amber-500 shadow-lg"
    }
  ];

  const comparisonFeatures = [
    { name: "Monthly Price", junior: "$99", individual: "$189", family: "$299", elite: "$499" },
    { name: "Court Booking Window", junior: "2 Days (Off-Peak)", individual: "7 Days", family: "10 Days", elite: "14 Days" },
    { name: "Guest Passes / mo", junior: "None", individual: "2 Passes", family: "4 Passes", elite: "8 Passes" },
    { name: "Coaching Discounts", junior: "10%", individual: "15%", family: "20%", elite: "30%" },
    { name: "Fitness Center", junior: "No", individual: "Full Access", family: "Full Access", elite: "Full Access" },
    { name: "Locker Room access", junior: "Standard", individual: "Full", family: "Full", elite: "VIP Private Locker" },
    { name: "Private Coach Credits", junior: "No", individual: "No", family: "No", elite: "2 Credits / mo" },
    { name: "UTR Progress Tracking", junior: "Add-on", individual: "Add-on", family: "Included", elite: "Included" }
  ];

  const faqs = [
    {
      q: "Is there an initiation fee to join the club?",
      a: "No, we believe in transparent pricing. There are no initiation, registration, or hidden fees. All memberships are month-to-month."
    },
    {
      q: "Can I upgrade or downgrade my membership?",
      a: "Absolutely. You can change your membership tier at any time. Downgrades or cancellations require a 30-day notice, while upgrades are effective immediately."
    },
    {
      q: "How do the complimentary guest passes work?",
      a: "Guest passes are credited to your account on the 1st of every month and expire at the end of that month. You can check guests in through the member dashboard."
    },
    {
      q: "Is court booking included in the monthly fee?",
      a: "Yes! Court booking is fully covered by your membership. Members do not pay hourly court fees for standard bookings."
    },
    {
      q: "What is the Elite private coaching credit policy?",
      a: "Elite members receive 2 private lesson credits per month. Credits can be used with any staff coach and must be scheduled at least 48 hours in advance."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSelectPlan = (plan: Plan) => {
    setCheckoutPlan(plan);
    setCheckoutStep(1);
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvc("");
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setPaymentMethod('card');
  };

  // Payment Sim Timer
  useEffect(() => {
    let interval: any;
    if (isProcessing) {
      interval = setInterval(() => {
        setProgressPercentage((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // Post payload to backend
            const subscribePayload = {
              planName: checkoutPlan?.name,
              name: userName,
              email: userEmail,
              phone: userPhone,
              paymentMethod: paymentMethod
            };

            fetch('/api/membership/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subscribePayload)
            })
              .then(res => res.json())
              .then(data => {
                setIsProcessing(false);
                if (data.error) {
                  alert(data.error);
                } else {
                  setMemberId(data.subscriptionId);
                  setCheckoutStep(3);
                }
              })
              .catch(err => {
                console.error("Subscription error:", err);
                alert("Network error. Please try again.");
                setIsProcessing(false);
              });

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

    setCheckoutStep(2);
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

  const handlePrint = () => {
    window.print();
  };

  const closeCheckout = () => {
    setCheckoutPlan(null);
    setCheckoutStep(1);
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

  const handleDownloadPng = () => {
    if (!checkoutPlan) return;

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

    // Create tier-specific gradient background
    const grad = ctx.createLinearGradient(0, height, width, 0);
    if (checkoutPlan.name === "Elite Membership") {
      grad.addColorStop(0, "#0c0a09"); // stone-950
      grad.addColorStop(0.5, "#1c1917"); // stone-900
      grad.addColorStop(1, "#78350f"); // amber-900
    } else if (checkoutPlan.name === "Family Membership") {
      grad.addColorStop(0, "#022c22"); // emerald-950
      grad.addColorStop(0.5, "#115e59"); // teal-900
      grad.addColorStop(1, "#164e63"); // cyan-900
    } else if (checkoutPlan.name === "Individual Membership") {
      grad.addColorStop(0, "#030712"); // slate-950
      grad.addColorStop(0.5, "#1e3a8a"); // blue-900
      grad.addColorStop(1, "#312e81"); // indigo-900
    } else {
      grad.addColorStop(0, "#0f172a"); // slate-900
      grad.addColorStop(0.5, "#172554"); // blue-955
      grad.addColorStop(1, "#1e1b4b"); // indigo-950
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

    // Right Header Badge (VIP / OFFICIAL) - flat styling, no shine
    const isElite = checkoutPlan.name === "Elite Membership";
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.roundRect(width - 240, 50, 190, 44, 22);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(isElite ? "VIP MEMBER" : "OFFICIAL MEMBER", width - 145, 77);

    // Member Name
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("MEMBERSHIP CARD", 50, 310);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 40px sans-serif";
    ctx.fillText(userName.toUpperCase() || "MEMBER NAME", 50, 365);

    // Footer divider line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 430);
    ctx.lineTo(width - 50, 430);
    ctx.stroke();

    // Member Metadata
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("MEMBER ID", 50, 480);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px monospace";
    ctx.fillText(memberId, 50, 520);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("VALID THRU", 300, 480);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("JUNE 2027", 300, 520);

    // Plan Title (Right side)
    ctx.fillStyle = "#f59e0b"; // gold/amber color
    ctx.font = "900 16px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(checkoutPlan.name.toUpperCase(), width - 50, 480);

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
    link.download = `${userName.replace(/\s+/g, '_')}_membership_card.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen text-left">
      {/* CSS style wrapper to isolate membership card printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-membership-card, #print-membership-card * {
            visibility: visible;
          }
          #print-membership-card {
            position: absolute;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 480px !important;
            max-width: 480px !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-6 md:px-12 no-print">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">Choose Your Membership</h1>
          <p className="text-lg text-gray-600">
            Join Ace Reserve Tennis Club. Select a tier that fits your gameplay and unlocks access to our premier Miami facilities.
          </p>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-24">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-[2rem] p-8 border flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full ${plan.color}`}
            >
              <div>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Recommended
                  </div>
                )}
                {plan.name === "Elite Membership" && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VIP Tier
                  </div>
                )}
                
                {/* Unified Title & Description Box for perfect alignments */}
                <div className="min-h-[160px] flex flex-col justify-between mb-6">
                  <div className="min-h-[64px] flex items-center mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">{plan.name}</h3>
                  </div>
                  <div className="flex-1 flex items-start">
                    <p className="text-gray-550 text-gray-500 text-xs leading-relaxed">{plan.description}</p>
                  </div>
                </div>
                
                {/* Consistent Price Area */}
                <div className="min-h-[48px] flex items-center mb-6">
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-gray-550 text-sm font-semibold ml-1">{plan.period}</span>
                </div>

                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-full font-bold mb-6 transition-all ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20' 
                      : plan.name === "Elite Membership"
                        ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  Select Plan
                </button>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="space-y-4">
                  <p className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">Plan Includes</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2.5 text-gray-600 text-sm min-h-[40px]">
                        <Check className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto mb-24 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-150 shadow-sm overflow-hidden">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Detailed Feature Matrix</h2>
            <p className="text-gray-500">Compare our core benefits side-by-side to choose the right fit.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 font-bold text-gray-900">Feature</th>
                  <th className="py-4 font-bold text-blue-600">Junior</th>
                  <th className="py-4 font-bold text-blue-600">Individual</th>
                  <th className="py-4 font-bold text-blue-600">Family</th>
                  <th className="py-4 font-bold text-amber-600">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 font-semibold text-gray-800 text-sm">{row.name}</td>
                    <td className="py-4 text-gray-600 text-sm">{row.junior}</td>
                    <td className="py-4 text-gray-955 text-gray-955 text-gray-950 font-black text-sm">{row.individual}</td>
                    <td className="py-4 text-gray-600 text-sm">{row.family}</td>
                    <td className="py-4 text-gray-955 text-gray-955 text-gray-950 font-black text-sm">{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-gray-900 mb-3">Membership Questions</h2>
            <p className="text-gray-500">Everything you need to know about payments, terms, and guest policies.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-150 rounded-2xl bg-white overflow-hidden shadow-sm">
                <button
                  className="w-full px-8 py-5 flex justify-between items-center text-left font-bold text-lg text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="pr-4">{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-8 pb-5 text-gray-600 leading-relaxed border-t border-gray-100/50 pt-4 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHECKOUT PORTAL MODAL OVERLAY */}
      {checkoutPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden border border-gray-150 shadow-2xl relative my-8">
            
            {/* Modal Close */}
            {checkoutStep !== 3 && (
              <button 
                onClick={closeCheckout}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-all z-20"
              >
                <Check className="w-5 h-5 rotate-45" />
              </button>
            )}

            {/* Steps Banner Header */}
            {checkoutStep !== 3 && (
              <div className="bg-blue-950 text-white p-6 md:p-8 relative">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 block mb-1">MEMBERSHIP REGISTRATION</span>
                <h3 className="text-2xl font-black">{checkoutPlan.name}</h3>
                
                {/* Visual Step Indicator */}
                <div className="flex gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      checkoutStep >= 1 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'
                    }`}>1</span>
                    <span className="text-xs font-semibold text-white/90">Info</span>
                  </div>
                  <div className="h-0.5 bg-white/20 w-8 self-center"></div>
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      checkoutStep >= 2 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'
                    }`}>2</span>
                    <span className={`text-xs font-semibold ${checkoutStep >= 2 ? 'text-white' : 'text-white/40'}`}>Payment</span>
                  </div>
                  <div className="h-0.5 bg-white/20 w-8 self-center"></div>
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      (checkoutStep as number) === 3 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'
                    }`}>3</span>
                    <span className={`text-xs font-semibold ${(checkoutStep as number) === 3 ? 'text-white' : 'text-white/40'}`}>Access Card</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: PERSONAL INFORMATION */}
            {checkoutStep === 1 && (
              <form onSubmit={handleInfoSubmit} className="p-8 space-y-6">
                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-0.5">Selected Plan Tier</span>
                    <span className="text-lg font-bold text-blue-950">{checkoutPlan.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-blue-950">{checkoutPlan.price}</span>
                    <span className="text-xs text-blue-600 font-semibold block">{checkoutPlan.period}</span>
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

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/10"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT & LOADER CHANNELS */}
            {checkoutStep === 2 && (
              <div className="p-8 space-y-6">
                {isProcessing ? (
                  /* Processing Loader Overlay */
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

                    {/* Credit/Debit Card Channel */}
                    {paymentMethod === 'card' && (
                      <form onSubmit={handlePaymentSubmit} className="space-y-6">
                        
                        {/* 3D Flipping Credit Card Preview (Normal design, no ACE branding) */}
                        <div className="relative w-full max-w-sm mx-auto h-48 [perspective:1000px] mb-8">
                          <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isCardFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                            
                            {/* Front Side */}
                            <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-tr from-blue-900 via-indigo-900 to-indigo-950 text-white flex flex-col justify-between shadow-xl [backface-visibility:hidden]">
                              <div className="flex justify-between items-start">
                                <span className="font-bold tracking-widest text-[9px] uppercase text-white/50">SECURE MERCHANT CARD</span>
                                {/* Chip */}
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

                            {/* Back Side */}
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

                        {/* Card Inputs */}
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

                        {/* Action buttons */}
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
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
                            Pay {checkoutPlan.price} Securely
                          </button>
                        </div>
                      </form>
                    )}

                    {/* QR Code Scan Channel */}
                    {paymentMethod === 'qr' && (
                      <div className="text-center py-6 space-y-6">
                        <div className="bg-gray-50 border border-gray-150 p-6 rounded-3xl max-w-xs mx-auto space-y-4">
                          <div className="relative aspect-square w-48 mx-auto bg-white border border-gray-200 p-2 rounded-xl flex items-center justify-center overflow-hidden">
                            {/* Scanning line animation */}
                            <div className="absolute left-0 w-full h-0.5 bg-blue-600 shadow-lg shadow-blue-500/50 animate-[bounce_2s_infinite]"></div>
                            
                            {/* Simulated QR Code SVG */}
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

                        <div className="pt-4 border-t border-gray-100 flex justify-start">
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

            {/* STEP 3: MEMBERSHIP ACCESS CARD GENERATOR (Printable Only) */}
            {checkoutStep === 3 && (
              <div className="p-8 text-center space-y-8">
                <div className="no-print">
                  <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-1">Registration Complete!</h4>
                  <p className="text-gray-500 text-xs">
                    Your digital membership card is generated. Access is active immediately.
                  </p>
                </div>

                {/* Printable Access Card Badge */}
                <div 
                  id="print-membership-card" 
                  className={`w-full max-w-lg mx-auto aspect-[1.58] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between select-none text-left ${
                    checkoutPlan.name === "Elite Membership"
                      ? "bg-gradient-to-tr from-stone-950 via-stone-900 to-amber-900 border border-amber-500/30"
                      : checkoutPlan.name === "Family Membership"
                        ? "bg-gradient-to-tr from-emerald-950 via-teal-900 to-cyan-900 border border-teal-500/20"
                        : checkoutPlan.name === "Individual Membership"
                          ? "bg-gradient-to-tr from-indigo-950 via-blue-900 to-indigo-850 border border-blue-500/20"
                          : "bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950 border border-gray-700/20"
                  }`}
                >


                  {/* Header Row */}
                  <div className="flex justify-between items-start z-10 relative">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        {checkoutPlan.name === "Elite Membership" ? (
                          <Award className="w-5 h-5 text-amber-400 fill-current" />
                        ) : (
                          <Shield className="w-5 h-5 text-blue-400" />
                        )}
                        <span className="font-extrabold tracking-widest text-xs uppercase text-white">ACE RESERVE</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-white/60 font-bold block">Miami Tennis Club</span>
                    </div>
                    <span className="text-[10px] font-black tracking-widest uppercase bg-black/25 px-3 py-1 rounded-full text-white/90">
                      {checkoutPlan.name === "Elite Membership" ? "VIP MEMBER" : "OFFICIAL MEMBER"}
                    </span>
                  </div>

                  {/* Body Row (Member Name) */}
                  <div className="z-10 relative my-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block mb-0.5">Membership Card</span>
                    <span className="text-xl font-bold uppercase tracking-tight truncate block max-w-xs">{userName || "MEMBER NAME"}</span>
                  </div>

                  {/* Footer Row (Metadata & Barcode) */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-4 z-10 relative">
                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-[9px] uppercase text-white/40 block font-bold">Member ID</span>
                        <span className="font-mono font-bold tracking-wider text-white/95">{memberId}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-white/40 block font-bold">Valid Thru</span>
                        <span className="font-bold text-[10px] text-white/90">June 2027</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black tracking-wider text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 block uppercase text-[10px] mb-1.5">
                        {checkoutPlan.name}
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
                <div className="flex gap-4 justify-center pt-4 border-t border-gray-150 no-print">
                  <button
                    onClick={handleDownloadPng}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold text-sm transition-all border border-gray-200 flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" /> Download Card (PNG)
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
  );
}
