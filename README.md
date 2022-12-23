# setup-git-cliff

This action sets up [orhun/git-cliff](https://github.com/orhun/git-cliff).

## Usage

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v3

      - name: Set up git-cliff
        uses: kenji-miyake/setup-git-cliff@v1

      - name: Run git-cliff
        run: |
          git cliff
```

## Action inputs and outputs

Refer to [action.yaml](./action.yaml).
