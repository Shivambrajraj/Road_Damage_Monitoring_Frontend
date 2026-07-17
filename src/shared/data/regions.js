// frontend/src/shared/data/regions.js
// Static reference data for the region selector. Frontend-only — does not
// affect routing or data fetching, purely a UX/scoping affordance.

export const NATIONAL_REGION = { code: 'IN', label: 'National View', group: 'national' };

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
].map((label) => ({ code: label.slice(0, 3).toUpperCase(), label, group: 'state' }));

export const INDIAN_UNION_TERRITORIES = [
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
].map((label) => ({ code: label.slice(0, 3).toUpperCase(), label, group: 'ut' }));

export const ALL_REGIONS = [NATIONAL_REGION, ...INDIAN_STATES, ...INDIAN_UNION_TERRITORIES];
