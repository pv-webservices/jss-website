export const business = {
  name: 'JAY SHRI SHYAM ELITE GROUP INDIA',
  shortName: 'JSS ELITE GROUP INDIA',
  tagline: 'Professional • Reliable • Trusted',
  phone: '9711161009',
  alternate: '9911156199',
  phoneLink: 'tel:+919711161009',
  alternateLink: 'tel:+919911156199',
  email: 'info@jsselitegroupindia.com',
  site: 'https://www.jsselitegroupindia.com',
  area: 'Delhi NCR & Other Locations',
};
export function whatsapp(message = 'Hello JSS Elite Group India, I would like to discuss a service requirement.') {
  return `https://wa.me/919711161009?text=${encodeURIComponent(message)}`;
}
export const socialLinks = [
  { name: 'Instagram', url: import.meta.env.PUBLIC_INSTAGRAM_URL, icon: 'instagram' },
  { name: 'Facebook', url: import.meta.env.PUBLIC_FACEBOOK_URL, icon: 'facebook' },
  { name: 'Google Business Profile', url: import.meta.env.PUBLIC_GOOGLE_BUSINESS_URL, icon: 'pin' },
].filter(link => typeof link.url === 'string' && /^https:\/\//.test(link.url));

export const steps = [
  { title: 'Get in touch', text: 'Call us or start a conversation on WhatsApp.', icon: 'phone' },
  { title: 'Share your needs', text: 'Tell us the service, location, date and duration.', icon: 'document' },
  { title: 'Discuss the options', text: 'Our team discusses suitable personnel and availability.', icon: 'people' },
  { title: 'Confirm the details', text: 'Agree the scope and arrangements directly with our team.', icon: 'check' },
];
export const generalFaqs = [
  { q: 'Which services can I enquire about?', a: 'Professional drivers, chauffeurs, monthly, hourly and outstation drivers, corporate and personal drivers, valet parking personnel, PSO, bouncers and security personnel.' },
  { q: 'Do you provide a vehicle with the driver?', a: 'Our services focus on professional personnel. Share your vehicle and driving requirements with our team when discussing the arrangement.' },
  { q: 'Where are your services available?', a: 'Our service area is Delhi NCR & Other Locations. Please share your exact location so our team can confirm availability for your requirement.' },
  { q: 'How do I get a quote or request a callback?', a: 'Call 9711161009 or use the enquiry form to prepare a WhatsApp message. Our team will discuss the scope, availability and charges directly with you.' },
];
