#!/bin/bash

# === CONFIGURATION ===
REPO_URL="https://github.com/sofiyankh/lux-.git"
DAYS=119
START_DATE="2024-12-17"
BRANCH="main"
MULTI_COMMITS=10   # number of days with multiple commits

# --- RESET REPO ---
if [ ! -d ".git" ]; then
    git init
    git remote add origin $REPO_URL
else
    # Remove all previous commits locally
    git checkout --orphan temp_branch
    git add -A
    git commit -m "Initial commit (repo reset)"
    git branch -M $BRANCH
    git push -f origin $BRANCH
fi

git checkout -B $BRANCH

# --- Flattened commit messages ---
commit_list=(
"Setup Next.js project structure"
"Initial project scaffolding"
"Add global styles and layout"
"Refactor layout and fix responsive issues"
"Implement header component"
"Update header styles"
"Fix footer responsiveness"
"Add product card component"
"Update product card styling"
"Fix product gallery responsiveness"
"Add cart drawer and cart item"
"Update cart summary"
"Fix quantity input issues"
"Add checkout forms"
"Fix checkout progress component"
"Update shipping form"
"Add login/register/forgot-password pages"
"Fix auth validation errors"
"Update demo login"
"Add account pages (orders, wishlist, profile)"
"Update personal shopper page"
"Fix account layout"
"Add admin dashboard and products"
"Fix admin orders page"
"Update admin reviews and reports"
"Add UI primitives (buttons, input, select)"
"Add dialogs, modals, sheets"
"Add skeletons and loading states"
"Add context providers (auth, cart, wishlist)"
"Add hooks (use-toast, use-mobile)"
"Add collections pages"
"Add product pages with tabs"
"Add men/women/new arrivals/sale pages"
"Add contact/about/privacy pages"
"Add images and assets to public folder"
"Optimize image sizes"
"Refactor components and optimize imports"
"Fix layout and image previews"
"Final UI tweaks"
)

# --- Flatten & extend for DAYS ---
full_commit_list=()
for msg in "${commit_list[@]}"; do
    repeat=$((1 + RANDOM % 2)) # repeat 1-2 times
    for ((i=0;i<repeat;i++)); do
        full_commit_list+=("$msg (iteration $((i+1)))")
    done
done

# Extend if shorter than DAYS
while [ ${#full_commit_list[@]} -lt $DAYS ]; do
    full_commit_list+=("${full_commit_list[$RANDOM % ${#full_commit_list[@]}]} (extra tweak)")
done
full_commit_list=("${full_commit_list[@]:0:$DAYS}")

# --- Pick random days for multi-commit (1-2 extra commits) ---
multi_commit_days=($(shuf -i 0-$(($DAYS-1)) -n $MULTI_COMMITS))

# --- Generate commit dates with gaps ---
commit_dates=()
current_date=$(date -d "$START_DATE" +"%Y-%m-%d")
for ((i=0; i<$DAYS; i++)); do
    # 3 months of commits then skip 1 month
    month_offset=$(( (i / 60) * 4 )) # 60 days ~= 3 months
    day_offset=$i
    if (( i % 60 >= 60 )); then
        day_offset=$(( i + 30 )) # skip ~1 month
    fi
    # Randomly skip some days off
    if (( RANDOM % 7 == 0 )); then
        day_offset=$(( day_offset + 1 ))
    fi
    commit_dates+=("$(date -d "$START_DATE +$day_offset days" +"%Y-%m-%d")")
done

# --- Make commits ---
for ((i=0; i<$DAYS; i++)); do
    # Determine commits for today
    if [[ " ${multi_commit_days[@]} " =~ " $i " ]]; then
        commits_today=$((1 + RANDOM % 2)) # 1-2 commits
    else
        commits_today=1
    fi

    for ((c=0; c<$commits_today; c++)); do
        msg="${full_commit_list[$i]}"
        hour=$((14 + RANDOM % 7))         # 14:00 - 20:00
        minute=$((RANDOM % 60))
        commit_date="${commit_dates[$i]}T$(printf "%02d:%02d:00" $hour $minute)"

        # Trivial change to allow commit
        echo "// Commit $((i+1)) iteration $((c+1))" >> .git_commit_temp.ts
        git add .
        GIT_COMMITTER_DATE="$commit_date" git commit -m "$msg" --date "$commit_date"
    done
done

# --- Push ---
git push -u origin $BRANCH -f
echo "All $DAYS commits (with multi-commit days and gaps) pushed to $REPO_URL on branch $BRANCH."