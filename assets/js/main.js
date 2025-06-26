// main.js：动态加载 posts 目录下的 Markdown，并生成文章列表
(async function () {
    const postListEl = document.getElementById("post-list");

    // 1. 预定义或从 posts.json 获取文章元数据
    const posts = [
        { filename: "2025-06-26-hello-world.md", title: "Hello World", date: "2025-06-26" },
        { filename: "2025-06-26-test.md", title: "Test", date: "2025-06-26" },
    ];

    // 2. 渲染文章列表
    posts
        .sort((a, b) => b.date.localeCompare(a.date))
        .forEach((post) => {
            const item = document.createElement("article");
            item.innerHTML = `
      <h2><a href="posts/${post.filename.replace(".md", ".html")}">${post.title}</a></h2>
      <time datetime="${post.date}">${post.date}</time>
    `;
            postListEl.appendChild(item);
        });
})();
