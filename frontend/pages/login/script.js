function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

function getById(id) {
    return document.getElementById(id);
}

async function initialAnimation() {
    await delay(1000);
    getById('logo').classList.add('fade');
    await delay(2000);
    getById('logo').classList.remove('fade');
    await delay(900);
    getById('logo-container').style.display = 'none';
    [getById('welcome-container'), getById('login-section')].forEach(item => {
        item.style.display = 'flex';
    });
    await delay(300);
    [getById('welcome-container'), getById('login-section')].forEach(item => {
        item.style.opacity = 1;
    });
}

initialAnimation();
