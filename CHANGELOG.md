# Changelog

## v1.1.0 (26/12/2022)
## What's Changed

## ⚠️Breaking Changes

- refactor: remove unused asset file @shrivatsabhat (#292)

## 🚀 Features

- feat: new svg loader implementation  @shrivatsabhat (#295)
- feat: Tritium API upgrades, New Network / Ledger info added to metrics page, Embassy DAO page.  @rayanfer32 (#294)
- feat: use indexes to create og images of contracts @rayanfer32 (#299)
- feat: og image properties and tx scan page @rayanfer32 (#290)
- feat: generate OG image for contract on /scan/tx @rayanfer32 (#289)

## 🐛 Bug Fixes

- fix: invalid date issue with firefox @rayanfer32 (#298)
- fix: spacing between page and number #273 @shrivatsabhat (#287)
- fix: add missing href to Rtt table #224 @shrivatsabhat (#288)

## 🧰 Maintenance

- ci: create CODEOWNERS @shrivatsabhat (#296)
- refactor: remove unused asset file @shrivatsabhat (#292)
- refactor: reuse page header for meta data @shrivatsabhat (#291)

**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v1.0.6...v1.0.7

---

## v1.0.6 (26/09/2022)
## What's Changed

## 🐛 Bug Fixes

- fix: about page contributer @shrivatsabhat (#281)
- fix: case handle trust value being negative @rayanfer32 (#279)
- fix: case when trust = 0 @rayanfer32 (#278)

## 🧰 Maintenance

- ci: fix relase drafter generation pr @shrivatsabhat (#280)

**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v1.0.5...v1.0.6

---

## v1.0.5 (25/09/2022)
## What's Changed

## 🐛 Bug Fixes
* fix: trust address scan error by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/274


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v1.0.4...v1.0.5
---

## v1.0.4 (18/09/2022)
## What's Changed

## ⚠️Breaking Changes

- fix: scan page not showing error @rayanfer32 (#260)

## 🚀 Features

- feat: merge isLoading, isError to single component @shrivatsabhat (#264)
- feat: add new error message card @shrivatsabhat (#261)

## 🐛 Bug Fixes

- fix: scan page not showing error @rayanfer32 (#260)
- fix: scan layout not showing @rayanfer32 (#259)
- fix: passing boolean to class methods @shrivatsabhat (#258)

## 🧰 Maintenance

- feat: merge isLoading, isError to single component @shrivatsabhat (#264)
- ci: improve the template and labeller @shrivatsabhat (#263)
- chore: update next, react and react-dom @shrivatsabhat (#257)
- style: remove unused styles and rearrange @shrivatsabhat (#262)

**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v1.0.3...v1.0.4

---

## v1.0.3 (08/09/2022)
## Changes

- package version bump @github-actions (#254)
- refactor: charts  @shrivatsabhat (#247)
- refactor: the layout of pages and separate from adding to globally @shrivatsabhat (#246)
- Update bump-version.yml @shrivatsabhat (#240)
- reverse merge @shrivatsabhat (#234)
- build: package update @shrivatsabhat (#233)

## 🚀 Features

- feat: market price number precision to 6 digits @shrivatsabhat (#249)
- feat: detail card active ticker style revamp @shrivatsabhat (#248)
- feat: automate version bump and changelog @shrivatsabhat (#235)

## 🐛 Bug Fixes

- fix: high and medium static code analysis / deepscan  @rayanfer32 (#250)
- fix: add force push @shrivatsabhat (#244)

## 🧰 Maintenance

- Release v1.0.3 @rayanfer32 (#253)
- revert: remove storybook @shrivatsabhat (#251)
- docs: add some badges to readme @rayanfer32 (#252)
- fix: high and medium static code analysis / deepscan  @rayanfer32 (#250)
- fix: add force push @shrivatsabhat (#244)
- Update bump-version.yml @shrivatsabhat (#239)
- Update bump-version.yml @shrivatsabhat (#238)
- ci: move to dev dependency  @shrivatsabhat (#236)
- feat: automate version bump and changelog @shrivatsabhat (#235)

---

## v1.0.2 (26/08/2022)
## Changes

## 🚀 Features

- feat: hide the dao on test net #203 @shrivatsabhat (#226)
- feat: show node version in footer @rayanfer32 (#220)
- feat: add version number to footer @shrivatsabhat (#219)

## 🐛 Bug Fixes

- fix: compact card text overlap on image @shrivatsabhat (#231)
- fix: disable refetch of data on window focus @rayanfer32 (#227)
- hotfix: update dependency and fix bugs @shrivatsabhat (#222)
- fix: menu page on mobile view @shrivatsabhat (#221)

## 🧰 Maintenance

- Release v1.0.2 @rayanfer32 (#232)
- refactor: pull out pages styles into separate file @shrivatsabhat (#228)
- refactor: pull out home page files to different file @shrivatsabhat (#229)
- hotfix: update dependency and fix bugs @shrivatsabhat (#222)
- build(deps): bump terser from 4.8.0 to 4.8.1 @dependabot (#213)

---

## v1.0.1 (31/07/2022)
## Changes

- refactor: support util function for multiple classnames @shrivatsabhat (#212)

## 🚀 Features

- feat: separate invoice page and modal @shrivatsabhat (#210)
- feat: change theme toggle for desktop @shrivatsabhat (#208)

## 🐛 Bug Fixes

- feat: separate invoice page and modal @shrivatsabhat (#210)
- feat: invoice scan with standard url pattern @rayanfer32 (#209)
- fix: console error on loading env @rayanfer32 (#207)

## 🧰 Maintenance

- ci: Update release-drafter.yml @shrivatsabhat (#211)

---

## v1.0.0 (11/07/2022)
## Changes

- Fix/nav uneven flow @shrivatsabhat (#195)
- refactor: pages and components  @shrivatsabhat (#193)
- ⚡️ Static ISR for Richlist @rayanfer32 (#189)
-  increase ssg interval to 5 min @rayanfer32 (#188)
- ♻️ refactor metrics page @rayanfer32 (#187)

## 🚀 Features

- feat: add caching for invoices @rayanfer32 (#204)
- fix: add highlights \& icons to links @rayanfer32 (#198)
- feat: add new custom dynamic link @shrivatsabhat (#196)
- feat: Add DAO\_KEYS, Invoice API's, Fetch DAO balances, Invoices Table, Invoice Modal @rayanfer32 (#194)
- feat: add new page ambassador dao @shrivatsabhat (#191)

## 🐛 Bug Fixes

- Fix/clear console errors @shrivatsabhat (#200)
- fix: add highlights \& icons to links @rayanfer32 (#198)

## 🧰 Maintenance

- Release: v1.0.0 @rayanfer32 (#205)
- ci: remove non essential workflows @shrivatsabhat (#199)
- chore: add danger file and refactor workflows @shrivatsabhat (#197)

---

## Release v0.0.9a (15/05/2022)
## What's Changed
* 🐛 Convert richlist api to post api by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/183
* fix: txn_id to txid by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/181
* ✨ add ID column for trustlist by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/182
* Release v0.0.9a by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/184


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.9...v0.0.9a
---

## Release v0.0.9 (04/05/2022)
## What's Changed
* refactor: ♻️ renamed to scss, change font to Rubik by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/153
* 📝 Add link to nexus docs by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/155
* ⚡️ fetch contributors statically by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/154
* 💄 Hide navbar on scroll by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/156
* fix(meta): update meta urls by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/157
* feat(meta): added extra meta details by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/158
* Create codeql-analysis.yml by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/159
* Create dependency-review.yml by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/160
* fix: header disappears while scrolling by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/162
* revamp: update github issue/pr template by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/163
* 💄 show three dots by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/165
* ✨ Dynamic Endless pagination for trustlist by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/142
* Fix: Dynamic Pagination for Account and Trust Transaction Details by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/166
* refactor: convert styles file to clusters by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/164
* fix: style module import error by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/168
* refactor: delete duplicate detail-card file by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/169
* chore: dependency package upgrade by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/171
* fix: lint errors by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/174
* dynamic pagination for richlist WIP by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/167
* fix: initial theme toggle output icon by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/172
* feat: support niamey font by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/175
* Release v0.0.9 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/176


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.8...v0.0.9
---

## Release v0.0.8 (05/04/2022)
## What's Changed
* 🚑 fix: page count showing 0 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/139
* hotfix: page-count showing zero by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/140
* feat: add meta images and details by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/143
* 👷 Added Proxy middleware by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/141
* 👽️  fix: calc market cap based on metrics total supply by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/144
* Docs/sample env by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/145
* fix: husky git hooks by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/146
* 🐛 fix: scan address API route by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/147
* ✨ Show trust score and  stake rate instead of pending and unconfirmed by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/148
* pr labeler for .md file by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/149
* ✨ Show USD conversions by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/150
* Release v0.0.8 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/151


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.7...v0.0.8
---

## Release v0.0.7 (11/03/2022)
**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.6...v0.0.7

## What's Changed
* 🐛 added stake rate, fix color for trust by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/126
* feat: pass page title/description as optional prop by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/131
* fix: account page detail bar improve by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/130
* fix: double scroll appearance by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/129
* fix: moveout links from app context by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/133
* refactor: remove unused files and properties by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/134
* revamp: search bar refactored by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/136
* Show account name ,show only upto 20 recent transactions (reduce load on node) by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/135
* feat: header is stikcy to the top on scroll by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/137
* Release v0.0.7 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/138


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.6...v0.0.7
---

## Release v0.0.6 (06/03/2022)
## What's Changed
* fix: chart misplace in safari ios by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/121
* fix: details card style by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/120
* feat: add page title and description by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/119
* Release 0.0.6-beta by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/122
* 🐛 fix: Show Ellipsis  based on device by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/123
* Cache less frequently updated pages  by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/124
* Release v0.0.6 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/125


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.5...v0.0.6
---

## Release v0.0.6-beta (03/03/2022)
## What's Changed
* fix: chart misplace in safari ios by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/121
* fix: details card style by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/120
* feat: add page title and description by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/119
* Release 0.0.6-beta by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/122


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.5...v0.0.6-beta
---

## Release v0.0.5 (03/03/2022)
## What's Changed
* chore: support multi app context update and added post-merge husky config by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/97
* fix#103 Make pages mobile friendly, remove real-time table for mobile users  by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/104
* refactor: components styles and performance  by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/106
* 🚚 revamp: metrics page improvised by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/107
* refactor: account page files restructure by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/108
* 🐛 fix crashing of about page by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/110
* chore: 🔨 add env detection by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/111
* fix+feat: update metrics, hide chart toolbar for mobile  by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/113
* ✨ added Error Component by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/112
* revamp: home page block list/transaction list table by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/114
* fix: panel 2 misplace for small screen by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/118
* Release version 0.0.5 by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/115


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.4...v0.0.5
---

## Release v0.0.4 (23/02/2022)
## What's Changed
* ♻️ refactor: theme-toggle button by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/93
* fix: testnet chart showing wrong initial data, update metrics metadata, refactor navbar by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/91
* 🐛 prevent going below 0 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/95
* 💄 fix text color by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/100
* 🐛 fix: #98 Only query for NXS token by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/99
* Release v0.0.4 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/101
* version bump up v0.0.4 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/102


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.3...v0.0.4
---

## Release v0.0.3 (15/02/2022)
## What's Changed
* feat: custom hooks for get device type info by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/48
* chore: 📈 update template by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/49
* 💄 fix mulitple contracts by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/50
* chore: 👷add labeler actions by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/51
* feat: 👷 add/update workflows by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/53
* feat+fix: Donut Chart, namespaces and tokens page, CopyText Component, update readme and contributing by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/54
* chore: ♻️ refactor workflow by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/56
* feat: ✨ add copied check mark by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/55
* update the pagination style by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/57
* Added Globalnames page and moved about to footer by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/58
* feat+style: Added Dynamic pagination for blocks and Transactions, subtle card borders by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/59
* feat: get device screen width by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/60
* Added local charting api support  by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/61
* styles: 💄 improvise the styles by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/62
* review-fixes: Removed owner columns,fix to 2 decimals, removed NXS typo, updated code structure by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/64
* capitalize the all constants by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/63
* refactor: 🎨 footer redesign by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/71
* fix: AppContext causing slow down #76 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/77
* added new scroll to top feature button by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/78
* ♻️ refactor/style: change slideIn Animation to FadeIn by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/79
* Feature/testnet by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/84
* Feature/testnet by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/85
* feat+fix: increase api limit ,dynamically fetch contributors by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/86
* Improve page load speed, load blocks data during SSG by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/87
* prevent breaking of copy button, fix RTT table overflow by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/88
* Release v0.0.3 by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/89


**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.2...v0.0.3
---

## Beta Release (30/01/2022)
## What's Changed
* docs: update the readme by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/1
* add eslint rules by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/2
* feat: linter update and add GitHub template by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/3
* Feat/component by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/4
* feat: 💄update style and add detail card by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/5
* Feat/tables by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/6
* feat: style update add search & theme component by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/7
* Enhancement: minor update by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/8
* feat: 🎨 improve the txn table row by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/9
* style: 💄 improve table row style by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/10
* Style/revamp by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/11
* fix: 🐛 adjust spacing by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/12
* refactor: pannel one responsive by @shrivatsabhatp in https://github.com/rayanfer32/nexus-explorer-next/pull/13
* Refactor/styles by @shrivatsabhatp in https://github.com/rayanfer32/nexus-explorer-next/pull/15
* revert: hide chart for small screen by @shrivatsabhatp in https://github.com/rayanfer32/nexus-explorer-next/pull/16
* Refactor/styles by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/14
* Refactor/styles by @shrivatsabhatp in https://github.com/rayanfer32/nexus-explorer-next/pull/17
* fix: styles by @shrivatsabhatp in https://github.com/rayanfer32/nexus-explorer-next/pull/19
* Refactor/styles by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/18
* revert: solve merge error by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/20
* Rayan by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/21
* chore: support scss styling  by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/22
* chore: add storybook by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/24
* Rayan by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/23
* feat: add component loader by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/25
* Feat/component by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/26
* chore(deps): bump next from 12.0.2 to 12.0.5 by @dependabot in https://github.com/rayanfer32/nexus-explorer-next/pull/27
* Feat/component by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/28
* 💄 chore: update favicon by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/31
* feat: added loaders ,fix: useQuery api , graph fetching by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/30
* Api and bug fixes  by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/32
* feat: replace loading with shimmer by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/33
* Removed antd and added React Table by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/34
* sidebar: modify the style and event on click by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/36
* update about page style by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/37
* chore(deps): bump follow-redirects from 1.14.5 to 1.14.7 by @dependabot in https://github.com/rayanfer32/nexus-explorer-next/pull/38
* feat: Scan Api update by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/39
* feat: added pagination and trust / account info component by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/40
* chore(deps): bump nanoid from 3.1.30 to 3.2.0 by @dependabot in https://github.com/rayanfer32/nexus-explorer-next/pull/41
* feat: NXS distrubution chart & Transaction info page by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/42
* chore: support yarn run clean platform independency by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/43
* feat: 🎨 add sub category by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/35
* feat: ✨ introduce custom toast  messager by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/44
* feat: SSG and collapsible Infocards by @rayanfer32 in https://github.com/rayanfer32/nexus-explorer-next/pull/45
* release 0.02 by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/46
* release v0.0.2 by @shrivatsabhat in https://github.com/rayanfer32/nexus-explorer-next/pull/47

## New Contributors
* @shrivatsabhat made their first contribution in https://github.com/rayanfer32/nexus-explorer-next/pull/1
* @rayanfer32 made their first contribution in https://github.com/rayanfer32/nexus-explorer-next/pull/6
* @shrivatsabhatp made their first contribution in https://github.com/rayanfer32/nexus-explorer-next/pull/13
* @dependabot made their first contribution in https://github.com/rayanfer32/nexus-explorer-next/pull/27

**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/compare/v0.0.1...v0.0.2
---

## Initial Release (30/01/2022)
**Full Changelog**: https://github.com/rayanfer32/nexus-explorer-next/commits/v0.0.1