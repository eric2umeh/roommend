# Git Workflow Guide for Roommend Development

**Purpose:** Daily commits to showcase your GitHub profile as a technical leader while building Roommend.

---

## 📋 Setup (One-time)

### 1. Clone Your Repository Locally

```bash
# Clone the repository
git clone https://github.com/eric2umeh/roommend.git
cd roommend

# Configure git with your credentials
git config user.name "Eric Umeh"
git config user.email "eric@grandbohabs.com"

# Verify configuration
git config --list
```

### 2. Create a Development Branch

```bash
# Create and checkout a new branch
git checkout -b sprint-1/foundation

# Push to GitHub to create remote branch
git push -u origin sprint-1/foundation
```

---

## 🔄 Daily Workflow

### Step 1: Start Your Day

```bash
# Pull latest changes from remote
git pull origin sprint-1/foundation

# Check current status
git status
```

### Step 2: Make Changes

```bash
# Edit files (already done by v0)
# Example:
# - Edit components/
# - Add new features
# - Update lib/types.ts
```

### Step 3: Stage Changes

```bash
# Stage specific files
git add app/lib/types.ts app/components/

# Or stage all changes
git add .

# View staged changes
git status
```

### Step 4: Create Meaningful Commits

```bash
# Commit with clear message
git commit -m "feat: add room type CRUD operations with pricing validation"

# Examples of good commit messages:
# feat: implement guest deduplication algorithm
# fix: resolve room availability calculation bug
# docs: update database schema documentation
# refactor: optimize reservation pricing logic
# chore: update dependencies to latest versions
```

**Commit Message Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test additions
- `chore:` - Build/dependency updates

**Examples:**
```bash
git commit -m "feat(rooms): add room status toggle with real-time updates"
git commit -m "fix(reservations): correct price calculation for multi-night bookings"
git commit -m "docs(api): document reservation endpoints in README"
git commit -m "refactor(auth): simplify RBAC permission checking logic"
git commit -m "perf(dashboard): optimize room status queries with indexing"
```

### Step 5: Push to GitHub

```bash
# Push commits to remote
git push origin sprint-1/foundation

# Verify on GitHub
# Go to: https://github.com/eric2umeh/roommend/commits/sprint-1/foundation
```

---

## 📊 Commit Frequency for GitHub Profile

To show **daily activity** on your GitHub profile:

### Minimum for Visibility
- **1-2 commits per day** - Shows consistency
- **Monday-Friday** - Professional development pattern
- **Weekends optional** - Shows dedication

### Recommended for "Technical Leader" Image
- **2-3 commits per day** - Active development
- **Includes weekends** - Passion for project
- **Meaningful messages** - Shows technical depth
- **Code review comments** - Leadership quality

### Daily Schedule Example
```
Morning (09:00):   Setup, planning commit
Mid-morning (11:00): Feature development commit
Afternoon (14:00):  Testing and fixes commit
Evening (17:00):    Documentation commit
```

---

## 🔀 Branching Strategy

### Current Branches

```
main (production)
├── sprint-1/foundation (current - development)
├── sprint-2/rooms-reservations (upcoming)
├── sprint-3/guests-restaurant (upcoming)
└── sprint-4/inventory-staff (upcoming)
```

### Creating New Branches

```bash
# For a new feature
git checkout -b feature/room-type-crud

# For a bug fix
git checkout -b fix/room-availability-bug

# For documentation
git checkout -b docs/api-documentation

# Push new branch
git push -u origin feature/room-type-crud
```

---

## 📥 Pull Requests (Weekly)

### At End of Week/Sprint

