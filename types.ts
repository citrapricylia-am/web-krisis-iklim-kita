
import React from 'react';

export type HelpType = 'human' | 'ecological' | 'land' | 'production';

export interface HelpContent {
  id: HelpType;
  letter: string;
  title: string;
  subtitle: string;
  description: React.ReactNode; // Text shown on the card front
  modalDescription?: React.ReactNode | ((onNavigate: (id: HelpType) => void) => React.ReactNode); // Text shown inside the modal
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface FactItem {
  value: string;
  label: string;
  description: string;
}
