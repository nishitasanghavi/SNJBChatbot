interface BotResponse {
  text: string;
  quickReplies?: string[];
}

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
  text: "Welcome to SNJB College of Engineering! I'm here to help you with any questions about admissions, courses, fees, placements, and more. What would you like to know?",
  quickReplies: QUICK_CATEGORIES,
};

const knowledgeBase: Record<string, BotResponse> = {
  about: {
    text: `**SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering** is located in Chandwad, Nashik. Established in 2004, it is part of the Jain Gurukul campus.\n\n- **Affiliation:** Savitribai Phule Pune University (SPPU)\n- **Accreditation:** NAAC 'A+' Grade, NBA Accredited (Civil, Computer, E&TC, Mechanical, MBA)\n- **Institute Code:** 5173\n- **Website:** [snjb.org/engineering](https://www.snjb.org/engineering/)\n\nThe Jain Gurukul campus has various faculties. SNJB's College of Engineering is approved by AICTE, New Delhi and the Government of Maharashtra. It was established with four branches: Mechanical, Computer, E&TC, and Civil Engineering.`,
    quickReplies: ["Courses Offered", "Admissions", "Contact Us"],
  },
  courses: {
    text: `We offer **Undergraduate (B.Tech)**, **Postgraduate (MBA, M.Tech)**, and **Ph.D.** programs.\n\n**B.Tech Branches:**\n- Artificial Intelligence & Data Science\n- Civil Engineering\n- Computer Engineering\n- Electronics & Telecommunication\n- Mechanical Engineering\n\n**PG Courses:**\n- MBA (General)\n- M.Tech (Computer Engineering, Mechanical Engineering)\n\n**Ph.D. Research Center:**\n- MBA, Computer Engineering, Mechanical Engineering`,
    quickReplies: ["Fees Structure", "Admissions", "Placements"],
  },
  admissions: {
    text: `**First Year B.E./B.Tech Eligibility:**\n1. Passed HSC (12th) with Physics & Maths as compulsory subjects along with Chemistry/Bio/Tech/Vocational\n2. Minimum Marks: 45% (General) or 40% (Reserved/PWD of Maharashtra)\n3. Valid Score: MHT-CET or JEE Main (current year)\n\n**MBA Eligibility:**\n1. Bachelor's degree in any discipline with minimum 50% marks (45% for Reserved)\n2. Valid Score in MAH-MBA-CET, CAT, CMAT, MAT, XAT, or ATMA\n\n**Lateral Entry (Direct 2nd Year):**\n- Diploma holders with at least 45% marks (40% for Reserved) are eligible`,
    quickReplies: ["Fees Structure", "Cutoffs", "Lateral Entry (DSE)"],
  },
  fees: {
    text: `**Fee Structure (2025-26, Approximate):**\n\n**B.Tech (First Year):**\n- Open/General: ~₹1,18,000/year\n- OBC/EBC: ~₹65,000 - ₹70,000/year\n- SC/ST/VJNT/SBC: ~₹10,000 - ₹20,000/year\n- TFWS: ~₹15,000 - ₹20,000/year\n- Girls (All Categories): 100% Tuition Fee waived\n\n**MBA:** ~₹86,000 - ₹88,000/year\n**M.Tech:** ~₹1,04,000/year\n**Direct Second Year:** ~₹1,07,000/year (Open)\n\n**Hostel Fees (Annual):**\n- Boys: ₹49,500 - ₹70,000 (Regular vs Deluxe)\n- Girls: ₹49,500 - ₹62,000\n\n*Fees subject to approval by Fees Regulating Authority (FRA)*`,
    quickReplies: ["Hostel & Facilities", "Admissions", "Contact Us"],
  },
  placements: {
    text: `**Placement Highlights:**\n- Overall Placement Rate: ~70-75%\n- Highest Package: **₹15.74 LPA**\n- Average Package: **₹3.5 - ₹4.5 LPA**\n- Median Salary: ~₹3.5 LPA\n\n**Branch-wise Performance:**\n| Branch | Status | Highest Package |\n|---|---|---|\n| Computer Engineering | Excellent (113+ placed) | ₹15.74 LPA |\n| AI & Data Science | Growing demand | ₹8.2 LPA |\n| E&TC | Consistent | ₹4.2 - ₹6.5 LPA |\n| Mechanical | Consistent | ~₹4.5 LPA |\n| Civil | Consistent | ₹3.6 LPA |\n\n**Top Recruiters:** TCS, Capgemini, Cognizant, Zensar, Hexaware, LTIMindtree, Wipro, Infosys, L&T, Bosch, Mahindra, Jio, D-Mart, ICICI Bank, Bajaj Finance`,
    quickReplies: ["Training & Support", "Courses Offered", "Cutoffs"],
  },
  cutoffs: {
    text: `**MHT-CET Cutoffs (Open/General, Approximate Percentiles):**\n\n| Branch | Open (GOPEN) | OBC | TFWS |\n|---|---|---|---|\n| Computer Engineering | 79-88 %tile | 76-80 %tile | 88-92 %tile |\n| AI & Data Science | 78-85 %tile | 75-79 %tile | 85-90 %tile |\n| E&TC Engineering | 73-76 %tile | 45-60 %tile | 75-80 %tile |\n| Mechanical | 55-68 %tile | 10-40 %tile | ~70 %tile |\n| Civil | 50-60 %tile | 10-30 %tile | ~76 %tile |\n\n**JEE Main Ranks (All India Quota):**\n- Computer: ~3,30,000 - 3,90,000\n- AI & DS: ~3,40,000 - 4,20,000\n- E&TC: ~4,50,000 - 4,80,000\n\n**Jain Minority Quota:** Requires a non-zero positive score in MHT-CET for most branches.\n\n*Cutoffs vary annually based on applicants and difficulty.*`,
    quickReplies: ["Admissions", "Fees Structure", "Contact Us"],
  },
  hostel: {
    text: `**Hostel Facilities at SNJB:**\n\n- **Boys Hostels:** 4 buildings (~810 capacity)\n- **Girls Hostels:** 2 buildings (~750 capacity)\n\n**Room Types & Fees (Annual, including mess):**\n- Boys Regular: ₹55,500 | Deluxe: ₹78,000\n- Girls Regular: ₹60,000 | Deluxe: ₹72,000\n- Sharing: 2, 4, or 5 students per room\n\n**Amenities:**\n- Bed, table, chair, wardrobe, Wi-Fi\n- RO purified water, solar water heaters\n- Indoor Gym, outdoor "Green Gym"\n- Sports: Table Tennis, Cricket, Volleyball, Basketball\n- Library/Reading Room, Guest Room, Amphitheatre\n- Medical OPD with visiting doctor\n\n**Food:** Pure Vegetarian Jain food (included in fees)\n**Curfew:** 8:00 PM | Biometric attendance daily\n**Policy:** Non-veg, alcohol & tobacco strictly prohibited`,
    quickReplies: ["Fees Structure", "About SNJB", "Contact Us"],
  },
  contact: {
    text: `**Contact Information:**\n\n**Address:** Neminagar, Chandwad - 423101, Dist. Nashik, Maharashtra\n\n**Phone:** +91 2556 253750, 8888491461, 8888491463\n**Email:** principalcoe@snjb.org\n\n**Admission Enquiry:**\n- Mr. Ingle U. P. (Admission Office): +91 88884 91461\n- Mr. Jadhav M. M. (Student Section): +91 88884 91463\n\n**Department Coordinators (First Year):**\n- Computer: Prof. Pankaj Desai - 97304 78001\n- AI & DS: Prof. M. V. Kumbharde - 90490 56922\n- Civil: Prof. Pradip Yeole - 92727 22476\n- E&TC: Prof. Y. S. Rathod - 97667 63988\n- Mechanical: Prof. Kiran B. Gore - 73504 58639\n\n**MBA:** Prof. Manoj Barkale - +91 98908 57863`,
    quickReplies: ["About SNJB", "Admissions", "Fees Structure"],
  },
  dse: {
    text: `**Direct Second Year (Lateral Entry) Admission:**\n\n**Eligibility:**\n- Diploma in Engineering/Technology with min 45% (40% for Reserved/EWS/PWD)\n- OR B.Sc. with 45% + HSC with Maths\n\n**Admission Process (CAP - State CET Cell):**\n1. Register online at mahacet.org under 'Direct Second Year Engineering'\n2. Upload & verify documents (E-Scrutiny/Physical)\n3. Check Provisional and Final Merit List\n4. Fill Option Form - **Institute Code: 5173**\n5. Accept allotted seat (Freeze/Betterment) and report to college\n\n**Fees (Open):** ~₹1,07,000/year\n**OBC/EBC:** ~₹60,000 - ₹65,000 | **SC/ST:** ~₹10,000 - ₹15,000\n\n**DSE Cutoffs (Diploma %):**\n| Branch | Open | Minority/Reserved |\n|---|---|---|\n| Computer | 82-88% | 60-75% |\n| AI & DS | 80-85% | 60-70% |\n| E&TC | 70-78% | 55-65% |\n| Mechanical | 60-70% | 50-60% |\n| Civil | 55-65% | 50-60% |\n\n**DSE Contacts:**\n- Comp/AI-DS: Prof. R. R. Bhandari - 94042 14914\n- Civil: Prof. Pradip Yeole - 92727 22476\n- E&TC: Prof. M. A. Mechkul - 94223 13640\n- Mechanical: Prof. Y. S. Kulkarni - 96652 75743`,
    quickReplies: ["Admissions", "Fees Structure", "Contact Us"],
  },
  training: {
    text: `**Training & Placement Support:**\n\nThe T&P Cell begins preparation from the **3rd Year**:\n\n**Pre-Placement Training:**\n- Aptitude Training: Rigorous sessions for screening tests\n- Soft Skills: Communication, personality development, professional etiquette\n- Technical Training: Coding (C, C++, Java, Python) & domain skills\n\n**Mock Drills & Practice:**\n- Mock Personal Interviews with industry experts\n- Group Discussion (GD) practice sessions\n- Online & offline aptitude tests\n\n**Internship Support:**\n- Summer/Winter internship assistance (often convert to PPOs)\n- Regular industrial visits for practical exposure\n\n**Industry-Institute Interaction:**\n- Expert talks & seminars on latest technologies\n- MoUs with companies bridging academic-industry gap\n\n**Career Counseling:**\n- One-on-one guidance by faculty & T&P officers\n- Help choosing: Job vs. Higher Studies vs. Entrepreneurship`,
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
