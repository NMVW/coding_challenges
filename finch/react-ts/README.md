# ActiveK9
Keep track of all the dog sport events going on in the world.

## Phase 1 - CO

### Architecture
Daily cached batch dump of the next agility events 12 months forward across the state for all major organizations

All filtering beyond that initial api fetch is done client-side

Filters:
- `organizationNames`
- `nearbyRadius` (select includes all cities in CO and "near me" option + radius in miles)
- `lookAhead` (next 3, 6, 12 months)

## Phase 2 - TBD


## Push Notifications ([FCM](https://firebase.google.com/docs/cloud-messaging/js/client))

- Generate Web Push certificates public / private key pair for app instance
- Firebase hosting has optionally loaded script env in lieu of CDN imports
- [iOS](https://www.izooto.com/blog/ios-safari-push-notifications-in-2020) not supporting Web Push Notifications yet...