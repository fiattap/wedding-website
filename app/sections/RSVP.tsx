"use client";
import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

const initialState = {
  name: "",
  email: "",
  attending: "",
  guests: 1,
  meal: "",
  notes: "",
};

export default function RSVP() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "guests" ? Number(value) : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.attending) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitted(true);
    // TODO: Integrate backend/API later
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-20 bg-[#fafaf9]">
        <div className="max-w-md mx-auto px-4">
          <SectionTitle>RSVP</SectionTitle>
          <AnimatedFadeIn>
            <div className="text-center text-lg text-neutral-700">Thank you for your RSVP!</div>
          </AnimatedFadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 bg-[#fafaf9]">
      <div className="max-w-md mx-auto px-4">
        <SectionTitle>RSVP</SectionTitle>
        <AnimatedFadeIn>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-1 text-neutral-700" htmlFor="name">Name *</label>
              <input
                className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-neutral-700" htmlFor="email">Email *</label>
              <input
                className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-neutral-700" htmlFor="attending">Will you attend? *</label>
              <select
                className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
                id="attending"
                name="attending"
                value={form.attending}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="yes">Accepts with pleasure</option>
                <option value="no">Regretfully declines</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-neutral-700" htmlFor="guests">Number of guests</label>
              <input
                className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
                type="number"
                id="guests"
                name="guests"
                min={1}
                max={10}
                value={form.guests}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-neutral-700" htmlFor="meal">Meal preference</label>
              <input
                className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
                type="text"
                id="meal"
                name="meal"
                value={form.meal}
                onChange={handleChange}
                placeholder="e.g. vegetarian, allergies"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-neutral-700" htmlFor="notes">Notes</label>
              <textarea
                className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Anything else we should know?"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 text-white px-8 py-3 text-base font-light tracking-wide shadow-lg hover:bg-neutral-800 transition-colors duration-200"
            >
              Submit RSVP
            </button>
          </form>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
