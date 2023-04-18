JS to TS

1. With npm install --save-dev typescript
    created a package.json
    added the tsconfig.json myself
        ```
        {
            "compilerOptions": {
            "target": "es2016",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true
            }
        }
        ```
        Thought was that this would prevent creating a js file every npm run build
    node_modules came when running npm
2. Will create a typescript application and then add the necessary starter code.
https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
- For migration from js