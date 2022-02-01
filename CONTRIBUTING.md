## Getting Start to Code

#### Branching

Create a new branch under name

- If feature change `feat/[featute-name]`
- If bug fix `fix/[bug-name]`
- If there major changes to dev env or prod env `chore/[change type]`

#### Commit Messages

```
<type>(<scope?>): <description>

<body?>

<footer?>
```

A good commit message should describe what changed and why.

#### Example of commit messages with semantic prefixes:

```
fix: don't overwrite prevent default
feat(core): add restrict mode
docs: update the molecule description
```

#### Common prefixes:

```
build       Affects the build system ot external dependencies
chore       Other changes that don't modify src or test fiels
ci          Changes CI configaration files and scripts.
docs        Adds or alters documentation.
feat        Adds a new feature
fix         Solves a bug
perf        Improves performance.
refactor    Rewrites code without feature, performance or bug changes.
revert      Reverts a previous commit.
style       Improves code formatting, white-space.
test        Add or modfies tests.
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
