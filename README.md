# MultiAgentOfficeHours

## Getting Started

- either setup the notebook locally in jupyter or you can go to the [shared one](https://colab.research.google.com/drive/10wNok8h6GhPN8DAn-6eAwyhZxqGI89Pt?usp=sharing) and make a copy in google colab
- add the OPENAI_API_KEY

## If we get time we can go over opendevin
- link to the [OpenDevin repository](https://github.com/OpenDevin/OpenDevin)

**setting up opendevin in docker**
```bash
export WORKSPACE_BASE=$(pwd)/workspace

docker run \
    -it \
    --pull=always \
    -e SANDBOX_USER_ID=$(id -u) \
    -e WORKSPACE_MOUNT_PATH=$WORKSPACE_BASE \
    -v $WORKSPACE_BASE:/opt/workspace_base \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -p 3000:3000 \
    ghcr.io/opendevin/opendevin:main
```

**OpenDevin with Local ollama**
```bash
export WORKSPACE_BASE=$(pwd)/workspace

docker run \
    -it \
    --pull=always \
    --add-host host.docker.internal:host-gateway \
    -e SANDBOX_USER_ID=$(id -u) \
    -e LLM_API_KEY="ollama" \
    -e LLM_BASE_URL="http://host.docker.internal:11434" \
    -e WORKSPACE_MOUNT_PATH=$WORKSPACE_BASE \
    -v $WORKSPACE_BASE:/opt/workspace_base \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -p 3000:3000 \
    ghcr.io/opendevin/opendevin:main
```