'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of our project data
export interface ProjectData {
  // Step 1
  title: string;
  projectType: 'product' | 'project';
  timche: string;
  mentor: string;
  schedule: string;
  needsSupport: boolean;
  supportType?: string;

  // Step 2
  staffCount: string;
  equipment?: string;
  consumables?: string;

  // Step 3
  estimatedCost: string;
  estimatedRevenue: string;
  estimatedProfit: string;

  // Step 4
  schoolShare: number;
  staffShares: unknown[];
}

interface NewProjectContextType {
  projectData: Partial<ProjectData>;
  updateProjectData: (data: Partial<ProjectData>) => void;
  resetProjectData: () => void;
  saveProject: () => void;
}

const NewProjectContext = createContext<NewProjectContextType | undefined>(undefined);

export const NewProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectData, setProjectData] = useState<Partial<ProjectData>>({});

  const updateProjectData = (data: Partial<ProjectData>) => {
    setProjectData((prev) => ({ ...prev, ...data }));
  };

  const resetProjectData = () => {
    setProjectData({});
  };

  const saveProject = () => {
    // Save to localStorage so ProjectManagement can read it
    // In a real app, this would be an API call
    const existingProjects = JSON.parse(localStorage.getItem('digikara_projects') || '[]');
    const newProject = {
      id: Date.now(),
      productName: projectData.title,
      count: 0, // Default/Mock
      deliveryTime: projectData.schedule,
      price: projectData.estimatedRevenue,
      statusLabel: 'در انتظار',
      // Additional mappings to match ProjectManagement table structure or card structure
      team: projectData.timche,
      // ... store full data if needed
    };
    localStorage.setItem('digikara_projects', JSON.stringify([newProject, ...existingProjects]));
  };

  return (
    <NewProjectContext.Provider
      value={{ projectData, updateProjectData, resetProjectData, saveProject }}
    >
      {children}
    </NewProjectContext.Provider>
  );
};

export const useNewProject = () => {
  const context = useContext(NewProjectContext);
  if (context === undefined) {
    throw new Error('useNewProject must be used within a NewProjectProvider');
  }
  return context;
};
