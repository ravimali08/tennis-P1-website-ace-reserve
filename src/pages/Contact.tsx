import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    if (name.trim().length < 2) {
      alert("Please enter your name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (message.trim().length < 5) {
      alert("Please enter a message (at least 5 characters).");
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setType("General Inquiry");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen text-left">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Simple Header */}
        <div className="mb-16">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-2">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Contact Ace Reserve</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
            Have questions about memberships, court booking, or coaching? Send us a message and our team will get back to you shortly.
          </p>
        </div>

        {/* Double Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN: CONTACT DETAILS */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-8 border border-gray-150 shadow-sm">
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">Club Information</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-0.5">Phone Support</span>
                    <span className="text-gray-800 font-semibold text-sm">+1 (305) 555-0199</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-0.5">Email Support</span>
                    <span className="text-gray-800 font-semibold text-sm">support@acereserve.com</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-0.5">Location</span>
                    <span className="text-gray-800 font-semibold text-sm leading-relaxed block">
                      1200 Championship Way,<br />Key Biscayne, Miami, FL 33149
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-0.5">Club Hours</span>
                    <span className="text-gray-800 font-semibold text-sm leading-relaxed block">
                      Mon - Fri: 06:00 - 22:00<br />
                      Sat - Sun: 07:00 - 21:00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs text-blue-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" /> SSL Encrypted Message Gateway
            </div>
          </div>

          {/* RIGHT COLUMN: INQUIRY FORM */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-gray-150 shadow-sm flex flex-col justify-center">
            
            {isSuccess ? (
              /* Success State */
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your inquiry was securely routed and our front desk support team will respond to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-6 py-2.5 rounded-full font-bold text-xs transition-all mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Standard Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Send a Message</h3>
                  <p className="text-gray-400 text-xs">Fill out the details below to submit a direct ticket.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm bg-white text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm bg-white text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Inquiry Type *</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm bg-white text-gray-800"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Coaching">Coaching / Academy</option>
                      <option value="Court Booking">Court Booking Support</option>
                      <option value="Membership">Membership Tiers</option>
                      <option value="Tournaments">Tournaments & Draws</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write details of your question here..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm bg-white text-gray-800 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
