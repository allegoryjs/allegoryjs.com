# allegoryjs.com

This site uses [GoatCounter](https://www.goatcounter.com/) for privacy-respecting analytics. GoatCounter does not track personal information and does not use cookies.

## Build Approach

This site is built using **Static Site Generation (SSG)** with Next.js. The `output: 'export'` configuration in `next.config.mjs` ensures that the site is fully pre-rendered at build time, generating static HTML files that can be deployed to any static hosting service.

## Development

To install dependencies:

```bash
bun install
```

To run the development server:

```bash
bun run dev
```

To build the static site:

```bash
bun run build
```

The static output will be generated in the `out` directory.

This project was created using `bun init` in bun v1.3.6. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
