import type { Rank } from "./types";

export function currency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function compactNumber(value: number) {
  return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function formatTime(date: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function daysBetween(from: string | Date, to: string | Date) {
  const start = new Date(from).getTime();
  const end = new Date(to).getTime();
  return Math.ceil((end - start) / 86_400_000);
}

export function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function nextRank(points: number): Rank {
  if (points >= 1800) return "Master";
  if (points >= 1250) return "Platinum";
  if (points >= 780) return "Gold";
  if (points >= 360) return "Silver";
  return "Bronze";
}

export function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function cloneDemo<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function pct(value: number, max = 100) {
  return Math.max(0, Math.min(100, Math.round((value / max) * 100)));
}
