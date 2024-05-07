const empty_question = {
  id: "", // id of the question so you can get/edit/remove by id
  timestamp: 0, // output from Date.now()
  question: "", // the ask
  askee: "", // person asked
  status: "", // 'Accepted', 'Rejected', 'Unanswered'
};

export default function Play() {
  return (
    <main className="min-h-screen p-24">
      <h2 className={`mb-2 text-2xl font-semibold`}>New Request</h2>
      <form>
        <div class="flex">
          <label class="block m-4 w-80">
            <span class="text-gray-300">Request</span>
            <input name="question" type="text" class="mt-1 p-1 block text-gray-600 min-w-full" placeholder="" />
          </label>
          <label class="block m-4">
            <span class="text-gray-300">Ask to</span>
            <input name="askee" type="text" class="mt-1 p-1 block w-full text-gray-600" placeholder="" />
          </label>
          <button class="text-sm mt-10 mb-4 mx-2 focus:outline-none px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-700 hover:text-gray-100 bg-gray-100 text-gray-700 border duration-200 ease-in-out border-gray-600 transition">
            Unanswered
          </button>
          <button class="text-sm mt-10 mb-4 mx-2 focus:outline-none px-4 py-2 rounded font-bold cursor-pointer hover:bg-red-700 hover:text-red-100 bg-red-100 text-red-700 border duration-200 ease-in-out border-red-600 transition">
            Rejected
          </button>
          <button class="text-sm mt-10 mb-4 mx-2 focus:outline-none px-4 py-2 rounded font-bold cursor-pointer hover:bg-green-700 hover:text-green-100 bg-green-100 text-green-700 border duration-200 ease-in-out border-green-600 transition">
            Accepted
          </button>
        </div>
      </form>
      <h2 className={`my-2 text-2xl font-semibold`}>History</h2>
    </main>
  );
}
