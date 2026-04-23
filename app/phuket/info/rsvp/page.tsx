"use client";

import { useMemo, useState } from "react";
import BackNav from "../../../components/BackNav";

type Attendance = "yes" | "no" | "";
type YesNo = "yes" | "no" | "";

type GuestLookup = {
  matchedName: string;
  partyName: string;
  primaryName: string;
  secondaryName: string;
  invitedToCeremony: string;
  invitedToReception: string;
  plusOneAllowed: string;

  rowIndex: number; // ✅ ADD THIS
};

type PersonAttendanceBlockProps = {
  label: string;
  question: string;
  value: Attendance;
  onChange: (value: Attendance) => void;
};

function PersonAttendanceBlock({
  label,
  question,
  value,
  onChange,
}: PersonAttendanceBlockProps) {
  return (
    <div className="border-t border-[#e3dbd3] pt-4 first:border-t-0 first:pt-0">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#8b8178] md:text-[11px]">
        {label}
      </p>
      <h4 className="mt-2 text-[15px] font-light leading-snug text-[#4f4842] md:text-[19px]">
        {question}
      </h4>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange("yes")}
          className={`rounded-[14px] border px-3 py-3 text-[10px] uppercase tracking-[0.14em] transition md:text-[11px] ${
            value === "yes"
              ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
              : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
          }`}
        >
          Joyfully Attending
        </button>

        <button
          type="button"
          onClick={() => onChange("no")}
          className={`rounded-[14px] border px-3 py-3 text-[10px] uppercase tracking-[0.14em] transition md:text-[11px] ${
            value === "no"
              ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
              : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
          }`}
        >
          Regretfully Cannot Attend
        </button>
      </div>
    </div>
  );
}

type DietaryBlockProps = {
  personName: string;
  hasRestrictions: YesNo;
  setHasRestrictions: (value: YesNo) => void;
  restrictions: string;
  setRestrictions: (value: string) => void;
};

function DietaryBlock({
  personName,
  hasRestrictions,
  setHasRestrictions,
  restrictions,
  setRestrictions,
}: DietaryBlockProps) {
  return (
    <div className="border-t border-[#e3dbd3] pt-4 first:border-t-0 first:pt-0">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#8b8178] md:text-[11px]">
        {personName}
      </p>
      <h4 className="mt-2 text-[15px] font-light leading-snug text-[#4f4842] md:text-[19px]">
        Does {personName} have any dietary restrictions?
      </h4>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setHasRestrictions("yes")}
          className={`rounded-[14px] border px-3 py-3 text-[10px] uppercase tracking-[0.14em] transition md:text-[11px] ${
            hasRestrictions === "yes"
              ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
              : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
          }`}
        >
          Yes
        </button>

        <button
          type="button"
          onClick={() => {
            setHasRestrictions("no");
            setRestrictions("");
          }}
          className={`rounded-[14px] border px-3 py-3 text-[10px] uppercase tracking-[0.14em] transition md:text-[11px] ${
            hasRestrictions === "no"
              ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
              : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
          }`}
        >
          No
        </button>
      </div>

      {hasRestrictions === "yes" && (
        <div className="mt-3">
          <label
            htmlFor={`dietary-${personName.replace(/\s+/g, "-").toLowerCase()}`}
            className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#8b8178]"
          >
            What are the dietary restrictions?
          </label>
          <textarea
            id={`dietary-${personName.replace(/\s+/g, "-").toLowerCase()}`}
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            rows={3}
            placeholder="Please let us know"
            className="w-full rounded-[14px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[14px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6]"
          />
        </div>
      )}
    </div>
  );
}

