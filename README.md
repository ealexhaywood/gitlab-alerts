# gitlab-alerts
GitLab Integration for Prometheus Alertmanager

# Dependencies
* npm v5.10.0+
* node v8.10.0+
* (Optional) nodemon 1.18.3+
* (Optional) Docker 18.06.0+ and Docker Compose 1.22.0+

# Running
Before running, execute `npm i` at project root to install all dependencies.
* `npm run dev` to run with Nodemon (livereload); or
* `node server.js`

# Example Alertmanager Configuration
```yaml
route:
  receiver: 'gitlab-alerts'
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 24h
  group_by: [alertname]

receivers:
- name: 'gitlab-alerts'
  webhook_configs:
  - url: 'http://<gitlab-alerts-hostname>:3005/alerts'
    send_resolved: true
```