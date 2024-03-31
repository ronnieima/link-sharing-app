import { create } from "zustand";

export type Platform = {
  github: {
    platform: string;
    value: string;
    link: string;
    icon: string;
    color: string;
  };
  youtube: {
    platform: string;
    value: string;
    link: string;
    icon: string;
    color: string;
  };
  linkedin: {
    platform: string;
    value: string;
    link: string;
    icon: string;
    color: string;
  };
};
export type PlatformKeys = "github" | "youtube" | "linkedin";

type LinkState = {
  platforms: Platform;
};

export const useLinkStore = create<LinkState>()((set) => ({
  platforms: {
    github: {
      platform: "GitHub",
      value: "github",
      link: "github.com",
      icon: "/images/icon-github.svg",
      color: "#1A1A1A",
    },
    youtube: {
      platform: "Youtube",
      value: "youtube",
      link: "youtube.com",
      icon: "/images/icon-youtube.svg",
      color: "#EE3939",
    },
    linkedin: {
      platform: "LinkedIn",
      value: "linkedin",
      link: "linkedin.com",
      icon: "LinkedInIcon,",
      color: "#2D68FF",
    },
  },
}));
