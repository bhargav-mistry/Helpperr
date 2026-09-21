"use client";

// A tiny synchronous gate so entrance animations across the page can wait
// for the preloader to finish instead of playing invisibly underneath it.
// Pages without a <Preloader /> never call beginPreload(), so `pending`
// stays false and onPreloadDone() fires immediately — no regression for
// pages that don't use it.
let pending = false;
let queued: Array<() => void> = [];

export function beginPreload() {
  pending = true;
}

export function completePreload() {
  if (!pending) return;
  pending = false;
  const callbacks = queued;
  queued = [];
  callbacks.forEach((cb) => cb());
}

export function onPreloadDone(callback: () => void) {
  if (!pending) {
    callback();
    return;
  }
  queued.push(callback);
}
