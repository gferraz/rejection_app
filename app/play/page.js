"use client";

import { useEffect, useState } from "react";

export default function Play() {
  const [askee, setAskee] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    add_question(question, askee, status);
  };

  const add_question = (question, askee, status) => {
    // quando você cria uma variável que você não pretende mudar, o ideal é usar "const"
    // ajuda a evitar que você modifique uma variável que não foi criada para ser mudada sem querer
    let request = {
      id: history ? history.length : 0, // id of the question so you can get/edit/remove by id
      timestamp: new Date(),
      /*
        no javascript, quando você vai criar um atributo no objeto cuja "key" é igual o nome da variavel que voce já tem, você pode simplificar e digitar uma vez só.

        Aqui você pode colocar:

        const request = {
          id: history: history.length : 0,
          timestamp: new Date(),
          question,
          askee,
          status
        }
      */
      question: question,
      askee: askee,
      status: status,
    };
    /*
    aqui você pode usar o spread operator pra simplificar:
    setHistory([...history, request])
    */
    setHistory(history.concat([request]));
    return request;
  };

  useEffect(() => {
    /*
      pra evitar criar muitos níveis de função e dificultar a legibilidade, é uma boa prática usar a negativa do caso if normal pra evitar usar chaves

      aqui dá pra ser:
      if (!history) return
      localStorage.setItem("requests", JSON.stringify(history));
    */
    if (history) {
      localStorage.setItem("requests", JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    /*
      mesma coisa aqui:
      if (!requests) return setHistory([])
      const newHistory = requests.map((r) => {
      r.timestamp = new Date(r.timestamp);
      return r;
      setHistory(newHistory);

      menos linhas e mais fácil de ler

    */
    const requests = JSON.parse(localStorage.getItem("requests"));
    if (requests) {
      const newHistory = requests.map((r) => {
        r.timestamp = new Date(r.timestamp);
        return r;
      });
      setHistory(newHistory);
    } else {
      setHistory([]);
    }
  }, []);

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
          {/*
          Observe que aqui você tem três componentes muito parecidos em que muda muitos poucos atributos. Isso é meio chato de dar manutenção, porque toda hora que você precisar fazer uma modificação
          em um botão, provavelmente você vai ter que copiar/colar nos outros 2. Triplicando a complexidade de mudanças simples.
          Você pode usar um array/map pra facilitar:


          {
            [
              {
                value: 'unanswered',
                className: 'text-gray-700'
              },
              {
                value: 'rejected',
                className: 'text-red-700',
              },
              {
                value: 'accepted',
                className: 'text-green-700'
              }
            ].map((item) => (
              <input onClick={() => setStatus(item.value)} type="submit" value={item.value} className={classNames('text-sm mt-10 mb-4 mx-2 focus:outline-none px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-700 hover:text-gray-100 bg-gray-100 border duration-200 ease-in-out border-gray-600 transition', item.className)}
            ))
          }

          Observe que tem menos código e mais fácil de dar manutenção
          Nesse caso eu adicionei a biblioteca classNames(https://www.npmjs.com/package/classnames) que fornece algumas utilidades para facilitar a composição de className. Eu criei uma configuração "default" e concatenei com a especificidade de cada butão


          Claro, outra solução seria criar um componente em outro arquivo pra facilitar também
           */}
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
      <h2 className={`my-2 text-2xl font-semibold`}>History (Score {calculate_score(history)})</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Question</th>
            <th>Asked to</th>
            <th>Asked at</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.map((r) => (
              <tr key={r.id}>
                <td>{r.question}</td>
                <td>{r.askee}</td>
                <td>{r.timestamp.toLocaleDateString()}</td>
                <td>{r.status}</td>
                <td>
                  <button
                    onClick={(e) => setStatus(e.target.value)}
                    className="text-sm my-2 mx-2 focus:outline-none px-2 py-2 rounded
                    font-bold cursor-pointer hover:bg-gray-700 hover:text-gray-100
                    bg-gray-100 text-gray-700 border duration-200 ease-in-out border-gray-600 transition">
                      Unanswered
                   </button>
                </td>
                <td>
                  <button
                    onClick={(e) => setStatus(e.target.value)}
                    className="text-sm my-2 mx-2 focus:outline-none px-2 py-2 rounded
                    font-bold cursor-pointer hover:bg-green-700 hover:text-green-100
                    bg-green-100 text-green-700 border duration-200 ease-in-out border-green-600 transition">
                      Accepted
                   </button>
                </td>
                <td>
                  <button
                    onClick={(e) => setStatus(e.target.value)}
                    className="text-sm my-2 mx-2 focus:outline-none px-2 py-2 rounded
                    font-bold cursor-pointer hover:bg-red-700 hover:text-red-100
                    bg-red-100 text-red-700 border duration-200 ease-in-out border-red-600 transition">
                      Rejected
                   </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

// usar const para variáveis que não há intenção de mutação.
// realmente é uma boa prática botar constantes com tudo maiúsculo :)
let SCORE_POINTS = {
  Unanswered: 0,
  Accepted: 1,
  Rejected: 10,
};

function calculate_score(requests) {
  let score = 0;

  if (requests) {
    score = requests.reduce((value, request) => value + SCORE_POINTS[request.status], 0);
  }
  return score;
}


/*
no geral, tá bem bom o código. Parabéns :)
*/