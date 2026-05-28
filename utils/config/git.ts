const gitStr = () => {
    return (
        `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/settings.json
.idea/*
!.idea/inspectionProfiles
!.idea/inspectionProfiles/**
!.idea/stylesheetLinters
!.idea/stylesheetLinters/**
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
components.d.ts
`
    )
}


export default gitStr