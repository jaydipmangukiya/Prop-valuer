let navigateFn:
  | ((path: string, options?: { replace?: boolean }) => void)
  | null = null;

export function setNavigate(
  fn: (path: string, options?: { replace?: boolean }) => void
) {
  navigateFn = fn;
}

export function navigate(path: string, options?: { replace?: boolean }) {
  if (typeof window === "undefined") return;
  if (navigateFn) {
    navigateFn(path, options);
  } else {
    // Fallback if router isn't initialized yet - use direct window navigation
    if (options?.replace) {
      window.location.replace(path);
    } else {
      window.location.assign(path);
    }
  }
}
