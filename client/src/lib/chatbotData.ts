export interface BotResponse {
  text: string;
  quickReplies?: string[];
}

export const QUICK_CATEGORIES = [
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

export const WELCOME_MESSAGE: BotResponse = {
  text: "Welcome to SNJB College of Engineering! I'm here to help you with any questions about admissions, courses, fees, placements, and more. What would you like to know?",
  quickReplies: QUICK_CATEGORIES,
};

const knowledgeBase: Record<string, BotResponse> = {
  about: {
    text: `**SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering** is located in Chandwad, Nashik. Established in 2004, it is part of the Jain Gurukul campus.

- **Affiliation:** Savitribai Phule Pune University (SPPU)
- **Accreditation:** NAAC 'A+' Grade, NBA Accredited (Civil, Computer, E&TC, Mechanical, MBA)
- **Institute Code:** 5173
- **Website:** [snjb.org/engineering](https://www.snjb.org/engineering/)

The Jain Gurukul campus has various faculties. SNJB's College of Engineering is approved by AICTE, New Delhi and the Government of Maharashtra. It was established with four branches: Mechanical, Computer, E&TC, and Civil Engineering.`,
    quickReplies: ["Courses Offered", "Admissions", "Contact Us"],
  },
  courses: {
    text: `We offer **Undergraduate (B.Tech)**, **Postgraduate (MBA, M.Tech)**, and **Ph.D.** programs.

**B.Tech Branches:**
- Artificial Intelligence & Data Science
- Civil Engineering
- Computer Engineering
- Electronics & Telecommunication
- Mechanical Engineering

**PG Courses:**
- MBA (General)
- M.Tech (Computer Engineering, Mechanical Engineering)

**Ph.D. Research Center:**
- MBA, Computer Engineering, Mechanical Engineering`,
    quickReplies: ["Fees Structure", "Admissions", "Placements"],
  },
  admissions: {
    text: `**First Year B.E./B.Tech Eligibility:**
1. Passed HSC (12th) with Physics & Maths as compulsory subjects along with Chemistry/Bio/Tech/Vocational
2. Minimum Marks: 45% (General) or 40% (Reserved/PWD of Maharashtra)
3. Valid Score: MHT-CET or JEE Main (current year)

**MBA Eligibility:**
1. Bachelor's degree in any discipline with minimum 50% marks (45% for Reserved)
2. Valid Score in MAH-MBA-CET, CAT, CMAT, MAT, XAT, or ATMA

**Lateral Entry (Direct 2nd Year):**
- Diploma holders with at least 45% marks (40% for Reserved) are eligible`,
    quickReplies: ["Fees Structure", "Cutoffs", "Lateral Entry (DSE)"],
  },
  fees: {
    text: `**Fee Structure (2025-26, Approximate):**

**B.Tech (First Year):**
- Open/General: ~₹1,18,000/year
- OBC/EBC: ~₹65,000 - ₹70,000/year
- SC/ST/VJNT/SBC: ~₹10,000 - ₹20,000/year
- TFWS: ~₹15,000 - ₹20,000/year
- Girls (All Categories): 100% Tuition Fee waived

**MBA:** ~₹86,000 - ₹88,000/year
**M.Tech:** ~₹1,04,000/year
**Direct Second Year:** ~₹1,07,000/year (Open)

**Hostel Fees (Annual):**
- Boys: ₹49,500 - ₹70,000 (Regular vs Deluxe)
- Girls: ₹49,500 - ₹62,000

*Fees subject to approval by Fees Regulating Authority (FRA)*`,
    quickReplies: ["Hostel & Facilities", "Admissions", "Contact Us"],
  },
  placements: {
    text: `**Placement Highlights:**
- Overall Placement Rate: ~70-75%
- Highest Package: **₹15.74 LPA**
- Average Package: **₹3.5 - ₹4.5 LPA**
- Median Salary: ~₹3.5 LPA

**Branch-wise Performance:**
| Branch | Status | Highest Package |
|---|---|---|
| Computer Engineering | Excellent (113+ placed) | ₹15.74 LPA |
| AI & Data Science | Growing demand | ₹8.2 LPA |
| E&TC | Consistent | ₹4.2 - ₹6.5 LPA |
| Mechanical | Consistent | ~₹4.5 LPA |
| Civil | Consistent | ₹3.6 LPA |

**Top Recruiters:** TCS, Capgemini, Cognizant, Zensar, Hexaware, LTIMindtree, Wipro, Infosys, L&T, Bosch, Mahindra, Jio, D-Mart, ICICI Bank, Bajaj Finance`,
    quickReplies: ["Training & Support", "Courses Offered", "Cutoffs"],
  },
  cutoffs: {
    text: `**MHT-CET Cutoffs (Open/General, Approximate Percentiles):**

| Branch | Open (GOPEN) | OBC | TFWS |
|---|---|---|---|
| Computer Engineering | 79-88 %tile | 76-80 %tile | 88-92 %tile |
| AI & Data Science | 78-85 %tile | 75-79 %tile | 85-90 %tile |
| E&TC Engineering | 73-76 %tile | 45-60 %tile | 75-80 %tile |
| Mechanical | 55-68 %tile | 10-40 %tile | ~70 %tile |
| Civil | 50-60 %tile | 10-30 %tile | ~76 %tile |

**JEE Main Ranks (All India Quota):**
- Computer: ~3,30,000 - 3,90,000
- AI & DS: ~3,40,000 - 4,20,000
- E&TC: ~4,50,000 - 4,80,000

**Jain Minority Quota:** Requires a non-zero positive score in MHT-CET for most branches.

*Cutoffs vary annually based on applicants and difficulty.*`,
    quickReplies: ["Admissions", "Fees Structure", "Contact Us"],
  },
  hostel: {
    text: `**Hostel Facilities at SNJB:**

- **Boys Hostels:** 4 buildings (~810 capacity)
- **Girls Hostels:** 2 buildings (~750 capacity)

**Room Types & Fees (Annual, including mess):**
- Boys Regular: ₹55,500 | Deluxe: ₹78,000
- Girls Regular: ₹60,000 | Deluxe: ₹72,000
- Sharing: 2, 4, or 5 students per room

**Amenities:**
- Bed, table, chair, wardrobe, Wi-Fi
- RO purified water, solar water heaters
- Indoor Gym, outdoor "Green Gym"
- Sports: Table Tennis, Cricket, Volleyball, Basketball
- Library/Reading Room, Guest Room, Amphitheatre
- Medical OPD with visiting doctor

**Food:** Pure Vegetarian Jain food (included in fees)
**Curfew:** 8:00 PM | Biometric attendance daily
**Policy:** Non-veg, alcohol & tobacco strictly prohibited`,
    quickReplies: ["Fees Structure", "About SNJB", "Contact Us"],
  },
  contact: {
    text: `**Contact Information:**

**Address:** Neminagar, Chandwad - 423101, Dist. Nashik, Maharashtra

**Phone:** +91 2556 253750, 8888491461, 8888491463
**Email:** principalcoe@snjb.org

**Admission Enquiry:**
- Mr. Ingle U. P. (Admission Office): +91 88884 91461
- Mr. Jadhav M. M. (Student Section): +91 88884 91463

**Department Coordinators (First Year):**
- Computer: Prof. Pankaj Desai - 97304 78001
- AI & DS: Prof. M. V. Kumbharde - 90490 56922
- Civil: Prof. Pradip Yeole - 92727 22476
- E&TC: Prof. Y. S. Rathod - 97667 63988
- Mechanical: Prof. Kiran B. Gore - 73504 58639

**MBA:** Prof. Manoj Barkale - +91 98908 57863`,
    quickReplies: ["About SNJB", "Admissions", "Fees Structure"],
  },
  dse: {
    text: `**Direct Second Year (Lateral Entry) Admission:**

**Eligibility:**
- Diploma in Engineering/Technology with min 45% (40% for Reserved/EWS/PWD)
- OR B.Sc. with 45% + HSC with Maths

**Admission Process (CAP - State CET Cell):**
1. Register online at mahacet.org under 'Direct Second Year Engineering'
2. Upload & verify documents (E-Scrutiny/Physical)
3. Check Provisional and Final Merit List
4. Fill Option Form - **Institute Code: 5173**
5. Accept allotted seat (Freeze/Betterment) and report to college

**Fees (Open):** ~₹1,07,000/year
**OBC/EBC:** ~₹60,000 - ₹65,000 | **SC/ST:** ~₹10,000 - ₹15,000

**DSE Cutoffs (Diploma %):**
| Branch | Open | Minority/Reserved |
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
- Mechanical: Prof. Y. S. Kulkarni - 96652 75743`,
    quickReplies: ["Admissions", "Fees Structure", "Contact Us"],
  },
  training: {
    text: `**Training & Placement Support:**

The T&P Cell begins preparation from the **3rd Year**:

**Pre-Placement Training:**
- Aptitude Training: Rigorous sessions for screening tests
- Soft Skills: Communication, personality development, professional etiquette
- Technical Training: Coding (C, C++, Java, Python) & domain skills

**Mock Drills & Practice:**
- Mock Personal Interviews with industry experts
- Group Discussion (GD) practice sessions
- Online & offline aptitude tests

**Internship Support:**
- Summer/Winter internship assistance (often convert to PPOs)
- Regular industrial visits for practical exposure

**Industry-Institute Interaction:**
- Expert talks & seminars on latest technologies
- MoUs with companies bridging academic-industry gap

**Career Counseling:**
- One-on-one guidance by faculty & T&P officers
- Help choosing: Job vs. Higher Studies vs. Entrepreneurship`,
    quickReplies: ["Placements", "Courses Offered", "Contact Us"],
  },
};

const intentPatterns: Record<string, RegExp[]> = {
  about: [
    /about\s*(snjb|college|us|institute|campus)/i,
    /what\s*is\s*snjb/i,
    /tell\s*me\s*about/i,
    /general\s*info/i,
    /where\s*is\s*(the\s*)?(college|campus|snjb)/i,
    /location/i,
    /established/i,
    /affiliation/i,
    /accreditation/i,
    /naac/i,
    /nba/i,
    /sppu/i,
    /institute\s*code/i,
    /vision/i,
    /mission/i,
  ],
  courses: [
    /courses?\s*(offered|available)/i,
    /what\s*(courses|programs|branches)/i,
    /b\.?\s*tech/i,
    /b\.?\s*e\.?\b/i,
    /mba/i,
    /m\.?\s*tech/i,
    /ph\.?\s*d/i,
    /artificial\s*intelligence/i,
    /data\s*science/i,
    /computer\s*engineering/i,
    /civil\s*engineering/i,
    /mechanical\s*engineering/i,
    /electronics/i,
    /telecommunication/i,
    /e\s*&?\s*tc/i,
    /ai\s*&?\s*ds/i,
    /undergraduate/i,
    /postgraduate/i,
    /branches/i,
    /departments/i,
    /streams/i,
  ],
  admissions: [
    /admission/i,
    /eligib/i,
    /how\s*to\s*(apply|join|get\s*in)/i,
    /entrance/i,
    /cet/i,
    /jee/i,
    /12th/i,
    /hsc/i,
    /criteria/i,
    /requirement/i,
    /minimum\s*marks/i,
    /apply/i,
    /enroll/i,
    /process/i,
  ],
  fees: [
    /fees?\b/i,
    /tuition/i,
    /cost/i,
    /expense/i,
    /how\s*much/i,
    /price/i,
    /payment/i,
    /scholarship/i,
    /waiver/i,
    /tfws/i,
    /concession/i,
    /afford/i,
  ],
  placements: [
    /placement/i,
    /package/i,
    /salary/i,
    /recruit/i,
    /job/i,
    /hire/i,
    /company/i,
    /companies/i,
    /lpa/i,
    /ctc/i,
    /offer/i,
    /campus\s*drive/i,
    /tcs/i,
    /infosys/i,
    /wipro/i,
    /capgemini/i,
  ],
  cutoffs: [
    /cut\s*off/i,
    /cutoff/i,
    /percentile/i,
    /rank/i,
    /merit/i,
    /score/i,
    /marks\s*required/i,
    /closing\s*rank/i,
    /open\s*category/i,
    /obc/i,
    /sc\/?st/i,
  ],
  hostel: [
    /hostel/i,
    /accommodat/i,
    /mess/i,
    /food/i,
    /room/i,
    /facilit/i,
    /gym/i,
    /sport/i,
    /wifi/i,
    /wi-fi/i,
    /campus\s*life/i,
    /library/i,
    /playground/i,
    /curfew/i,
    /veg/i,
    /non.?veg/i,
    /ameniti/i,
    /infrastructure/i,
    /transport/i,
  ],
  contact: [
    /contact/i,
    /phone/i,
    /email/i,
    /address/i,
    /reach/i,
    /call/i,
    /number/i,
    /helpline/i,
    /enquiry/i,
    /inquiry/i,
    /coordinator/i,
    /office/i,
  ],
  dse: [
    /lateral\s*entry/i,
    /direct\s*(second|2nd)\s*year/i,
    /dse/i,
    /diploma/i,
    /diploma\s*holder/i,
    /direct\s*admission/i,
    /b\.?sc/i,
  ],
  training: [
    /training/i,
    /t\s*&?\s*p\s*cell/i,
    /placement\s*(cell|support|preparation)/i,
    /prepare/i,
    /aptitude/i,
    /soft\s*skill/i,
    /mock\s*interview/i,
    /internship/i,
    /industry/i,
    /seminar/i,
    /workshop/i,
    /career\s*counsel/i,
    /group\s*discussion/i,
  ],
};

const categoryLabelMap: Record<string, string> = {
  "About SNJB": "about",
  "Courses Offered": "courses",
  "Admissions": "admissions",
  "Fees Structure": "fees",
  "Placements": "placements",
  "Cutoffs": "cutoffs",
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
      text: "You're welcome! Feel free to ask if you have any more questions. I'm happy to help!",
      quickReplies: QUICK_CATEGORIES,
    };
  }

  if (/^(bye|goodbye|see\s*you|take\s*care)/i.test(lower)) {
    return {
      text: "Goodbye! Thank you for visiting SNJB College of Engineering. Feel free to reach out anytime. All the best!",
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
    text: "I'm sorry, I couldn't understand your question. Could you please rephrase it, or choose one of the topics below? You can ask me about admissions, courses, fees, placements, hostel facilities, cutoffs, and more!",
    quickReplies: QUICK_CATEGORIES,
  };
}
