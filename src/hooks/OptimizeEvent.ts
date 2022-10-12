export default function OptimizeEvent(callback: () => void): () => void {
  let ticking: boolean = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
    }
  };
}
