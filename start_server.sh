#!/bin/bash
# 启动本地HTTP服务器

PORT=8000
DIR="/Volumes/Data_SSD/Coding/browsertest"

# 检查端口是否被占用
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "端口 $PORT 已被占用，正在停止旧进程..."
    lsof -ti:$PORT | xargs kill -9 2>/dev/null
    sleep 1
fi

# 切换到项目目录
cd "$DIR" || exit 1

# 启动服务器
echo "正在启动HTTP服务器..."
echo "工作目录: $DIR"
echo "端口: $PORT"
echo ""
python3 -m http.server $PORT &
SERVER_PID=$!

sleep 2

# 检查服务器是否启动成功
if ps -p $SERVER_PID > /dev/null; then
    echo "✓ 服务器启动成功！"
    echo "✓ PID: $SERVER_PID"
    echo "✓ 访问地址: http://localhost:$PORT/"
    echo ""
    echo "停止服务器: kill $SERVER_PID"
    echo "或运行: lsof -ti:$PORT | xargs kill"
else
    echo "✗ 服务器启动失败"
    exit 1
fi

