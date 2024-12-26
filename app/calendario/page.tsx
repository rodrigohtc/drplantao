'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CalendarComponent, { Evento } from '@/components/CalendarComponent';
import moment from 'moment';
import { AuthProvider } from '@/components/AuthContext';

export default function CalendarioPage() {
  const [allEvents, setAllEvents] = useState<Evento[]>([]);

  const handleEventAdd = (newEvent: Evento) => {
    setAllEvents([...allEvents, newEvent]);
  };

  const handleEventDelete = (eventId: number) => {
    setAllEvents(allEvents.filter((event) => event.id !== eventId));
  };

  const sortedEvents = [...allEvents].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Meus Plantões
          </h1>
          <div className="w-full max-w-3xl mb-8">
            <CalendarComponent events={allEvents} onEventAdd={handleEventAdd} />
          </div>
          <div className="w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-2 text-primary">
              Próximos Plantões
            </h2>
            <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
              {sortedEvents.map((event) => (
                <li key={event.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-gray-500">
                      {moment(event.start).format('DD/MM/YYYY HH:mm')} -{' '}
                      {moment(event.end).format('HH:mm')} (
                      {moment
                        .duration(moment(event.end).diff(moment(event.start)))
                        .humanize()}
                      )
                      <button
                        className="text-red-500 hover:text-red-700 pl-4"
                        onClick={() => handleEventDelete(event.id)}
                        aria-label={`Excluir evento ${event.title}`}
                      >
                        X
                      </button>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
