export const PHONE = '+91 98765 43210'

export const SLOTS = [
  { day: 'today', label: 'Today, 8 Oct', time: '9:00 am' },
  { day: 'today', label: 'Today, 8 Oct', time: '7:30 pm' },
  { day: 'tomorrow', label: 'Tomorrow, 9 Oct', time: '9:00 am' },
  { day: 'tomorrow', label: 'Tomorrow, 9 Oct', time: '7:30 pm' },
]

export const CHECK_STEPS = [
  'Reading the encumbrance certificate',
  'Comparing the patta with the seller',
  'Looking up why it has not sold',
  'Checking the listing against the papers',
]

export const PROPERTIES = [
  {
    id: 'anna-nagar',
    short: 'Anna Nagar 3BHK',
    flyerTitle: 'Anna Nagar West',
    kind: 'Flat',
    place: 'Anna Nagar West, Chennai',
    price: '₹1.72 Cr',
    areaDoc: '1,420 sq ft',
    areaAd: '1,550 sq ft',
    status: 'ready',
    source: 'WhatsApp, Chennai Flats Daily',
    postedBy: 'Karthik',
    original:
      'Anna, 3bhk Anna Nagar west, 1550 sft, 1.72cr, OC ready, call me.',
    summary:
      'The group post overstated the area. The flyer and the captions use 1,420 sq ft from the papers.',
    facts: [
      '1,420 sq ft on the patta and the sale deed',
      'Second floor, east facing',
      'Occupancy certificate received',
      'Covered car park',
    ],
    poster: [
      '3BHK, 1,420 sq ft',
      'Second floor, east facing',
      'Occupancy certificate received',
      'Covered car park',
    ],
    check: {
      ec: {
        tone: 'clear',
        title: 'Clear',
        detail: 'No mortgage and no court attachment on this flat.',
      },
      patta: {
        tone: 'clear',
        title: 'Matches the seller',
        detail:
          'The patta is in the name of R. Lakshmi, the seller named in the WhatsApp post.',
      },
      unsold: {
        tone: 'warn',
        title: 'Priced above the street',
        detail:
          'Three similar 3BHKs on this street closed between ₹1.48 Cr and ₹1.56 Cr this year. The ask is ₹1.72 Cr. Visitors also said the second bedroom has no window.',
      },
      description: {
        tone: 'warn',
        title: 'The size in the post is wrong',
        detail:
          'The WhatsApp line says 1,550 sq ft. The patta and the sale deed say 1,420 sq ft. Published copy uses 1,420.',
      },
    },
  },
  {
    id: 'oragadam',
    short: 'Oragadam plot',
    flyerTitle: 'Oragadam',
    kind: 'Plot',
    place: 'Oragadam, Chennai',
    price: '₹54.5 lakh',
    areaDoc: '1,800 sq ft',
    areaAd: '1,800 sq ft',
    status: 'hold',
    source: 'WhatsApp, DTCP Plots TN',
    postedBy: 'A number saved as Plot broker, Kanchi',
    original:
      'DTCP plot Oragadam 1800 sft 54.5L, main road, serious buyers WhatsApp me.',
    summary:
      'Do not post this. The mortgage is still open, and the patta name is not the person who wrote the message.',
    facts: [
      '1,800 sq ft in the group message',
      'DTCP approval was claimed, letter not in the file',
      'Mortgage from 2019, no release deed',
      'Patta name does not match the poster',
    ],
    check: {
      ec: {
        tone: 'bad',
        title: 'Mortgage still open',
        detail:
          'A mortgage to a cooperative bank, created in 2019, with no release deed.',
      },
      patta: {
        tone: 'bad',
        title: 'Patta name is not the poster',
        detail:
          'The patta is in the name of S. Murugan. The WhatsApp message is from a number saved as Plot broker, Kanchi.',
      },
      unsold: {
        tone: 'warn',
        title: 'Buyers stop after the certificate',
        detail:
          'Two buyers asked for the encumbrance certificate this month and went quiet after the mortgage line.',
      },
      description: {
        tone: 'warn',
        title: 'Approval letter is missing',
        detail:
          'The post says DTCP approved. The approval number was not in the message. Ask for the letter before any flyer goes out.',
      },
    },
  },
  {
    id: 'velachery',
    short: 'Velachery 2BHK',
    flyerTitle: 'Velachery',
    kind: 'Flat',
    place: 'Velachery, Chennai',
    price: '₹92 lakh',
    areaDoc: '980 sq ft',
    areaAd: '980 sq ft',
    status: 'ready',
    source: '99acres enquiry',
    postedBy: 'Seller P. Gomathi, via 99acres',
    original:
      '99acres lead. 2BHK, Velachery, 980 sq ft, ₹92 lakh. Tenant in the flat.',
    summary:
      'Papers match the listing. It is still available because the tenant leaves only on 30 November.',
    facts: [
      '980 sq ft, matches the sale deed',
      '2BHK, first floor',
      'Tenant vacates on 30 November',
      'Papers checked',
    ],
    poster: [
      '2BHK, 980 sq ft',
      'First floor',
      'Keys on 30 November',
      'Papers checked',
    ],
    check: {
      ec: {
        tone: 'clear',
        title: 'Clear',
        detail: 'No charge on this flat.',
      },
      patta: {
        tone: 'clear',
        title: 'Matches the seller',
        detail: 'The patta is in the name of P. Gomathi, the seller on the 99acres enquiry.',
      },
      unsold: {
        tone: 'warn',
        title: 'Possession is 30 November',
        detail:
          'Buyers who needed keys in October walked away. The price is in line. Two flats in this tower sold last quarter at ₹90 lakh and ₹95 lakh.',
      },
      description: {
        tone: 'clear',
        title: 'Listing matches the papers',
        detail: '980 sq ft on 99acres matches the sale deed. Nothing to correct.',
      },
    },
  },
  {
    id: 'ecr',
    short: 'ECR villa',
    flyerTitle: 'East Coast Road',
    kind: 'Villa',
    place: 'East Coast Road, Chennai',
    price: '₹4.8 Cr',
    areaDoc: '3 grounds, 18 ft road',
    areaAd: '3 grounds, 30 ft road',
    status: 'unchecked',
    source: 'BNI referral',
    postedBy: 'A member in the Tuesday chapter',
    original:
      'Referral note. Villa on ECR, 3 grounds, ₹4.8 Cr, 30 ft approach road, son is selling.',
    summary: 'No check has been run. Nothing should be printed or posted from the referral note alone.',
    facts: [
      '3 grounds in the referral note',
      'Ask is ₹4.8 Cr',
      'East Coast Road',
      'Note claims a 30 ft approach road',
    ],
    afterFacts: [
      '3 grounds',
      'Approach road is 18 ft on the map',
      'Patta is still in the name of the late owner',
      'No legal-heir certificate in the file',
    ],
    check: null,
  },
  {
    id: 'porur',
    short: 'Porur 2BHK',
    flyerTitle: 'Porur',
    kind: 'Flat',
    place: 'Porur, Chennai',
    price: 'Price not given',
    areaDoc: '1,050 sq ft claimed',
    areaAd: '1,050 sq ft',
    status: 'thin',
    source: 'WhatsApp, OMR Buyers',
    postedBy: 'Unknown number in the group',
    original: 'Porur 2bhk 1050 sft near junction, call for price, urgent sale.',
    summary:
      'The message has no price and no occupancy certificate. A question goes back to the poster. No flyer.',
    facts: [],
    question:
      'On the Porur 2BHK you posted, please send three things before I share it.\n\nThe expected price.\nWhether the occupancy certificate is received.\nThe flat number.\n\nI will not make a flyer from the group message alone.',
    check: null,
  },
]

