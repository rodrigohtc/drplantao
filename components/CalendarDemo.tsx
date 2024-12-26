'use client';

import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import { addHours } from 'date-fns';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

type Evento = {
  title: string;
  start: Date;
  end: Date;
};

export default function CalendarComponent2() {
  const now = new Date();
  const start = addHours(now, 1); // Início do evento padrão
  const end = addHours(start, 2); // Fim do evento padrão

  // Estado dos eventos
  const [events, setEvents] = useState<Evento[]>([
    {
      title: 'Meu Evento',
      start: start,
      end: end,
    },
  ]);

  // Callback para redimensionar eventos
  const onEventResize: withDragAndDropProps['onEventResize'] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.start === data.event.start && event.end === data.event.end
          ? { ...event, start: new Date(start), end: new Date(end) }
          : event
      )
    );
  };

  // Callback para mover eventos (drag and drop)
  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const { start, end, event } = data;

    setEvents((currentEvents) =>
      currentEvents.map((currentEvent) =>
        currentEvent.start === event.start && currentEvent.end === event.end
          ? { ...currentEvent, start: new Date(start), end: new Date(end) }
          : currentEvent
      )
    );
  };

  return (
    <div className="calendar-container">
      <DnDCalendar
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop} // Habilita o drag-and-drop
        onEventResize={onEventResize} // Habilita o redimensionamento de eventos
        resizable
        selectable
        style={{ height: '100vh' }}
        messages={{
          next: 'Próximo',
          previous: 'Anterior',
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          agenda: 'Agenda',
        }}
      />
    </div>
  );
}