```bash
# Push all commits
git push origin sprint-1/foundation

# Go to GitHub.com
# Click "Compare & pull request"

# Fill PR Details:
Title: "Sprint 1: Foundation & Infrastructure - Weeks 1-2"

Description:
"""
## Summary
Completed Sprint 1 foundation work including authentication, design system, and mock data.

## What's Included
- ✅ Next.js 16 project setup
- ✅ Supabase integration with RLS
- ✅ Dynamic RBAC system
- ✅ Mock data for Grand Bohabs
- ✅ Landing page and dashboard shell
- ✅ Design system with Tailwind

## Ready for Testing
- Demo accounts created
- Mock data fully populated
- Environment variables configured

## Files Changed
- 15 new files created
- App structure established
- Database schema ready

## Next Steps
Sprint 2: Rooms & Reservations module
"""

# Click "Create pull request"
```

---

## 🔍 Checking Your GitHub Profile

### View Your Activity
1. Visit: https://github.com/eric2umeh
2. Check the green contribution graph
3. Each commit = one square on the graph

### Best Practices
- **Consistent daily commits** = Full green graph
- **Meaningful commit messages** = Shows expertise
- **Regular pull requests** = Shows leadership
- **Code reviews** = Technical credibility

---

## ⚠️ Common Issues & Solutions

### Issue: "Your branch is ahead of origin"
```bash
# Just push your commits
git push origin sprint-1/foundation
```

### Issue: Merge conflicts
```bash
# Pull and see conflicts
git pull origin sprint-1/foundation

# Edit conflicted files manually

# Stage resolved files
git add .

# Complete merge
git commit -m "merge: resolve conflicts from origin"
git push origin sprint-1/foundation
```

### Issue: Accidentally committed to main
```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Switch to development branch
git checkout sprint-1/foundation

# Re-commit
git add .
git commit -m "your message"
```

### Issue: Want to change last commit message
```bash
git commit --amend -m "new message"
git push --force-with-lease origin sprint-1/foundation
```

---

## 📈 Growth Timeline

### Week 1 (Current)
- Foundation setup
- 10-15 commits
- Shows initiative

### Week 2
- Auth & RBAC
- 10-15 commits
- Shows technical depth

### Week 3
- Room management
- 15-20 commits
- Shows feature delivery

### Week 4
- Reservations
- 15-20 commits
- Shows complete systems

### By End of Month
- Full green GitHub graph
- 60-80 quality commits
- Solid portfolio evidence
- Technical leader credibility

---

## 🎯 For Tech Nation Review

When applying/being reviewed:

### What Reviewers See
1. **GitHub Contribution Graph** - Shows consistency
2. **Commit History** - Shows technical decisions
3. **Pull Requests** - Shows code review skills
4. **Repository Quality** - Shows project management

### How to Highlight
```bash
# Show feature timeline
git log --oneline --graph

# Show detailed commits
git log --format=fuller

# Show statistics
git log --stat
```

### Example Review Talking Points
- "I made **X commits** building the core hotel management system"
- "Implemented **dynamic RBAC** for custom role management"
- "Designed **multi-tenant architecture** handling multiple hotel locations"
- "Built **real-time dashboard** with live occupancy updates"
- "Created **production-ready** authentication system"

---

## 🚀 Quick Daily Command Reference

```bash
# Morning: Check status
git pull origin sprint-1/foundation
git status

# After coding: Stage and commit
git add .
git commit -m "feat(module): specific feature added"

# End of day: Push
git push origin sprint-1/foundation

# Weekly review
git log --oneline -n 20  # See last 20 commits
git push origin sprint-1/foundation  # Final push
```

---

## 📞 Need Help?

### Useful Git Commands
```bash
git log --oneline              # See commit history
git diff                       # See changes before staging
git status                     # See what's changed
git branch -a                  # See all branches
git remote -v                  # See remote URLs
git reset HEAD~1               # Undo last commit
git stash                      # Save work temporarily
git blame app/page.tsx         # See who changed what
```

### Resources
- Git Docs: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Commit Message Guidelines: https://www.conventionalcommits.org

---

**Remember:** Quality commits with clear messages = Better GitHub profile = Stronger tech leader image! 🚀