export const ECR_CHECK = {
  ec: {
    tone: 'clear',
    title: 'Clear',
    detail: 'No mortgage and no court attachment.',
  },
  patta: {
    tone: 'bad',
    title: 'Still in the late owner\'s name',
    detail:
      'The patta is still in the name of the late K. Srinivasan. The seller is his son, K. Aravind. There is no legal-heir certificate in the file.',
  },
  unsold: {
    tone: 'warn',
    title: 'Visits are not converting',
    detail:
      'Buyers who came in September did not offer. The referral note says a 30 ft approach road. The village map shows 18 ft.',
  },
  description: {
    tone: 'bad',
    title: 'Road width in the note is wrong',
    detail:
      'Any note you share should say 18 ft. Do not repeat 30 ft. Hold the flyer until the heir certificate is in the file.',
  },
}

const ANNA = {
  WhatsApp: {
    reel: '',
    text: 'Anna Nagar West, 3BHK\n1,420 sq ft on the papers. Second floor. East facing.\n₹1.72 Cr. Occupancy certificate received.\n\nThe earlier forward said 1,550 sq ft. That was wrong. Papers are checked.\n\nReply if you want the deed extract.',
  },
  Instagram: {
    reel: 'Say the size from the deed, 1,420 sq ft, not the number in the forward.',
    text: 'The forward said 1,550 sq ft. The papers say 1,420.\n\nAnna Nagar West, 3BHK, second floor, ₹1.72 Cr.\n\nEncumbrance certificate is clear. Patta is in the seller\'s name. The ask is higher than three sales on this street this year.\n\nComment ANNA and I will send the plan.',
  },
  Facebook: {
    reel: '',
    text: 'A 3BHK in Anna Nagar West is available at ₹1.72 Cr.\n\nIt is 1,420 sq ft on the patta, second floor, east facing, with a covered car park. The occupancy certificate is received.\n\nPlease use 1,420 sq ft if you pass this on. An earlier message said 1,550, and that figure is not on the deed.\n\nMessage me for the paper summary.',
  },
  LinkedIn: {
    reel: '',
    text: 'A note on an Anna Nagar West 3BHK before I share it further.\n\nThe asking price is ₹1.72 Cr for 1,420 sq ft. Three comparable sales on the same street this year closed between ₹1.48 Cr and ₹1.56 Cr.\n\nThe encumbrance certificate is clear and the patta matches the seller. The advertisement that reached me overstated the area by 130 sq ft, so the version I publish uses the deed.\n\nHappy to share the paper summary with anyone looking in Anna Nagar.',
  },
}

