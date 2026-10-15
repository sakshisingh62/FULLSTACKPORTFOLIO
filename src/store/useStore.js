import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      
      selectedProject: null,
      setSelectedProject: (project) => set({ selectedProject: project }),
      
      githubStats: null,
      setGithubStats: (stats) => set({ githubStats: stats }),
      
      leetcodeStats: null,
      setLeetcodeStats: (stats) => set({ leetcodeStats: stats }),

      // Butterfly Intro coordination: 'perched' | 'takeoff' | 'completed'
      introPhase: 'perched',
      setIntroPhase: (phase) => set({ introPhase: phase }),
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
);
