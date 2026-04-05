'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect, useState } from 'react';

interface BookingInfo {
  username: string;
  eventSlug: string;
}

interface CalEmbedProps {
  className?: string;
}

export function CalEmbed({ className = '' }: CalEmbedProps) {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/cal/booking-info')
      .then((r) => r.json())
      .then((data) => {
        if (data.username) {
          setBookingInfo(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (!bookingInfo) return;
    (async () => {
      const cal = await getCalApi({ namespace: bookingInfo.eventSlug });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, [bookingInfo]);

  if (error) return null;

  if (!bookingInfo) {
    return (
      <div className={`w-full rounded-xl border border-slate-200 flex items-center justify-center h-64 text-slate-400 text-sm ${className}`}>
        Loading scheduler…
      </div>
    );
  }

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-slate-200 ${className}`}>
      <Cal
        namespace={bookingInfo.eventSlug}
        calLink={`${bookingInfo.username}/${bookingInfo.eventSlug}`}
        style={{ width: '100%', height: '100%', minHeight: 600, overflow: 'scroll' }}
        config={{ layout: 'month_view' }}
      />
    </div>
  );
}