const VEL = {
  WhatsApp: {
    reel: '',
    text: 'Velachery 2BHK\n980 sq ft. ₹92 lakh.\nTenant vacates on 30 November.\nEncumbrance certificate and patta checked.\n\nReply YES for the floor plan.',
  },
  Instagram: {
    reel: 'Open on the date the tenant leaves, 30 November.',
    text: 'Possession on 30 November, not before.\n\nVelachery 2BHK, 980 sq ft, ₹92 lakh.\n\nSame tower sold at ₹90 lakh and ₹95 lakh last quarter. Papers are in the seller\'s name.\n\nComment VEL for the floor plan.',
  },
  Facebook: {
    reel: '',
    text: '2BHK in Velachery, 980 sq ft, at ₹92 lakh.\n\nThe tenant leaves on 30 November. If you need keys in October, this is not the flat.\n\nThe encumbrance certificate is clear and the patta is in the seller\'s name. Two flats in this tower sold last quarter at ₹90 lakh and ₹95 lakh.\n\nMessage me for the floor plan.',
  },
  LinkedIn: {
    reel: '',
    text: 'Velachery, a 2BHK at ₹92 lakh, 980 sq ft.\n\nIt has sat on the market because the tenant vacates only on 30 November. Buyers who needed immediate possession moved on. The price matches the tower. Two sales last quarter were ₹90 lakh and ₹95 lakh.\n\nDocuments checked. Floor plan on request.',
  },
}

