export const API_ERRORS = {
  LOGIN_UNKNOWN: "Login failed. But don't worry — even great stories start with a few rewrites",
  UNKNOWN: 'A small error stopped the story. Please refresh or try again.',
} as const;

export const API_ERROR_MESSAGES = {
  'There is already an existing customer with the provided email.':
    'That email already has its own story here. Try logging in instead.',
  'Customer account with the given credentials not found.':
    'No user found with that login and password. Like a lost library book, it’s just not in our system.',
  'Request body does not contain valid JSON.': 'We couldn’t read your request correctly. Please try once more.',
};
