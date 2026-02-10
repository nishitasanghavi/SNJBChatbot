interface BotResponse {
  text: string;
  quickReplies?: string[];
}

const CONTACT_FALLBACK = "\n\nIf you need more help, you can call the college at **+91 2556 253750** or **8888491461**.";

const QUICK_CATEGORIES = [
  "About SNJB",
  "Courses Offered",
  "Admissions",
  "Fees Structure",
  "Placements",
  "Cutoffs",
  "Hostel & Facilities",
  "Contact Us",
  "Lateral Entry (DSE)",
  "Training & Support",
];

const WELCOME_MESSAGE: BotResponse = {
  text: "Hi there! Welcome to SNJB College of Engineering. I can help you with questions about our college - like courses, fees, admissions, placements, hostel, and more. Just pick a topic below or type your question!",
  quickReplies: QUICK_CATEGORIES,
};

const knowledgeBase: Record<string, BotResponse> = {
  about: {
    text: `**About SNJB College of Engineering**

SNJB College of Engineering is in **Chandwad, Nashik** (Maharashtra). It started in **2004** and is part of the Jain Gurukul campus.

Here are the key things to know:
- It comes under **Savitribai Phule Pune University (SPPU)**
- It has **NAAC 'A+' Grade** (that means very good quality)
- Several branches have **NBA Accreditation** (Computer, Civil, E&TC, Mechanical, MBA)
- College code is **5173** (you'll need this during admissions)
- It is approved by **AICTE** (Government of India) and Government of Maharashtra

The college started with 4 branches - Mechanical, Computer, E&TC, and Civil. Now it has grown to offer more courses including AI & Data Science and MBA.

Website: [snjb.org/engineering](https://www.snjb.org/engineering/)${CONTACT_FALLBACK}`,
    quickReplies: ["Courses Offered", "Admissions", "Contact Us"],
  },
  courses: {
    text: `**Courses at SNJB**

We have 3 levels of courses:

**After 12th (B.Tech - 4 years):**
- Artificial Intelligence & Data Science (AI & DS)
- Civil Engineering
- Computer Engineering
- Electronics & Telecommunication (E&TC)
- Mechanical Engineering

**After Graduation (PG Courses):**
- MBA (Master of Business Administration)
- M.Tech in Computer Engineering
- M.Tech in Mechanical Engineering

**Research (Ph.D.):**
- Available in MBA, Computer Engineering, and Mechanical Engineering

Most students join B.Tech after 12th. Computer Engineering and AI & DS are the most popular branches right now.${CONTACT_FALLBACK}`,
    quickReplies: ["Fees Structure", "Admissions", "Placements"],
  },
  admissions: {
    text: `**How to Get Admission**

**For B.Tech (after 12th):**
- You need to pass 12th with Physics + Maths + one more subject (Chemistry/Bio/Tech)
- Minimum marks: **45%** (General) or **40%** (Reserved categories like SC/ST/OBC)
- You must have a valid **MHT-CET** or **JEE Main** score
- Admission happens through the state CAP (online counseling) process

**For MBA (after graduation):**
- Any degree with at least **50%** marks (45% for Reserved)
- Valid score in MAH-MBA-CET, CAT, CMAT, MAT, XAT, or ATMA

**For Direct 2nd Year (after Diploma):**
- Diploma in Engineering with at least **45%** marks (40% for Reserved)
- This is called "Lateral Entry" or DSE

**College Code: 5173** - Use this when filling your admission form.${CONTACT_FALLBACK}`,
    quickReplies: ["Fees Structure", "Cutoffs", "Lateral Entry (DSE)"],
  },
  fees: {
    text: `**Fees (2025-26, Approximate)**

**B.Tech (per year):**
- General/Open category: around **₹1,18,000**
- OBC/EBC: around **₹65,000 - ₹70,000**
- SC/ST/VJNT/SBC: around **₹10,000 - ₹20,000** (most fees covered by government)
- TFWS (Free seat): around **₹15,000 - ₹20,000** only
- **Girls get 100% tuition fee waiver** in all categories (big saving!)

**MBA:** around ₹86,000 - ₹88,000 per year
**M.Tech:** around ₹1,04,000 per year
**Direct 2nd Year (Lateral Entry):** around ₹1,07,000 per year (Open)

**Hostel Fees (per year, food included):**
- Boys: ₹49,500 - ₹70,000 (depends on room type)
- Girls: ₹49,500 - ₹62,000

These fees can change - the Fees Regulating Authority (FRA) decides the final amount each year.${CONTACT_FALLBACK}`,
    quickReplies: ["Hostel & Facilities", "Admissions", "Contact Us"],
  },
  placements: {
    text: `**Placements at SNJB**

Here's a simple summary of our placement record:
- About **70-75%** of students get placed
- **Highest package:** ₹15.74 LPA (Lakhs per year)
- **Average package:** ₹3.5 - ₹4.5 LPA
- **Most common salary:** around ₹3.5 LPA

**Which branches do well?**
| Branch | Highest Package |
|---|---|
| Computer Engineering | ₹15.74 LPA (best!) |
| AI & Data Science | ₹8.2 LPA |
| E&TC | ₹4.2 - ₹6.5 LPA |
| Mechanical | ₹4.5 LPA |
| Civil | ₹3.6 LPA |

**Companies that come to hire:** TCS, Capgemini, Cognizant, Wipro, Infosys, LTIMindtree, Zensar, Hexaware, L&T, Bosch, Mahindra, Jio, D-Mart, ICICI Bank, Bajaj Finance, and more.

Computer Engineering students usually get the best packages and the most job offers.${CONTACT_FALLBACK}`,
    quickReplies: ["Training & Support", "Courses Offered", "Cutoffs"],
  },
  cutoffs: {
    text: `**Cutoffs (How much score you need to get in)**

**MHT-CET Cutoffs (Approximate Percentiles):**

| Branch | Open/General | OBC | TFWS |
|---|---|---|---|
| Computer Engineering | 79-88 | 76-80 | 88-92 |
| AI & Data Science | 78-85 | 75-79 | 85-90 |
| E&TC | 73-76 | 45-60 | 75-80 |
| Mechanical | 55-68 | 10-40 | ~70 |
| Civil | 50-60 | 10-30 | ~76 |

Higher percentile = harder to get in. Computer and AI branches need the highest scores.

**JEE Main Ranks (All India Quota):**
- Computer: around 3,30,000 - 3,90,000 rank
- AI & DS: around 3,40,000 - 4,20,000 rank
- E&TC: around 4,50,000 - 4,80,000 rank

**Jain Minority Quota:** You just need a positive (non-zero) MHT-CET score for most branches.

These cutoffs change every year depending on number of students and exam difficulty.${CONTACT_FALLBACK}`,
    quickReplies: ["Admissions", "Fees Structure", "Contact Us"],
  },
  hostel: {
    text: `**Hostel & Campus Facilities**

**Hostel:**
- **Boys:** 4 hostel buildings (can fit ~810 students)
- **Girls:** 2 hostel buildings (can fit ~750 students)
- Rooms are shared by 2, 4, or 5 students
- Boys Regular room: ₹55,500/year | Deluxe: ₹78,000/year
- Girls Regular room: ₹60,000/year | Deluxe: ₹72,000/year
- **Food is included** in hostel fees (pure vegetarian Jain food)

**What you get in hostel:**
- Bed, table, chair, wardrobe
- Wi-Fi internet
- Clean drinking water (RO purified)
- Hot water (solar heaters)

**Other facilities on campus:**
- Indoor Gym and outdoor exercise area
- Sports: Cricket, Volleyball, Basketball, Table Tennis
- Library and reading room
- Medical checkup facility with visiting doctor

**Rules:** Hostel gate closes at 8 PM. Non-veg food, alcohol, and tobacco are not allowed on campus.${CONTACT_FALLBACK}`,
    quickReplies: ["Fees Structure", "About SNJB", "Contact Us"],
  },
  contact: {
    text: `**How to Contact SNJB**

**Address:**
SNJB's College of Engineering,
Neminagar, Chandwad - 423101,
Dist. Nashik, Maharashtra

**Main Phone Numbers:**
- **+91 2556 253750** (College office)
- **8888491461** (Admission enquiry)
- **8888491463** (Student section)

**Email:** principalcoe@snjb.org

**For Admission Help:**
- Mr. Ingle U. P. (Admission Office): **+91 88884 91461**
- Mr. Jadhav M. M. (Student Section): **+91 88884 91463**

**Branch-wise Contacts (First Year):**
- Computer: Prof. Pankaj Desai - 97304 78001
- AI & DS: Prof. M. V. Kumbharde - 90490 56922
- Civil: Prof. Pradip Yeole - 92727 22476
- E&TC: Prof. Y. S. Rathod - 97667 63988
- Mechanical: Prof. Kiran B. Gore - 73504 58639

**MBA:** Prof. Manoj Barkale - +91 98908 57863

Feel free to call during office hours (10 AM to 5 PM, Monday to Saturday).`,
    quickReplies: ["About SNJB", "Admissions", "Fees Structure"],
  },
  dse: {
    text: `**Direct Second Year (Lateral Entry / DSE)**

This is for students who have completed a **Diploma** and want to join engineering directly in **2nd year** (skip 1st year).

**Who can apply?**
- Diploma holders with at least **45%** marks (40% for Reserved/EWS)
- OR B.Sc. graduates with 45% + 12th with Maths

**How to apply (step by step):**
1. Go to **mahacet.org** and register for "Direct Second Year Engineering"
2. Upload your documents and get them verified
3. Wait for the Merit List
4. Fill the Option Form - use **College Code: 5173** for SNJB
5. If you get a seat, accept it and come to college with your documents

**Fees (per year):**
- Open/General: around ₹1,07,000
- OBC/EBC: around ₹60,000 - ₹65,000
- SC/ST: around ₹10,000 - ₹15,000

**Diploma % needed to get in (approximate):**
| Branch | Open | Reserved |
|---|---|---|
| Computer | 82-88% | 60-75% |
| AI & DS | 80-85% | 60-70% |
| E&TC | 70-78% | 55-65% |
| Mechanical | 60-70% | 50-60% |
| Civil | 55-65% | 50-60% |

**DSE Contacts:**
- Comp/AI-DS: Prof. R. R. Bhandari - 94042 14914
- Civil: Prof. Pradip Yeole - 92727 22476
- E&TC: Prof. M. A. Mechkul - 94223 13640
- Mechanical: Prof. Y. S. Kulkarni - 96652 75743${CONTACT_FALLBACK}`,
    quickReplies: ["Admissions", "Fees Structure", "Contact Us"],
  },
  training: {
    text: `**Training & Placement Support**

The college has a special **Training & Placement (T&P) Cell** that helps students prepare for jobs. Training starts from **3rd year**.

**What training do you get?**
- **Aptitude practice:** Maths, reasoning, and logical tests (companies use these to shortlist)
- **Communication skills:** How to speak confidently, email writing, professional behavior
- **Technical training:** Coding in C, C++, Java, Python and other skills companies look for

**Practice for interviews:**
- Mock interviews with people from companies
- Group Discussion (GD) practice
- Online and offline test practice

**Internship help:**
- The college helps you find summer and winter internships
- Many internships turn into job offers (called PPOs)
- Regular visits to companies so you can see real workplaces

**Career guidance:**
- One-on-one advice from teachers and placement officers
- Help deciding between job, higher studies, or starting your own business

The T&P Cell works hard to make sure students are job-ready by the time companies visit campus.${CONTACT_FALLBACK}`,
    quickReplies: ["Placements", "Courses Offered", "Contact Us"],
  },
};