const ORAGADAM = {
  WhatsApp: {
    reel: '',
    text: 'Do not send.\n\nOragadam, 1,800 sq ft, asked at ₹54.5 lakh.\nA 2019 mortgage is still on the encumbrance certificate.\nThe patta name does not match the person posting.',
  },
  Instagram: {
    reel: 'Do not cut a reel for this plot.',
    text: 'Holding this one.\n\nOragadam plot, 1,800 sq ft, ₹54.5 lakh in the group post.\n\nI am not publishing it. The encumbrance certificate still shows a 2019 mortgage, and the patta is not in the poster\'s name.',
  },
  Facebook: {
    reel: '',
    text: 'I was sent an Oragadam plot at ₹54.5 lakh for 1,800 sq ft.\n\nI am not sharing the location or a phone number. The mortgage from 2019 has no release, and the patta name does not match the seller in the WhatsApp post.\n\nI will post it only if those two are fixed.',
  },
  LinkedIn: {
    reel: '',
    text: 'A caution from today\'s group messages.\n\nAn Oragadam plot is being forwarded at ₹54.5 lakh. The encumbrance certificate still records a 2019 mortgage, and the patta holder is not the person posting.\n\nI will not put it on this page. If you were sent the same forward, ask for the release deed before you visit.',
  },
}

export const ECR_VERSIONS = {
  WhatsApp: {
    reel: '',
    text: 'Do not send yet.\n\nECR villa, 3 grounds, asked at ₹4.8 Cr.\nPatta is in the late owner\'s name. No legal-heir certificate on file.\nApproach road is 18 ft on the village map, not 30 ft as the note claims.',
  },
  Instagram: {
    reel: 'Do not cut a reel until the heir certificate is in.',
    text: 'Not posting this villa.\n\nThe referral says 3 grounds on East Coast Road at ₹4.8 Cr, with a 30 ft road.\n\nThe map shows 18 ft. The patta is still in the late owner\'s name.',
  },
  Facebook: {
    reel: '',
    text: 'I am holding an ECR villa that was referred at ₹4.8 Cr.\n\nI will not publish the location. The patta is in the father\'s name and the legal-heir certificate is missing. The approach road is 18 ft, not the 30 ft in the note.',
  },
  LinkedIn: {
    reel: '',
    text: 'Holding a referral on East Coast Road.\n\nThe ask is ₹4.8 Cr for 3 grounds. I am not publishing it. The patta has not moved out of the late owner\'s name, and the approach road on the village map is 18 ft against 30 ft in the note.\n\nI will share it when the heir certificate is in the file, with the road width corrected.',
  },
}

export const VERSIONS = {
  'anna-nagar': ANNA,
  velachery: VEL,
  oragadam: ORAGADAM,
}

export const PLATFORM_NOTE = {
  WhatsApp: 'Short enough to forward in a group.',
  Instagram: 'Caption under the reel. He still cuts the video.',
  Facebook: 'A plain post for the page.',
  LinkedIn: 'A market note, not a classified ad.',
}

export const PLATFORMS = ['WhatsApp', 'Instagram', 'Facebook', 'LinkedIn']

export const INITIAL_PLAN = [
  {
    id: 'slot-morning',
    day: 'today',
    time: '9:00 am',
    propertyId: 'velachery',
    platform: 'Instagram',
    status: 'posted',
  },
  {
    id: 'slot-evening',
    day: 'today',
    time: '7:30 pm',
    propertyId: 'anna-nagar',
    platform: 'LinkedIn',
    status: 'draft',
  },
]

