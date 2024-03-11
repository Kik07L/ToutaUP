const sites = [
    "https://www.amazon.com",
    "https://www.poott.com",
    "https://www.forjeio.com",
    "https://www.ozihr.com",
    "https://www.iofehj.com"
];

function checkSites() {
    const container = document.getElementById('siteContainer');
    container.innerHTML = ''; // Clear previous content

    sites.forEach(site => {
        const siteDiv = document.createElement('div');
        siteDiv.classList.add('site');

        const status = document.createElement('div');
        const siteName = document.createElement('p');
        siteDiv.appendChild(status);
        siteDiv.appendChild(siteName);

        container.appendChild(siteDiv);

        // Check site status
        checkSiteStatus(site, status, siteName);
    });
}

function checkSiteStatus(site, statusElement, nameElement) {
    const startTime = new Date().getTime();

    fetch(site, { method: 'HEAD' })
        .then(response => {
            const endTime = new Date().getTime();
            const responseTime = endTime - startTime;

            if (response.ok) {
                statusElement.textContent = '•';
                statusElement.classList.add('green');
                nameElement.textContent = `${site} - ${responseTime} ms`;
            } else {
                statusElement.textContent = '•';
                statusElement.classList.add('red');
                nameElement.textContent = `${site} - Unreachable`;
            }
        })
        .catch(() => {
            statusElement.textContent = '•';
            statusElement.classList.add('red');
            nameElement.textContent = `${site} - Unreachable`;
        });
}

// Check sites every minute
setInterval(checkSites, 60000);

// Initial check
checkSites();
