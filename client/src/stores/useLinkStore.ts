import { create } from "zustand";

export const defaultPlatforms = [
  {
    platform: "Github",
    link: "https://www.github.com/",
    icon: "/images/icon-github.svg",
  },
  {
    platform: "Youtube",
    link: "https://www.youtube.com/",
    icon: "/images/icon-youtube.svg",
  },
  {
    platform: "LinkedIn",
    link: "https://www.linkedin.com/",
    icon: "/images/icon-linkedin.svg",
  },
];

export type Platform = (typeof defaultPlatforms)[0];

type LinkState = {
  preview: Platform[];
  platforms: Platform[];
  handleAddLink: () => void;
  handleRemoveLink: (index: number) => void;
};

export const useLinkStore = create<LinkState>()((set) => ({
  preview: [],
  platforms: defaultPlatforms.slice(),
  handleAddLink: () =>
    set((state) => {
      if (
        state.platforms.length > 0 &&
        state.preview.length < defaultPlatforms.length
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