export const INITIAL_LOG = [
  { time: '4:10 pm', text: 'Drafted the Anna Nagar post for LinkedIn at 7:30 pm. The flyer is attached. It waits for approval.' },
  { time: '3:05 pm', text: 'Ravi wrote on Facebook after the Velachery post. He wants the keys in October.' },
  { time: '11:40 am', text: 'Divya enquired on 99acres for the same Velachery flat.' },
  { time: '11:20 am', text: 'Meena from BNI is on day 6. No reply has gone out since Tuesday.' },
  { time: '9:40 am', text: 'Anitha wrote on Instagram after the 9:00 am post.' },
  { time: '9:00 am', text: 'Posted the Velachery flat on Instagram, with the flyer. Caption says possession is 30 November.' },
  { time: '8:40 am', text: 'Checked the Oragadam plot. Mortgage still open. Held it.' },
  { time: '7:12 am', text: 'Read 6 groups, 42 messages. Kept 3 properties. Left 1 auction for you.' },
]

export const GROUPS = [
  'Chennai Flats Daily',
  'DTCP Plots TN',
  'Anna Nagar Owners',
  'OMR Buyers',
  'BNI Property Exchange',
  'Chennai Real Estate',
]

export const FEED = [
  {
    id: 'm1',
    group: 'Chennai Flats Daily',
    time: '7:02 am',
    text: 'Anna, 3bhk Anna Nagar west, 1550 sft, 1.72cr, OC ready, call me.',
    keep: 'anna-nagar',
  },
  {
    id: 'm2',
    group: 'Chennai Flats Daily',
    time: '7:06 am',
    text: 'Good morning to all dear friends. Have a blessed day.',
    reason: 'Greeting',
  },
  {
    id: 'm3',
    group: 'OMR Buyers',
    time: '7:11 am',
    text: 'Home loan 8.35 percent, pre-approved, DM me for the link.',
    reason: 'Loan ad',
  },
  {
    id: 'm4',
    group: 'DTCP Plots TN',
    time: '7:18 am',
    text: 'DTCP plot Oragadam 1800 sft 54.5L, main road, serious buyers WhatsApp me.',
    keep: 'oragadam',
  },
  {
    id: 'm5',
    group: 'Anna Nagar Owners',
    time: '7:24 am',
    text: 'HBD Ravi anna. Many more happy returns.',
    reason: 'Not a property',
  },
  {
    id: 'm6',
    group: 'Chennai Real Estate',
    time: '7:31 am',
    text: 'Modular kitchen and interior work, 15 years, call for site visit.',
    reason: 'Not a property',
  },
  {
    id: 'm7',
    group: 'DTCP Plots TN',
    time: '7:44 am',
    text: 'Madurai plot 1200 sft, 18 lakh, near ring road. Serious only.',
    reason: 'Outside Chennai',
  },
  {
    id: 'm8',
    group: 'OMR Buyers',
    time: '8:05 am',
    text: 'Porur 2bhk 1050 sft near junction, call for price, urgent sale.',
    keep: 'porur',
  },
  {
    id: 'm9',
    group: 'Chennai Real Estate',
    time: '8:16 am',
    text: 'Bank auction notice. Industrial shed at Ambattur, next week.',
    leave: true,
    reason: 'Auction, left for you',
  },
  {
    id: 'm10',
    group: 'Anna Nagar Owners',
    time: '8:22 am',
    text: 'Fwd again: Anna Nagar 3bhk 1550 sft 1.72cr OC ready.',
    reason: 'Repeat of the Anna Nagar flat',
  },
  {
    id: 'm11',
    group: 'BNI Property Exchange',
    time: '8:40 am',
    text: 'Visitors welcome at Tuesday chapter. Be there by 7 am.',
    reason: 'Chapter notice',
  },
  {
    id: 'm12',
    group: 'Chennai Flats Daily',
    time: '8:51 am',
    text: 'Forwarded quote about success. No property in it.',
    reason: 'Forward',
  },
]

