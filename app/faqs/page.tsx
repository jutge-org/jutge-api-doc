"use client"

import PageWidth from "@/components/page-width"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface FaqItem {
    question: string
    answer: string
    index: number
}

const faqs: Omit<FaqItem, "index">[] = [
    {
        question: "Who can use this API?",
        answer: "Any registered user of Jutge.org can use the API, provided that this access is requested at SOMEPAGE.",
    },
    {
        question: "Is this API stable?",
        answer: "No, the current state of this API is experimental and not stable. Changes can be expected. If you want to build a large application on Jutge.org's API, please contact first the administrators.",
    },
    {
        question: "Is this a REST API?",
        answer: "No, this is not a REST API, it is remote procedure call API (RPC API).",
    },
    {
        question: "How do I start using the API?",
        answer: "Please download one of the available clients and write your application using the provided functions and types in your favorite language.",
    },
    {
        question: "Will there be more endpoints in the future?",
        answer: "Yes, there current state of the API covers allmost all functionalities of students and instructors of Jutge.org, but in the near future, new endpoints for exams, contests, competitions... will be implemented.",
    },
    {
        question: "What languages are supported by the API clients?",
        answer: "The API clients are available in multiple languages including Python, TypeScript, JavaScript, PHP and C++. More languages may be supported in the future.",
    },
    {
        question: "Can I use the API without using the provided clients?",
        answer: "Yes, there is a single POST URL at https://api.jutge.org/api using multipart form encoding as input and output you can leverage. However, take into account we consider this a low level implementation detail that my change in the future.",
    },
    {
        question: "Is there any rate limiting on the API?",
        answer: "Yes, to ensure fair usage, there are rate limits in place.",
    },
    {
        question: "Are there any usage examples available?",
        answer: "Yes, the examples page includes several usage examples to help you get started with the API.",
    },
    {
        question: "How can I report a bug or request a feature?",
        answer: "Please report bugs or request features by contacting the administrators.",
    },
    {
        question: "How can I help?",
        answer: "Thanks for asking! Please contact the administrators.",
    },
]

export default function FaqPage() {
    // based on https://kokonutui.com/docs/components/faq

    return (
        <PageWidth className="mx-auto pt-2 min-h-screen">
            <section className="w-full bg-linear-to-b from-transparent via-gray-50/50 to-transparent dark:from-transparent dark:via-white/[0.02] dark:to-transparent">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto text-center mb-12"></div>
                    <div className="max-w-2xl mx-auto space-y-2">
                        {faqs.map((faq, index) => (
                            <FaqElement key={index} {...faq} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </PageWidth>
    )
}

function FaqElement({ question, answer, index }: FaqItem) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className={cn(
                "group rounded-lg border-[0.5px] border-gray-200/50 dark:border-gray-800/50",
                "transition-all duration-200 ease-in-out",
                isOpen
                    ? "bg-linear-to-br from-white via-gray-50/50 to-white dark:from-white/5 dark:via-white/2 dark:to-white/5"
                    : "hover:bg-gray-50/50 dark:hover:bg-white/[0.02]",
            )}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4"
            >
                <h3
                    className={cn(
                        "text-base font-medium transition-colors duration-200 text-left",
                        "text-gray-700 dark:text-gray-300",
                        isOpen && "text-gray-900 dark:text-white",
                    )}
                >
                    {question}
                </h3>
                <div
                    className={cn(
                        "p-0.5 rounded-full shrink-0",
                        "transition-colors duration-200",
                        isOpen ? "text-primary" : "text-gray-400 dark:text-gray-500",
                    )}
                >
                    {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </div>
            </button>
            {isOpen && (
                <div className="px-6 pb-4 pt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    )
}
