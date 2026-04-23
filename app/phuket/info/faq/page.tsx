"use client";

import BackNav from "../../../components/BackNav";
import HeaderIdentity from "../../../components/HeaderIdentity";
import { useState } from "react";

const faqs = [
	{
		question: "When should I RSVP by?",
		answer:
			"Please RSVP by August 31, 2026 so we can finalize the celebration details.",
	},
	{
		question: "Where will the wedding take place?",
		answer:
			"Our wedding celebration will take place in Phuket, Thailand. More specific venue details can be found on the Venue page.",
	},
	{
  question: "What is the dress code?",
  answer:
    "For the morning ceremony, traditional Thai attire is warmly encouraged. Otherwise, we recommend comfortable attire suited to a warm tropical setting.\n\nFor the evening reception, beach formal — refined, lightweight pieces for a seaside celebration.",
},
	{
  question: "Where should I stay?",
  answer:
    "Guests are welcome to stay at Thavorn Beach Village Resort or at nearby hotels such as Wyndham Grand Phuket Kalim Bay, The Naka Phuket, or other accommodations in the surrounding area.",
},
	{
		question: "What airport should I fly into?",
		answer:
			"Guests traveling internationally will typically arrive in Bangkok (BKK) first, then take a connecting flight to Phuket (HKT).",
	},
	{
		question: "How far is the hotel from the airport?",
		answer:
			"The drive from Phuket International Airport to Thavorn Beach Village Resort is usually around 45 to 60 minutes, depending on traffic.",
	},
	{
		question: "Can I bring a plus-one?",
		answer:
			"Please refer to your invitation for your specific guest count. If you have any questions, feel free to reach out to us directly.",
	},
	{
		question: "Are children invited?",
		answer:
			"Please refer to your invitation for details regarding children. If you are unsure, feel free to ask us.",
	},
	{
		question: "What should I do while in Phuket?",
		answer:
			"We’ll be sharing some of our favorite recommendations on the Things To Do page, including beaches, markets, and local spots to explore.",
	},
];

function FAQItem({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="border-t border-[#ddd4cc] py-5">
			<button
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				className="flex w-full items-center justify-between gap-6 text-left"
			>
				<span className="text-[16px] md:text-[18px] font-light text-[#4f4842]">
					{question}
				</span>
				<span className="text-[#8b8178] text-xl leading-none">
					{open ? "−" : "+"}
				</span>
			</button>

			<div
				className={`grid transition-all duration-300 ${
					open ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"
				}`}
			>
				<div className="overflow-hidden">
					<p className="max-w-2xl text-[15px] leading-8 text-[#6e655e]">
						{answer}
					</p>
				</div>
			</div>
		</div>
	);
}

export default function FAQPage() {
	return (
		<>
			<HeaderIdentity />
			<BackNav variant="light" />

			<main className="bg-[#f6f3ef] text-[#4f4842]">
				<section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden text-white">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{ backgroundImage: "url('/photos/faq.jpg')" }}
					/>
					<div className="absolute inset-0 bg-black/35" />

					<div className="relative z-10 px-6 text-center">
						<p className="mb-4 text-[12px] uppercase tracking-[0.45em] text-white/75">
							FAQ
						</p>

						<h1 className="text-[34px] font-light leading-tight md:text-[56px] lg:text-[72px]">
							Frequently Asked
							<br />
							Questions
						</h1>

						<p className="mx-auto mt-6 max-w-xl text-sm leading-7 tracking-[0.08em] text-white/75 md:text-[15px]">
							A few helpful details for our wedding weekend in Phuket.
						</p>
					</div>
				</section>

				<section className="px-6 py-20 md:py-28">
					<div className="mx-auto max-w-4xl">
						<div className="mb-14 text-center">
							<p className="text-[12px] uppercase tracking-[0.45em] text-[#8b8178]">
								FIAT & DEREK
							</p>
						</div>

						<div>
							{faqs.map((item) => (
								<FAQItem
									key={item.question}
									question={item.question}
									answer={item.answer}
								/>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}