// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Email Sending Guide",
  tagline: "Email sending for SaaS builders? It's not rocket science.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://sending.guide",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "postalsys", // Usually your GitHub org/user name.
  projectName: "email-guide", // Usually your repo name.

  deploymentBranch: "master",

  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  scripts: [
    {
      src: "https://plausible.srv.dev/js/script.js",
      defer: true,
    },
  ],

  plugins: [
    [
      "@grnet/docusaurus-terminology",
      {
        termsDir: "./docs/terms",
        docsDir: "./docs/",
        glossaryFilepath: "./docs/glossary.md",
      },
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Email Sending Guide for SaaS Builders",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "guideSidebar",
            position: "left",
            label: "Guide",
          },
          {
            href: "/docs/about",
            position: "left",
            label: "About",
          },
          {
            href: "https://github.com/postalsys/email-guide",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "About",
                to: "/docs/about",
              },
              {
                label: "Glossary",
                to: "/docs/glossary",
              },
            ],
          },
          {
            title: "Useful software",
            items: [
              {
                label: "EmailEngine",
                href: "https://emailengine.app/",
              },
              {
                label: "Nodemailer",
                href: "https://nodemailer.com/",
              },
              {
                label: "SMTP-Server",
                href: "https://nodemailer.com/extras/smtp-server/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/postalsys/email-guide",
              },
              {
                label: "Postal Systems",
                href: "https://postalsys.com/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Postal Systems OÜ. Powered by <a href="https://emailengine.app" class="footer__link-item">EmailEngine</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["php"],
      },
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: false,

      mermaid: {
        theme: { light: "default", dark: "dark" },
      },
    }),
};

module.exports = config;
