document.getElementById('addIdeaBtn').addEventListener('click', () => {
    const title = prompt('Enter idea title:');
    const desc = prompt('Enter idea description:');
    
    if (title && desc) {
        const grid = document.getElementById('ideasGrid');
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="tag">New</span>
                <h3>${title}</h3>
            </div>
            <p>${desc}</p>
            <div class="card-footer">
                <span class="date">Just now</span>
                <button class="btn-text">View Details</button>
            </div>
        `;
        grid.appendChild(card);
    }
});
