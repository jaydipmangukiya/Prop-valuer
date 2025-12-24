// Global auth event system to notify UserProvider of token expiration in the same tab

type AuthEventListener = (event: AuthEvent) => void;

export interface AuthEvent {
  type: "TOKEN_EXPIRED" | "LOGOUT" | "LOGIN";
}

let listeners: Set<AuthEventListener> = new Set();

export function subscribe(listener: AuthEventListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function dispatchAuthEvent(event: AuthEvent) {
  listeners.forEach((listener) => listener(event));
}
