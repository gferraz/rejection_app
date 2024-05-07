"use client";

import { useState } from "react";

export default function Play() {
  const [askee, setAskee] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    add_question(question, askee, status);
  };

  const add_question = (question, askee, status) => {
    let request = {
      id: history.length, // id of the question so you can get/edit/remove by id
      timestamp: new Date(), // output from Date.now()
      question: question, // the ask
      askee: askee, // person asked
      status: status, // 'Accepted', 'Rejected', 'Unanswered'
    };
    setHistory(history.concat([request]));
    console.log(request);
    return request;
  };


  return (
    <main className="min-h-screen p-24">
      <h2 className={`mb-2 text-2xl font-semibold`}>New Request</h2>
      <form onSubmit={handleSubmit}>
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
          <input
            onClick={(e) => setStatus(e.target.value)}
            type="submit"
            value="Unanswered"
            className="text-sm mt-10 mb-4 mx-2 focus:outline-none px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-700 hover:text-gray-100 bg-gray-100 text-gray-700 border duration-200 ease-in-out border-gray-600 transition"
          />
          <input
            onClick={(e) => setStatus(e.target.value)}
            type="submit"
            value="Rejected"
            className="text-sm mt-10 mb-4 mx-2 focus:outline-none px-4 py-2 rounded font-bold cursor-pointer hover:bg-red-700 hover:text-red-100 bg-red-100 text-red-700 border duration-200 ease-in-out border-red-600 transition"
          />
          <input
            onClick={(e) => setStatus(e.target.value)}
            type="submit"
            value="Accepted"
            className="text-sm mt-10 mb-4 mx-2 focus:outline-none px-4 py-2 rounded font-bold cursor-pointer hover:bg-green-700 hover:text-green-100 bg-green-100 text-green-700 border duration-200 ease-in-out border-green-600 transition"
          />
        </div>
      </form>
      <h2 className={`my-2 text-2xl font-semibold`}>History</h2>

      <table classNAme="table-auto">
        <thead>
          <tr>
            <th>Question</th>
            <th>Asked to</th>
            <th>Asked at</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((r) => (
            <tr key={r.id}>
              <td>{r.question}</td>
              <td>{r.askee}</td>
              <td>{r.timestamp.toLocaleDateString()}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
