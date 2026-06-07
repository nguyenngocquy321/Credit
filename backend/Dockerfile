# Sử dụng node image
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và cài đặt dependency
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose cổng NestJS (mặc định là 3000)
EXPOSE 3000

# Lệnh khởi chạy
CMD ["npm", "run", "start:dev"]