export default function RSVPPage() {
  const [guestName, setGuestName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [guest, setGuest] = useState<GuestLookup | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [primaryMorningAttendance, setPrimaryMorningAttendance] =
    useState<Attendance>("");
  const [secondaryMorningAttendance, setSecondaryMorningAttendance] =
    useState<Attendance>("");

  const [primaryDinnerAttendance, setPrimaryDinnerAttendance] =
    useState<Attendance>("");
  const [secondaryDinnerAttendance, setSecondaryDinnerAttendance] =
    useState<Attendance>("");

  const [primaryHasDietaryRestrictions, setPrimaryHasDietaryRestrictions] =
    useState<YesNo>("");
  const [primaryDietaryRestrictions, setPrimaryDietaryRestrictions] =
    useState("");

  const [secondaryHasDietaryRestrictions, setSecondaryHasDietaryRestrictions] =
    useState<YesNo>("");
  const [secondaryDietaryRestrictions, setSecondaryDietaryRestrictions] =
    useState("");

  const [bringingPlusOne, setBringingPlusOne] = useState<YesNo>("");
  const [plusOneName, setPlusOneName] = useState("");
  const [plusOneHasDietaryRestrictions, setPlusOneHasDietaryRestrictions] =
    useState<YesNo>("");
  const [plusOneDietaryRestrictions, setPlusOneDietaryRestrictions] =
    useState("");

  const invitedToCeremony =
    (guest?.invitedToCeremony || "").trim().toLowerCase() === "yes";
  const invitedToReception =
    (guest?.invitedToReception || "").trim().toLowerCase() === "yes";
  const plusOneAllowed =
    (guest?.plusOneAllowed || "").trim().toLowerCase() === "yes";

  const hasSecondaryGuest = Boolean((guest?.secondaryName || "").trim());

  const primaryName = guest?.primaryName || "";
  const secondaryName = guest?.secondaryName || "";
  const greetingName = guest?.matchedName || guestName;

  const partyAttendingDinner =
    primaryDinnerAttendance === "yes" || secondaryDinnerAttendance === "yes";

  const canContinue = useMemo(() => guestName.trim().length > 0, [guestName]);

  const canSubmit = useMemo(() => {
    if (!guestName.trim()) return false;
    if (!guest) return false;

    if (invitedToCeremony) {
      if (!primaryMorningAttendance) return false;
      if (hasSecondaryGuest && !secondaryMorningAttendance) return false;
    }

    if (invitedToReception) {
      if (!primaryDinnerAttendance) return false;
      if (hasSecondaryGuest && !secondaryDinnerAttendance) return false;
    }

    if (!invitedToCeremony && !invitedToReception) return false;

    if (!primaryHasDietaryRestrictions) return false;
    if (
      primaryHasDietaryRestrictions === "yes" &&
      !primaryDietaryRestrictions.trim()
    ) {
      return false;
    }

    if (hasSecondaryGuest) {
      if (!secondaryHasDietaryRestrictions) return false;
      if (
        secondaryHasDietaryRestrictions === "yes" &&
        !secondaryDietaryRestrictions.trim()
      ) {
        return false;
      }
    }

    if (plusOneAllowed && invitedToReception && partyAttendingDinner) {
      if (!bringingPlusOne) return false;

      if (bringingPlusOne === "yes") {
        if (!plusOneName.trim()) return false;
        if (!plusOneHasDietaryRestrictions) return false;
        if (
          plusOneHasDietaryRestrictions === "yes" &&
          !plusOneDietaryRestrictions.trim()
        ) {
          return false;
        }
      }
    }

    return true;
  }, [
    guestName,
    guest,
    invitedToCeremony,
    invitedToReception,
    hasSecondaryGuest,
    primaryMorningAttendance,
    secondaryMorningAttendance,
    primaryDinnerAttendance,
    secondaryDinnerAttendance,
    primaryHasDietaryRestrictions,
    primaryDietaryRestrictions,
    secondaryHasDietaryRestrictions,
    secondaryDietaryRestrictions,
    plusOneAllowed,
    partyAttendingDinner,
    bringingPlusOne,
    plusOneName,
    plusOneHasDietaryRestrictions,
    plusOneDietaryRestrictions,
  ]);

  async function handleStart() {
    if (!canContinue || isLoading) return;

    setError("");
    setIsLoading(true);
    setGuest(null);

    try {
      const parts = guestName
        .trim()
        .split(" ")
        .map((part) => part.trim())
        .filter(Boolean);

      if (parts.length < 2) {
        setError("Please enter both first and last name.");
        setHasStarted(false);
        return;
      }

     const fullName = parts.join(" ");

const res = await fetch("/api/rsvp/find", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ fullName }),
});

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Invitation not found.");
        setHasStarted(false);
        return;
      }

      setGuest(data.guest);
      setHasStarted(true);
    } catch (err) {
      console.error("[rsvp/page] lookup failed", err);
      setError("Something went wrong. Please try again.");
      setHasStarted(false);
    } finally {
      setIsLoading(false);
    }
  }

  function resetLookup() {
    setHasStarted(false);
    setGuest(null);
    setError("");
    setSubmitted(false);

    setPrimaryMorningAttendance("");
    setSecondaryMorningAttendance("");
    setPrimaryDinnerAttendance("");
    setSecondaryDinnerAttendance("");

    setPrimaryHasDietaryRestrictions("");
    setPrimaryDietaryRestrictions("");
    setSecondaryHasDietaryRestrictions("");
    setSecondaryDietaryRestrictions("");

    setBringingPlusOne("");
    setPlusOneName("");
    setPlusOneHasDietaryRestrictions("");
    setPlusOneDietaryRestrictions("");
  }

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!canSubmit || !guest) return;

  try {
    // ✅ PRIMARY GUEST
    const primaryPayload = {
      guestName, // must match primary_name in sheet
      ceremony_response: primaryMorningAttendance,
      reception_response: primaryDinnerAttendance,
      dietary_restrictions: primaryDietaryRestrictions || "",
      plus_one_name: bringingPlusOne ? plusOneName : "",
      notes: "",
    };

await fetch("/api/rsvp/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    rowIndex: guest?.rowIndex, // IMPORTANT
    primaryDinnerAttendance,
    secondaryDinnerAttendance,
    primaryMorningAttendance,
    secondaryMorningAttendance,
    primaryDietaryRestrictions,
    secondaryDietaryRestrictions,
    bringingPlusOne,
    plusOneName,
    plusOneDietaryRestrictions,
  }),
});

    setSubmitted(true);

  } catch (err) {
    console.error("Submit failed", err);
  }
}
  return (
    <>
      <BackNav variant="light" />

      <main className="min-h-screen bg-[#f6f3ef] text-[#4f4842]">
        <section className="relative flex min-h-[34vh] items-center justify-center overflow-hidden text-white md:min-h-[55vh]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/rsvp.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 px-5 text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-white/75 md:mb-4 md:text-[12px] md:tracking-[0.4em]">
              RSVP
            </p>

            <h1 className="text-[23px] font-light leading-tight md:text-[56px] lg:text-[72px]">
              We Can’t Wait
              <br />
              to Celebrate 
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-[12px] leading-5 tracking-[0.03em] text-white/75 md:mt-6 md:max-w-xl md:text-[15px] md:leading-7 md:tracking-[0.08em]">
              Please let us know which part of the day you’ll be joining us for.
            </p>
          </div>
        </section>

        <section className="px-4 py-8 md:px-6 md:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 text-center md:mb-12">
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#8b8178] md:text-[12px] md:tracking-[0.4em]">
                FIAT & DEREK
              </p>
              <p className="mt-3 text-[13px] leading-5 text-[#6e655e] md:mt-4 md:text-[15px] md:leading-7">
                Kindly reply by August 31, 2026.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-[18px] border border-[#ddd4cc] bg-[#f3ede7] px-5 py-8 text-center shadow-[0_12px_30px_rgba(79,72,66,0.06)] md:rounded-[28px] md:px-8 md:py-12">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#8b8178] md:text-[12px] md:tracking-[0.35em]">
                  Thank You
                </p>
                <h2 className="mt-3 text-[22px] font-light leading-tight text-[#4f4842] md:mt-4 md:text-[40px]">
                  Your RSVP has been received
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[13px] leading-6 text-[#6e655e] md:mt-5 md:text-[15px] md:leading-8">
                  We’re so excited to celebrate with you in Phuket.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[18px] border border-[#ddd4cc] bg-[#f3ede7] px-4 py-5 shadow-[0_12px_30px_rgba(79,72,66,0.06)] md:rounded-[28px] md:px-8 md:py-10"
              >
                {!hasStarted ? (
                  <div className="space-y-5 md:space-y-6">
                    <div className="text-center">
                      <h2 className="text-[21px] font-light leading-tight md:text-[36px]">
                        Enter Your Name
                      </h2>
                      <p className="mt-3 text-[13px] leading-5 text-[#6e655e] md:text-[15px] md:leading-7">
                        We’ll start with your name, then you can let us know
                        which parts of the celebration you’ll be attending.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="guestName"
                        className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#8b8178] md:text-[12px] md:tracking-[0.25em]"
                      >
                        Full Name
                      </label>
                      <input
                        id="guestName"
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                       placeholder="First and last name (e.g. John Smith)"
                        className="w-full rounded-[14px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[14px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6] md:rounded-[18px] md:text-[16px]"
                      />
                      {error && (
                        <p className="mt-3 text-center text-sm text-red-600">
                          {error}
                        </p>
                      )}
                    </div>

                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={handleStart}
                        disabled={!canContinue || isLoading}
                        className="border border-[#cfc6be] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#4f4842] transition duration-300 hover:bg-[#4f4842] hover:text-[#f6f3ef] disabled:cursor-not-allowed disabled:opacity-50 md:px-8 md:text-[12px] md:tracking-[0.28em]"
                      >
                        {isLoading ? "Searching..." : "Continue"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 md:space-y-10">
                    <div className="text-center">
                      <h2 className="text-[21px] font-light leading-tight md:text-[36px]">
                        Hello, {greetingName}
                      </h2>
                      <p className="mt-3 text-[13px] leading-5 text-[#6e655e] md:text-[15px] md:leading-7">
                        Please let us know which part of the celebration you’ll
                        be joining.
                      </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      {invitedToCeremony && (
                        <div className="rounded-[16px] border border-[#ddd4cc] bg-[#f8f4ef] px-4 py-4 md:rounded-[22px] md:px-5 md:py-5">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b8178] md:text-[12px] md:tracking-[0.35em]">
                            Morning Ceremony
                          </p>
                      

                          <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
                            <PersonAttendanceBlock
                              label={primaryName}
                              question={`Can ${primaryName} make it to the morning ceremony?`}
                              value={primaryMorningAttendance}
                              onChange={setPrimaryMorningAttendance}
                            />

                            {hasSecondaryGuest && (
                              <PersonAttendanceBlock
                                label={secondaryName}
                                question={`Can ${secondaryName} make it to the morning ceremony?`}
                                value={secondaryMorningAttendance}
                                onChange={setSecondaryMorningAttendance}
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {invitedToReception && (
                        <div className="rounded-[16px] border border-[#ddd4cc] bg-[#f8f4ef] px-4 py-4 md:rounded-[22px] md:px-5 md:py-5">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b8178] md:text-[12px] md:tracking-[0.35em]">
                            Dinner Reception
                          </p>

                          <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
                            <PersonAttendanceBlock
                              label={primaryName}
                              question={`Can ${primaryName} make it to the dinner reception?`}
                              value={primaryDinnerAttendance}
                              onChange={setPrimaryDinnerAttendance}
                            />

                            {hasSecondaryGuest && (
                              <PersonAttendanceBlock
                                label={secondaryName}
                                question={`Can ${secondaryName} make it to the dinner reception?`}
                                value={secondaryDinnerAttendance}
                                onChange={setSecondaryDinnerAttendance}
                              />
                            )}
                          </div>
                        </div>
                      )}

                      <div className="rounded-[16px] border border-[#ddd4cc] bg-[#f8f4ef] px-4 py-4 md:rounded-[22px] md:px-5 md:py-5">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b8178] md:text-[12px] md:tracking-[0.35em]">
                          Dietary Restrictions
                        </p>
                        <h3 className="mt-2 text-[17px] font-light text-[#4f4842] md:text-[24px]">
                          Please share any dietary restrictions.
                        </h3>

                        <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
                          <DietaryBlock
                            personName={primaryName}
                            hasRestrictions={primaryHasDietaryRestrictions}
                            setHasRestrictions={setPrimaryHasDietaryRestrictions}
                            restrictions={primaryDietaryRestrictions}
                            setRestrictions={setPrimaryDietaryRestrictions}
                          />

                          {hasSecondaryGuest && (
                            <DietaryBlock
                              personName={secondaryName}
                              hasRestrictions={secondaryHasDietaryRestrictions}
                              setHasRestrictions={setSecondaryHasDietaryRestrictions}
                              restrictions={secondaryDietaryRestrictions}
                              setRestrictions={setSecondaryDietaryRestrictions}
                            />
                          )}
                        </div>
                      </div>

                      {plusOneAllowed &&
                        invitedToReception &&
                        partyAttendingDinner && (
                          <div className="rounded-[16px] border border-[#ddd4cc] bg-[#f8f4ef] px-4 py-4 md:rounded-[22px] md:px-5 md:py-5">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b8178] md:text-[12px] md:tracking-[0.35em]">
                              Plus One
                            </p>
                            <h3 className="mt-2 text-[17px] font-light text-[#4f4842] md:text-[24px]">
                              Will you be bringing a guest?
                            </h3>

                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                              <button
                                type="button"
                                onClick={() => setBringingPlusOne("yes")}
                                className={`rounded-[14px] border px-3 py-3 text-[10px] uppercase tracking-[0.14em] transition md:text-[11px] ${
                                  bringingPlusOne === "yes"
                                    ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
                                    : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
                                }`}
                              >
                                Yes
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setBringingPlusOne("no");
                                  setPlusOneName("");
                                  setPlusOneHasDietaryRestrictions("");
                                  setPlusOneDietaryRestrictions("");
                                }}
                                className={`rounded-[14px] border px-3 py-3 text-[10px] uppercase tracking-[0.14em] transition md:text-[11px] ${
                                  bringingPlusOne === "no"
                                    ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
                                    : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
                                }`}
                              >
                                No
                              </button>
                            </div>

                            {bringingPlusOne === "yes" && (
                              <div className="mt-4 space-y-4">
                                <div>
                                  <label
                                    htmlFor="plusOneName"
                                    className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#8b8178] md:text-[11px]"
                                  >
                                    Guest Name
                                  </label>
                                  <input
                                    id="plusOneName"
                                    type="text"
                                    value={plusOneName}
                                    onChange={(e) =>
                                      setPlusOneName(e.target.value)
                                    }
                                    placeholder="Your guest's full name"
                                    className="w-full rounded-[14px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[14px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6]"
                                  />
                                </div>

                                <div className="border-t border-[#e3dbd3] pt-4">
                                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#8b8178] md:text-[11px]">
                                    Guest Dietary Restrictions
                                  </p>
                                  <h4 className="mt-2 text-[15px] font-light leading-snug text-[#4f4842] md:text-[19px]">
                                    Does your guest have any dietary
                                    restrictions?
                                  </h4>

                                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPlusOneHasDietaryRestrictions("yes")
                                      }
                                      className={`rounded-[14px] border px-3 py-3 text-[10px] uppercase tracking-[0.14em] transition md:text-[11px] ${
                                        plusOneHasDietaryRestrictions === "yes"
                                          ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
                                          : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
                                      }`}
                                    >
                                      Yes
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setPlusOneHasDietaryRestrictions("no");
                                        setPlusOneDietaryRestrictions("");
                                      }}
                                      className={`rounded-[14px] border px-3 py-3 text-[10px] uppercase tracking-[0.14em] transition md:text-[11px] ${
                                        plusOneHasDietaryRestrictions === "no"
                                          ? "border-[#4f4842] bg-[#4f4842] text-[#f6f3ef]"
                                          : "border-[#d5ccc4] bg-[#faf7f3] text-[#4f4842] hover:border-[#b9afa6]"
                                      }`}
                                    >
                                      No
                                    </button>
                                  </div>

                                  {plusOneHasDietaryRestrictions === "yes" && (
                                    <div className="mt-3">
                                      <label
                                        htmlFor="plusOneDietaryRestrictions"
                                        className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#8b8178] md:text-[11px]"
                                      >
                                        What are your guest&apos;s dietary
                                        restrictions?
                                      </label>
                                      <textarea
                                        id="plusOneDietaryRestrictions"
                                        value={plusOneDietaryRestrictions}
                                        onChange={(e) =>
                                          setPlusOneDietaryRestrictions(
                                            e.target.value
                                          )
                                        }
                                        rows={3}
                                        placeholder="Please let us know"
                                        className="w-full rounded-[14px] border border-[#d9d0c7] bg-[#faf7f3] px-4 py-3 text-[14px] text-[#4f4842] outline-none placeholder:text-[#a59a90] focus:border-[#b9afa6]"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                      <div className="flex flex-col items-center gap-4 pt-1">
                        <button
                          type="submit"
                          disabled={!canSubmit}
                          className="border border-[#cfc6be] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#4f4842] transition duration-300 hover:bg-[#4f4842] hover:text-[#f6f3ef] disabled:cursor-not-allowed disabled:opacity-50 md:px-8 md:text-[12px] md:tracking-[0.28em]"
                        >
                          Submit RSVP
                        </button>

                        <button
                          type="button"
                          onClick={resetLookup}
                          className="text-[10px] uppercase tracking-[0.18em] text-[#8b8178] transition hover:text-[#4f4842] md:text-[12px] md:tracking-[0.25em]"
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