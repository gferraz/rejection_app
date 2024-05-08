# Rejection App*

Build a UI that lets you keep track of your score. Include a text input for the ask, who you asked, and two buttons: "Accepted" or "Rejected". For asynchronous requests such as emails or messages, record the score at the time you get the answer, not at the time you ask.

Use React and store a record of the data in localStorage.

Your data structure can be a simple array of ask objects:

```javascript
interface Question {
  id: String,          // id of the question so you can get/edit/remove by id
  timestamp: Number,   // output from Date.now()
  question: String,    // the ask
  askee: String,       // person asked
  status: String       // 'Accepted', 'Rejected', 'Unanswered'
}
```

You can calculate everything else you need to know by reducing over the list of asks.

It may be useful to display a running tally of the user's current score. Just remember that the current day's subtotal needs to be recalculated each time an ask is accepted or rejected, so it will be useful to keep the list in an array that you can reduce with each new ask added by the user.


! Before going to level 2, I recommend adding "prettier" to the project :)

Level 2:

- refactor to use redux

Level 3:

- store it in a database
- add login logic
