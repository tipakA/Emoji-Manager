# Changelog

## 1.12.1

- Small check to remove unnecessary `messageUpdate` event processing.

## 1.12.0

- Removed no longer needed property added in version 1.9.0.
- Added missing property for guild 'JoJ' in `messageIDs.js` file.

## 1.11.0

- Moved IDs of messages in main list channel to already existing collection.
- Removed unnecessary second export from `messageIDs.js`.
- Code adjustments that should reflect changes made in `messageIDs.js` file.

## 1.10.0

- Moved command handling out of `message` event to separate function.
- Added basic edit handling via `messageUpdate` event.
- Added this changelog.

## 1.9.1

- Fixed error when guild had no `latest` or `stats` messages specified.

## 1.9.0

- Bot now updates both message in the guild of emoji and in main server, as a form of list of all emojis.
- Changed 'Emoji Updated' embed color.

## 1.8.0

- Updated Discord.js to latest master.
- Fixed Error sending from `eval` command.


**Versions below do not represent actual version numbering, since it actually didn't exist back then.**

## 1.3.1

- Changed embeds formatting and colors.

## 1.3.0

- Added tracking of free emote slots.
- Added displaying of latest change in emojis for the server.
  - Shows latest deletion, edit or adding of emoji, with appropiate information.

## 1.1.0

- Added:
  - Fixes;
  - Event handlers;
  - etc.

## 1.0.0

- Initial commit.