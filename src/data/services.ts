export type FAQ = { q: string; a: string };
export type Service = {
  slug: string; title: string; short: string; group: 'driver' | 'security' | 'hospitality';
  icon: string; image: string; alt: string; position?: string; description: string;
  heading: string; accent: string; intro: string; detail: string;
  uses: { title: string; text: string }[]; brief: string[]; faqs: FAQ[]; theme: string;
};
export const services: Service[] = [
  {
    slug: 'driver-services', title: 'Professional Driver Services', short: 'Driver Services', group: 'driver', icon: 'wheel', image: 'driver', alt: 'Professional driver in a dark suit driving a car through the city in daylight', position: '62% 45%',
    description: 'Experienced drivers for your everyday journeys and personal requirements.',
    heading: 'Every journey deserves', accent: 'a professional.',
    intro: 'Professional driver services for your everyday and executive needs across Delhi NCR.',
    detail: 'From a day of appointments to a recurring office commute, the right driver makes a difference. JSS Elite Group India provides driver personnel for individuals, families and organisations. Tell us about your vehicle, schedule and journey, and we will discuss the appropriate arrangement.',
    uses: [{ title: 'Personal & family journeys', text: 'Driver requirements for daily travel, appointments and family schedules.' }, { title: 'Executive & corporate travel', text: 'Professional driver support for workdays, meetings and business travel.' }, { title: 'A schedule that suits you', text: 'Discuss hourly, monthly or outstation arrangements for your requirement.' }],
    brief: ['Your vehicle and transmission type', 'Pickup location and intended journey', 'Date, reporting time and duration', 'Any specific driving requirements'],
    faqs: [{ q: 'Can I enquire for my own car?', a: 'Yes. Tell us your vehicle type, transmission and intended journey so the team can discuss a suitable driver.' }, { q: 'Can I arrange a recurring driver?', a: 'You can enquire about monthly and recurring driver requirements. Share your usual schedule and location; availability and terms are confirmed directly.' }], theme: 'driver',
  },
  {
    slug: 'chauffeur-services', title: 'Chauffeur Services', short: 'Chauffeur Services', group: 'driver', icon: 'cap', image: 'chauffeur', alt: 'Chauffeur in a peaked cap with white-gloved hands on the steering wheel, seen from the rear passenger seat', position: '35% 50%',
    description: 'Thoughtful chauffeur personnel for executive travel and special occasions.',
    heading: 'A refined arrival.', accent: 'A considered service.',
    intro: 'Professional chauffeur services for business, personal travel and special occasions.',
    detail: 'A chauffeur service is about the person behind the wheel: presentation, communication and attention to the journey. Discuss your executive travel, hospitality arrival or special occasion with JSS Elite Group India. Our offering is chauffeur personnel, with vehicle requirements discussed separately.',
    uses: [{ title: 'Executive travel', text: 'Chauffeur requirements for business meetings, corporate visits and executive schedules.' }, { title: 'Special occasions', text: 'Professional driving personnel for celebrations, important arrivals and personal events.' }, { title: 'Hospitality arrivals', text: 'Chauffeur support for your planned hotel or venue arrival.' }],
    brief: ['Vehicle and passenger requirements', 'Itinerary and arrival times', 'Reporting location and duration', 'Presentation or occasion-specific needs'],
    faqs: [{ q: 'Does the service include a luxury car?', a: 'The service is for chauffeur personnel. Please discuss your vehicle arrangements with our team; no particular vehicle or brand is included or promised.' }, { q: 'Can I enquire for a corporate event?', a: 'Yes. Share your itinerary, date, location and chauffeur requirements. Our team will discuss availability and arrangements.' }], theme: 'chauffeur',
  },
  {
    slug: 'valet-parking', title: 'Valet Parking Services', short: 'Valet Parking', group: 'hospitality', icon: 'parking', image: 'valet', alt: 'Valet attendant receiving car keys from a guest at an illuminated hotel entrance in the evening', position: '35% 50%',
    description: 'Valet personnel for hospitality venues, private functions and events.',
    heading: 'A warm welcome.', accent: 'From the first arrival.',
    intro: 'Professional valet parking personnel for events, hospitality and corporate venues.',
    detail: 'The guest experience begins at the entrance. JSS Elite Group India provides valet personnel services for hospitality and event requirements. Share your venue layout, arrival schedule and expected vehicle volume so the team can discuss the staffing scope and arrangements.',
    uses: [{ title: 'Hospitality venues', text: 'Personnel enquiries for guest arrivals at hotels and hospitality spaces.' }, { title: 'Private functions', text: 'Valet staffing requirements for celebrations and special occasions.' }, { title: 'Corporate events', text: 'Arrival and parking personnel requirements for business functions.' }],
    brief: ['Venue location and parking access', 'Event date and arrival window', 'Expected guest and vehicle volume', 'Required personnel and duties'],
    faqs: [{ q: 'What should I share for a valet enquiry?', a: 'Provide the venue, event date, expected vehicle volume, parking layout and service hours. These details help our team discuss your staffing requirements.' }, { q: 'Are parking equipment or insurance included?', a: 'Please discuss all operational requirements, responsibilities and terms with our team before confirming. Equipment or insurance is not automatically included.' }], theme: 'valet',
  },
  {
    slug: 'pso-security-services', title: 'PSO (Personal Security Officer)', short: 'PSO Services', group: 'security', icon: 'person', image: 'pso', alt: 'Personal security officer in a dark suit and earpiece standing alert beside a black SUV', position: '50% 30%',
    description: 'Personal security officer enquiries for individuals and executive requirements.',
    heading: 'Personal security.', accent: 'A professional approach.',
    intro: 'PSO and personal security personnel services for your individual or corporate requirements.',
    detail: 'Security requirements deserve a careful conversation. Discuss your need for a Personal Security Officer, personal security support or corporate security personnel with JSS Elite Group India. The location, scope, duration and responsibilities are agreed directly with our team.',
    uses: [{ title: 'Personal security', text: 'Discuss personnel requirements for your individual schedule and location.' }, { title: 'Executive requirements', text: 'PSO staffing enquiries for corporate and business-related requirements.' }, { title: 'Event attendance', text: 'Discuss personal security personnel needs around a planned function or appearance.' }],
    brief: ['Service location and intended scope', 'Dates, schedule and duration', 'Number of personnel required', 'Responsibilities to discuss with the team'],
    faqs: [{ q: 'How do I discuss a PSO requirement?', a: 'Call our team with the location, duration and broad service scope. Detailed requirements can then be discussed directly.' }, { q: 'Can you guarantee a particular security outcome?', a: 'Service scope, suitability and responsibilities must be discussed before confirmation. No service can promise the elimination of all risks.' }], theme: 'security',
  },
  {
    slug: 'bouncer-event-security', title: 'Bouncer Services', short: 'Bouncer Services', group: 'security', icon: 'people', image: 'bouncer', alt: 'Event security personnel in black standing at the entrance of a decorated evening venue', position: '25% 35%',
    description: 'Professionally presented personnel for private and corporate events.',
    heading: 'Your event.', accent: 'Professionally supported.',
    intro: 'Bouncer and event security personnel for private functions, corporate occasions and venues.',
    detail: 'A well-planned event starts with clearly defined roles. Enquire about bouncer personnel and event security requirements with JSS Elite Group India. Share the nature of your event, guest numbers, venue and timings, then discuss suitable staffing and the exact responsibilities with our team.',
    uses: [{ title: 'Private functions', text: 'Personnel requirements for celebrations and invitation-based gatherings.' }, { title: 'Corporate occasions', text: 'Security staffing enquiries for business functions and corporate events.' }, { title: 'Venue requirements', text: 'Discuss entry-related duties and service responsibilities for your venue.' }],
    brief: ['Venue and type of event', 'Event date, timings and duration', 'Expected attendance', 'Personnel roles and entry requirements'],
    faqs: [{ q: 'Can I enquire for a private event?', a: 'Yes. Share the venue, date, guest numbers and intended duties. The team will discuss personnel availability and the scope of support.' }, { q: 'How many personnel will I need?', a: 'This depends on your event and venue. Discuss the layout, attendance, timings and responsibilities with our team before deciding on staffing.' }], theme: 'event',
  },
  {
    slug: 'security-services', title: 'Security Services', short: 'Security Services', group: 'security', icon: 'shield', image: 'security', alt: 'Uniformed security officer standing at the glass entrance of a modern corporate building', position: '35% 40%',
    description: 'Security personnel for personal, corporate and event requirements.',
    heading: 'People you can speak to.', accent: 'Support you can plan.',
    intro: 'Professional security personnel services across Delhi NCR & Other Locations.',
    detail: 'Every setting has different security staffing needs. JSS Elite Group India offers security personnel enquiries for personal, corporate and event requirements. Tell us about the location and intended responsibilities so that scope, availability and terms can be discussed clearly.',
    uses: [{ title: 'Personal security', text: 'Personnel enquiries for individual requirements; explore our PSO services for more detail.' }, { title: 'Corporate security', text: 'Discuss security personnel requirements for workplace and corporate settings.' }, { title: 'Event security', text: 'Security staffing enquiries for private functions and business events.' }],
    brief: ['Site location and setting', 'Duties and service scope', 'Required schedule and duration', 'Personnel numbers and reporting arrangements'],
    faqs: [{ q: 'Do you handle corporate security enquiries?', a: 'Yes. Share your location, intended duties, schedule and personnel requirements so our team can discuss the appropriate service arrangement.' }, { q: 'Can I ask about personnel credentials?', a: 'Please discuss any required credentials, documentation or qualifications directly with the team before confirming a service.' }], theme: 'security',
  },
  {
    slug: 'monthly-driver', title: 'Monthly Driver', short: 'Monthly Driver', group: 'driver', icon: 'calendar', image: 'monthly', alt: 'Driver in a dark suit waiting beside a car in a leafy residential driveway', position: '40% 50%',
    description: 'Ongoing driver requirements for individuals, families and organisations.',
    heading: 'Your everyday routine.', accent: 'In capable hands.',
    intro: 'Monthly and full-time driver enquiries for consistent, recurring travel requirements.',
    detail: 'A regular schedule calls for a considered arrangement. Whether your requirement is a family driver or recurring corporate travel, share your daily timings and vehicle details. Our team will discuss monthly driver availability, duties and terms for your location.',
    uses: [{ title: 'Daily commute', text: 'Recurring driver requirements for your usual workday travel.' }, { title: 'Family routines', text: 'Driver enquiries around appointments, errands and household schedules.' }, { title: 'Organisation support', text: 'Ongoing driver personnel requirements for business schedules.' }],
    brief: ['Usual reporting location', 'Working days and daily timings', 'Vehicle and typical journeys', 'Expected duties and monthly arrangement'],
    faqs: [{ q: 'What does a monthly arrangement cover?', a: 'Hours, working days, duties, leave and charges are discussed directly with our team. Share your usual schedule to clarify the arrangement.' }, { q: 'Are monthly prices published?', a: 'Requirements vary by schedule, location and duties. Contact the team for a quote based on your needs.' }], theme: 'monthly',
  },
  {
    slug: 'outstation-driver', title: 'Outstation Driver', short: 'Outstation Driver', group: 'driver', icon: 'route', image: 'outstation', alt: 'Black sedan travelling on an open expressway at sunrise', position: '35% 60%',
    description: 'Professional driver support for travel beyond the local area.',
    heading: 'Beyond the everyday.', accent: 'Plan the journey well.',
    intro: 'Outstation driver enquiries for your planned trips outside the local area.',
    detail: 'Longer journeys need clear plans. Share your departure point, destinations, travel dates and vehicle details with JSS Elite Group India. The team will discuss driver availability and the arrangements for the complete itinerary, including multi-day requirements where applicable.',
    uses: [{ title: 'Personal trips', text: 'Enquire about professional driver support for planned travel outside the local area.' }, { title: 'Business journeys', text: 'Driver requirements for work-related trips and multi-location itineraries.' }, { title: 'Multi-day plans', text: 'Discuss the schedule, rest arrangements and responsibilities for longer travel.' }],
    brief: ['Departure location and destinations', 'Departure and return dates', 'Vehicle and travel itinerary', 'Rest, stay and expense arrangements'],
    faqs: [{ q: 'Can I request a multi-day outstation driver?', a: 'Share the full itinerary and dates. Our team will confirm availability and discuss the arrangements before you proceed.' }, { q: 'How are travel expenses handled?', a: 'Driver charges, allowances, accommodation, rest and other arrangements should be agreed directly before confirming the trip.' }], theme: 'outstation',
  },
  {
    slug: 'hourly-driver', title: 'Hourly Basis Driver', short: 'Hourly Driver', group: 'driver', icon: 'clock', image: 'hourly', alt: 'Driver checking his wristwatch with a hand on the steering wheel', position: '60% 50%',
    description: 'Time-based driver requirements for appointments and planned outings.',
    heading: 'The time you need.', accent: 'The support that fits.',
    intro: 'Hourly driver enquiries for appointments, errands, meetings and personal outings.',
    detail: 'Sometimes you need a driver for part of the day. Discuss your time-based requirement with JSS Elite Group India, from a series of appointments to a planned personal outing. Share the pickup point, estimated duration and journey so the team can explain the available arrangement.',
    uses: [{ title: 'Appointments & errands', text: 'Driver enquiries for a planned sequence of stops during the day.' }, { title: 'Meetings & visits', text: 'Time-based professional driver requirements for your business schedule.' }, { title: 'Personal outings', text: 'Discuss driving support for your planned outing and return journey.' }],
    brief: ['Date and starting time', 'Pickup location and planned stops', 'Estimated duration', 'Vehicle details and return requirements'],
    faqs: [{ q: 'Is there a minimum duration?', a: 'Contact our team to confirm the applicable duration and terms for your request. No fixed minimum is published on this website.' }, { q: 'What if my journey takes longer?', a: 'Discuss how additional time is handled when confirming your service, including any applicable charges and availability.' }], theme: 'hourly',
  },
  {
    slug: 'corporate-personal-drivers', title: 'Corporate & Personal Driver Services', short: 'Corporate & Personal Drivers', group: 'driver', icon: 'briefcase', image: 'corporate', alt: 'Chauffeur holding the rear door as a business executive steps out of a black sedan at an office tower', position: '40% 45%',
    description: 'Professional driver enquiries for business and personal schedules.',
    heading: 'For your workday.', accent: 'For your everyday.',
    intro: 'Corporate and personal driver personnel for executive, individual and family requirements.',
    detail: 'Your work and personal schedules deserve the right support. Share your executive travel, organisation-level driver need or personal driving requirement with JSS Elite Group India. We will discuss the location, schedule and service options for your enquiry.',
    uses: [{ title: 'Corporate drivers', text: 'Personnel requirements for executive travel, workplace schedules and business visits.' }, { title: 'Personal drivers', text: 'Driver enquiries for individual journeys, family plans and everyday travel.' }, { title: 'Recurring schedules', text: 'Discuss ongoing arrangements around regular corporate or personal needs.' }],
    brief: ['Corporate or personal requirement', 'Reporting location and schedule', 'Vehicle and intended duties', 'Duration and frequency of service'],
    faqs: [{ q: 'Can a company enquire about multiple drivers?', a: 'Share the number of drivers, locations, schedules and intended duties. Our team will discuss availability and service terms directly.' }, { q: 'Can I request a driver for family requirements?', a: 'Yes. Share your vehicle, usual journeys and schedule to discuss a personal or recurring driver arrangement.' }], theme: 'corporate',
  },
];
export const featuredServices = [services[0], services[1], services[2], services[3], services[4], services[5]];
export const servicePath = (service: Service) => `/${service.slug}/`;

export type ServiceGroupKey = Service['group'];
export const groupLabels: Record<ServiceGroupKey, string> = { driver: 'Drivers & Chauffeurs', security: 'PSO & Security', hospitality: 'Valet & Hospitality' };
export const servicesInGroup = (group: ServiceGroupKey): Service[] => services.filter(s => s.group === group);
export const findService = (slug: string): Service => {
  const service = services.find(s => s.slug === slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service;
};
