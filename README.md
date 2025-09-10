# cloudflare-infinilabs-proxy
Elasticsearch infinilabs 插件代理

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/liuweiGL/cloudflare-infinilabs-proxy)

## 作用
Issue：https://github.com/bitnami/charts/issues/25280
使用 bitnami elasticsearch chart 时 `analysis-ik` 官方下载的文件名不符合 container 脚本要求导致安装插件失败，使用这个代理可以重命名下载文件名。

## 使用方式
1. 访问 [analysis-ik releases](https://release.infinilabs.com/analysis-ik/stable/) 发布页面查看版本
2. 把下载链接中的 `release.infinilabs.com` 替换为 `infinilabs.eastcoal.tech`，并且把 `elasticsearch-analysis-ik-xxx.zip` 中的 `elasticsearch-` 前缀删除
