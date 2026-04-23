"use client";

import { useMemo, useState } from "react";
import BackNav from "../../components/BackNav";
import HeaderIdentity from "../../components/HeaderIdentity";

type Attendance = "yes" | "no" | "";

export default function RSVPPage() {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const [morningAttendance, setMorningAttendance] = useState<Attendance>("");
  const [dinnerAttendance, setDinnerAttendance] = useState<Attendance>("");

  const [guestCount, setGuestCount] = useState("1");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [songRequest, setSongRequest] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const isDinnerAttending = dinnerAttendance === "yes";

  const canContinue = useMemo(() => guestName.trim().length > 0, [guestName]);

  const canSubmit = useMemo(() => {
    if (!guestName.trim()) return false;
    if (!morningAttendance || !dinnerAttendance) return false;
    if (isDinnerAttending && !guestCount) return false;
    return true;
  }, [guestName, morningAttendance, dinnerAttendance, isDinnerAttending, guestCount]);

  function handleStart() {
    if (!canContinue) return;
    setHasStarted(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    // For now this is a front-end success state only.
    // Later you can send this data to Supabase or an API route.
    console.log("RSVP submitted", {
      guestName,
      email,
      morningAttendance,
      dinnerAttendance,
      guestCount: isDinnerAttending ? guestCount : "0",
      dietaryRestrictions,
      songRequest,
      message,
    });

    setSubmitted(true);
  }

  return (
    <>
      <HeaderIdentity />
      <BackNav variant="light" />

      <main className="min-h-screen bg-[#f6f3ef] text-[#4f4842]">
        <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/rsvp.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 px-6 text-center">
            <p className="mb-4 text-[12px] uppercase tracking-[0.45em] text-white/75">
              RSVP
            </p>

            <h1 className="text-[34px] font-light leading-tight md:text-[56px] lg:text-[72px]">
              We Can’t Wait
              <br />
              to Celebrate
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 tracking-[0.08em] text-white/75 md:text-[15px]">
              Please let us know which part of the day you’ll be joining us for.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <p className="text-[12px] uppercase tracking-[0.45em] text-[#8b8178]">
                FIAT & DEREK
              </p>
              <p className="mt-4 text-[15px] leading-7 text-[#6e655e]">
                Kindly reply by August 31, 2026.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-[28px] border border-[#ddd4cc] bg-[#f3ede7] px-8 py-12 text-center shadow-[0_12px_30px_rgba(79,72,66,0.06)]">
                <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                  Thank You
                </p>
                <h2 className="mt-4 text-[30px] font-light leading-tight text-[#4f4842] md:text-[40px]">
                  Your RSVP has been received
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-8 text-[#6e655e]">
                  We’re so excited to celebrate with you in Phuket.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[28px] border border-[#ddd4cc] bg-[#f3ede7] px-6 py-8 shadow-[0_12px_30px_rgba(79,72,66,0.06)] md:px-8 md:py-10"
              >
                {!hasStarted ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-[28px] font-light leading-tight md:text-[36px]">
                        Enter Your Name
                      </h2>
                      <p className="mt-3 text-[15px] leading-7 text-[#6e655e]">
                        We’ll start with your name, then you can let us know
                        which parts of the celebration you’ll be attending.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="guestName"
                        className="mb-2 block text-[12px] uppercase tracking-[0.25em] text-[#8b8178]"
                      >
                        Full Name
                      </label>
                      <input
                        id="guestName"
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full rounded-[18px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[16px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6]"
                      />
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleStart}
                        disabled={!canContinue}
                        className="border border-[#cfc6be] px-8 py-3 text-[12px] uppercase tracking-[0.28em] text-[#4f4842] transition duration-300 hover:bg-[#4f4842] hover:text-[#f6f3ef] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="text-center">
                      <h2 className="text-[28px] font-light leading-tight md:text-[36px]">
                        Hello, {guestName}
                      </h2>
                      <p className="mt-3 text-[15px] leading-7 text-[#6e655e]">
                        Please let us know which part of the celebration you’ll
                        be joining.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-[12px] uppercase tracking-[0.25em] text-[#8b8178]"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full rounded-[18px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[16px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6]"
                        />
                      </div>

                      <div className="rounded-[22px] border border-[#ddd4cc] bg-[#f8f4ef] px-5 py-5">
                        <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                          Morning Ceremony
                        </p>
                        <h3 className="mt-2 text-[24px] font-light text-[#4f4842]">
                          Buddhist Ceremony
                        </h3>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => setMorningAttendance("yes")}
                            className={`rounded-[18px] border px-4 py-3 text-[13px] uppercase tracking-[0.2em] transition ${
                              morningAttendance === "yes"
                                ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
                                : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
                            }`}
                          >
                            Joyfully Attends
                          </button>

                          <button
                            type="button"
                            onClick={() => setMorningAttendance("no")}
                            className={`rounded-[18px] border px-4 py-3 text-[13px] uppercase tracking-[0.2em] transition ${
                              morningAttendance === "no"
                                ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
                                : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
                            }`}
                          >
                            Regretfully Declines
                          </button>
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-[#ddd4cc] bg-[#f8f4ef] px-5 py-5">
                        <p className="text-[12px] uppercase tracking-[0.35em] text-[#8b8178]">
                          Evening Celebration
                        </p>
                        <h3 className="mt-2 text-[24px] font-light text-[#4f4842]">
                          Dinner Reception
                        </h3>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => setDinnerAttendance("yes")}
                            className={`rounded-[18px] border px-4 py-3 text-[13px] uppercase tracking-[0.2em] transition ${
                              dinnerAttendance === "yes"
                                ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
                                : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
                            }`}
                          >
                            Joyfully Attends
                          </button>

                          <button
                            type="button"
                            onClick={() => setDinnerAttendance("no")}
                            className={`rounded-[18px] border px-4 py-3 text-[13px] uppercase tracking-[0.2em] transition ${
                              dinnerAttendance === "no"
                                ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
                                : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
                            }`}
                          >
                            Regretfully Declines
                          </button>
                        </div>
                      </div>

                      {isDinnerAttending && (
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="guestCount"
                              className="mb-2 block text-[12px] uppercase tracking-[0.25em] text-[#8b8178]"
                            >
                              Number of Guests
                            </label>
                            <select
                              id="guestCount"
                              value={guestCount}
                              onChange={(e) => setGuestCount(e.target.value)}
                              className="w-full rounded-[18px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[16px] text-[#4f4842] outline-none focus:border-[#b9afa6]"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="dietaryRestrictions"
                              className="mb-2 block text-[12px] uppercase tracking-[0.25em] text-[#8b8178]"
                            >
                              Dietary Restrictions
                            </label>
                            <input
                              id="dietaryRestrictions"
                              type="text"
                              value={dietaryRestrictions}
                              onChange={(e) =>
                                setDietaryRestrictions(e.target.value)
                              }
                              placeholder="Any dietary needs?"
                              className="w-full rounded-[18px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[16px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6]"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="songRequest"
                          className="mb-2 block text-[12px] uppercase tracking-[0.25em] text-[#8b8178]"
                        >
                          Song Request
                        </label>
                        <input
                          id="songRequest"
                          type="text"
                          value={songRequest}
                          onChange={(e) => setSongRequest(e.target.value)}
                          placeholder="A song that gets you on the dance floor"
                          className="w-full rounded-[18px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[16px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-[12px] uppercase tracking-[0.25em] text-[#8b8178]"
                        >
                          Message for the Couple
                        </label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          placeholder="Leave us a note..."
                          className="w-full rounded-[18px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[16px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6]"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-4 pt-2">
                        <button
                          type="submit"
                          disabled={!canSubmit}
                          className="border border-[#cfc6be] px-8 py-3 text-[12px] uppercase tracking-[0.28em] text-[#4f4842] transition duration-300 hover:bg-[#4f4842] hover:text-[#f6f3ef] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Submit RSVP
                        </button>

                        <button
                          type="button"
                          onClick={() => setHasStarted(false)}
                          className="text-[12px] uppercase tracking-[0.25em] text-[#8b8178] transition hover:text-[#4f4842]"
                        >
                          Edit Name
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}