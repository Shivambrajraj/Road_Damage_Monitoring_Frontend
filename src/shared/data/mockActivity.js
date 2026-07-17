// frontend/src/shared/data/mockActivity.js
// Realistic, believable frontend-only sample data used to make empty or
// sparsely-populated views feel like a live production system. None of this
// touches business logic or backend endpoints.

export const MOCK_NOTIFICATIONS = [
  {
    id: 'ntf_001',
    title: 'New road report received',
    detail: 'Report #RD-2291 submitted from Sector 12, Bokaro Steel City.',
    type: 'report',
    timestamp: minutesAgo(4),
    read: false,
  },
  {
    id: 'ntf_002',
    title: 'AI detection completed',
    detail: 'Damage classification finished for upload batch #4417 — 6 anomalies flagged.',
    type: 'ai',
    timestamp: minutesAgo(19),
    read: false,
  },
  {
    id: 'ntf_003',
    title: 'GIS synchronized',
    detail: 'Map layer refreshed with 128 geo-tagged detections across 4 districts.',
    type: 'system',
    timestamp: minutesAgo(52),
    read: false,
  },
  {
    id: 'ntf_004',
    title: 'Backend connected',
    detail: 'API handshake re-established with the inference service after a brief cold start.',
    type: 'system',
    timestamp: hoursAgo(2),
    read: true,
  },
  {
    id: 'ntf_005',
    title: 'Database backup completed',
    detail: 'Nightly snapshot stored successfully. Size: 214 MB.',
    type: 'system',
    timestamp: hoursAgo(6),
    read: true,
  },
  {
    id: 'ntf_006',
    title: 'System update available',
    detail: 'Detection model v2.3.1 is ready to deploy with improved pothole recall.',
    type: 'update',
    timestamp: hoursAgo(21),
    read: true,
  },
];

export const MOCK_ACTIVITY_TIMELINE = [
  { id: 'act_1', label: 'Report #RD-2291 verified by inspector', time: minutesAgo(6), status: 'verified' },
  { id: 'act_2', label: 'AI flagged high-severity pothole cluster near NH-33', time: minutesAgo(24), status: 'alert' },
  { id: 'act_3', label: 'Field team uploaded 14 new images', time: minutesAgo(58), status: 'upload' },
  { id: 'act_4', label: 'Monthly analytics digest generated', time: hoursAgo(3), status: 'system' },
  { id: 'act_5', label: 'Report #RD-2270 marked resolved', time: hoursAgo(5), status: 'resolved' },
];

export const MOCK_SYSTEM_STATUS = {
  apiHealth: { status: 'operational', latencyMs: 142, uptime: '99.97%' },
  aiModel: { status: 'operational', version: 'v2.3.0', lastTrained: '2026-06-28' },
  database: { status: 'operational', connections: 18, storageUsedPct: 46 },
  gisSync: { status: 'operational', lastSync: minutesAgo(52) },
};

export const MOCK_RECENT_UPLOADS = [
  { id: 'up_1', name: 'sector12_nh33_a.jpg', size: '2.4 MB', time: minutesAgo(12) },
  { id: 'up_2', name: 'sector12_nh33_b.jpg', size: '3.1 MB', time: minutesAgo(12) },
  { id: 'up_3', name: 'ring_road_km14.jpg', size: '1.8 MB', time: hoursAgo(1) },
  { id: 'up_4', name: 'city_center_pothole.jpg', size: '2.0 MB', time: hoursAgo(4) },
];

function minutesAgo(mins) {
  return new Date(Date.now() - mins * 60 * 1000).toISOString();
}
function hoursAgo(hrs) {
  return new Date(Date.now() - hrs * 60 * 60 * 1000).toISOString();
}
