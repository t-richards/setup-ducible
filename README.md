TODO(tom): Status Badge

# setup-ducible

This action adds the [Ducible][ducible] command-line tool to your PATH.

[ducible]: https://github.com/jasonwhite/ducible

## Usage

```yaml
name: "Reproducible build"
on: [push]

jobs:
  build:
    runs-on: windows-latest

    steps:
    - name: Checkout source
      uses: actions/checkout@v2

    - name: Setup ducible
      uses: t-richards/setup-ducible@v1

    - name: Build my_app.exe
      run: <your build process here>

    - name: Create reproducible build
      run: ducible my_app.exe
```

## License

This software is available as open source under the terms of the [MIT License][license].

[license]: ./LICENSE
