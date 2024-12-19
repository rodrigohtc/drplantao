'use client';

import { useState, useEffect } from 'react';
import moment from 'moment';

type Evento = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

export default function EventList({
  initialEvents,
}: {
  initialEvents: Evento[];
}) {
  const [events, setEvents] = useState<Evento[]>(initialEvents);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
      {sortedEvents.map((event) => (
        <li key={event.id} className="p-4 hover:bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-medium">{event.title}</span>
            <span className="text-sm text-gray-500">
              {moment(event.start).format('DD/MM/YYYY HH:mm')}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
