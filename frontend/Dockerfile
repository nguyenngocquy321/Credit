FROM node:20-alpine
WORKDIR /app

# Copy file định nghĩa package trước
COPY package.json package-lock.json* ./

# Cài đặt toàn bộ dependencies
RUN npm install

# Sau đó mới copy toàn bộ code
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]