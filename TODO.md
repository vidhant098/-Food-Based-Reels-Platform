# TODO

- [x] Extract action buttons (Like, Comment, Save, Share) into a reusable `ActionButtons` component
- [x] Create `ActionButtons.jsx` and `ActionButtons.css` as standalone container
- [x] Position action buttons outside the reel video as a separate container (sibling of reel-overlay)
- [x] Desktop: buttons sit to the right of the video with spacing
- [x] Mobile: buttons overlay on the right side of the reel
- [x] Component accepts props: food, likedIds, handleLike, isSaved, handleSave, openCommentModal
- [x] Supports `direction` prop ('column' | 'row') and `className` for flexible placement

- [ ] Confirm what "Order button working" means in this app (current flow: Home -> OrderBox shown when reel active -> placeOrder API call).
- [ ] Fix UI/button visibility + clickability issues (if any) in Home/Order components.
- [ ] Fix backend order placement response/validation if needed.
- [ ] Fix order button to send correct `quantity` and show loader state.
- [ ] Ensure endpoint path used in frontend matches backend routes.
- [ ] Add minimal styling in `Order.css` so the buttoon is visible.
- [ ] Run frontend/backend start (or tests) and verify placing an order.
