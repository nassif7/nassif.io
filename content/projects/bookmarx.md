---
name: bookmarX
type: Side project
num: '02'
desc: A Chrome extension that turns X bookmarks into a searchable knowledge base. Stored locally in your browser, zero backend, no account needed.
stack:
  - React
  - TypeScript
  - Vite
  - Chrome MV3
images:
  - /projects/bookmarX/bookmarX2.avif
  - /projects/bookmarX/bookmarX3.avif
  - /projects/bookmarX/bookmarX4.avif
  - /projects/bookmarX/bookmarX5.avif
  - /projects/bookmarX/bookmarX6.avif
link: https://chromewebstore.google.com/detail/bookmarx/lpgfdocpjecjdagbjcbomobccfeaefep
linkLabel: Get on Chrome Web Store
privacyPolicy: /projects/bookmarx/privacy
wip: false
brainstorm: false
---

bookmarX turns X's native bookmarks into a personal, searchable knowledge base that lives entirely in your browser. No account, no server, nothing leaves your machine.

Since X doesn't expose a bookmark API to third parties, bookmarX intercepts the browser's own internal GraphQL requests at runtime. A single click starts a full sync: the extension auto-scrolls the bookmarks page, captures content silently as it loads, detects when it's caught up with previously saved items, and stops early.

Bookmarks are stored in Chrome's extension storage and organized through user-defined collections with keyword-based auto-sorting. Filters narrow by collection, tag, and media type — tag options update live based on what's in the active collection. A search bar covers tweet text, author name, handle, and hashtags.

The bookmark detail view shows the full tweet, lets you assign or create a collection inline via a searchable dropdown, and gives you a one-click URL copy. Import and export round-trip cleanly through JSON, with deduplication on re-import.

The UI lives in Chrome's Side Panel. Built with React and TypeScript, with light, dark, and system themes and a customizable accent color.

Available on the Chrome Web Store.
