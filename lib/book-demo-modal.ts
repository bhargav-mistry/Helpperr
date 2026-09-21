"use client";

// A tiny event bus so any "Book a Demo" button/link anywhere on the page
// (Hero, Hero2, CTA, Footer, ...) can open the single shared modal without
// prop-drilling through the server-component page.
type Listener = () => void;
let listeners: Listener[] = [];

export function openBookDemo() {
  listeners.forEach((l) => l());
}

export function subscribeBookDemo(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
