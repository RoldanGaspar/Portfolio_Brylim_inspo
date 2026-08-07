function generateGithubGraph() {
    let dots = '';
    const cols = 52;
    const rows = 7;
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            let level = 0;
            if (Math.random() > 0.4) {
                level = Math.floor(Math.random() * 5);
                if (c > 30 && Math.random() > 0.3) level = Math.max(1, Math.floor(Math.random() * 5));
            }
            dots += `<div class="github-dot" data-level="${level}"></div>`;
        }
    }
    return dots;
}
