# Roommend - GitHub Setup & Git Workflow Guide

**Project:** Roommend - Hotel & Restaurant Management SaaS  
**Author:** Eric Umeh  
**Date:** February 5, 2026  
**Repository:** https://github.com/eric2umeh/roommend

---

## IMMEDIATE ACTIONS (Do These Now!)

### 1. Initialize Local Git Repository

Open your terminal/command prompt and navigate to your project directory:

```bash
# Make sure you're in the roommend project root directory
cd /path/to/roommend

# Initialize git (if not already done)
git init

# Configure your git user (one-time setup)
git config user.name "Eric Umeh"
git config user.email "eric@grandbohabs.com"

# Verify configuration
git config --list | grep user
```

### 2. Add Remote Repository

Connect your local project to your GitHub repository:

```bash
# Add the remote (replace with your actual repo URL)
git remote add origin https://github.com/eric2umeh/roommend.git

# Verify the remote was added
git remote -v
# Should show:
# origin  https://github.com/eric2umeh/roommend.git (fetch)
# origin  https://github.com/eric2umeh/roommend.git (push)
```

### 3. Create Initial Commit

Stage all files and make the first meaningful commit:

```bash
# Stage all files
git add .

# Check what will be committed
git status

# Make initial commit with meaningful message
git commit -m "initial: v0-generated Roommend MVP foundation

- Next.js 16 + Supabase integration
- Complete database schema (20+ tables)
- Dynamic role-based access control (RBAC)
- Authentication system with 3 demo accounts
- Professional dashboard with mock data
- All pricing converted to Nigerian Naira (NGN)
- Responsive design for mobile and desktop
- Complete navigation with permission-based menus
- Module structure ready for: rooms, reservations, guests, POS, inventory, housekeeping, staff, analytics
- Ready for Grand Bohabs testing"

# Verify commit
git log --oneline -n 1
```

### 4. Push to GitHub

Push your code to the remote repository:

```bash
# Push to the main branch (or master if your repo uses master)
git push -u origin main

# OR if your repo uses 'master' branch
git push -u origin master

# Verify by checking remote
git branch -r
```

---

## IMPORTANT: Fixing "main" vs "master" Issue

If you get an error about "main" not existing, do this:

```bash
# Check what branch you're on
git branch

# If you're on a different branch, rename it to main
git branch -M main

# Then push
git push -u origin main
```

---

## Verify on GitHub

1. Go to https://github.com/eric2umeh/roommend
2. Refresh the page
3. You should see:
   - All your files in the file list
   - Your commit message in the commit history
   - "1 commit" showing in the main branch

---

## Next: Daily Development Workflow

Once code is pushed, follow this workflow each day:

### Morning - Start Your Day

```bash
# Pull latest changes
git pull origin main

# Create feature branch (optional but recommended)
git checkout -b feature/rooms-management
```

### During Day - Make Changes

Edit files in your code editor (VS Code recommended)

### End of Day - Commit & Push

```bash
# Stage changes
git add .

# Check what changed
git status

# Commit with clear message
git commit -m "feat(rooms): add room type pricing calculation engine

- Implement capacity-based pricing logic
- Add seasonal rate adjustments
- Create price override interface
- Add pricing history tracking"

# Push to GitHub
git push origin feature/rooms-management
```

### Create Pull Request (Optional)

On GitHub:
1. Click "Compare & pull request"
2. Add description
3. Click "Create pull request"
4. Merge when ready

---

## Daily Commit Strategy (For Tech Nation Profile)

To show consistent development activity:

### Ideal Daily Pattern

```bash
# Morning (9 AM)
git commit -m "chore: setup day's sprint tasks"

# Mid-morning (11 AM)
git commit -m "feat(dashboard): add occupancy rate calculation"

# Afternoon (2 PM)
git commit -m "fix(reservations): resolve double-booking edge case"

# Late afternoon (4 PM)
git commit -m "docs(api): add endpoint documentation"

# Evening (6 PM)
git commit -m "refactor(types): organize TypeScript interfaces"
```

This creates 5 commits per day = very active developer profile!

---

## Good Commit Message Examples

### ✅ DO THIS

```
feat(rooms): add dynamic pricing engine with seasonal rates
fix(auth): prevent session timeout on page refresh
docs(README): update installation instructions for Supabase
refactor(components): extract dashboard widgets into separate files
perf(dashboard): optimize occupancy calculation queries
test(auth): add unit tests for role permission validation
style(ui): improve button hover states for accessibility
chore(deps): update Next.js to latest version
```

### ❌ DON'T DO THIS

```
Update files
Fixed bug
Working on stuff
asdf
Random changes
Update
etc.
```

---

## Branch Naming Convention

For organization and clarity:

```bash
# Features
git checkout -b feature/room-management
git checkout -b feature/dynamic-pricing
git checkout -b feature/guest-crm

# Bug fixes
git checkout -b bugfix/double-booking-issue
git checkout -b bugfix/role-permissions-error

# Documentation
git checkout -b docs/setup-guide
git checkout -b docs/api-endpoints

# Chores
git checkout -b chore/update-dependencies
git checkout -b chore/cleanup-unused-files
```

---

## Useful Git Commands

```bash
# See commit history
git log --oneline -n 10

# See what changed in last commit
git show

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# See all branches
git branch -a

# Switch branch
git checkout feature/rooms

# Delete local branch
git branch -d feature/rooms

# See what's staged
git diff --staged

# See what's not staged
git diff
```

---

## GitHub Profile Tips

**What Tech Nation Reviewers See:**

1. **Contribution Graph** - Green squares showing daily commits
2. **Commit Messages** - Clear, professional messages with categories
3. **Frequency** - 5-10 commits per week is ideal
4. **Consistency** - Commits spread throughout the week
5. **Public Project** - Open source shows community contribution

**How to Maximize Impact:**

- Commit daily, even small changes
- Use semantic commit messages (feat, fix, docs, etc.)
- Push to main branch or create meaningful pull requests
- Add descriptive README and documentation
- Include code comments and docstrings
- Show progression from simple to complex features

---

## Next Steps After First Push

1. ✅ Push initial code to GitHub (instructions above)
2. ✅ Verify it appears on GitHub
3. ⏭️ Make daily commits as you develop features
4. ⏭️ Show Ebuka the live GitHub repo link
5. ⏭️ Continue with Sprint 2 development

---

## Troubleshooting

**Error: "fatal: not a git repository"**
```bash
# You're not in the project folder
cd /path/to/roommend
git init
```

**Error: "Permission denied (publickey)"**
```bash
# You need to set up SSH keys or use HTTPS instead
# Using HTTPS instead:
git remote set-url origin https://github.com/eric2umeh/roommend.git
```

**Error: "everything up-to-date"**
```bash
# You already pushed. Make a change and commit:
echo "# Updated" >> README.md
git add README.md
git commit -m "docs: update readme"
git push
```

---

## Questions?

If you encounter any git issues:
1. Check the error message carefully
2. Run `git status` to see current state
3. Try the command again
4. Contact support if still stuck

---

**Now go push that code to GitHub!** Your Tech Nation profile awaits! 🚀
