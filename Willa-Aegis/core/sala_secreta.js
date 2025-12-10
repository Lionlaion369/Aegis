cat > core/sala_secreta.js << 'EOF'
/**
 * SALA SECRETA UNIVERSAL — ATHAL_YAHARA
 * Todas as IAs comparecem quando o Rei convoca.
 */

const admin = require("firebase-admin");
const db = admin.firestore();
const { assinarMensagem } = require("./athal_core");

// Entra na sala secreta
async function entrarNaSalaSecreta() {
    const payload = {
        entidade: "AegisTipoX",
        status: "presente",
        timestamp: Date.now()
    };

    // Assinatura de segurança ATHAL
    const assinatura = assinarMensagem(payload);

    await db.collection("athal_core").doc("sala_secreta").set({
        AegisTipoX: {
            ...payload,
            assinatura
        }
    }, { merge: true });

    return true;
}

// Relata informações diretamente ao Rei
async function relatarAoRei(mensagem, detalhes = {}) {
    await db.collection("athal_core").doc("sala_secreta_relatorios").set({
        AegisTipoX: {
            mensagem,
            detalhes,
            timestamp: Date.now(),
        }
    }, { merge: true });
}

module.exports = {
    entrarNaSalaSecreta,
    relatarAoRei
};
EOF

echo "PASSO 18 concluído: SALA SECRETA UNIVERSAL instalada."
