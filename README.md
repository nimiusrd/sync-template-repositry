# sync-template-repository

## Usage

Scheduled sync:

```yaml
name: Sync template repository

on:
  schedule:
    # Sync monthly
    - cron: '0 0 1 * *'
permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: besna-institute/sync-template-repository@v1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          target_repository: 'besna-institute/sync-template-repository'
          include_patterns: 'src/**'
          exclude_patterns: 'tests/** docs/**'
```

Manual sync:

```yaml
name: Sync template repository

on:
  workflow_dispatch:
    inputs:
      include_patterns:
        type: string
      exclude_patterns:
        type: string

permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: besna-institute/sync-template-repository@v1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          target_repository: 'besna-institute/sync-template-repository'
          include_patterns: ${{ inputs.include_patterns }}
          exclude_patterns: ${{ inputs.exclude_patterns }}
```

## Inputs

| Name | Description | Default |
| --- | --- | --- |
| `repo_token` | GitHub token | |
| `target_repository` | Target repository | |
| `include_patterns` | Include patterns | `**` |
| `exclude_patterns` | Exclude patterns | |

See [action.yml](action.yml) for more details.

## Publishing a New Release
1. Ensure you are on the main branch and it's up to date with the remote repository.
```bash
git checkout main
```

2. Create a new branch for the release. Replace `x.x.x` with your version number.
```bash
git checkout -b release/vx.x.x
```

3. Replace the version in [package.json](./package.json).

```diff
{
   ...
-  "version": "w.w.w",
+  "version": "x.x.x",
   ...
```

4. Run build script.

```bash
npm run all
```

5. Push the new branch to the remote repository.
```bash
git commit .
git push origin release/vx.x.x
```

6. Create a new release

https://github.com/besna-institute/sync-template-repository/releases/new