const intentPatterns: Record<string, RegExp[]> = {
  about: [/about\s*(snjb|college|us|institute|campus)/i, /what\s*is\s*snjb/i, /tell\s*me\s*about/i, /general\s*info/i, /where\s*is\s*(the\s*)?(college|campus|snjb)/i, /location/i, /established/i, /affiliation/i, /accreditation/i, /naac/i, /nba/i, /sppu/i, /institute\s*code/i, /vision/i, /mission/i],
  courses: [/courses?\s*(offered|available)/i, /what\s*(courses|programs|branches)/i, /b\.?\s*tech/i, /b\.?\s*e\.?\b/i, /mba/i, /m\.?\s*tech/i, /ph\.?\s*d/i, /artificial\s*intelligence/i, /data\s*science/i, /computer\s*engineering/i, /civil\s*engineering/i, /mechanical\s*engineering/i, /electronics/i, /telecommunication/i, /e\s*&?\s*tc/i, /ai\s*&?\s*ds/i, /undergraduate/i, /postgraduate/i, /branches/i, /departments/i, /streams/i],
  admissions: [/admission/i, /eligib/i, /how\s*to\s*(apply|join|get\s*in)/i, /entrance/i, /cet/i, /jee/i, /12th/i, /hsc/i, /criteria/i, /requirement/i, /minimum\s*marks/i, /apply/i, /enroll/i, /process/i],
  fees: [/fees?\b/i, /tuition/i, /cost/i, /expense/i, /how\s*much/i, /price/i, /payment/i, /scholarship/i, /waiver/i, /tfws/i, /concession/i, /afford/i],
  placements: [/placement/i, /package/i, /salary/i, /recruit/i, /job/i, /hire/i, /company/i, /companies/i, /lpa/i, /ctc/i, /offer/i, /campus\s*drive/i, /tcs/i, /infosys/i, /wipro/i, /capgemini/i],
  cutoffs: [/cut\s*off/i, /cutoff/i, /percentile/i, /rank/i, /merit/i, /score/i, /marks\s*required/i, /closing\s*rank/i, /open\s*category/i, /obc/i, /sc\/?st/i],
  hostel: [/hostel/i, /accommodat/i, /mess/i, /food/i, /room/i, /facilit/i, /gym/i, /sport/i, /wifi/i, /wi-fi/i, /campus\s*life/i, /library/i, /playground/i, /curfew/i, /veg/i, /non.?veg/i, /ameniti/i, /infrastructure/i, /transport/i],
  contact: [/contact/i, /phone/i, /email/i, /address/i, /reach/i, /call/i, /number/i, /helpline/i, /enquiry/i, /inquiry/i, /coordinator/i, /office/i],
  dse: [/lateral\s*entry/i, /direct\s*(second|2nd)\s*year/i, /dse/i, /diploma/i, /diploma\s*holder/i, /direct\s*admission/i, /b\.?sc/i],
  training: [/training/i, /t\s*&?\s*p\s*cell/i, /placement\s*(cell|support|preparation)/i, /prepare/i, /aptitude/i, /soft\s*skill/i, /mock\s*interview/i, /internship/i, /industry/i, /seminar/i, /workshop/i, /career\s*counsel/i, /group\s*discussion/i],
};