export const LEADS = [
  {
    id: 'meena',
    name: 'Meena Krishnan',
    source: 'BNI, Chennai Central',
    age: 'Asked on Tuesday. Day 6.',
    about: 'Anna Nagar West 3BHK',
    propertyId: 'anna-nagar',
    status: 'overdue',
    origin: 'BNI, Tuesday chapter. No follow-up since the introduction.',
    note: 'The introduction went out on Tuesday. Nothing since. Newer enquiries were answered ahead of her.',
    draft:
      'Meena, this is Shivakumar.\n\nYou asked on Tuesday about the Anna Nagar West 3BHK. It is still available.\n\nThe papers are clean. The WhatsApp post said 1,550 sq ft. The patta and the sale deed say 1,420 sq ft. The ask is ₹1.72 Cr, above three recent sales on that street.\n\nI can walk you through a fair number tomorrow. What time suits you?',
  },
  {
    id: 'joseph',
    name: 'Joseph',
    source: 'BNI, Chennai Central',
    age: 'Asked on Saturday. Day 4.',
    about: 'A plot under ₹60 lakh',
    propertyId: 'oragadam',
    status: 'hold',
    origin: 'BNI, Saturday. The only plot in his budget is on hold.',
    note: 'Oragadam was the match. It is on hold, so the message explains the hold instead of sending a brochure.',
    draft:
      'Joseph, the Oragadam plot I was going to send is on hold.\n\nThe encumbrance certificate still shows a 2019 mortgage, and the patta is not in the name of the person who posted it. I will not share the plot until that is cleared.\n\nIf you still want a plot under ₹60 lakh, I will send the next one only after the papers are clean.',
  },
  {
    id: 'divya',
    name: 'Divya',
    source: '99acres',
    age: 'Today, 11:40 am',
    about: 'Velachery 2BHK',
    propertyId: 'velachery',
    status: 'new',
    fromPost: true,
    origin: '99acres this morning. The Instagram post went out on this flat to bring in more buyers.',
    note: 'She enquired on 99acres this morning. No reply yet.',
    draft:
      'Divya, thank you for the 99acres enquiry on the Velachery 2BHK.\n\nIt is 980 sq ft at ₹92 lakh. The tenant vacates on 30 November. The encumbrance certificate and the patta are in the seller\'s name.\n\nDo you need to move in this month, or is December all right?',
  },
  {
    id: 'anitha',
    name: 'Anitha',
    source: 'Instagram',
    age: 'Yesterday, 8:12 pm',
    about: 'Under ₹1 Cr in Velachery',
    propertyId: 'velachery',
    status: 'new',
    fromPost: true,
    threadId: 'anitha',
    origin: 'Wrote after the 9:00 am Instagram post.',
    note: 'She wrote on Instagram. The same reply sits in Messages.',
    draft:
      'Anitha, yes. There is a 2BHK in Velachery at ₹92 lakh, 980 sq ft.\n\nThe tenant vacates on 30 November, so it is not a this-month move-in.\n\nIf December works, I can send the floor plan and the paper summary.',
  },
  {
    id: 'ravi',
    name: 'Ravi',
    source: 'Facebook',
    age: 'Today, 3:05 pm',
    about: 'Velachery 2BHK, wants October keys',
    propertyId: 'velachery',
    status: 'new',
    fromPost: true,
    threadId: 'ravi',
    origin: 'Wrote on Facebook after the Velachery post.',
    note: 'He needs the keys in October. This flat cannot do that. The reply says so, and keeps him if December works.',
    draft:
      'Ravi, the ask is ₹92 lakh, in line with two recent sales in the same tower.\n\nPossession is 30 November, when the tenant leaves. October is not possible on this flat.\n\nIf you can wait until December, we can talk about the price on a site visit.',
  },
  {
    id: 'suresh',
    name: 'Suresh',
    source: 'Flat campaign',
    age: 'Site visit Saturday, 11 Oct, 11 am',
    about: 'Velachery 2BHK',
    propertyId: 'velachery',
    status: 'talking',
    origin: 'Flat campaign. Site visit is booked for Saturday, 11 am.',
    note: 'He already has the floor plan. Saturday visit is booked. Nothing to chase today.',
    draft: '',
  },
]

