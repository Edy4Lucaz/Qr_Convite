const DB_NAME = "V_ZERO_DB";
let convidados = [];
let modo = 'entrada';
let scanner;
let isScanning = false;

const LISTA_INICIAL = [
    {"id":"G1P8","nome":"Pai e Mãe 1","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G1P8","nome":"Pai e Mãe 2","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G2T4","nome":"Tio Gabi e Tia Fula","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G3T9","nome":"Tia Bina e Tia Madalena","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G4T2","nome":"Tia Lexeni e Tia Sabrita","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G5T7","nome":"Tia Chica e Esposo","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G1J5","nome":"Jorge e Salomé","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G2Z8","nome":"Zé e Cristina","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G3S2","nome":"Avó Severino e Avó Anita","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G4J1","nome":"Januário e Paula","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G5D9","nome":"Dory e Nguevinha","mesa":"MESA 1 • Génesis","limite":2},
    {"id":"G6S4","nome":"Avó São e acompanhante","mesa":"MESA 1 • Génesis","limite":2},

    {"id":"E1F4","nome":"Fareu e acompanhante","mesa":"MESA Éxodo","limite":2},
    {"id":"E2M9","nome":"Casal Martins","mesa":"MESA Éxodo","limite":2},
    {"id":"E3M1","nome":"Mário e acompanhante","mesa":"MESA Éxodo","limite":2},
    {"id":"E4J7","nome":"Jamba e Nanda","mesa":"MESA Éxodo","limite":2},
    {"id":"E5D3","nome":"Dina e Amélia","mesa":"MESA Éxodo","limite":2},

    {"id":"L1D4","nome":"Dada e Esposa","mesa":"MESA 3 • Levítico","limite":2},
    {"id":"L2I7","nome":"Isabel e Marquilson","mesa":"MESA 3 • Levítico","limite":2},
    {"id":"L3D9","nome":"Deuwer e Esposa","mesa":"MESA 3 • Levítico","limite":2},
    {"id":"L4C2","nome":"Castanho e Acompanhante","mesa":"MESA 3 • Levítico","limite":2},
    {"id":"L5C6","nome":"Cláudio e Esposa","mesa":"MESA 3 • Levítico","limite":2},

    {"id":"U1E8","nome":"Esperança e Deusa","mesa":"MESA Números","limite":2},
    {"id":"U2M3", "nome": "Mauro e Lila", "mesa": "MESA Números", "limite": 2},
    {"id":"U6C4", "nome": "Cláudia e Celmira", "mesa": "MESA Números", "limite": 2},
    {"id":"U3C5","nome":"Chanisa e Áurea","mesa":"MESA Números","limite":2},
    {"id":"U4O2","nome":"Ohana e Laura","mesa":"MESA Números","limite":2},
    {"id":"U5L7","nome":"Lídio e Quinita","mesa":"MESA Números","limite":2},

    {"id":"D1T6","nome":"Tio Cruz e Tio Wala","mesa":"MESA 5 • Deuteronómio","limite":2},
    {"id":"D2T3","nome":"Tuyeno e Esposa","mesa":"MESA 5 • Deuteronómio","limite":2},
    {"id":"D3E8","nome":"Ernesto e Esposa","mesa":"MESA 5 • Deuteronómio","limite":2},
    {"id":"D4E1","nome":"Eliseu e Esposa","mesa":"MESA 5 • Deuteronómio","limite":2},
    {"id":"D5S5","nome":"Santa e Esposa","mesa":"MESA 5 • Deuteronómio","limite":2},

    {"id":"J1N6","nome":"Natália e Henriqueta","mesa":"MESA Josué","limite":2},
    {"id":"J2P2","nome":"Paula e acompanhante ","mesa":"MESA Josué","limite":2},
    {"id":"J3D8","nome":"Dimitrov e acompanhante","mesa":"MESA Josué","limite":2},
    {"id":"J4E5","nome":"Eduardo e acompanhante","mesa":"MESA Josué","limite":2},
    {"id":"J5L9","nome":"Lucas e Anderson","mesa":"MESA Josué","limite":2},

    {"id":"J1W9","nome":"Wilson e Esposa","mesa":"MESA 7 • Juízes","limite":2},
    {"id":"J2M4","nome":"Mauro e Esposa","mesa":"MESA 7 • Juízes","limite":2},
    {"id":"J3I2","nome":"Iracelma e Esposo","mesa":"MESA 7 • Juízes","limite":2},
    {"id":"J4N7","nome":"Nara e Esposo","mesa":"MESA 7 • Juízes","limite":2},
    {"id":"J5T3","nome":"Taio e Esposa","mesa":"MESA 7 • Juízes","limite":2},

    {"id":"R1H7","nome":"Higino e Ilda","mesa":"MESA Ruth","limite":2},
    {"id":"R4A3","nome":"Aristides e Karina","mesa":"MESA Ruth","limite":2},
    {"id":"R5P1","nome":"Prata e Arieth","mesa":"MESA Ruth","limite":2},

    {"id":"S1A8","nome":"Anita e Minga","mesa":"MESA 9 • I Samuel","limite":2},
    {"id":"S2G5","nome":"Gina e Sara","mesa":"MESA 9 • I Samuel","limite":2},
    {"id":"S3V2","nome":"Vandelson e Esposa","mesa":"MESA 9 • I Samuel","limite":2},
    {"id":"S4A6","nome":"Alexandrina e Engrácia","mesa":"MESA 9 • I Samuel","limite":2},
    {"id":"S5N1","nome":"Nela e Acompanhante","mesa":"MESA 9 • I Samuel","limite":2},

    {"id":"S1M4","nome":"Casal Mateus","mesa":"MESA II Samuel","limite":2},
    {"id":"S2A7","nome":"Ascenso e Cádia","mesa":"MESA II Samuel","limite":2},
    {"id":"S3J1","nome":"Jacob e acompanhante","mesa":"MESA II Samuel","limite":2},

    {"id":"R1L4","nome":"Lucas e Esposa","mesa":"MESA 11 • I Reis","limite":2},
    {"id":"R2S9","nome":"Sabina e Esposo","mesa":"MESA 11 • I Reis","limite":2},
    {"id":"R3L1","nome":"Lizandra e Vânia","mesa":"MESA 11 • I Reis","limite":2},
    {"id":"R4P6","nome":"Paula e Esposo","mesa":"MESA 11 • I Reis","limite":2},
    {"id":"R5L3","nome":"Lídia e Mila","mesa":"MESA 11 • I Reis","limite":2},

    {"id":"K1A6","nome":"Amândio e acompanhante","mesa":"MESA II Reis","limite":2},
    {"id":"K2A2","nome":"Alice e Andreia","mesa":"MESA II Reis","limite":2},
    {"id":"K3S8","nome":"Seul e acompanhante","mesa":"MESA II Reis","limite":2},
    {"id":"K4L5","nome":"Republicano e Iveth","mesa":"MESA II Reis","limite":2},
    {"id":"K5C1","nome":"Clésio e Manucha","mesa":"MESA II Reis","limite":2},

    {"id":"C1L9","nome":"Liliandra e Junilde","mesa":"MESA 13 • I Crónicas","limite":2},
    {"id":"C2D4","nome":"Dandara e Dádiva","mesa":"MESA 13 • I Crónicas","limite":2},
    {"id":"C3L2","nome":"Laércio e Dory","mesa":"MESA 13 • I Crónicas","limite":2},
    {"id":"C4J7","nome":"Jéssica e Manu","mesa":"MESA 13 • I Crónicas","limite":2},
    {"id":"C5L5","nome":"Luany","mesa":"MESA 13 • I Crónicas","limite":1},
    {"id":"C6K1","nome":"Gisela","mesa":"MESA 13 • I Crónicas","limite":1},

    {"id":"C1J4","nome":"Casal João 1","mesa":"MESA II Crônicas","limite":2},
    {"id":"C2J9","nome":"Casal João 2","mesa":"MESA II Crônicas","limite":2},

    {"id":"E1J6","nome":"João e Cici","mesa":"MESA 15 • Esdras","limite":2},
    {"id":"E2B3","nome":"Bruno e Acompanhante","mesa":"MESA 15 • Esdras","limite":2},
    {"id":"E3A9","nome":"Artur e Delma","mesa":"MESA 15 • Esdras","limite":2},
    {"id":"E4F2","nome":"Fula e Princesa","mesa":"MESA 15 • Esdras","limite":2},
    {"id":"E5C7","nome":"Celeste e Gugu","mesa":"MESA 15 • Esdras","limite":2},

    {"id":"N1K9","nome":"Kassama e Emília","mesa":"MESA Neemias","limite":2},
    {"id":"N2C7","nome":"Capitango e Aurora","mesa":"MESA Neemias","limite":2},
    {"id":"N3R4","nome":"Ronilson e Brijida","mesa":"MESA Neemias","limite":2},
    {"id":"N4M2","nome":"MK e Alice","mesa":"MESA Neemias","limite":2},
    {"id":"N5S6","nome":"São e acompanhante","mesa":"MESA Neemias","limite":2},

    {"id":"T1A5","nome":"Ângelo e Acompanhante","mesa":"MESA 17 • Ester","limite":2},
    {"id":"T2E8","nome":"Eusébio e Acompanhante","mesa":"MESA 17 • Ester","limite":2},
    {"id":"T3G2","nome":"Glober e Acompanhante","mesa":"MESA 17 • Ester","limite":2},
    {"id":"T4F6","nome":"Francisco e Esposa","mesa":"MESA 17 • Ester","limite":2},
    {"id":"T5J1","nome":"Joicy e Acompanhante","mesa":"MESA 17 • Ester","limite":2}
].map(c => ({ ...c, dentro: 0 }));

