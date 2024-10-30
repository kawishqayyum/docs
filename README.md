# Bright Data Ltd documentation

### Development

> *For Bright Data R&D*: Make sure you're using Node 20

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where mint.json is)

```
mintlify dev
```

### Publishing Changes

changes will be deployed to production automatically after pushing to the default `main` branch.

Changes done by contractors should be pushed to personal branches first and then merged with pull request.

Quick changes can be done directly through Mintlify built-in editor

#### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `mint.json`
