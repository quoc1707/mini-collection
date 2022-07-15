import darkTheme from 'prism-react-renderer/themes/nightOwl'
import theme from 'prism-react-renderer/themes/nightOwlLight'

const sidebarPath = require.resolve('./src/utils/sidebar.js')
const customCss = require.resolve('./src/styles/custom.css')

const config = {
    title: 'Mini Collection',
    tagline: 'A minimal collection of helpful functions, all in TypeScript.',
    url: 'https://quoc1707.github.io',
    baseUrl: '/mini-collection/',
    trailingSlash: false,
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'assets/icons/favicon.ico',
    organizationName: 'quoc1707',
    projectName: 'mini-collection',
    staticDirectories: ['public'],
    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath,
                    editUrl:
                        'https://github.com/quoc1707/mini-collection/tree/main/',
                },
                theme: {
                    customCss,
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.8,
                },
            },
        ],
    ],
    themeConfig: {
        metadata: [{ name: 'keywords', content: 'code, snippet' }],
        navbar: {
            title: 'Mini Collection',
            hideOnScroll: true,
            logo: {
                alt: 'Mini Collection',
                src: 'assets/icons/logo.svg',
            },
            items: [
                {
                    type: 'doc',
                    docId: 'common-functions',
                    label: 'Documentation',
                    position: 'right',
                },
                {
                    type: 'dropdown',
                    label: 'Contact',
                    position: 'right',
                    items: [
                        {
                            label: 'Facebook',
                            href: 'https://www.facebook.com/quoc1707',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/quoc1707',
                        },
                    ],
                },
            ],
        },
        prism: {
            theme,
            darkTheme,
        },
    },
}

export = config
