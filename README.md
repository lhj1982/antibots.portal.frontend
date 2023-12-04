This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Docker CMD
docker build -t antibots.portal.frontend.test -f Dockerfile.test .
docker run -p 3000:3000 -d antibots.portal.frontend.test:latest

# Upload to ECR
aws ecr get-login-password --region cn-northwest-1 | docker login --username AWS --password-stdin 439314357471.dkr.ecr.cn-northwest-1.amazonaws.com.cn

docker build -t webb-portal-ui -f Dockerfile.test .

git_version=`git rev-parse --short HEAD`

docker tag webb-portal-ui 439314357471.dkr.ecr.cn-northwest-1.amazonaws.com.cn/webb-portal-frontend-task:${git_version}

docker push 439314357471.dkr.ecr.cn-northwest-1.amazonaws.com.cn/webb-portal-frontend-task:${git_version}

# Resource Stack
- aws --region cn-northwest-1 --profile default \
  cloudformation deploy \
  --capabilities CAPABILITY_NAMED_IAM \
  --template-file deployment/cloudformation/antibots.portal.frontend.resources.yaml\
  --stack-name antibots-portal-frontend-resources \
  --parameter-overrides Env=test

# sam template：
- git_version=`git rev-parse --short HEAD`
- aws --region cn-northwest-1 --profile default \
  cloudformation deploy \
  --capabilities CAPABILITY_NAMED_IAM \
  --template-file deployment/cloudformation/sam-template.yaml \
  --stack-name antibots-webb-portal-frontend-task \
  --parameter-overrides "Env=test" "ImageVersion=${git_version}"