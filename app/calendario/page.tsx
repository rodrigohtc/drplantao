'use client';

import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from '@/components/Header';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

type Evento = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

export default function CalendarioPage() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const router = useRouter();

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

  const sortedEvents = [...events].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-primary">Meus Plantões</h1>
        <div className="w-full max-w-3xl mb-8">
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
                    {moment(event.start).format('DD/MM/YYYY HH:mm')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddEvent}
          date={selectedDate}
        />
      )}
    </div>
  );
}

function AddEventModal({
  onClose,
  onAdd,
  date,
}: {
  onClose: () => void;
  onAdd: (title: string) => void;
  date: Date | null;
}) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Adicionar Plantão</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <p>{date?.toLocaleString('pt-BR')}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
