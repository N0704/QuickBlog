# Ứng dụng Blog AI Powered với MERN Stack, TypeScript, DeepSeek và ImageKit API

Dự án này được xây dựng nhằm minh họa cách kết hợp **MERN Stack** cùng **TypeScript**, tích hợp **AI (DeepSeek)** để sinh nội dung tự động và sử dụng **ImageKit API** cho việc xử lý, tối ưu hình ảnh. Đây có thể coi là một nền tảng blog hiện đại, hỗ trợ người dùng tạo và quản lý bài viết thông minh hơn.

# Yêu cầu kiến thức trước khi bắt đầu

Trước khi thực hiện, bạn cần có kiến thức cơ bản về:  
1.  Node.js – Nền tảng backend.
2.  Express.js – Framework để xây dựng RESTful API.
3.  React.js – Frontend hiện đại, kết hợp TypeScript để tăng tính an toàn kiểu dữ liệu.
4.  MongoDB – Cơ sở dữ liệu NoSQL, dễ mở rộng.
5.  REST API – Giao tiếp giữa frontend và backend.
Nếu bạn đã quen với các công nghệ trên thì việc triển khai dự án sẽ thuận lợi hơn rất nhiều.

# Cài đặt phụ thuộc

**Backend** - `npm i`

**Frontend** - `cd frontend` ` npm i`

## Env Variables

Trong file `server/.env`, điền thông tin phù hợp với dịch vụ bạn sử dụng (ví dụ: MongoDB Atlas, ImageKit, DeepSeek API…).

## Tính năng chính của dự án

**Đăng ký/đăng nhập người dùng** (JWT Authentication).  
**Quản lý bài viết:** tạo, chỉnh sửa, xóa, lưu nháp.  
**Tích hợp AI (DeepSeek)** gợi ý ý tưởng, hỗ trợ viết nội dung hoặc tóm tắt văn bản.  
**Xử lý hình ảnh với ImageKit:** upload ảnh, resize, tối ưu tốc độ tải.  
**Bình luận và tương tác:** cho phép người dùng thảo luận dưới bài viết.  
**Dashboard quản trị:** quản lý người dùng, thống kê bài viết.  
