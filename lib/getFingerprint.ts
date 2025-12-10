export const getBrowserFingerprint = () => {
  if (typeof window === "undefined") return null;

  let fp = localStorage.getItem("auction_fp");

  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem("auction_fp", fp);
  }

  return fp;
};
