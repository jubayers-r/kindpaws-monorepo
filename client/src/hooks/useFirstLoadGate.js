import { useEffect } from "react";

const SAFETY_TIMEOUT_MS = 20000;
const MIN_FIRST_LOAD_MS = 2600; // one full paw pulse cycle from page start

const waitForImages = () =>
  Promise.all(
    Array.from(document.images).map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          })
    )
  );

const waitForStaticAssets = () =>
  new Promise((resolve) => {
    const finish = () => {
      const fonts = document.fonts?.ready ?? Promise.resolve();
      Promise.allSettled([fonts, waitForImages()]).then(resolve, resolve);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
  });

const useFirstLoadGate = () => {
  useEffect(() => {
    let finished = false;
    const hide = () => {
      if (finished) return;
      finished = true;
      window.__hideAppPreloader?.();
    };

    const safety = setTimeout(hide, SAFETY_TIMEOUT_MS);

    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        waitForStaticAssets().then(() => {
          if (finished) return;
          const remaining = MIN_FIRST_LOAD_MS - performance.now();
          if (remaining <= 0) hide();
          else setTimeout(hide, remaining);
        });
      })
    );

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(safety);
    };
  }, []);
};

export default useFirstLoadGate;
