# TODO - Bug fixes (likes negative, double-like, food-partner auth, remove popups)

- [x] Fix negative likeCount on backend (clamp on unlike)

- [x] Fix race/double-click issue for likes on frontend (per-food pending lock)

- [x] Clamp likeCount on frontend UI updates (never below 0)

- [x] Remove alert() popups from FoodPartnerLogin and FoodPartnerRegister

- [x] Harden auth.middleware to accept Authorization header tokens (not only cookies)

- [x] Quick verification steps (run backend + test like/unlike + food-partner login/register)


