import { Github, LinkedinIcon, Youtube } from "lucide-react";
import DevtoIcon from "@/../public/images/icon-devto.svg";

export const platforms = [
  {
    platform: "GitHub",
    value: "github",
    link: "github.com",
    icon: <Github />,
    color: "#1A1A1A",
  },
  {
    platform: "Youtube",
    value: "youtube",
    link: "youtube.com",
    icon: <Youtube />,
    color: "#EE3939",
  },
  {
    platform: "LinkedIn",
    value: "linkedin",
    link: "linkedin.com",
    icon: <LinkedinIcon />,
    color: "#2D68FF",
  },
  {
    platform: "Dev.to",
    value: "devto",
    link: "dev.to",
    icon: <DevtoIcon className="text-purple" />,
    color: "#8A1A50",
  },
  {
    platform: "Codewars",
    value: "codewars",
    link: "codewars.com",
    icon: <img src="/images/icon-codewars.svg" />,
    color: "#8A1A50",
  },
  {
    platform: "freeCodeCamp",
    value: "freeCodeCamp",
    link: "freecodecamp.org",
    icon: <img src="/images/icon-freecodecamp.svg" />,
    color: "#302267",
  },
  {
    platform: "Twitch",
    value: "twitch",
    link: "twitch.tv",
    icon: <img src="/images/icon-twitch.svg" />,
    color: "#6441a5",
  },
  {
    platform: "CodePen",
    value: "codepen",
    link: "codepen.io",
    icon: <img src="/images/icon-codepen.svg" />,
    color: "#066e34",
  },
  {
    platform: "GitLab",
    value: "gitlab",
    link: "gitlab.com",
    icon: <img src="/images/icon-gitlab.svg" />,
    color: "#FC6D26",
  },
  {
    platform: "Twitter",
    value: "twitter",
    link: "twitter.com",
    icon: <img src="/images/icon-twitter.svg" />,
    color: "#1DA1F2",
  },
  {
    platform: "Frontend Mentor",
    value: "frontendmentor",
    link: "frontendmentor.io",
    icon: <img src="/images/icon-frontend-mentor.svg" />,
    color: "#1DA1F2",
  },
  {
    platform: "Hashnode",
    value: "hashnode",
    link: "hashnode.com",
    icon: <img src="/images/icon-hashnode.svg" />,
    color: "#3067ff",
  },
  {
    platform: "Facebook",
    value: "facebook",
    link: "facebook.com",
    icon: <img src="/images/icon-facebook.svg" />,
    color: "#415e9b",
  },
  {
    platform: "Stack Overflow",
    value: "stackoverflow",
    link: "stackoverflow.com",
    icon: <img src="/images/icon-stack-overflow.svg" />,
    color: "#f4842b",
  },
];