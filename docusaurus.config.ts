import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'tscircuit docs',
  favicon: 'logo/ts.svg',

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '',

  organizationName: 'tsciuit',
  projectName: 'tscircuit',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          id: 'default', // Default docs instance
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api-reference',
        routeBasePath: 'api-reference',
        sidebarPath: './sidebars.ts',
      },
    ],
  ],

  themeConfig: {
    navbar: {
      logo: {
        alt: 'TsCircuit Logo',
        src: 'logo/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar', // Matches the sidebar ID for "docs"
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          label: 'API Reference',
          docsPluginId: 'api'
        },
        {
          href: 'mailto:contact@tscircuit.com',
          label: 'Support',
          position: 'right',
        },
        {
          href: 'https://tscircuit.com/trending',
          label: 'Find Packages',
          position: 'right',
        },
        {
          href: 'https://github.com/tscircuit/tscircuit',
          position: 'right',
          className: 'header-github-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Explore',
          items: [
            {
              label: 'Newest Snippets',
              href: 'https://tscircuit.com/newest',
            },
            {
              label: 'Tutorial',
              to: '/docs/quickstart',
            },
          ],
        },
        {
          title: 'Follow',
          items: [
            {
              label: 'Blog',
              href: 'https://blog.tscircuit.com/',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/tscircuit',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/V7FGE5ZCbA',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/tscircuit/tscircuit',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@seveibar',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Terms of Service',
              href: 'https://registry.tscircuit.com/legal/terms-of-service.html',
            },
            {
              label: 'Privacy Policy',
              href: 'https://registry.tscircuit.com/legal/privacy-policy.html',
            },
            {
              label: 'contact@tscircuit.com',
              href: 'mailto:contact@tscircuit.com'
            }
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} tscircuit, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
