// Real photographs shown in the "From the field" gallery of each service page.
// Each service's lead photo (its `image` in services.ts) is excluded here to avoid repeating it.
export type FieldShot = { name: string; alt: string; position?: string };
export type FieldGallery = { ratio: string; shots: FieldShot[] };

export const fieldGallery: Record<string, FieldGallery> = {
  'valet-parking': { ratio: '16 / 7.4', shots: [
    { name: 'field-valet-1', alt: 'Three valet attendants in white shirts, black ties and JSS Elite Group India caps beside a Valet Car Parking sign listing the company’s services' },
    { name: 'field-valet-2', alt: 'Valet attendants in white shirts and black ties standing behind a JSS Elite Group India valet parking sign at an evening venue' },
  ] },
  'bouncer-event-security': { ratio: '4 / 3', shots: [
    { name: 'field-bouncer-2', alt: 'Seven event security personnel in black shirts and trousers standing with arms folded outside a venue at night' },
    { name: 'field-bouncer-3', alt: 'Event security personnel in black shirts and trousers standing together in a marble hotel lobby' },
  ] },
  'pso-security-services': { ratio: '4 / 5', shots: [
    { name: 'field-pso-2', position: '30% 25%', alt: 'Security officer in a black shirt standing beside a white SUV in a paved courtyard' },
    { name: 'field-pso-3', position: '70% 40%', alt: 'Security officer in a navy uniform shirt and sunglasses standing with arms folded in front of a red SUV' },
    { name: 'field-pso-4', position: '50% 20%', alt: 'Security officer in black standing in a glass-fronted lobby' },
  ] },
};
