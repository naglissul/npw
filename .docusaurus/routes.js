import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'e6c'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/on-teaching',
    component: ComponentCreator('/blog/on-teaching', '0c8'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/general',
    component: ComponentCreator('/blog/tags/general', '5c4'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'b9a'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '5ba'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'b99'),
            routes: [
              {
                path: '/docs/code/',
                component: ComponentCreator('/docs/code/', '1dc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/music/',
                component: ComponentCreator('/docs/music/', 'a5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/teach/',
                component: ComponentCreator('/docs/teach/', 'ce2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/teach/cheatsheets/',
                component: ComponentCreator('/docs/teach/cheatsheets/', 'fb6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/teach/cheatsheets/it-vbe-old',
                component: ComponentCreator('/docs/teach/cheatsheets/it-vbe-old', '9f1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/teach/science-can-be-interesting',
                component: ComponentCreator('/docs/teach/science-can-be-interesting', 'bc8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/teach/the-science-guild',
                component: ComponentCreator('/docs/teach/the-science-guild', 'e50'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/teach/tutor',
                component: ComponentCreator('/docs/teach/tutor', 'd7b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/write/',
                component: ComponentCreator('/docs/write/', '8cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/write/the-first-snow',
                component: ComponentCreator('/docs/write/the-first-snow', '09f'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2bc'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
