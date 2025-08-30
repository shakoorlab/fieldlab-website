// Cubic ease-in-out for a nice “slow” feel
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Smoothly scroll the window to an absolute Y position.
 * @param {number} targetY - Absolute page Y to scroll to (px).
 * @param {object} opts
 * @param {number} [opts.duration=2000] - Duration in ms (increase for slower).
 */
export function smoothScrollToY(targetY, { duration = 2000 } = {}) {
  // Respect user’s reduced-motion preference
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    return;
  }

  const startY = window.scrollY || window.pageYOffset;
  const delta = targetY - startY;
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, startY + delta * eased);
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

/**
 * Smoothly scroll to an element (optionally with an offset).
 * @param {Element|null} el - Target element.
 * @param {object} opts
 * @param {number} [opts.duration=2000] - Duration in ms.
 * @param {number} [opts.offset=0] - Extra offset in px (e.g. -72 for a fixed navbar).
 */
export function smoothScrollToEl(el, { duration = 2000, offset = 0 } = {}) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const targetY = (window.scrollY || window.pageYOffset) + rect.top + offset;
  smoothScrollToY(targetY, { duration });
}
