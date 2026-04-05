import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey || apiKey === 'placeholder') {
    return NextResponse.json({ error: 'CAL_API_KEY not configured' }, { status: 500 });
  }

  const [meRes, eventsRes] = await Promise.all([
    fetch('https://api.cal.com/v1/me', {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 3600 },
    }),
    fetch('https://api.cal.com/v1/event-types', {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 3600 },
    }),
  ]);

  if (!meRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch Cal.com user' }, { status: 502 });
  }

  const me = await meRes.json();
  const username: string = me.user?.username ?? me.username;

  // Use explicit env var if set, otherwise fall back to first event type
  let eventSlug = process.env.CAL_EVENT_SLUG ?? '';
  if (!eventSlug && eventsRes.ok) {
    const eventsData = await eventsRes.json();
    const firstEvent = eventsData.event_types?.[0] ?? eventsData.eventTypes?.[0];
    if (firstEvent?.slug) eventSlug = firstEvent.slug;
  }
  if (!eventSlug) eventSlug = 'consultation';

  return NextResponse.json({ username, eventSlug });
}
