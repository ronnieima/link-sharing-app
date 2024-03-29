import { create } from "zustand";

export const platforms: Platform[] = [
  {
    platform: "GitHub",
    value: "github",
    link: "https://www.github.com/",
    icon: "/images/icon-github.svg",
  },
  {
    platform: "Youtube",
    value: "youtube",
    link: "https://www.youtube.com/",
    icon: "/images/icon-youtube.svg",
  },
  {
    platform: "LinkedIn",
    value: "linkedin",
    link: "https://www.linkedin.com/",
    icon: "/images/icon-linkedin.svg",
  },
];

export type Platform = {
  platform: string;
  value: string;
  link: string;
  icon: string;
};
export type PlatformKeys = "github" | "youtube" | "linkedin";

type LinkState = {
  preview: Platform[];
  platforms: Platform[];
  handleAddLink: () => void;
  handleRemoveLink: (index: number) => void;
};

export const useLinkStore = create<LinkState>()((set) => ({
  preview: [],
  platforms: platforms.slice(),
  handleAddLink: () =>
    set((state) => {
      if (
        state.platforms.length > 0 &&
        state.preview.length < platforms.length
      ) {
        const newPlatform = state.platforms.pop();
        if (newPlatform) {
          return {
            ...state,
            platforms: [...state.platforms],
            preview: [...state.preview, newPlatform],
          };
        }
      }
      return state;
    }),
  handleRemoveLink: (index: number) =>
    set((state) => {
      const deletedLink = state.preview.splice(index, 1);

      return {
        ...state,
        platforms: [...state.platforms, ...deletedLink],
        preview: [...state.preview],
      };
    }),
}));
