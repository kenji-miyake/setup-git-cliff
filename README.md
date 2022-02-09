# setup-git-cliff

## Usage

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v2

      - name: Set up git-cliff
        uses: kenji-miyake/setup-git-cliff@main

      - name: Run git-cliff
        run: |
          git cliff
```

## Inputs

| Name    | Required | Description                 |
| ------- | -------- | --------------------------- |
| version | false    | The version of `git-cliff`. |

## Outputs

None.
