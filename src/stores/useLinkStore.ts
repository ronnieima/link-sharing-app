import { create } from "zustand";

// export const platforms: Platform[] = [
//   {
//     platform: "GitHub",
//     value: "github",
//     link: "https://www.github.com/",
//     icon: "/images/icon-github.svg",
//   },
//   {
//     platform: "Youtube",
//     value: "youtube",
//     link: "https://www.youtube.com/",
//     icon: "/images/icon-youtube.svg",
//   },
//   {
//     platform: "LinkedIn",
//     value: "linkedin",
//     link: "https://www.linkedin.com/",
//     icon: "/images/icon-linkedin.svg",
//   },
// ];

export const platforms = {
  github: {
    platform: "GitHub",
    value: "github",
    link: "https://www.github.com/",
    icon: "/images/icon-github.svg",
  },
  youtube: {
    platform: "Youtube",
    value: "youtube",
    link: "https://www.youtube.com/",
    icon: "/images/icon-youtube.svg",
  },
  linkedin: {
    platform: "LinkedIn",
    value: "linkedin",
    link: "https://www.linkedin.com/",
    icon: "/images/icon-linkedin.svg",
  },
};

export type Platform = {
  platform: string;
  value: string;
  link: string;
  icon: string;
};
export type PlatformKeys = "github" | "youtube" | "linkedin";

type LinkState = {
  counter: number;
  links: number[];
  incCounter: () => void;
  removeLink: (index: number) => void;
};

export const useLinkStore = create<LinkState>()((set) => ({
  counter: 0,
  links: [],
  incCounter: () =>
    set((state) => ({
      counter: state.counter + 1,
    })),
  removeLink: (index) => set((state) => ({ counter: state.counter - 1 })),
}));
