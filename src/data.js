// ✏️ Edit everything here: your details, projects, photos.
export const ME = {
  name: "Md Rashedul Islam",
  role: "Building smart, secure systems with Python, Cloud & ML",
  email: "mdrashedulislam1056@gmail.com",
  github: "https://github.com/RashedulIslamTasif",
  linkedin: "https://www.linkedin.com/in/md-rashedul-islam-2b2bb9358",
  resume: "/resume.pdf", // put resume.pdf in /public
  tz: "Asia/Dhaka (GMT+6)",
};

// Photos in /public: the site tries each extension until one loads.
export const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG"];
const base = (n) => encodeURI(`/${n}`);
ME.dp = base("Tasif");

export const SKILLS = {
  "Languages & Systems": ["Python", "C", "C++", "Linux", "Shell Scripting"],
  "Cloud & Networks": ["AWS", "Network Architecture", "Telecommunications / RF", "Distributed Systems"],
  "Tools & Workflows": ["Git", "GitHub", "Docker", "VS Code"],
};

// Add "demo: 'https://...'" to a project to show a Live Demo link.
export const PROJECTS = [
  { title: "Upay_Guardian", impact: "Multi-modal AI scam shield for mobile financial services that reads Bangla, Banglish and English scam messages and applies graduated friction instead of auto-blocking. Scores a transaction in 1.40 ms on synthetic data. Team entry in AI DEV FEST 2026.", tags: ["Python", "FastAPI", "LightGBM", "NLP"], demo: "https://upay-guardian.onrender.com", repo: "https://github.com/RashedulIslamTasif/Upay_Guardian" },
  { title: "KrishiConnect", impact: "Full-stack marketplace connecting Bangladeshi farmers directly with customers, with no middlemen. Features real-time chat, bKash and Nagad payments, order tracking and admin-verified farmer profiles.", tags: ["React", "Node.js", "MongoDB", "Socket.io"], demo: "https://krishi-connect-eta.vercel.app", repo: "https://github.com/RashedulIslamTasif/KrishiConnect" },
  { title: "Network Scanner", impact: "An ARP network scanner that discovers devices on a local network. Built with Python and Scapy.", tags: ["Python", "Scapy", "Networking"], repo: "https://github.com/RashedulIslamTasif/network-scanner" },
  { title: "SMS Spam Classifier", impact: "A machine learning model that separates spam from legitimate SMS messages. Developed in a Jupyter Notebook.", tags: ["Python", "Machine Learning", "NLP"], repo: "https://github.com/RashedulIslamTasif/sms-spam-classifier" },
];

export const PHOTOS = [
  { name: "Mountain Village", cat: "Village", loc: "Bangladesh", gear: "Smartphone" },
  { name: "Siblings Mountain", cat: "Landscapes", loc: "Bangladesh", gear: "Smartphone" },
  { name: "Simple Life", cat: "Village", loc: "Bangladesh", gear: "Smartphone" },
  { name: "0.5X", cat: "Travel", loc: "Bangladesh", gear: "Smartphone · 0.5x ultra-wide" },
  { name: "Dream Life", cat: "Landscapes", loc: "Bangladesh", gear: "Smartphone" },
].map((p) => ({ ...p, src: base(p.name) }));

// Add your thesis and research here once they're complete.
export const TIMELINE = [
  { when: "Currently pursuing", title: "B.Sc. in Information & Communication Engineering", place: "Bangladesh University of Professionals", text: "Cloud enthusiast, currently learning cloud computing, Python and machine learning." },
  { when: "2024 – Now", title: "Membership Development Secretary", place: "Your Club", text: "Grow the club's membership by recruiting new members, running onboarding and keeping members engaged." },
  { when: "Completed", title: "Higher Secondary Certificate (HSC)", place: "Adamjee Cantonment College" },
  { when: "Completed", title: "Secondary School Certificate (SSC)", place: "Baushia M.A. Azher High School" },
];

// Certificates: files live in /public/certs
export const CERTS = [
  { title: "July Hackathon 2026", issuer: "JRA Foundation", date: "July 2026", team: "Buggy_Coders", text: "Certificate of Participation for a 72-hour online build sprint (28–31 July 2026), part of the 1st Conclave on July Revolution.", img: "/certs/july-hackathon.jpg", pdf: "/certs/july-hackathon.pdf" },
  { title: "AI Hackathon, AI Dev Fest 2026", issuer: "DIU CPC, Daffodil International University", date: "7 October 2026", team: "4LG0_R1THM", text: "Certificate of Appreciation for participating in the AI Hackathon, organized under the Department of CSE.", img: "/certs/ai-dev-fest.jpg", pdf: "/certs/ai-dev-fest.pdf" },
];