const categoryLabelMap: Record<string, string> = {
  "About SNJB": "about",
  "Courses Offered": "courses",
  Admissions: "admissions",
  "Fees Structure": "fees",
  Placements: "placements",
  Cutoffs: "cutoffs",
  "Hostel & Facilities": "hostel",
  "Contact Us": "contact",
  "Lateral Entry (DSE)": "dse",
  "Training & Support": "training",
};

export function getResponse(userMessage: string): BotResponse {
  const trimmed = userMessage.trim();

  const catKey = categoryLabelMap[trimmed];
  if (catKey && knowledgeBase[catKey]) {
    return knowledgeBase[catKey];
  }

  const lower = trimmed.toLowerCase();

  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|namaste|greetings)/i.test(lower)) {
    return WELCOME_MESSAGE;
  }

  if (/^(thanks?|thank\s*you|thx|ty|appreciate)/i.test(lower)) {
    return {
      text: "You're welcome! Feel free to ask if you have more questions. I'm happy to help!",
      quickReplies: QUICK_CATEGORIES,
    };
  }

  if (/^(bye|goodbye|see\s*you|take\s*care)/i.test(lower)) {
    return {
      text: "Goodbye! Thanks for chatting with us. If you need anything later, just come back here. All the best!",
      quickReplies: ["About SNJB", "Contact Us"],
    };
  }

  let bestMatch = "";
  let bestScore = 0;

  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    let score = 0;
    for (const pattern of patterns) {
      if (pattern.test(lower)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = intent;
    }
  }

  if (bestMatch && bestScore > 0 && knowledgeBase[bestMatch]) {
    return knowledgeBase[bestMatch];
  }

  return {
    text: "Sorry, I don't have information about that right now. You can pick one of the topics below, or contact the college directly for help.\n\n**Call:** +91 2556 253750 or 8888491461\n**Email:** principalcoe@snjb.org\n\nOur team will be happy to answer your question!",
    quickReplies: QUICK_CATEGORIES,
  };
}
