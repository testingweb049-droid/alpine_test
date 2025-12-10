"use client"

import { JSX, useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FaqsSection(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "When Is Your Customer Service Available?",
      answer: "We are available daily from 6:00 a.m. to 21:00 p.m. by phone, WhatsApp or email."
    },
    {
      question: "Calculate Waiting Time For Pickup?",
      answer: "1 hour of free waiting time after the plane has landed –\n15 minutes of free waiting time for all other pick-up locations.\nFor every 15 minutes of waiting time, we will charge CHF 15.00.\nIf you arrive 1–3 minutes late after the free waiting time has expired, we will of course not charge you anything"
    },
    {
      question: "What Happens If My Plane Is Delayed?",
      answer: "Thanks to our flight tracking system, we're informed of any delays and ensure your driver is on site when you land. There are no additional charges for flight-related delays."
    },
    {
      question: "How Will I Be Received At The Airport?",
      answer: "Our meet & greet service ensures your chauffeur will be waiting for you in the arrivals area with a name sign.\nWe also offer real-time flight monitoring, allowing us to anticipate delays and ensure a punctual pickup at no additional cost."
    },
    {
      question: "Do You Also Offer Group Bookings And Corporate Contracts?",
      answer: "Yes, we offer group transfers and corporate contracts.\nFor customized arrangements, please contact us at info@alpine-prestige-rides.ch"
    },
    {
      question: "What Language Do Your Drivers Speak?",
      answer: "Our drivers speak English, German, Spanish, Portuguese"
    }
  ];

  return (
    <section className="faqs-section py-12 bg-secondary">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-primary mb-2">FAQ&apos;s</h2>
        <div className="mb-8 text-center">
        </div>

        {/* Only the 6 specified FAQs */}
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md mb-4">
            <button
              className="w-full text-left p-6 font-semibold text-lg flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="text-xl text-gray-500">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-600 whitespace-pre-line">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}