function checkAuth() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    loadData();
}

function loadData() {
    const saved = localStorage.getItem(DB_NAME);
    convidados = saved ? JSON.parse(saved) : LISTA_INICIAL;
    initScanner();
}

function initScanner() {
    scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render(onScanSuccess);
    setTimeout(() => { scanner.pause(); }, 1200);
}

function triggerScan() {
    if (isScanning) return;
    isScanning = true;
    const btn = document.getElementById('btn-trigger');
    btn.textContent = "LENDO...";
    btn.style.background = "#6272a4";
    scanner.resume();
}

function getGuestById(code) {
    return [...convidados].reverse().find(g => g.id === code);
}

function onScanSuccess(code) {
    if (!isScanning) return;
    
    isScanning = false;
    scanner.pause();
    
    const btn = document.getElementById('btn-trigger');
    btn.textContent = "SCANNEAR PRÓXIMO";
    btn.style.background = "linear-gradient(135deg, rgba(192,132,252,0.98), rgba(147,51,234,0.8))";

    const guest = getGuestById(code);
    const box = document.getElementById('feedback');
    const title = document.getElementById('fb-title');
    const desc = document.getElementById('fb-desc');

    box.className = 'status-box';

    if (guest) {
        const mesa = guest.mesa || 'MESA NÃO DEFINIDA';

        if (modo === 'entrada') {
            if (guest.dentro < guest.limite) {
                guest.dentro++;
                box.classList.add('bg-success');
                title.textContent = "✅ AUTORIZADO";
                desc.innerHTML = `<strong>${guest.nome}</strong><br><span>${mesa}</span><br><small>${guest.dentro}/${guest.limite}</small>`;
            } else {
                box.classList.add('bg-error');
                title.textContent = "🚫 ESGOTADO";
                desc.innerHTML = `<strong>${guest.nome}</strong><br><span>${mesa}</span><br><small>Limite atingido.</small>`;
            }
        } else {
            if (guest.dentro > 0) {
                guest.dentro--;
                box.classList.add('bg-success');
                title.textContent = "📤 SAÍDA";
                desc.innerHTML = `<strong>Saída de: ${guest.nome}</strong><br><span>${mesa}</span>`;
            } else {
                box.classList.add('bg-error');
                title.textContent = "⚠️ VAZIO";
                desc.innerHTML = `<strong>${guest.nome}</strong><br><span>${mesa}</span><br><small>Ninguém deste grupo consta como presente.</small>`;
            }
        }
        localStorage.setItem(DB_NAME, JSON.stringify(convidados));
    } else {
        box.classList.add('bg-error');
        title.textContent = "❌ NÃO CONSTA";
        desc.textContent = "ID Inválido.";
    }
}

function setMode(m) {
    modo = m;
    document.getElementById('mode-in').className = m === 'entrada' ? 'active' : '';
    document.getElementById('mode-out').className = m === 'saida' ? 'active' : '';
    document.getElementById('fb-title').textContent = "MODO: " + m.toUpperCase();
    document.getElementById('fb-desc').textContent = "Pressione o botão para ler.";
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById('sec-' + id).style.display = 'block';
    if(id === 'list') renderTable();
}

function renderTable() {
    const total = convidados.reduce((acc, g) => acc + g.dentro, 0);
    document.getElementById('count-in').textContent = total;
    document.getElementById('count-total').textContent = convidados.length;
    let h = `<table><tr><th>Convidado</th><th>Mesa</th><th>In</th><th>Lim</th></tr>`;
    convidados.sort((a, b) => (a.mesa || '').localeCompare(b.mesa || '') || a.nome.localeCompare(b.nome)).forEach(g => {
        h += `<tr class="${g.dentro > 0 ? 'present' : ''}"><td>${g.nome}</td><td>${g.mesa || 'Sem mesa'}</td><td>${g.dentro}</td><td>${g.limite}</td></tr>`;
    });
    document.getElementById('list-table').innerHTML = h + `</table>`;
}

function resetSystem() {
    if(confirm("Deseja recarregar a lista do evento e limpar os registros atuais?")) {
        const baseList = LISTA_INICIAL.map(c => ({ ...c, dentro: 0 }));
        convidados = [...baseList];
        localStorage.setItem(DB_NAME, JSON.stringify(convidados));

        if (document.getElementById('sec-list').style.display !== 'none') {
            renderTable();
        }

        const box = document.getElementById('feedback');
        if (box) {
            box.className = 'status-box';
            document.getElementById('fb-title').textContent = 'LISTA RECARREGADA';
            document.getElementById('fb-desc').textContent = 'A lista foi carregada novamente.';
        }
    }
}
