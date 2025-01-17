# tscircuit docs

The getting started guides and reference documentation for docs.tscircuit.com

[tscircuit](https://tscircuit.com) &middot; [live docs](https://docs.tscircuit.com) &middot; [discord](https://tscircuit.com/join)

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where mint.json is)

```
mintlify dev
```

#### Troubleshooting


- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `mint.json`
