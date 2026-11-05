// The client site keeps its login in localStorage (token + username). When
// the server says the token is no longer valid (401), forget it so the site
// stops showing the person as logged in, and the header/sidebar update.
export function clearLogin() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.dispatchEvent(new Event('storage'));
}
