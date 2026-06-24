# Windows / PowerShell

```powershell
Expand-Archive .\gridspell-studio-phase-1.zip
cd .\gridspell-studio-starter
npm install
Copy-Item .env.example .env.local
npm run dev
```

Before Git pushes:

```powershell
npm run type-check
npm run lint
npm run build
```
