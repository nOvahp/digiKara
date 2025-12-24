"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { addTimche } from "../TimcheStorage";

interface Step1Data {
    name: string;
    category: "project" | "product";
    description: string;
    manager: string;
}

interface Member {
    id: number;
    name: string;
    role: string;
    type: 'manager' | 'student';
    color: string;
}

interface Step3Data {
    members: Member[];
}

interface Step4Data {
    studyField: string;
    grade: string;
    skill: string;
}

interface NewTimcheContextType {
    step1Data: Step1Data | null;
    step3Data: Step3Data | null;
    step4Data: Step4Data | null;
    saveStep1: (data: Step1Data) => void;
    saveStep3: (data: Step3Data) => void;
    saveStep4: (data: Step4Data) => void;
    completeCreation: () => void;
}

const NewTimcheContext = createContext<NewTimcheContextType | undefined>(undefined);

export const NewTimcheProvider = ({ children }: { children: ReactNode }) => {
    const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
    const [step3Data, setStep3Data] = useState<Step3Data | null>({
        members: [
             { id: 1, name: "علی رضایی", role: "مسئول تیمچه", type: "manager", color: "bg-[#FF5252]" },
             { id: 2, name: "امیرحسین محمدی", role: "دانش آموز", type: "student", color: "bg-[#448AFF]" },
             { id: 3, name: "بهروز حسینی", role: "دانش آموز", type: "student", color: "bg-[#69F0AE]" },
        ]
    });
    const [step4Data, setStep4Data] = useState<Step4Data | null>(null);

    const saveStep1 = (data: Step1Data) => setStep1Data(data);
    const saveStep3 = (data: Step3Data) => setStep3Data(data);
    const saveStep4 = (data: Step4Data) => setStep4Data(data);

    const completeCreation = () => {
        if (!step1Data) return;

        // Construct the new Timche object
        const newTimche = {
            id: Date.now(), // Generate ID
            title: step1Data.name,
            boothCount: step3Data ? `${step3Data.members.length} نفر` : "0 نفر",
            manager: step1Data.manager,
            lastUpdate: "همین الان",
            performance: "جدید",
            totalSales: "۰ ریال",
            status: "pending" as const,
            image: "/Timche3.png" // Fallback data as requested
        };

        addTimche(newTimche);
        
        // Clear state (optional, or kept for Success page)
    };

    return (
        <NewTimcheContext.Provider value={{
            step1Data,
            step3Data,
            step4Data,
            saveStep1,
            saveStep3,
            saveStep4,
            completeCreation
        }}>
            {children}
        </NewTimcheContext.Provider>
    );
};

export const useNewTimche = () => {
    const context = useContext(NewTimcheContext);
    if (!context) {
        throw new Error("useNewTimche must be used within a NewTimcheProvider");
    }
    return context;
};
