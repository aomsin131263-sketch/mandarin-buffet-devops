# 1. ใช้ Base Image เป็น Node.js 20 Alpine (ขนาดเล็กและปลอดภัย)
FROM node:20-alpine AS builder

# 2. ตั้งค่า Directory ทำงานภายใน Container
WORKDIR /app

# 3. คัดลอก package.json และ package-lock.json เพื่อติดตั้ง Dependencies
COPY package*.json ./

# 4. ติดตั้ง Packages ทั้งหมด
RUN npm ci

# 5. คัดลอก Code ทั้งหมดของ frontend เข้ามา
COPY . .

# 6. สั่ง Build โค้ด Next.js ให้เป็น Production Build
RUN npm run build

# --------------------------------------------------
# Stage 2: Runner Stage สำหรับรันจริง (เน้นประหยัดพื้นที่)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# คัดลอกเฉพาะไฟล์ที่ Build เสร็จแล้วมาจาก Stage แรก
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# เปิด Port 3000
EXPOSE 3000

# คำสั่งสั่งให้ Server เริ่มทำงาน
CMD ["node", "server.js"]