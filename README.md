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

### Skip Authentication

By default, this action will use the `${{ github.token }}` context variable to authenticate to GitHub.

This could result in a `Bad credentials` exception if the token used by the job is not valid for
<https://github.com/>. An example where this happens is if this action is running on self-hosted
runner that's connected to a GitHub Enterprise Server instance.

In case, you can explicitly set the token to `null` to perform an unauthenticated request:

```yaml
- name: Set up git-cliff
  uses: kenji-miyake/setup-git-cliff@v1.1.0
  with:
    token: null
```
