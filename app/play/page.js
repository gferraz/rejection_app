'use client';

import { useEffect, useState } from 'react';

import { RequestItem } from './request';

export default function Play() {
  const [askee, setAskee] = useState('');
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState();

  const addItem = (event) => {
    event.preventDefault();
    const request = {
      id: history ? history.length : 0, // id of the question so you can get/edit/remove by id
      timestamp: status === 'Unanswered' ? null : new Date(),
      question,
      askee,
      status,
    };

    setHistory([...history, request]);
    return request;
  };

  const removeItem = (id) => {
    setHistory(history.filter((r) => r.id !== id));
  };

  const setRequestStatus = (id, status) => {
    const requests = structuredClone(history);
    const index = history.findIndex((r) => r.id === id);
    const request = requests[index];

    if (!request || request.status === status) return;

    request.status = status;
    request.timestamp = status === 'Unanswered' ? null : new Date();

    setHistory(requests);
  };

  useEffect(() => {
    if (!history) return;

    localStorage.setItem('requests', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('requests'));
    if (!requests) return setHistory([]);

    const newHistory = requests.map((r) => {
      r.timestamp = r.status === 'Unanswered' ? null : new Date(r.timestamp);
      return r;
    });
    setHistory(newHistory);
  }, []);

  return (
    <main className="min-h-screen p-24">
      <h2 className={`mb-2 text-2xl font-semibold`}>New Request</h2>
      <form onSubmit={addItem}>
        <div className="flex">
          <label className="block m-4 w-80">
            <span className="text-gray-300">Request</span>
            <input
              onChange={(e) => setQuestion(e.target.value)}
              name="question"
              type="text"
              className="mt-1 p-1 block text-gray-600 min-w-full"
            />
          </label>
          <label className="block m-4">
            <span className="text-gray-300">Ask to</span>
            <input
              onChange={(e) => setAskee(e.target.value)}
              name="askee"
              type="text"
              className="mt-1 p-1 block w-full text-gray-600"
            />
          </label>
          <StatusButton status="Unanswered" setState={setStatus} />
          <StatusButton status="Accepted" setState={setStatus} />
          <StatusButton status="Rejected" setState={setStatus} />
        </div>
      </form>
      <h2 className={`my-2 text-2xl font-semibold`}>History (Score {RequestItem.calculate_score(history)})</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Question</th>
            <th>Asked to</th>
            <th>Answered at</th>
            <th>Status</th>
            <th colpan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.map((r) => (
              <tr key={r.id}>
                <td class="px-4">{r.question}</td>
                <td class="px-4">{r.askee}</td>
                <td class="px-4">{r.timestamp && r.timestamp.toLocaleDateString()}</td>
                <td class="px-4">{r.status}</td>
                <td>
                  <button
                    onClick={(e) => removeItem(r.id)}
                    className={`my-4 mx-2 focus:outline-none px-2 py-1 rounded font-bold cursor-pointer
                              hover:bg-red-700 hover:text-red-100 bg-red-100 text-red-700 border duration-200 ease-in-out border-red-600 transition`}
                  >
                    ⊗
                  </button>
                </td>
                <td>
                  <StatusButton status="Unanswered" setState={(status) => setRequestStatus(r.id, 'Unanswered')} />
                </td>
                <td>
                  <StatusButton status="Accepted" setState={(status) => setRequestStatus(r.id, 'Accepted')} />
                </td>
                <td>
                  <StatusButton status="Rejected" setState={(status) => setRequestStatus(r.id, 'Rejected')} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

function StatusButton({ status, setState }) {
  const color = { Unanswered: 'gray', Accepted: 'green', Rejected: 'red' }[status];

  return (
    <button
      onClick={(e) => setState(status)}
      className={`text-sm my-4 mx-2 focus:outline-none px-2 py-2 rounded font-bold cursor-pointer
                hover:bg-${color}-700 hover:text-${color}-100 bg-${color}-100 text-${color}-700 border duration-200 ease-in-out border-${color}-600 transition`}
    >
      {status}
    </button>
  );
}
