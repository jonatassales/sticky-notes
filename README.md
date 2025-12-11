# Sticky Notes Code Challenge

A canvas app where you can create sticky notes, resize and move them around. It was built with React and TypeScript using React's native state management API and vanilla CSS. The project extended the scope of requirements, unfortunately I couldn't implement all of them on time. My fault folks, sorry. I couldn't complete the API persistence, even in `local storage`, color set, `TrashZone`. Also, `apps/docs` is also breaking on `build`. :broken_heart:

---

## Project Structure

```text
sticky-notes-app/
│
├── apps/
│   ├── api/             # NestJS API with Prisma ORM for persistence.
│   ├── docs/            # Storybook for components and UI documentations.
│   └── web/             # React app (Vite + TS) coupled with CSS foundation.
│
├── packages/
│   ├── contracts/      # TypeScript types to work as contracts.
│   ├── design-system/
│   │   ├── foundation/  # Design tokens (very "basic"): colors, radius, shadows, spacing.
│   │   └── ui/          # UI (very "basic"): Card, IconButton, Skeleton
│   ├── eslint-config/   # Shared ESlint config across all apps and packages
│   ├── typescript-config/        # Shared tsconfig config across all apps and packages
│   └── react/           # React utilities (e.g. clsx and hooks)
│
├── package.json
└── tsconfig.json
```

Here is a brief representation of the `monorepo` structure. I decided to do that in order to share utilities, contracts, configs and design across the `apps/` and `packages/`. Also to have type safety reliability between client and server by providing contracts, configs and a brand.

## :rocket: Getting Started

Go ahead and clone the repository from github:

```bash
git clone https://github.com/jonatassales/sticky-notes
cd sticky-notes
```

then install the dependencies at the root level:

```bash
pnpm install
```

Once everything is installed, run:

```bash
pnpm build
```

this will build all `packages/` and `apps/`. If some build fail, please go directly to each package and run the `build` command from there. :sweat_smile:

`apps/web` will rely on `@repo/contracts`, `@repo/react` and `@repo/ds"` as `"dependencies"` in `package.json`. Also, `@repo/eslint-config` and `@repo/typescript-config` in `"devDependencies"`, so make sure everything is installed and built.

Finally, from the root level of the repo, run:

```bash
pnpm dev
```

And you'll be good to go on `http://localhost:3000`.
