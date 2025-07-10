var posts=["2025/07/10/数据结构/","2025/07/10/复变函数与积分变换/","2025/07/10/组合数学/","2025/07/10/计算机网络/","2025/07/10/概率论与数理统计/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };