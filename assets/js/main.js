// 自动加载 posts 目录下的 Markdown 文件，并生成文章列表
(async function () {
    const postListEl = document.getElementById("post-list");

    if (!postListEl) {
        console.error("无法找到 post-list 元素");
        return;
    }

    try {
        const response = await fetch("/posts");
        if (!response.ok) {
            throw new Error(`无法加载 posts 文件夹: ${response.statusText}`);
        }

        const files = await response.json();
        const posts = await Promise.all(
            files.map(async (filename) => {
                const response = await fetch(`posts/${filename}`);
                if (!response.ok) {
                    console.error(`无法加载文件 ${filename}: ${response.statusText}`);
                    return null;
                }

                const markdown = await response.text();
                const htmlContent = marked(markdown);
                const titleMatch = markdown.match(/^#\s(.+)/);
                const title = titleMatch ? titleMatch[1] : "未命名文章";
                const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
                const date = dateMatch ? dateMatch[1] : "未知日期";

                return { filename, title, date, htmlContent };
            })
        );

        posts
            .filter((post) => post !== null)
            .sort((a, b) => b.date.localeCompare(a.date))
            .forEach((post) => {
                const item = document.createElement("article");
                item.innerHTML = `
                    <h2><a href="#" onclick="loadPost('${post.filename}')">${post.title}</a></h2>
                    <time datetime="${post.date}">${post.date}</time>
                `;
                postListEl.appendChild(item);
            });
    } catch (error) {
        console.error(error);
    }
})();

// 深浅色模式切换
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// 实时时钟
function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("clock").textContent = `${hh}:${mm}:${ss}`;
}
setInterval(updateClock, 1000);
updateClock();

function loadPost(filename) {
    fetch(filename)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`无法加载文件 ${filename}: ${response.statusText}`);
            }
            return response.text();
        })
        .then((markdown) => {
            const htmlContent = marked(markdown);
            document.body.innerHTML = `
                <header>
                    <button onclick="location.reload()">返回</button>
                </header>
                <main>
                    ${htmlContent}
                </main>
            `;
        })
        .catch((error) => console.error(error));
}
