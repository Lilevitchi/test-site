function selectGame(id, name, bgPath) {
    const hub = document.getElementById('masterHub');
    const title = document.getElementById('hubTitle');
    const bg = document.getElementById('dynamicBg');
    
    // 1. Activer l'animation du rideau
    hub.classList.add('is-selected');
    
    // 2. Changer le titre et le fond
    title.innerText = name;
    bg.style.backgroundImage = `url('${bgPath}')`;
    
    // 3. Mettre à jour les liens des boutons (Exemple)
    const links = {
        'fo4': { written: 'fallout4/intro/', video: 'https://youtube.com/...' },
        'london': { written: 'fallout-london/', video: 'https://youtube.com/...' },
        // ... ajoute les autres ici
    };
    
    document.getElementById('linkWritten').href = links[id].written;
    document.getElementById('linkVideo').href = links[id].video;
}

function resetHub() {
    document.getElementById('masterHub').classList.remove('is-selected');
    document.getElementById('hubTitle').innerText = "Choisissez votre univers";
}
