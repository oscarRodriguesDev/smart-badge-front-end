"use client";
import { useState } from "react";

type Colaborador = {
  id: string;
  nome: string;
  cpf: string;
};

async function buscarColaboradorPorIdentificador(identificador: string): Promise<Colaborador | null> {
  // A rota /api/colaboradores/user agora aceita busca tanto por id quanto por cpf (ver route.ts linha 4-47).
  // Vamos tentar identificar se o valor digitado é um CPF (apenas dígitos e normalmente 11 caracteres) ou um ID.

  const isCpf = /^\d{11}$/.test(identificador);

  const queryParam = isCpf
    ? `cpf=${encodeURIComponent(identificador)}`
    : `id=${encodeURIComponent(identificador)}`;

  try {
    const response = await fetch(
      `/api/colaboradores/user?${queryParam}`
    );
    if (!response.ok) {
      throw new Error("Falha ao buscar colaborador.");
    }
    const data = await response.json();
    if (!data || !data.colaborador) return null;
    return data.colaborador as Colaborador;
  } catch {
    return null;
  }
}

// Simulação de gravação na tag NFC (precisa ser adaptada para API real ou integração nativa futuramente)
async function gravarNFC(idUsuario: string): Promise<boolean> {
  // Aqui entraria a integração com o gravador NFC (por ex., usando WebUSB/Web Serial/Native App)
  return new Promise((resolve) => setTimeout(() => resolve(true), 1500));
}

export default function GravacaoNFCPage() {
  const [identificador, setIdentificador] = useState("");
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [status, setStatus] = useState<"init" | "buscando" | "erro" | "achou" | "gravando" | "gravado" | "erro_gravacao">("init");
  const [erro, setErro] = useState("");

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setColaborador(null);
    setErro("");
    setStatus("buscando");
    const colab = await buscarColaboradorPorIdentificador(identificador.trim());
    if (!colab) {
      setStatus("erro");
      setErro("Colaborador não encontrado para o identificador informado."); // palavra mais neutra
    } else {
      setColaborador(colab);
      setStatus("achou");
    }
  };

  const handleGravarNFC = async () => {
    if (!colaborador) return;
    setStatus("gravando");
    try {
      const sucesso = await gravarNFC(colaborador.id);
      if (sucesso) {
        setStatus("gravado");
      } else {
        setStatus("erro_gravacao");
        setErro("Falha ao gravar NFC.");
      }
    } catch {
      setStatus("erro_gravacao");
      setErro("Ocorreu um erro inesperado na gravação.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-xl bg-surface rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-foreground text-center">
          Gravar tag NFC para colaborador
        </h1>
        {/* Passo 1: Buscar colaborador */}
        <form onSubmit={handleBuscar} className="flex flex-col gap-6">
          <input
            className="w-full p-4 rounded-lg border border-border focus:outline-none focus:border-primary text-lg"
            placeholder="Digite o ID ou CPF do colaborador"
            value={identificador}
            onChange={e => setIdentificador(e.target.value)}
            disabled={status === "buscando" || status === "gravando"}
            autoFocus
            spellCheck={false}
            inputMode="text"
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-dark transition disabled:opacity-50"
            disabled={!identificador.trim() || status === "buscando" || status === "gravando"}
          >
            {status === "buscando" ? "Buscando..." : "Buscar colaborador"}
          </button>
        </form>
        {status === "erro" && (
          <p className="text-red-500 mt-4 text-center">{erro}</p>
        )}
        {/* Passo 2: Mostrar dados e pedir para aproximar a tag */}
        {colaborador && status !== "init" && (
          <div className="mt-8 flex flex-col items-center">
            <div className="mb-4 p-4 bg-muted rounded text-center">
              <div className="font-medium text-lg">{colaborador.nome}</div>
              <div className="text-foreground-secondary text-sm">{colaborador.cpf}</div>
              <div className="text-foreground-secondary text-xs mt-1">
                ID do colaborador: <span className="font-mono">{colaborador.id}</span>
              </div>
            </div>
            <button
              onClick={handleGravarNFC}
              className="w-full py-3 bg-success text-white rounded-lg font-semibold text-lg hover:bg-success-dark transition disabled:opacity-50 mt-2"
              disabled={status === "gravando" || status === "gravado"}
            >
              {status === "gravando"
                ? "Gravando..."
                : status === "gravado"
                ? "Tag gravada!"
                : "Gravar ID na Tag NFC"}
            </button>
            {status === "gravado" && (
              <p className="text-success mt-4 text-center font-semibold">
                ID gravado com sucesso na tag NFC!
              </p>
            )}
            {status === "erro_gravacao" && (
              <p className="text-red-500 mt-4 text-center">{erro}</p>
            )}
            {status === "achou" && (
              <p className="mt-3 text-center text-sm text-foreground-secondary">
                Aproxime a tag NFC do gravador e clique em <b>Gravar ID na Tag NFC</b>.
              </p>
            )}
          </div>
        )}
        <p className="text-foreground-secondary mt-8 text-center text-sm">
          Digite o ID ou CPF do colaborador, busque, aproxime a tag NFC ao leitor/gravar e clique para gravar. <br/>
          <span className="text-xs opacity-60">
            A integração real com o hardware depende do dispositivo PC/NFC e APIs de integração via Electron, WebUSB, ou app nativo no futuro.
          </span>
        </p>
      </div>
    </div>
  );
}
