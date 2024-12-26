'use client';

import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventModal from './AddEventModal';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

export type Evento = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

export default function CalendarComponent({
  events,
  onEventAdd,
}: {
  events: Evento[];
  onEventAdd?: (event: Evento) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date()); // Gerencia a data atual

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

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
      setShowModal(false);

      if (onEventAdd) {
        onEventAdd(newEvent);
      }
    }
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={handleNavigate}
        view={currentView}
        onView={handleViewChange}
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
