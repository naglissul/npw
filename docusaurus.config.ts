import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "No Point Writings",
  tagline: "blog 'n stuff",
  favicon: "img/favicon.ico",
  url: "https://www.npw.lt",
  baseUrl: "/",
  organizationName: "naglissul",
  projectName: "npw",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          remarkPlugins: [require("remark-math")],
          rehypePlugins: [require("rehype-katex")],
        },
        blog: {
          remarkPlugins: [require("remark-math")],
          rehypePlugins: [require("rehype-katex")],
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "No Point Writings",
      logo: {
        alt: "NPW logo",
        src: "img/logo.svg",
      },
      items: [
        { to: "/blog", label: "BLOG", position: "left" },
        { to: "/docs/code", label: "Code", position: "left" },
        { to: "/docs/write", label: "Write", position: "left" },
        { to: "/docs/teach", label: "Teach", position: "left" },
        { to: "/docs/music", label: "Music", position: "left" },
        {
          href: "https://github.com/naglissul/npw",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Content",
          items: [
            {
              label: "Content",
              to: "/docs",
            },
          ],
        },
        {
          title: "Socials",
          items: [
            {
              label: "Facebook",
              href: "https://www.facebook.com/profile.php?id=100014978984368",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/naglisaudrius/",
            },
            {
              label: "TikTok",
              href: "https://www.tiktok.com/@naglisaudrius",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Email",
              to: "mailto:naglis.suliokas@gmail.com",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/@naglisaudrius",
            },
            {
              label: "GitHub",
              href: "https://github.com/naglissul",
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Naglis Šuliokas. v3.0.0 Last updated 2024-10-08`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
