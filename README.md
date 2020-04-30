# SERN Trello Clone

![Status](https://img.shields.io/badge/STATUS-IN--PROGRESS-yellow)
![Version 0.3.2](https://img.shields.io/badge/VERSION-0.3.2-brightgreen)

![DB MySQL & Sequelize](https://img.shields.io/badge/DB-MySQL_&&_SEQUELIZE-blue)
![AUTH Passport-JWT](https://img.shields.io/badge/USER_AUTH-PASSPORT_JWT-green)


A project to try and recreate most of Trello's functionality without third-party front-end libraries when possible. Main points of interest/focus:

- Drag and drop functionality
- Dynamic relationships between data

------------


### Completed

- `0.0.0` | Users & Basic App Functionality

- `0.1.0` | Boards
  - `0.0.1` | Create boards
  - `0.0.2` | Star/Unstar boards
  - `0.0.3` | View a board on it's own page
  - `0.0.4` | Star/Unstar or rename a board while on it's own page

- `0.2.0` | Lists
  - `0.0.1` | View a board's lists on the board's page
  - `0.0.2` | Create lists associated with specific boards while on a board's page
  - `0.0.3` | Edit a lists title while on a board's page
  - `0.0.4` | Archive lists while on a board's page
  - `0.0.5` | Reorder lists (dragging & dropping) while on a board's page
  - `0.0.6` | Unarchive lists while on a board's page

- `0.3.0` | Cards
  - `0.0.1` | Display cards that belong to a specific list
  - `0.0.2` | Create cards that belong to a specific list

------------

### Future Plans

- `0.3.0` | Cards
  - `0.0.3` | Reorder or move cards (dragging and dropping) while on a board's page
  - `0.0.4` | View card details in modal
  - `0.0.5` | Edit card details (title & description) in modal
  - `0.0.6` | Add a due date/complete option to cards
  - `0.0.7` | Allow users to add a cover image to cards (urls only)
  - `0.0.8` | Archive cards while in the card details modal
  - `0.0.9` | Unarchive cards while on a board's page

- `0.4.0` | Labels
  - `0.0.1` | Create labels associated with specific boards while on a board's page
  - `0.0.2` | Associate labels with cards
  - `0.0.3` | Enable color blind assistance mode

- `0.5.0` | Checklists
  - `0.0.1` | Create checklists associated with specific cards while in the card details modal
  - `0.0.2` | Delete checklists while in the card details modal
  - `0.0.3` | Reorder checklists (dragging and dropping) while in the card details modal
  - `0.0.4` | Create items associated with specific checklists while in the card details modal
  - `0.0.5` | Toggle items as complete/not complete while in the card details modal
  - `0.0.6` | Display % of checklist complete/not complete while in the card details modal
  - `0.0.7` | Delete items while in the card details modal
  - `0.0.8` | Reorder items (dragging and dropping) while in the card details modal
  - `0.0.9` | Add a due date option to items
  - `0.0.10` | Convert items into cards while in the card details modal

- `0.6.0` | Teams

  - _To Be Decided_

- `1.0.0` | 'Final' Version & Misc. improvements
  - `0.0.1` | Unarchive boards
  - `0.0.2` | Fix drag images for draggable elements
  - `0.0.3` | Allow users to upload images for avatar images
  - `0.0.4` | Allow users to upload images for card cover images
  - `0.0.5` | Add markdown compatibility for description blocks