
export async function generateExcelFormula(prompt: string): Promise<string> {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'サーバーから無効な応答がありました。' }));
            throw new Error(errorData.message || `サーバーでエラーが発生しました (コード: ${response.status})`);
        }

        const data = await response.json();
        if (!data.text) {
            throw new Error('サーバーから予期しない応答が返されました。');
        }
        return data.text;
    } catch (error) {
        console.error("Error calling backend API:", error);
        if (error instanceof Error) {
            if (error.message.toLowerCase().includes('failed to fetch')) {
                 throw new Error('サーバーへの接続に失敗しました。ネットワークの状態を確認してください。');
            }
            throw new Error(error.message);
        }
        throw new Error("不明なエラーが発生しました。");
    }
}
