#!/bin/bash
set -e
docker build -t api-doc .
docker save api-doc | gzip | docker --context=jutge load
docker --context=jutge compose -p api-doc up -d
