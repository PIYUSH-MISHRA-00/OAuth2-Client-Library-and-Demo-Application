// Client-side storage utilities for OAuth state
export const StateStorage = {
  setState(state) {
    sessionStorage.setItem('oauth_state', state);
  },
  
  getState() {
    return sessionStorage.getItem('oauth_state');
  },
  
  clearState() {
    sessionStorage.removeItem('oauth_state');
  },

  setCodeVerifier(verifier) {
    sessionStorage.setItem('code_verifier', verifier);
  },

  getCodeVerifier() {
    return sessionStorage.getItem('code_verifier');
  },

  clearCodeVerifier() {
    sessionStorage.removeItem('code_verifier');
  }
};