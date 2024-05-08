export const RequestItem = {
  SCORE_POINTS: {
    Unanswered: 0,
    Accepted: 1,
    Rejected: 10,
  },

  calculate_score: (requests) => {
    if (!requests) return 0;

    return requests.reduce((value, request) => value + RequestItem.SCORE_POINTS[request.status], 0);
  },
};
