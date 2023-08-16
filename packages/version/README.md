# @nextstar/version

## Install

```shell
npm install -g @nextstar/version
```

## Use

### Update to the specified version

```shell
ns-version u 2.0.0
```

Result

```shell
┌─────────┬─────────────────────────────────────┐
│ (index) │                file                 │
├─────────┼─────────────────────────────────────┤
│    0    │           'package.json'            │
│    1    │   'packages/version/package.json'   │
└─────────┴─────────────────────────────────────┘
```

### Upgrade the version under the specified workspace

```shell
ns-version up -w "./" -i minor
```

Result

```shell
┌─────────┬────────────────┬─────────┬─────────┐
│ (index) │      file      │   old   │   new   │
├─────────┼────────────────┼─────────┼─────────┤
│    0    │ 'package.json' │ '1.0.0' │ '1.1.0' │
└─────────┴────────────────┴─────────┴─────────┘
```