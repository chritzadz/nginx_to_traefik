# nginx_to_traefik

A demo project that replicates the [`nginx-auth-request`](https://github.com/rickmak/nginx-auth-request) migrate using **Traefik** as the ingress controller instead of NGINX. Preparation is setup in a Kubernetes environment (Minikube).


## Project Structure
├── auth/ # Flask-based token validation service
├── nginx/ # Nginx app route request to auth
├── traefik/ # Traefik Helm chart
├── webui/ # Simple frontend with form to test auth
├── k8s/ # all k8s components

## Prerequisites
- Docker v27.5.1 installed and running
- kubectl v1.32.5 (client) installed
- Minikube v1.35.0 installed

## Installation
1. clone the repository
```bash
git clone https://github.com/yourrepo/nginx-to-traefik.git
cd nginx-to-traefik
```
2. start minikube
```bash
minikube start
```
3. set minikube as default context (usually its automatic)
```bash
kubectl config set-context minikube
```
4. install traefik
```bash
cd traefik
helm install traefik . -n default
cd ..
```
5. create each docker image (do not change the image version number)
```bash
docker login

docker build -t <docker-username>/auth:v0.0.4 ./auth
docker build -t <docker-username>/nginx:v0.0.2 ./nginx
docker build -t <docker-username>/webui:v0.0.3 ./webui

docker push <docker-username>/auth:v0.0.4
docker push <docker-username>/nginx:v0.0.2
docker push <docker-username>/webui:v0.0.3
```
6. deploy k8 components
```bash
kubectl create -f k8s/
```

## Run Simulation
Making sure that all deployments and services runs successfully.
```bash
kubectl port-forward svc/traefik 8001:80 #for accessing the services via http
kubectl port-forward traefik-84d97bf45b-pxlk4 8081:8080 #accessing traefik dashboard
```

all can be access by http://localhost:port via web browser

Or to testthe auth service manually run using
```bash
curl -H "x-pretest: valid-token" http://localhost:8001/auth
```


