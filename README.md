SkillSense – Unlock Your Hidden Potential

Discover and showcase your hidden skills with AI.

SkillSense is an AI-powered web application that uncovers hidden skills from resumes, LinkedIn profiles, and work-related data. It helps individuals identify their strengths, organizations find internal talent, and teams build the right skill mix through intelligent AI analysis and skill visualization.

Built for the Hack-Nation Challenge (SAP Corporate Track), this project redefines how people and teams discover, validate, and showcase their real capabilities.

---

##Project Description

The future of work is skills-based, not credential-based.  
Traditional resumes only capture part of a person’s story; SkillSense goes deeper by:

- Aggregating data from multiple sources (CVs, LinkedIn, GitHub, blogs)  
- Extracting explicit and implicit skills using Natural Language Processing (NLP) 
- Generating dynamic skill profiles with confidence scores and evidence trails  
- Providing personalized recommendations for learning and career growth  

Ultimately, SkillSense helps users answer:  
> “What am I really good at?”

---

## Installation & Setup

### Prerequisites
- Node.js (v18+)  
- npm or yarn  
- MongoDB instance  
- OpenAI API Key (or compatible ML endpoint)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/<yourusername>/skillsense.git

# 2. Navigate into the project directory
cd skillsense

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env

# 5. Start development server
npm run dev
Environment Variables
bash
Copy code
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongo_connection_string
LINKEDIN_CLIENT_ID=your_linkedin_id
LINKEDIN_CLIENT_SECRET=your_linkedin_secret
JWT_SECRET=your_jwt_secret
 Dependencies
Frontend
React (UI Framework)

TailwindCSS (Styling)

Axios (API Requests)

Framer Motion (Animations)

Lucide / Feather Icons

Backend
Node.js / Express.js (Server)

MongoDB / Mongoose (Database)

OpenAI API or HuggingFace (AI Skill Extraction)

JWT (Authentication)

Folder Structure
csharp
Copy code
skillsense/
│
├── frontend/          # React App
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── styles/
│
├── backend/           # Node/Express API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── services/
│
├── public/
│
├── .env.example
├── package.json
└── README.md
Development Roadmap
Phase 1 — MVP (Current)
File upload (CV/PDF)

AI skill extraction

Skill profile generation

Responsive UI

Phase 2 — Smart Insights
Skill gap analysis

Role-based recommendations

Exportable PDF report

Phase 3 — Community & Growth
Public profile sharing

Endorsement system

Learning resource integration (Coursera, YouTube API)

 UX Improvement Suggestions (Future Enhancements)
AI-guided onboarding to refine analysis

Skill timeline visualization based on career history

Search & filter by skill category or confidence

Peer verification or manual skill validation

AI career path mapping (future roles & upskilling suggestions)

 Design Credits
Theme: Apple-inspired purple gradient #6C5CE7 → #A29BFE

Typography: Montserrat (Google Fonts)

Icons: Lucide / Feather Icons

Tools: Figma, Framer

Team Members
Name	Role	Responsibilities
Gift Okoye	Product Designer / UX Engineer	UX research, UX Engineer, UI/UX design
Victor Ironali	AI Developer / Engineer	Backend, NLP model integration, data parsing

License
This project is licensed under the MIT License — feel free to use, modify, and contribute.

 Connect & Contribute
We welcome contributions, feature ideas, and bug reports!

Submit an issue

Open a pull request

Join the discussion to help improve SkillSense

Let’s help people discover the best version of their professional selves — one skill at a time.

Live Preview
 https://skillsense-ai.lovable.app (Update when live)
