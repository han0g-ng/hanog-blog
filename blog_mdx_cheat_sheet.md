# Blog Writeup MDX Specification & Cheat Sheet

Tài liệu quy chuẩn cú pháp MDX dành cho Blog Writeup. Bạn có thể sao chép nhanh các khối snippet bên dưới để tạo bài viết mới chuẩn format.

---

## 1. Quick Copy Snippets (Khối cú pháp mẫu)

### 1.1. Frontmatter (Metadata)
```yaml
---
title: 'TÊN CHALLENGE'
date: 'YYYY-MM-DD'
description: 'Mô tả ngắn gọn về challenge và các kỹ thuật/lỗ hổng khai thác'
ctf: 'Tên giải đấu CTF'
category: 'Web Exploitation'
difficulty: 'Medium' # Easy | Medium | Hard | Insane
tags: ['SQLi', 'XSS', 'SSRF']
---
```

---

### 1.2. Khung bài viết gốc (Root Wrapper)
Toàn bộ nội dung bài viết bắt buộc phải nằm trong khối `div` này:
```html
<div className="writeup-content">

<!-- Toàn bộ nội dung bài viết đặt tại đây -->

</div>
```

---

### 1.3. Tiêu đề chính (H1 Title)
Trùng với giá trị `title` ở Frontmatter:
```html
<h1 className="writeup-title">TÊN CHALLENGE</h1>
```

---

### 1.4. Tiêu đề các mục lớn (H2 Section Heading)
Có icon `#` định dạng riêng biệt phía trước tên mục:
```html
<h2 className="writeup-section-heading"><span className="writeup-hash">#</span> Tên Mục Lớn</h2>
```

---

### 1.5. Khung chèn ảnh căn giữa (Image Container)

#### Ảnh Banner đầu bài (Margin 2rem):
```html
<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
  <img
    src="/images/writeup/<slug>/banner.png"
    alt="Ảnh mô tả banner"
    style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px' }}
  />
</div>
```

#### Ảnh nội dung minh họa (Margin 1rem):
```html
<div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
  <img
    src="/images/writeup/<slug>/ten_anh.png"
    alt="Mô tả ảnh"
    style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px' }}
  />
</div>
<br />
```

---

### 1.6. Khối mã nguồn (Code Blocks & Payload)
Chỉ định rõ tên ngôn ngữ cú pháp (như `javascript`, `sql`, `python`, `bash`, `http`) và đệm kèm `<br />` phía dưới:

````markdown
```sql
' UNION SELECT GROUP_CONCAT(table_name) FROM information_schema.tables#
```
<br />
````

---

### 1.7. Format hiển thị Flag
Định dạng che một phần ký tự bằng dấu `?`:
```markdown
`FLAG{c8166c44e2????b60c2540a0b01efe828}`
```

---

## 2. Quy chuẩn thiết kế (Style & Architecture Rules)

1. **Thẻ ngắt dòng `<br />`:** Dùng thẻ tự đóng `<br />` sau các khối hình ảnh hoặc sau các khối code block lớn để tạo khoảng cách dòng thoáng và chuẩn responsive.
2. **Đường dẫn ảnh:** Thống nhất đặt theo cấu trúc: `/images/writeup/<slug-bai-viet>/<ten_anh>.png`.
3. **Responsive Image:** Luôn thiết lập `width: '100%'`, `maxWidth: '800px'`, `height: 'auto'`, và bo tròn góc `borderRadius: '8px'`.
4. **Không dùng Heading Markdown thuần (`#`, `##`):** Dùng trực tiếp thẻ HTML `<h1 className="writeup-title">` và `<h2 className="writeup-section-heading">` để giữ style giao diện và anchor link nhất quán.

---

## 3. Template hoàn chỉnh (Full Post Template)

Sao chép toàn bộ khối dưới đây, đổi tên file thành `index.mdx` (hoặc `<slug>.mdx`) và chỉnh sửa nội dung:

````mdx
---
title: 'TÊN CHALLENGE'
date: '2026-09-04'
description: 'Writeup chi tiết về challenge - khai thác các lỗ hổng chính'
ctf: 'Tên giải đấu CTF'
category: 'Web Exploitation'
difficulty: 'Medium'
tags: ['SQLi', 'XSS', 'SSRF']
---

<div className="writeup-content">

<h1 className="writeup-title">TÊN CHALLENGE</h1>

<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
  <img
    src="/images/writeup/slug/banner.png"
    alt="Ảnh bìa challenge"
    style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px' }}
  />
</div>

<h2 className="writeup-section-heading"><span className="writeup-hash">#</span> Mở đầu & Tổng quan</h2>

Mô tả sơ lược về đề bài, mục tiêu và các chức năng ban đầu của ứng dụng mục tiêu (`login`, `register`, `profile`,...).

<div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
  <img
    src="/images/writeup/slug/overview.png"
    alt="Giao diện tổng quan"
    style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px' }}
  />
</div>
<br />

<h2 className="writeup-section-heading"><span className="writeup-hash">#</span> Trinh sát & Phân tích</h2>

Quan sát luồng dữ liệu truyền tải, phân tích hành vi của hệ thống khi nhập input đặc biệt:

<div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
  <img
    src="/images/writeup/slug/recon.png"
    alt="Phân tích gói tin"
    style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px' }}
  />
</div>
<br />

Đoạn code phân tích được từ mã nguồn hoặc thông qua cơ chế đọc file:

```javascript
// Trích đoạn mã nguồn có lỗ hổng
```
<br />

<h2 className="writeup-section-heading"><span className="writeup-hash">#</span> Khai thác (Exploitation)</h2>

Xây dựng chuỗi payload khai thác chi tiết:

```sql
' UNION SELECT column_name FROM information_schema.columns WHERE table_name = 'flags'#
```
<br />

<div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
  <img
    src="/images/writeup/slug/result.png"
    alt="Kết quả khai thác"
    style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px' }}
  />
</div>
<br />

Lấy được flag hoàn chỉnh: `FLAG{example_flag_hash_here}`

</div>
````
