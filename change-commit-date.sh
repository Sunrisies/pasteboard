#!/bin/bash

# 检查参数数量
if [ $# -ne 2 ]; then
  echo "Usage: $0 <commit-id> <new-date>"
  echo "Example: $0 abc1234 'Mon Aug 18 14:30:00 2025 +0800'"
  exit 1
fi

# 获取参数
COMMIT_ID=$1
NEW_DATE=$2

# 检查提交 ID 是否存在
if ! git rev-parse --verify $COMMIT_ID >/dev/null 2>&1; then
  echo "Error: Commit ID $COMMIT_ID does not exist."
  exit 1
fi

# 使用 git filter-branch 修改指定提交的时间
git filter-branch -f --env-filter "
if [ \"\$GIT_COMMIT\" = \"$COMMIT_ID\" ]; then
  export GIT_AUTHOR_DATE=\"$NEW_DATE\"
  export GIT_COMMITTER_DATE=\"$NEW_DATE\"
fi
" --tag-name-filter cat -- --all

# 提示用户完成
echo "Commit $COMMIT_ID has been updated to new date: $NEW_DATE"