'use client';

import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventModal from './AddEventModal';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

type Evento = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

export default function CalendarComponent({
  initialEvents,
}: {
  initialEvents: Evento[];
}) {
  const [events, setEvents] = useState<Evento[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setShowModal(true);
  };

  const handleAddEvent = (title: string) => {
    if (selectedDate) {
      const newEvent: Evento = {
        id: events.length + 1,
        title,
        start: selectedDate,
        end: moment(selectedDate).add(1, 'hours').toDate(),
      };
      setEvents([...events, newEvent]);
      setShowModal(false);
    }
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px' }}
        onSelectSlot={handleSelectSlot}
        selectable
        messages={{
          next: 'Próximo',
          previous: 'Anterior',
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
        }}
      />
      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddEvent}
          date={selectedDate}
        />
      )}
    </>
  );
}
