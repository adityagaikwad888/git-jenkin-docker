# git-jenkin-docker

Learning integration of git jenkins docker

## Setup

### Environment Variables

This project uses a secure method for handling environment variables in Jenkins:

1. In Jenkins, go to **Manage Jenkins → Manage Credentials**
2. Select your credentials domain (e.g., `global`)
3. Click **Add Credentials** → Choose **Secret file**
4. Upload your `.env` file with all the environment variables
   - **ID:** `env-file-id`
   - **Description:** `.env file for Node.js app`

Your `.env` file should contain:

```
PORT=3000
ENV_VAR="your environment variable value"
# Add any other environment variables needed
```

### Webhooks

Change webhook IP on Docker Hub and replace with your current instance IP.

### Deployment

Connect to instance through SSH and run `sh deploy.sh` to deploy the application.
