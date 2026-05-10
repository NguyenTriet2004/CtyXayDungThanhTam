# Security Specification for Thành Tâm Firestore

## 1. Data Invariants
- `users`: Only the user themselves or an admin can read/write their own profile. Roles can only be updated by admins.
- `blog`: Anyone can read. Only admins can create, update, or delete.
- `projects`: Anyone can read. Only admins can create, update, or delete.
- `messages`: Anyone can create. Only admins can read or delete. No updates allowed.
- `reviews`: Anyone can read. Only admins can create, update, or delete.

## 2. The "Dirty Dozen" Payloads

1. **Identity Spoofing (blog)**: Create a blog post as a non-admin.
2. **Identity Spoofing (users)**: Create a user profile with `role: 'admin'` as a non-admin.
3. **Identity Spoofing (messages)**: Read all messages as a non-admin.
4. **State Shortcutting (messages)**: Update a message after it's been sent.
5. **Resource Poisoning (projects)**: Create a project with a 2MB string for the title.
6. **Relational Orphan (blog)**: Create a blog post with an invalid `authorId` (if we had one).
7. **Bypass Verification**: Create a message without being signed in (valid if allowed, but we'll check if verification is required).
8. **Shadow Update (blog)**: Add a `promoted: true` field to a blog post update even if not allowed.
9. **List Query Scraping (messages)**: A user tries to list all messages.
10. **Admin Bypass**: A regular user tries to delete a project.
11. **PII Leak (users)**: A user tries to read another user's email/profile.
12. **Timestamp Fraud**: Creating a message with a manually set `createdAt` in the future.

## 3. Test Runner (Draft)
A complete test file would use `@firebase/rules-unit-testing`. For now, I will define the rules to block these.
