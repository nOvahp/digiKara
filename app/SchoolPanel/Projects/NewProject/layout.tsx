"use client";

import { NewProjectProvider } from "./NewProjectContext";

export default function NewProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NewProjectProvider>
            {children}
        </NewProjectProvider>
    );
}
