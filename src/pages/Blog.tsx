import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, ArrowRight, BookOpen, Quote, CheckCircle2 } from 'lucide-react';

interface Author {
  name: string;
  role: string;
  image: string;
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
  author: Author;
  takeaways: string[];
}

export default function Blog() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPostId]);

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Doubles Domination: Winning Strategies for Partners",
      category: "Strategy",
      date: "Apr 14, 2026",
      readTime: "5 min read",
      image: "/images/blog-doubles.png",
      excerpt: "Doubles is as much about communication and positioning as it is about shot-making. Learn the net-control strategies that top teams use.",
      author: {
        name: "James Carter",
        role: "Performance & Strategy Coach",
        image: "/images/coach-james.jpg"
      },
      takeaways: [
        "Position aggressively at the net to close down cross-court angles.",
        "Communicate serve target and movement signals before every single point.",
        "Poach intentionally to disrupt the opponent's rhythm and force errors.",
        "Aim volleys low at your opponents' feet to force defensive, floating returns."
      ],
      content: [
        "Doubles tennis rewards teamwork, sharp instincts, and smart positioning. Two players who move as one can often defeat more talented individuals.",
        "To win consistently in doubles, communication is key. Partners must align on serve placements, net coverage, and lob recovery before the point begins. A silent team is a losing team.",
        "Here are the key takeaways to improve your doubles play immediately:",
        "• Position Aggressively: The server’s partner should stand close to the net and cover the alley. Stand too far back, and you invite easy passing shots or low volleys from the returner.",
        "• Communicate Before the Serve: Decide who takes the middle ball, who covers the lob, and the target zone for the serve (wide, body, or T). This creates certainty in movement.",
        "• Poach Intentionally: A well-timed poach disrupts the opponent’s rhythm and puts pressure on their returns. Signal your partner when you intend to cross over.",
        "• Tactical Formations: Use surprise tactics like the I-formation or Australian formation to break serve patterns and force errors on critical points.",
        "• Volley Target Zones: When at the net, aim for angles or low at your opponents' feet. Low volleys are difficult to lift and lead to weak replies.",
        "At Ace Reserve, we incorporate these active patterns in our adult doubles clinics. Sign up for a session to practice net positioning and tactical play with our coaches."
      ]
    },
    {
      id: 2,
      title: "Footwork Fundamentals Every Tennis Player Needs",
      category: "Fitness",
      date: "Apr 28, 2026",
      readTime: "4 min read",
      image: "/images/blog-footwork.png",
      excerpt: "Great footwork separates good players from great ones. Master these essential movement patterns to cover the court with confidence.",
      author: {
        name: "Tyler Brooks",
        role: "Fitness & Movement Coach",
        image: "/images/coach-tyler.jpg"
      },
      takeaways: [
        "Execute a balanced split step just as your opponent contacts the ball.",
        "Recover back to center using quick, short side-shuffles to save energy.",
        "Use a deep crossover step for wide balls to maintain speed and agility.",
        "Stay on the balls of your feet to react dynamically to off-pace shots."
      ],
      content: [
        "Footwork is the foundation of every great tennis player. Without proper movement, even the most powerful groundstrokes lose their effectiveness. To hit a clean shot, you must first position your body correctly.",
        "Many amateur players focus too much on racquet mechanics while ignoring their feet. By improving your agility and recovery steps, you can arrive at the ball early, balanced, and prepared to strike.",
        "Focus on these core footwork patterns during your next practice:",
        "• The Split Step: This is non-negotiable. Perform a small hop just as your opponent contacts the ball, landing on the balls of your feet. This pre-activates your muscles to react in any direction.",
        "• Recovery Footwork: Recovery matters more than the shot itself. After hitting, return to a balanced positioning using quick, short side-shuffles rather than long, heavy strides.",
        "• Crossover Step: For wide balls, use a deep crossover step to push off and cover ground quickly. This keeps your center of gravity low and aids in rapid deceleration.",
        "• Daily Shadow Swings: Move through your forehands and backhands without a ball. Doing this builds muscle memory for proper spacing and footwork patterns.",
        "• Staying Light: Heavier footwork leads to slower reactions. Keep your heels slightly off the ground and stay active between points.",
        "At Ace Reserve, our coaching clinics integrate agility ladders, cone drills, and footwork patterns to elevate your court coverage. Schedule a clinic to refine your movement."
      ]
    },
    {
      id: 3,
      title: "Winning the Mental Game",
      category: "Performance",
      date: "May 12, 2026",
      readTime: "4 min read",
      image: "/images/blog-mental.png",
      excerpt: "Tennis is as much mental as physical. Learn proven psychological strategies to stay composed under intense match pressure.",
      author: {
        name: "James Mitchell",
        role: "Head Coach & Academy Director",
        image: "/images/coach-james.jpg"
      },
      takeaways: [
        "Create a pre-point routine (ball bouncing, deep breath) to reset focus.",
        "Concentrate strictly on the process and shot selection, not the score.",
        "Embrace pressure as a competitive privilege, not a threat.",
        "Mentally dismiss errors within 5 seconds to focus on the next play."
      ],
      content: [
        "The best players do not just have great technique; they have great minds. Mental toughness separates good players from champions. On court, you are alone with your thoughts, making emotional control a critical skill.",
        "When matches get tight, pressure increases, and focus can shift to negative outcomes. Learning how to redirect your attention to the present point is what changes a match's trajectory.",
        "Incorporate these mental drills into your match routine:",
        "• Pre-Point Routine: Create a consistent ritual. Bounce the ball the same number of times, breathe deeply, and visualize your target before serving. This builds calm and structure.",
        "• Focus on Process, Not Score: You cannot control the final outcome, but you can control your effort, attitude, and shot selection. Focus on hitting the next ball, not winning the game.",
        "• Embrace Pressure: Treat high-stakes points as privileges. When a match is close, it means you have earned the chance to compete. Smile and enjoy the challenge.",
        "• Release Mistakes: Give yourself five seconds to accept an error, then let it go. Mentally 'wipe the slate clean' before preparing for the next point.",
        "Our Elite Performance Program at Ace Reserve includes sports psychology and match strategy sessions. Train your mind alongside your strokes to achieve full competitive readiness."
      ]
    },
    {
      id: 4,
      title: "Summer Tournament Preview",
      category: "Tournaments",
      date: "May 25, 2026",
      readTime: "3 min read",
      image: "/images/blog-tournament.png",
      excerpt: "Our upcoming summer tournament calendar features events for juniors, adults, and senior players in Miami.",
      author: {
        name: "James Mitchell",
        role: "Head Coach & Academy Director",
        image: "/images/coach-james.jpg"
      },
      takeaways: [
        "Draws are capped to guarantee structured scheduling and high-quality play.",
        "USTA junior events provide official ranking and collegiate scout exposure.",
        "Adult open brackets offer consolation rounds for guaranteed match play.",
        "Pass check-in uses a branded QR code system on our tournament pages."
      ],
      content: [
        "Summer is tournament season at Ace Reserve Tennis Club. We have designed a comprehensive competitive calendar that offers opportunities for every age, level, and format.",
        "Whether you are looking to earn ranking points, test your skills, or enjoy friendly matches, there is a draw suited for you. Here is what is coming up on our Miami courts:",
        "• Junior Spring Championships: Kick off the season with USTA-sanctioned draws. It is a fantastic entry point for competitive juniors looking to build ranking points.",
        "• Weekend Open: A competitive but highly social adult tournament. Features singles and doubles brackets with consolation draws, ensuring plenty of play.",
        "• Elite Invitational: The highlight of our competitive season. Attracts top-ranked juniors, elite local players, and college scouts looking for talent.",
        "• Senior Classic: Offers mature players a fantastic tournament format combined with social events in the clubhouse after play.",
        "Make sure to register early, as draws are capped to ensure optimal scheduling. Visit our Tournaments page to sign up and receive your digital tournament pass."
      ]
    },
    {
      id: 5,
      title: "Why Tennis is the Best Sport for Kids",
      category: "Juniors",
      date: "Jun 08, 2026",
      readTime: "5 min read",
      image: "/images/blog-kids.png",
      excerpt: "From hand-eye coordination to emotional resilience, discover how tennis helps children grow on and off the court.",
      author: {
        name: "Ana Rodriguez",
        role: "Junior Development Lead",
        image: "/images/coach-ana.jpg"
      },
      takeaways: [
        "Develops hand-eye coordination, balance, and aerobic fitness.",
        "Teaches strategic cognitive problem-solving under time pressure.",
        "Builds emotional accountability, sportsmanship, and resilience.",
        "Fosters lifelong friendships through group clinics and junior social mixers."
      ],
      content: [
        "Tennis is one of the few sports that combines physical, mental, and social development in every session. It provides children with a foundation of athletic skills while building character and discipline.",
        "Unlike team sports where players can hide behind teammates, tennis places the focus on individual accountability. This unique dynamic accelerates personal growth and resilience.",
        "Here are the primary ways tennis benefits young players:",
        "• Physical Development: Improves hand-eye coordination, agility, balance, and aerobic fitness. Kids develop fine motor skills through running, throwing, and tracking the ball.",
        "• Cognitive Problem Solving: Every point is a tactical puzzle. Kids must read the bounce, evaluate their opponent's position, and select their shot under time pressure. This builds active minds.",
        "• Emotional Character: Players learn independence, sportsmanship, and respect. Dealing with bad bounces, close line calls, and losses helps kids navigate adversity with grace.",
        "• Lifelong Friendships: Group lessons create friendships and teach teamwork. Even in individual play, kids learn sportsmanship, respect, and communication.",
        "At Ace Reserve, our junior program is designed to make these benefits fun. Through game-based learning, kids stay engaged while building a foundation for lifelong tennis enjoyment."
      ]
    },
    {
      id: 6,
      title: "5 Drills to Perfect Your Serve",
      category: "Training",
      date: "Jun 22, 2026",
      readTime: "6 min read",
      image: "/images/blog-serve.png",
      excerpt: "Master the most important shot in tennis with these proven practice drills used by our elite coaches.",
      author: {
        name: "Lisa Wong",
        role: "Youth Development Coach",
        image: "/images/coach-lisa.jpg"
      },
      takeaways: [
        "Practice holding the trophy pose daily to build muscle memory and balance.",
        "Execute target basket serving to focus strictly on serve placement.",
        "Incorporate leg drive to shift power from your shoulder to your legs.",
        "Develop a reliable topspin second serve to remove double-fault pressure."
      ],
      content: [
        "The serve is the only shot in tennis where you have complete control. Yet, it remains one of the most challenging strokes to master. Developing a consistent, powerful delivery requires correct rhythm and body mechanics.",
        "Many players rely purely on arm strength, leaving significant power and safety on the table. By incorporating leg drive and correct racquet pathing, you can transform your serve into an active weapon.",
        "Incorporate these 5 drills into your serve practice:",
        "• The Trophy Pose: Hold your position at the top of your toss motion to build balance and correct alignment. Practice this in front of a mirror for five minutes daily to build muscle memory.",
        "• Target Basket Serving: Place target cones or tennis baskets in target zones (wide, body, T). Hit 50 serves and track your first-serve percentage. Focus on hitting targets, not raw speed.",
        "• Leg Drive toss drills: Power starts from the ground. Practice tossing the ball and bending your knees, exploding upward into the contact point. This shifts the effort from your shoulder to your legs.",
        "• Heavy Topspin Second Serves: Master the brush-up motion. Aim high over the net with heavy topspin to create a safety margin, removing double-fault pressure during tight matches.",
        "• Pressure Games: Play mini-games where you must make two first serves in a row to win a point. This simulates pressure scenarios and prepares you for real match play.",
        "Whether you need to fix a hitch or build a slice serve, our coaches at Ace Reserve are here to assist. Book a private analysis session today to refine your delivery."
      ]
    }
  ];

  const selectedPost = posts.find(p => p.id === selectedPostId);
  const relatedPosts = posts.filter(p => p.id !== selectedPostId).slice(0, 2);

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {selectedPost ? (
          /* Redesigned Premium Article Detail View */
          <div className="max-w-4xl mx-auto">
            {/* Navigation back */}
            <button
              onClick={() => setSelectedPostId(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-bold mb-8 group bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm w-fit"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Articles
            </button>

            {/* Premium Article Header Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm mb-10">
              <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                {selectedPost.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-8">
                {selectedPost.title}
              </h1>

              {/* Author & Publication Meta Card */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 border-t border-gray-150 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-600 shrink-0">
                    <img src={selectedPost.author.image} alt={selectedPost.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{selectedPost.author.name}</h4>
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{selectedPost.author.role}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-[3rem] overflow-hidden aspect-video mb-12 shadow-xl border border-white/50">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Main Reading Flow */}
              <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm">
                <div className="prose max-w-none text-gray-700 text-lg leading-relaxed space-y-6">
                  {/* Styled lead paragraph */}
                  <p className="text-xl font-medium text-gray-800 leading-relaxed border-l-4 border-blue-600 pl-4 mb-8">
                    {selectedPost.content[0]}
                  </p>
                  
                  {selectedPost.content.slice(1).map((paragraph, idx) => {
                    // Check if it is a list bullet
                    if (paragraph.startsWith("• ")) {
                      return (
                        <div key={idx} className="flex items-start gap-3 pl-2 text-gray-800 font-semibold my-4">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                          <span>{paragraph.substring(2)}</span>
                        </div>
                      );
                    }
                    return <p key={idx} className="mb-6">{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* Sidebar with Takeaways */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 border border-gray-800 shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                    <Quote className="w-5 h-5 text-blue-500 transform rotate-180" /> Key Takeaways
                  </h3>
                  <ul className="space-y-5">
                    {selectedPost.takeaways.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-300 leading-relaxed font-medium flex gap-2">
                        <span className="text-blue-500 font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-600 text-white rounded-[2.5rem] p-8 shadow-xl text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-4">Want 1-on-1 Practice?</h4>
                    <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                      Book a clinic with our coaching staff to drill down on these concepts.
                    </p>
                    <a href="/coaching" className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors shadow-sm">
                      View Programs
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles Footer */}
            <div className="border-t border-gray-200/60 pt-16 mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => setSelectedPostId(post.id)}
                  >
                    <div>
                      <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        {post.category}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                        {post.title}
                      </h4>
                    </div>
                    <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors text-sm mt-6 w-fit">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Redesigned Blog Grid Feed View */
          <div>
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-blue-550 text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <BookOpen className="w-4 h-4 inline-block mr-1.5 align-text-bottom" /> Club Blog
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
                Latest from the Court
              </h1>
              <p className="text-lg text-gray-600">
                Explore strategy, fitness advice, junior development, and serve drills curated by our elite coaching team.
              </p>
            </div>

            {/* Feed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                  onClick={() => setSelectedPostId(post.id)}
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
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

                  {/* Feed Card Footer (Author info) */}
                  <div className="px-8 pb-8 flex justify-between items-center text-sm font-medium border-t border-gray-50 pt-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-600">
                        <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-gray-700 text-xs font-bold">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