export const LEAD_RANK = { overdue: 0, hold: 1, new: 2, talking: 3, sent: 4 }

export const LEAD_LABEL = {
  overdue: 'Overdue',
  new: 'New',
  hold: 'On hold',
  talking: 'In conversation',
  sent: 'Follow-up sent',
}

export const THREADS = [
  {
    id: 'anitha',
    channel: 'Instagram',
    name: 'Anitha',
    when: 'Yesterday, 8:12 pm',
    unread: true,
    leadId: 'anitha',
    messages: [
      {
        from: 'them',
        text: 'Hi, do you have anything under 1 crore in Velachery? I need to move this month.',
      },
    ],
    suggestion:
      'Anitha, yes. There is a 2BHK in Velachery at ₹92 lakh, 980 sq ft.\n\nThe tenant vacates on 30 November, so it is not a this-month move-in.\n\nIf December works, I can send the floor plan and the paper summary.',
  },
  {
    id: 'ravi',
    channel: 'Facebook',
    name: 'Ravi',
    when: 'Today, 3:05 pm',
    unread: true,
    leadId: 'ravi',
    messages: [
      {
        from: 'them',
        text: 'Saw something about Velachery. Is the price negotiable? I need the keys in October.',
      },
    ],
    suggestion:
      'Ravi, the ask is ₹92 lakh, in line with two recent sales in the same tower.\n\nPossession is 30 November, when the tenant leaves. October is not possible on this flat.\n\nIf you can wait until December, we can talk about the price on a site visit.',
  },
  {
    id: 'karthik',
    channel: 'WhatsApp',
    name: 'Karthik',
    when: 'Today, 1:48 pm',
    unread: false,
    leadId: null,
    messages: [
      { from: 'them', text: 'Anna Nagar flat, any calls yet?' },
    ],
    suggestion:
      'Karthik, not yet. I corrected the size to 1,420 sq ft before sharing it.\n\nThe evening LinkedIn post is waiting for approval. I will tell you when a serious buyer comes in.',
  },
  {
    id: 'linkedin-nisha',
    channel: 'LinkedIn',
    name: 'Nisha Raman',
    when: 'Today, 10:20 am',
    unread: false,
    leadId: null,
    messages: [
      {
        from: 'them',
        text: 'Do you have a clean plot under 60 lakh near the Oragadam belt this month?',
      },
    ],
    suggestion:
      'Nisha, not a clean one today.\n\nA plot at ₹54.5 lakh is going around in the groups, and I am holding it. The mortgage from 2019 is still on the certificate.\n\nI will write to you when the next one has a clear encumbrance certificate and a matching patta.',
  },
]

export const STATUS_WORD = {
  ready: 'Ready to post',
  hold: 'Hold',
  unchecked: 'Not checked',
  thin: 'Missing facts',
}

export function propertyById(id) {
  return PROPERTIES.find((property) => property.id === id)
}

export function modeFor(property, checked) {
  if (!property) return 'blocked'
  if (property.status === 'thin') return 'blocked'
  if (property.id === 'ecr') return checked.ecr ? 'held' : 'blocked'
  if (property.status === 'hold') return 'held'
  if (property.status === 'ready') return 'ready'
  return 'blocked'
}

export function blockReason(property, checked) {
  if (!property) return ''
  if (property.status === 'thin') return 'No price and no occupancy certificate in the group message.'
  if (property.id === 'ecr' && !checked.ecr) return 'Run the background check before a flyer or a post is made.'
  if (property.id === 'ecr' && checked.ecr) return 'Heir certificate is missing, and the road width in the note is wrong.'
  if (property.status === 'hold') return 'Mortgage still open, and the patta name does not match the poster.'
  return ''
}
