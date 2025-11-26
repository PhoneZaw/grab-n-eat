"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, browse our restaurants, select items, add them to your cart, and proceed to checkout. Provide your payment information to complete the order.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, and cash on pickup in select areas.",
  },
  {
    question: "How long does take to pick-up?",
    answer:
      "Preparation times vary based on the restaurant, your location, and current demand. Typically, orders will be ready within 30-45 minutes. You can track the status of your order in real-time.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, you'll receive a real-time tracking link once your order is confirmed. You can see when the restaurant starts preparing your food and when you can pick it up.",
  },
  {
    question: "What if there's an issue with my order?",
    answer:
      "Contact our customer support team immediately through the app or website if you encounter any issues. We'll work to resolve the problem quickly.",
  },
  {
    question: "Are there any delivery fees?",
    answer: "There is no delivery fee for pickup orders.",
  },
  {
    question: "How can I partner with you for my restaurant?",
    answer:
      "If you're interested in partnering with us, please contact our business development team through the website or app.",
  },
  {
    question: "Can I schedule an order for later?",
    answer:
      "Yes, you can schedule orders in advance. Select your desired pick-up time during checkout.",
  },
  {
    question: "How do I leave a review for my order?",
    answer:
      "After your order is completed, you'll see 'leave a review' button in order detail and review your experience.",
  },
];

export default function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState(faqs);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const filtered = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFAQs(filtered);
  }, [searchTerm]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#004E64]">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#00A5CF] focus:ring-[#FF6B35]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00A5CF]" />
            </div>
          </div>

          {filteredFAQs.length === 0 ? (
            <p className="text-center text-[#37474F]">
              No matching questions found. Please try a different search term.
            </p>
          ) : (
            filteredFAQs.map((faq, index) => (
              <Card key={index} className="mb-4 border-[#00A5CF]">
                <CardHeader className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 text-left"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                  >
                    <CardTitle className="text-lg font-semibold text-[#004E64]">
                      {faq.question}
                    </CardTitle>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-[#FF6B35]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#FF6B35]" />
                    )}
                  </Button>
                </CardHeader>
                {openIndex === index && (
                  <CardContent className="pt-0 pb-4 px-4">
                    <CardDescription className="text-[#37474F]">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
