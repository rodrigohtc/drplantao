import React, { useState } from 'react';

export default function AddEventModal({
  onClose,
  onAdd,
  date,
}: {
  onClose: () => void;
  onAdd: (title: string, startTime: string, endTime: string) => void;
  date: Date | null;
}) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      alert('Por favor, insira horários válidos.');
      return;
    }

    const startDate = new Date(`${date?.toDateString()} ${startTime}`);
    const endDate = new Date(`${date?.toDateString()} ${endTime}`);

    if (endDate <= startDate) {
      alert('A hora de fim deve ser posterior à hora de início.');
      return;
    }

    onAdd(title, startTime, endTime);
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
            <label
              htmlFor="start-time"
              className="block text-sm font-medium text-gray-700"
            >
              Hora de Início
            </label>
            <input
              type="time"
              id="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="end-time"
              className="block text-sm font-medium text-gray-700"
            >
              Hora de Fim
            </label>
            <input
              type="time"
              id="end-time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <label className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <p>{date?.toLocaleDateString('pt-BR')}</p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-4"
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
