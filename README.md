# setup-ducible

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/t-richards/setup-ducible/build-test?style=flat-square)

This action adds the [Ducible][ducible] command-line tool to your PATH.

[ducible]: https://github.com/jasonwhite/ducible

## Usage

```yaml
name: build
on: [push]

jobs:
  build:
    runs-on: windows-latest

    steps:
    - name: Checkout source
      uses: actions/checkout@v2

    - name: Setup ducible
      uses: t-richards/setup-ducible@master

    - name: Build my_app.exe
      run: <your build process here>

    - name: Create reproducible build
      run: ducible my_app.exe
```

## Inputs

### `version`: string (optional)

The version of ducible to download. e.g. `'1.2.2'`. Defaults to `1.2.2`.

### `arch`: string (optional)

The architecture of the tool to download. e.g. `'x32'` or `'x64'`. Defaults to `x64`.

## Input example

```yaml
- name: Setup ducible
  uses: t-richards/setup-ducible@master
  with:
    version: '1.2.2'
    arch: 'x64'
```

## License

This software is available as open source under the terms of the [MIT License][license].

[license]: ./LICENSE
